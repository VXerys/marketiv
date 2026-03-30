"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import type { UmkmCampaignRow, UmkmKpiMetric, UmkmQuickAction } from "@/types/dashboard";
import { animateUmkmOverview } from "./umkm-overview.animations";

interface UmkmOverviewProps {
  metrics: UmkmKpiMetric[];
  quickActions: UmkmQuickAction[];
  campaigns: UmkmCampaignRow[];
}

const statusToneMap: Record<UmkmCampaignRow["status"], string> = {
  draft: "text-foreground-subtle",
  aktif: "text-foreground",
  menunggu_validasi: "text-foreground-muted",
  selesai: "text-foreground-subtle",
};

export function UmkmOverview({ metrics, quickActions, campaigns }: UmkmOverviewProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (rootRef.current) {
        return animateUmkmOverview(rootRef.current);
      }
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="umkm-dashboard-space space-y-8 text-foreground">
      <section className="umkm-overview-head umkm-panel p-6 md:p-8">
        <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">UMKM CONTROL CENTER</p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">Dashboard UMKM</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground-muted md:text-base">
          Pantau campaign berbasis views, kontrol escrow, dan evaluasi performa dengan alur operasional yang fokus ke kebutuhan UMKM. Mode Campaign tidak memiliki fitur chat, seluruh eksekusi berjalan melalui brief dan validasi sistem.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.id} className="umkm-overview-kpi umkm-panel umkm-hover-card border border-border p-5">
            <p className="font-label text-[10px] tracking-[0.17em] text-foreground-subtle">{metric.label}</p>
            <p className="mt-2 font-heading text-3xl tracking-tight">{metric.value}</p>
            <p className="mt-2 text-xs text-foreground-muted">{metric.delta}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {quickActions.map((action) => (
          <article key={action.id} className="umkm-overview-action umkm-panel umkm-hover-card border border-border p-5">
            <h2 className="font-heading text-2xl tracking-tight">{action.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{action.description}</p>
            <Link
              href={action.href}
              className="mt-5 inline-flex min-h-10 items-center justify-center border border-border-strong px-4 py-2 font-label text-[10px] tracking-[0.14em] text-foreground transition-colors hover:bg-surface"
            >
              BUKA MODUL
            </Link>
          </article>
        ))}
      </section>

      <section className="umkm-panel border border-border p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-3xl tracking-tight">Snapshot Campaign</h2>
          <span className="font-label text-[10px] tracking-[0.17em] text-foreground-subtle">3 TERBARU</span>
        </div>

        <div className="mt-4 space-y-3">
          {campaigns.map((campaign) => (
            <article key={campaign.id} className="umkm-overview-row umkm-hover-card grid gap-3 border border-border bg-surface/55 p-4 md:grid-cols-[1.4fr_auto_auto_auto] md:items-center">
              <div>
                <h3 className="font-label text-[11px] tracking-[0.14em] text-foreground">{campaign.title}</h3>
                <p className="mt-1 text-xs text-foreground-muted">Niche: {campaign.niche}</p>
              </div>
              <p className="text-xs text-foreground-muted">Budget: {campaign.budget}</p>
              <p className="text-xs text-foreground-muted">Kuota: {campaign.quota}</p>
              <p className={`font-label text-[10px] tracking-[0.12em] uppercase ${statusToneMap[campaign.status]}`}>
                {campaign.status.replace("_", " ")}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
