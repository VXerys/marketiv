"use client";

import { useMemo, useRef, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGSAP } from "@/lib/gsap";
import type { UmkmAnalyticsHighlight, UmkmEscrowOrderItem, UmkmFraudQueueItem } from "@/types/dashboard";
import { animateUmkmAnalyticsBoard, animateUmkmAnalyticsPeriodChange } from "./umkm-analytics-board.animations";

interface UmkmAnalyticsBoardProps {
  highlights: UmkmAnalyticsHighlight[];
  fraudQueue: UmkmFraudQueueItem[];
  orders: UmkmEscrowOrderItem[];
}

interface AnalyticsPerformanceRow {
  id: string;
  campaignName: string;
  mode: "campaign" | "rate-card";
  status: "selesai" | "berjalan" | "menunggu-escrow";
  spend: number;
  views: number;
  cpv: number;
  roas: number;
}

const chartPalette = {
  primary: "#1d4ed8",
  primarySoft: "#60a5fa",
  border: "#dbe3ee",
  label: "#5d6b82",
} as const;

const dateRangeOptions = [
  { value: "7", label: "7 Hari Terakhir" },
  { value: "30", label: "30 Hari Terakhir" },
  { value: "90", label: "90 Hari Terakhir" },
] as const;

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

function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatModeLabel(value: AnalyticsPerformanceRow["mode"]): string {
  return value === "campaign" ? "Campaign" : "Rate Card";
}

