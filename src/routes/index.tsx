import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader, Section } from "@/components/shell";
import {
  Activity, AlertTriangle, Boxes, CheckCircle2, Cpu, Droplets, Factory, Gauge,
  HardHat, Leaf, Plane, Radio, Ship, Sparkles, TrainFront, TrendingUp, Wrench, Zap,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis, Cell,
} from "recharts";
import {
  kpis, corridorNodes, corridorEdges, utilityHealth, trend, aiInsights,
  alerts, workOrders, technicians, sustainability,
} from "@/lib/mock-data";
import { EmergencyBanner } from "@/components/emergency-banner";
import { resilienceTiles, levelStyle, weatherNow, disasterAI, activeIncident } from "@/lib/disaster-data";
import { ShieldAlert, CloudRain, Siren, Sparkles as SparklesIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Operations Dashboard · Aziro" }] }),
  component: Dashboard,
});

const sevColor: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/30",
  Medium: "bg-[var(--warning)]/15 text-[color:var(--warning-foreground)] border-[var(--warning)]/40",
  Low: "bg-[var(--info)]/10 text-[color:var(--info)] border-[var(--info)]/30",
};

const statusColor: Record<string, string> = {
  healthy: "var(--success)",
  warning: "var(--warning)",
  critical: "var(--destructive)",
};

const nodeIcon = (type: string) => {
  switch (type) {
    case "Airport": return Plane;
    case "Port": return Ship;
    case "Railway": return TrainFront;
    case "Industrial Park": return Factory;
    case "Warehouse": return Boxes;
    case "Power Station": return Zap;
    case "Water Treatment": return Droplets;
    case "Renewable Energy": return Leaf;
    default: return Cpu;
  }
};

