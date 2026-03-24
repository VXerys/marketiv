import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { umkmDashboardNav } from "@/data/dashboard-nav";

interface UmkmDashboardLayoutProps {
  children: ReactNode;
}

export default function UmkmDashboardLayout({ children }: UmkmDashboardLayoutProps) {
  return (
    <DashboardShell title="Marketiv Dashboard" roleLabel="UMKM Workspace" navItems={umkmDashboardNav}>
      {children}
    </DashboardShell>
  );
}
