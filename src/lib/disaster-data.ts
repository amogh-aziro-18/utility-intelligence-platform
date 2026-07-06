// Disaster Resilience, Weather Intelligence and Emergency Response mock data.
// Additive to the existing platform — does not modify mock-data.ts.

export type Level = "green" | "yellow" | "orange" | "red";

export const levelStyle: Record<Level, { bg: string; text: string; label: string; ring: string }> = {
  green: { bg: "oklch(0.95 0.06 155)", text: "oklch(0.38 0.12 155)", label: "Normal", ring: "var(--success)" },
  yellow: { bg: "oklch(0.96 0.08 95)", text: "oklch(0.38 0.11 75)", label: "Advisory", ring: "oklch(0.78 0.16 95)" },
  orange: { bg: "oklch(0.94 0.10 55)", text: "oklch(0.42 0.14 45)", label: "Warning", ring: "var(--warning)" },
  red: { bg: "oklch(0.94 0.08 27)", text: "oklch(0.42 0.18 27)", label: "Critical", ring: "var(--destructive)" },
};

export const resilience = {
  readinessScore: 82,
  threatLevel: "orange" as Level,
  continuityStatus: "Stable" as const,
  resilienceIndex: 76,
  recoveryReadiness: 88,
  emergencyResources: 214,
  utilitiesAtRisk: 3,
  activeDisasters: 1,
};

export const resilienceTiles = [
  { label: "Disaster Readiness Score", value: "82 / 100", level: "green" as Level, hint: "+3 vs last week" },
  { label: "Current Threat Level", value: "ORANGE", level: "orange" as Level, hint: "Heavy rainfall advisory" },
  { label: "Business Continuity", value: "Stable", level: "green" as Level, hint: "0 SLA breaches" },
  { label: "Infrastructure Resilience", value: "76 %", level: "yellow" as Level, hint: "Port ops degraded" },
  { label: "Recovery Readiness", value: "88 %", level: "green" as Level, hint: "RTO 4.2h avg" },
  { label: "Emergency Resources", value: "214 units", level: "green" as Level, hint: "48 vehicles staged" },
  { label: "Critical Utilities at Risk", value: "3", level: "orange" as Level, hint: "Water · Power · Port" },
  { label: "Active Disaster Events", value: "1", level: "orange" as Level, hint: "Flood watch — Zone C" },
];

export const weatherNow = {
  temp: 31, humidity: 78, rainProb: 82, wind: 34, windDir: "SW",
  heatIndex: 38, visibility: 4.2, aqi: 142,
  stormAlert: "Thunderstorm cell approaching",
  lightningRisk: "High",
  floodRisk: "Elevated",
  cycloneWatch: "Not active",
  heatwaveWarning: "Not active",
};

export const weatherForecast = Array.from({ length: 24 }).map((_, i) => ({
  h: `${(new Date().getHours() + i) % 24}:00`,
  temp: 28 + Math.round(Math.sin(i / 4) * 4 + (i > 10 && i < 18 ? 3 : 0)),
  rain: Math.max(0, Math.round(20 + Math.sin(i / 3) * 40 + (i < 10 ? 30 : -10))),
  wind: 20 + Math.round(Math.cos(i / 5) * 10 + (i > 6 && i < 12 ? 8 : 0)),
}));

export const disasterAI = [
  { tag: "Weather", priority: "High", text: "Heavy rainfall expected within 6 hours across Zone C.", why: "IMD radar + convective cell tracking; 92% model agreement.", action: "Pre-position 4 flood-response crews to Zone C.", confidence: 92 },
  { tag: "Flood", priority: "High", text: "Reservoir R-3 overflow risk in 8h without intervention.", why: "Inflow rate +38%; catchment saturation index 0.81.", action: "Open secondary spillway; increase pump utilization to 85%.", confidence: 88 },
  { tag: "Power", priority: "Medium", text: "Reduce load on substations S-04, S-09 before storm arrival.", why: "Lightning strike density forecast > 6/km² in adjacent grid.", action: "Shed 8% non-critical industrial load for 4 hours.", confidence: 84 },
  { tag: "Dispatch", priority: "Medium", text: "Move Emergency Response Team B from Depot 2 → Zone C.", why: "Nearest crew ETA drops 22m → 9m; access route H-14 still open.", action: "Auto-generate dispatch WO-EM-2213.", confidence: 90 },
  { tag: "Maintenance", priority: "Low", text: "Delay non-critical maintenance windows by 24h.", why: "Weather window unsafe for 6/8 scheduled outdoor tasks.", action: "Reschedule 12 work orders; notify supervisors.", confidence: 95 },
  { tag: "Executive", priority: "High", text: "Notify Operations Director — Continuity Level 2 recommended.", why: "3 utilities at risk, projected 4–6h recovery window.", action: "Auto-brief exec channel + prepare crisis dashboard.", confidence: 87 },
  { tag: "Recovery", priority: "Info", text: "Estimated recovery duration if flood occurs: 6h 40m.", why: "Historical mean of comparable events (n=14) + current staging.", action: "Reserve 2 mobile transformers, 6 tanker trucks.", confidence: 78 },
  { tag: "Business", priority: "Medium", text: "Estimated business impact of no-action scenario: ₹4.2 Cr.", why: "Port throughput -22%, industrial load shed 14%, SLA credits.", action: "Trigger insurance notification workflow.", confidence: 74 },
];

