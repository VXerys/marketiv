"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { animateRunwaySection } from "./marketiv-runway-section.animations";
import { RUNWAY_STEPS, TICKER_ITEMS } from "./marketiv-runway-section.data";

export function MarketivRunwaySection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      animateRunwaySection(sectionRef.current);
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full min-h-[100dvh] overflow-x-hidden border-y border-border bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 pt-12 md:px-10 md:pt-20">
        <p className="runway-eyebrow font-label text-[10px] tracking-[0.2em] text-foreground-subtle lowercase">ALUR EKSEKUSI — 4 TAHAP CEPAT</p>

        <h2 className="runway-title mt-5 font-heading text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.9] tracking-[-0.04em]">GROWTH RUNWAY.</h2>

        <div className="runway-divider mt-12 h-px bg-border md:mt-16" />

        <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x lg:grid-cols-4">
          {RUNWAY_STEPS.map((step) => (
            <article
              key={step.number}
              className="runway-card group relative flex min-h-[340px] flex-col justify-end px-4 py-10 transition-colors hover:bg-surface/20 md:px-7 md:py-12"
            >
              <p className="pointer-events-none absolute left-4 top-12 font-heading text-[clamp(5rem,9vw,8rem)] leading-none tracking-[-0.04em] text-foreground/[0.08] dark:text-foreground/[0.04] md:left-8 md:top-14">
                {step.number}
              </p>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-3">
                  <span className="inline-flex size-5 items-center justify-center border border-foreground/50 transition-colors group-hover:border-foreground">
                    <span className="inline-block size-1.5 rounded-full bg-foreground/60 transition-transform group-hover:scale-125 group-hover:bg-foreground" />
                  </span>
                  <span className="font-label text-[9px] tracking-[0.15em] text-foreground-subtle uppercase">{step.stepLabel}</span>
                </div>

                <h3 className="mt-6 whitespace-pre-line font-heading text-[clamp(2rem,3.5vw,3rem)] leading-[0.92] tracking-[-0.03em]">
                  {step.title}
                </h3>

                <p className="mt-8 max-w-[28ch] text-body-sm leading-relaxed text-foreground-muted/80">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="runway-ticker-shell overflow-hidden border-t border-border bg-surface/10 py-4">
        <div className="runway-ticker-track no-scrollbar inline-flex min-w-max items-center whitespace-nowrap pl-6 md:pl-10">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center font-label text-[9px] tracking-[0.2em] text-foreground-subtle/70 uppercase">
              {item}
              <span className="mx-10 size-1 rounded-full bg-foreground/20" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
