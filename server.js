const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const dgram = require('dgram');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'dist')));

// UDP socket to listen for Forza telemetry
const udpSocket = dgram.createSocket('udp4');
const FORZA_UDP_PORT = 9999;

// Keep track of connected WebSocket clients
let activeWsClients = new Set();

// Simulation state variables
let simulationInterval = null;
let simTime = 0;
let simSpeed = 0;
let simRpm = 1000;
let simGear = 1;
let simThrottle = 0;
let simSteerAngle = 0;

function broadcastToClients(payload) {
  for (const client of activeWsClients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}

function startLocalSimulation() {
  if (simulationInterval) return;
  console.log('[SIM] Starting local telemetry simulation loop...');
  simTime = 0;
  simSpeed = 0;
  simRpm = 1000;
  simGear = 1;

  simulationInterval = setInterval(() => {
    simTime += 0.016;
    const buf = Buffer.alloc(324);
    
    // 1. Simulate Accel & Shift
    if (simTime % 10 < 7) {
      simThrottle = 1.0;
      simSpeed += 0.25;
      simRpm += 120;
      if (simRpm > 7800) {
        if (simGear < 6) {
          simGear++;
          simRpm = 4500;
        } else {
          simRpm = 7800;
        }
      }
    } else {
      simThrottle = 0.0;
      simSpeed -= 0.4;
      if (simSpeed < 0) simSpeed = 0;
      simRpm -= 200;
      if (simRpm < 900) {
        simRpm = 900;
        simGear = 1;
      }
    }
    
    simSteerAngle = Math.sin(simTime * 0.5);
    const lateralG = simSteerAngle * (simSpeed / 30) * 1.2;
    const longitudinalG = simThrottle > 0 ? 0.6 : -1.1;
    
    // Core Sled
    buf.writeInt32LE(1, 0); // isRaceOn
    buf.writeUInt32LE(Math.floor(simTime * 1000), 4);
    buf.writeFloatLE(8500.0, 8); // max
    buf.writeFloatLE(900.0, 12); // idle
    buf.writeFloatLE(simRpm, 16);
    buf.writeFloatLE(lateralG * 9.80665, 20); // accelX
    buf.writeFloatLE(1.0 * 9.80665, 24); // accelY
    buf.writeFloatLE(longitudinalG * 9.80665, 28); // accelZ
    
    const wheelRps = simSpeed / (2 * Math.PI * 0.33);
    buf.writeFloatLE(wheelRps, 100);
    buf.writeFloatLE(wheelRps, 104);
    buf.writeFloatLE(wheelRps, 108);
    buf.writeFloatLE(wheelRps, 112);
    
    const brakePitch = simThrottle === 0 ? 0.02 : -0.01;
    buf.writeFloatLE(0.15 + brakePitch + Math.sin(simTime * 10) * 0.005, 196);
    buf.writeFloatLE(0.15 + brakePitch + Math.sin(simTime * 10 + Math.PI) * 0.005, 200);
    buf.writeFloatLE(0.13 - brakePitch + Math.sin(simTime * 10) * 0.005, 204);
    buf.writeFloatLE(0.13 - brakePitch + Math.sin(simTime * 10 + Math.PI) * 0.005, 208);
    
    // Metadata
    buf.writeInt32LE(1005, 212); // ordinal
    buf.writeInt32LE(4, 216); // class
    buf.writeInt32LE(900, 220); // PI
    buf.writeInt32LE(2, 224); // AWD
    buf.writeInt32LE(6, 228); // gears
    
    // V2 Data Out
    // Position (X, Y, Z) - offset 244 to 256 (12 bytes)
    buf.writeFloatLE(0.0, 244);
    buf.writeFloatLE(0.0, 248);
    buf.writeFloatLE(0.0, 252);

    buf.writeFloatLE(simSpeed, 256);
    buf.writeFloatLE(simThrottle * 550000, 260);
    buf.writeFloatLE(simThrottle * 650, 264);
    
    const baseTireTemp = 180 + Math.sin(simTime * 0.1) * 10; // Fahrenheit (approx 82C)
    buf.writeFloatLE(baseTireTemp + Math.abs(simSteerAngle) * 15, 268);
    buf.writeFloatLE(baseTireTemp + Math.abs(simSteerAngle) * 15, 272);
    buf.writeFloatLE(baseTireTemp, 276);
    buf.writeFloatLE(baseTireTemp, 280);
    
    buf.writeUInt8(simThrottle > 0 ? 255 : 0, 315);
    buf.writeUInt8(simThrottle === 0 ? 200 : 0, 316);
    buf.writeUInt8(0, 317);
    buf.writeUInt8(0, 318);
    buf.writeUInt8(simGear, 319);
    buf.writeInt8(simSteerAngle * 127, 320);
    
    const telemetry = parseForzaTelemetry(buf);
    if (telemetry) {
      broadcastToClients(JSON.stringify({ type: 'telemetry', data: telemetry }));
    }
  }, 16);
  
  broadcastToClients(JSON.stringify({ type: 'simulation_status', active: true }));
}

function stopLocalSimulation() {
  if (!simulationInterval) return;
  console.log('[SIM] Stopping local telemetry simulation loop...');
  clearInterval(simulationInterval);
  simulationInterval = null;
  broadcastToClients(JSON.stringify({ type: 'simulation_status', active: false }));
}

wss.on('connection', (ws) => {
  console.log('[WS] Frontend client connected.');
  activeWsClients.add(ws);

  // Send local IP addresses to help with UDP setup instructions
  try {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    const ips = [];
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          ips.push(iface.address);
        }
      }
    }
    ws.send(JSON.stringify({
      type: 'init',
      data: {
        ips: ips.length > 0 ? ips : ['127.0.0.1'],
        port: FORZA_UDP_PORT
      }
    }));

    // Send current simulation status to newly connected client
    ws.send(JSON.stringify({
      type: 'simulation_status',
      active: simulationInterval !== null
    }));
  } catch (err) {
    console.error('[WS] Error collecting local IPs:', err);
  }

  // Handle client messages (e.g. simulation toggling)
  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message);
      if (parsed.type === 'toggle_simulation') {
        if (parsed.active) {
          startLocalSimulation();
        } else {
          stopLocalSimulation();
        }
      }
    } catch (err) {
      console.error('[WS] Error processing client message:', err);
    }
  });

  ws.on('close', () => {
    console.log('[WS] Frontend client disconnected.');
    activeWsClients.delete(ws);
  });
});

