import React, { useState, useEffect, useRef, useMemo } from 'react';

// ==========================================
// 0. CAR PRESETS DATABASE
// ==========================================
const CAR_PRESETS = [
  { id: 'custom', name: '⚙️ Carro Personalizado', weight: 1350, distribution: 52, drivetrain: 'AWD', terrain: 'road', carClass: 'S1', pi: 900 },
  
  // ==================== DRIFT SPECIFICS ====================
  { id: 'silvia15', name: '🇯🇵 Nissan Silvia S15 (Drift Spec-R)', weight: 1250, distribution: 54, drivetrain: 'RWD', terrain: 'drift', carClass: 'A', pi: 750 },
  { id: 'supra98', name: '🇯🇵 Toyota Supra RZ \'98 (Drift/Drag 2JZ)', weight: 1500, distribution: 53, drivetrain: 'RWD', terrain: 'drift', carClass: 'A', pi: 800 },
  { id: 'mustangrtr', name: '🇺🇸 Ford Mustang RTR (Formula D)', weight: 1400, distribution: 54, drivetrain: 'RWD', terrain: 'drift', carClass: 'S1', pi: 850 },
  { id: 'rx7fd', name: '🇯🇵 Mazda RX-7 FD \'97 (Rotary Drift)', weight: 1220, distribution: 50, drivetrain: 'RWD', terrain: 'drift', carClass: 'A', pi: 780 },
  
  // ==================== DRAG SPECIFICS ====================
  { id: 'gtr35', name: '🇯🇵 Nissan GT-R R35 (AWD Drag Monster)', weight: 1750, distribution: 54, drivetrain: 'AWD', terrain: 'drag', carClass: 'S1', pi: 880 },
  { id: 'charger69', name: '🇺🇸 Dodge Charger \'69 (RWD Muscle Drag)', weight: 1600, distribution: 56, drivetrain: 'RWD', terrain: 'drag', carClass: 'B', pi: 650 },
  { id: 'demon18', name: '🇺🇸 Dodge Challenger Demon (Drag King)', weight: 1850, distribution: 56, drivetrain: 'RWD', terrain: 'drag', carClass: 'S1', pi: 830 },
  
  // ==================== ROAD RACING / TRACK GRIP ====================
  { id: 'porsche911', name: '🇩🇪 Porsche 911 GT3 RS (Asfalto Grip RR)', weight: 1430, distribution: 40, drivetrain: 'RWD', terrain: 'road', carClass: 'S1', pi: 890 },
  { id: 'r34', name: '🇯🇵 Nissan Skyline GT-R R34 (Godzilla AWD)', weight: 1450, distribution: 54, drivetrain: 'AWD', terrain: 'road', carClass: 'A', pi: 800 },
  { id: 'm3e46', name: '🇩🇪 BMW M3 E46 \'05 (Asfalto Track RWD)', weight: 1450, distribution: 50, drivetrain: 'RWD', terrain: 'road', carClass: 'A', pi: 740 },
  { id: 'corvettec8', name: '🇺🇸 Corvette C8 Stingray (Mid-Engine S1)', weight: 1530, distribution: 40, drivetrain: 'AWD', terrain: 'road', carClass: 'S1', pi: 850 },
  { id: 'civictype', name: '🇯🇵 Honda Civic Type R (FWD Hot Hatch)', weight: 1380, distribution: 60, drivetrain: 'FWD', terrain: 'road', carClass: 'A', pi: 720 },
  { id: 'senna18', name: '🇬🇧 McLaren Senna (Hypercar Track S2)', weight: 1300, distribution: 42, drivetrain: 'RWD', terrain: 'road', carClass: 'S2', pi: 975 },
  { id: 'fxxkevo', name: '🇮🇹 Ferrari FXX-K Evo (Ultimate Track X)', weight: 1250, distribution: 41, drivetrain: 'RWD', terrain: 'road', carClass: 'S2', pi: 998 },
  { id: 'huracan18', name: '🇮🇹 Lamborghini Huracán Performante', weight: 1420, distribution: 43, drivetrain: 'AWD', terrain: 'road', carClass: 'S1', pi: 880 },
  
  // ==================== RALLY / DIRT / OFF-ROAD ====================
  { id: 'subaruwrx', name: '🇯🇵 Subaru Impreza WRX STI (Rali AWD)', weight: 1420, distribution: 58, drivetrain: 'AWD', terrain: 'dirt', carClass: 'B', pi: 690 },
  { id: 'lancer9', name: '🇯🇵 Mitsubishi Lancer Evo IX (Terra AWD)', weight: 1380, distribution: 57, drivetrain: 'AWD', terrain: 'dirt', carClass: 'A', pi: 730 },
  { id: 'quattro83', name: '🇩🇪 Audi Sport Quattro (Grupo B Lenda)', weight: 1200, distribution: 58, drivetrain: 'AWD', terrain: 'dirt', carClass: 'B', pi: 700 },
  { id: 'bronco21', name: '🇺🇸 Ford Bronco \'21 (Off-Road Cross Country)', weight: 2000, distribution: 51, drivetrain: 'AWD', terrain: 'dirt', carClass: 'A', pi: 750 }
];