function Kpi({ icon: Icon, label, value, sub, accent }: { icon: any; label: string; value: string; sub?: string; accent?: string }) {
  return (
    <Card className="rounded-xl">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium text-muted-foreground">{label}</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
            {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-md" style={{ background: accent ?? "var(--accent)" }}>
            <Icon className="h-4 w-4 text-[var(--navy)]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CorridorMap() {
  return (
    <Card className="rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-sm font-semibold">Industrial Corridor Overview</CardTitle>
          <p className="text-xs text-muted-foreground">Live GIS map of connected infrastructure</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[color:var(--success)]" />Healthy</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[color:var(--warning)]" />Warning</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[color:var(--destructive)]" />Critical</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[360px] w-full overflow-hidden rounded-lg border bg-[var(--surface)]">
          <svg className="absolute inset-0 h-full w-full opacity-50" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="oklch(0.9 0.01 250)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {corridorEdges.map(([a, b], i) => {
              const na = corridorNodes.find(n => n.id === a)!;
              const nb = corridorNodes.find(n => n.id === b)!;
              return (
                <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke="var(--teal)" strokeWidth="0.25" strokeDasharray="0.6 0.6" opacity="0.7" />
              );
            })}
          </svg>
          {corridorNodes.map((n) => {
            const Icon = nodeIcon(n.type);
            return (
              <div key={n.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                <div className="group flex flex-col items-center gap-1">
                  <div className="relative grid h-10 w-10 place-items-center rounded-lg border bg-card shadow-sm">
                    <Icon className="h-4 w-4 text-[var(--navy)]" />
                    <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full ring-2 ring-card" style={{ background: statusColor[n.status] }} />
                  </div>
                  <div className="rounded bg-card/95 px-1.5 py-0.5 text-[10px] font-medium shadow-sm border whitespace-nowrap">{n.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function UtilityHealthCard({ u }: { u: typeof utilityHealth[number] }) {
  const data = trend(u.health, 12, 4);
  return (
    <Card className="rounded-xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">{u.name}</div>
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{u.status}</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <div className="text-2xl font-semibold">{u.health}%</div>
          <span className="text-xs text-[color:var(--success)] flex items-center gap-0.5"><TrendingUp className="h-3 w-3" />+1.2</span>
        </div>
        <div className="mt-2 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`g-${u.name}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--teal)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area dataKey="v" stroke="var(--teal)" strokeWidth={1.5} fill={`url(#g-${u.name})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <Progress value={u.health} className="h-1 mt-1" />
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const consumptionData = Array.from({ length: 12 }).map((_, i) => ({
    name: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    Energy: 140 + Math.round(Math.sin(i/2)*15 + i*2),
    Water: 80 + Math.round(Math.cos(i/2)*10),
    Renewable: 30 + i*1.5,
  }));

  return (
    <>
      <EmergencyBanner />
      <PageHeader
        title="Operations Command Center"
        description="Real-time view across all utilities, sites and assets in the industrial corridor."
        actions={
          <>
            <Badge variant="outline" className="gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)]" />All systems nominal</Badge>
            <Badge variant="outline" className="gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--warning)" }} />Threat: Orange</Badge>
            <Badge variant="outline">Region: Western Corridor</Badge>
          </>
        }
      />
      <div className="p-6 space-y-6">
        {/* Operational Resilience strip */}
        <Section title="Operational Resilience" description="Monitor · Predict · Respond · Recover"
          action={
            <div className="flex items-center gap-2">
              <Link to="/resilience"><Badge variant="outline" className="gap-1 cursor-pointer hover:bg-[var(--accent)]"><ShieldAlert className="h-3 w-3" />Resilience</Badge></Link>
              <Link to="/weather"><Badge variant="outline" className="gap-1 cursor-pointer hover:bg-[var(--accent)]"><CloudRain className="h-3 w-3" />Weather</Badge></Link>
              <Link to="/emergency"><Badge variant="outline" className="gap-1 cursor-pointer hover:bg-[var(--accent)]"><Siren className="h-3 w-3" />Emergency</Badge></Link>
            </div>
          }>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
            {resilienceTiles.map((t) => {
              const s = levelStyle[t.level];
              return (
                <Card key={t.label} className="rounded-xl">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wide leading-tight">{t.label}</div>
                      <span className="h-2 w-2 rounded-full shrink-0" style={{ background: s.ring }} />
                    </div>
                    <div className="mt-1 text-lg font-semibold tracking-tight">{t.value}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{t.hint}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* Weather + Incident Command + Disaster AI (compact) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="rounded-xl">
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><CloudRain className="h-4 w-4 text-[var(--navy)]" />Weather Intelligence</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { l: "Temp", v: `${weatherNow.temp}°` },
                  { l: "Rain", v: `${weatherNow.rainProb}%` },
                  { l: "Wind", v: `${weatherNow.wind}` },
                  { l: "Humidity", v: `${weatherNow.humidity}%` },
                  { l: "AQI", v: `${weatherNow.aqi}` },
                  { l: "Visibility", v: `${weatherNow.visibility}km` },
                ].map((k) => (
                  <div key={k.l} className="rounded-md border p-2 bg-[var(--surface)]">
                    <div className="text-[10px] text-muted-foreground uppercase">{k.l}</div>
                    <div className="text-sm font-semibold">{k.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Flood Risk</span><Badge variant="outline" className="text-[10px] border-[color:var(--warning)] text-[color:var(--warning-foreground)]">{weatherNow.floodRisk}</Badge></div>
                <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Lightning</span><Badge variant="outline" className="text-[10px] border-destructive text-destructive">{weatherNow.lightningRisk}</Badge></div>
                <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Storm Alert</span><span className="text-xs font-medium truncate max-w-[60%]" title={weatherNow.stormAlert}>{weatherNow.stormAlert}</span></div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-[color:var(--warning-foreground)]" />Active Incident Command</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm font-semibold leading-tight">{activeIncident.title}</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { l: "Severity", v: activeIncident.severity },
                  { l: "Radius", v: activeIncident.impactRadius },
                  { l: "Recovery ETA", v: activeIncident.recoveryEta },
                  { l: "Teams", v: `${activeIncident.teamsAssigned}` },
                  { l: "Financial", v: activeIncident.financialImpact },
                  { l: "SLA", v: activeIncident.slaImpact },
                ].map((k) => (
                  <div key={k.l} className="rounded-md border p-2">
                    <div className="text-[10px] text-muted-foreground uppercase">{k.l}</div>
                    <div className="text-xs font-semibold">{k.v}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1"><span className="text-muted-foreground">Recovery Progress</span><span className="tabular-nums">{activeIncident.progress}%</span></div>
                <Progress value={activeIncident.progress} className="h-1.5" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><SparklesIcon className="h-4 w-4 text-[var(--teal)]" />AI Disaster Intelligence</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {disasterAI.slice(0, 4).map((i, idx) => (
                <div key={idx} className="rounded-md border p-2 bg-[var(--surface)]">
                  <div className="flex justify-between items-center gap-2">
                    <Badge variant="outline" className="text-[10px]">{i.tag}</Badge>
                    <span className="text-[10px] text-muted-foreground">{i.confidence}% conf.</span>
                  </div>
                  <p className="mt-1 text-xs leading-snug font-medium">{i.text}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground leading-snug"><span className="font-semibold">Why:</span> {i.why}</p>
                </div>
              ))}
              <Link to="/resilience" className="block text-[11px] text-[var(--navy)] hover:underline">See all disaster intelligence →</Link>
            </CardContent>
          </Card>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
          <Kpi icon={Gauge} label="Infrastructure Health" value={`${kpis.health}%`} sub="Last 24h" />
          <Kpi icon={Factory} label="Active Sites" value={`${kpis.activeSites}`} sub="Across 4 regions" />
          <Kpi icon={Zap} label="Connected Utilities" value={`${kpis.connectedUtilities}`} sub="Power · Water · Gas …" />
          <Kpi icon={Boxes} label="Total Assets" value={kpis.totalAssets.toLocaleString()} sub="Monitored" />
          <Kpi icon={AlertTriangle} label="Active Alerts" value={`${kpis.activeAlerts}`} sub="3 high priority" accent="oklch(0.95 0.03 27)" />
          <Kpi icon={Wrench} label="Open Work Orders" value={`${kpis.openWorkOrders}`} sub="14 due today" />
          <Kpi icon={HardHat} label="Available Technicians" value={`${kpis.availableTechnicians}`} sub="6 on emergency" />
        </div>

        {/* Corridor + AI */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2"><CorridorMap /></div>
          <Card className="rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-sm font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-[var(--teal)]" />AI Operational Intelligence</CardTitle>
                <p className="text-xs text-muted-foreground">Live recommendations from the Aziro AI engine</p>
              </div>
              <Badge variant="outline" className="text-[10px]">Updated 1m ago</Badge>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {aiInsights.map((i, idx) => (
                <div key={idx} className="rounded-lg border bg-[var(--surface)] p-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] border-[var(--teal)] text-[var(--navy)] bg-[var(--accent)]">{i.tag}</Badge>
                    <span className="text-[10px] text-muted-foreground">Impact: {i.impact}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-foreground leading-snug">{i.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Utility Health */}
        <Section title="Utility Health" description="Operational health across all connected utility verticals">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {utilityHealth.map(u => <UtilityHealthCard key={u.name} u={u} />)}
          </div>
        </Section>

        {/* Alerts + Operations */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="rounded-xl xl:col-span-1">
            <CardHeader><CardTitle className="text-sm font-semibold">Active Alerts</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {alerts.map(a => (
                <div key={a.id} className="rounded-lg border p-3 hover:bg-[var(--surface)]">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-medium ${sevColor[a.severity]}`}>{a.severity}</span>
                    <span className="text-[10px] text-muted-foreground">{a.time}</span>
                  </div>
                  <div className="mt-1 text-sm font-medium leading-snug">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.utility} · {a.site} · {a.id}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-xl xl:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Operations</CardTitle>
              <p className="text-xs text-muted-foreground">Open tasks, dispatch and SLA status</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {[
                  { l: "Open Tasks", v: 86, i: Activity },
                  { l: "Dispatched", v: 42, i: HardHat },
                  { l: "In Progress", v: 28, i: Wrench },
                  { l: "Closed Today", v: 31, i: CheckCircle2 },
                ].map((s) => (
                  <div key={s.l} className="rounded-lg border bg-[var(--surface)] p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{s.l}</span>
                      <s.i className="h-3.5 w-3.5 text-[var(--navy)]" />
                    </div>
                    <div className="mt-1 text-xl font-semibold">{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-muted-foreground">
                    <tr className="border-b">
                      <th className="text-left py-2 pr-3">Order</th>
                      <th className="text-left py-2 pr-3">Asset</th>
                      <th className="text-left py-2 pr-3">Priority</th>
                      <th className="text-left py-2 pr-3">SLA</th>
                      <th className="text-left py-2 pr-3">Status</th>
                      <th className="text-left py-2 pr-3">Assignee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workOrders.slice(0, 6).map(w => (
                      <tr key={w.id} className="border-b last:border-0">
                        <td className="py-2 pr-3 font-medium">{w.id}</td>
                        <td className="py-2 pr-3">{w.asset}</td>
                        <td className="py-2 pr-3"><span className={`rounded border px-1.5 py-0.5 text-[10px] ${sevColor[w.priority]}`}>{w.priority}</span></td>
                        <td className="py-2 pr-3 text-muted-foreground">{w.sla}</td>
                        <td className="py-2 pr-3">{w.status}</td>
                        <td className="py-2 pr-3">{w.assignee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technicians + Sustainability */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="rounded-xl xl:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Technician Dashboard</CardTitle>
              <p className="text-xs text-muted-foreground">Availability and field assignments</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { l: "Available", v: 142, c: "var(--success)" },
                  { l: "Busy", v: 38, c: "var(--warning)" },
                  { l: "On Site", v: 27, c: "var(--info)" },
                  { l: "Emergency", v: 6, c: "var(--destructive)" },
                ].map(s => (
                  <div key={s.l} className="rounded-lg border bg-[var(--surface)] p-3">
                    <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: s.c }} /><span className="text-xs text-muted-foreground">{s.l}</span></div>
                    <div className="mt-1 text-xl font-semibold">{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {technicians.map(t => (
                  <div key={t.name} className="flex items-center gap-3 rounded-lg border p-3">
                    <div className="h-10 w-10 rounded-full bg-[var(--navy)] grid place-items-center text-primary-foreground text-xs font-semibold">{t.initials}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium truncate">{t.name}</div>
                        <span className="text-[10px] text-muted-foreground">{t.eta !== "—" ? `ETA ${t.eta}` : ""}</span>
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{t.skill} · {t.assignment}</div>
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${
                      t.status === "Available" ? "border-[color:var(--success)] text-[color:var(--success)]" :
                      t.status === "Emergency" ? "border-destructive text-destructive" :
                      "border-[color:var(--warning)] text-[color:var(--warning-foreground)]"
                    }`}>{t.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2"><Leaf className="h-4 w-4 text-[color:var(--success)]" />Sustainability</CardTitle>
              <p className="text-xs text-muted-foreground">Corridor-wide ESG indicators</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Stat label="Energy" value={`${sustainability.energy} GWh`} sub="this month" />
                <Stat label="Water" value={`${sustainability.water} ML`} sub="per day" />
                <Stat label="Carbon" value={`${sustainability.carbon} kt`} sub="CO₂e / mo" />
                <Stat label="Renewable" value={`${sustainability.renewableShare}%`} sub="share of mix" />
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-xs"><span>Sustainability Score</span><span className="font-semibold">{sustainability.score}/100</span></div>
                <Progress value={sustainability.score} className="h-2 mt-2" />
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={consumptionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" width={28} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Line dataKey="Energy" stroke="var(--navy)" dot={false} strokeWidth={2} />
                    <Line dataKey="Water" stroke="var(--teal)" dot={false} strokeWidth={2} />
                    <Line dataKey="Renewable" stroke="var(--success)" dot={false} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom: corridor consumption */}
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Corridor Consumption (YTD)</CardTitle>
            <p className="text-xs text-muted-foreground">Aggregated across all utilities and sites</p>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consumptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="Energy" fill="var(--navy)" radius={[4,4,0,0]} />
                <Bar dataKey="Water" fill="var(--teal)" radius={[4,4,0,0]} />
                <Bar dataKey="Renewable" fill="var(--success)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border bg-[var(--surface)] p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
      {sub && <div className="text-[10px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

// silence unused
void Cell;