// Parse Forza Horizon 4/5/6 Telemetry Buffer
// Supports standard "Sled" (232 bytes) and "Data Out" (324 bytes) packet sizes
function parseForzaTelemetry(msg) {
  if (msg.length < 232) {
    return null; // Invalid packet size
  }

  // Helper to read float values safely
  const readFloat = (offset) => msg.readFloatLE(offset);
  const readInt32 = (offset) => msg.readInt32LE(offset);
  const readUInt32 = (offset) => msg.readUInt32LE(offset);
  const readUInt8 = (offset) => msg.readUInt8(offset);
  const readInt8 = (offset) => msg.readInt8(offset);

  const telemetry = {
    // Sled Format Core (232 bytes)
    isRaceOn: readInt32(0),
    timestampMs: readUInt32(4),
    engineMaxRpm: readFloat(8),
    engineIdleRpm: readFloat(12),
    currentEngineRpm: readFloat(16),
    
    // G-Forces / Acceleration (converted from m/s^2 to Gs by dividing by 9.80665)
    accelX: readFloat(20) / 9.80665, // Lateral
    accelY: readFloat(24) / 9.80665, // Vertical
    accelZ: readFloat(28) / 9.80665, // Longitudinal
    
    // Velocity (m/s)
    velocityX: readFloat(32),
    velocityY: readFloat(36),
    velocityZ: readFloat(40),
    
    // Angles
    yaw: readFloat(56),
    pitch: readFloat(60),
    roll: readFloat(64),
    
    // Normalized suspension travel (0.0 to 1.0)
    suspensionTravelFrontLeftNorm: readFloat(68),
    suspensionTravelFrontRightNorm: readFloat(72),
    suspensionTravelRearLeftNorm: readFloat(76),
    suspensionTravelRearRightNorm: readFloat(80),

    // Wheel rotation speed
    wheelRotationFL: readFloat(100),
    wheelRotationFR: readFloat(104),
    wheelRotationRL: readFloat(108),
    wheelRotationRR: readFloat(112),

    // Suspension Travel in meters
    suspensionTravelFL: readFloat(196),
    suspensionTravelFR: readFloat(200),
    suspensionTravelRL: readFloat(204),
    suspensionTravelRR: readFloat(208),

    // Car identity & metadata
    carOrdinal: readInt32(212),
    carClass: readInt32(216), // 0=D, 1=C, 2=B, 3=A, 4=S1, 5=S2, 6=X
    carPerformanceIndex: readInt32(220),
    drivetrainType: readInt32(224), // 0=FWD, 1=RWD, 2=AWD
    numGears: readInt32(228)
  };

  // V2 / "Data Out" extensions (Usually 311 or 324 bytes)
  if (msg.length >= 311) {
    // Speed (m/s to km/h)
    telemetry.speedKmh = readFloat(256) * 3.6;
    
    // Power & Torque (Watts to HP, Nm to Lb-Ft)
    telemetry.powerHp = readFloat(260) / 745.7; 
    telemetry.torqueNm = readFloat(264);
    
    // Tire temperatures (converted from Fahrenheit to Celsius)
    const toCelsius = (f) => (f - 32) * (5 / 9);
    telemetry.tireTempFL = toCelsius(readFloat(268));
    telemetry.tireTempFR = toCelsius(readFloat(272));
    telemetry.tireTempRL = toCelsius(readFloat(276));
    telemetry.tireTempRR = toCelsius(readFloat(280));
    
    // User inputs
    telemetry.accelInput = readUInt8(315) / 255;
    telemetry.brakeInput = readUInt8(316) / 255;
    telemetry.clutchInput = readUInt8(317) / 255;
    telemetry.handbrakeInput = readUInt8(318) / 255;
    telemetry.gear = readUInt8(319); // 0 = Neutral, 255 = Reverse
    telemetry.steer = readInt8(320) / 127; // -1 to 1
  } else {
    // Fallback estimates if only Sled V1 is sent
    telemetry.speedKmh = Math.sqrt(
      telemetry.velocityX * telemetry.velocityX +
      telemetry.velocityY * telemetry.velocityY +
      telemetry.velocityZ * telemetry.velocityZ
    ) * 3.6;
    telemetry.powerHp = 0;
    telemetry.torqueNm = 0;
    telemetry.tireTempFL = 20;
    telemetry.tireTempFR = 20;
    telemetry.tireTempRL = 20;
    telemetry.tireTempRR = 20;
    telemetry.accelInput = 0;
    telemetry.brakeInput = 0;
    telemetry.clutchInput = 0;
    telemetry.handbrakeInput = 0;
    telemetry.gear = 0;
    telemetry.steer = 0;
  }

  return telemetry;
}

