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
    <section ref={sectionRef} className="border-y border-border bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1400px] px-5 pt-14 md:px-10 md:pt-20">
        <p className="runway-eyebrow font-label text-[10px] tracking-[0.26em] text-foreground-subtle">CARA KERJA - 4 LANGKAH</p>

        <h2 className="runway-title mt-4 font-heading text-[clamp(2.65rem,7vw,5.8rem)] leading-[0.9] tracking-[-0.04em]">THE RUNWAY.</h2>

        <div className="runway-divider mt-11 h-px bg-border md:mt-12" />

        <div className="grid grid-cols-1 border-b border-border md:grid-cols-2 lg:grid-cols-4">
          {RUNWAY_STEPS.map((step, index) => (
            <article
              key={step.number}
              className={`runway-card relative min-h-[352px] px-4 py-9 md:min-h-[388px] md:px-8 md:py-11 ${
                index < RUNWAY_STEPS.length - 1 ? "lg:border-r lg:border-border" : ""
              } ${index % 2 === 0 ? "md:border-r md:border-border lg:border-r" : ""}`}
            >
              <p className="pointer-events-none absolute left-4 top-14 font-heading text-[clamp(5rem,7.2vw,7.25rem)] leading-none tracking-[-0.04em] text-foreground/[0.1] md:left-8 md:top-16">
                {step.number}
              </p>

              <div className="relative z-10 mt-20 md:mt-22">
                <div className="inline-flex items-center gap-3">
                  <span className="inline-flex size-5 items-center justify-center border border-foreground/70">
                    <span className="inline-block size-1.5 rounded-full bg-foreground" />
                  </span>
                  <span className="font-label text-[9px] tracking-[0.2em] text-foreground-subtle">{step.stepLabel}</span>
                </div>

                <h3 className="mt-6 whitespace-pre-line font-heading text-[clamp(2rem,3.2vw,3.1rem)] leading-[0.92] tracking-[-0.03em]">
                  {step.title}
                </h3>

                <p className="mt-7 max-w-[290px] text-body-sm leading-relaxed text-foreground-muted">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="runway-ticker-shell overflow-hidden border-t border-border py-3">
        <div className="runway-ticker-track no-scrollbar inline-flex min-w-max items-center whitespace-nowrap pl-5 md:pl-10">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
            <span key={`${item}-${index}`} className="font-label text-[9px] tracking-[0.22em] text-foreground-subtle">
              {item}
              <span className="mx-8 text-foreground/[0.35]">.</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