export const activeIncident = {
  title: "Flood Watch — Western Industrial Corridor · Zone C",
  severity: "Orange",
  affectedUtilities: ["Water", "Power", "Port", "Roads"],
  affectedSites: ["Reservoir R-3", "Substation S-09", "Deepwater Port · Quay 4", "Corridor KM-42"],
  impactRadius: "48 km",
  responseStatus: "Mobilising",
  recoveryEta: "6h 40m",
  teamsAssigned: 7,
  financialImpact: "₹4.2 Cr projected",
  slaImpact: "3 SLAs at risk",
  progress: 34,
};

export const incidentTimeline = [
  { t: "06:12", e: "IMD Orange alert ingested — heavy rainfall western corridor", k: "alert" },
  { t: "06:14", e: "AI raised Continuity Level 2 recommendation", k: "ai" },
  { t: "06:22", e: "Emergency Team B repositioned to Zone C (ETA 9m)", k: "dispatch" },
  { t: "06:38", e: "Flood pumps at Reservoir R-3 activated (Auto)", k: "progress" },
  { t: "06:51", e: "Substation S-04, S-09 non-critical load shed 8%", k: "progress" },
  { t: "07:02", e: "Ops Director notified · Crisis dashboard active", k: "ai" },
  { t: "07:14", e: "12 maintenance WOs rescheduled by AI", k: "progress" },
];

export const emergencyTeams = [
  { name: "Fire & Rescue Team A", type: "Fire", crew: 8, vehicles: 2, status: "Staged", location: "Depot 1", eta: "—" },
  { name: "Fire & Rescue Team B", type: "Fire", crew: 6, vehicles: 2, status: "Dispatched", location: "Zone C", eta: "9m" },
  { name: "Electrical Emergency Unit", type: "Electrical", crew: 5, vehicles: 1, status: "On Site", location: "Substation S-09", eta: "—" },
  { name: "Water Emergency Response", type: "Water", crew: 7, vehicles: 3, status: "Dispatched", location: "Reservoir R-3", eta: "12m" },
  { name: "Medical Response Team", type: "Medical", crew: 4, vehicles: 2, status: "Available", location: "Depot 2", eta: "—" },
  { name: "Corridor Security Team", type: "Security", crew: 6, vehicles: 2, status: "Patrolling", location: "KM-38 → KM-58", eta: "—" },
  { name: "Disaster Response Task Force", type: "Disaster", crew: 12, vehicles: 4, status: "Staged", location: "Depot 1", eta: "—" },
  { name: "HAZMAT Chemical Response", type: "HAZMAT", crew: 5, vehicles: 2, status: "Available", location: "Depot 3", eta: "—" },
];

export const emergencyResources = [
  { l: "Response Vehicles", v: 48, sub: "24 staged" },
  { l: "Mobile Generators", v: 12, sub: "6 pre-positioned" },
  { l: "Water Tankers", v: 22, sub: "14 available" },
  { l: "Rescue Boats", v: 8, sub: "4 in Zone C" },
  { l: "Emergency Shelters", v: 14, sub: "capacity 8,400" },
  { l: "Field Medical Kits", v: 320, sub: "distributed" },
];

