import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { sharedDashboardNav } from "@/data/dashboard-nav";

interface SharedDashboardLayoutProps {
  children: ReactNode;
}

export default function SharedDashboardLayout({ children }: SharedDashboardLayoutProps) {
  return (
    <DashboardShell title="Marketiv Dashboard" roleLabel="Shared Workspace" navItems={sharedDashboardNav}>
      {children}
    </DashboardShell>
  );
}
