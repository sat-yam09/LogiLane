export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  category: string;
  metric: string;
  metricLabel: string;
  description: string;
  specs: string[];
}

export interface TimelineMilestone {
  phase: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  telemetry: {
    label: string;
    value: string;
  }[];
  manifestItems: string[];
}

export interface RouteCorridor {
  id: string;
  origin: string;
  originCode: string;
  destination: string;
  destCode: string;
  distanceMiles: number;
  autonomousHours: number;
  dieselHours: number;
  co2SavedKg: number;
  platoonEfficiency: string;
  corridorStatus: 'ACTIVE' | 'HIGH TRAFFIC' | 'PRIORITY ALLOCATED';
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'long-haul',
    code: 'SRV-01',
    title: 'Class-8 Autonomous Long-Haul',
    category: 'PRIMARY CORRIDORS',
    metric: '24 / 7',
    metricLabel: 'Continuous Transit',
    description: 'Level 4 commercial freight movement along dedicated interstate corridors with zero driver fatigue downtime and microsecond emergency fail-safe redundancy.',
    specs: ['Sub-10ms V2X Telemetry', '80,000 LBS Max GVWR Rating', 'Continuous Night-Haul Protocol']
  },
  {
    id: 'yard-orchestration',
    code: 'SRV-02',
    title: 'Dynamic Yard & Dock Orchestration',
    category: 'FACILITY LOGISTICS',
    metric: '< 14s',
    metricLabel: 'Avg Dwell Turnaround',
    description: 'Computer-vision autonomous yard tractors perform precision trailer spotting, automated fifth-wheel coupling, and zero-dwell bay allocation.',
    specs: ['Millimeter-Grade Dock Alignment', 'Automated Kingpin Verification', 'Full WMS/TMS API Integration']
  },
  {
    id: 'thermal-telemetry',
    code: 'SRV-03',
    title: 'Thermal & Cryo-Chain Telemetry',
    category: 'CLIMATE SENSITIVE',
    metric: '±0.1°C',
    metricLabel: 'Thermal Variance Threshold',
    description: 'Hermetically sealed reefer pods with dual-redundant multi-zone cooling systems, multi-sensor temperature logging, and real-time gas composition auditing.',
    specs: ['Pharma & Cold-Produce Certified', 'Active Nitrogen Atmosphere Purge', 'Immutable Blockchain Hash Log']
  },
  {
    id: 'secure-convoys',
    code: 'SRV-04',
    title: 'High-Security Geofenced Convoys',
    category: 'HIGH VALUE FREIGHT',
    metric: '100%',
    metricLabel: 'Geofence Containment',
    description: 'Biometrically locked trailer enclosures with continuous satellite anti-tamper tracking, electronic seal verification, and remote lock-down killswitches.',
    specs: ['Military-Grade AES-256 Link', 'Automated Border Manifest Cleared', 'Armed Escort Drone Compatibility']
  },
  {
    id: 'intermodal-sync',
    code: 'SRV-05',
    title: 'Intermodal Rail & Maritime Sync',
    category: 'MULTIMODAL CARGO',
    metric: '3.4x',
    metricLabel: 'Throughput Velocity',
    description: 'Direct dry-port drayage and railhead integration with automated straddle carrier dispatch for high-tonnage container transfers.',
    specs: ['Direct Pier-to-Interstate Link', 'Automated Container OCR Scanner', 'High-Tonnage Chassis Adaptation']
  }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    phase: 'PHASE 01',
    code: 'SYS-INIT',
    title: 'Algorithmic Routing & Payload Weighing',
    subtitle: 'PRE-DISPATCH TELEMETRY AUDIT',
    description: 'Sensory payload weighing systems map center-of-mass and cargo inertia vectors against live weather, grade gradient topography, and wind tunnels.',
    telemetry: [
      { label: 'CALCULATED AXLE LOAD', value: '34,200 LBS' },
      { label: 'TOPOGRAPHICAL GRADIENT', value: '-1.4% AVG' },
      { label: 'PREDICTED ENERGY EFFICIENCY', value: '1.92 KWH/MI' }
    ],
    manifestItems: ['GVWR Compliance Verification', 'Center of Gravity Sensor Lock', 'Energy Envelope Reservation']
  },
  {
    phase: 'PHASE 02',
    code: 'PLT-SYNC',
    title: 'Convoy Platoon Coupling',
    subtitle: 'V2V AERODYNAMIC SYNCHRONIZATION',
    description: 'Tractor units dynamically dock into synchronized aerodynamic formations at highway speeds via low-latency 5G V2V links, dropping drag coefficients by 34%.',
    telemetry: [
      { label: 'INTER-VEHICLE SPACING', value: '14.2 METERS' },
      { label: 'V2V RESPONSE TIME', value: '2.4 MS' },
      { label: 'AERODYNAMIC DRAG REDUCTION', value: '-34.8%' }
    ],
    manifestItems: ['Radar Beam Lock Confirmed', 'Braking Sync Signal Bound', 'Dynamic Convoy ID Broadcast']
  },
  {
    phase: 'PHASE 03',
    code: 'AUT-RUN',
    title: 'Autonomous High-Speed Corridor Transit',
    subtitle: '360° SENSOR FUSION CRUISE',
    description: 'Continuous Level 4 autonomous operation utilizing 12 solid-state LiDARs and 4D imaging radars to execute adaptive lane merges and blind-spot clearance.',
    telemetry: [
      { label: 'SENSOR REFRESH RATE', value: '120 HZ' },
      { label: 'PERCEPTION HORIZON', value: '350 METERS' },
      { label: 'STEERING ACTUATION LATENCY', value: '4.8 MS' }
    ],
    manifestItems: ['Continuous Path Optimization', 'Thermal Tire Pressure Monitor', 'Live Micro-Weather Adaptation']
  },
  {
    phase: 'PHASE 04',
    code: 'DCK-TERM',
    title: 'Terminal Docking & Tele-Operation Handoff',
    subtitle: 'MILLIMETER-ACCURATE BAY INSERTION',
    description: 'Tractor unit transitions from highway corridor navigation to facility dock automation, backing into target warehouse bay within 2mm laser tolerance.',
    telemetry: [
      { label: 'DOCKING ACCURACY', value: '± 2.0 MM' },
      { label: 'TRAILER UNCOUPLING TIME', value: '11.4 SEC' },
      { label: 'WMS MANIFEST UPLOAD', value: 'INSTANT' }
    ],
    manifestItems: ['Automated Kingpin Release', 'Optical Bay Target Lock', 'Delivery Signature Cryptographic Hash']
  }
];