export const disasterScenarios = [
  { s: "Flash Flood · Zone C (12h)", sev: "High", assets: 84, utilities: ["Water", "Power", "Roads"], revenue: "₹4.2 Cr", rto: "6h 40m",
    cascade: ["Reservoir R-3 spillway → Roads KM-42 closure", "Substation S-09 outage → Industrial Park A load shed 14%", "Port Quay 4 slowdown → Warehouse fill 89%"] },
  { s: "Cyclone Landfall · Coastal (24h)", sev: "High", assets: 156, utilities: ["Port", "Power", "Comms", "Airport"], revenue: "₹18.6 Cr", rto: "18h",
    cascade: ["Airport ops suspension → Rail redirection", "Comms tower C-12 failure → Backup mesh activation", "Port crane fleet secured → Throughput -100% for 24h"] },
  { s: "Earthquake · M5.8 corridor centre", sev: "Critical", assets: 220, utilities: ["Power", "Gas", "Water", "Rail"], revenue: "₹32.1 Cr", rto: "36h",
    cascade: ["Gas pipeline auto-shutoff", "Rail track inspection required 84km", "Substation transformer stress ×2 units"] },
  { s: "Heatwave (5-day, 46 °C peak)", sev: "Medium", assets: 62, utilities: ["Power", "Water", "Buildings"], revenue: "₹2.8 Cr", rto: "N/A",
    cascade: ["Power demand +18% peak", "HVAC efficiency -12%", "Water demand +22%"] },
  { s: "Industrial Fire · Warehouse zone", sev: "High", assets: 38, utilities: ["Buildings", "Power", "Roads"], revenue: "₹6.4 Cr", rto: "12h",
    cascade: ["Adjacent block evacuation", "Road corridor closure 4km", "Power isolation ring 2"] },
  { s: "Chemical Leak · Industrial Park A", sev: "Critical", assets: 24, utilities: ["Buildings", "Water"], revenue: "₹3.9 Cr", rto: "9h",
    cascade: ["HAZMAT containment perimeter 800m", "Groundwater monitoring escalated", "Shift evacuation 1,200 workers"] },
  { s: "Grid Failure · N-1 contingency", sev: "High", assets: 92, utilities: ["Power", "Comms", "Rail"], revenue: "₹8.7 Cr", rto: "5h",
    cascade: ["Renewable islanding", "Comms battery reserves 4h", "Rail signalling degraded mode"] },
  { s: "Cyber Attack · SCADA intrusion", sev: "Critical", assets: 0, utilities: ["Power", "Water", "Comms"], revenue: "₹12.4 Cr", rto: "8h",
    cascade: ["OT network segmentation", "Manual control fallback", "Forensics + CERT notification"] },
  { s: "Water Contamination · Reservoir R-3", sev: "High", assets: 18, utilities: ["Water", "Buildings"], revenue: "₹1.9 Cr", rto: "14h",
    cascade: ["Distribution isolation 3 zones", "Tanker supply activation", "Public advisory + testing"] },
  { s: "Communications Blackout (regional)", sev: "Medium", assets: 44, utilities: ["Comms", "Emergency"], revenue: "₹2.1 Cr", rto: "3h",
    cascade: ["Mesh network fallback", "Satellite failover", "Emergency radio ch. 4"] },
];

export const disasterMapLayers = [
  { name: "Weather Radar", color: "oklch(0.7 0.12 240)" },
  { name: "Rainfall", color: "oklch(0.65 0.15 230)" },
  { name: "Wind", color: "oklch(0.75 0.10 200)" },
  { name: "Flood Zones", color: "var(--info)" },
  { name: "Storm Tracks", color: "var(--warning)" },
  { name: "Lightning", color: "oklch(0.72 0.18 90)" },
  { name: "Earthquake Zones", color: "oklch(0.55 0.15 30)" },
  { name: "Wildfire Risk", color: "var(--destructive)" },
  { name: "Emergency Shelters", color: "var(--success)" },
  { name: "Evacuation Routes", color: "var(--teal)" },
  { name: "Road Closures", color: "oklch(0.6 0.15 25)" },
  { name: "Response Vehicles", color: "var(--navy)" },
  { name: "Affected Regions", color: "oklch(0.7 0.14 50)" },
  { name: "Utility Failure Overlay", color: "oklch(0.55 0.20 25)" },
  { name: "Disaster Heatmap", color: "oklch(0.65 0.18 30)" },
];

