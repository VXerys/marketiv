import type { ReactNode } from "react";
import type { DashboardNavItem } from "@/data/dashboard-nav";
import { DashboardTopTabs } from "./dashboard-top-tabs";

interface DashboardShellProps {
  title: string;
  roleLabel: string;
  navItems: DashboardNavItem[];
  children: ReactNode;
}

export function DashboardShell({ title, roleLabel, navItems, children }: DashboardShellProps) {
  return (
    <div className="dashboard-atmosphere min-h-screen text-foreground">
      <DashboardTopTabs title={title} roleLabel={roleLabel} navItems={navItems} />

      <main className="mx-auto w-full max-w-7xl px-3 pb-8 pt-3 sm:px-4 md:px-8 md:pb-10 md:pt-4">
        <section className="rounded-2xl border border-border bg-background/94 p-4 shadow-[0_10px_30px_hsla(var(--foreground),0.06)] sm:p-5 md:p-8">{children}</section>
      </main>
    </div>
  );
}
