const dgram = require('dgram');
const readline = require('readline');

const client = dgram.createSocket('udp4');
const PORT = 9999;
const HOST = '127.0.0.1';

console.log(`[MOCK] Forza Horizon UDP Telemetry Simulator started.`);
console.log(`[MOCK] Sending fake telemetry packets to ${HOST}:${PORT} at 60Hz...`);
console.log(`[MOCK] Keyboard Controls:`);
console.log(`[MOCK]   [Space] or [S] -> PAUSE / RESUME simulation`);
console.log(`[MOCK]   [Q] or [Ctrl+C] -> QUIT simulator`);
console.log(`-----------------------------------------------------`);

let isPaused = false;
let time = 0;
let speed = 0; // m/s
let rpm = 1000;
let gear = 1;
let throttle = 0; // 0 to 1
let steerAngle = 0; // -1 to 1

// Listen for keypress events
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

process.stdin.on('keypress', (str, key) => {
  if ((key.ctrl && key.name === 'c') || key.name === 'q') {
    shutdown();
  } else if (key.name === 'space' || key.name === 's') {
    isPaused = !isPaused;
    if (isPaused) {
      console.log(`[MOCK] ⏸️  SIMULATION PAUSED. Press [Space] or [S] to resume...`);
    } else {
      console.log(`[MOCK] ▶️  SIMULATION RESUMED.`);
    }
  }
});

function shutdown() {
  console.log('\n[MOCK] Stopping simulator cleanly...');
  clearInterval(interval);
  client.close();
  process.exit();
}

const interval = setInterval(() => {
  if (isPaused) return;
  time += 0.016; // ~60fps increment

  // Create a 324-byte buffer representing Forza FH4/DataOut telemetry structure
  const buf = Buffer.alloc(324);

  // 1. Simulate Acceleration and Gear Shifting Vibe
  if (time % 10 < 7) {
    // Accelerating
    throttle = 1.0;
    speed += 0.25; // Accelerate speed
    rpm += 120; // Accelerate RPM
    
    // Simple gear shifting logic
    if (rpm > 7800) {
      if (gear < 6) {
        gear++;
        rpm = 4500; // Drop RPM on shift
        console.log(`[MOCK] Shifted to Gear ${gear} | Speed: ${(speed * 3.6).toFixed(1)} km/h`);
      } else {
        rpm = 7800; // Limit at top gear
      }
    }
  } else {
    // Decelerating / Braking
    throttle = 0.0;
    speed -= 0.4;
    if (speed < 0) speed = 0;
    rpm -= 200;
    if (rpm < 900) {
      rpm = 900;
      gear = 1;
    }
  }

  // 2. Simulate Steering and Lateral G Force
  steerAngle = Math.sin(time * 0.5); // Slow slalom back and forth
  const lateralG = steerAngle * (speed / 30) * 1.2; // G-force is proportional to speed and steer
  const longitudinalG = throttle > 0 ? 0.6 : -1.1; // Accelerating vs braking force

  // 3. Write data to binary buffer using Little-Endian offsets
  
  // Sled Core
  buf.writeInt32LE(1, 0); // isRaceOn = 1
  buf.writeUInt32LE(Math.floor(time * 1000), 4); // timestampMs
  buf.writeFloatLE(8500.0, 8); // engineMaxRpm
  buf.writeFloatLE(900.0, 12); // engineIdleRpm
  buf.writeFloatLE(rpm, 16); // currentEngineRpm
  
  buf.writeFloatLE(lateralG * 9.80665, 20); // accelX (convert G back to m/s^2 for the packet)
  buf.writeFloatLE(1.0 * 9.80665, 24); // accelY (gravity + bump force)
  buf.writeFloatLE(longitudinalG * 9.80665, 28); // accelZ

  // Wheel speed / rotation (approximate)
  const wheelRps = speed / (2 * Math.PI * 0.33); // 33cm tire radius
  buf.writeFloatLE(wheelRps, 100); // FL
  buf.writeFloatLE(wheelRps, 104); // FR
  buf.writeFloatLE(wheelRps, 108); // RL
  buf.writeFloatLE(wheelRps, 112); // RR

  // Suspension travel meters (Front heavy load vs Rear heavy load)
  // Let's mock a static front suspension compression of 0.15m and rear of 0.13m
  // adding a dynamic pitch element when braking/accelerating
  const brakePitch = throttle === 0 ? 0.02 : -0.01;
  buf.writeFloatLE(0.15 + brakePitch + Math.sin(time * 10) * 0.005, 196); // FL
  buf.writeFloatLE(0.15 + brakePitch + Math.sin(time * 10 + Math.PI) * 0.005, 200); // FR
  buf.writeFloatLE(0.13 - brakePitch + Math.sin(time * 10) * 0.005, 204); // RL
  buf.writeFloatLE(0.13 - brakePitch + Math.sin(time * 10 + Math.PI) * 0.005, 208); // RR

  // Car Metadata
  buf.writeInt32LE(1005, 212); // carOrdinal (some random car)
  buf.writeInt32LE(4, 216); // carClass = S1 (value 4)
  buf.writeInt32LE(900, 220); // carPerformanceIndex = 900
  buf.writeInt32LE(2, 224); // drivetrainType = AWD (value 2)
  buf.writeInt32LE(6, 228); // numGears = 6

  // V2 / Data Out extensions
  // Position (X, Y, Z) - offset 244 to 256 (12 bytes)
  buf.writeFloatLE(0.0, 244);
  buf.writeFloatLE(0.0, 248);
  buf.writeFloatLE(0.0, 252);

  buf.writeFloatLE(speed, 256); // speed (m/s)
  buf.writeFloatLE(throttle * 550000, 260); // power (Watts)
  buf.writeFloatLE(throttle * 650, 264); // torque (Nm)

  // Tire temperatures (simulate heating up over time in Fahrenheit)
  const baseTireTemp = 180 + Math.sin(time * 0.1) * 10;
  buf.writeFloatLE(baseTireTemp + Math.abs(steerAngle) * 15, 268); // FL
  buf.writeFloatLE(baseTireTemp + Math.abs(steerAngle) * 15, 272); // FR
  buf.writeFloatLE(baseTireTemp, 276); // RL
  buf.writeFloatLE(baseTireTemp, 280); // RR

  // User Inputs
  buf.writeUInt8(throttle > 0 ? 255 : 0, 315); // accelInput
  buf.writeUInt8(throttle === 0 ? 200 : 0, 316); // brakeInput
  buf.writeUInt8(0, 317); // clutchInput
  buf.writeUInt8(0, 318); // handbrakeInput
  buf.writeUInt8(gear, 319); // gear
  buf.writeInt8(steerAngle * 127, 320); // steer

  // Send packet to UDP receiver
  client.send(buf, 0, buf.length, PORT, HOST, (err) => {
    if (err) {
      console.error('[MOCK] Error sending packet:', err);
      clearInterval(interval);
      client.close();
    }
  });
}, 16); // 16.6ms intervals (~60Hz)

// Handle exit cleanly
process.on('SIGINT', () => {
  shutdown();
});
