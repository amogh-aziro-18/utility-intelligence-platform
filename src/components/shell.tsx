import type { ReactNode } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 border-b bg-[var(--surface)]/40 px-6 py-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-3">
      <SidebarTrigger />
      <div className="hidden md:flex h-9 items-center gap-2 rounded-md border bg-[var(--surface)] px-3 w-80">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input className="h-7 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" placeholder="Search assets, sites, work orders…" />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <Badge variant="outline" className="border-[var(--teal)] text-[var(--navy)] bg-[var(--accent)]">Live</Badge>
        <button className="relative rounded-md p-2 hover:bg-muted" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
        </button>
        <div className="flex items-center gap-2 rounded-md border px-2 py-1">
          <div className="h-7 w-7 rounded-full bg-[var(--navy)] text-primary-foreground grid place-items-center text-xs font-semibold">JC</div>
          <div className="hidden md:block text-xs leading-tight">
            <div className="font-medium">Jacobs Control Center</div>
            <div className="text-muted-foreground">Operations Director</div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}

export function Section({ title, description, action, children }: { title: string; description?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">{title}</h2>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
