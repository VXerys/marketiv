"use client";

import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, ClipboardCheck, Clock3, Radar, ShieldCheck, Siren, Sparkles, Target } from "lucide-react";
import { useGSAP } from "@/lib/gsap";
import type { UmkmCampaignRow, UmkmEscrowOrderItem, UmkmFraudQueueItem, UmkmKpiMetric, UmkmQuickAction } from "@/types/dashboard";
import { animateUmkmOverview } from "./umkm-overview.animations";

interface UmkmOverviewProps {
  metrics: UmkmKpiMetric[];
  quickActions: UmkmQuickAction[];
  campaigns: UmkmCampaignRow[];
  escrowOrders: UmkmEscrowOrderItem[];
  fraudQueue: UmkmFraudQueueItem[];
}

const statusToneMap: Record<UmkmCampaignRow["status"], string> = {
  draft: "text-foreground-subtle",
  aktif: "text-foreground",
  menunggu_validasi: "text-foreground-muted",
  selesai: "text-foreground-subtle",
};

const quickActionIconMap: Record<string, LucideIcon> = {
  "create-campaign": Target,
  "review-orders": ClipboardCheck,
  "open-analytics": Radar,
};

const pulseItems = [
  {
    id: "pulse-campaign",
    label: "Pulse Campaign",
    valueKey: "activeCount",
    note: "Campaign aktif yang sedang menyerap budget dan views.",
    glowClass: "from-[#f0f7ff] to-white",
  },
  {
    id: "need-validation",
    label: "Perlu Validasi",
    valueKey: "pendingValidationCount",
    note: "Campaign yang butuh perhatian agar rilis escrow tidak tertunda.",
    glowClass: "from-[#fff8ef] to-white",
  },
  {
    id: "draft-backlog",
    label: "Draft Backlog",
    valueKey: "draftCount",
    note: "Draft campaign yang siap diprioritaskan ke wizard Campaign Brief.",
    glowClass: "from-[#f5f3ff] to-white",
  },
] as const;

function parseQuotaRatio(quota: string): number {
  const matched = quota.match(/(\d+)\s*\/?\s*(\d+)/);
  if (!matched) {
    return 0;
  }

  const current = Number(matched[1]);
  const target = Number(matched[2]);
  if (!Number.isFinite(current) || !Number.isFinite(target) || target <= 0) {
    return 0;
  }

  return Math.min(1, Math.max(0, current / target));
}

function getCampaignHealth(campaign: UmkmCampaignRow): {
  score: number;
  label: "Healthy" | "Watch" | "Risk";
  className: string;
} {
  const statusBaseMap: Record<UmkmCampaignRow["status"], number> = {
    aktif: 74,
    menunggu_validasi: 56,
    draft: 42,
    selesai: 86,
  };

  const quotaRatio = parseQuotaRatio(campaign.quota);
  const score = Math.round(statusBaseMap[campaign.status] * 0.72 + quotaRatio * 100 * 0.28);

  if (score >= 75) {
    return { score, label: "Healthy", className: "bg-[#eefaf2] text-[#247a52]" };
  }

  if (score >= 55) {
    return { score, label: "Watch", className: "bg-[#fff4dc] text-[#9c6b00]" };
  }

  return { score, label: "Risk", className: "bg-[#ffeaea] text-[#b63939]" };
}

