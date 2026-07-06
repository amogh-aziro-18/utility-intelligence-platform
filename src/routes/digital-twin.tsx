import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Network, GitBranch, Workflow, Siren } from "lucide-react";
import { corridorNodes, corridorEdges } from "@/lib/mock-data";
import { disasterScenarios } from "@/lib/disaster-data";

export const Route = createFileRoute("/digital-twin")({
  head: () => ({ meta: [{ title: "Digital Twin · Aziro" }] }),
  component: TwinPage,
});

function TwinPage() {
  return (
    <>
      <PageHeader title="Digital Twin" description="Live virtual representation of the industrial corridor" />
      <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="rounded-xl xl:col-span-2">
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Network className="h-4 w-4 text-[var(--navy)]" />Corridor Dependency Graph</CardTitle></CardHeader>
          <CardContent>
            <div className="relative h-[500px] rounded-lg border bg-[var(--surface)] overflow-hidden">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                {corridorEdges.map(([a,b], i) => {
                  const na = corridorNodes.find(n => n.id === a)!;
                  const nb = corridorNodes.find(n => n.id === b)!;
                  return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="var(--teal)" strokeWidth="0.35" opacity="0.7" />;
                })}
              </svg>
              {corridorNodes.map(n => (
                <div key={n.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                  <div className="grid place-items-center rounded-full border-2 border-[var(--navy)] bg-card h-14 w-14 text-[10px] font-medium text-center leading-tight px-1 shadow-sm">
                    {n.type.split(" ")[0]}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><GitBranch className="h-4 w-4 text-[var(--teal)]" />Infrastructure Relationships</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[
              { a: "Power Station → Industrial Park", impact: "Critical" },
              { a: "Water Plant → Buildings & HVAC", impact: "High" },
              { a: "Rail Hub → Port Logistics", impact: "High" },
              { a: "Renewable → Power Grid", impact: "Medium" },
              { a: "Comms → All Utilities", impact: "Critical" },
              { a: "Airport → Roads & Rail", impact: "Medium" },
            ].map((r,i) => (
              <div key={i} className="flex items-center justify-between rounded-md border p-2.5">
                <span className="text-sm">{r.a}</span><Badge variant="outline" className="text-[10px]">{r.impact}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-xl xl:col-span-3">
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Workflow className="h-4 w-4 text-[var(--navy)]" />Scenario Simulation · Impact Analysis</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { s: "Substation S-09 offline (6h)", impact: ["Industrial Park A: 14% load shed","HVAC efficiency -8%","Estimated $42k revenue impact"], sev: "High" },
              { s: "Port crane fleet 50% degraded", impact: ["Container throughput -22%","Warehouse fill 89%","Rail dispatch delays 35m avg"], sev: "Medium" },
              { s: "Renewable generation -25%", impact: ["Grid imports +6%","Carbon +1.2 kt/wk","No SLA breach predicted"], sev: "Low" },
            ].map((x,i) => (
              <div key={i} className="rounded-lg border p-4 bg-[var(--surface)]">
                <div className="flex justify-between"><div className="text-sm font-semibold">{x.s}</div><Badge variant="outline" className="text-[10px]">{x.sev}</Badge></div>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground list-disc pl-4">
                  {x.impact.map((it,j) => <li key={j}>{it}</li>)}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Disaster Simulation */}
        <Card className="rounded-xl xl:col-span-3">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2"><Siren className="h-4 w-4 text-destructive" />Disaster Simulation · Cascading Impact Analysis</CardTitle>
            <p className="text-xs text-muted-foreground">Full-corridor simulations across 10 disaster classes with AI-generated recovery plans</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {disasterScenarios.map((d, i) => (
                <div key={i} className="rounded-lg border p-3 bg-[var(--surface)]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-semibold leading-tight">{d.s}</div>
                    <Badge variant="outline" className={`text-[10px] ${d.sev === "Critical" ? "border-destructive text-destructive" : d.sev === "High" ? "border-[color:var(--warning)] text-[color:var(--warning-foreground)]" : "border-[color:var(--info)] text-[color:var(--info)]"}`}>{d.sev}</Badge>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-1.5 text-[11px]">
                    <div><span className="text-muted-foreground">Assets:</span> <span className="font-medium">{d.assets}</span></div>
                    <div><span className="text-muted-foreground">Revenue:</span> <span className="font-medium">{d.revenue}</span></div>
                    <div><span className="text-muted-foreground">RTO:</span> <span className="font-medium">{d.rto}</span></div>
                    <div><span className="text-muted-foreground">Utilities:</span> <span className="font-medium">{d.utilities.length}</span></div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {d.utilities.map(u => <span key={u} className="rounded border px-1.5 py-0.5 text-[10px]">{u}</span>)}
                  </div>
                  <div className="mt-2">
                    <div className="text-[10px] font-semibold text-muted-foreground uppercase">Cascading Failures</div>
                    <ul className="mt-1 space-y-0.5 text-[11px] text-muted-foreground list-disc pl-4">
                      {d.cascade.map((c, j) => <li key={j}>{c}</li>)}
                    </ul>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-[10px]"><span className="text-muted-foreground">AI Recovery Plan Progress</span><span className="tabular-nums">Ready</span></div>
                    <Progress value={100 - Math.min(90, d.assets / 3)} className="h-1 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
