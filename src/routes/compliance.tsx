import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, ShieldAlert, FileCheck2, Lock, Users2, Building2, Siren } from "lucide-react";
import { resilienceStandards, drillStatus } from "@/lib/disaster-data";

export const Route = createFileRoute("/compliance")({
  head: () => ({ meta: [{ title: "Compliance · Aziro" }] }),
  component: CompliancePage,
});

const standards = [
  { code: "IS 16819", desc: "Smart City Infrastructure", status: "Compliant", score: 96 },
  { code: "IS 14543", desc: "Electrical Safety", status: "Compliant", score: 94 },
  { code: "BIS 17428", desc: "Indoor Air Quality", status: "Action Needed", score: 78 },
  { code: "IS 18001", desc: "Occupational H&S", status: "Compliant", score: 92 },
  { code: "ISO 27001", desc: "Information Security", status: "Compliant", score: 89 },
  { code: "ISO 50001", desc: "Energy Management", status: "Compliant", score: 91 },
];

const audit = [
  { t: "08:42", u: "j.cole@jacobs.com", a: "Approved WO-5512 dispatch" },
  { t: "08:18", u: "ops-bot", a: "Auto-created alert A-1042 (Substation S-09)" },
  { t: "07:55", u: "k.iyer@nicdc.in", a: "Updated SLA threshold for Water utility" },
  { t: "07:30", u: "admin", a: "Granted role 'Field Supervisor' to a.singh" },
  { t: "06:12", u: "compliance-bot", a: "Generated Q2 audit report" },
];

function CompliancePage() {
  return (
    <>
      <PageHeader title="Compliance & Governance" description="Standards, audits, security and infrastructure governance" />
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { l: "Compliant Standards", v: "14 / 16", i: ShieldCheck, c: "var(--success)" },
            { l: "Open Findings", v: 3, i: ShieldAlert, c: "var(--warning)" },
            { l: "Cyber Posture", v: "A-", i: Lock, c: "var(--info)" },
            { l: "Active Roles", v: 12, i: Users2, c: "var(--navy)" },
          ].map(k => (
            <Card key={k.l} className="rounded-xl"><CardContent className="p-4 flex items-center justify-between">
              <div><div className="text-xs text-muted-foreground">{k.l}</div><div className="text-2xl font-semibold mt-1">{k.v}</div></div>
              <div className="grid h-10 w-10 place-items-center rounded-md" style={{ background: "var(--accent)" }}><k.i className="h-5 w-5" style={{ color: k.c }} /></div>
            </CardContent></Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><FileCheck2 className="h-4 w-4 text-[var(--navy)]" />IS / BIS / ISO Standards</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {standards.map(s => (
                <div key={s.code} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div><div className="text-sm font-medium">{s.code} <span className="text-xs text-muted-foreground font-normal">· {s.desc}</span></div></div>
                    <Badge variant="outline" className={`text-[10px] ${s.status === "Compliant" ? "border-[color:var(--success)] text-[color:var(--success)]" : "border-[color:var(--warning)] text-[color:var(--warning-foreground)]"}`}>{s.status}</Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2"><Progress value={s.score} className="h-1.5" /><span className="text-xs tabular-nums w-10 text-right">{s.score}%</span></div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="rounded-xl">
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Lock className="h-4 w-4 text-[var(--navy)]" />Cybersecurity Status</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {[
                  { l: "Threats Blocked (24h)", v: 1284 },
                  { l: "Patched Endpoints", v: "98.4%" },
                  { l: "MFA Coverage", v: "100%" },
                  { l: "Critical CVEs", v: 0 },
                ].map(s => (<div key={s.l} className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">{s.l}</div><div className="text-lg font-semibold mt-1">{s.v}</div></div>))}
              </CardContent>
            </Card>
            <Card className="rounded-xl">
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Users2 className="h-4 w-4 text-[var(--navy)]" />Role-Based Access</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[
                  { r: "Operations Director", users: 4, scope: "Full" },
                  { r: "Field Supervisor", users: 18, scope: "Region" },
                  { r: "Technician", users: 142, scope: "Site" },
                  { r: "Compliance Auditor", users: 6, scope: "Read-only" },
                  { r: "Analyst", users: 12, scope: "Analytics" },
                ].map(r => (
                  <div key={r.r} className="flex items-center justify-between rounded-md border p-2.5">
                    <div className="text-sm">{r.r}</div>
                    <div className="text-xs text-muted-foreground">{r.users} users · {r.scope}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="rounded-xl">
          <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Building2 className="h-4 w-4 text-[var(--navy)]" />Audit Trail</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground"><tr className="border-b"><th className="text-left py-2 pr-3">Time</th><th className="text-left py-2 pr-3">Actor</th><th className="text-left py-2 pr-3">Action</th></tr></thead>
              <tbody>
                {audit.map((a,i) => (<tr key={i} className="border-b last:border-0"><td className="py-2 pr-3 tabular-nums text-muted-foreground">{a.t}</td><td className="py-2 pr-3 font-mono text-xs">{a.u}</td><td className="py-2 pr-3">{a.a}</td></tr>))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Siren className="h-4 w-4 text-destructive" />Business Continuity & Disaster Standards</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {resilienceStandards.map(s => (
                <div key={s.code} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{s.code} <span className="text-xs text-muted-foreground font-normal">· {s.desc}</span></div>
                    <Badge variant="outline" className={`text-[10px] ${s.status === "Compliant" ? "border-[color:var(--success)] text-[color:var(--success)]" : "border-[color:var(--warning)] text-[color:var(--warning-foreground)]"}`}>{s.status}</Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2"><Progress value={s.score} className="h-1.5" /><span className="text-xs tabular-nums w-10 text-right">{s.score}%</span></div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--navy)]" />Emergency Drill Status</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {drillStatus.map(d => (
                <div key={d.name} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{d.name}</div>
                    <Badge variant="outline" className={`text-[10px] ${d.result === "Passed" ? "border-[color:var(--success)] text-[color:var(--success)]" : "border-[color:var(--warning)] text-[color:var(--warning-foreground)]"}`}>{d.result}</Badge>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{d.date}</span>
                    <span className="tabular-nums">Score {d.score}/100</span>
                  </div>
                  <Progress value={d.score} className="h-1.5 mt-2" />
                </div>
              ))}
              <div className="rounded-lg border p-3 bg-[var(--surface)]">
                <div className="text-xs font-medium">Operational Readiness Score</div>
                <div className="text-2xl font-semibold mt-1">87 / 100</div>
                <Progress value={87} className="h-1.5 mt-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
