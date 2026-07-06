import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EmergencyBanner } from "@/components/emergency-banner";
import { ShieldAlert, Sparkles, Activity, Radio, Truck, Clock, AlertTriangle } from "lucide-react";
import {
  resilienceTiles, levelStyle, disasterAI, activeIncident, incidentTimeline,
  emergencyResources, weatherNow, weatherForecast,
} from "@/lib/disaster-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/resilience")({
  head: () => ({ meta: [{ title: "Operational Resilience · Aziro" }] }),
  component: ResiliencePage,
});

const prioColor: Record<string, string> = {
  High: "border-destructive text-destructive",
  Medium: "border-[color:var(--warning)] text-[color:var(--warning-foreground)]",
  Low: "border-[color:var(--info)] text-[color:var(--info)]",
  Info: "border-[color:var(--teal)] text-[var(--navy)]",
};

function ResiliencePage() {
  return (
    <>
      <EmergencyBanner />
      <PageHeader
        title="Operational Resilience"
        description="Monitor · Predict · Respond · Recover — critical infrastructure disaster intelligence"
        actions={
          <>
            <Badge variant="outline" className="gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--warning)" }} />
              Threat Level · Orange
            </Badge>
            <Badge variant="outline">Continuity Level 2</Badge>
          </>
        }
      />
      <div className="p-6 space-y-6">
        {/* Executive resilience tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-3">
          {resilienceTiles.map((t) => {
            const s = levelStyle[t.level];
            return (
              <Card key={t.label} className="rounded-xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">{t.label}</div>
                    <span className="h-2 w-2 rounded-full" style={{ background: s.ring }} />
                  </div>
                  <div className="mt-1 text-2xl font-semibold tracking-tight">{t.value}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wide font-medium" style={{ color: s.text }}>{s.label}</span>
                    <span className="text-[11px] text-muted-foreground">{t.hint}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Weather + Disaster AI */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="rounded-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="h-4 w-4 text-[var(--navy)]" /> Weather Intelligence
              </CardTitle>
              <p className="text-xs text-muted-foreground">Live conditions · Western Corridor</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { l: "Temp", v: `${weatherNow.temp}°C` },
                  { l: "Humidity", v: `${weatherNow.humidity}%` },
                  { l: "Rain Prob.", v: `${weatherNow.rainProb}%` },
                  { l: "Wind", v: `${weatherNow.wind} km/h ${weatherNow.windDir}` },
                  { l: "Heat Idx", v: `${weatherNow.heatIndex}°C` },
                  { l: "Visibility", v: `${weatherNow.visibility} km` },
                  { l: "AQI", v: `${weatherNow.aqi}` },
                  { l: "Lightning", v: weatherNow.lightningRisk },
                  { l: "Flood Risk", v: weatherNow.floodRisk },
                ].map((k) => (
                  <div key={k.l} className="rounded-md border bg-[var(--surface)] p-2">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{k.l}</div>
                    <div className="text-sm font-semibold mt-0.5">{k.v}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border p-2.5">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-medium">Storm Alert</div>
                  <Badge variant="outline" className="text-[10px] border-destructive text-destructive">Active</Badge>
                </div>
                <div className="text-xs text-muted-foreground">{weatherNow.stormAlert}</div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weatherForecast}>
                    <defs>
                      <linearGradient id="rainG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--info)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="var(--info)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="h" tick={{ fontSize: 9 }} interval={3} />
                    <YAxis tick={{ fontSize: 9 }} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Area dataKey="rain" name="Rain %" stroke="var(--info)" fill="url(#rainG)" strokeWidth={1.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="text-[11px] text-muted-foreground">24-hour rainfall probability forecast</div>
            </CardContent>
          </Card>

          <Card className="rounded-xl xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[var(--teal)]" /> AI Disaster Intelligence
                </CardTitle>
                <p className="text-xs text-muted-foreground">Reasoning-backed disaster & continuity recommendations</p>
              </div>
              <Badge variant="outline" className="text-[10px]">Aziro AI · Crisis Model v2</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {disasterAI.map((i, idx) => (
                  <div key={idx} className="rounded-lg border bg-[var(--surface)] p-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline" className="text-[10px] border-[var(--teal)] text-[var(--navy)] bg-[var(--accent)]">{i.tag}</Badge>
                      <Badge variant="outline" className={`text-[10px] ${prioColor[i.priority] ?? ""}`}>{i.priority}</Badge>
                    </div>
                    <p className="mt-1.5 text-sm font-medium leading-snug">{i.text}</p>
                    <div className="mt-1.5 text-[11px] text-muted-foreground"><span className="font-semibold text-foreground/80">Why:</span> {i.why}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground"><span className="font-semibold text-foreground/80">Action:</span> {i.action}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <Progress value={i.confidence} className="h-1 flex-1" />
                      <span className="text-[10px] tabular-nums text-muted-foreground w-10 text-right">{i.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Incident Command */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="rounded-xl xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-sm flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-[color:var(--warning-foreground)]" /> Incident Command · Active Event
                </CardTitle>
                <p className="text-xs text-muted-foreground">{activeIncident.title}</p>
              </div>
              <Badge variant="outline" className="text-[10px] border-[color:var(--warning)] text-[color:var(--warning-foreground)]">
                {activeIncident.severity}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { l: "Affected Utilities", v: activeIncident.affectedUtilities.join(" · ") },
                  { l: "Impact Radius", v: activeIncident.impactRadius },
                  { l: "Response Status", v: activeIncident.responseStatus },
                  { l: "Recovery ETA", v: activeIncident.recoveryEta },
                  { l: "Teams Assigned", v: `${activeIncident.teamsAssigned}` },
                  { l: "Financial Impact", v: activeIncident.financialImpact },
                  { l: "SLA Impact", v: activeIncident.slaImpact },
                  { l: "Sites", v: `${activeIncident.affectedSites.length}` },
                ].map((k) => (
                  <div key={k.l} className="rounded-md border p-2 bg-[var(--surface)]">
                    <div className="text-[10px] text-muted-foreground uppercase">{k.l}</div>
                    <div className="text-xs font-semibold mt-0.5">{k.v}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Recovery Progress</span>
                  <span className="tabular-nums text-muted-foreground">{activeIncident.progress}%</span>
                </div>
                <Progress value={activeIncident.progress} className="h-2 mt-2" />
              </div>
              <div>
                <div className="text-xs font-medium mb-2">Affected Sites</div>
                <div className="flex flex-wrap gap-1.5">
                  {activeIncident.affectedSites.map((s) => (
                    <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Clock className="h-4 w-4 text-[var(--navy)]" />Response Timeline</CardTitle></CardHeader>
            <CardContent>
              <ol className="relative border-l ml-2">
                {incidentTimeline.map((e, i) => (
                  <li key={i} className="ml-4 py-2">
                    <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-card" style={{
                      background:
                        e.k === "alert" ? "var(--destructive)" :
                        e.k === "ai" ? "var(--teal)" :
                        e.k === "dispatch" ? "var(--info)" : "var(--warning)",
                    }} />
                    <div className="text-[11px] text-muted-foreground tabular-nums">{e.t}</div>
                    <div className="text-xs">{e.e}</div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Resources */}
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2"><Truck className="h-4 w-4 text-[var(--navy)]" />Emergency Resources</CardTitle>
            <p className="text-xs text-muted-foreground">Vehicles, generators, tankers and shelters ready for deployment</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
              {emergencyResources.map((r) => (
                <div key={r.l} className="rounded-lg border p-3 bg-[var(--surface)]">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Radio className="h-3 w-3" /> {r.l}
                  </div>
                  <div className="text-2xl font-semibold mt-1">{r.v}</div>
                  <div className="text-[11px] text-muted-foreground">{r.sub}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <AlertTriangle className="h-3.5 w-3.5" />
          Data shown is demonstration content — not connected to live disaster or weather APIs.
        </div>
      </div>
    </>
  );
}
