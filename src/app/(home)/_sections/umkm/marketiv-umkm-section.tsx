"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { animateUmkmSection } from "./marketiv-umkm-section.animations";
import {
  ESCROW_ROWS,
  UMKM_CREATOR_AVATARS,
  UMKM_FEATURES,
  UMKM_GROWTH_METRICS,
  UMKM_PULSE_SIGNALS,
} from "./marketiv-umkm-section.data";
import { StatusBadge } from "./marketiv-umkm-status-badge";

export function MarketivUmkmSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      animateUmkmSection(sectionRef.current);
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative isolate flex w-full min-h-[100dvh] items-center overflow-x-hidden border-b border-border bg-background py-16 text-foreground md:py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-16 top-24 h-72 w-72 rounded-full bg-foreground/6 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -right-20 bottom-16 h-80 w-80 rounded-full bg-foreground/8 blur-3xl md:h-[28rem] md:w-[28rem]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,24,39,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,24,39,0.05)_1px,transparent_1px)] bg-[size:46px_46px] opacity-25" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-6 xl:gap-8">
          <div className="flex h-full flex-col border border-border bg-background px-5 py-8 md:px-8 md:py-12 lg:col-span-7 lg:border-r-0 lg:px-10 lg:py-14">
            <p className="umkm-table-eyebrow font-label text-[10px] tracking-[0.2em] text-foreground-subtle uppercase">
              ESCROW ANALYTICS — LIVE CAMPAIGN STATUS
            </p>

            <div className="umkm-table-shell mt-6 hidden overflow-hidden border border-border md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-foreground text-background">
                    <th className="px-4 py-3 font-label text-[9px] tracking-[0.15em]">CREATOR</th>
                    <th className="px-4 py-3 font-label text-[9px] tracking-[0.15em]">NICHE</th>
                    <th className="px-4 py-3 font-label text-[9px] tracking-[0.15em]">VIEWS</th>
                    <th className="px-4 py-3 font-label text-[9px] tracking-[0.15em]">STATUS</th>
                    <th className="px-4 py-3 font-label text-[9px] tracking-[0.15em]">ESCROW</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {ESCROW_ROWS.map((row) => (
                    <tr key={row.creator} className="transition-colors hover:bg-surface/30">
                      <td className="px-4 py-4 font-label text-[10px] tracking-tight text-foreground">{row.creator}</td>
                      <td className="px-4 py-4 text-xs text-foreground-muted">{row.niche}</td>
                      <td className="px-4 py-4 font-label text-[11px] text-foreground">{row.views}</td>
                      <td className="px-4 py-4">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-4 py-4 text-xs text-foreground-muted">{row.escrow}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="umkm-table-shell mt-6 space-y-3 md:hidden">
              {ESCROW_ROWS.map((row) => (
                <article key={row.creator} className="border border-border bg-background p-4 transition-all active:scale-[0.98]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-label text-[11px] tracking-tight text-foreground">{row.creator}</p>
                      <p className="mt-1 text-[11px] text-foreground-subtle">{row.niche}</p>
                    </div>
                    <StatusBadge status={row.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4 text-[11px] text-foreground-muted">
                    <div>
                      <span className="block text-[9px] font-label text-foreground-subtle uppercase mb-1">Views</span>
                      <span className="font-label text-foreground">{row.views}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-label text-foreground-subtle uppercase mb-1">Escrow</span>
                      <span className="font-label text-foreground">{row.escrow}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="umkm-ai-brief mt-8 border border-border px-5 py-5 md:px-6">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-6 shrink-0 items-center justify-center border border-border-strong/30">
                  <span className="inline-block size-2 bg-foreground/60" />
                </span>

                <div>
                  <p className="font-label text-[9px] tracking-[0.2em] text-foreground-subtle">AI BRIEF GENERATOR</p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground-muted/80">Brief campaign siap pakai dalam kurang dari 30 detik dengan arahan AI.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-auto lg:pt-8">
              <article className="umkm-premium-card umkm-glass-float relative overflow-hidden rounded-2xl border border-foreground/12 bg-foreground/5 px-5 py-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)] backdrop-blur-md md:px-6">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/10 via-transparent to-foreground/5 opacity-60" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/60 px-3 py-1 font-label text-[9px] tracking-[0.16em] text-foreground-subtle">
                    MARKETIV NETWORK
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-label text-[9px] tracking-[0.15em] text-foreground-subtle">{UMKM_GROWTH_METRICS[0]?.label}</p>
                      <p className="mt-2 font-heading text-[clamp(2rem,5vw,3rem)] leading-none tracking-[-0.03em] text-foreground">{UMKM_GROWTH_METRICS[0]?.value}</p>
                    </div>

                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-foreground/20 bg-background/70 text-foreground">
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 15l5-5 3 3 6-6" />
                        <path d="M14 7h5v5" />
                      </svg>
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-foreground-muted/90">{UMKM_GROWTH_METRICS[0]?.trend}</p>
                </div>
              </article>

              <article className="umkm-premium-card umkm-glass-float relative overflow-hidden rounded-2xl border border-foreground/12 bg-background/65 px-5 py-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)] backdrop-blur-md md:px-6">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-foreground/8 via-transparent to-foreground/4 opacity-70" />
                <div className="relative z-10">
                  <p className="font-label text-[9px] tracking-[0.16em] text-foreground-subtle">CAMPAIGN PULSE</p>

                  <p className="mt-2 font-heading text-[clamp(1.65rem,4.2vw,2.2rem)] leading-[0.95] tracking-[-0.03em] text-foreground">{UMKM_GROWTH_METRICS[1]?.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-foreground-muted/90">{UMKM_GROWTH_METRICS[1]?.trend}</p>

                  <ul className="mt-4 space-y-2 border-t border-foreground/10 pt-3">
                    {UMKM_PULSE_SIGNALS.map((signal) => (
                      <li key={signal.label} className="flex items-center justify-between gap-3 text-xs">
                        <span className="font-label tracking-[0.1em] text-foreground-subtle">{signal.label}</span>
                        <span className="font-label text-foreground">{signal.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <article className="umkm-premium-card umkm-glass-float umkm-community-card relative overflow-hidden rounded-3xl border border-foreground/12 bg-background/70 px-5 py-5 shadow-[0_20px_44px_-30px_rgba(15,23,42,0.5)] backdrop-blur-md sm:col-span-2 md:px-6 md:py-6">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(17,24,39,0.14),transparent_55%)]" />

                <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-label text-[9px] tracking-[0.18em] text-foreground-subtle">KOMUNITAS KREATOR AKTIF</p>
                    <h3 className="mt-2 font-heading text-[clamp(1.35rem,3vw,2rem)] leading-[0.95] tracking-[-0.025em] text-foreground">Kolaborasi Harian Dengan UMKM Bertumbuh</h3>
                    <p className="mt-2 text-xs leading-relaxed text-foreground-muted/90">Creator komunitas membantu UMKM menjalankan brief terstruktur dengan ritme campaign yang konsisten.</p>
                  </div>

                  <div className="flex flex-col gap-3 md:items-end">
                    <div className="flex items-center -space-x-3">
                      {UMKM_CREATOR_AVATARS.map((avatar, index) => (
                        <span
                          key={avatar.id}
                          className={`umkm-community-avatar inline-flex size-10 items-center justify-center rounded-full border-2 border-background font-label text-[10px] tracking-[0.08em] ${avatar.toneClass}`}
                          style={{ zIndex: UMKM_CREATOR_AVATARS.length - index }}
                        >
                          {avatar.initials}
                        </span>
                      ))}

                      <span className="umkm-community-avatar inline-flex size-10 items-center justify-center rounded-full border-2 border-background bg-background font-label text-[10px] tracking-[0.08em] text-foreground">
                        +4K
                      </span>
                    </div>

                    <p className="font-label text-[10px] tracking-[0.12em] text-foreground-subtle">47K+ creator aktif di ekosistem Marketiv</p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="flex h-full flex-col border border-border bg-background px-6 py-10 md:px-10 md:py-14 lg:col-span-5 lg:border-l-0 lg:px-12 lg:py-16">
            <p className="umkm-edition-eyebrow font-label text-[10px] tracking-[0.2em] text-foreground-subtle lowercase">SISI UMKM — EDISI 2/2</p>

            <h2 className="mt-5 overflow-hidden font-heading text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.9] tracking-[-0.04em] text-foreground">
              <span className="umkm-title-line block">EDISI 2:</span>
              <span className="umkm-title-line block text-foreground-subtle italic">UMKM BERTUMBUH</span>
            </h2>

            <div className="mt-8 flex-1 divide-y divide-border border-t border-border md:mt-10">
              {UMKM_FEATURES.map((feature) => (
                <article key={feature.title} className="umkm-feature py-7 md:py-8">
                  <p className="font-label text-[9px] tracking-[0.1em] text-foreground-subtle uppercase">{feature.label}</p>
                  <h3 className="mt-2 font-heading text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.92] tracking-[-0.025em]">{feature.title}</h3>
                  <p className="mt-4 max-w-lg text-body-sm leading-relaxed text-foreground-muted/85">{feature.description}</p>
                </article>
              ))}
            </div>

            <Link
              href="/panduan/umkm"
              className="umkm-cta mt-8 inline-flex min-h-12 w-full items-center justify-between border border-foreground bg-foreground px-6 py-3 font-label text-[10px] tracking-[0.15em] text-background transition-opacity hover:opacity-90 md:mt-10 md:max-w-[320px]"
            >
              LIHAT PANDUAN UMKM
              <span aria-hidden="true" className="text-xs">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
