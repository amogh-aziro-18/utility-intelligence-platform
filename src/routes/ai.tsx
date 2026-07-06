import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BrainCircuit, AlertTriangle, GitBranch, Activity, BarChart3 } from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { aiInsights } from "@/lib/mock-data";
import { disasterAI } from "@/lib/disaster-data";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/ai")({
  head: () => ({ meta: [{ title: "AI Intelligence · Aziro" }] }),
  component: AIPage,
});

const forecast = Array.from({length: 14}).map((_,i) => ({
  d: `D${i+1}`,
  Power: 800 + Math.sin(i/2)*80 + i*4,
  Water: 600 + Math.cos(i/2)*60 + i*3,
  Predicted: 820 + Math.sin(i/2)*90 + i*5,
}));

const maintenance = Array.from({length: 10}).map((_,i) => ({
  asset: `Asset ${i+1}`,
  risk: 30 + Math.round(Math.random()*65),
}));

const dependency = [
  { from: "Power", to: "Water", weight: 0.82 },
  { from: "Power", to: "Comms", weight: 0.78 },
  { from: "Water", to: "Buildings", weight: 0.65 },
  { from: "Rail", to: "Port", weight: 0.81 },
  { from: "Airport", to: "Roads", weight: 0.59 },
  { from: "Renewable", to: "Power", weight: 0.71 },
];

const heat: { utility: string; A: number; B: number; C: number; D: number; E: number }[] =
  ["Power","Water","Gas","Roads","Rail","Airport","Port","Comms","Renewable"].map(u => ({
    utility: u,
    A: Math.round(20 + Math.random()*80),
    B: Math.round(20 + Math.random()*80),
    C: Math.round(20 + Math.random()*80),
    D: Math.round(20 + Math.random()*80),
    E: Math.round(20 + Math.random()*80),
  }));

