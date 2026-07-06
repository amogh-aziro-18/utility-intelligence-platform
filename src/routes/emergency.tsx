import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flame, Droplets, Zap as ZapIcon, HeartPulse, Shield, Truck, Siren, Radio } from "lucide-react";
import { emergencyTeams, activeIncident, incidentTimeline, emergencyResources } from "@/lib/disaster-data";

export const Route = createFileRoute("/emergency")({
  head: () => ({ meta: [{ title: "Emergency Response · Aziro" }] }),
  component: EmergencyPage,
});

const teamIcon: Record<string, any> = {
  Fire: Flame, Water: Droplets, Electrical: ZapIcon, Medical: HeartPulse,
  Security: Shield, Disaster: Siren, HAZMAT: Truck,
};

const statusColor: Record<string, string> = {
  Available: "border-[color:var(--success)] text-[color:var(--success)]",
  Staged: "border-[color:var(--info)] text-[color:var(--info)]",
  Dispatched: "border-[color:var(--warning)] text-[color:var(--warning-foreground)]",
  "On Site": "border-[var(--navy)] text-[var(--navy)]",
  Patrolling: "border-[color:var(--teal)] text-[var(--navy)]",
};

const escalation = [
  { level: "L1", desc: "Local site response · single utility", teams: 1 },
  { level: "L2", desc: "Multi-utility coordinated response", teams: 3 },
  { level: "L3", desc: "Corridor-wide continuity activation", teams: 7 },
  { level: "L4", desc: "National / regional disaster protocol", teams: 14 },
];

function EmergencyPage() {
  return (
    <>
      <PageHeader
        title="Emergency Response & Incident Command"
        description="Live dispatch, response teams, resources and recovery coordination"
        actions={<Badge variant="outline" className="gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[color:var(--warning)]" />Escalation Level 2</Badge>}
      />
      <div className="p-6 space-y-4">
        {/* Active incident summary */}
        <Card className="rounded-xl border-l-4" style={{ borderLeftColor: "var(--warning)" }}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-sm">{activeIncident.title}</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Severity {activeIncident.severity} · {activeIncident.impactRadius} radius · {activeIncident.teamsAssigned} teams deployed</p>
            </div>
            <Badge variant="outline" className="text-[10px] border-[color:var(--warning)] text-[color:var(--warning-foreground)]">{activeIncident.responseStatus}</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {[
                { l: "Recovery ETA", v: activeIncident.recoveryEta },
                { l: "Financial Impact", v: activeIncident.financialImpact },
                { l: "SLA Impact", v: activeIncident.slaImpact },
                { l: "Affected Utilities", v: `${activeIncident.affectedUtilities.length}` },
                { l: "Affected Sites", v: `${activeIncident.affectedSites.length}` },
              ].map((k) => (
                <div key={k.l} className="rounded-md border p-2 bg-[var(--surface)]">
                  <div className="text-[10px] text-muted-foreground uppercase">{k.l}</div>
                  <div className="text-sm font-semibold mt-0.5">{k.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg border p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Recovery Progress</span>
                <span className="tabular-nums text-muted-foreground">{activeIncident.progress}%</span>
              </div>
              <Progress value={activeIncident.progress} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Teams */}
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-sm">Emergency Response Teams</CardTitle>
            <p className="text-xs text-muted-foreground">Live dispatch, crew size, vehicles and ETA</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              {emergencyTeams.map((t) => {
                const Icon = teamIcon[t.type] ?? Siren;
                return (
                  <div key={t.name} className="rounded-lg border p-3 bg-card">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-md bg-[var(--accent)]">
                          <Icon className="h-4 w-4 text-[var(--navy)]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold leading-tight">{t.name}</div>
                          <div className="text-[11px] text-muted-foreground">{t.type} · {t.crew} crew · {t.vehicles} vehicles</div>
                        </div>
                      </div>
                      <Badge variant="outline" className={`text-[10px] ${statusColor[t.status] ?? ""}`}>{t.status}</Badge>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{t.location}</span>
                      {t.eta !== "—" && <span className="tabular-nums">ETA {t.eta}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Resources + Timeline + Escalation */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Truck className="h-4 w-4 text-[var(--navy)]" />Equipment Inventory</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {emergencyResources.map((r) => (
                <div key={r.l} className="flex items-center justify-between rounded-md border p-2.5">
                  <div className="flex items-center gap-2"><Radio className="h-3.5 w-3.5 text-muted-foreground" /><div><div className="text-sm">{r.l}</div><div className="text-[11px] text-muted-foreground">{r.sub}</div></div></div>
                  <div className="text-lg font-semibold tabular-nums">{r.v}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm">Incident Command Timeline</CardTitle></CardHeader>
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

          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm">Escalation Levels</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {escalation.map((e) => (
                <div key={e.level} className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{e.level}</div>
                    <Badge variant="outline" className="text-[10px]">{e.teams} teams</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{e.desc}</div>
                </div>
              ))}
              <div className="mt-2 rounded-md border p-3 bg-[var(--surface)]">
                <div className="text-xs font-medium">Current Escalation</div>
                <div className="text-2xl font-semibold mt-1">Level 2</div>
                <div className="text-[11px] text-muted-foreground">Auto-raised by Aziro Crisis Model</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
