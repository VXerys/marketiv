"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import type { DashboardNavItem } from "@/data/dashboard-nav";
import { gsap } from "@/lib/gsap";

interface DashboardTopTabsProps {
  title: string;
  roleLabel: string;
  navItems: DashboardNavItem[];
}

function getActiveHref(pathname: string, navItems: DashboardNavItem[]): string | null {
  const sorted = [...navItems].sort((a, b) => b.href.length - a.href.length);
  const match = sorted.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
  return match?.href ?? null;
}

export function DashboardTopTabs({ title, roleLabel, navItems }: DashboardTopTabsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement | null>(null);
  const isBrandNavigatingRef = useRef(false);
  const activeHref = getActiveHref(pathname, navItems);

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();

    if (isBrandNavigatingRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !shellRef.current) {
      router.push("/");
      return;
    }

    isBrandNavigatingRef.current = true;

    gsap
      .timeline({ onComplete: () => router.push("/") })
      .to(shellRef.current, { autoAlpha: 0.94, y: -2, duration: 0.14, ease: "power1.out" })
      .to(shellRef.current, { autoAlpha: 0, y: 10, duration: 0.22, ease: "power2.in" });
  };

  return (
    <nav className="px-3 pb-2 pt-3 md:px-8 md:pb-3 md:pt-6" aria-label="Dashboard Navigation">
      <div ref={shellRef} className="mx-auto w-full max-w-7xl rounded-[1.45rem] border border-border/90 bg-background/94 p-2.5 shadow-[0_8px_22px_hsla(var(--foreground),0.08)] backdrop-blur-md sm:p-3">
        <div className="grid gap-2.5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <Link
            href="/"
            aria-label="Go to landing page"
            onClick={handleBrandClick}
            className="group inline-flex min-h-12 items-center rounded-2xl border border-border bg-white px-4 shadow-[inset_0_1px_0_hsla(var(--background),0.92)] transition-[transform,box-shadow,border-color,background-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-border-strong motion-safe:hover:shadow-[inset_0_1px_0_hsla(var(--background),0.95),0_14px_26px_-22px_hsla(var(--foreground),0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="font-heading text-2xl tracking-tight transition-transform duration-300 ease-quart-out motion-safe:group-hover:translate-x-0.5">
              Marketiv
            </span>
          </Link>

          <div className="order-3 overflow-x-auto no-scrollbar lg:order-none">
            <div className="inline-flex min-h-12 w-max items-center gap-1 rounded-2xl border border-border bg-white p-1 shadow-[inset_0_1px_0_hsla(var(--background),0.94),0_2px_8px_hsla(var(--foreground),0.05)]">
              {navItems.map((item) => {
                const active = activeHref === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-10 shrink-0 items-center rounded-xl border px-3 py-2 font-label text-[10px] tracking-[0.16em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-4 ${
                      active
                        ? "border-[#1f2230] bg-[linear-gradient(150deg,#303346,#191b25)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_3px_10px_rgba(20,22,32,0.2)]"
                        : "border-transparent bg-transparent text-foreground-muted hover:border-border hover:bg-background hover:text-foreground hover:shadow-[0_6px_14px_hsla(var(--foreground),0.08)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="order-2 min-h-12 rounded-2xl border border-border bg-white p-1.5 shadow-[inset_0_1px_0_hsla(var(--background),0.96)] lg:order-none">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 lg:w-[360px] lg:flex-nowrap">
              <label className="inline-flex min-h-9 w-full flex-1 items-center gap-2 rounded-xl border border-border bg-white px-3 transition-colors focus-within:border-border-strong lg:w-auto">
                <span aria-hidden="true" className="inline-flex size-4 items-center justify-center text-foreground-subtle">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.2-3.2" />
                  </svg>
                </span>
                <input
                  type="search"
                  placeholder="Search Anything..."
                  className="h-9 w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground-subtle"
                />
              </label>

              <button
                type="button"
                aria-label="Help"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-white text-foreground-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-200 hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9.2 9.4a2.8 2.8 0 0 1 5.4 1c0 1.8-2.2 2.2-2.2 3.6" />
                  <circle cx="12" cy="17.2" r=".8" fill="currentColor" stroke="none" />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Settings"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-white text-foreground-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-200 hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3.2" />
                  <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1 1 0 0 1 0 1.5l-1 1a1 1 0 0 1-1.5 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1 1 0 0 1-1 1h-1.4a1 1 0 0 1-1-1v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1 1 0 0 1-1.5 0l-1-1a1 1 0 0 1 0-1.5l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1 1 0 0 1-1-1v-1.4a1 1 0 0 1 1-1h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1 1 0 0 1 0-1.5l1-1a1 1 0 0 1 1.5 0l.1.1a1 1 0 0 0 1.1.2h0a1 1 0 0 0 .6-.9V4a1 1 0 0 1 1-1h1.4a1 1 0 0 1 1 1v.2a1 1 0 0 0 .6.9h0a1 1 0 0 0 1.1-.2l.1-.1a1 1 0 0 1 1.5 0l1 1a1 1 0 0 1 0 1.5l-.1.1a1 1 0 0 0-.2 1.1v0a1 1 0 0 0 .9.6H20a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1h-.2a1 1 0 0 0-.9.6z" />
                </svg>
              </button>

              <button
                type="button"
                aria-label="User profile"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-[linear-gradient(160deg,#eff7ff,#d3e4f8)] font-label text-[9px] tracking-[0.14em] text-[#1f3f62] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                UM
              </button>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2 lg:hidden">
          <p className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">{title}</p>
          <span className="font-label rounded-full border border-border bg-background px-2 py-1 text-[9px] tracking-[0.14em] text-foreground-muted">{roleLabel}</span>
        </div>
      </div>
    </nav>
  );
}
