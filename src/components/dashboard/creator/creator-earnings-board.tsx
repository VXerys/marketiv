"use client";

import { useRef } from "react";
import { BanknoteArrowDown, BadgeDollarSign, CalendarClock, Wallet } from "lucide-react";
import { useGSAP } from "@/lib/gsap";
import type { CreatorEarningItem, CreatorEarningsSummary } from "@/types/creator";
import { animateCreatorEarningsBoard } from "./creator-earnings-board.animations";

interface CreatorEarningsBoardProps {
  summary: CreatorEarningsSummary;
  earnings: CreatorEarningItem[];
}

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function payoutStatusClass(status: CreatorEarningItem["payoutStatus"]): string {
  if (status === "released") {
    return "bg-[#eefaf2] text-[#247a52]";
  }

  if (status === "scheduled") {
    return "bg-[#eef4ff] text-[#1d4ed8]";
  }

  return "bg-[#fff4dc] text-[#9c6b00]";
}

export function CreatorEarningsBoard({ summary, earnings }: CreatorEarningsBoardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (rootRef.current) {
        animateCreatorEarningsBoard(rootRef.current);
      }
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="space-y-6">
      <section className="creator-earnings-head umkm-panel rounded-2xl border border-border p-6 md:p-8">
        <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">EARNINGS OPERATIONS</p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">Pendapatan Kreator</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground-muted md:text-base">
          Pantau gross-net payout, status release escrow, dan jadwal pencairan agar arus pendapatan creator tetap sehat.
        </p>
      </section>

      <section className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="creator-earnings-kpi umkm-panel rounded-2xl border border-border bg-[#eef4ff] p-5 transition-[transform,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_18px_30px_-26px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between gap-2">
            <p className="font-label text-[10px] tracking-[0.14em] text-foreground-subtle">Gross Bulan Ini</p>
            <BadgeDollarSign className="size-4 text-[#1d4ed8]" aria-hidden="true" />
          </div>
          <p className="mt-2 font-heading text-3xl tracking-tight">{formatRupiah(summary.monthGross)}</p>
        </article>
        <article className="creator-earnings-kpi umkm-panel rounded-2xl border border-border bg-[#eefaf2] p-5 transition-[transform,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_18px_30px_-26px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between gap-2">
            <p className="font-label text-[10px] tracking-[0.14em] text-foreground-subtle">Net Bulan Ini</p>
            <Wallet className="size-4 text-[#247a52]" aria-hidden="true" />
          </div>
          <p className="mt-2 font-heading text-3xl tracking-tight">{formatRupiah(summary.monthNet)}</p>
        </article>
        <article className="creator-earnings-kpi umkm-panel rounded-2xl border border-border bg-[#fff9ee] p-5 transition-[transform,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_18px_30px_-26px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between gap-2">
            <p className="font-label text-[10px] tracking-[0.14em] text-foreground-subtle">Pending Release</p>
            <CalendarClock className="size-4 text-[#9c6b00]" aria-hidden="true" />
          </div>
          <p className="mt-2 font-heading text-3xl tracking-tight">{formatRupiah(summary.pendingRelease)}</p>
        </article>
        <article className="creator-earnings-kpi umkm-panel rounded-2xl border border-border bg-[#f3f1ff] p-5 transition-[transform,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_18px_30px_-26px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between gap-2">
            <p className="font-label text-[10px] tracking-[0.14em] text-foreground-subtle">Released Bulan Ini</p>
            <BanknoteArrowDown className="size-4 text-[#5a3da8]" aria-hidden="true" />
          </div>
          <p className="mt-2 font-heading text-3xl tracking-tight">{formatRupiah(summary.releasedThisMonth)}</p>
        </article>
      </section>

      <section className="umkm-panel rounded-2xl border border-border p-4 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-3xl tracking-tight">Earnings Timeline</h2>
          <span className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">PAYOUT TRACK</span>
        </div>

        <div className="mt-4 hidden overflow-x-auto rounded-xl border border-border bg-background/80 md:block">
          <table className="w-full min-w-[920px] border-collapse text-sm">
            <thead className="bg-surface/80">
              <tr className="text-left text-xs uppercase tracking-[0.08em] text-foreground-subtle">
                <th className="px-4 py-3">Campaign</th>
                <th className="px-4 py-3">Periode</th>
                <th className="px-4 py-3">Gross</th>
                <th className="px-4 py-3">Platform Fee</th>
                <th className="px-4 py-3">Net</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payout Date</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map((item) => (
                <tr key={item.id} className="creator-earnings-row border-t border-border/80 text-foreground-muted transition-colors duration-200 hover:bg-surface/70">
                  <td className="px-4 py-3 font-medium text-foreground">{item.campaignTitle}</td>
                  <td className="px-4 py-3">{item.periodLabel}</td>
                  <td className="px-4 py-3">{formatRupiah(item.grossAmount)}</td>
                  <td className="px-4 py-3">{formatRupiah(item.platformFee)}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{formatRupiah(item.netAmount)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex min-h-7 items-center rounded-full px-2.5 font-label text-[10px] tracking-[0.12em] uppercase ${payoutStatusClass(item.payoutStatus)}`}>
                      {item.payoutStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">{item.payoutDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-3 md:hidden">
          {earnings.map((item) => (
            <article
              key={item.id}
              className="creator-earnings-row rounded-xl border border-border bg-background p-4 transition-[transform,border-color,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-border-strong motion-safe:hover:shadow-[0_18px_28px_-24px_rgba(15,23,42,0.5)]"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium text-foreground">{item.campaignTitle}</h3>
                <span className={`inline-flex min-h-7 items-center rounded-full px-2.5 font-label text-[10px] tracking-[0.12em] uppercase ${payoutStatusClass(item.payoutStatus)}`}>
                  {item.payoutStatus}
                </span>
              </div>
              <p className="mt-1 text-xs text-foreground-subtle">{item.periodLabel}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-foreground-muted">
                <p>Gross: <span className="text-foreground">{formatRupiah(item.grossAmount)}</span></p>
                <p>Fee: <span className="text-foreground">{formatRupiah(item.platformFee)}</span></p>
                <p>Net: <span className="text-foreground">{formatRupiah(item.netAmount)}</span></p>
                <p>Date: <span className="text-foreground">{item.payoutDate}</span></p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
