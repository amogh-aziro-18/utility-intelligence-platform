import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { resilienceReports } from "@/lib/disaster-data";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports · Aziro" }] }),
  component: ReportsPage,
});

const baseReports = [
  { name: "Weekly Operations Summary", cat: "Executive", period: "Week 26", size: "1.2 MB" },
  { name: "Monthly Performance Review", cat: "Executive", period: "Jun 2026", size: "3.4 MB" },
  { name: "Utility Performance Report", cat: "Operations", period: "Jun 2026", size: "2.1 MB" },
  { name: "Energy Consumption Report", cat: "Sustainability", period: "Q2 2026", size: "1.8 MB" },
  { name: "Maintenance & Reliability Report", cat: "Operations", period: "Jun 2026", size: "2.6 MB" },
  { name: "Compliance & Audit Report", cat: "Compliance", period: "Q2 2026", size: "4.0 MB" },
  { name: "Demand Forecast Report", cat: "AI Intelligence", period: "Jul 2026", size: "1.1 MB" },
  { name: "Cybersecurity Posture", cat: "Compliance", period: "Jun 2026", size: "1.5 MB" },
];

const reports = [...baseReports, ...resilienceReports];

function ReportsPage() {
  return (
    <>
      <PageHeader title="Executive Reports" description="Pre-built and scheduled reports across the platform" />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {reports.map(r => (
          <Card key={r.name} className="rounded-xl">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--accent)]"><FileText className="h-5 w-5 text-[var(--navy)]" /></div>
                <div>
                  <CardTitle className="text-sm">{r.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.period} · {r.size}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px]">{r.cat}</Badge>
            </CardHeader>
            <CardContent className="flex justify-end pt-0">
              <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1.5" />Download PDF</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
