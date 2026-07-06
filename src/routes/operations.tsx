import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { alerts, workOrders } from "@/lib/mock-data";
import { emergencyTeams, activeIncident } from "@/lib/disaster-data";
import { Progress } from "@/components/ui/progress";
import { Siren } from "lucide-react";

export const Route = createFileRoute("/operations")({
  head: () => ({ meta: [{ title: "Operations · Aziro" }] }),
  component: OperationsPage,
});

const sev: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/30",
  Medium: "bg-[var(--warning)]/15 text-[color:var(--warning-foreground)] border-[var(--warning)]/40",
  Low: "bg-[var(--info)]/10 text-[color:var(--info)] border-[var(--info)]/30",
};

const timeline = [
  { t: "08:12", e: "Voltage anomaly detected at Substation S-09", k: "alert" },
  { t: "08:14", e: "AI dispatched R. Mehta to S-09 (ETA 18m)", k: "dispatch" },
  { t: "08:31", e: "Technician on-site; running diagnostics", k: "progress" },
  { t: "09:02", e: "Transformer T-21 vibration spike — auto WO-5512 created", k: "alert" },
  { t: "09:14", e: "Reservoir R-3 level restored to 84%", k: "resolved" },
  { t: "09:48", e: "Runway 09L lights replacement in progress", k: "progress" },
];

function OperationsPage() {
  return (
    <>
      <PageHeader title="Operations" description="Live operational queue, dispatch and timeline" />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { l: "Open Alerts", v: 23 },
            { l: "Active WOs", v: 86 },
            { l: "Dispatched", v: 42 },
            { l: "SLA at Risk", v: 7 },
            { l: "Closed Today", v: 31 },
            { l: "MTTR (h)", v: "2.4" },
          ].map(s => (
            <Card key={s.l} className="rounded-xl"><CardContent className="p-4">
              <div className="text-xs text-muted-foreground">{s.l}</div>
              <div className="text-2xl font-semibold mt-1">{s.v}</div>
            </CardContent></Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm">Alert Management</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {alerts.map(a => (
                <div key={a.id} className="rounded-lg border p-3 flex items-start gap-3">
                  <span className={`mt-0.5 rounded border px-1.5 py-0.5 text-[10px] ${sev[a.severity]}`}>{a.severity}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{a.title}</div>
                    <div className="text-xs text-muted-foreground">{a.utility} · {a.site} · {a.id}</div>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{a.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm">Task Queue</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-muted-foreground"><tr className="border-b">
                    <th className="text-left py-2 pr-3">WO</th><th className="text-left py-2 pr-3">Asset</th>
                    <th className="text-left py-2 pr-3">Priority</th><th className="text-left py-2 pr-3">SLA</th>
                    <th className="text-left py-2 pr-3">Status</th><th className="text-left py-2 pr-3">Assignee</th>
                  </tr></thead>
                  <tbody>
                    {workOrders.map(w => (
                      <tr key={w.id} className="border-b last:border-0">
                        <td className="py-2 pr-3 font-mono text-xs">{w.id}</td>
                        <td className="py-2 pr-3">{w.asset}</td>
                        <td className="py-2 pr-3"><Badge variant="outline" className={`text-[10px] ${sev[w.priority]}`}>{w.priority}</Badge></td>
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

        <Card className="rounded-xl">
          <CardHeader><CardTitle className="text-sm">Incident Timeline · Today</CardTitle></CardHeader>
          <CardContent>
            <ol className="relative border-l ml-2">
              {timeline.map((e, i) => (
                <li key={i} className="ml-4 py-2">
                  <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-card" style={{
                    background: e.k === "alert" ? "var(--destructive)" : e.k === "resolved" ? "var(--success)" : e.k === "dispatch" ? "var(--teal)" : "var(--warning)"
                  }} />
                  <div className="text-xs text-muted-foreground tabular-nums">{e.t}</div>
                  <div className="text-sm">{e.e}</div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Emergency Response Queue */}
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2"><Siren className="h-4 w-4 text-destructive" />Emergency Response Queue · {activeIncident.title}</CardTitle>
            <p className="text-xs text-muted-foreground">Live emergency dispatch, recovery progress and SLA impact</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {[
                { l: "Severity", v: activeIncident.severity },
                { l: "Impact Radius", v: activeIncident.impactRadius },
                { l: "Recovery ETA", v: activeIncident.recoveryEta },
                { l: "Teams", v: `${activeIncident.teamsAssigned}` },
                { l: "SLA Risk", v: activeIncident.slaImpact },
              ].map(k => (
                <div key={k.l} className="rounded-md border p-2 bg-[var(--surface)]"><div className="text-[10px] uppercase text-muted-foreground">{k.l}</div><div className="text-sm font-semibold">{k.v}</div></div>
              ))}
            </div>
            <div className="rounded-lg border p-3">
              <div className="flex items-center justify-between text-xs mb-1"><span className="font-medium">Recovery Progress</span><span className="tabular-nums text-muted-foreground">{activeIncident.progress}%</span></div>
              <Progress value={activeIncident.progress} className="h-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
              {emergencyTeams.map(t => (
                <div key={t.name} className="rounded-md border p-2.5">
                  <div className="flex items-center justify-between"><div className="text-xs font-semibold truncate">{t.name}</div><Badge variant="outline" className="text-[10px]">{t.status}</Badge></div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{t.location}{t.eta !== "—" ? ` · ETA ${t.eta}` : ""}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