// ==========================================
// A. GOOGLE ADSENSE MONETIZATION COMPONENT
// ==========================================
function GoogleAdSenseBanner({ adClient, adSlot, isTesting = true }) {
  useEffect(() => {
    // Only attempt to load real Google ads if not in testing mode
    if (!isTesting) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.warn('AdSense failed to load: ', err);
      }
    }
  }, [isTesting, adSlot]);

  if (isTesting) {
    return (
      <div 
        className="ad-placeholder-container glass-card" 
        style={{
          background: 'linear-gradient(135deg, rgba(2, 242, 254, 0.02) 0%, rgba(244, 63, 94, 0.02) 100%)',
          border: '1px dashed rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          padding: '20px 30px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100px',
          margin: '25px 0',
          boxShadow: 'inset 0 0 20px rgba(255,255,255,0.01)'
        }}
      >
        {/* Subtle decorative glow */}
        <div style={{
          position: 'absolute',
          top: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '350px',
          height: '30px',
          background: 'radial-gradient(circle, rgba(2, 242, 254, 0.2) 0%, transparent 70%)',
          filter: 'blur(15px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}></div>

        <span style={{ 
          fontSize: '0.62rem', 
          color: 'var(--text-muted)', 
          textTransform: 'uppercase', 
          letterSpacing: '2px',
          marginBottom: '8px',
          fontWeight: 800
        }}>
          📢 Espaço Patrocinado (Monetização Google AdSense)
        </span>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <span style={{ fontSize: '1.8rem' }}>🏎️</span>
          <div style={{ textAlign: 'left' }}>
            <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Forza Tuning Hub Pro <span style={{ fontSize: '0.65rem', background: 'rgba(2, 242, 254, 0.1)', color: 'var(--color-cyan)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(2, 242, 254, 0.2)' }}>AD READY</span>
            </strong>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
              Seu anúncio do Google AdSense aparecerá aqui automaticamente após a aprovação da sua conta do site!
            </span>
          </div>
        </div>

        {/* Small debug badge */}
        <span style={{
          position: 'absolute',
          bottom: '8px',
          right: '12px',
          fontSize: '0.55rem',
          background: 'rgba(255,255,255,0.04)',
          padding: '2px 8px',
          borderRadius: '4px',
          color: 'var(--text-muted)',
          fontFamily: 'monospace'
        }}>
          Slot: {adSlot || 'ca-pub-XXXXXXXXXXXXX'}
        </span>
      </div>
    );
  }

  // Real Google AdSense responsive banner unit for Production
  return (
    <div className="adsense-banner-container" style={{ textAlign: 'center', margin: '25px 0', overflow: 'hidden' }}>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client={adClient}
           data-ad-slot={adSlot}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}

export default function App() {
  // ==========================================
  // 1. STATE & REF MANAGEMENT
  // ==========================================
  const [activeTab, setActiveTab] = useState('tab-calculator');

  // Vehicle Inputs State
  const [inputs, setInputs] = useState({
    weight: 1350,
    distribution: 52,
    drivetrain: 'AWD',
    terrain: 'road',
    carClass: 'S1',
    pi: 900,
    autoFillActive: true,
  });

  const [selectedCarPreset, setSelectedCarPreset] = useState('custom');

  // Drift specific states
  const [driftSliders, setDriftSliders] = useState({
    driftStyle: 'street', // 'street' or 'pro'
    steerAngle: 50,      // 0 to 100 (maps to toe front and caster)
    oversteerBias: 50,   // 0 to 100 (maps to rear stiffness)
  });

  // Drag specific states
  const [dragSliders, setDragSliders] = useState({
    dragStyle: 'awd_launch', // 'awd_launch', 'rwd_muscle', 'fwd_rocket'
    squatControl: 50,        // 0 to 100 (maps to rear stiffness & damping)
    gearingBias: 50,         // 0 to 100 (maps to final drive)
  });

  // Saved setups state
  const [savedSetups, setSavedSetups] = useState(() => {
    try {
      const stored = localStorage.getItem('forza_saved_setups');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error loading saved setups:', e);
      return [];
    }
  });
  const [newSetupName, setNewSetupName] = useState('');

  const [inputFlashActive, setInputFlashActive] = useState(false);
  const [activeAccordions, setActiveAccordions] = useState({
    tires: true,
    alignment: false,
    arbs: true,
    springs: true,
    damping: false,
    diff: false,
    aero: false
  });

  const [diagnosticSymptom, setDiagnosticSymptom] = useState(null);
  const [telemetry, setTelemetry] = useState(null);
  const [wsStatus, setWsStatus] = useState('disconnected');
  const [simulationActive, setSimulationActive] = useState(false);
  const [tutorialIps, setTutorialIps] = useState(['127.0.0.1']);
  const [lastPacketTime, setLastPacketTime] = useState(0);
  const [isGameTelemetryRunning, setIsGameTelemetryRunning] = useState(false);

  // States for advanced physics telemetry & timers
  const [perfTimer, setPerfTimer] = useState({
    state: 'idle', // 'idle', 'running', 'finished'
    startTime: 0,
    time0_100: null,
    time0_200: null,
  });

  const [bestRecords, setBestRecords] = useState(() => {
    try {
      const stored = localStorage.getItem('forza_best_records');
      return stored ? JSON.parse(stored) : { zero100: null, zero200: null };
    } catch (e) {
      return { zero100: null, zero200: null };
    }
  });

  // Drag Racing history state list (stores up to 50 runs in local storage)
  const [runHistory, setRunHistory] = useState(() => {
    try {
      const stored = localStorage.getItem('forza_run_history');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  // Custom vehicle mapping database (carOrdinal -> custom vehicle name)
  const [carMappings, setCarMappings] = useState(() => {
    try {
      const stored = localStorage.getItem('forza_car_mappings');
      return stored ? JSON.parse(stored) : {
        1005: 'Carro de Teste (Mock)',
        1110: 'Mazda MX-5 Miata',
        4090: 'Audi R8 V10 Performance'
      };
    } catch (e) {
      return {
        1005: 'Carro de Teste (Mock)',
        1110: 'Mazda MX-5 Miata',
        4090: 'Audi R8 V10 Performance'
      };
    }
  });

  // Helper functions to map Forza telemetry classes to game-authentic labels and styles
  const getCarClassLabel = (classVal) => {
    switch (classVal) {
      case 0: return 'D';
      case 1: return 'C';
      case 2: return 'B';
      case 3: return 'A';
      case 4: return 'S1';
      case 5: return 'S2';
      case 6: return 'X';
      default: return 'PR';
    }
  };

  const getCarClassColorClass = (classVal) => {
    switch (classVal) {
      case 0: return 'class-d';
      case 1: return 'class-c';
      case 2: return 'class-b';
      case 3: return 'class-a';
      case 4: return 'class-s1';
      case 5: return 'class-s2';
      case 6: return 'class-x';
      default: return 'class-custom';
    }
  };

  const [bottomingOutAlert, setBottomingOutAlert] = useState(null); // 'FL', 'FR', 'RL', 'RR' or null

  const wsRef = useRef(null);
  const canvasGForceRef = useRef(null);
  const staticUpdateCountRef = useRef(0);
  const bottomTimeoutRef = useRef(null);

  const maxSpeedRef = useRef(0);
  const maxGForceRef = useRef(0);

  // Helper function to dynamically record finished drag timing runs in history
  const saveRunToHistory = (time100, time200) => {
    // Dynamically retrieve the name from our custom mapping if available
    const activeId = telemetry?.carOrdinal || 0;
    const activeName = carMappings[activeId] || (activeId ? `Carro #${activeId}` : 'Carro Personalizado');

    const newRun = {
      id: 'run_' + Date.now(),
      timestamp: Date.now(),
      date: new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      time0_100: time100,
      time0_200: time200,
      maxSpeed: maxSpeedRef.current,
      maxGForce: maxGForceRef.current,
      carName: activeName
    };

    setRunHistory(prev => {
      const updated = [newRun, ...prev].slice(0, 50);
      localStorage.setItem('forza_run_history', JSON.stringify(updated));
      return updated;
    });
  };

  // Helper to calculate Wheelspin and ABS Lockup states dynamically
  const getWheelStatus = (prefix) => {
    if (!telemetry) return 'ok';
    const speed = telemetry.speedKmh;
    const accelInput = telemetry.accelInput;
    const brakeInput = telemetry.brakeInput;
    
    // Read wheel rotation speed from telemetry
    const rotation = telemetry[`wheelRotation${prefix}`];
    if (rotation === undefined) return 'ok';
    
    const wheelRadius = 0.33;
    const wheelKmh = Math.abs(rotation) * wheelRadius * 3.6;
    const slip = wheelKmh - speed;
    
    // Wheelspin: Wheel is spinning 15+ km/h faster than vehicle speed under throttle
    if (speed > 5 && slip > 15 && accelInput > 0.15) {
      return 'spin';
    }
    
    // ABS Lockup: Vehicle is moving, but wheel is stopped under heavy braking
    if (speed > 25 && wheelKmh < 3 && brakeInput > 0.15) {
      return 'lock';
    }
    
    return 'ok';
  };

  // ==========================================
  // 2. WEBSOCKET CONNECTION
  // ==========================================
  useEffect(() => {
    let ws;
    // Se o site for aberto localmente (localhost ou IP da rede de casa), conecta no próprio IP.
    // Se for aberto na nuvem (Vercel, Netlify, etc), conecta ao servidor local rodando no PC do jogador.
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' || 
                    window.location.hostname.startsWith('192.168.') ||
                    window.location.hostname.startsWith('10.');
    const wsHost = isLocal ? window.location.hostname : 'localhost';
    const wsUrl = `ws://${wsHost}:3000`;
    let reconnectTimeout;

    function connect() {
      console.log(`[WS] Connecting to telemetry backend at ${wsUrl}`);
      ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('[WS] Connected to telemetry backend.');
        setWsStatus('connected');
      };

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'telemetry') {
            const data = payload.data;
            setTelemetry(data);
            setLastPacketTime(Date.now());

            // Dynamic weight distribution estimator
            if (data.speedKmh > 5 && inputs.autoFillActive) {
              staticUpdateCountRef.current += 1;
              if (staticUpdateCountRef.current % 30 === 0) {
                const frontTravel = data.suspensionTravelFL + data.suspensionTravelFR;
                const totalTravel = frontTravel + data.suspensionTravelRL + data.suspensionTravelRR;
                if (totalTravel > 0) {
                  const estimatedFrontDist = Math.round((frontTravel / totalTravel) * 100);
                  if (estimatedFrontDist >= 35 && estimatedFrontDist <= 65) {
                    setInputs(prev => ({
                      ...prev,
                      distribution: estimatedFrontDist
                    }));
                  }
                }
              }
            }
          } else if (payload.type === 'init') {
            setTutorialIps(payload.data.ips || ['127.0.0.1']);
          } else if (payload.type === 'simulation_status') {
            setSimulationActive(payload.active);
          }
        } catch (err) {
          console.error('[WS] Error parsing telemetry payload:', err);
        }
      };

      ws.onclose = () => {
        console.log('[WS] Disconnected. Reconnecting in 3s...');
        setWsStatus('disconnected');
        setSimulationActive(false);
        reconnectTimeout = setTimeout(connect, 3000);
      };

      ws.onerror = (err) => {
        console.error('[WS] Socket error, closing connection.', err);
        ws.close();
      };
    }

    connect();

    return () => {
      if (ws) ws.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [inputs.autoFillActive]);

  // Packet Freshness / Telemetry Active Checker
  useEffect(() => {
    const checkTelemetry = () => {
      if (lastPacketTime > 0 && Date.now() - lastPacketTime < 2500) {
        setIsGameTelemetryRunning(true);
      } else {
        setIsGameTelemetryRunning(false);
      }
    };
    checkTelemetry(); // Run immediately
    const interval = setInterval(checkTelemetry, 1000);
    return () => clearInterval(interval);
  }, [lastPacketTime]);

  // ==========================================
  // 2.2. TELEMETRY ADVANCED PHYSICS TRACKING (0-100, WHEELSLIP & SUSPENSION ALARMS)
  // ==========================================
  useEffect(() => {
    if (!telemetry) return;
    const speed = telemetry.speedKmh;
    const accelInput = telemetry.accelInput;
    const now = Date.now();

    // 1. Performance timing logic
    if (perfTimer.state === 'idle') {
      // Waiting for launch (stopped, and throttle pressed > 25%)
      if (speed < 1 && accelInput > 0.25) {
        maxSpeedRef.current = 0;
        maxGForceRef.current = 0;
        setPerfTimer({
          state: 'running',
          startTime: now,
          time0_100: null,
          time0_200: null,
        });
      }
    } else if (perfTimer.state === 'running') {
      const elapsed = (now - perfTimer.startTime) / 1000;

      // Track max speed and longitudinal G-Force (accelZ)
      if (speed > maxSpeedRef.current) {
        maxSpeedRef.current = speed;
      }
      const currentG = Math.abs(telemetry.accelZ);
      if (currentG > maxGForceRef.current) {
        maxGForceRef.current = currentG;
      }

      // Detect 0 - 100 km/h
      if (!perfTimer.time0_100 && speed >= 100) {
        setPerfTimer(prev => ({ ...prev, time0_100: elapsed }));
        
        // Update best personal records
        setBestRecords(prev => {
          if (prev.zero100 === null || elapsed < prev.zero100) {
            const updated = { ...prev, zero100: elapsed };
            localStorage.setItem('forza_best_records', JSON.stringify(updated));
            return updated;
          }
          return prev;
        });
      }

      // Detect 0 - 200 km/h
      if (!perfTimer.time0_200 && speed >= 200) {
        setPerfTimer(prev => {
          const finishedTimer = { ...prev, state: 'finished', time0_200: elapsed };
          saveRunToHistory(finishedTimer.time0_100, elapsed);
          return finishedTimer;
        });
        
        // Update best personal records
        setBestRecords(prev => {
          if (prev.zero200 === null || elapsed < prev.zero200) {
            const updated = { ...prev, zero200: elapsed };
            localStorage.setItem('forza_best_records', JSON.stringify(updated));
            return updated;
          }
          return prev;
        });
      }

      // Reset timer if car stops or slows down completely (save run if it hit 0-100)
      if (speed < 1 && elapsed > 1.5 && accelInput === 0) {
        if (perfTimer.time0_100) {
          saveRunToHistory(perfTimer.time0_100, null);
        }
        setPerfTimer({
          state: 'idle',
          startTime: 0,
          time0_100: null,
          time0_200: null,
        });
      }
    } else if (perfTimer.state === 'finished') {
      // Auto-reset when driver slows down completely to 0 to do another run
      if (speed < 1 && accelInput === 0) {
        setPerfTimer({
          state: 'idle',
          startTime: 0,
          time0_100: null,
          time0_200: null,
        });
      }
    }

    // 2. Suspension Bottoming Out Alert Logic
    const wheelsTravel = [
      { id: 'Dianteira Esquerda (FL)', val: telemetry.suspensionTravelFrontLeftNorm },
      { id: 'Dianteira Direita (FR)', val: telemetry.suspensionTravelFrontRightNorm },
      { id: 'Traseira Esquerda (RL)', val: telemetry.suspensionTravelRearLeftNorm },
      { id: 'Traseira Direita (RR)', val: telemetry.suspensionTravelRearRightNorm }
    ];

    const bottomed = wheelsTravel.find(w => w.val >= 0.98);
    if (bottomed) {
      setBottomingOutAlert(bottomed.id);
      if (bottomTimeoutRef.current) clearTimeout(bottomTimeoutRef.current);
      bottomTimeoutRef.current = setTimeout(() => {
        setBottomingOutAlert(null);
      }, 1500);
    }

  }, [telemetry, perfTimer.state, perfTimer.startTime, perfTimer.time0_100, perfTimer.time0_200]);

  // Clean up suspension alarm timeout on unmount
  useEffect(() => {
    return () => {
      if (bottomTimeoutRef.current) clearTimeout(bottomTimeoutRef.current);
    };
  }, []);

  // ==========================================
  // 3. FORCE G CANVAS PLOTTER
  // ==========================================
  useEffect(() => {
    const canvas = canvasGForceRef.current;
    if (!canvas) return;

    const ctxG = canvas.getContext('2d');
    const size = canvas.width;
    const center = size / 2;
    const maxG = 2.0; // scale limit for normal driving

    ctxG.clearRect(0, 0, size, size);

    // Draw coordinate system lines
    ctxG.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctxG.lineWidth = 1;
    ctxG.beginPath();
    ctxG.moveTo(center, 15);
    ctxG.lineTo(center, size - 15);
    ctxG.moveTo(15, center);
    ctxG.lineTo(size - 15, center);
    ctxG.stroke();

    // Draw reference rings (0.5G, 1.0G, 1.5G)
    ctxG.lineWidth = 1;
    [0.5, 1.0, 1.5].forEach(g => {
      ctxG.strokeStyle = g === 1.0 ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)';
      ctxG.beginPath();
      ctxG.arc(center, center, (g / maxG) * (center - 20), 0, 2 * Math.PI);
      ctxG.stroke();
    });

    // Get current lateral and longitudinal G-forces
    const xG = telemetry ? telemetry.accelX : 0;
    const zG = telemetry ? telemetry.accelZ : 0;

    // Map G coordinates to canvas pixels
    // xG represents lateral (right is positive), zG represents longitudinal (forward/accel is positive)
    const posX = center + (xG / maxG) * (center - 20);
    const posY = center - (zG / maxG) * (center - 20); // invert Z since braking (decel) pushes dot UP

    // Constrain position inside canvas circle
    const dist = Math.sqrt((posX - center) ** 2 + (posY - center) ** 2);
    let drawX = posX;
    let drawY = posY;
    if (dist > (center - 15)) {
      const angle = Math.atan2(posY - center, posX - center);
      drawX = center + Math.cos(angle) * (center - 15);
      drawY = center + Math.sin(angle) * (center - 15);
    }

    // Draw pulsating center dot target
    ctxG.fillStyle = 'var(--color-pink)';
    ctxG.shadowColor = 'var(--color-pink)';
    ctxG.shadowBlur = 10;
    ctxG.beginPath();
    ctxG.arc(drawX, drawY, 8, 0, 2 * Math.PI);
    ctxG.fill();
    ctxG.shadowBlur = 0; // reset shadow
  }, [telemetry, activeTab]);

  // ==========================================
  // 4. ACTION HANDLERS
  // ==========================================
  const toggleSimulation = () => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'toggle_simulation',
        active: !simulationActive
      }));
    } else {
      console.warn('[WS] Cannot toggle simulation: connection is not open.');
    }
  };

  const autoFillSetup = () => {
    if (!telemetry) return;

    let dt = 'AWD';
    if (telemetry.drivetrainType === 0) dt = 'FWD';
    if (telemetry.drivetrainType === 1) dt = 'RWD';

    const classMap = ['D', 'C', 'B', 'A', 'S1', 'S2', 'X'];
    const cl = classMap[telemetry.carClass] || 'S1';

    const piVal = telemetry.carPerformanceIndex || 900;

    // Estimate distribution
    const frontTravel = telemetry.suspensionTravelFL + telemetry.suspensionTravelFR;
    const totalTravel = frontTravel + telemetry.suspensionTravelRL + telemetry.suspensionTravelRR;
    let estimatedDist = inputs.distribution;
    if (totalTravel > 0) {
      const estimatedFrontDist = Math.round((frontTravel / totalTravel) * 100);
      if (estimatedFrontDist >= 35 && estimatedFrontDist <= 65) {
        estimatedDist = estimatedFrontDist;
      }
    }

    setInputs(prev => ({
      ...prev,
      drivetrain: dt,
      carClass: cl,
      pi: piVal,
      distribution: estimatedDist
    }));

    // Trigger visual flash
    setInputFlashActive(true);
    setTimeout(() => {
      setInputFlashActive(false);
    }, 500);

    console.log('[AUTO-FILL] Setup data imported successfully from game UDP stream!');
  };

  const toggleAccordion = (key) => {
    setActiveAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInputChange = (field, val) => {
    let parsed = parseFloat(val);
    if (isNaN(parsed)) return;

    // Clamp values
    let min = 0, max = Infinity;
    if (field === 'weight') { min = 400; max = 3000; }
    if (field === 'distribution') { min = 35; max = 65; }
    if (field === 'pi') { min = 100; max = 999; }

    if (parsed < min) parsed = min;
    if (parsed > max) parsed = max;

    setSelectedCarPreset('custom');

    setInputs(prev => ({
      ...prev,
      [field]: parsed
    }));
  };

  const handleCarPresetChange = (presetId) => {
    setSelectedCarPreset(presetId);
    if (presetId === 'custom') return;

    const preset = CAR_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setInputs({
        weight: preset.weight,
        distribution: preset.distribution,
        drivetrain: preset.drivetrain,
        terrain: preset.terrain,
        carClass: preset.carClass,
        pi: preset.pi,
        autoFillActive: true
      });

      // Se for drift ou drag, inicializa sliders com valores padrão equilibrados
      if (preset.terrain === 'drift') {
        setDriftSliders({
          driftStyle: 'street',
          steerAngle: 50,
          oversteerBias: 50
        });
      } else if (preset.terrain === 'drag') {
        setDragSliders({
          dragStyle: 'awd_launch',
          squatControl: 50,
          gearingBias: 50
        });
      }

      setInputFlashActive(true);
      setTimeout(() => setInputFlashActive(false), 500);
    }
  };

  const handleSaveSetup = (e) => {
    e.preventDefault();
    if (!newSetupName.trim()) return;

    const newSetup = {
      id: Date.now().toString(),
      name: newSetupName.trim(),
      inputs: { ...inputs },
      driftSliders: { ...driftSliders },
      dragSliders: { ...dragSliders }
    };

    const updated = [...savedSetups, newSetup];
    setSavedSetups(updated);
    localStorage.setItem('forza_saved_setups', JSON.stringify(updated));
    setNewSetupName('');
  };

  const handleLoadSetup = (setup) => {
    setInputs(setup.inputs);
    if (setup.driftSliders) setDriftSliders(setup.driftSliders);
    if (setup.dragSliders) setDragSliders(setup.dragSliders);
    setSelectedCarPreset('custom');

    setInputFlashActive(true);
    setTimeout(() => setInputFlashActive(false), 500);
  };

  const handleDeleteSetup = (setupId, e) => {
    e.stopPropagation();
    const updated = savedSetups.filter(s => s.id !== setupId);
    setSavedSetups(updated);
    localStorage.setItem('forza_saved_setups', JSON.stringify(updated));
  };

  // ==========================================
  // 5. MATHEMATICAL TUNING CALCULATIONS
  // ==========================================
  const recommendations = useMemo(() => {
    const W = inputs.weight;
    const D = inputs.distribution / 100; // ratio front
    const DR = 1 - D; // ratio rear
    const terrain = inputs.terrain;
    const dt = inputs.drivetrain;

    // 1. TIRES (PNEUS)
    let tireFrontBar, tireRearBar, tireFrontPsi, tireRearPsi;
    if (terrain === 'road') {
      tireFrontPsi = 27.5 + (D * 2);
      tireRearPsi = 27.5 + (DR * 2);
    } else if (terrain === 'dirt') {
      tireFrontPsi = 24.5 + (D * 1.5);
      tireRearPsi = 24.5 + (DR * 1.5);
    } else if (terrain === 'drift') {
      // Drift: pneus traseiros mais cheios reduzem a aderência facilitando o slide
      const driftRearPressureBias = (driftSliders.oversteerBias - 50) / 10; // -5 a +5 PSI
      tireFrontPsi = 29.0 + (D * 2);
      tireRearPsi = 27.0 + (DR * 2) + driftRearPressureBias;
    } else { // drag
      // Drag: pneus traseiros murchos (15-20 PSI) aumentam a pegada de contato
      // Pneus dianteiros cheios diminuem o arrasto de rolagem
      const dragLaunchBias = (dragSliders.dragLaunch || 50) / 25; // maps around -2 to +2
      tireFrontPsi = 35.0 + 5.0 * (dragSliders.gearingBias / 100);
      tireRearPsi = 16.5 - (dragSliders.squatControl - 50) / 25;
    }

    tireFrontBar = tireFrontPsi * 0.0689476;
    tireRearBar = tireRearPsi * 0.0689476;

    // 2. ALINHAMENTO (ALIGNMENT)
    let camberF = -2.0, camberR = -1.5, toeF = 0.1, toeR = 0.0, caster = 6.2;
    if (terrain === 'road') {
      camberF = -2.0; camberR = -1.5; toeF = 0.1; toeR = 0.0; caster = 6.2;
    } else if (terrain === 'dirt') {
      camberF = -1.2; camberR = -0.8; toeF = 0.2; toeR = 0.1; caster = 5.5;
    } else if (terrain === 'drift') {
      // Drift: Cambagem dianteira super negativa para contato nas curvas esterçadas.
      // Caster alto e Toe Out dianteiro para resposta rápida e auto-esterço.
      const steerFactor = driftSliders.steerAngle / 100;
      camberF = -3.5 - 2.0 * steerFactor; // -3.5° a -5.5°
      camberR = -0.5 - 0.5 * (1 - steerFactor); // -1.0° a -0.5°
      toeF = 0.2 + 0.3 * steerFactor; // +0.2° a +0.5° (Toe Out)
      toeR = -0.05 - 0.1 * (driftSliders.oversteerBias / 100); // -0.05° a -0.15° (Toe In traseiro para estabilizar o slide)
      caster = 5.5 + 1.5 * steerFactor; // 5.5° a 7.0°
    } else { // drag
      // Drag: Rodas retas (0.0) para contato máximo em linha reta.
      camberF = 0.0;
      camberR = 0.0;
      toeF = 0.0;
      toeR = 0.0;
      caster = 5.0;
    }

    // 3. BARRAS ESTABILIZADORAS (ARBs)
    let arbFront = 20.0, arbRear = 20.0;
    const maxArb = 40.0, minArb = 1.0;

    if (terrain === 'road') {
      arbFront = (maxArb - minArb) * D + minArb;
      arbRear = (maxArb - minArb) * DR + minArb;
    } else if (terrain === 'dirt') {
      arbFront = (20.0 - minArb) * D + minArb;
      arbRear = (20.0 - minArb) * DR + minArb;
    } else if (terrain === 'drift') {
      // Frente macia (grip direcional) + traseira dura (destraciona)
      const oversteerFactor = driftSliders.oversteerBias / 100;
      arbFront = 12.0 * D * (1 - oversteerFactor * 0.3); // mais macio na frente
      arbRear = 30.0 + 9.5 * oversteerFactor; // super firme na traseira
    } else { // drag
      // ARBs duras evitam torção do chassi no arranque inicial
      const squatFactor = dragSliders.squatControl / 100;
      arbFront = 28.0 + 5.0 * squatFactor;
      arbRear = 32.0 + 7.0 * squatFactor;
    }

    // 4. MOLAS (SPRINGS)
    let springFront, springRear;
    let minSpring = 0.015 * W;
    let maxSpring = 0.22 * W;

    springFront = (maxSpring - minSpring) * D + minSpring;
    springRear = (maxSpring - minSpring) * DR + minSpring;

    let heightFront = "Mínima / Baixa (Asfalto)", heightRear = "Mínima / Baixa (Asfalto)";

    if (terrain === 'road') {
      heightFront = "Média-Baixa (Compensar Aerofólio)";
      heightRear = "Média-Baixa";
    } else if (terrain === 'dirt') {
      springFront *= 0.55;
      springRear *= 0.55;
      heightFront = "Máxima / Alta (Absorção)";
      heightRear = "Máxima / Alta";
    } else if (terrain === 'drift') {
      const oversteerFactor = driftSliders.oversteerBias / 100;
      springFront *= 0.70;
      springRear *= (0.80 + 0.25 * oversteerFactor);
      heightFront = "Baixa (Reduzir Rolamento)";
      heightRear = "Baixa-Média (Transferência controlada)";
    } else { // drag
      // Frente macia (deixa subir) + Traseira firme (evita bater fundo no chão)
      const squatFactor = dragSliders.squatControl / 100;
      springFront *= 0.75;
      springRear *= (1.2 + 0.5 * squatFactor);
      heightFront = "Baixa (Aerodinâmica frontal)";
      heightRear = "Média-Alta (Evitar bater traseira no chão)";
    }

    // 5. AMORTECEDORES (DAMPING)
    let rebF = 3.0 + 12.0 * D;
    let rebR = 3.0 + 12.0 * DR;

    if (terrain === 'dirt') {
      rebF *= 0.65;
      rebR *= 0.65;
    } else if (terrain === 'drift') {
      const oversteerFactor = driftSliders.oversteerBias / 100;
      rebF *= 0.75;
      rebR *= (1.0 + 0.25 * oversteerFactor);
    } else if (terrain === 'drag') {
      // Rebound frontal baixo (sobe frente rápido) + compressão traseira alta (segura squat)
      const squatFactor = dragSliders.squatControl / 100;
      rebF *= 0.45; // deixa a frente subir facilmente
      rebR *= (1.25 + 0.35 * squatFactor); // segura a descida traseira
    }

    const bumpF = rebF * 0.6;
    let bumpR = rebR * 0.6;
    if (terrain === 'drag') {
      bumpR = rebR * 0.8 * (1.1 + 0.3 * (dragSliders.squatControl / 100));
    }

    // 6. DIFERENCIAIS
    let diffAwdText = "", diffRwdText = "", diffFwdText = "";
    if (terrain === 'road') {
      diffAwdText = "Frente (Accel: 30% | Decel: 0%) | Traseira (Accel: 70% | Decel: 10%) | Central: 65% (Envio Traseira)";
      diffRwdText = "Accel: 55% | Decel: 20%";
      diffFwdText = "Accel: 40% | Decel: 5%";
    } else if (terrain === 'dirt') {
      diffAwdText = "Frente (Accel: 40% | Decel: 10%) | Traseira (Accel: 60% | Decel: 20%) | Central: 55%";
      diffRwdText = "Accel: 65% | Decel: 15%";
      diffFwdText = "Accel: 50% | Decel: 10%";
    } else if (terrain === 'drift') {
      const oversteerFactor = driftSliders.oversteerBias / 100;
      const frontAccel = Math.round(70 + 20 * oversteerFactor);
      const central = Math.round(80 + 15 * oversteerFactor);
      diffAwdText = `Frente (Accel: ${frontAccel}% | Decel: 30%) | Traseira (Accel: 100% | Decel: 100%) | Central: ${central}% (Traseira)`;
      diffRwdText = "Accel: 100% | Decel: 100% (Bloqueio Total do Diferencial Traseiro para drift constante)";
      diffFwdText = "Accel: 100% | Decel: 0%";
    } else { // drag
      const launchFactor = (dragSliders.squatControl) / 100;
      const centerBias = Math.round(75 + 15 * launchFactor);
      diffAwdText = `Frente (Accel: 100% | Decel: 0%) | Traseira (Accel: 100% | Decel: 0%) | Central: ${centerBias}% (Tração Traseira massiva)`;
      diffRwdText = "Accel: 100% | Decel: 0% (Diferencial 100% Bloqueado em aceleração para máxima força linear)";
      diffFwdText = "Accel: 100% | Decel: 0% (Bloqueio total)";
    }

    // 7. AERO, MARCHAS & FREIOS
    let aeroText = "Curva / Aderência (Máximo Frontal, 70% Traseiro)";
    let brakeText = "52% Frente | 100% Pressão (Equilibrado)";
    let gearingText = "3.80 (Ajustar marchas para vel. máxima)";

    if (terrain === 'dirt') {
      aeroText = "Média (Estabilidade em saltos)";
    } else if (terrain === 'drift') {
      aeroText = "Mínima / Retirar aerofólios traseiros para deslizar mais fácil";
      const ratio = (3.70 + 0.8 * (driftSliders.oversteerBias / 100)).toFixed(2);
      gearingText = `${ratio} (Marchas curtas e próximas para manter o carro em alto RPM durante o slide)`;
    } else if (terrain === 'drag') {
      aeroText = "Mínima / Remova aerofólios se possível para diminuir o arrasto linear";
      const ratio = (4.80 - 2.40 * (dragSliders.gearingBias / 100)).toFixed(2);
      gearingText = `${ratio} (Marcha Final focada em ${dragSliders.gearingBias > 60 ? 'Velocidade de Arrancada Longa' : dragSliders.gearingBias < 40 ? 'Explosão de Saída Curta' : 'Equilíbrio Aceleração/Final'})`;
    }

    return {
      tireFrontBar, tireRearBar, tireFrontPsi, tireRearPsi,
      camberF, camberR, toeF, toeR, caster,
      arbFront, arbRear,
      springFront, springRear, heightFront, heightRear,
      rebF, rebR, bumpF, bumpR,
      diffAwdText, diffRwdText, diffFwdText,
      aeroText, brakeText, gearingText
    };
  }, [inputs, driftSliders, dragSliders]);

  // ==========================================
  // 6. DIAGNOSTIC SYSTEM CONFIG
  // ==========================================
  const diagSolutions = {
    'over-entry': {
      title: 'Traseira Escapando na Entrada de Curva (Oversteer on Entry)',
      explanation: 'Isso ocorre porque a traseira perde tração rapidamente quando você esterça o volante. Para corrigir, precisamos amolecer o conjunto traseiro ou endurecer a frente para frear a transferência de peso.',
      frontArb: 'Frente: ENDURECER (Stiff →)',
      rearArb: 'Traseira: AMACIAR (← Soft)',
      frontDamp: 'Rebound Frente: ENDURECER (Stiff →)',
      rearDamp: 'Rebound Traseira: AMACIAR (← Soft)',
      extra: 'Tire Pressure: Reduzir ligeiramente a pressão dos pneus traseiros.'
    },
    'under-entry': {
      title: 'Frente Espalhando / Não Vira na Entrada (Understeer on Entry)',
      explanation: 'A frente do carro está sem aderência para iniciar a rotação na curva. Para resolver, precisamos permitir que a frente se comprima melhor ou dar mais força para a traseira girar.',
      frontArb: 'Frente: AMACIAR (← Soft)',
      rearArb: 'Traseira: ENDURECER (Stiff →)',
      frontDamp: 'Rebound Frente: AMACIAR (← Soft)',
      rearDamp: 'Rebound Traseira: ENDURECER (Stiff →)',
      extra: 'Toe Dianteiro: Adicionar 0.1° ou 0.2° de Divergência (Toe Out) para agilizar as respostas.'
    },
    'over-mid': {
      title: 'Escapando Traseira no Meio de Curva (Mid-corner Oversteer)',
      explanation: 'O carro perde aderência no meio da curva (ápice) mesmo sem você acelerar ou frear muito. Isso indica rigidez excessiva na traseira de forma geral.',
      frontArb: 'Frente: Manter / Rigidez padrão',
      rearArb: 'Traseira: AMACIAR (← Soft)',
      frontDamp: 'Molas Traseiras: AMACIAR (← Soft)',
      rearDamp: 'Rebound Traseira: AMACIAR (← Soft)',
      extra: 'Camber Traseiro: Aumentar camber negativo (ex: de -1.5° para -1.8°) para dar mais contato ao pneu sob curva.'
    },
    'under-mid': {
      title: 'Sai de Frente no Meio da Curva (Mid-corner Understeer)',
      explanation: 'O carro não consegue manter a trajetória interna no meio da curva. Indica molas dianteiras muito rígidas ou camber dianteiro insuficiente.',
      frontArb: 'Frente: AMACIAR (← Soft)',
      rearArb: 'Traseira: ENDURECER (Stiff →)',
      frontDamp: 'Molas Dianteiras: AMACIAR (← Soft)',
      rearDamp: 'Rebound Dianteiro: AMACIAR (← Soft)',
      extra: 'Camber Dianteiro: Aumentar camber negativo frontal (ex: de -2.0° para -2.3°).'
    },
    'over-exit': {
      title: 'Perda de Tração ao Acelerar na Saída (Corner Exit Oversteer)',
      explanation: 'Ao pisar no acelerador para sair da curva, as rodas traseiras patinam e o carro roda. Precisamos amolecer os amortecedores e molas traseiras para facilitar a transferência de peso para trás.',
      frontArb: 'Molas Traseiras: AMACIAR (← Soft)',
      rearArb: 'Compressão Traseira (Bump): AMACIAR (← Soft)',
      frontDamp: 'Rebound Dianteiro: AMACIAR (← Soft) (sobe a frente)',
      rearDamp: 'Diferencial Accel Traseiro: REDUZIR % (ex: 75% para 60%)',
      extra: 'Diminuir a aceleração do diferencial distribui melhor o torque entre as rodas traseiras.'
    },
    'under-exit': {
      title: 'Carro Espalha para Fora ao Acelerar (Corner Exit Understeer)',
      explanation: 'Ao acelerar na saída da curva, o carro insiste em ir reto em direção à zebra externa. Em carros AWD, isso é muito comum. Indica rigidez excessiva na frente sob tração.',
      frontArb: 'Frente: AMACIAR (← Soft)',
      rearArb: 'Traseira: ENDURECER (Stiff →)',
      frontDamp: 'Diferencial Central (AWD): Enviar mais torque para Traseira (ex: 65% para 70%)',
      rearDamp: 'Diferencial Dianteiro Accel: REDUZIR % (ex: 35% para 20%)',
      extra: 'Amaciar a mola traseira ligeiramente impede que a frente levante demais, mantendo os pneus frontais no chão.'
    },
    'rough-bumpy': {
      title: 'Carro Saltando Excessivamente ou Instável em Lombadas (Bumpy Road)',
      explanation: 'O carro quica como uma cabra em terrenos irregulares e perde o rumo. Isso ocorre porque os amortecedores estão impedindo a mola de trabalhar, ou as molas estão duras demais.',
      frontArb: 'Amortecedor de Compressão (Bump): AMACIAR (← Soft)',
      rearArb: 'Amortecedor de Retorno (Rebound): AMACIAR (← Soft)',
      frontDamp: 'Molas: AMACIAR Dianteira e Traseira (← Soft)',
      rearDamp: 'Altura do Chassi: Aumentar altura se estiver batendo no chão',
      extra: 'Damping no rali deve ser baixo (compressão perto de 2.0 a 3.0, retorno perto de 5.0 a 6.0).'
    },
    'rough-bottoming': {
      title: 'Fundo do Carro Batendo no Chão (Bottoming Out)',
      explanation: 'O chassi do carro bate violentamente no chão após saltos ou sob compressão em alta velocidade, causando perda de controle total.',
      frontArb: 'Altura do Chassi: AUMENTAR (← Estender)',
      rearArb: 'Molas: ENDURECER Dianteira e Traseira (Stiff →)',
      frontDamp: 'Compressão (Bump): ENDURECER (Stiff →)',
      rearDamp: 'Dica de Rali: Mantenha molas firmes e o carro bem alto para absorver pancadas verticais.',
      extra: 'Evite rebaixar carros de rali ou cross-country ao limite.'
    }
  };

  // Helper to color/fill tires based on temperatures (Ciano = cold, Green = ideal, Pink = hot)
  const getTireStyle = (temp) => {
    let tireColor = 'var(--border-glass)';
    let fillColor = 'var(--color-cyan)';

    if (temp < 65) {
      tireColor = 'hsla(182, 100%, 48%, 0.15)';
      fillColor = 'var(--color-cyan)';
    } else if (temp >= 65 && temp <= 92) {
      tireColor = 'rgba(0, 255, 85, 0.15)';
      fillColor = 'var(--color-green)';
    } else {
      tireColor = 'hsla(330, 100%, 55%, 0.2)';
      fillColor = 'var(--color-pink)';
    }
    return { borderColor: fillColor, backgroundColor: tireColor, fillColor };
  };

  // Helper to format Gear
  const getGearLabel = (gearVal) => {
    if (gearVal === 0) return 'R';
    if (gearVal > 0 && gearVal <= 10) return gearVal;
    return 'N';
  };

  return (
    <div className="app-container">

      {/* Top Navigation Header */}
      <header className="app-header">
        <div className="brand">
          <span className="brand-sub">FORZA HORIZON 6</span>
          <h1 className="brand-main">TUNING <span className="highlight">HUB</span></h1>
        </div>

        <div className="status-panel">
          <button
            id="btn-toggle-sim"
            className={`btn sim-toggle-btn ${simulationActive ? 'active' : ''}`}
            onClick={toggleSimulation}
            style={{ marginRight: '15px' }}
          >
            {simulationActive ? '🎮 DESLIGAR MOCK' : '🎮 LIGAR MOCK'}
          </button>

          <div 
            id="connection-status" 
            className={`status-indicator ${
              wsStatus !== 'connected' 
                ? 'offline' 
                : (simulationActive || isGameTelemetryRunning ? 'online' : 'warning')
            }`}
          >
            <span className="status-dot"></span>
            <span id="status-text" className="status-label">
              {wsStatus !== 'connected'
                ? 'SERVIDOR DESCONECTADO'
                : (simulationActive 
                    ? 'SIMULADOR LOCAL ATIVO' 
                    : (isGameTelemetryRunning ? 'TELEMETRIA FH6 ATIVA / CONECTADO' : 'AGUARDANDO SINAL DO JOGO...'))}
            </span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'tab-calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('tab-calculator')}
        >
          <svg className="tab-icon" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-4v2h4v2h-4v2h4v2H9V7h6v2z" /></svg>
          <span className="tab-text-desktop">🔧 CALCULADORA DE PRESSÃO & SUSPENSÃO</span>
          <span className="tab-text-mobile">🔧 CALCULADORA</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'tab-dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('tab-dashboard')}
        >
          <svg className="tab-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
          <span className="tab-text-desktop">🎮 HUD TELEMETRIA FH6</span>
          <span className="tab-text-mobile">🎮 TELEMETRIA</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'tab-diagnostic' ? 'active' : ''}`}
          onClick={() => setActiveTab('tab-diagnostic')}
        >
          <svg className="tab-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
          <span className="tab-text-desktop">📊 DIAGNÓSTICO FÍSICO AUTOMÁTICO</span>
          <span className="tab-text-mobile">📊 DIAGNÓSTICO</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'tab-tutorial' ? 'active' : ''}`}
          onClick={() => setActiveTab('tab-tutorial')}
        >
          <svg className="tab-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
          <span className="tab-text-desktop">📖 COMO CONECTAR AO JOGO</span>
          <span className="tab-text-mobile">📖 CONECTAR</span>
        </button>
      </nav>

      {/* Google AdSense Top Banner */}
      <div className="container ad-banner-section-top" style={{ maxWidth: '1200px', margin: '15px auto 0 auto', padding: '0 20px' }}>
        <GoogleAdSenseBanner 
          adClient="ca-pub-4979675212971833"
          adSlot="8392017482"
          isTesting={true}
        />
      </div>

      {/* Main Content Area */}
      <main className="main-content">

        {/* TAB 1: TUNING CALCULATOR */}
        <section id="tab-calculator" className={`tab-pane ${activeTab === 'tab-calculator' ? 'active' : ''}`}>
          <div className="grid-layout">

            {/* INPUT PANELS */}
            <div className={`card glass-card input-card ${inputFlashActive ? 'flash-active' : ''}`} style={{ transition: 'border-color 0.3s ease', borderColor: inputFlashActive ? 'var(--color-cyan)' : '' }}>
              <h2 className="card-title">1. Especificações do Veículo</h2>

              {/* BANCO DE CARROS / PRESETS */}
              <div className="form-group">
                <label htmlFor="select-car-preset">Banco de Carros (Predefinições):</label>
                <select
                  id="select-car-preset"
                  value={selectedCarPreset}
                  onChange={(e) => handleCarPresetChange(e.target.value)}
                  className="styled-select preset-select"
                >
                  {CAR_PRESETS.map(preset => (
                    <option key={preset.id} value={preset.id}>
                      {preset.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="input-weight">Peso Total (kg):</label>
                <div className="input-slider-wrapper">
                  <input
                    type="number"
                    id="input-weight"
                    value={inputs.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    min="400"
                    max="3000"
                    className="num-input"
                  />
                  <input
                    type="range"
                    id="slider-weight"
                    min="400"
                    max="3000"
                    value={inputs.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="range-slider"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="input-distribution">Distribuição de Peso Frontal (%):</label>
                <div className="input-slider-wrapper">
                  <input
                    type="number"
                    id="input-distribution"
                    value={inputs.distribution}
                    onChange={(e) => handleInputChange('distribution', e.target.value)}
                    min="35"
                    max="65"
                    className="num-input"
                  />
                  <input
                    type="range"
                    id="slider-distribution"
                    min="35"
                    max="65"
                    value={inputs.distribution}
                    onChange={(e) => handleInputChange('distribution', e.target.value)}
                    className="range-slider"
                  />
                </div>
                <div className="distribution-visual">
                  <span className="visual-label">FRENTE: <span>{inputs.distribution}%</span></span>
                  <div className="visual-bar-container">
                    <div className="visual-bar front" style={{ width: `${inputs.distribution}%` }}></div>
                    <div className="visual-bar rear" style={{ width: `${100 - inputs.distribution}%` }}></div>
                  </div>
                  <span className="visual-label">TRASEIRA: <span>{100 - inputs.distribution}%</span></span>
                </div>
              </div>

              <div className="grid-columns-2">
                <div className="form-group">
                  <label htmlFor="select-drivetrain">Tipo de Tração:</label>
                  <select
                    id="select-drivetrain"
                    value={inputs.drivetrain}
                    onChange={(e) => {
                      setSelectedCarPreset('custom');
                      setInputs(prev => ({ ...prev, drivetrain: e.target.value }));
                    }}
                    className="styled-select"
                  >
                    <option value="AWD">AWD (Integral)</option>
                    <option value="RWD">RWD (Traseira)</option>
                    <option value="FWD">FWD (Dianteira)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="select-terrain">Estilo de Direção / Terreno:</label>
                  <select
                    id="select-terrain"
                    value={inputs.terrain}
                    onChange={(e) => {
                      setSelectedCarPreset('custom');
                      setInputs(prev => ({ ...prev, terrain: e.target.value }));
                    }}
                    className="styled-select"
                  >
                    <option value="road">Road Racing (Asfalto Grip)</option>
                    <option value="dirt">Dirt Racing (Rali/Terra)</option>
                    <option value="drift">Drift (Escorregamento)</option>
                    <option value="drag">Drag (Arrancada Retilínea)</option>
                  </select>
                </div>
              </div>

              <div className="grid-columns-2 margin-top-xs">
                <div className="form-group">
                  <label htmlFor="select-class">Classe do Carro:</label>
                  <select
                    id="select-class"
                    value={inputs.carClass}
                    onChange={(e) => {
                      setSelectedCarPreset('custom');
                      setInputs(prev => ({ ...prev, carClass: e.target.value }));
                    }}
                    className="styled-select"
                  >
                    <option value="D">Classe D</option>
                    <option value="C">Classe C</option>
                    <option value="B">Classe B</option>
                    <option value="A">Classe A</option>
                    <option value="S1">Classe S1</option>
                    <option value="S2">Classe S2</option>
                    <option value="X">Classe X</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="input-pi">Índice (PI):</label>
                  <input
                    type="number"
                    id="input-pi"
                    value={inputs.pi}
                    onChange={(e) => handleInputChange('pi', e.target.value)}
                    min="100"
                    max="999"
                    className="styled-input"
                  />
                </div>
              </div>

              {/* SLIDERS CONDICIONAIS DE SINTONIA AVANÇADA */}
              {inputs.terrain === 'drift' && (
                <div className="fine-tuning-section drift-tuning">
                  <h3 className="section-subtitle color-pink">⚡ Ajustes Finos de Drift</h3>
                  
                  <div className="form-group">
                    <label>Estilo de Drift:</label>
                    <div className="radio-group">
                      <label className={`radio-label ${driftSliders.driftStyle === 'street' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="driftStyle"
                          value="street"
                          checked={driftSliders.driftStyle === 'street'}
                          onChange={() => setDriftSliders(prev => ({ ...prev, driftStyle: 'street' }))}
                        />
                        Rua / Fluido
                      </label>
                      <label className={`radio-label ${driftSliders.driftStyle === 'pro' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="driftStyle"
                          value="pro"
                          checked={driftSliders.driftStyle === 'pro'}
                          onChange={() => setDriftSliders(prev => ({ ...prev, driftStyle: 'pro' }))}
                        />
                        Fórmula D / Agressivo
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="slider-steer-angle">Ângulo Máximo de Esterço: <span className="value-badge font-mono">{driftSliders.steerAngle}%</span></label>
                    <div className="input-slider-wrapper">
                      <input
                        type="range"
                        id="slider-steer-angle"
                        min="0"
                        max="100"
                        value={driftSliders.steerAngle}
                        onChange={(e) => setDriftSliders(prev => ({ ...prev, steerAngle: parseInt(e.target.value) }))}
                        className="range-slider range-pink"
                      />
                    </div>
                    <span className="help-text">Aumenta o Toe Out e o Caster dianteiro para auto-esterçamento preciso.</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="slider-oversteer-bias">Tendência de Sobreesterço: <span className="value-badge font-mono">{driftSliders.oversteerBias}%</span></label>
                    <div className="input-slider-wrapper">
                      <input
                        type="range"
                        id="slider-oversteer-bias"
                        min="0"
                        max="100"
                        value={driftSliders.oversteerBias}
                        onChange={(e) => setDriftSliders(prev => ({ ...prev, oversteerBias: parseInt(e.target.value) }))}
                        className="range-slider range-pink"
                      />
                    </div>
                    <span className="help-text">Enrijece a traseira e infla os pneus traseiros para deslizar sob demanda.</span>
                  </div>
                </div>
              )}

              {inputs.terrain === 'drag' && (
                <div className="fine-tuning-section drag-tuning">
                  <h3 className="section-subtitle color-cyan">⚡ Ajustes Finos de Arrancada</h3>

                  <div className="form-group">
                    <label>Estilo de Arrancada:</label>
                    <div className="radio-group">
                      <label className={`radio-label ${dragSliders.dragStyle === 'awd_launch' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="dragStyle"
                          value="awd_launch"
                          checked={dragSliders.dragStyle === 'awd_launch'}
                          onChange={() => setDragSliders(prev => ({ ...prev, dragStyle: 'awd_launch' }))}
                        />
                        AWD (Lançamento Forte)
                      </label>
                      <label className={`radio-label ${dragSliders.dragStyle === 'rwd_muscle' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="dragStyle"
                          value="rwd_muscle"
                          checked={dragSliders.dragStyle === 'rwd_muscle'}
                          onChange={() => setDragSliders(prev => ({ ...prev, dragStyle: 'rwd_muscle' }))}
                        />
                        RWD Muscle (Tração Clássica)
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="slider-squat-control">Controle de Agachamento (Squat): <span className="value-badge font-mono">{dragSliders.squatControl}%</span></label>
                    <div className="input-slider-wrapper">
                      <input
                        type="range"
                        id="slider-squat-control"
                        min="0"
                        max="100"
                        value={dragSliders.squatControl}
                        onChange={(e) => setDragSliders(prev => ({ ...prev, squatControl: parseInt(e.target.value) }))}
                        className="range-slider range-cyan"
                      />
                    </div>
                    <span className="help-text">Enrijece a suspensão traseira na compressão para evitar perda de energia linear.</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="slider-gearing-bias">Escalonamento de Marchas: <span className="value-badge font-mono">{dragSliders.gearingBias}%</span></label>
                    <div className="input-slider-wrapper">
                      <input
                        type="range"
                        id="slider-gearing-bias"
                        min="0"
                        max="100"
                        value={dragSliders.gearingBias}
                        onChange={(e) => setDragSliders(prev => ({ ...prev, gearingBias: parseInt(e.target.value) }))}
                        className="range-slider range-cyan"
                      />
                    </div>
                    <span className="help-text">Ajusta o balanço da marcha final entre aceleração de saída e velocidade final.</span>
                  </div>
                </div>
              )}

              {telemetry && (
                <div className="udp-autofill-banner">
                  <span className="autofill-text">Telemetria Ativa detectada!</span>
                  <button onClick={autoFillSetup} className="btn btn-primary btn-sm">Auto-Preencher Dados</button>
                </div>
              )}
            </div>

            {/* CAR SETUPS MANAGER (LOCAL STORAGE) */}
            <div className="card glass-card setups-card margin-top-md">
              <h2 className="card-title">💾 Meus Setups Salvos</h2>
              
              <form onSubmit={handleSaveSetup} className="setup-save-form">
                <div className="form-group">
                  <label htmlFor="input-setup-name">Nome do Setup:</label>
                  <div className="setup-save-input-group">
                    <input
                      type="text"
                      id="input-setup-name"
                      placeholder="Ex: Skyline R34 Drag V1"
                      value={newSetupName}
                      onChange={(e) => setNewSetupName(e.target.value)}
                      className="styled-input setup-name-input"
                    />
                    <button type="submit" className="btn btn-primary btn-save">
                      Salvar
                    </button>
                  </div>
                </div>
              </form>

              <div className="setups-list-container">
                {savedSetups.length === 0 ? (
                  <p className="no-setups-text">Nenhum setup salvo ainda. Crie sua calibração acima e salve aqui!</p>
                ) : (
                  <div className="setups-list">
                    {savedSetups.map((setup) => (
                      <div key={setup.id} className="setup-item" onClick={() => handleLoadSetup(setup)}>
                        <div className="setup-item-details">
                          <span className="setup-item-name">{setup.name}</span>
                          <span className="setup-item-meta">
                            <span className="badge-class">{setup.inputs.carClass} {setup.inputs.pi}</span>
                            <span className="badge-terrain">{setup.inputs.terrain === 'road' ? 'Road' : setup.inputs.terrain === 'dirt' ? 'Dirt' : setup.inputs.terrain === 'drift' ? 'Drift' : 'Drag'}</span>
                            <span className="badge-drivetrain">{setup.inputs.drivetrain}</span>
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleDeleteSetup(setup.id, e)}
                          className="btn-delete-setup"
                          title="Excluir Setup"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* OUTPUT TUNING VALUES */}
            <div className="card glass-card output-card">
              <h2 className="card-title">2. Calibragem Recomendada</h2>

              <div className="accordion-container">

                {/* Accordion Section 1: PNEUS */}
                <div className={`accordion-item ${activeAccordions.tires ? 'active' : ''}`}>
                  <div className="accordion-header" onClick={() => toggleAccordion('tires')}>
                    <span className="header-title">Pneus (Tires)</span>
                    <span className="header-unit">Bar / PSI</span>
                  </div>
                  <div className="accordion-content">
                    <div className="val-row">
                      <span>Pressão Dianteira (Front):</span>
                      <span className="result-val highlight">
                        {recommendations.tireFrontBar.toFixed(2)} bar <span className="sub-val">({recommendations.tireFrontPsi.toFixed(1)} PSI)</span>
                      </span>
                    </div>
                    <div className="val-row border-top">
                      <span>Pressão Traseira (Rear):</span>
                      <span className="result-val highlight">
                        {recommendations.tireRearBar.toFixed(2)} bar <span className="sub-val">({recommendations.tireRearPsi.toFixed(1)} PSI)</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Accordion Section 2: ALINHAMENTO */}
                <div className={`accordion-item ${activeAccordions.alignment ? 'active' : ''}`}>
                  <div className="accordion-header" onClick={() => toggleAccordion('alignment')}>
                    <span className="header-title">Alinhamento (Alignment)</span>
                    <span className="header-unit">Graus / Ângulos</span>
                  </div>
                  <div className="accordion-content">
                    <div className="val-row">
                      <span>Camber Dianteiro (Front):</span>
                      <span className="result-val highlight">{recommendations.camberF.toFixed(1)}°</span>
                    </div>
                    <div className="val-row border-top">
                      <span>Camber Traseiro (Rear):</span>
                      <span className="result-val highlight">{recommendations.camberR.toFixed(1)}°</span>
                    </div>
                    <div className="val-row border-top">
                      <span>Convergência Dianteira (Toe Front):</span>
                      <span className="result-val highlight">
                        {recommendations.toeF > 0 ? '+' : ''}{recommendations.toeF.toFixed(1)}° {recommendations.toeF > 0 ? '(Out)' : recommendations.toeF < 0 ? '(In)' : ''}
                      </span>
                    </div>
                    <div className="val-row border-top">
                      <span>Convergência Traseira (Toe Rear):</span>
                      <span className="result-val highlight">
                        {recommendations.toeR > 0 ? '+' : ''}{recommendations.toeR.toFixed(1)}° {recommendations.toeR > 0 ? '(Out)' : recommendations.toeR < 0 ? '(In)' : '0.0°'}
                      </span>
                    </div>
                    <div className="val-row border-top">
                      <span>Caster Dianteiro (Caster):</span>
                      <span className="result-val highlight">{recommendations.caster.toFixed(1)}°</span>
                    </div>
                  </div>
                </div>

                {/* Accordion Section 3: BARRAS ESTABILIZADORAS */}
                <div className={`accordion-item ${activeAccordions.arbs ? 'active' : ''}`}>
                  <div className="accordion-header" onClick={() => toggleAccordion('arbs')}>
                    <span className="header-title">Barras Estabilizadoras (ARBs)</span>
                    <span className="header-unit">Rigidez (1.00 - 40.00)</span>
                  </div>
                  <div className="accordion-content">
                    <div className="val-row">
                      <span>Barra Dianteira (Front ARB):</span>
                      <span className="result-val highlight">{recommendations.arbFront.toFixed(2)}</span>
                    </div>
                    <div className="val-row border-top">
                      <span>Barra Traseira (Rear ARB):</span>
                      <span className="result-val highlight">{recommendations.arbRear.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Accordion Section 4: MOLAS E ALTURA */}
                <div className={`accordion-item ${activeAccordions.springs ? 'active' : ''}`}>
                  <div className="accordion-header" onClick={() => toggleAccordion('springs')}>
                    <span className="header-title">Molas (Springs & Height)</span>
                    <span className="header-unit">kgf/mm & cm</span>
                  </div>
                  <div className="accordion-content">
                    <div className="val-row">
                      <span>Mola Dianteira (Front Springs):</span>
                      <span className="result-val highlight">{recommendations.springFront.toFixed(1)} kgf/mm</span>
                    </div>
                    <div className="val-row border-top">
                      <span>Mola Traseira (Rear Springs):</span>
                      <span className="result-val highlight">{recommendations.springRear.toFixed(1)} kgf/mm</span>
                    </div>
                    <div className="val-row border-top">
                      <span>Altura Dianteira (Ride Height F):</span>
                      <span className="result-val highlight">{recommendations.heightFront}</span>
                    </div>
                    <div className="val-row border-top">
                      <span>Altura Traseira (Ride Height R):</span>
                      <span className="result-val highlight">{recommendations.heightRear}</span>
                    </div>
                  </div>
                </div>

                {/* Accordion Section 5: AMORTECEDORES */}
                <div className={`accordion-item ${activeAccordions.damping ? 'active' : ''}`}>
                  <div className="accordion-header" onClick={() => toggleAccordion('damping')}>
                    <span className="header-title">Amortecedores (Damping)</span>
                    <span className="header-unit">Escala (1.0 - 20.0)</span>
                  </div>
                  <div className="accordion-content">
                    <div className="val-row">
                      <span>Rigidez de Retorno D. (Front Rebound):</span>
                      <span className="result-val highlight">{recommendations.rebF.toFixed(1)}</span>
                    </div>
                    <div className="val-row border-top">
                      <span>Rigidez de Retorno T. (Rear Rebound):</span>
                      <span className="result-val highlight">{recommendations.rebR.toFixed(1)}</span>
                    </div>
                    <div className="val-row border-top">
                      <span>Rigidez de Compressão D. (Front Bump):</span>
                      <span className="result-val highlight">{recommendations.bumpF.toFixed(1)}</span>
                    </div>
                    <div className="val-row border-top">
                      <span>Rigidez de Compressão T. (Rear Bump):</span>
                      <span className="result-val highlight">{recommendations.bumpR.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                {/* Accordion Section 6: DIFERENCIAL */}
                <div className={`accordion-item ${activeAccordions.diff ? 'active' : ''}`}>
                  <div className="accordion-header" onClick={() => toggleAccordion('diff')}>
                    <span className="header-title">Diferencial (Differential)</span>
                    <span className="header-unit">% de Bloqueio</span>
                  </div>
                  <div className="accordion-content">
                    {inputs.drivetrain === 'AWD' && (
                      <div id="diff-block-awd">
                        <div className="val-row">
                          <span style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>Recomendação AWD:</span>
                          <span className="result-val highlight" style={{ fontSize: '0.9rem', textAlign: 'right', lineHeight: '1.4' }} dangerouslySetInnerHTML={{ __html: recommendations.diffAwdText.replace(/\|/g, '<br>') }}></span>
                        </div>
                      </div>
                    )}
                    {inputs.drivetrain === 'RWD' && (
                      <div id="diff-block-rwd">
                        <div className="val-row">
                          <span>Diferencial Traseiro:</span>
                          <span className="result-val highlight">{recommendations.diffRwdText}</span>
                        </div>
                      </div>
                    )}
                    {inputs.drivetrain === 'FWD' && (
                      <div id="diff-block-fwd">
                        <div className="val-row">
                          <span>Diferencial Dianteiro:</span>
                          <span className="result-val highlight">{recommendations.diffFwdText}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Accordion Section 7: MARCHAS & AERODINÂMICA */}
                <div className={`accordion-item ${activeAccordions.aero ? 'active' : ''}`}>
                  <div className="accordion-header" onClick={() => toggleAccordion('aero')}>
                    <span className="header-title">Aero, Freios & Marchas</span>
                    <span className="header-unit">Gearing / Aero / Brakes</span>
                  </div>
                  <div className="accordion-content">
                    <div className="val-row">
                      <span>Aerodinâmica (Aero):</span>
                      <span className="result-val highlight">{recommendations.aeroText}</span>
                    </div>
                    <div className="val-row border-top">
                      <span>Balanço de Freio (Brake Balance):</span>
                      <span className="result-val highlight">{recommendations.brakeText}</span>
                    </div>
                    <div className="val-row border-top font-weight-bold color-cyan">
                      <span>Marcha Final (Final Drive):</span>
                      <span className="result-val highlight">{recommendations.gearingText}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* REALTIME CHASSIS VISUALIZER */}
            <div className="card glass-card chassis-card margin-top-md">
              <h2 className="card-title">🏎️ Simulador Dinâmico de Alinhamento</h2>
              <div className="chassis-visualizer-container">
                <div className="camber-diagram">
                  <div className="chassis-axle front-axle">
                    <div className="wheel-left-wrap">
                      <div 
                        className={`chassis-wheel left-wheel ${inputs.drivetrain !== 'RWD' ? 'traction-active' : ''} ${
                          getWheelStatus('FL') === 'spin' ? 'wheel-spin' : getWheelStatus('FL') === 'lock' ? 'wheel-lock' : ''
                        }`}
                        style={{ 
                          transform: `rotate(${recommendations.camberF}deg)`,
                          borderWidth: `${recommendations.tireFrontPsi < 20 ? '5px' : recommendations.tireFrontPsi > 35 ? '2px' : '3px'}`
                        }}
                      >
                        <span className="wheel-label">F.L</span>
                      </div>
                      <span className="camber-label-value">{recommendations.camberF.toFixed(1)}°</span>
                    </div>

                    <div className="chassis-axle-beam">
                      <span className="axle-label">DIANTEIRO</span>
                    </div>

                    <div className="wheel-right-wrap">
                      <div 
                        className={`chassis-wheel right-wheel ${inputs.drivetrain !== 'RWD' ? 'traction-active' : ''} ${
                          getWheelStatus('FR') === 'spin' ? 'wheel-spin' : getWheelStatus('FR') === 'lock' ? 'wheel-lock' : ''
                        }`}
                        style={{ 
                          transform: `rotate(${-recommendations.camberF}deg)`,
                          borderWidth: `${recommendations.tireFrontPsi < 20 ? '5px' : recommendations.tireFrontPsi > 35 ? '2px' : '3px'}`
                        }}
                      >
                        <span className="wheel-label">F.R</span>
                      </div>
                      <span className="camber-label-value">{recommendations.camberF.toFixed(1)}°</span>
                    </div>
                  </div>

                  {/* Central chassis frame */}
                  <div className="chassis-center-frame">
                    <div className="traction-shaft-container">
                      {inputs.drivetrain === 'AWD' && <div className="traction-shaft awd-shaft"></div>}
                      {inputs.drivetrain === 'RWD' && <div className="traction-shaft rwd-shaft"></div>}
                      {inputs.drivetrain === 'FWD' && <div className="traction-shaft fwd-shaft"></div>}
                    </div>
                    <div className="chassis-specs-overlay">
                      <div className="spec-item">
                        <span className="spec-label">ESTILO</span>
                        <span className="spec-value highlight">
                          {inputs.terrain === 'road' && '🏆 ROAD'}
                          {inputs.terrain === 'dirt' && '🌲 DIRT'}
                          {inputs.terrain === 'drift' && '⚡ DRIFT'}
                          {inputs.terrain === 'drag' && '🔥 DRAG'}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">TRAÇÃO</span>
                        <span className="spec-value highlight">{inputs.drivetrain}</span>
                      </div>
                    </div>
                  </div>

                  <div className="chassis-axle rear-axle">
                    <div className="wheel-left-wrap">
                      <div 
                        className={`chassis-wheel left-wheel ${inputs.drivetrain !== 'FWD' ? 'traction-active' : ''} ${
                          getWheelStatus('RL') === 'spin' ? 'wheel-spin' : getWheelStatus('RL') === 'lock' ? 'wheel-lock' : ''
                        }`}
                        style={{ 
                          transform: `rotate(${recommendations.camberR}deg)`,
                          borderWidth: `${recommendations.tireRearPsi < 20 ? '5px' : recommendations.tireRearPsi > 35 ? '2px' : '3px'}`
                        }}
                      >
                        <span className="wheel-label">R.L</span>
                      </div>
                      <span className="camber-label-value">{recommendations.camberR.toFixed(1)}°</span>
                    </div>

                    <div className="chassis-axle-beam">
                      <span className="axle-label">TRASEIRO</span>
                    </div>

                    <div className="wheel-right-wrap">
                      <div 
                        className={`chassis-wheel right-wheel ${inputs.drivetrain !== 'FWD' ? 'traction-active' : ''} ${
                          getWheelStatus('RR') === 'spin' ? 'wheel-spin' : getWheelStatus('RR') === 'lock' ? 'wheel-lock' : ''
                        }`}
                        style={{ 
                          transform: `rotate(${-recommendations.camberR}deg)`,
                          borderWidth: `${recommendations.tireRearPsi < 20 ? '5px' : recommendations.tireRearPsi > 35 ? '2px' : '3px'}`
                        }}
                      >
                        <span className="wheel-label">R.R</span>
                      </div>
                      <span className="camber-label-value">{recommendations.camberR.toFixed(1)}°</span>
                    </div>
                  </div>
                </div>

                <div className="chassis-legend">
                  <div className="legend-item">
                    <span className="legend-dot traction-dot"></span>
                    <span>Transmissão Ativa ({inputs.drivetrain})</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot camber-dot"></span>
                    <span>Cambagem Reativa</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot tire-dot"></span>
                    <span>Espessura Borda = Pressão</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* TAB 2: LIVE TELEMETRY DASHBOARD */}
        <section id="tab-dashboard" className={`tab-pane ${activeTab === 'tab-dashboard' ? 'active' : ''}`}>
          
          {/* SUSPENSION BOTTOMING OUT REAL-TIME ALERT */}
          {bottomingOutAlert && (
            <div className="suspension-bottom-banner margin-bottom-md">
              <span className="banner-icon">🚨</span>
              <div>
                <div className="banner-title">Batendo Fim de Curso da Suspensão!</div>
                <div className="banner-desc">
                  O amortecedor/mola da <strong>{bottomingOutAlert}</strong> colapsou completamente (&gt;= 98%). Aumente a altura livre ou a rigidez.
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE VEHICLE SUMMARY BAR */}
          {telemetry && telemetry.carOrdinal > 0 && (
            <div className="active-vehicle-bar margin-bottom-md glass-card animate-pulse-slow">
              <div className="vehicle-info-left">
                <span className="vehicle-icon">🏎️</span>
                <div style={{ flex: 1 }}>
                  <div className="vehicle-class-row">
                    <span className={`class-badge ${getCarClassColorClass(telemetry.carClass)}`}>
                      {getCarClassLabel(telemetry.carClass)} {telemetry.carPerformanceIndex}
                    </span>
                    <span className="vehicle-id-label">ID do Carro: #{telemetry.carOrdinal}</span>
                  </div>
                  <input
                    type="text"
                    className="vehicle-name-input"
                    value={carMappings[telemetry.carOrdinal] || ''}
                    placeholder={`Identifique seu veículo (ex: Mazda MX-5 Miata)`}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCarMappings(prev => {
                        const updated = { ...prev, [telemetry.carOrdinal]: val };
                        localStorage.setItem('forza_car_mappings', JSON.stringify(updated));
                        return updated;
                      });
                    }}
                  />
                </div>
              </div>
              <div className="vehicle-status-right">
                <span className="pulse-indicator online"></span>
                <span className="status-text">Telemetria Forza Ativa</span>
              </div>
            </div>
          )}

          {/* PERFORMANCE Timing Dashboard */}
          <div className="perf-timer-panel margin-bottom-md">
            <div className="perf-timer-header">
              <h3 className="perf-timer-title">⏱️ Cronômetro de Arrancada de Alta Fidelidade</h3>
              <span className={`perf-status-badge ${perfTimer.state}`}>
                {perfTimer.state === 'idle' && 'Aguardando Largada (Acelere)'}
                {perfTimer.state === 'running' && 'Arrancada Detectada!'}
                {perfTimer.state === 'finished' && 'Teste Concluído'}
              </span>
            </div>
            
            <div className="perf-dashboard-layout">
              {/* Left Column: Active Timers & Controls */}
              <div className="perf-timers-section">
                <div className="perf-timer-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div className="perf-time-card" style={{ marginBottom: 0 }}>
                    <span className="perf-time-lbl">ACELERAÇÃO 0 - 100 KM/H</span>
                    <div className={`perf-time-val ${perfTimer.state === 'running' && !perfTimer.time0_100 ? 'active-time' : perfTimer.time0_100 ? 'completed-time' : ''}`}>
                      {perfTimer.state === 'running' && !perfTimer.time0_100
                        ? `${((Date.now() - perfTimer.startTime) / 1000).toFixed(2)}s`
                        : perfTimer.time0_100
                        ? `${perfTimer.time0_100.toFixed(2)}s`
                        : '---'}
                    </div>
                    <div className="perf-time-best">
                      🏆 Recorde Pessoal: <strong>{bestRecords.zero100 ? `${bestRecords.zero100.toFixed(2)}s` : 'Sem tempo'}</strong>
                    </div>
                  </div>

                  <div className="perf-time-card" style={{ marginBottom: 0 }}>
                    <span className="perf-time-lbl">ACELERAÇÃO 0 - 200 KM/H</span>
                    <div className={`perf-time-val ${perfTimer.state === 'running' && !perfTimer.time0_200 ? 'active-time' : perfTimer.time0_200 ? 'completed-time' : ''}`}>
                      {perfTimer.state === 'running' && !perfTimer.time0_200
                        ? `${((Date.now() - perfTimer.startTime) / 1000).toFixed(2)}s`
                        : perfTimer.time0_200
                        ? `${perfTimer.time0_200.toFixed(2)}s`
                        : '---'}
                    </div>
                    <div className="perf-time-best">
                      🏆 Recorde Pessoal: <strong>{bestRecords.zero200 ? `${bestRecords.zero200.toFixed(2)}s` : 'Sem tempo'}</strong>
                    </div>
                  </div>
                </div>

                <div className="perf-actions-row">
                  <button 
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.78rem', padding: '5px 12px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                    onClick={() => {
                      if (window.confirm('Deseja limpar todos os recordes pessoais de tempo?')) {
                        setBestRecords({ zero100: null, zero200: null });
                        localStorage.removeItem('forza_best_records');
                      }
                    }}
                  >
                    🗑️ Limpar Recordes
                  </button>
                </div>
              </div>

              {/* Right Column: Historical Ledger */}
              <div className="perf-history-section border-left">
                <h4 className="history-section-title">📊 Histórico Recente & Comparações</h4>
                {runHistory.length === 0 ? (
                  <div className="history-empty-state">
                    Nenhuma arrancada registrada ainda. Acelere até 100 ou 200 km/h para salvar!
                  </div>
                ) : (
                  <div className="history-list-scroll">
                    {runHistory.map(run => (
                      <div key={run.id} className="history-item-card">
                        <div className="history-item-header">
                          <input
                            type="text"
                            placeholder="Nome do Carro (ex: Skyline R34)"
                            value={run.carName || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setRunHistory(prev => {
                                const updated = prev.map(r => r.id === run.id ? { ...r, carName: val } : r);
                                localStorage.setItem('forza_run_history', JSON.stringify(updated));
                                return updated;
                              });
                            }}
                            className="history-car-input"
                          />
                          <button
                            className="history-delete-btn"
                            title="Excluir arrancada"
                            onClick={() => {
                              if (window.confirm('Excluir esta arrancada da lista de comparação?')) {
                                setRunHistory(prev => {
                                  const updated = prev.filter(r => r.id !== run.id);
                                  localStorage.setItem('forza_run_history', JSON.stringify(updated));
                                  return updated;
                                });
                              }
                            }}
                          >
                            ×
                          </button>
                        </div>
                        <div className="history-item-body">
                          <div className="history-stat">
                            <span>0-100:</span> <strong>{run.time0_100 ? `${run.time0_100.toFixed(2)}s` : '---'}</strong>
                          </div>
                          <div className="history-stat">
                            <span>0-200:</span> <strong>{run.time0_200 ? `${run.time0_200.toFixed(2)}s` : '---'}</strong>
                          </div>
                          <div className="history-stat">
                            <span>Pico G:</span> <strong>{run.maxGForce ? `${run.maxGForce.toFixed(2)}G` : '---'}</strong>
                          </div>
                          <div className="history-stat">
                            <span>Vel Max:</span> <strong>{run.maxSpeed ? `${Math.round(run.maxSpeed)} km/h` : '---'}</strong>
                          </div>
                        </div>
                        <div className="history-item-footer">
                          📅 {run.date}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Google AdSense Telemetry Tab Banner */}
          <div className="ad-banner-section margin-bottom-md" style={{ width: '100%' }}>
            <GoogleAdSenseBanner 
              adClient="ca-pub-4979675212971833"
              adSlot="5821034927"
              isTesting={true}
            />
          </div>

          <div className="grid-layout">

            {/* LEFT HUD PANELS */}
            <div className="card glass-card">
              <h2 className="card-title">Medidores de Física Ativos</h2>
              <div className="hud-dashboard">

                {/* Circular Gauges container */}
                <div className="radial-gauges-container">
                  <div className="gauge-card">
                    <span className="gauge-label">VELOCIDADE</span>
                    <div className="radial-gauge" style={{ borderTopColor: 'var(--color-pink)', borderRightColor: 'var(--color-pink)' }}>
                      <div className="gauge-number">{telemetry ? Math.round(telemetry.speedKmh) : 0}</div>
                      <div className="gauge-unit">km/h</div>
                    </div>
                  </div>

                  <div className="gauge-card">
                    <span className="gauge-label">RPM</span>
                    {(() => {
                      const rpm = telemetry ? telemetry.currentEngineRpm : 0;
                      const maxRpm = telemetry ? telemetry.engineMaxRpm : 8000;
                      const rpmPercent = maxRpm > 0 ? (rpm / maxRpm) * 100 : 0;
                      const isShiftLight = rpmPercent > 92;
                      const activeColor = isShiftLight ? 'var(--color-pink)' : rpmPercent > 85 ? 'var(--color-pink)' : 'var(--color-cyan)';

                      return (
                        <div
                          className={`radial-gauge ${isShiftLight ? 'shift-light-glow' : ''}`}
                          style={{
                            borderTopColor: activeColor,
                            borderRightColor: activeColor,
                            boxShadow: isShiftLight ? undefined : rpmPercent > 85 ? '0 0 15px var(--color-pink-glow)' : '0 0 15px var(--color-cyan-glow)'
                          }}
                        >
                          <div className="gauge-number">{telemetry ? Math.round(rpm) : 0}</div>
                          <div className="gauge-unit">RPM</div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* G-Force Coordinate Plotter */}
                <div className="gforce-container margin-top-md" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span className="hud-sub-label" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '10px' }}>
                    G-FORCE METER (ACELERAÇÃO LATERAL / LONGI)
                  </span>
                  <div className="gforce-plotter-wrapper">
                    <canvas ref={canvasGForceRef} id="canvas-gforce" width="220" height="220" className="canvas-gforce"></canvas>
                    <div className="gforce-indicator-labels">
                      <span className="g-lbl top">FRENTE (Brake G)</span>
                      <span className="g-lbl bottom">TRASEIRA (Accel G)</span>
                      <span className="g-lbl left">ESQ (Left G)</span>
                      <span className="g-lbl right">DIR (Right G)</span>
                    </div>
                  </div>
                  <div className="gforce-text-val">
                    Lat: <span className="color-cyan">{telemetry ? telemetry.accelX.toFixed(2) : '0.00'}G</span> | Long: <span className="color-pink">{telemetry ? telemetry.accelZ.toFixed(2) : '0.00'}G</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT TELEMETRY PANELS (TIRES HEAT & INPUTS) */}
            <div className="card glass-card flex-column justify-between">
              <div>
                <h2 className="card-title">Temperatura e Aderência dos Pneus</h2>

                <div className="tires-heatmap-container">
                  {['fl', 'fr', 'rl', 'rr'].map(prefix => {
                    const temp = telemetry ? telemetry[`tireTemp${prefix.toUpperCase()}`] : 20;
                    const travelNorm = telemetry ? telemetry[`suspensionTravel${prefix === 'fl' ? 'FrontLeft' : prefix === 'fr' ? 'FrontRight' : prefix === 'rl' ? 'RearLeft' : 'RearRight'}Norm`] : 0.55;
                    const loadPercent = Math.max(0, Math.min(100, (1 - travelNorm) * 100));

                    const tStyle = getTireStyle(temp);
                    const wStatus = getWheelStatus(prefix.toUpperCase());

                    return (
                      <div
                        key={prefix}
                        className={`tire-indicator ${wStatus === 'lock' ? 'tire-lock-alert' : wStatus === 'spin' ? 'tire-spin-alert' : ''}`}
                        style={{
                          borderColor: tStyle.borderColor,
                          backgroundColor: tStyle.backgroundColor
                        }}
                      >
                        <span className="tire-lbl">{prefix.toUpperCase()}</span>
                        <span className="tire-temp-val">{Math.round(temp)}°C</span>
                        
                        {/* ABS Lock / Wheelspin Overlays */}
                        {wStatus === 'lock' && <div className="abs-badge">🚨 ABS LOCK</div>}
                        {wStatus === 'spin' && <div className="spin-badge">💨 SPIN</div>}

                        <div
                          className="tire-bar-fill"
                          style={{
                            height: `${loadPercent}%`,
                            backgroundColor: tStyle.fillColor
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
                <p className="legend-text">
                  Cores indicam temperatura: <span className="color-cyan">Ciano</span> (frio), <span style={{ color: '#00ff55' }}>Verde</span> (ideal, ~80°C) e <span className="color-pink">Rosa</span> (superaquecido, &gt;100°C).
                </p>
              </div>

              {/* Pedals & Steer input visualizer */}
              <div className="inputs-container border-top margin-top-md padding-top-md">
                <h3 className="card-sub-title" style={{ fontSize: '0.88rem', fontWeight: 800, marginBottom: '12px' }}>Comandos do Piloto</h3>
                <div className="input-bars-layout">

                  <div className="pedal-bar-wrapper">
                    <span className="pedal-lbl">ACELERADOR</span>
                    <div className="pedal-bar-container">
                      <div
                        className="pedal-bar-fill accel"
                        style={{ width: `${telemetry ? telemetry.accelInput * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="pedal-val">{telemetry ? Math.round(telemetry.accelInput * 100) : 0}%</span>
                  </div>

                  <div className="pedal-bar-wrapper">
                    <span className="pedal-lbl">FREIO</span>
                    <div className="pedal-bar-container">
                      <div
                        className="pedal-bar-fill brake"
                        style={{ width: `${telemetry ? telemetry.brakeInput * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="pedal-val">{telemetry ? Math.round(telemetry.brakeInput * 100) : 0}%</span>
                  </div>

                  <div className="pedal-bar-wrapper">
                    <span className="pedal-lbl">DIREÇÃO (ESTERÇO)</span>
                    <div className="steer-visual-container">
                      <div
                        className="steer-rotator"
                        style={{ transform: `rotate(${telemetry ? telemetry.steer * 90 : 0}deg)` }}
                      >
                        ▲
                      </div>
                    </div>
                    <span className="pedal-val">{telemetry ? Math.round(Math.abs(telemetry.steer * 100)) : 0}%</span>
                  </div>

                </div>

                <div className="val-row margin-top-xs">
                  <span>Marcha Engatada:</span>
                  <span className="highlight font-size-lg">{telemetry ? getGearLabel(telemetry.gear) : 'N'}</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* TAB 3: DIAGNOSTIC GUIDE */}
        <section id="tab-diagnostic" className={`tab-pane ${activeTab === 'tab-diagnostic' ? 'active' : ''}`}>
          <div className="card glass-card">
            <h2 className="card-title">Guia Interativo de Diagnóstico & Correção</h2>
            <p className="section-intro" style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '20px' }}>
              O carro está se comportando mal nas curvas? Escolha um sintoma abaixo para obter um diagnóstico exato de qual ajuste fazer para corrigir o problema.
            </p>

            <div className="diagnostic-sections-grid">

              {/* Entrada de curva */}
              <div className="diag-group">
                <h3>Entrada de Curva (Turn-in)</h3>
                <button
                  className={`btn btn-secondary diag-trigger ${diagnosticSymptom === 'over-entry' ? 'active' : ''}`}
                  onClick={() => setDiagnosticSymptom('over-entry')}
                >
                  O carro sai de traseira (Roda traseira escorrega)
                </button>
                <button
                  className={`btn btn-secondary diag-trigger ${diagnosticSymptom === 'under-entry' ? 'active' : ''}`}
                  onClick={() => setDiagnosticSymptom('under-entry')}
                >
                  O carro sai de frente (Direção não responde)
                </button>
              </div>

              {/* Meio de curva */}
              <div className="diag-group">
                <h3>Meio de Curva (Mid-corner)</h3>
                <button
                  className={`btn btn-secondary diag-trigger ${diagnosticSymptom === 'over-mid' ? 'active' : ''}`}
                  onClick={() => setDiagnosticSymptom('over-mid')}
                >
                  Escapa traseira no meio da curva (Sem tração)
                </button>
                <button
                  className={`btn btn-secondary diag-trigger ${diagnosticSymptom === 'under-mid' ? 'active' : ''}`}
                  onClick={() => setDiagnosticSymptom('under-mid')}
                >
                  Sai de frente no meio da curva (Não tangencia)
                </button>
              </div>

              {/* Saída de curva */}
              <div className="diag-group">
                <h3>Saída de Curva (Corner Exit)</h3>
                <button
                  className={`btn btn-secondary diag-trigger ${diagnosticSymptom === 'over-exit' ? 'active' : ''}`}
                  onClick={() => setDiagnosticSymptom('over-exit')}
                >
                  Destraciona traseira ao acelerar na saída
                </button>
                <button
                  className={`btn btn-secondary diag-trigger ${diagnosticSymptom === 'under-exit' ? 'active' : ''}`}
                  onClick={() => setDiagnosticSymptom('under-exit')}
                >
                  Carro espalha para fora ao acelerar na saída
                </button>
              </div>

              {/* Irregularidades */}
              <div className="diag-group">
                <h3>Irregularidades & Saltos</h3>
                <button
                  className={`btn btn-secondary diag-trigger ${diagnosticSymptom === 'rough-bumpy' ? 'active' : ''}`}
                  onClick={() => setDiagnosticSymptom('rough-bumpy')}
                >
                  Carro quica muito ou perde controle em lombadas
                </button>
                <button
                  className={`btn btn-secondary diag-trigger ${diagnosticSymptom === 'rough-bottoming' ? 'active' : ''}`}
                  onClick={() => setDiagnosticSymptom('rough-bottoming')}
                >
                  Fundo do carro bate no chão (Instabilidade)
                </button>
              </div>

            </div>

            {/* DIAGNOSTIC OUTPUT CONTAINER */}
            {diagnosticSymptom && diagSolutions[diagnosticSymptom] && (() => {
              const sol = diagSolutions[diagnosticSymptom];
              const boxClass = (text) => text.includes('AMACIAR') ? 'soft' : text.includes('ENDURECER') ? 'stiff' : 'neutral';

              return (
                <div id="diagnostic-result-card" className="diag-output-card">
                  <h3 id="diag-result-title" className="color-cyan" style={{ fontFamily: 'Outfit', fontWeight: 800, marginBottom: '14px' }}>
                    Diagnóstico: {sol.title}
                  </h3>
                  <div className="diag-solution-body">
                    <div className="diag-explanation-box">
                      <strong>Física do Comportamento:</strong> <span>{sol.explanation}</span>
                    </div>

                    <div className="diag-slider-direction margin-top-md">
                      <span className="slider-name">PASSO 1: BARRAS ESTABILIZADORAS (ARBs)</span>
                      <div className="diag-arrow-visual flex-row justify-between align-center">
                        <div className={`adjust-box ${boxClass(sol.frontArb)}`}>{sol.frontArb}</div>
                        <div className={`adjust-box ${boxClass(sol.rearArb)}`}>{sol.rearArb}</div>
                      </div>
                    </div>

                    <div className="diag-slider-direction border-top padding-top-sm margin-top-sm">
                      <span className="slider-name">PASSO 2: RIGIDEZ DE SUSPENSÃO & AMORTECEDORES</span>
                      <div className="diag-arrow-visual flex-row justify-between align-center">
                        <div className={`adjust-box ${boxClass(sol.frontDamp)}`}>{sol.frontDamp}</div>
                        <div className={`adjust-box ${boxClass(sol.rearDamp)}`}>{sol.rearDamp}</div>
                      </div>
                    </div>

                    <div className="diag-slider-direction border-top padding-top-sm margin-top-sm">
                      <span className="slider-name">AJUSTE RECOMENDADO FINAL (EXTRA)</span>
                      <div className="adjust-box stiff" style={{ textAlign: 'left', fontSize: '0.8rem', padding: '10px 14px' }}>
                        {sol.extra}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        </section>

        {/* TAB 4: CONNECTION TUTORIAL */}
        <section id="tab-tutorial" className={`tab-pane ${activeTab === 'tab-tutorial' ? 'active' : ''}`}>
          <div className="card glass-card">
            <h2 className="card-title" style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.8rem' }}>
              <span className="highlight">Guia de Conexão</span> e Configuração
            </h2>
            <p className="section-intro" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              Configurar o painel é super simples! Siga o guia passo a passo abaixo para ligar o servidor no seu computador, conectar seu celular na mesma tela e sincronizar o seu Forza Horizon.
            </p>

            <div className="setup-layout-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginTop: '20px' }}>
              
              {/* PC SERVER SETUP WIZARD (FOR BEGINNERS) */}
              <div className="setup-card" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', padding: '24px', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ color: 'var(--color-cyan)', fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🖥️</span> 1. Iniciar o Painel no Computador
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                  O painel precisa do <strong>Node.js</strong> para coletar a física do jogo de forma leve e segura.
                </p>

                <div className="setup-steps-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Step A */}
                  <div className="setup-step-item" style={{ borderLeft: '2px solid var(--color-cyan)', paddingLeft: '12px' }}>
                    <strong style={{ fontSize: '0.85rem', display: 'block', color: 'var(--text-primary)' }}>A. Instalar o Node.js</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                      Baixe e instale a versão <strong>LTS</strong> recomendada. É grátis e seguro!
                    </span>
                    <a 
                      href="https://nodejs.org/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary" 
                      style={{ fontSize: '0.7rem', padding: '6px 12px', display: 'inline-block', textDecoration: 'none', background: 'linear-gradient(135deg, #02f2fe 0%, #007adf 100%)' }}
                    >
                      Acessar nodejs.org ➔
                    </a>
                  </div>

                  {/* Step B */}
                  <div className="setup-step-item" style={{ borderLeft: '2px solid var(--color-pink)', paddingLeft: '12px' }}>
                    <strong style={{ fontSize: '0.85rem', display: 'block', color: 'var(--text-primary)' }}>B. Instalar os Componentes</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Abra o prompt de comando (ou PowerShell) dentro da pasta do projeto e rode:
                    </span>
                    <pre style={{ background: 'var(--bg-deep)', color: 'var(--color-pink)', padding: '6px 10px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.75rem', marginTop: '4px', border: '1px solid var(--border-glass)' }}>
                      npm install
                    </pre>
                  </div>

                  {/* Step C */}
                  <div className="setup-step-item" style={{ borderLeft: '2px solid var(--color-cyan)', paddingLeft: '12px' }}>
                    <strong style={{ fontSize: '0.85rem', display: 'block', color: 'var(--text-primary)' }}>C. Ligar o Servidor</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Para ligar o painel e começar a receber os dados, execute:
                    </span>
                    <pre style={{ background: 'var(--bg-deep)', color: 'var(--color-cyan)', padding: '6px 10px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.75rem', marginTop: '4px', border: '1px solid var(--border-glass)' }}>
                      npm run dev
                    </pre>
                  </div>
                </div>
              </div>

              {/* GAME CONSOLE/PC CONFIGURATION */}
              <div className="setup-card" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-glass)', padding: '24px', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ color: 'var(--color-pink)', fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🎮</span> 2. Configurar o seu Forza Horizon
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                  Abra as configurações do seu jogo no Xbox ou PC e vá até o menu <strong>HUD e Jogabilidade</strong>. Ajuste os seguintes campos no final da lista:
                </p>

                {/* DYNAMIC FORZA FIELDS CARD */}
                <div style={{ background: 'var(--bg-deep)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Saída de Dados (Data Out)</span>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--color-cyan)' }}>LIGADO / ON</strong>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>IP de Saída (Data Out IP Address)</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                      {tutorialIps && tutorialIps.length > 0 ? tutorialIps[0] : '127.0.0.1'}
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                      *(Use <code>127.0.0.1</code> se o jogo estiver no mesmo PC do painel)*
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Porta de Saída (Data Out Port)</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--color-pink)', fontFamily: 'monospace' }}>9999</strong>
                  </div>
                </div>
              </div>

            </div>

            {/* MOBILE ACCESS CARDS */}
            <div className="mobile-access-panel" style={{ background: 'rgba(2, 242, 254, 0.03)', border: '1px solid rgba(2, 242, 254, 0.15)', padding: '24px', borderRadius: 'var(--radius-lg)', marginTop: '25px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'between' }}>
                <div style={{ flex: '1 1 400px' }}>
                  <h3 style={{ color: 'var(--color-cyan)', fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.25rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📱</span> 3. Acessar no seu Celular ou Tablet!
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Para pilotar tendo o seu celular como painel de telemetria auxiliar do seu cockpit, certifique-se de que ele está conectado ao **mesmo Wi-Fi** do computador e abra o link abaixo no navegador do celular:
                  </p>
                  
                  {/* Dynamic interactive link */}
                  <div style={{ marginTop: '14px', background: 'var(--bg-deep)', padding: '12px 18px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '10px', border: '1px solid var(--border-glass)' }}>
                    <span className="pulse-dot" style={{ backgroundColor: 'var(--color-green)', width: '8px', height: '8px', borderRadius: '50%' }}></span>
                    <a 
                      href={`http://${tutorialIps && tutorialIps.length > 0 ? tutorialIps[0] : '192.168.15.85'}:5173/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--color-cyan)', fontFamily: 'monospace', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}
                    >
                      http://{tutorialIps && tutorialIps.length > 0 ? tutorialIps[0] : '192.168.15.85'}:5173/
                    </a>
                  </div>
                </div>

                <div style={{ flex: '0 0 160px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                  <span style={{ fontSize: '2.5rem', marginBottom: '4px' }}>📶</span>
                  <strong style={{ fontSize: '0.78rem', display: 'block', color: 'var(--text-primary)' }}>Wi-Fi Unificado</strong>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                    Ambos os dispositivos devem estar conectados no mesmo roteador.
                  </span>
                </div>
              </div>
            </div>

            {/* MOCK SIMULATOR HELP PANEL */}
            <div className="mock-help-panel border-top margin-top-lg padding-top-md" style={{ background: 'rgba(255,255,255,0.01)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
              <h3 className="card-sub-title" style={{ color: 'var(--color-cyan)', marginBottom: '8px', fontSize: '1rem', fontWeight: 800 }}>
                💡 Testar sem ligar o videogame (Modo Simulador)
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Quer ver as agulhas do painel rodando imediatamente? Clique no botão **🎮 LIGAR MOCK** localizado no topo do cabeçalho da página! Ele ativará um piloto virtual direto no servidor que acelera, freia e esterça o carro em tempo real.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* Google AdSense Bottom Banner */}
      <div className="container ad-banner-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <GoogleAdSenseBanner 
          adClient="ca-pub-4979675212971833"
          adSlot="6729103847"
          isTesting={true}
        />
      </div>

      {/* Project Instructions / Setup Guide */}
      <footer className="app-footer glass-card">
        <div className="footer-grid">
          <div>
            <h3>Como conectar no Forza Horizon 6 (PC ou Xbox)</h3>
            <ol className="step-list">
              <li>Abra as configurações do Forza Horizon -&gt; <strong>Opções de HUD e Jogabilidade</strong>.</li>
              <li>Role até o final e ative o <strong>Data Out (Saída de Dados)</strong> para <strong>LIGADO</strong>.</li>
              <li>Defina o endereço IP para <strong>127.0.0.1</strong> (se estiver no mesmo PC) ou o <strong>IP local do seu computador</strong> (se jogar no Xbox ou outro PC).</li>
              <li>Defina a Porta Data Out para <strong>9999</strong>.</li>
              <li>Acelere o carro! O status acima mudará automaticamente para <strong className="color-cyan">LIVE TELEMETRY</strong>.</li>
            </ol>
          </div>
          <div className="footer-quick-tips">
            <h3>Dicas Rápidas de Tuning</h3>
            <ul>
              <li><strong>AWD Center Balance:</strong> Configure entre 60% e 70% para a traseira para evitar saídas de frente clássicas dos carros integrais.</li>
              <li><strong>Molas (Springs):</strong> Deixe a frente e traseira equilibradas com base no peso. Uma suspensão macia demais causa lentidão nas respostas; dura demais faz o carro deslizar em irregularidades.</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom border-top text-center padding-top-sm" style={{ marginTop: '15px' }}>
          Forza Horizon 6 - Tuning Hub &copy; Desenvolvido localmente para performance máxima.
        </div>
      </footer>
    </div>
  );
}
