"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { FearIcon } from "./fear-icon";
import { animateFearSection } from "./marketiv-fear-section.animations";
import { FEAR_POINTS } from "./marketiv-fear-section.data";

export function MarketivFearSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      animateFearSection(sectionRef.current);
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full min-h-[100dvh] overflow-x-hidden bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 pb-14 pt-12 md:px-10 md:pb-20 md:pt-16">
        <p className="fear-label font-label text-[10px] tracking-[0.2em] text-foreground-subtle">TANTANGAN UMKM DI PEMASARAN DIGITAL</p>

        <h2 className="mt-5 overflow-hidden font-heading text-[clamp(2.2rem,6vw,5rem)] leading-[0.93] tracking-[-0.038em]">
          <span className="fear-heading-line block">TIGA HAMBATAN</span>
          <span className="fear-heading-line block text-foreground-subtle">YANG MENEKAN ROI</span>
        </h2>

        <div className="fear-divider mt-10 h-px bg-border md:mt-12" />

        <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {FEAR_POINTS.map((point) => (
            <article
              key={point.number}
              className="fear-card group relative px-1 py-10 md:px-7 md:py-12"
            >
              <p className="pointer-events-none absolute left-0 top-10 font-heading text-[clamp(5rem,8vw,8rem)] leading-none tracking-[-0.04em] text-foreground/[0.08] dark:text-foreground/[0.05] md:left-8 md:top-12">
                {point.number}
              </p>

              <div className="relative z-10 mt-16 md:mt-20">
                <FearIcon type={point.icon} />

                <p className="mt-8 font-label text-[10px] tracking-[0.1em] text-foreground-subtle">{point.label}</p>

                <h3 className="mt-4 max-w-[18ch] font-heading text-[clamp(2rem,3.8vw,3.2rem)] leading-[0.9] tracking-[-0.03em]">
                  {point.title}
                </h3>

                <p className="mt-6 max-w-sm text-body-sm leading-relaxed text-foreground-muted md:mt-8">
                  {point.description}
                </p>

                <div className="mt-10 h-px w-full max-w-[80px] bg-border group-hover:bg-foreground/30 transition-colors" />

                <p className="mt-8 font-label text-[10px] tracking-[0.05em] text-foreground-subtle uppercase">MARKETIV MENUTUP CELAH INI</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
