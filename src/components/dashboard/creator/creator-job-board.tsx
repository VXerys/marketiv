"use client";

import { useMemo, useRef, useState } from "react";
import { BarChart3, BriefcaseBusiness, Flame, Search, Users } from "lucide-react";
import { useGSAP } from "@/lib/gsap";
import type { CreatorJobOpportunity } from "@/types/creator";
import { animateCreatorJobBoard } from "./creator-job-board.animations";

interface CreatorJobBoardProps {
  jobs: CreatorJobOpportunity[];
}

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function competitionTone(level: CreatorJobOpportunity["competitionLevel"]): string {
  if (level === "high") {
    return "bg-[#ffeaea] text-[#b63939]";
  }

  if (level === "medium") {
    return "bg-[#fff4dc] text-[#9c6b00]";
  }

  return "bg-[#eefaf2] text-[#247a52]";
}

export function CreatorJobBoard({ jobs }: CreatorJobBoardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [competition, setCompetition] = useState<"all" | CreatorJobOpportunity["competitionLevel"]>("all");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (rootRef.current) {
        animateCreatorJobBoard(rootRef.current);
      }
    },
    { scope: rootRef }
  );

  const filteredJobs = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return jobs.filter((job) => {
      const byCompetition = competition === "all" ? true : job.competitionLevel === competition;
      if (!byCompetition) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const haystack = `${job.brandName} ${job.campaignTitle} ${job.niche}`.toLowerCase();
      return haystack.includes(normalizedSearch);
    });
  }, [competition, jobs, searchTerm]);

  const highlights = {
    totalJobs: jobs.length,
    lowCompetition: jobs.filter((job) => job.competitionLevel === "low").length,
    urgentSlots: jobs.filter((job) => job.slotsRemaining <= 2).length,
  };

  return (
    <div ref={rootRef} className="space-y-6">
      <section className="creator-jobs-head umkm-panel rounded-2xl border border-border p-6 md:p-8">
        <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">CREATOR JOB BOARD</p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">Peluang Campaign</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground-muted md:text-base">
          Pilih brief yang sesuai niche, cek kompetisi slot, lalu ambil campaign dengan potensi payout paling sehat untuk target bulananmu.
        </p>
      </section>

      <section className="grid items-stretch gap-4 md:grid-cols-3">
        <article className="creator-jobs-kpi umkm-panel rounded-2xl border border-border bg-[#eef4ff] p-5 transition-[transform,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_18px_30px_-26px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between gap-2">
            <p className="font-label text-[10px] tracking-[0.15em] text-foreground-subtle">Open Jobs</p>
            <BriefcaseBusiness className="size-4 text-[#1d4ed8]" aria-hidden="true" />
          </div>
          <p className="mt-2 font-heading text-4xl tracking-tight">{highlights.totalJobs}</p>
        </article>
        <article className="creator-jobs-kpi umkm-panel rounded-2xl border border-border bg-[#eefaf2] p-5 transition-[transform,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_18px_30px_-26px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between gap-2">
            <p className="font-label text-[10px] tracking-[0.15em] text-foreground-subtle">Low Competition</p>
            <BarChart3 className="size-4 text-[#247a52]" aria-hidden="true" />
          </div>
          <p className="mt-2 font-heading text-4xl tracking-tight">{highlights.lowCompetition}</p>
        </article>
        <article className="creator-jobs-kpi umkm-panel rounded-2xl border border-border bg-[#fff3f3] p-5 transition-[transform,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_18px_30px_-26px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between gap-2">
            <p className="font-label text-[10px] tracking-[0.15em] text-foreground-subtle">Urgent Slots</p>
            <Flame className="size-4 text-[#b63939]" aria-hidden="true" />
          </div>
          <p className="mt-2 font-heading text-4xl tracking-tight">{highlights.urgentSlots}</p>
        </article>
      </section>

      <section className="umkm-panel rounded-2xl border border-border p-4 md:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-heading text-3xl tracking-tight">Opportunity List</h2>
            <p className="mt-1 text-sm text-foreground-muted">Urutkan berdasarkan kompetisi dan kapasitas slot untuk strategi intake job yang lebih sehat.</p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <label className="inline-flex min-h-10 w-full items-center gap-2 rounded-xl border border-border bg-background px-3 text-sm text-foreground-muted transition-colors duration-200 focus-within:border-border-strong focus-within:bg-white sm:w-[320px]">
              <Search className="size-4" aria-hidden="true" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="cari brand / campaign / niche"
                aria-label="Cari campaign creator"
                className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground-subtle"
              />
            </label>

            <select
              value={competition}
              onChange={(event) => setCompetition(event.target.value as "all" | CreatorJobOpportunity["competitionLevel"])}
              aria-label="Filter kompetisi"
              className="min-h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors duration-200 hover:border-border-strong focus-visible:border-border-strong focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
            >
              <option value="all">Kompetisi: Semua</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="mt-4 hidden overflow-x-auto rounded-xl border border-border bg-background/80 md:block">
          <table className="w-full min-w-[980px] border-collapse text-sm">
            <thead className="bg-surface/80">
              <tr className="text-left text-xs uppercase tracking-[0.08em] text-foreground-subtle">
                <th className="px-4 py-3">Campaign</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Niche</th>
                <th className="px-4 py-3">Payout / 1k Views</th>
                <th className="px-4 py-3">Min Target</th>
                <th className="px-4 py-3">Slots</th>
                <th className="px-4 py-3">Kompetisi</th>
                <th className="px-4 py-3">Deadline</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id} className="creator-jobs-row border-t border-border/80 transition-colors duration-200 hover:bg-surface/70">
                  <td className="px-4 py-3 font-medium text-foreground">{job.campaignTitle}</td>
                  <td className="px-4 py-3 text-foreground-muted">{job.brandName}</td>
                  <td className="px-4 py-3 text-foreground-muted">{job.niche}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{formatRupiah(job.payoutPer1kViewsIdr)}</td>
                  <td className="px-4 py-3 text-foreground-muted">{job.minTargetViews.toLocaleString("id-ID")}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#eef4ff] px-2.5 py-1 text-xs text-[#1d4ed8]">
                      <Users className="size-3" aria-hidden="true" />
                      {job.slotsRemaining}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex min-h-7 items-center rounded-full px-2.5 font-label text-[10px] tracking-[0.12em] uppercase ${competitionTone(job.competitionLevel)}`}>
                      {job.competitionLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground-muted">{job.deadline}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="inline-flex min-h-8 items-center rounded-lg border border-border px-3 text-xs text-foreground transition-[transform,background-color,border-color] duration-200 ease-quart-out motion-safe:hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4ed8]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      Ambil Brief
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-border-strong/60 bg-surface/45 px-4 py-5 text-sm text-foreground-muted">
            Tidak ada campaign yang cocok dengan filter saat ini. Coba ubah kata kunci atau level kompetisi.
          </div>
        ) : null}

        <div className="mt-4 space-y-3 md:hidden">
          {filteredJobs.map((job) => (
            <article
              key={job.id}
              className="creator-jobs-row rounded-xl border border-border bg-background p-4 transition-[transform,border-color,box-shadow] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-border-strong motion-safe:hover:shadow-[0_18px_28px_-24px_rgba(15,23,42,0.5)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium text-foreground">{job.campaignTitle}</h3>
                  <p className="mt-1 text-xs text-foreground-subtle">{job.brandName}</p>
                </div>
                <span className={`inline-flex min-h-7 items-center rounded-full px-2.5 font-label text-[10px] tracking-[0.12em] uppercase ${competitionTone(job.competitionLevel)}`}>
                  {job.competitionLevel}
                </span>
              </div>
              <div className="mt-3 space-y-1 text-sm text-foreground-muted">
                <p>Payout/1k: <span className="text-foreground">{formatRupiah(job.payoutPer1kViewsIdr)}</span></p>
                <p>Target: <span className="text-foreground">{job.minTargetViews.toLocaleString("id-ID")}</span></p>
                <p>Deadline: <span className="text-foreground">{job.deadline}</span></p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