function AIPage() {
  return (
    <>
      <PageHeader title="AI Intelligence" description="Forecasting, predictive maintenance and scenario simulation"
        actions={<Badge variant="outline" className="gap-1.5"><Sparkles className="h-3 w-3 text-[var(--teal)]" />Aziro AI v4.2</Badge>} />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="rounded-xl xl:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="h-4 w-4 text-[var(--navy)]" />Demand Forecasting · 14-day horizon</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="d" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line dataKey="Power" stroke="var(--navy)" dot={false} strokeWidth={2} />
                  <Line dataKey="Water" stroke="var(--teal)" dot={false} strokeWidth={2} />
                  <Line dataKey="Predicted" stroke="var(--warning)" dot={false} strokeWidth={2} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Sparkles className="h-4 w-4 text-[var(--teal)]" />AI Recommendations</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {aiInsights.map((i,idx) => (
                <div key={idx} className="rounded-lg border bg-[var(--surface)] p-3">
                  <div className="flex justify-between"><Badge variant="outline" className="text-[10px]">{i.tag}</Badge><span className="text-[10px] text-muted-foreground">Impact: {i.impact}</span></div>
                  <p className="mt-1.5 text-sm leading-snug">{i.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-[color:var(--warning-foreground)]" />Predictive Maintenance Risk</CardTitle></CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maintenance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" domain={[0,100]} tick={{ fontSize: 11 }} />
                  <YAxis dataKey="asset" type="category" tick={{ fontSize: 11 }} width={70} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Bar dataKey="risk" fill="var(--navy)" radius={[0,4,4,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><GitBranch className="h-4 w-4 text-[var(--navy)]" />Cross-Utility Dependency</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dependency.map((d,i) => (
                  <div key={i} className="flex items-center gap-3 rounded-md border p-2.5">
                    <Badge variant="outline" className="text-[10px]">{d.from}</Badge>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-[var(--teal)]" style={{ width: `${d.weight*100}%` }} />
                    </div>
                    <Badge variant="outline" className="text-[10px]">{d.to}</Badge>
                    <span className="text-xs font-medium tabular-nums w-10 text-right">{d.weight.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="rounded-xl xl:col-span-2">
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Activity className="h-4 w-4 text-[var(--navy)]" />Risk Heatmap · Utility × Zone</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr><th className="text-left py-2 px-2 text-muted-foreground">Utility</th>{["Zone A","Zone B","Zone C","Zone D","Zone E"].map(z => <th key={z} className="px-2 py-2 text-muted-foreground">{z}</th>)}</tr>
                  </thead>
                  <tbody>
                    {heat.map(row => (
                      <tr key={row.utility} className="border-t">
                        <td className="py-2 px-2 font-medium">{row.utility}</td>
                        {(["A","B","C","D","E"] as const).map(z => {
                          const v = row[z] as number;
                          const hue = v > 70 ? "oklch(0.6 0.2 27)" : v > 45 ? "oklch(0.78 0.16 75)" : "oklch(0.62 0.15 155)";
                          return <td key={z} className="px-1 py-1"><div className="rounded h-9 grid place-items-center text-white text-xs font-semibold" style={{ background: hue, opacity: 0.5 + v/200 }}>{v}</div></td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><BrainCircuit className="h-4 w-4 text-[var(--teal)]" />Scenario Simulation</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { s: "Pump Station B offline (4h)", i: "Low", desc: "Reroute via Station C maintains 96% SLA." },
                { s: "Substation S-09 fault", i: "High", desc: "Industrial Park A load shed of 14% required." },
                { s: "Port cyclone closure (24h)", i: "Medium", desc: "Warehouse storage utilization rises to 87%." },
                { s: "Renewable drop -20%", i: "Low", desc: "Grid imports rise 6%, no SLA breach predicted." },
              ].map((x,idx) => (
                <div key={idx} className="rounded-lg border p-3">
                  <div className="flex justify-between"><div className="text-sm font-medium">{x.s}</div><Badge variant="outline" className="text-[10px]">{x.i}</Badge></div>
                  <p className="mt-1 text-xs text-muted-foreground">{x.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-xl">
          <CardHeader><CardTitle className="text-sm">Operational Summary · Anomaly Score (7 days)</CardTitle></CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={Array.from({length: 48}).map((_,i)=>({t:i,score:30+Math.sin(i/3)*15+Math.random()*10}))}>
                <defs>
                  <linearGradient id="anom" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--teal)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="t" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Area dataKey="score" stroke="var(--navy)" fill="url(#anom)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Disaster Intelligence */}
        <Card className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm flex items-center gap-2"><BrainCircuit className="h-4 w-4 text-destructive" />AI Disaster Intelligence</CardTitle>
              <p className="text-xs text-muted-foreground">Weather · Climate · Emergency · Recovery · Business Continuity models</p>
            </div>
            <Badge variant="outline" className="text-[10px]">Crisis Model v2 · 8 domains</Badge>
          </CardHeader>
          <CardContent>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {["Weather Intelligence","Disaster Intelligence","Emergency Prediction","Recovery Optimization","Business Continuity","Climate Risk","Resilience Prediction","Cross-Utility Failure","Resource Optimization","Crew Dispatch","Root Cause Analysis"].map(c => (
                <span key={c} className="rounded-full border bg-[var(--surface)] px-2.5 py-0.5 text-[10px]">{c}</span>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              {disasterAI.map((i, idx) => (
                <div key={idx} className="rounded-lg border p-3 bg-[var(--surface)]">
                  <div className="flex items-center justify-between"><Badge variant="outline" className="text-[10px]">{i.tag}</Badge><span className="text-[10px] text-muted-foreground">{i.priority}</span></div>
                  <p className="mt-1.5 text-xs font-medium leading-snug">{i.text}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground leading-snug"><span className="font-semibold text-foreground/80">Reasoning:</span> {i.why}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground leading-snug"><span className="font-semibold text-foreground/80">Action:</span> {i.action}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={i.confidence} className="h-1 flex-1" />
                    <span className="text-[10px] tabular-nums w-8 text-right text-muted-foreground">{i.confidence}%</span>
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
