"use client";

import { useMemo, useRef } from "react";
import { AlertTriangle, CheckCircle2, Clock3, FileWarning, Send } from "lucide-react";
import { useGSAP } from "@/lib/gsap";
import type { CreatorSubmissionItem } from "@/types/creator";
import { animateCreatorSubmissionsBoard } from "./creator-submissions-board.animations";

interface CreatorSubmissionsBoardProps {
  submissions: CreatorSubmissionItem[];
}

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function statusClass(status: CreatorSubmissionItem["status"]): string {
  if (status === "disputed") {
    return "bg-[#ffeaea] text-[#b63939]";
  }

  if (status === "revision") {
    return "bg-[#fff4dc] text-[#9c6b00]";
  }

  if (status === "validated") {
    return "bg-[#eefaf2] text-[#247a52]";
  }

  if (status === "submitted") {
    return "bg-[#eef4ff] text-[#1d4ed8]";
  }

  return "bg-[#f4f4f4] text-[#6b6b6b]";
}

export function CreatorSubmissionsBoard({ submissions }: CreatorSubmissionsBoardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (rootRef.current) {
        animateCreatorSubmissionsBoard(rootRef.current);
      }
    },
    { scope: rootRef }
  );

  const summary = useMemo(() => {
    return {
      submitted: submissions.filter((item) => item.status === "submitted").length,
      revision: submissions.filter((item) => item.status === "revision").length,
      validated: submissions.filter((item) => item.status === "validated").length,
      disputed: submissions.filter((item) => item.status === "disputed").length,
    };
  }, [submissions]);

  return (
    <div ref={rootRef} className="space-y-6">
      <section className="creator-submissions-head umkm-panel rounded-2xl border border-border p-6 md:p-8">
        <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">SUBMISSION OPERATIONS</p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">Submission Tracker</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground-muted md:text-base">
          Pantau alur draft, review, revisi, dan validasi agar peluang release payout semakin cepat dan konsisten.
        </p>
      </section>

      <section className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="creator-submissions-kpi umkm-panel rounded-2xl border border-border bg-[#eef4ff] p-5 transition-[transform,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_18px_30px_-26px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between gap-2">
            <p className="font-label text-[10px] tracking-[0.14em] text-foreground-subtle">Submitted</p>
            <Send className="size-4 text-[#1d4ed8]" aria-hidden="true" />
          </div>
          <p className="mt-2 font-heading text-4xl tracking-tight">{summary.submitted}</p>
        </article>
        <article className="creator-submissions-kpi umkm-panel rounded-2xl border border-border bg-[#fff9ee] p-5 transition-[transform,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_18px_30px_-26px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between gap-2">
            <p className="font-label text-[10px] tracking-[0.14em] text-foreground-subtle">Revision</p>
            <FileWarning className="size-4 text-[#9c6b00]" aria-hidden="true" />
          </div>
          <p className="mt-2 font-heading text-4xl tracking-tight">{summary.revision}</p>
        </article>
        <article className="creator-submissions-kpi umkm-panel rounded-2xl border border-border bg-[#eefaf2] p-5 transition-[transform,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_18px_30px_-26px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between gap-2">
            <p className="font-label text-[10px] tracking-[0.14em] text-foreground-subtle">Validated</p>
            <CheckCircle2 className="size-4 text-[#247a52]" aria-hidden="true" />
          </div>
          <p className="mt-2 font-heading text-4xl tracking-tight">{summary.validated}</p>
        </article>
        <article className="creator-submissions-kpi umkm-panel rounded-2xl border border-border bg-[#fff3f3] p-5 transition-[transform,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_18px_30px_-26px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between gap-2">
            <p className="font-label text-[10px] tracking-[0.14em] text-foreground-subtle">Disputed</p>
            <AlertTriangle className="size-4 text-[#b63939]" aria-hidden="true" />
          </div>
          <p className="mt-2 font-heading text-4xl tracking-tight">{summary.disputed}</p>
        </article>
      </section>

      <section className="umkm-panel rounded-2xl border border-border p-4 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-3xl tracking-tight">Submission Timeline</h2>
          <span className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">SLA PRIORITY</span>
        </div>

        <div className="mt-4 hidden overflow-x-auto rounded-xl border border-border bg-background/80 md:block">
          <table className="w-full min-w-[980px] border-collapse text-sm">
            <thead className="bg-surface/80">
              <tr className="text-left text-xs uppercase tracking-[0.08em] text-foreground-subtle">
                <th className="px-4 py-3">Campaign</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Payout</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Reviewer Note</th>
                <th className="px-4 py-3">SLA</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((item) => (
                <tr key={item.id} className="creator-submissions-row border-t border-border/80 text-foreground-muted transition-colors duration-200 hover:bg-surface/70">
                  <td className="px-4 py-3 font-medium text-foreground">{item.campaignTitle}</td>
                  <td className="px-4 py-3">{item.brandName}</td>
                  <td className="px-4 py-3">{item.submittedAt}</td>
                  <td className="px-4 py-3">{item.viewsAchieved.toLocaleString("id-ID")} / {item.targetViews.toLocaleString("id-ID")}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{formatRupiah(item.payoutAmount)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex min-h-7 items-center rounded-full px-2.5 font-label text-[10px] tracking-[0.12em] uppercase ${statusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-[260px] truncate">{item.reviewerNote}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-xs text-foreground-muted">
                      <Clock3 className="size-3" aria-hidden="true" />
                      {item.status === "disputed" ? "Urgent" : item.status === "revision" ? "Revisi < 12h" : "On Track"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-3 md:hidden">
          {submissions.map((item) => (
            <article
              key={item.id}
              className="creator-submissions-row rounded-xl border border-border bg-background p-4 transition-[transform,border-color,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-border-strong motion-safe:hover:shadow-[0_18px_28px_-24px_rgba(15,23,42,0.5)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium text-foreground">{item.campaignTitle}</h3>
                  <p className="text-xs text-foreground-subtle">{item.brandName}</p>
                </div>
                <span className={`inline-flex min-h-7 items-center rounded-full px-2.5 font-label text-[10px] tracking-[0.12em] uppercase ${statusClass(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-foreground-muted">Views {item.viewsAchieved.toLocaleString("id-ID")} / {item.targetViews.toLocaleString("id-ID")}</p>
              <p className="mt-2 text-sm text-foreground-muted">{item.reviewerNote}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
