import Link from "next/link";
import type { ReactNode } from "react";
import type { DashboardNavItem } from "@/data/dashboard-nav";

interface DashboardShellProps {
  title: string;
  roleLabel: string;
  navItems: DashboardNavItem[];
  children: ReactNode;
}

export function DashboardShell({ title, roleLabel, navItems, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-6 py-4 md:px-10">
        <div className="flex items-center justify-between">
          <span className="font-heading text-3xl tracking-tight">{title}</span>
          <span className="font-label text-xs text-foreground-muted">{roleLabel}</span>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-6 py-8 md:grid-cols-[250px_1fr] md:px-10">
        <aside className="border border-border bg-surface p-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-label border border-transparent px-3 py-2 text-xs text-foreground-muted transition-colors hover:border-border hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="border border-border bg-background p-6 md:p-8">{children}</section>
      </div>
    </div>
  );
}