let lastLogTime = 0;
let packetCount = 0;

// Listen to incoming UDP socket telemetry from the game
udpSocket.on('message', (msg) => {
  // If local simulation is active, ignore external UDP packets to prevent interface collisions
  if (simulationInterval) return;

  const telemetry = parseForzaTelemetry(msg);
  if (!telemetry) return;

  packetCount++;
  const now = Date.now();
  
  // Log packet statistics every 5 seconds to keep terminal clean
  if (now - lastLogTime > 5000) {
    console.log(`[UDP] Receiving telemetry packages... (${packetCount} pkts/5s) | Car ID: ${telemetry.carOrdinal} | Class: ${telemetry.carClass} | PI: ${telemetry.carPerformanceIndex}`);
    packetCount = 0;
    lastLogTime = now;
  }

  // Stringify and broadcast to WebSocket clients
  const payload = JSON.stringify({ type: 'telemetry', data: telemetry });
  for (const client of activeWsClients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
});

udpSocket.on('listening', () => {
  const address = udpSocket.address();
  console.log(`[UDP] Listening for Forza Horizon UDP packets at ${address.address}:${address.port}`);
});

udpSocket.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('\n❌ ERRO: A porta UDP 9999 ja esta em uso por outro programa!');
    console.error('Por favor, feche outros servidores de Forza ou comandos rodando no terminal.');
  } else {
    console.error(`\n❌ [UDP] Erro no Socket:\n${err.stack}`);
  }
  console.log('\nEsta janela fechara automaticamente em 15 segundos...');
  setTimeout(() => {
    process.exit(1);
  }, 15000);
});

// Bind UDP listener to port 9999
udpSocket.bind(FORZA_UDP_PORT);

// SPA Routing Fallback: Serve React App for all other routes
app.get('*', (req, res) => {
  const fs = require('fs');
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send(`
      <div style="font-family: 'Outfit', sans-serif; background: #0b0c10; color: #fff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; margin: 0; padding: 20px;">
        <h1 style="color: #00f2fe; margin-bottom: 10px;">🏎️ Forza Horizon Telemetry Server</h1>
        <p style="color: #c5c6c7; font-size: 1.1rem; max-width: 500px; line-height: 1.6;">O retransmissor UDP está rodando com sucesso na porta <b>3000</b>!</p>
        <p style="color: #66fcf1; font-size: 0.95rem; margin-top: 15px;">Acesse o painel web público ou seu celular para visualizar a telemetria ao vivo.</p>
      </div>
    `);
  }
});

// HTTP Server
const HTTP_PORT = 3000;

// Catch port 3000 collision errors before listening
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('\n❌ ERRO CRITICO: A porta 3000 ja esta ocupada!');
    console.error('Isso acontece porque o comando "npm run dev" ja esta rodando no seu VS Code/Terminal.');
    console.error('👉 Para rodar o executavel diretamente, feche o terminal ativo no seu editor primeiro.');
  } else {
    console.error('\n❌ Erro no Servidor HTTP:', err);
  }
  console.log('\nEsta janela fechara automaticamente em 15 segundos...');
  setTimeout(() => {
    process.exit(1);
  }, 15000);
});

server.listen(HTTP_PORT, () => {
  console.log(`[HTTP] Web UI is running at http://localhost:${HTTP_PORT}`);
  console.log(`[INFO] Set Forza Horizon HUD options -> "Data Out" to ON, IP: 127.0.0.1, Port: 9999`);
});
