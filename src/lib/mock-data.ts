// Centralized mock data for the Aziro Super Utility Intelligence Platform.

export const kpis = {
    health: 94.2,
    activeSites: 47,
    connectedUtilities: 9,
    totalAssets: 12480,
    activeAlerts: 23,
    openWorkOrders: 86,
    availableTechnicians: 142,
  };
  
  export const corridorNodes = [
    { id: "airport", name: "Greenfield Airport", type: "Airport", x: 12, y: 28, status: "healthy" },
    { id: "port", name: "Deepwater Port", type: "Port", x: 88, y: 70, status: "warning" },
    { id: "rail", name: "Central Rail Hub", type: "Railway", x: 50, y: 18, status: "healthy" },
    { id: "ipark", name: "Industrial Park A", type: "Industrial Park", x: 38, y: 52, status: "healthy" },
    { id: "ware", name: "Logistics Warehouse", type: "Warehouse", x: 64, y: 44, status: "healthy" },
    { id: "power", name: "Northgate Power Station", type: "Power Station", x: 22, y: 72, status: "critical" },
    { id: "water", name: "Riverside Water Plant", type: "Water Treatment", x: 70, y: 22, status: "healthy" },
    { id: "renew", name: "Solar+Wind Farm", type: "Renewable Energy", x: 80, y: 52, status: "healthy" },
  ] as const;
  
  export const corridorEdges = [
    ["power", "ipark"], ["power", "airport"], ["water", "ipark"], ["water", "ware"],
    ["renew", "ware"], ["renew", "port"], ["rail", "ipark"], ["rail", "port"],
    ["airport", "rail"], ["ipark", "ware"], ["ware", "port"],
  ] as const;
  
  export const utilityHealth = [
    { name: "Power", health: 96, status: "Optimal", color: "var(--navy)" },
    { name: "Water", health: 92, status: "Stable", color: "var(--teal)" },
    { name: "Gas", health: 88, status: "Stable", color: "var(--info)" },
    { name: "Roads", health: 81, status: "Maintenance", color: "var(--warning)" },
    { name: "Railways", health: 94, status: "Optimal", color: "var(--success)" },
    { name: "Airport Ops", health: 97, status: "Optimal", color: "var(--navy)" },
    { name: "Port Ops", health: 79, status: "Degraded", color: "var(--warning)" },
    { name: "Communications", health: 91, status: "Stable", color: "var(--teal)" },
    { name: "Renewable", health: 89, status: "Stable", color: "var(--success)" },
  ];
  
  export const trend = (base: number, n = 12, variance = 6) =>
    Array.from({ length: n }, (_, i) => ({
      t: i,
      v: Math.max(0, Math.round(base + Math.sin(i / 2) * variance + (Math.random() - 0.5) * variance)),
    }));
  
  export const aiInsights = [
    { tag: "Forecast", text: "Water demand expected to increase by 12% tomorrow across Zone 4.", impact: "Medium" },
    { tag: "Predictive", text: "Transformer T-21 showing abnormal vibration signatures.", impact: "High" },
    { tag: "Maintenance", text: "Recommend preventive maintenance within 5 days on Substation S-09.", impact: "Medium" },
    { tag: "Anomaly", text: "Power consumption increasing 8.4% in Industrial Zone 3.", impact: "Low" },
    { tag: "Scenario", text: "Simulation predicts minimal impact if Pump Station B goes offline.", impact: "Low" },
    { tag: "Dependency", text: "Port logistics throughput sensitive to Rail Hub uptime (corr. 0.81).", impact: "Medium" },
  ];
  
  export const alerts = [
    { id: "A-1042", title: "Power Substation Voltage Fluctuation", severity: "High", utility: "Power", site: "Substation S-09", time: "2m ago" },
    { id: "A-1041", title: "Water Reservoir Level Below Threshold", severity: "High", utility: "Water", site: "Reservoir R-3", time: "11m ago" },
    { id: "A-1040", title: "HVAC Efficiency Reduced", severity: "Medium", utility: "Buildings", site: "Terminal 2", time: "34m ago" },
    { id: "A-1039", title: "Road Lighting Failure", severity: "Low", utility: "Roads", site: "Corridor KM-42", time: "1h ago" },
    { id: "A-1038", title: "Communication Network Latency", severity: "Medium", utility: "Comms", site: "Tower C-12", time: "1h ago" },
    { id: "A-1037", title: "Conveyor Belt Misalignment", severity: "Low", utility: "Port", site: "Quay 4", time: "2h ago" },
    { id: "A-1036", title: "Runway Edge Light Outage", severity: "Medium", utility: "Airport", site: "Runway 09L", time: "3h ago" },
  ];
  
  export const workOrders = [
    { id: "WO-5512", asset: "Substation S-09", type: "Inspection", priority: "High", sla: "2h", status: "In Progress", assignee: "R. Mehta" },
    { id: "WO-5511", asset: "Reservoir R-3", type: "Refill Valve", priority: "High", sla: "4h", status: "Dispatched", assignee: "K. Iyer" },
    { id: "WO-5510", asset: "Terminal 2 HVAC", type: "Service", priority: "Medium", sla: "12h", status: "Open", assignee: "—" },
    { id: "WO-5509", asset: "Runway 09L Lights", type: "Replacement", priority: "Medium", sla: "8h", status: "In Progress", assignee: "A. Singh" },
    { id: "WO-5508", asset: "Quay 4 Conveyor", type: "Alignment", priority: "Low", sla: "24h", status: "Open", assignee: "—" },
    { id: "WO-5507", asset: "Corridor KM-42", type: "Lighting", priority: "Low", sla: "24h", status: "Closed", assignee: "M. Rao" },
  ];
  
  export const technicians = [
    { name: "Rohan Mehta", skill: "Power Systems", status: "On Site", assignment: "Substation S-09", eta: "—", initials: "RM" },
    { name: "Kavya Iyer", skill: "Hydraulics", status: "Busy", assignment: "Reservoir R-3", eta: "12m", initials: "KI" },
    { name: "Arjun Singh", skill: "Airfield Ops", status: "On Site", assignment: "Runway 09L", eta: "—", initials: "AS" },
    { name: "Meera Rao", skill: "Electrical", status: "Available", assignment: "—", eta: "—", initials: "MR" },
    { name: "Dev Kapoor", skill: "Network/Comms", status: "Available", assignment: "—", eta: "—", initials: "DK" },
    { name: "Sara Khan", skill: "HVAC", status: "Emergency", assignment: "Terminal 2", eta: "8m", initials: "SK" },
  ];
  
  export const sustainability = {
    energy: 184.2, // GWh / mo
    water: 92.1, // ML / day
    carbon: 41.3, // ktCO2e / mo
    renewableShare: 38, // %
    score: 78,
  };
  
  export const assets = Array.from({ length: 28 }).map((_, i) => {
    const types = ["Transformer", "Pump", "HVAC Unit", "Conveyor", "Runway Light", "Signal", "Substation", "Cooling Tower", "Switchgear", "Inverter"];
    const utilities = ["Power", "Water", "Buildings", "Port", "Airport", "Rail", "Renewable", "Comms"];
    const sites = ["Greenfield Airport", "Deepwater Port", "Industrial Park A", "Logistics Warehouse", "Northgate Power", "Riverside Water", "Central Rail Hub", "Solar+Wind Farm"];
    const status = ["Operational", "Maintenance", "Degraded", "Operational", "Operational"];
    const risk = ["Low", "Medium", "Low", "High", "Low", "Medium"];
    return {
      id: `AST-${(2000 + i).toString()}`,
      name: `${types[i % types.length]} ${100 + i}`,
      type: types[i % types.length],
      location: sites[i % sites.length],
      utility: utilities[i % utilities.length],
      health: 72 + ((i * 7) % 26),
      status: status[i % status.length],
      risk: risk[i % risk.length],
      lastInspection: `2026-0${(i % 6) + 1}-${10 + (i % 18)}`,
      nextMaintenance: `2026-0${((i + 2) % 6) + 1}-${5 + (i % 22)}`,
    };
  });
  
  export const utilityCards = [
    { name: "Power", assets: 1840, alerts: 4, health: 96, forecast: "+2.1% load" },
    { name: "Water", assets: 1120, alerts: 3, health: 92, forecast: "+12% demand" },
    { name: "Gas", assets: 540, alerts: 1, health: 88, forecast: "Stable" },
    { name: "Road", assets: 2860, alerts: 2, health: 81, forecast: "Seasonal wear" },
    { name: "Rail", assets: 980, alerts: 0, health: 94, forecast: "Stable" },
    { name: "Airport", assets: 1340, alerts: 2, health: 97, forecast: "+4% traffic" },
    { name: "Port", assets: 1720, alerts: 5, health: 79, forecast: "Congestion risk" },
    { name: "Buildings", assets: 2080, alerts: 6, health: 90, forecast: "Stable" },
  ];
  
  export const sparkline = trend(60, 14, 18);
  