export const utilityResilience = [
  { name: "Power", weatherImpact: "High", disasterRisk: "Elevated", resilience: 78, opDep: 96, continuity: 88, recoveryPri: 1 },
  { name: "Water", weatherImpact: "Very High", disasterRisk: "High", resilience: 72, opDep: 94, continuity: 82, recoveryPri: 1 },
  { name: "Gas", weatherImpact: "Low", disasterRisk: "Medium", resilience: 84, opDep: 78, continuity: 90, recoveryPri: 3 },
  { name: "Roads", weatherImpact: "High", disasterRisk: "High", resilience: 68, opDep: 82, continuity: 76, recoveryPri: 2 },
  { name: "Rail", weatherImpact: "Medium", disasterRisk: "Medium", resilience: 86, opDep: 88, continuity: 92, recoveryPri: 2 },
  { name: "Airport", weatherImpact: "Very High", disasterRisk: "High", resilience: 82, opDep: 74, continuity: 88, recoveryPri: 2 },
  { name: "Port", weatherImpact: "Very High", disasterRisk: "High", resilience: 70, opDep: 86, continuity: 74, recoveryPri: 1 },
  { name: "Comms", weatherImpact: "High", disasterRisk: "High", resilience: 76, opDep: 98, continuity: 84, recoveryPri: 1 },
  { name: "Renewable", weatherImpact: "Very High", disasterRisk: "Medium", resilience: 74, opDep: 68, continuity: 86, recoveryPri: 3 },
];

export const assetRiskOverlay = [
  { id: "AST-2003", disaster: "High", flood: "Exposed", weather: "Exposed", criticality: "Critical", backup: "Yes", shutdown: "Ready", recoveryPri: 1 },
  { id: "AST-2007", disaster: "High", flood: "Elevated", weather: "Exposed", criticality: "Critical", backup: "Partial", shutdown: "Ready", recoveryPri: 1 },
  { id: "AST-2011", disaster: "Medium", flood: "Low", weather: "Elevated", criticality: "High", backup: "Yes", shutdown: "Ready", recoveryPri: 2 },
  { id: "AST-2015", disaster: "Low", flood: "Low", weather: "Low", criticality: "Medium", backup: "Yes", shutdown: "N/A", recoveryPri: 3 },
];

export const resilienceReports = [
  { name: "Disaster Readiness Report", cat: "Resilience", period: "Q2 2026", size: "3.8 MB" },
  { name: "Emergency Response Report", cat: "Emergency", period: "Jun 2026", size: "2.9 MB" },
  { name: "Weather Impact Analysis", cat: "Weather", period: "Jun 2026", size: "2.2 MB" },
  { name: "Business Continuity Report", cat: "Continuity", period: "Q2 2026", size: "4.1 MB" },
  { name: "Recovery KPI Report", cat: "Recovery", period: "Jun 2026", size: "1.7 MB" },
  { name: "Incident Analytics", cat: "Analytics", period: "Jun 2026", size: "2.4 MB" },
  { name: "Climate Risk Report", cat: "Climate", period: "H1 2026", size: "5.6 MB" },
  { name: "Infrastructure Resilience Report", cat: "Resilience", period: "Q2 2026", size: "3.3 MB" },
  { name: "Executive Crisis Summary", cat: "Executive", period: "Jun 2026", size: "1.1 MB" },
];

export const resilienceStandards = [
  { code: "ISO 22301", desc: "Business Continuity Management", status: "Compliant", score: 93 },
  { code: "ISO 22320", desc: "Emergency Management", status: "Compliant", score: 90 },
  { code: "NDMA 2019", desc: "Disaster Recovery Framework", status: "Compliant", score: 88 },
  { code: "NFPA 1600", desc: "Emergency Preparedness", status: "Action Needed", score: 79 },
  { code: "ISO 22361", desc: "Crisis Management", status: "Compliant", score: 86 },
  { code: "CIP-014", desc: "Critical Infrastructure Protection", status: "Compliant", score: 91 },
];

export const drillStatus = [
  { name: "Flood Response Drill · Zone C", date: "2026-05-18", result: "Passed", score: 92 },
  { name: "Fire Evacuation · Warehouse", date: "2026-04-22", result: "Passed", score: 88 },
  { name: "Cyclone Preparedness · Port", date: "2026-03-11", result: "Action Items", score: 78 },
  { name: "SCADA Cyber Tabletop", date: "2026-06-02", result: "Passed", score: 90 },
];
