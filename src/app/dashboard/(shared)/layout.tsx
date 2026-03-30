import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { sharedDashboardNav } from "@/data/dashboard-nav";

interface SharedDashboardLayoutProps {
  children: ReactNode;
}

export default function SharedDashboardLayout({ children }: SharedDashboardLayoutProps) {
  return (
    <div className="dashboard-light">
      <DashboardShell title="Marketiv Dashboard" roleLabel="Shared Workspace" navItems={sharedDashboardNav}>
        {children}
      </DashboardShell>
    </div>
  );
}
