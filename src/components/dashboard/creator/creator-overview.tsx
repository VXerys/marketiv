"use client";

import { useRef } from "react";
import { AlertTriangle, CircleCheckBig, Compass, Handshake, Sparkles } from "lucide-react";
import { useGSAP } from "@/lib/gsap";
import type { CreatorAlertItem, CreatorKpiMetric, CreatorSubmissionItem } from "@/types/creator";
import { animateCreatorOverview } from "./creator-overview.animations";

interface CreatorOverviewProps {
  metrics: CreatorKpiMetric[];
  alerts: CreatorAlertItem[];
  recommendedActions: string[];
  submissions: CreatorSubmissionItem[];
}

const alertToneClassMap: Record<CreatorAlertItem["severity"], string> = {
  critical: "border-[#f6d2d2] bg-[#fff5f5] text-[#912525]",
  warning: "border-[#f2e3bf] bg-[#fff9ee] text-[#8c5a08]",
  info: "border-[#d7e5ff] bg-[#f3f7ff] text-[#1e4c9a]",
  success: "border-[#d5eddc] bg-[#f1fbf3] text-[#1d6b3c]",
};

function getSubmissionSlaText(status: CreatorSubmissionItem["status"]): string {
  if (status === "disputed") {
    return "Urgent 24h";
  }

  if (status === "revision") {
    return "Revisi < 12h";
  }

  if (status === "submitted") {
    return "Review Batch";
  }

  return "Stable";
}

export function CreatorOverview({ metrics, alerts, recommendedActions, submissions }: CreatorOverviewProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const slaItems = submissions.filter((item) => item.status === "submitted" || item.status === "revision" || item.status === "disputed").slice(0, 4);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (rootRef.current) {
        return animateCreatorOverview(rootRef.current);
      }
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="space-y-6 text-foreground">
      <section className="creator-overview-head umkm-panel rounded-2xl border border-border p-6 md:p-8">
        <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">CREATOR CONTROL CENTER</p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">Dashboard Content Creator</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground-muted md:text-base">
          Atur pipeline job, pantau status submission, dan jaga arus pendapatan tetap stabil lewat dashboard creator yang berorientasi aksi harian.
        </p>
      </section>

      <section className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.id}
            className="creator-overview-kpi creator-hover-card umkm-panel flex h-full flex-col rounded-2xl border border-border p-5 transition-[transform,box-shadow,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_22px_34px_-30px_rgba(15,23,42,0.45)]"
          >
            <p className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">{metric.label}</p>
            <p className="mt-2 font-heading text-3xl tracking-tight">{metric.value}</p>
            <p className="mt-auto pt-2 text-xs text-foreground-muted">{metric.delta}</p>
          </article>
        ))}
      </section>

      <section className="grid items-stretch gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="creator-overview-block umkm-panel rounded-2xl border border-border p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-3xl tracking-tight">Alert Center</h2>
            <span className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">CREATOR OPS</span>
          </div>
          <div className="mt-4 space-y-3">
            {alerts.map((alert) => (
              <article
                key={alert.id}
                className={`rounded-xl border px-4 py-3 transition-[transform,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_14px_24px_-22px_rgba(15,23,42,0.5)] ${alertToneClassMap[alert.severity]}`}
              >
                <p className="font-label text-[10px] tracking-[0.14em]">{alert.title}</p>
                <p className="mt-1 text-sm leading-relaxed">{alert.description}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="creator-overview-block umkm-panel rounded-2xl border border-border p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-3xl tracking-tight">Next Action</h2>
            <span className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">DAILY PLAN</span>
          </div>
          <ol className="mt-4 space-y-3">
            {recommendedActions.map((action, index) => (
              <li
                key={action}
                className="rounded-xl border border-border bg-surface/50 px-4 py-3 transition-[background-color,border-color] duration-200 hover:border-border-strong hover:bg-surface"
              >
                <p className="font-label text-[10px] tracking-[0.14em] text-foreground-subtle">STEP {index + 1}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{action}</p>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="creator-overview-block umkm-panel rounded-2xl border border-border p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-3xl tracking-tight">SLA Tracker</h2>
          <span className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">SUBMISSION WINDOW</span>
        </div>

        {slaItems.length === 0 ? (
          <div className="mt-4 rounded-xl border border-border bg-[#f1fbf3] px-4 py-3 text-sm text-[#1d6b3c]">
            Tidak ada antrian SLA aktif. Kondisi submission stabil.
          </div>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {slaItems.map((item) => (
              <article
                key={item.id}
                className="creator-hover-card rounded-xl border border-border bg-surface/45 px-4 py-3 transition-[transform,box-shadow,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-border-strong motion-safe:hover:shadow-[0_18px_28px_-26px_rgba(15,23,42,0.5)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-label text-[10px] tracking-[0.14em] text-foreground-subtle">{item.id}</p>
                  <span className="text-xs text-foreground-muted">{getSubmissionSlaText(item.status)}</span>
                </div>
                <h3 className="mt-1 text-sm font-medium text-foreground">{item.campaignTitle}</h3>
                <p className="mt-1 text-xs text-foreground-muted">{item.brandName}</p>
              </article>
            ))}
          </div>
        )}

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-border bg-[#eef4ff] px-4 py-3 text-[#1d4ed8] transition-transform duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5">
            <div className="flex items-center gap-2">
              <Compass className="size-4" aria-hidden="true" />
              <p className="font-label text-[10px] tracking-[0.14em]">Focus Job</p>
            </div>
            <p className="mt-1 text-sm">Pilih job dengan kompetisi rendah terlebih dahulu.</p>
          </article>
          <article className="rounded-xl border border-border bg-[#fff9ee] px-4 py-3 text-[#9c6b00] transition-transform duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4" aria-hidden="true" />
              <p className="font-label text-[10px] tracking-[0.14em]">Risk Control</p>
            </div>
            <p className="mt-1 text-sm">Selesaikan revisi/dispute sebelum ambil job baru.</p>
          </article>
          <article className="rounded-xl border border-border bg-[#eefaf2] px-4 py-3 text-[#247a52] transition-transform duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5">
            <div className="flex items-center gap-2">
              <CircleCheckBig className="size-4" aria-hidden="true" />
              <p className="font-label text-[10px] tracking-[0.14em]">Consistency</p>
            </div>
            <p className="mt-1 text-sm">Jaga completion rate untuk naikkan ranking creator.</p>
          </article>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-foreground-subtle">
          <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-1 transition-colors duration-200 hover:border-border-strong hover:text-foreground">
            <Handshake className="size-3" aria-hidden="true" />
            Brand-ready
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-1 transition-colors duration-200 hover:border-border-strong hover:text-foreground">
            <Sparkles className="size-3" aria-hidden="true" />
            Creator growth
          </span>
        </div>
      </section>
    </div>
  );
}
