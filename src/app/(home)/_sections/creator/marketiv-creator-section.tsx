"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { animateCreatorSection } from "./marketiv-creator-section.animations";
import { CREATOR_FEATURES, CREATOR_METRICS } from "./marketiv-creator-section.data";

export function MarketivCreatorSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      animateCreatorSection(sectionRef.current);
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full min-h-[100dvh] overflow-x-hidden border-y border-border bg-foreground text-background">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-0">
          <div className="flex flex-col border border-background/20 bg-foreground px-6 py-8 md:px-10 md:py-12 lg:col-span-5 lg:border-r-0">
            <p className="creator-eyebrow font-label text-[10px] tracking-[0.2em] text-background/60 lowercase">SISI KREATOR — EDISI 1/2</p>

            <h2 className="mt-5 overflow-hidden font-heading text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.9] tracking-[-0.038em]">
              <span className="creator-title-line block">EDISI 1:</span>
              <span className="creator-title-line block text-background/80">KREATOR MIKRO</span>
            </h2>

            <p className="creator-intro mt-6 max-w-lg text-body-sm leading-relaxed text-background/70 md:mt-8">
              Tingkatkan pendapatan dengan brief siap eksekusi, metrik performa real-time, dan peluang campaign berulang dari brand
              UMKM aktif.
            </p>

            <div className="mt-10 divide-y divide-background/15 border-y border-background/15">
              {CREATOR_FEATURES.map((feature) => (
                <article key={feature.id} className="creator-feature py-6">
                  <p className="font-label text-[10px] tracking-[0.1em] text-background/50 lowercase">{feature.id}</p>
                  <h3 className="mt-2 font-heading text-[clamp(1.6rem,2.5vw,2.4rem)] leading-[0.94] tracking-[-0.02em]">{feature.title}</h3>
                  <p className="mt-3 max-w-md text-body-sm leading-relaxed text-background/65">{feature.description}</p>
                </article>
              ))}
            </div>

            <Link
              href="/panduan/kreator"
              className="creator-cta mt-10 inline-flex min-h-12 w-full items-center justify-between border border-background/25 bg-transparent px-6 py-3 font-label text-[10px] tracking-[0.15em] transition-all duration-300 ease-expo-out hover:border-background/60 hover:bg-background hover:text-foreground md:max-w-xs"
            >
              LIHAT PANDUAN KREATOR
              <span aria-hidden="true" className="ml-2 text-xs">→</span>
            </Link>
          </div>

          <div className="creator-visual relative flex flex-col border border-background/20 bg-background/5 lg:col-span-7 lg:border-l-0">
            <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1fr_280px]">
              <div className="relative flex h-full w-full min-h-[400px] items-center justify-center overflow-visible p-6 md:min-h-[500px] md:p-8 lg:min-h-0 lg:p-10">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:38px_38px]" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-foreground/88 via-foreground/42 to-foreground/74" />
                  <div className="absolute -right-14 top-10 h-44 w-44 rounded-full bg-white/20 blur-3xl" />
                  <div className="absolute -left-10 bottom-8 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
                </div>

                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[15]">
                  <div className="creator-ui-orb absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/20 blur-[80px] md:h-36 md:w-36" />

                  <span className="creator-ui-tag creator-ui-tag-float absolute left-2 top-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/80 shadow-lg backdrop-blur-md md:left-8 md:top-8 md:px-4 md:py-2 md:text-xs">
                    🔥 F&amp;B Category
                  </span>

                  <span className="creator-ui-tag creator-ui-tag-float absolute right-2 top-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/80 shadow-lg backdrop-blur-md md:right-8 md:top-14 md:px-4 md:py-2 md:text-xs">
                    ✨ Verified Match
                  </span>

                  <span className="creator-ui-tag creator-ui-tag-float absolute bottom-7 left-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/80 shadow-lg backdrop-blur-md md:bottom-14 md:left-12 md:px-4 md:py-2 md:text-xs">
                    📈 High ROAS
                  </span>

                  <span className="creator-ui-tag creator-ui-tag-float absolute bottom-8 right-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/80 shadow-lg backdrop-blur-md md:bottom-20 md:right-14 md:px-4 md:py-2 md:text-xs">
                    ⚡ Fast Approval
                  </span>
                </div>

                <article className="creator-ui-card creator-ui-main creator-ui-float relative z-10 w-full max-w-[520px] rotate-[-2deg] rounded-3xl border border-white/20 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(245,247,250,0.92))] p-5 text-slate-900 shadow-[0_24px_55px_-24px_rgba(0,0,0,0.65)] backdrop-blur-md md:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-2xl border border-slate-300 bg-white font-label text-[10px] tracking-[0.1em] text-slate-700">
                        KP
                      </span>
                      <div>
                        <p className="font-label text-[9px] tracking-[0.15em] text-slate-500">CREATOR PROFILE</p>
                        <p className="font-label text-[11px] text-slate-800">@kreator.pro</p>
                      </div>
                    </div>

                    <span className="inline-flex min-h-7 items-center rounded-full border border-slate-300/80 bg-slate-50 px-2.5 font-label text-[9px] tracking-[0.12em] text-slate-700">
                      VERIFIED MATCH
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 border-t border-slate-200/90 pt-4">
                    <p className="font-label text-[9px] tracking-[0.15em] text-slate-500">CAMPAIGN BRIEF</p>
                    <h4 className="font-heading text-[clamp(1.45rem,3vw,2rem)] leading-[0.9] tracking-[-0.025em] text-slate-900">Launch Paket Kopi Lokal</h4>

                    <ul className="space-y-2 text-xs leading-relaxed text-slate-600">
                      <li className="flex items-center gap-2">
                        <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-slate-900" />
                        Hook video 6 detik pertama.
                      </li>
                      <li className="flex items-center gap-2">
                        <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-slate-900" />
                        Fokus manfaat produk + CTA jelas.
                      </li>
                      <li className="flex items-center gap-2">
                        <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-slate-900" />
                        Kirim draft final dalam 24 jam.
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5 space-y-2 border-t border-slate-200/90 pt-4">
                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span className="font-label tracking-[0.14em]">BRIEF PROGRESS</span>
                      <span className="font-label text-slate-900">78%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <span className="block h-full w-[78%] rounded-full bg-slate-900" />
                    </div>
                  </div>
                </article>

                <article className="creator-ui-card creator-ui-stat creator-ui-float absolute -bottom-5 -left-3 z-20 w-[220px] rotate-[2deg] rounded-2xl border border-white/20 bg-black/40 p-4 text-background shadow-[0_22px_40px_-24px_rgba(0,0,0,0.72)] backdrop-blur-md sm:-left-6 sm:w-[240px]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-label text-[9px] tracking-[0.16em] text-background/70">MATCH QUALITY</p>
                      <p className="mt-2 font-heading text-[1.9rem] leading-none tracking-[-0.03em]">100%</p>
                    </div>

                    <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/25 bg-white/10">
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 15l5-5 3 3 6-6" />
                        <path d="M14 7h5v5" />
                      </svg>
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] leading-relaxed text-background/75">Brief UMKM dan persona kreator saling cocok untuk mempercepat approval campaign.</p>
                </article>

                <article className="creator-ui-card creator-ui-mini creator-ui-float absolute -top-4 right-1 z-20 w-[200px] rotate-[-3deg] rounded-2xl border border-white/20 bg-white/10 p-4 text-background shadow-[0_20px_38px_-24px_rgba(0,0,0,0.68)] backdrop-blur-md sm:-right-4 sm:w-[220px]">
                  <p className="font-label text-[9px] tracking-[0.16em] text-background/65">CAMPAIGN MOMENTUM</p>

                  <div className="mt-3 flex items-end justify-between gap-2">
                    <div>
                      <p className="font-heading text-[1.7rem] leading-none tracking-[-0.03em]">+38%</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-background/75">Response rate naik minggu ini.</p>
                    </div>

                    <svg viewBox="0 0 48 36" className="h-9 w-12 text-background/80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 28L14 20L22 23L33 11L44 8" />
                      <path d="M37 8H44V15" />
                    </svg>
                  </div>
                </article>
              </div>

              <aside className="creator-metric-card flex flex-col justify-center border-t border-background/20 bg-foreground/80 p-6 backdrop-blur-md md:p-8 lg:border-l lg:border-t-0 lg:p-6">
                <p className="font-label text-[10px] tracking-[0.2em] text-background/60 lowercase">METRICS SNAPSHOT</p>

                <div className="mt-6 grid grid-cols-2 gap-6 border-t border-background/15 pt-6 lg:grid-cols-1 lg:gap-8">
                  {CREATOR_METRICS.map((metric) => (
                    <div key={metric.label}>
                      <p className="font-heading text-[1.8rem] leading-none tracking-[-0.03em] text-background md:text-3xl">{metric.value}</p>
                      <p className="mt-2 text-[11px] leading-snug text-background/60 uppercase tracking-wider">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
