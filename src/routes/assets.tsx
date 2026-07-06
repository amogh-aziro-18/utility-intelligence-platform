import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assets } from "@/lib/mock-data";

export const Route = createFileRoute("/assets")({
  head: () => ({ meta: [{ title: "Assets · Aziro" }] }),
  component: AssetsPage,
});

const riskColor: Record<string,string> = {
  Low: "text-[color:var(--success)] border-[color:var(--success)]",
  Medium: "text-[color:var(--warning-foreground)] border-[color:var(--warning)]",
  High: "text-destructive border-destructive",
};

function AssetsPage() {
  const [q, setQ] = useState("");
  const [utility, setUtility] = useState("all");

  const filtered = useMemo(() => assets.filter(a => {
    const matchQ = !q || a.name.toLowerCase().includes(q.toLowerCase()) || a.location.toLowerCase().includes(q.toLowerCase()) || a.id.toLowerCase().includes(q.toLowerCase());
    const matchU = utility === "all" || a.utility === utility;
    return matchQ && matchU;
  }), [q, utility]);

  const utilities = Array.from(new Set(assets.map(a => a.utility)));

  return (
    <>
      <PageHeader title="Asset Inventory" description={`${assets.length.toLocaleString()} monitored assets across the corridor`}
        actions={<Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1.5" />Export</Button>} />
      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 rounded-md border bg-card px-3 h-9 w-80">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, site, ID…" className="h-7 border-0 p-0 shadow-none focus-visible:ring-0" />
          </div>
          <Select value={utility} onValueChange={setUtility}>
            <SelectTrigger className="w-44 h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Utilities</SelectItem>
              {utilities.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
            </SelectContent>
          </Select>
          <Badge variant="outline">{filtered.length} results</Badge>
        </div>

        <Card className="rounded-xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-muted-foreground bg-[var(--surface)]">
                  <tr>
                    {["Asset ID","Name","Type","Location","Utility","Health","Status","Risk","Disaster Risk","Flood","Weather","Criticality","Backup","Recovery","Last Inspection","Next Maintenance"].map(h =>
                      <th key={h} className="text-left px-3 py-2.5 font-medium whitespace-nowrap">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a, i) => {
                    const disaster = ["Low","Medium","High","Medium","Low"][i % 5];
                    const flood = ["Low","Elevated","Exposed","Low","Elevated"][i % 5];
                    const weather = ["Low","Elevated","Exposed","Elevated","Low"][i % 5];
                    const criticality = ["Medium","High","Critical","High","Medium"][i % 5];
                    const backup = ["Yes","Partial","Yes","No","Yes"][i % 5];
                    const recoveryPri = (i % 3) + 1;
                    return (
                    <tr key={a.id} className="border-t hover:bg-[var(--surface)]/60">
                      <td className="px-3 py-2.5 font-mono text-xs">{a.id}</td>
                      <td className="px-3 py-2.5 font-medium">{a.name}</td>
                      <td className="px-3 py-2.5">{a.type}</td>
                      <td className="px-3 py-2.5">{a.location}</td>
                      <td className="px-3 py-2.5">{a.utility}</td>
                      <td className="px-3 py-2.5 w-40">
                        <div className="flex items-center gap-2">
                          <Progress value={a.health} className="h-1.5 w-20" />
                          <span className="text-xs tabular-nums">{a.health}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5"><Badge variant="outline" className="text-[10px]">{a.status}</Badge></td>
                      <td className="px-3 py-2.5"><Badge variant="outline" className={`text-[10px] ${riskColor[a.risk]}`}>{a.risk}</Badge></td>
                      <td className="px-3 py-2.5"><Badge variant="outline" className={`text-[10px] ${riskColor[disaster] ?? ""}`}>{disaster}</Badge></td>
                      <td className="px-3 py-2.5 text-xs">{flood}</td>
                      <td className="px-3 py-2.5 text-xs">{weather}</td>
                      <td className="px-3 py-2.5 text-xs">{criticality}</td>
                      <td className="px-3 py-2.5 text-xs">{backup}</td>
                      <td className="px-3 py-2.5 text-xs">P{recoveryPri}</td>
                      <td className="px-3 py-2.5 text-muted-foreground">{a.lastInspection}</td>
                      <td className="px-3 py-2.5 text-muted-foreground">{a.nextMaintenance}</td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
