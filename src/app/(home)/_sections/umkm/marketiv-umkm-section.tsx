"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { animateUmkmSection } from "./marketiv-umkm-section.animations";
import { ESCROW_ROWS, UMKM_FEATURES } from "./marketiv-umkm-section.data";
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
    <section ref={sectionRef} className="w-full min-h-[100dvh] overflow-x-hidden border-b border-border bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-0">
          <div className="border border-border bg-background px-5 py-8 md:px-8 md:py-12 lg:col-span-7 lg:border-r-0">
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

            <div className="umkm-ai-brief mt-6 border border-border px-5 py-5 md:px-6">
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
          </div>

          <div className="border border-border bg-background px-6 py-10 md:px-10 md:py-14 lg:col-span-5 lg:border-l-0">
            <p className="umkm-edition-eyebrow font-label text-[10px] tracking-[0.2em] text-foreground-subtle lowercase">SISI UMKM — EDISI 2/2</p>

            <h2 className="mt-5 overflow-hidden font-heading text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.9] tracking-[-0.04em] text-foreground">
              <span className="umkm-title-line block">EDISI 2:</span>
              <span className="umkm-title-line block text-foreground-subtle italic">UMKM BERTUMBUH</span>
            </h2>

            <div className="mt-10 divide-y divide-border border-t border-border">
              {UMKM_FEATURES.map((feature) => (
                <article key={feature.title} className="umkm-feature py-8">
                  <p className="font-label text-[9px] tracking-[0.1em] text-foreground-subtle uppercase">{feature.label}</p>
                  <h3 className="mt-2 font-heading text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.92] tracking-[-0.025em]">{feature.title}</h3>
                  <p className="mt-4 max-w-md text-body-sm leading-relaxed text-foreground-muted/85">{feature.description}</p>
                </article>
              ))}
            </div>

            <Link
              href="/panduan/umkm"
              className="umkm-cta mt-10 inline-flex min-h-12 w-full items-center justify-between border border-foreground bg-foreground px-6 py-3 font-label text-[10px] tracking-[0.15em] text-background transition-opacity hover:opacity-90 md:max-w-[280px]"
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
