import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { utilityCards, trend } from "@/lib/mock-data";
import { utilityResilience } from "@/lib/disaster-data";

export const Route = createFileRoute("/utilities")({
  head: () => ({ meta: [{ title: "Utilities · Aziro" }] }),
  component: UtilitiesPage,
});

function UtilitiesPage() {
  return (
    <>
      <PageHeader title="Utilities" description="Operational health, alerts and forecasts per utility vertical" />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {utilityCards.map(u => {
          const data = trend(u.health, 14, 6);
          return (
            <Card key={u.name} className="rounded-xl">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base">{u.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{u.assets.toLocaleString()} assets</p>
                </div>
                <Badge variant="outline" className="text-[10px]">{u.alerts} alerts</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline gap-3">
                  <div className="text-3xl font-semibold tracking-tight">{u.health}%</div>
                  <div className="text-xs text-muted-foreground">operational health</div>
                </div>
                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id={`u-${u.name}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="var(--teal)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="t" hide />
                      <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                      <Area dataKey="v" stroke="var(--navy)" strokeWidth={2} fill={`url(#u-${u.name})`} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                  <div><div className="text-[10px] text-muted-foreground uppercase">Forecast</div><div className="text-sm font-medium">{u.forecast}</div></div>
                  <div><div className="text-[10px] text-muted-foreground uppercase">SLA</div><div className="text-sm font-medium">99.{90 + (u.assets % 9)}%</div></div>
                </div>
                {(() => {
                  const r = utilityResilience.find(x => x.name === u.name);
                  if (!r) return null;
                  return (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                      <div><div className="text-[10px] text-muted-foreground uppercase">Weather Impact</div><div className="text-xs font-medium">{r.weatherImpact}</div></div>
                      <div><div className="text-[10px] text-muted-foreground uppercase">Disaster Risk</div><div className="text-xs font-medium">{r.disasterRisk}</div></div>
                      <div><div className="text-[10px] text-muted-foreground uppercase">Resilience</div><div className="text-xs font-medium">{r.resilience}%</div></div>
                      <div><div className="text-[10px] text-muted-foreground uppercase">Continuity</div><div className="text-xs font-medium">{r.continuity}%</div></div>
                      <div><div className="text-[10px] text-muted-foreground uppercase">Op. Dependency</div><div className="text-xs font-medium">{r.opDep}</div></div>
                      <div><div className="text-[10px] text-muted-foreground uppercase">Recovery Priority</div><div className="text-xs font-medium">P{r.recoveryPri}</div></div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