function csvEscape(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function inferMode(order: UmkmEscrowOrderItem): AnalyticsPerformanceRow["mode"] {
  const normalized = order.campaignTitle.toLowerCase();
  if (normalized.includes("challenge") || normalized.includes("promo") || normalized.includes("deal")) {
    return "campaign";
  }

  return order.id.charCodeAt(order.id.length - 1) % 2 === 0 ? "campaign" : "rate-card";
}

function inferStatus(order: UmkmEscrowOrderItem): AnalyticsPerformanceRow["status"] {
  if (order.escrowState === "released") {
    return "selesai";
  }

  if (order.escrowState === "processing") {
    return "menunggu-escrow";
  }

  return "berjalan";
}

function statusBadgeClass(status: AnalyticsPerformanceRow["status"]): string {
  if (status === "selesai") {
    return "border-[#d6f0df] bg-[#edf9f1] text-[#1f7a42]";
  }

  if (status === "berjalan") {
    return "border-[#dce8ff] bg-[#edf3ff] text-[#2147a8]";
  }

  return "border-[#f1dfc7] bg-[#fff5e9] text-[#9a5a08]";
}

function getAnalyticsPriorityClass(item: AnalyticsPerformanceRow): {
  label: "urgent" | "watch" | "healthy";
  rowClassName: string;
  badgeClassName: string;
} {
  if (item.status === "menunggu-escrow" || item.roas < 0.12 || item.cpv > 320) {
    return {
      label: "urgent",
      rowClassName: "bg-[#fff9f9]",
      badgeClassName: "border-[#f6d2d2] bg-[#fff1f1] text-[#b63333]",
    };
  }

  if (item.status === "berjalan" || item.roas < 0.2 || item.cpv > 260) {
    return {
      label: "watch",
      rowClassName: "bg-[#fffdf8]",
      badgeClassName: "border-[#f2e3bf] bg-[#fff9ee] text-[#9c6b00]",
    };
  }

  return {
    label: "healthy",
    rowClassName: "bg-[#f7fcf8]",
    badgeClassName: "border-[#d5eddc] bg-[#f1fbf3] text-[#1f7a42]",
  };
}

export function UmkmAnalyticsBoard({ highlights, fraudQueue, orders }: UmkmAnalyticsBoardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [dateRange, setDateRange] = useState<"7" | "30" | "90">("30");

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
    { scope: rootRef, dependencies: [dateRange] }
  );

  const performanceRows = useMemo<AnalyticsPerformanceRow[]>(
    () =>
      orders.map((order) => {
        const views = parseViewsProgress(order.viewsProgress);
        const spend = order.escrowAmount;
        const cpv = views > 0 ? spend / views : 0;
        const roas = spend > 0 ? (views * 25) / spend : 0;

        return {
          id: order.id,
          campaignName: order.campaignTitle,
          mode: inferMode(order),
          status: inferStatus(order),
          spend,
          views,
          cpv,
          roas,
        };
      }),
    [orders]
  );

  const summary = useMemo(() => {
    const totalSpend = performanceRows.reduce((total, item) => total + item.spend, 0);
    const totalViews = performanceRows.reduce((total, item) => total + item.views, 0);
    const uniqueCreators = new Set(orders.map((item) => item.creatorHandle)).size;
    const cpv = totalViews > 0 ? totalSpend / totalViews : 0;
    const trendFromHighlights = highlights.find((item) => item.id === "conversion-lift")?.value ?? "+15%";

    return {
      totalSpend,
      totalViews,
      cpv,
      uniqueCreators,
      trendFromHighlights,
    };
  }, [highlights, orders, performanceRows]);

  const tractionData = useMemo(() => {
    const days = Number(dateRange);
    const avgPerDay = Math.max(1, Math.round(summary.totalViews / Math.max(1, days)));

    return Array.from({ length: days }, (_, index) => {
      const day = index + 1;
      const linearGrowth = 0.62 + day / days;
      const pulse = 1 + ((day % 6) - 2) * 0.04;

      return {
        day: `H-${days - index}`,
        views: Math.round(avgPerDay * linearGrowth * pulse),
      };
    });
  }, [dateRange, summary.totalViews]);

  const budgetSplitData = useMemo(() => {
    const campaignBudget = performanceRows.filter((item) => item.mode === "campaign").reduce((total, item) => total + item.spend, 0);
    const rateCardBudget = performanceRows.filter((item) => item.mode === "rate-card").reduce((total, item) => total + item.spend, 0);
    const reviewWeight = Math.min(0.12, fraudQueue.length * 0.01);

    return [
      {
        label: "Mode Campaign (Viral)",
        amount: Math.round(campaignBudget * (1 + reviewWeight)),
        color: "#1d4ed8",
      },
      {
        label: "Mode Rate Card (Influencer)",
        amount: Math.round(rateCardBudget * (1 - reviewWeight)),
        color: "#0f766e",
      },
    ];
  }, [fraudQueue.length, performanceRows]);

  const totalBudgetSplit = budgetSplitData.reduce((total, item) => total + item.amount, 0);

  const panelClassName =
    "umkm-panel rounded-2xl border border-border/90 bg-white shadow-[0_16px_34px_-28px_rgba(15,23,42,0.35)]";

  const exportRows = () => {
    const header = ["Nama Pekerjaan/Kampanye", "Mode", "Status", "Pengeluaran", "Views Didapat", "ROAS / CPV"];
    const body = performanceRows.map((item) => [
      item.campaignName,
      formatModeLabel(item.mode),
      item.status,
      formatRupiah(item.spend),
      `${formatNumber(item.views)} Views`,
      `ROAS ${item.roas.toFixed(2)}x | CPV ${formatRupiah(Math.round(item.cpv))}`,
    ]);
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
    <div ref={rootRef} className="umkm-dashboard-space space-y-4">
      <section className={`umkm-analytics-head ${panelClassName} p-5 md:p-6`}>
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="font-heading text-3xl tracking-tight text-slate-900 md:text-4xl">Analitik Performa</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">Pantau pengeluaran dan traksi sosial media brand Anda.</p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <label className="sr-only" htmlFor="analytics-date-range">
              Pilih rentang tanggal
            </label>
            <select
              id="analytics-date-range"
              value={dateRange}
              onChange={(event) => setDateRange(event.target.value as "7" | "30" | "90")}
              className="min-h-11 rounded-xl border border-[#d6deea] bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/15"
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={exportRows}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1e3a8a] px-4 text-sm font-medium text-white transition hover:bg-[#1d4ed8]"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 3v11" strokeLinecap="round" />
                <path d="m8.5 10.5 3.5 3.5 3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 17.5h16" strokeLinecap="round" />
              </svg>
              Download Laporan (CSV/PDF)
            </button>
          </div>
        </header>
      </section>

      <section className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className={`umkm-analytics-top-card ${panelClassName} flex h-full flex-col p-5`}>
          <p className="text-sm text-slate-600">Total Pengeluaran</p>
          <p className="mt-3 font-heading text-3xl tracking-tight text-slate-900">{formatRupiah(summary.totalSpend)}</p>
          <p className="mt-auto inline-flex w-fit rounded-full border border-[#d7e4ff] bg-[#ecf3ff] px-2.5 py-1 text-xs font-medium text-[#2456bb]">
            {summary.trendFromHighlights} dari bulan lalu
          </p>
        </article>

        <article className={`umkm-analytics-top-card ${panelClassName} flex h-full flex-col p-5`}>
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm text-slate-600">Total Tayangan (Views)</p>
            <svg viewBox="0 0 24 24" className="size-5 text-[#1d4ed8]" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <p className="mt-3 font-heading text-3xl tracking-tight text-slate-900">{formatNumber(summary.totalViews)} Views</p>
          <p className="mt-auto pt-2 text-xs text-slate-500">Akumulasi tayangan tervalidasi dari kolaborasi aktif.</p>
        </article>

        <article className={`umkm-analytics-top-card ${panelClassName} flex h-full flex-col p-5`}>
          <p className="text-sm text-slate-600">Cost-per-View (CPV)</p>
          <p className="mt-3 font-heading text-3xl tracking-tight text-slate-900">{formatRupiah(Math.round(summary.cpv))} / View</p>
          <p className="mt-auto pt-2 text-xs text-slate-500">Semakin rendah CPV, semakin efisien biaya awareness UMKM Anda.</p>
        </article>

        <article className={`umkm-analytics-top-card ${panelClassName} flex h-full flex-col p-5`}>
          <p className="text-sm text-slate-600">Total Kreator Bekerja Sama</p>
          <p className="mt-3 font-heading text-3xl tracking-tight text-slate-900">{summary.uniqueCreators} Kreator</p>
          <p className="mt-auto pt-2 text-xs text-slate-500">Jumlah kreator unik yang berkolaborasi di periode terpilih.</p>
        </article>
      </section>

      <section className="grid items-stretch gap-4 xl:grid-cols-12">
        <article className={`umkm-analytics-overview ${panelClassName} flex h-full flex-col p-5 xl:col-span-8`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Traksi Tayangan (Views) {dateRange} Hari Terakhir</h2>
              <p className="text-sm text-slate-600">Kurva pertumbuhan exposure kampanye menunjukkan momentum awareness brand.</p>
            </div>
            <span className="rounded-lg border border-[#d6deea] bg-[#f8fbff] px-3 py-1 text-xs text-slate-600">Views Trend</span>
          </div>

          <div className="umkm-analytics-chart-block mt-4 h-72 rounded-xl border border-[#dbe3ee] bg-[#f9fbff] p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tractionData} margin={{ top: 8, right: 8, left: 2, bottom: 2 }}>
                <CartesianGrid stroke={chartPalette.border} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: chartPalette.label }} minTickGap={14} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: chartPalette.label }}
                  tickFormatter={(value) => formatCompactNumber(Number(value))}
                  width={40}
                />
                <Tooltip
                  formatter={(value) => [`${formatNumber(Number(value))} Views`, "Tayangan"]}
                  contentStyle={{ borderRadius: "10px", borderColor: "#d8e0eb", fontSize: "12px", backgroundColor: "#ffffff" }}
                  labelStyle={{ color: "#334155" }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke={chartPalette.primary}
                  strokeWidth={2.6}
                  dot={{ r: 0 }}
                  activeDot={{ r: 4, fill: chartPalette.primary }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className={`umkm-analytics-bottom ${panelClassName} flex h-full flex-col p-5 xl:col-span-4`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">Distribusi Anggaran</h2>
              <p className="text-sm text-slate-600">Perbandingan alokasi mode campaign vs rate card.</p>
            </div>
            <span className="rounded-lg border border-[#d6deea] bg-[#f8fbff] px-3 py-1 text-xs text-slate-600">Budget Split</span>
          </div>

          <div className="umkm-analytics-chart-block mt-4 h-64 rounded-xl border border-[#dbe3ee] bg-[#f9fbff] p-2 xl:h-72">
            <div className="relative h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={budgetSplitData} dataKey="amount" nameKey="label" innerRadius={62} outerRadius={90} paddingAngle={2} stroke="none">
                    {budgetSplitData.map((item) => (
                      <Cell key={item.label} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [formatRupiah(Number(value)), "Anggaran"]}
                    contentStyle={{ borderRadius: "10px", borderColor: "#d8e0eb", fontSize: "12px", backgroundColor: "#ffffff" }}
                    labelStyle={{ color: "#334155" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center">
                <div>
                  <p className="text-xs text-slate-500">Total</p>
                  <p className="mt-1 font-heading text-2xl tracking-tight text-slate-900">{formatRupiah(totalBudgetSplit)}</p>
                </div>
              </div>
            </div>
          </div>

          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {budgetSplitData.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.label}
                </span>
                <span className="whitespace-nowrap font-medium tabular-nums text-slate-900">{formatRupiah(item.amount)}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className={`umkm-analytics-bottom ${panelClassName} p-5`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Rincian Kampanye &amp; Kolaborasi</h2>
            <p className="text-sm text-slate-600">Pantauan performa per pekerjaan untuk evaluasi efisiensi budget.</p>
          </div>
        </div>

        <div className="mt-4 hidden overflow-x-auto rounded-xl border border-[#dbe3ee] bg-white md:block">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <thead className="bg-[#f7f9fc] text-left text-xs uppercase tracking-[0.07em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Nama Pekerjaan/Kampanye</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Pengeluaran</th>
                <th className="px-4 py-3">Views Didapat</th>
                <th className="px-4 py-3">ROAS / CPV</th>
                <th className="px-4 py-3">Priority</th>
              </tr>
            </thead>
            <tbody>
              {performanceRows.map((item) => {
                const priority = getAnalyticsPriorityClass(item);

                return (
                  <tr key={item.id} className={`umkm-analytics-transaction-row border-t border-[#e8edf3] ${priority.rowClassName}`}>
                    <td className="px-4 py-3 font-medium text-slate-900">{item.campaignName}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex min-h-7 items-center rounded-md border border-[#dce8ff] bg-[#edf3ff] px-2.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#2147a8]">
                        {formatModeLabel(item.mode)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex min-h-7 items-center rounded-md border px-2.5 text-[11px] font-medium uppercase tracking-[0.08em] ${statusBadgeClass(item.status)}`}>
                        {item.status === "menunggu-escrow" ? "Menunggu Escrow" : item.status === "berjalan" ? "Berjalan" : "Selesai"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">{formatRupiah(item.spend)}</td>
                    <td className="px-4 py-3 text-slate-700">{formatNumber(item.views)} Views</td>
                    <td className="px-4 py-3 text-slate-700">ROAS {item.roas.toFixed(2)}x | CPV {formatRupiah(Math.round(item.cpv))}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex min-h-7 items-center rounded-full border px-2.5 text-[11px] font-medium uppercase tracking-[0.08em] ${priority.badgeClassName}`}>
                        {priority.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-3 md:hidden">
          {performanceRows.map((item) => {
            const priority = getAnalyticsPriorityClass(item);

            return (
              <article key={item.id} className={`umkm-analytics-transaction-row rounded-xl border border-[#dbe3ee] bg-white p-4 ${priority.rowClassName}`}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-medium text-slate-900">{item.campaignName}</h3>
                  <span className={`inline-flex min-h-7 items-center rounded-md border px-2.5 text-[11px] font-medium uppercase tracking-[0.08em] ${statusBadgeClass(item.status)}`}>
                    {item.status === "menunggu-escrow" ? "Menunggu Escrow" : item.status === "berjalan" ? "Berjalan" : "Selesai"}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                  <span className="inline-flex min-h-7 items-center rounded-md border border-[#dce8ff] bg-[#edf3ff] px-2.5 font-medium uppercase tracking-[0.08em] text-[#2147a8]">
                    {formatModeLabel(item.mode)}
                  </span>
                  <span className={`inline-flex min-h-7 items-center rounded-full border px-2.5 font-medium uppercase tracking-[0.08em] ${priority.badgeClassName}`}>
                    {priority.label}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-sm text-slate-600">
                  <p>
                    Pengeluaran: <span className="font-medium text-slate-900">{formatRupiah(item.spend)}</span>
                  </p>
                  <p>
                    ROAS / CPV: <span className="text-slate-900">{item.roas.toFixed(2)}x / {formatRupiah(Math.round(item.cpv))}</span>
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
