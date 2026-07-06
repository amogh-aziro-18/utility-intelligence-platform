import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · Aziro" }] }),
  component: SettingsPage,
});

function Row({ title, desc, children }: any) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b last:border-0">
      <div><div className="text-sm font-medium">{title}</div><div className="text-xs text-muted-foreground">{desc}</div></div>
      <div>{children}</div>
    </div>
  );
}

function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Organization, users, permissions and preferences" />
      <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="rounded-xl">
          <CardHeader><CardTitle className="text-sm">Organization</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-1.5"><Label>Organization Name</Label><Input defaultValue="Jacobs · NICDC Corridor Operations" /></div>
            <div className="grid gap-1.5"><Label>Region</Label><Input defaultValue="Western Industrial Corridor" /></div>
            <div className="grid gap-1.5"><Label>Time Zone</Label><Input defaultValue="Asia/Kolkata (UTC+5:30)" /></div>
            <Button className="bg-[var(--navy)] text-primary-foreground hover:bg-[var(--navy)]/90">Save</Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader><CardTitle className="text-sm">Theme & Preferences</CardTitle></CardHeader>
          <CardContent>
            <Row title="Compact density" desc="Tighter spacing across tables"><Switch /></Row>
            <Row title="Live data refresh" desc="Auto-refresh dashboards every 30s"><Switch defaultChecked /></Row>
            <Row title="High-contrast mode" desc="For control-room displays"><Switch /></Row>
            <Row title="Default landing page" desc="Open Operations Command Center on login"><Switch defaultChecked /></Row>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader><CardTitle className="text-sm">Notifications</CardTitle></CardHeader>
          <CardContent>
            <Row title="High-priority alerts" desc="Email + SMS for severity High"><Switch defaultChecked /></Row>
            <Row title="SLA breach warnings" desc="In-app + email when SLA at risk"><Switch defaultChecked /></Row>
            <Row title="AI recommendations digest" desc="Daily 08:00 summary"><Switch /></Row>
            <Row title="Compliance findings" desc="Notify auditors immediately"><Switch defaultChecked /></Row>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader><CardTitle className="text-sm">Users & Permissions</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[
              { u: "j.cole@jacobs.com", r: "Operations Director" },
              { u: "k.iyer@nicdc.in", r: "Field Supervisor" },
              { u: "a.singh@ops.aziro.com", r: "Technician" },
              { u: "compliance@aziro.com", r: "Compliance Auditor" },
            ].map(u => (
              <div key={u.u} className="flex items-center justify-between rounded-md border p-2.5">
                <div className="text-sm font-mono">{u.u}</div>
                <Badge variant="outline" className="text-[10px]">{u.r}</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">Invite user</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
