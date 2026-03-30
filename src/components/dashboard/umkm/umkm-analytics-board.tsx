"use client";

import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@/lib/gsap";
import type { UmkmAnalyticsHighlight, UmkmEscrowOrderItem, UmkmFraudQueueItem } from "@/types/dashboard";
import { animateUmkmAnalyticsBoard, animateUmkmAnalyticsPeriodChange } from "./umkm-analytics-board.animations";

interface UmkmAnalyticsBoardProps {
  highlights: UmkmAnalyticsHighlight[];
  fraudQueue: UmkmFraudQueueItem[];
  orders: UmkmEscrowOrderItem[];
}

interface AnalyticsTransactionRow {
  id: string;
  orderId: string;
  campaignName: string;
  creatorName: string;
  creatorHandle: string;
  claimDate: string;
  budget: number;
  status: "review" | "clear";
}

const weeklyLabels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const monthlyLabels = ["W1", "W2", "W3", "W4"];

const periodTrafficFactors = {
  weekly: [0.86, 0.74, 0.91, 1.02, 0.96, 1.08, 0.82],
  monthly: [0.88, 1.06, 0.92, 1.14],
} as const;

const categoryPalette = {
  Kuliner: "bg-[#3f48f4]",
  Fesyen: "bg-[#5f3bf3]",
  Kecantikan: "bg-[#a996ff]",
} as const;

function parseViewsProgress(value: string): number {
  const [currentViewsRaw] = value.split("/");
  const compact = currentViewsRaw.trim().toUpperCase();
  const multiplier = compact.endsWith("M") ? 1_000_000 : compact.endsWith("K") ? 1_000 : 1;
  const numeric = Number(compact.replace(/[^\d.]/g, ""));

  if (!Number.isFinite(numeric)) {
    return 0;
  }

  return Math.round(numeric * multiplier);
}

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(value);
}