export const CORRIDOR_ROUTES: RouteCorridor[] = [
  {
    id: 'chi-dal',
    origin: 'Chicago Central Hub',
    originCode: 'ORD-L01',
    destination: 'Dallas Freight Gateway',
    destCode: 'DFW-L08',
    distanceMiles: 920,
    autonomousHours: 13.8,
    dieselHours: 21.5,
    co2SavedKg: 840,
    platoonEfficiency: '98.4%',
    corridorStatus: 'ACTIVE'
  },
  {
    id: 'lax-phx',
    origin: 'Los Angeles Intermodal Pier',
    originCode: 'LAX-P04',
    destination: 'Phoenix Desert Depot',
    destCode: 'PHX-L02',
    distanceMiles: 372,
    autonomousHours: 5.4,
    dieselHours: 8.9,
    co2SavedKg: 380,
    platoonEfficiency: '99.1%',
    corridorStatus: 'PRIORITY ALLOCATED'
  },
  {
    id: 'sea-slc',
    origin: 'Seattle North Pacific Port',
    originCode: 'SEA-N01',
    destination: 'Salt Lake Mountain Terminal',
    destCode: 'SLC-M05',
    distanceMiles: 840,
    autonomousHours: 12.6,
    dieselHours: 19.2,
    co2SavedKg: 790,
    platoonEfficiency: '97.8%',
    corridorStatus: 'ACTIVE'
  },
  {
    id: 'atl-mia',
    origin: 'Atlanta Southeast Spine',
    originCode: 'ATL-S03',
    destination: 'Miami Maritime Gateway',
    destCode: 'MIA-M01',
    distanceMiles: 660,
    autonomousHours: 9.8,
    dieselHours: 15.4,
    co2SavedKg: 610,
    platoonEfficiency: '98.9%',
    corridorStatus: 'HIGH TRAFFIC'
  }
];

export const FLEET_SPECS = [
  {
    category: 'POWERTRAIN & CHASSIS',
    items: [
      { name: 'Prime Mover Architecture', value: 'Logilane Titan-8 High-Output Tri-Motor' },
      { name: 'System Peak Output', value: '850 HP (634 kW) Continuous' },
      { name: 'Instant Axle Torque', value: '1,450 lb-ft @ 0 RPM' },
      { name: 'Gross Vehicle Weight (GVWR)', value: '80,000 LBS Max Certified' },
      { name: 'Aerodynamic Drag Coefficient', value: 'Cd = 0.28 (vs 0.60 standard)' }
    ]
  },
  {
    category: 'PERCEPTION & COMPUTE',
    items: [
      { name: 'LiDAR Array', value: '12x Solid-State Pulsed 1550nm (350m range)' },
      { name: '4D Imaging Radar', value: '8x 77GHz Ultra-High Angle Resolution' },
      { name: 'Optical Sensor Fusion', value: '16x 8K HDR Automotive Precision Cameras' },
      { name: 'Onboard Compute Core', value: 'Dual-Redundant Liquid-Cooled 1,200 TOPS' },
      { name: 'Safety Compliance Certification', value: 'ISO 26262 ASIL-D / FMVSS Ready' }
    ]
  },
  {
    category: 'ENERGY & TELEMETRY',
    items: [
      { name: 'Battery / Fuel-Cell Hybrid Pack', value: '750 kWh High-Nickel Thermal Core' },
      { name: 'Continuous Corridor Range', value: '650 Miles @ Full GVWR Load' },
      { name: 'Megawatt Charging Rate', value: '80% State-of-Charge in 22 Minutes' },
      { name: 'Satellite Uplink Frequency', value: 'Dual LEO Constellation Direct Transmit' },
      { name: 'Telemetry Tele-Operation Lag', value: '< 18ms End-to-End Glass Latency' }
    ]
  }
];
