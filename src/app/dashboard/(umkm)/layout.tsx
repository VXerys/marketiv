import type { ReactNode } from "react";
import { RoleMismatchState } from "@/components/dashboard/role-mismatch-state";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { umkmDashboardNav } from "@/data/dashboard-nav";
import { getDashboardAccess } from "@/lib/auth/getDashboardAccess";

interface UmkmDashboardLayoutProps {
  children: ReactNode;
}

export default async function UmkmDashboardLayout({ children }: UmkmDashboardLayoutProps) {
  const access = await getDashboardAccess("umkm");
  const guestNavItems = umkmDashboardNav.map((item) => {
    if (item.href === "/dashboard/umkm") {
      return item;
    }

    return {
      ...item,
      label: `${item.label} (Login)`,
    };
  });

  if (access.kind === "mismatch" && access.currentRole && access.targetHref) {
    return (
      <div className="dashboard-light">
        <DashboardShell title="Marketiv Dashboard" roleLabel="Role Access Guard" navItems={umkmDashboardNav}>
          <RoleMismatchState currentRole={access.currentRole} targetHref={access.targetHref} />
        </DashboardShell>
      </div>
    );
  }

  if (access.kind === "guest") {
    return (
      <div className="dashboard-light">
        <DashboardShell title="Marketiv Dashboard" roleLabel="Preview UMKM Workspace" navItems={guestNavItems}>
          <div className="mb-6 border border-border-strong bg-surface px-4 py-3 text-sm text-foreground-muted md:px-5 md:py-3.5">
            Mode preview aktif. Halaman Overview tetap terbuka, sedangkan modul operasional tertentu memerlukan login UMKM.
          </div>
          {children}
        </DashboardShell>
      </div>
    );
  }

  return (
    <div className="dashboard-light">
      <DashboardShell title="Marketiv Dashboard" roleLabel="UMKM Workspace" navItems={umkmDashboardNav}>
        {children}
      </DashboardShell>
    </div>
  );
}
