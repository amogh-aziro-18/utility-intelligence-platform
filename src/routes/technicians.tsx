import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { technicians } from "@/lib/mock-data";
import { emergencyTeams } from "@/lib/disaster-data";
import { Siren } from "lucide-react";

export const Route = createFileRoute("/technicians")({
  head: () => ({ meta: [{ title: "Technicians · Aziro" }] }),
  component: TechniciansPage,
});

const status: Record<string, string> = {
  Available: "border-[color:var(--success)] text-[color:var(--success)]",
  Busy: "border-[color:var(--warning)] text-[color:var(--warning-foreground)]",
  "On Site": "border-[color:var(--info)] text-[color:var(--info)]",
  Emergency: "border-destructive text-destructive",
};

function TechniciansPage() {
  const expanded = [...technicians, ...technicians.map(t => ({...t, name: t.name + " Jr."}))];
  return (
    <>
      <PageHeader title="Technicians" description="Field force availability, dispatch and travel ETA" />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { l: "Available", v: 142, c: "var(--success)" },
            { l: "Busy", v: 38, c: "var(--warning)" },
            { l: "On Site", v: 27, c: "var(--info)" },
            { l: "Emergency Team", v: 6, c: "var(--destructive)" },
          ].map(s => (
            <Card key={s.l} className="rounded-xl"><CardContent className="p-4">
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: s.c }} /><span className="text-xs text-muted-foreground">{s.l}</span></div>
              <div className="text-2xl font-semibold mt-1">{s.v}</div>
            </CardContent></Card>
          ))}
        </div>
        <Card className="rounded-xl"><CardHeader><CardTitle className="text-sm">Field Force</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {expanded.map((t, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="h-11 w-11 rounded-full bg-[var(--navy)] grid place-items-center text-primary-foreground text-sm font-semibold">{t.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between"><div className="text-sm font-medium truncate">{t.name}</div><Badge variant="outline" className={`text-[10px] ${status[t.status]}`}>{t.status}</Badge></div>
                    <div className="text-xs text-muted-foreground truncate">{t.skill}</div>
                    <div className="text-xs text-muted-foreground truncate">Assignment: {t.assignment} {t.eta !== "—" && `· ETA ${t.eta}`}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Siren className="h-4 w-4 text-destructive" />Emergency Response Teams</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              {emergencyTeams.map(t => (
                <div key={t.name} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold truncate">{t.name}</div>
                    <Badge variant="outline" className="text-[10px]">{t.status}</Badge>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{t.type} · {t.crew} crew · {t.vehicles} vehicles</div>
                  <div className="text-[11px] text-muted-foreground">{t.location}{t.eta !== "—" ? ` · ETA ${t.eta}` : ""}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
