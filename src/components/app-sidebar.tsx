import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Boxes, Zap, Map, BrainCircuit, Activity,
  HardHat, Network, FileBarChart2, ShieldCheck, Settings as SettingsIcon,
  ShieldAlert, CloudRain, Siren,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Assets", url: "/assets", icon: Boxes },
  { title: "Utilities", url: "/utilities", icon: Zap },
  { title: "GIS & Maps", url: "/gis", icon: Map },
  { title: "AI Intelligence", url: "/ai", icon: BrainCircuit },
  { title: "Operations", url: "/operations", icon: Activity },
  { title: "Technicians", url: "/technicians", icon: HardHat },
  { title: "Digital Twin", url: "/digital-twin", icon: Network },
  { title: "Reports", url: "/reports", icon: FileBarChart2 },
  { title: "Compliance", url: "/compliance", icon: ShieldCheck },
  { title: "Settings", url: "/settings", icon: SettingsIcon },
];

const resilienceItems = [
  { title: "Resilience", url: "/resilience", icon: ShieldAlert },
  { title: "Weather Intel", url: "/weather", icon: CloudRain },
  { title: "Emergency Response", url: "/emergency", icon: Siren },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--teal)] text-[var(--navy)] font-bold">A</div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-semibold text-sidebar-foreground">Aziro</div>
              <div className="text-[11px] text-sidebar-foreground/60">Super Utility Intelligence</div>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Platform</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Resilience</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {resilienceItems.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
