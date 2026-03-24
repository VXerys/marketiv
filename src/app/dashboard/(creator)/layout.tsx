import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { creatorDashboardNav } from "@/data/dashboard-nav";

interface CreatorDashboardLayoutProps {
  children: ReactNode;
}

export default function CreatorDashboardLayout({ children }: CreatorDashboardLayoutProps) {
  return (
    <DashboardShell title="Marketiv Dashboard" roleLabel="Creator Workspace" navItems={creatorDashboardNav}>
      {children}
    </DashboardShell>
  );
}
