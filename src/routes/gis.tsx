import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plane, Ship, Factory, Boxes, Zap, Droplets, Leaf, TrainFront, Cpu, Route as RouteIcon,
} from "lucide-react";
import { corridorNodes, corridorEdges } from "@/lib/mock-data";
import { disasterMapLayers } from "@/lib/disaster-data";

export const Route = createFileRoute("/gis")({
  head: () => ({ meta: [{ title: "GIS & Maps · Aziro" }] }),
  component: GISPage,
});

const statusColor: Record<string, string> = {
  healthy: "var(--success)", warning: "var(--warning)", critical: "var(--destructive)",
};

const nodeIcon = (type: string) => ({
  Airport: Plane, Port: Ship, Railway: TrainFront, "Industrial Park": Factory,
  Warehouse: Boxes, "Power Station": Zap, "Water Treatment": Droplets, "Renewable Energy": Leaf,
}[type] ?? Cpu);

function GISPage() {
  const layers = [
    { name: "Power Grid", color: "var(--navy)" },
    { name: "Water Network", color: "var(--teal)" },
    { name: "Road Network", color: "var(--warning)" },
    { name: "Rail Network", color: "var(--info)" },
    { name: "Communications", color: "var(--success)" },
  ];

  return (
    <>
      <PageHeader title="GIS & Maps" description="Geo-spatial intelligence across the corridor" />
      <div className="p-6 grid grid-cols-1 xl:grid-cols-4 gap-4">
        <Card className="rounded-xl xl:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm">Corridor Geospatial View</CardTitle>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[color:var(--success)]" />Healthy</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[color:var(--warning)]" />Warning</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[color:var(--destructive)]" />Critical</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative h-[560px] w-full overflow-hidden rounded-lg border bg-[var(--surface)]">
              <svg className="absolute inset-0 h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.9 0.01 250)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid2)" />
              </svg>
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {corridorEdges.map(([a,b], i) => {
                  const na = corridorNodes.find(n => n.id === a)!;
                  const nb = corridorNodes.find(n => n.id === b)!;
                  return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="var(--teal)" strokeWidth="0.3" strokeDasharray="0.7 0.5" opacity="0.8" />;
                })}
              </svg>
              {corridorNodes.map(n => {
                const Icon = nodeIcon(n.type);
                return (
                  <div key={n.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                    <div className="flex flex-col items-center gap-1">
                      <div className="relative grid h-12 w-12 place-items-center rounded-xl border bg-card shadow-sm">
                        <Icon className="h-5 w-5 text-[var(--navy)]" />
                        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full ring-2 ring-card" style={{ background: statusColor[n.status] }} />
                      </div>
                      <div className="rounded bg-card/95 px-2 py-0.5 text-[11px] font-medium shadow-sm border whitespace-nowrap">{n.name}</div>
                      <div className="text-[10px] text-muted-foreground">{n.type}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm">Map Layers</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {layers.map(l => (
                <label key={l.name} className="flex items-center justify-between rounded-md border p-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
                    <span className="text-sm">{l.name}</span>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-[color:var(--navy)]" />
                </label>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm">Disaster & Weather Layers</CardTitle></CardHeader>
            <CardContent className="space-y-1.5 max-h-80 overflow-auto">
              {disasterMapLayers.map(l => (
                <label key={l.name} className="flex items-center justify-between rounded-md border p-1.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
                    <span className="text-xs">{l.name}</span>
                  </div>
                  <input type="checkbox" className="accent-[color:var(--navy)]" />
                </label>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm">Site Index</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {corridorNodes.map(n => (
                <div key={n.id} className="flex items-center justify-between rounded-md border p-2">
                  <div className="text-sm">{n.name}</div>
                  <Badge variant="outline" className="text-[10px] capitalize">{n.status}</Badge>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                <RouteIcon className="h-3.5 w-3.5" /> {corridorEdges.length} active corridor links
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
