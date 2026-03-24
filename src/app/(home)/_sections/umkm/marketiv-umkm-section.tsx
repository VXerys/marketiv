"use client";

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
    <section ref={sectionRef} className="overflow-x-clip border-b border-border bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-10 md:px-10 md:py-14">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-start lg:gap-0">
          <div className="border border-border bg-background px-4 py-7 md:px-8 md:py-10 lg:col-span-7 lg:border-r-0">
            <p className="umkm-table-eyebrow font-label text-[10px] tracking-[0.26em] text-foreground-subtle">
              ESCROW ANALYTICS - LIVE CAMPAIGN STATUS
            </p>

            <div className="umkm-table-shell mt-5 overflow-x-auto border border-border">
              <table className="min-w-[620px] border-collapse text-left md:min-w-full">
                <thead>
                  <tr className="bg-foreground text-background">
                    <th className="px-3 py-3 font-label text-[9px] tracking-[0.18em]">CREATOR</th>
                    <th className="px-3 py-3 font-label text-[9px] tracking-[0.18em]">NICHE</th>
                    <th className="px-3 py-3 font-label text-[9px] tracking-[0.18em]">VIEWS</th>
                    <th className="px-3 py-3 font-label text-[9px] tracking-[0.18em]">STATUS</th>
                    <th className="px-3 py-3 font-label text-[9px] tracking-[0.18em]">ESCROW</th>
                  </tr>
                </thead>

                <tbody>
                  {ESCROW_ROWS.map((row) => (
                    <tr key={row.creator} className="border-t border-border">
                      <td className="px-3 py-4 font-label text-[11px] tracking-[0.02em] text-foreground">{row.creator}</td>
                      <td className="px-3 py-4 text-[13px] text-foreground-subtle">{row.niche}</td>
                      <td className="px-3 py-4 font-label text-[12px] text-foreground">{row.views}</td>
                      <td className="px-3 py-4">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-3 py-4 text-[13px] text-foreground-muted">{row.escrow}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="umkm-ai-brief mt-5 border border-border px-3 py-4 md:px-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex size-5 items-center justify-center border border-border-strong/40">
                  <span className="inline-block size-1.5 bg-foreground-subtle" />
                </span>

                <div>
                  <p className="font-label text-[9px] tracking-[0.2em] text-foreground-subtle">AI BRIEF GENERATOR</p>
                  <p className="mt-1 text-body-sm text-foreground-muted">Brief campaign siap pakai dalam kurang dari 30 detik dengan arahan AI.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-border bg-background px-5 py-7 md:px-8 md:py-10 lg:col-span-5 lg:border-l-0">
            <p className="umkm-edition-eyebrow font-label text-[10px] tracking-[0.26em] text-foreground-subtle">SISI UMKM - EDISI 2/2</p>

            <h2 className="mt-4 overflow-hidden font-heading text-[clamp(2.3rem,5.2vw,4.8rem)] leading-[0.9] tracking-[-0.04em] text-foreground">
              <span className="umkm-title-line block">EDISI 2:</span>
              <span className="umkm-title-line block text-foreground-subtle">UMKM BERTUMBUH</span>
            </h2>

            <div className="mt-6 divide-y divide-border border-t border-border">
              {UMKM_FEATURES.map((feature) => (
                <article key={feature.title} className="umkm-feature py-5 md:py-6">
                  <p className="font-label text-[9px] tracking-[0.2em] text-foreground-subtle">{feature.label}</p>
                  <h3 className="mt-2 font-heading text-[clamp(1.75rem,2.45vw,2.65rem)] leading-[0.92] tracking-[-0.025em]">{feature.title}</h3>
                  <p className="mt-2.5 max-w-[520px] text-body-sm leading-relaxed text-foreground-muted">{feature.description}</p>
                </article>
              ))}
            </div>

            <a
              href="/login"
              className="umkm-cta mt-7 inline-flex w-full items-center justify-between border border-foreground bg-foreground px-5 py-3 font-label text-[10px] tracking-[0.2em] text-background transition-opacity hover:opacity-90 md:w-[280px]"
            >
              MULAI CAMPAIGN UMKM
              <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
