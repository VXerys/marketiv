import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { creatorDashboardNav } from "@/data/dashboard-nav";

interface CreatorDashboardLayoutProps {
  children: ReactNode;
}

export default function CreatorDashboardLayout({ children }: CreatorDashboardLayoutProps) {
  return (
    <div className="dashboard-light">
      <DashboardShell title="Marketiv Dashboard" roleLabel="Creator Workspace" navItems={creatorDashboardNav}>
        {children}
      </DashboardShell>
    </div>
  );
}