export function UmkmOverview({ metrics, quickActions, campaigns, escrowOrders, fraudQueue }: UmkmOverviewProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const activeCount = campaigns.filter((campaign) => campaign.status === "aktif").length;
  const pendingValidationCount = campaigns.filter((campaign) => campaign.status === "menunggu_validasi").length;
  const draftCount = campaigns.filter((campaign) => campaign.status === "draft").length;
  const fraudReviewCount = fraudQueue.filter((item) => item.state === "review").length;
  const disputedOrderCount = escrowOrders.filter((order) => order.submissionStatus === "disputed").length;
  const submittedOrderCount = escrowOrders.filter((order) => order.submissionStatus === "submitted").length;

  const alerts = [
    {
      id: "fraud-review",
      title: "Anomali views perlu review",
      description: `${fraudReviewCount} campaign terdeteksi pola trafik tidak normal dan butuh verifikasi manual.`,
      tone: "critical" as const,
      visible: fraudReviewCount > 0,
    },
    {
      id: "disputed-submission",
      title: "Submission disputed butuh keputusan",
      description: `${disputedOrderCount} order sedang sengketa. Prioritaskan klarifikasi agar escrow tidak tertahan lama.`,
      tone: "warning" as const,
      visible: disputedOrderCount > 0,
    },
    {
      id: "submitted-queue",
      title: "Antrian validasi bertambah",
      description: `${submittedOrderCount} submission menunggu validasi. Pertahankan SLA review agar release dana tetap on-time.`,
      tone: "info" as const,
      visible: submittedOrderCount > 0,
    },
    {
      id: "healthy-state",
      title: "Operasional stabil",
      description: "Tidak ada anomali kritis saat ini. Fokuskan energi tim ke optimasi campaign aktif.",
      tone: "success" as const,
      visible: fraudReviewCount === 0 && disputedOrderCount === 0 && submittedOrderCount < 2,
    },
  ].filter((item) => item.visible);

  const recommendedActions = [
    `Tuntaskan ${Math.max(fraudReviewCount, disputedOrderCount)} kasus paling berisiko sebelum cut-off hari ini agar dana escrow tidak menumpuk.`,
    `Jadwalkan sesi validasi batch untuk ${submittedOrderCount} submission agar release dana tetap on-time.`,
    `Dorong ${draftCount} draft campaign menjadi brief final jika kapasitas kreator minggu ini masih tersedia.`,
  ];

  const alertToneClassMap: Record<(typeof alerts)[number]["tone"], string> = {
    critical: "border-[#f6d2d2] bg-[#fff5f5] text-[#912525]",
    warning: "border-[#f2e3bf] bg-[#fff9ee] text-[#8c5a08]",
    info: "border-[#d7e5ff] bg-[#f3f7ff] text-[#1e4c9a]",
    success: "border-[#d5eddc] bg-[#f1fbf3] text-[#1d6b3c]",
  };

  const alertToneIconMap: Record<(typeof alerts)[number]["tone"], LucideIcon> = {
    critical: Siren,
    warning: AlertTriangle,
    info: Radar,
    success: Sparkles,
  };

  const pulseValueMap = {
    activeCount,
    pendingValidationCount,
    draftCount,
  } as const;

  const slaItems = escrowOrders
    .filter((order) => order.submissionStatus === "submitted" || order.submissionStatus === "disputed")
    .slice(0, 4)
    .map((order) => {
      const priority = order.submissionStatus === "disputed" ? "tinggi" : "normal";
      return {
        id: order.id,
        title: order.campaignTitle,
        assignee: order.creatorHandle,
        state: order.submissionStatus,
        priority,
      };
    });

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
      <section className="umkm-overview-head umkm-panel rounded-2xl border border-border p-6 md:p-8">
        <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">UMKM CONTROL CENTER</p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">Dashboard UMKM</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground-muted md:text-base">
          Pantau campaign berbasis views, kontrol escrow, dan evaluasi performa dengan alur operasional yang fokus ke kebutuhan UMKM. Mode Campaign tidak memiliki fitur chat, seluruh eksekusi berjalan melalui brief dan validasi sistem.
        </p>
      </section>

      <section className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.id} className="umkm-overview-kpi umkm-panel umkm-hover-card flex h-full flex-col rounded-2xl border border-border p-5">
            <p className="font-label text-[10px] tracking-[0.17em] text-foreground-subtle">{metric.label}</p>
            <p className="mt-2 font-heading text-3xl tracking-tight">{metric.value}</p>
            <p className="mt-auto pt-2 text-xs text-foreground-muted">{metric.delta}</p>
          </article>
        ))}
      </section>

      <section className="umkm-panel rounded-2xl border border-border p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-3xl tracking-tight">Prioritas Operasional Hari Ini</h2>
          <span className="font-label text-[10px] tracking-[0.17em] text-foreground-subtle">NAVBAR-DRIVEN FLOW</span>
        </div>
        <p className="mt-2 text-sm text-foreground-muted">Navigasi modul utama sudah ditangani tab di navbar. Blok ini fokus menampilkan prioritas kerja, bukan tombol route tambahan.</p>

        <div className="mt-4 grid items-stretch gap-4 lg:grid-cols-3">
          {quickActions.map((action) => (
            <article
              key={action.id}
              className="umkm-overview-action umkm-panel umkm-hover-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-border p-5"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#eef4ff] to-transparent opacity-70" />
              <div className="relative flex items-start justify-between gap-2">
                <h3 className="font-heading text-2xl tracking-tight">{action.title}</h3>
                <span className="font-label rounded-full border border-border bg-background px-2 py-1 text-[9px] tracking-[0.14em] text-foreground-subtle">PRIORITAS</span>
              </div>
              <p className="relative mt-3 text-sm leading-relaxed text-foreground-muted">{action.description}</p>
              <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white/80 px-3 py-1 text-[11px] text-foreground-muted">
                {(() => {
                  const Icon = quickActionIconMap[action.id] ?? Target;
                  return <Icon className="size-3.5" aria-hidden="true" />;
                })()}
                Fokus operasional
              </div>
              <p className="mt-auto pt-4 text-xs text-foreground-subtle">Akses modul ini melalui tab navbar di bagian atas.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid items-stretch gap-4 md:grid-cols-3">
        {pulseItems.map((item) => (
          <article
            key={item.id}
            className={`umkm-overview-action umkm-panel umkm-hover-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${item.glowClass} p-5`}
          >
            <p className="font-label text-[10px] tracking-[0.17em] text-foreground-subtle">{item.label}</p>
            <p className="mt-2 font-heading text-3xl tracking-tight">{pulseValueMap[item.valueKey]}</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/70">
              <span
                className="block h-full rounded-full bg-[linear-gradient(90deg,#1d4ed8,#0f766e)]"
                style={{ width: `${Math.min(100, Math.max(8, pulseValueMap[item.valueKey] * 18))}%` }}
              />
            </div>
            <p className="mt-auto pt-3 text-xs text-foreground-muted">{item.note}</p>
          </article>
        ))}
      </section>

      <section className="grid items-stretch gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="umkm-overview-action umkm-panel rounded-2xl border border-border p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-3xl tracking-tight">Alert Center</h2>
            <span className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">REALTIME PRIORITY</span>
          </div>

          <div className="mt-4 space-y-3">
            {alerts.map((alert) => (
              <article key={alert.id} className={`rounded-xl border px-4 py-3 ${alertToneClassMap[alert.tone]}`}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-white/80">
                    {(() => {
                      const Icon = alertToneIconMap[alert.tone];
                      return <Icon className="size-4" aria-hidden="true" />;
                    })()}
                  </span>
                  <div>
                    <p className="font-label text-[10px] tracking-[0.14em]">{alert.title}</p>
                    <p className="mt-1 text-sm leading-relaxed">{alert.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="umkm-overview-action umkm-panel rounded-2xl border border-border p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-3xl tracking-tight">Recommended Next Action</h2>
            <span className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">EXECUTION PLAN</span>
          </div>

          <ol className="mt-4 space-y-3">
            {recommendedActions.map((action, index) => (
              <li key={action} className="rounded-xl border border-border bg-surface/45 px-4 py-3">
                <div className="flex items-start gap-3">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-white font-label text-[10px] tracking-[0.12em] text-foreground-muted">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-label text-[10px] tracking-[0.14em] text-foreground-subtle">STEP {index + 1}</p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{action}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="umkm-overview-action umkm-panel rounded-2xl border border-border p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-3xl tracking-tight">SLA Tracker</h2>
          <span className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">VALIDATION WINDOW</span>
        </div>

        {slaItems.length === 0 ? (
          <p className="mt-3 text-sm text-foreground-muted">Belum ada antrian SLA aktif. Sistem berada di kondisi stabil.</p>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {slaItems.map((item) => (
              <article key={item.id} className="rounded-xl border border-border bg-surface/40 px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-label text-[10px] tracking-[0.13em] text-foreground-subtle">{item.id}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-foreground-muted">
                    <Clock3 className="size-3.5" aria-hidden="true" />
                    {item.priority === "tinggi" ? "Urgent" : "On Track"}
                  </span>
                </div>
                <h3 className="mt-1 text-sm font-medium text-foreground">{item.title}</h3>
                <p className="mt-2 text-xs text-foreground-subtle">{item.assignee}</p>
                <span
                  className={`mt-3 inline-flex rounded-full px-2 py-1 font-label text-[9px] tracking-[0.12em] ${
                    item.state === "disputed" ? "bg-[#ffeaea] text-[#b63939]" : "bg-[#fff4dc] text-[#9c6b00]"
                  }`}
                >
                  {item.state}
                </span>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="umkm-panel rounded-2xl border border-border p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-3xl tracking-tight">Snapshot Campaign</h2>
          <span className="font-label text-[10px] tracking-[0.17em] text-foreground-subtle">3 TERBARU</span>
        </div>

        <div className="mt-4 space-y-3">
          {campaigns.map((campaign) => {
            const health = getCampaignHealth(campaign);

            return (
              <article key={campaign.id} className="umkm-overview-row umkm-hover-card rounded-xl border border-border bg-surface/55 p-4">
                <div className="grid gap-3 md:grid-cols-[1.4fr_auto_auto_auto] md:items-center">
                  <div>
                    <h3 className="font-label text-[11px] tracking-[0.14em] text-foreground">{campaign.title}</h3>
                    <p className="mt-1 text-xs text-foreground-muted">Niche: {campaign.niche}</p>
                  </div>
                  <p className="text-xs text-foreground-muted">Budget: {campaign.budget}</p>
                  <p className="text-xs text-foreground-muted">Kuota: {campaign.quota}</p>
                  <p className={`font-label text-[10px] tracking-[0.12em] uppercase ${statusToneMap[campaign.status]}`}>
                    {campaign.status.replace("_", " ")}
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className={`inline-flex min-h-7 items-center rounded-full px-2.5 font-label text-[10px] tracking-[0.12em] ${health.className}`}>
                    <ShieldCheck className="mr-1 size-3.5" aria-hidden="true" />
                    {health.label} {health.score}
                  </span>
                  <div className="h-1.5 w-full max-w-[220px] overflow-hidden rounded-full bg-slate-200/75">
                    <span className="block h-full rounded-full bg-[linear-gradient(90deg,#1d4ed8,#0f766e)]" style={{ width: `${health.score}%` }} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