function csvEscape(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export function UmkmAnalyticsBoard({ highlights, fraudQueue, orders }: UmkmAnalyticsBoardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const [statusFilter, setStatusFilter] = useState<"all" | "review" | "clear">("all");
  const [isCompact, setIsCompact] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (rootRef.current) {
        return animateUmkmAnalyticsBoard(rootRef.current);
      }
    },
    { scope: rootRef }
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (rootRef.current) {
        animateUmkmAnalyticsPeriodChange(rootRef.current);
      }
    },
    { scope: rootRef, dependencies: [period] }
  );

  const summary = useMemo(() => {
    const validatedViews = highlights.find((item) => item.id === "validated-views")?.value ?? "1.24M";
    const costPerThousand = highlights.find((item) => item.id === "cost-per-1000")?.value ?? "Rp 3.480";
    const conversionLift = highlights.find((item) => item.id === "conversion-lift")?.value ?? "+18.7%";

    return {
      validatedViews,
      costPerThousand,
      conversionLift,
      totalCampaignBudget: orders.reduce((total, item) => total + item.escrowAmount, 0),
    };
  }, [highlights, orders]);

  const transactionRows = useMemo<AnalyticsTransactionRow[]>(() => {
    const queueMap = new Map(fraudQueue.map((item) => [item.campaignTitle, item.state]));

    return orders.map((order) => {
      const queueStatus = queueMap.get(order.campaignTitle);
      const inferredStatus: "review" | "clear" =
        order.submissionStatus === "disputed" || order.submissionStatus === "submitted" ? "review" : "clear";

      return {
        id: order.id,
        orderId: `#${order.id}`,
        campaignName: order.campaignTitle,
        creatorName: order.creatorName,
        creatorHandle: order.creatorHandle,
        claimDate: order.claimDate,
        budget: order.escrowAmount,
        status: queueStatus ?? inferredStatus,
      };
    });
  }, [fraudQueue, orders]);

  const periodData = useMemo(() => {
    const totalViews = Math.max(orders.reduce((accumulator, item) => accumulator + parseViewsProgress(item.viewsProgress), 0), 42_000);
    const labels = period === "weekly" ? weeklyLabels : monthlyLabels;
    const factors = period === "weekly" ? periodTrafficFactors.weekly : periodTrafficFactors.monthly;
    const denominator = factors.reduce((sum, value) => sum + value, 0);
    const values = factors.map((factor) => Math.round((totalViews * factor) / denominator));

    return {
      labels,
      values,
      max: Math.max(...values),
      totalViews,
    };
  }, [orders, period]);

  const categorySplit = useMemo(() => {
    const aggregates: Record<"Kuliner" | "Fesyen" | "Kecantikan", number> = {
      Kuliner: 0,
      Fesyen: 0,
      Kecantikan: 0,
    };

    orders.forEach((order) => {
      const views = parseViewsProgress(order.viewsProgress);
      const normalized = order.campaignTitle.toLowerCase();

      if (normalized.includes("sambal") || normalized.includes("kopi") || normalized.includes("teh") || normalized.includes("catering")) {
        aggregates.Kuliner += views;
        return;
      }

      if (normalized.includes("batik") || normalized.includes("fesyen")) {
        aggregates.Fesyen += views;
        return;
      }

      aggregates.Kecantikan += views;
    });

    return [
      { label: "Kuliner", amount: aggregates.Kuliner, tone: categoryPalette.Kuliner },
      { label: "Fesyen", amount: aggregates.Fesyen, tone: categoryPalette.Fesyen },
      { label: "Kecantikan", amount: aggregates.Kecantikan, tone: categoryPalette.Kecantikan },
    ];
  }, [orders]);

  const filteredRows = useMemo(() => {
    if (statusFilter === "all") {
      return transactionRows;
    }

    return transactionRows.filter((item) => item.status === statusFilter);
  }, [statusFilter, transactionRows]);

  const totalCategoryAmount = categorySplit.reduce((accumulator, item) => accumulator + item.amount, 0);

  const donutStyle = useMemo(() => {
    if (totalCategoryAmount <= 0) {
      return {
        background: "conic-gradient(#3f48f4 0 62%, #5f3bf3 62% 74%, #a996ff 74% 100%)",
      };
    }

    const kulinerPct = (categorySplit[0].amount / totalCategoryAmount) * 100;
    const fesyenPct = kulinerPct + (categorySplit[1].amount / totalCategoryAmount) * 100;

    return {
      background: `conic-gradient(#3f48f4 0 ${kulinerPct}%, #5f3bf3 ${kulinerPct}% ${fesyenPct}%, #a996ff ${fesyenPct}% 100%)`,
    };
  }, [categorySplit, totalCategoryAmount]);

  const exportRows = () => {
    const header = ["Order ID", "Campaign", "Creator", "Claim Date", "Budget", "Status"];
    const body = filteredRows.map((item) => [item.orderId, item.campaignName, `${item.creatorName} (${item.creatorHandle})`, item.claimDate, String(item.budget), item.status]);
    const csvContent = [header, ...body].map((line) => line.map(csvEscape).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "marketiv-umkm-analytics-transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  };

  return (
    <div ref={rootRef} className="umkm-dashboard-space space-y-7">
      <section className="umkm-analytics-head umkm-panel border border-border p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">CAMPAIGN ANALYTICS</p>
            <h1 className="mt-2 font-heading text-3xl tracking-tight md:text-4xl">Analitik Campaign UMKM</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground-muted">
              Ringkasan performa budget, distribusi niche, dan transaksi campaign mode untuk bantu keputusan release escrow dan optimasi ROI.
            </p>
          </div>

          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value as "weekly" | "monthly")}
            className="min-h-10 w-full border border-border bg-background px-3 text-sm text-foreground outline-none md:w-auto"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="space-y-4 xl:col-span-3">
          <article className="umkm-analytics-top-card overflow-hidden border border-[#5d53ff] bg-gradient-to-br from-[#4b48ff] to-[#6b4de5] p-5 text-white shadow-[0_16px_40px_-24px_rgba(71,63,255,0.8)]">
            <p className="text-sm text-white/90">Budget Campaign Aktif</p>
            <p className="mt-4 font-heading text-4xl tracking-tight">{formatRupiah(summary.totalCampaignBudget)}</p>
            <p className="mt-2 text-xs text-white/85">Akumulasi budget dari semua order campaign aktif UMKM.</p>
            <span className="mt-4 inline-flex items-center rounded-md bg-white/15 px-2 py-1 text-xs">+7% dari bulan lalu</span>
          </article>

          <article className="umkm-analytics-top-card umkm-panel border border-border p-5">
            <p className="text-sm text-foreground-muted">Escrow Siap Release</p>
            <p className="mt-4 font-heading text-4xl tracking-tight">{summary.conversionLift}</p>
            <p className="mt-2 text-xs text-foreground-muted">Kenaikan performa order sesudah campaign berjalan.</p>
            <span className="mt-4 inline-flex items-center rounded-md bg-[#e7f7eb] px-2 py-1 text-xs text-[#1d7c46]">+5 campaign clear</span>
          </article>
        </div>

        <article className="umkm-analytics-top-card umkm-panel border border-border p-5 xl:col-span-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm text-foreground">Response Validation Time</p>
              <p className="text-xs text-foreground-subtle">Rata-rata durasi admin review submission.</p>
            </div>
            <button type="button" className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-foreground-subtle">
              ...
            </button>
          </div>

          <p className="mt-5 font-heading text-5xl tracking-tight">00:01:30</p>

          <svg className="mt-4 h-28 w-full rounded-lg bg-[#f4f5ff]" viewBox="0 0 240 90" fill="none" aria-hidden="true">
            <path d="M4 68C22 61 30 45 46 44C62 43 72 58 88 58C104 58 112 49 126 42C142 35 150 51 166 53C182 55 194 30 210 28C222 26 230 35 236 31" stroke="#5853ec" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="46" cy="44" r="3" fill="#5853ec" />
            <circle cx="126" cy="42" r="3" fill="#5853ec" />
            <circle cx="210" cy="28" r="3" fill="#5853ec" />
          </svg>

          <span className="mt-4 inline-flex items-center rounded-md bg-[#e7f7eb] px-2 py-1 text-xs text-[#1d7c46]">+8% lebih cepat</span>
        </article>

        <article className="umkm-analytics-overview umkm-panel border border-border p-5 xl:col-span-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Views Overview</h2>
              <p className="text-sm text-foreground-subtle">Pergerakan views tervalidasi untuk campaign aktif berdasarkan periode terpilih.</p>
            </div>
            <span className="rounded-lg border border-border bg-background px-3 py-1 text-xs text-foreground-muted">{period === "weekly" ? "Weekly" : "Monthly"}</span>
          </div>

          <div className="mt-6 grid items-end gap-3" style={{ gridTemplateColumns: `repeat(${periodData.labels.length}, minmax(0, 1fr))` }}>
            {periodData.values.map((bar, index) => {
              const percentage = Math.max(25, Math.round((bar / periodData.max) * 100));
              return (
                <div key={`${periodData.labels[index]}-${bar}`} className="flex flex-col items-center gap-2">
                  <div className="relative flex h-56 w-full max-w-[52px] items-end justify-center rounded-3xl bg-[#f2f2f5] px-1.5 py-1">
                    <div className="umkm-analytics-bar-fill w-full rounded-3xl bg-gradient-to-b from-[#6d63ff] to-[#3f48f4]" style={{ height: `${percentage}%` }} />
                  </div>
                  <span className="text-xs text-foreground-subtle">{periodData.labels[index]}</span>
                </div>
              );
            })}
          </div>

          <p className="mt-3 text-xs text-foreground-muted">Views tervalidasi: {summary.validatedViews} dengan biaya rata-rata {summary.costPerThousand} per 1.000 views. Total indikator periode: {formatCompactNumber(periodData.totalViews)} views.</p>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.6fr]">
        <article className="umkm-analytics-bottom umkm-panel border border-border p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Kategori Campaign</h2>
              <p className="text-sm text-foreground-subtle">Distribusi niche campaign yang sedang aktif.</p>
            </div>
            <span className="rounded-lg border border-border bg-background px-3 py-1 text-xs text-foreground-muted">{period === "weekly" ? "Weekly" : "Monthly"}</span>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="relative size-[220px] rounded-full" style={donutStyle}>
              <div className="absolute inset-[18px] rounded-full bg-background" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-foreground-subtle">Total Views</p>
                  <p className="mt-1 font-heading text-4xl tracking-tight">{formatCompactNumber(totalCategoryAmount)}</p>
                </div>
              </div>
            </div>
          </div>

          <ul className="mt-5 space-y-2 text-sm text-foreground-muted">
            {categorySplit.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2">
                  <span className={`inline-block size-2.5 rounded-full ${item.tone}`} />
                  {item.label}
                </span>
                <span className="font-medium text-foreground">{new Intl.NumberFormat("id-ID").format(item.amount)} views</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="umkm-analytics-bottom umkm-panel border border-border p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Campaign Transaction</h2>
              <p className="text-sm text-foreground-subtle">Aktivitas transaksi campaign yang terhubung dengan status fraud review queue.</p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as "all" | "review" | "clear")}
                className="min-h-10 border border-border bg-background px-3 text-sm text-foreground outline-none"
              >
                <option value="all">Filter: All</option>
                <option value="review">Review</option>
                <option value="clear">Clear</option>
              </select>
              <button
                type="button"
                onClick={() => setIsCompact((value) => !value)}
                className="inline-flex min-h-10 items-center justify-center border border-border px-3 text-sm text-foreground transition-colors hover:bg-surface"
              >
                {isCompact ? "Normal" : "Compact"}
              </button>
              <button
                type="button"
                onClick={exportRows}
                className="inline-flex min-h-10 items-center justify-center border border-border px-3 text-sm text-foreground transition-colors hover:bg-surface"
              >
                Export
              </button>
            </div>
          </div>

          <div className="mt-4 hidden overflow-x-auto rounded-xl border border-border bg-background/80 md:block">
            <table className="w-full min-w-[880px] border-collapse text-sm">
              <thead className="bg-surface/70 text-left text-xs uppercase tracking-[0.08em] text-foreground-subtle">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Nama Campaign</th>
                  <th className="px-4 py-3">Creator</th>
                  <th className="px-4 py-3">Tanggal Klaim</th>
                  <th className="px-4 py-3">Budget</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-sm text-foreground-muted">
                      Tidak ada data transaksi untuk filter ini.
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((item) => (
                    <tr key={item.id} className="umkm-analytics-transaction-row border-t border-border/70">
                      <td className={`px-4 font-label text-[10px] tracking-[0.12em] text-foreground ${isCompact ? "py-2" : "py-3"}`}>{item.orderId}</td>
                      <td className={`${isCompact ? "py-2" : "py-3"} px-4 text-foreground`}>{item.campaignName}</td>
                      <td className={`${isCompact ? "py-2" : "py-3"} px-4 text-foreground-muted`}>
                        <span className="text-foreground">{item.creatorName}</span>
                        <span className="ml-1 text-xs text-foreground-subtle">{item.creatorHandle}</span>
                      </td>
                      <td className={`${isCompact ? "py-2" : "py-3"} px-4 text-foreground-muted`}>{item.claimDate}</td>
                      <td className={`${isCompact ? "py-2" : "py-3"} px-4 font-medium text-foreground`}>{formatRupiah(item.budget)}</td>
                      <td className={`${isCompact ? "py-2" : "py-3"} px-4`}>
                        <span
                          className={`inline-flex min-h-7 items-center rounded-md px-2.5 font-label text-[10px] tracking-[0.12em] uppercase ${
                            item.status === "clear" ? "bg-[#e7f7eb] text-[#238247]" : "bg-[#ffeaea] text-[#b63939]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className={`${isCompact ? "py-2" : "py-3"} px-4`}>
                        <button
                          type="button"
                          className="inline-flex min-h-8 items-center rounded-md border border-border px-3 text-xs text-foreground transition-colors hover:bg-surface"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-3 md:hidden">
            {filteredRows.length === 0 ? (
              <article className="rounded-xl border border-border bg-background px-4 py-6 text-center text-sm text-foreground-muted">
                Tidak ada data transaksi untuk filter ini.
              </article>
            ) : (
              filteredRows.map((item) => (
                <article key={item.id} className="umkm-analytics-transaction-row rounded-xl border border-border bg-background p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-label text-[10px] tracking-[0.12em] text-foreground-subtle">{item.orderId}</p>
                      <h3 className="mt-1 text-sm font-medium text-foreground">{item.campaignName}</h3>
                    </div>
                    <span
                      className={`inline-flex min-h-7 items-center rounded-md px-2.5 font-label text-[10px] tracking-[0.12em] uppercase ${
                        item.status === "clear" ? "bg-[#e7f7eb] text-[#238247]" : "bg-[#ffeaea] text-[#b63939]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5 text-sm text-foreground-muted">
                    <p>
                      Creator: <span className="text-foreground">{item.creatorName}</span> <span className="text-foreground-subtle">{item.creatorHandle}</span>
                    </p>
                    <p>
                      Tanggal Klaim: <span className="text-foreground">{item.claimDate}</span>
                    </p>
                    <p>
                      Budget: <span className="font-medium text-foreground">{formatRupiah(item.budget)}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    className="mt-3 inline-flex min-h-9 items-center rounded-md border border-border px-3 text-xs text-foreground transition-colors hover:bg-surface"
                  >
                    Review
                  </button>
                </article>
              ))
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
