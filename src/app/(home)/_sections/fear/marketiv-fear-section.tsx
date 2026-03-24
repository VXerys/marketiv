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
    <section ref={sectionRef} className="relative bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1400px] px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
        <p className="fear-label font-label text-[10px] text-foreground-subtle">ANALISIS PASAR — MASALAH UTAMA</p>

        <h2 className="mt-5 overflow-hidden font-heading text-[clamp(2.3rem,6.2vw,5.2rem)] leading-[0.93] tracking-[-0.038em]">
          <span className="fear-heading-line block">MENGAPA UMKM</span>
          <span className="fear-heading-line block text-foreground-subtle">TAKUT?</span>
        </h2>

        <div className="fear-divider mt-10 h-px bg-border md:mt-12" />

        <div className="grid grid-cols-1 border-b border-border md:grid-cols-3">
          {FEAR_POINTS.map((point, index) => (
            <article
              key={point.number}
              className={`fear-card relative min-h-[480px] px-1 py-9 md:min-h-[520px] md:px-8 md:py-12 ${
                index < FEAR_POINTS.length - 1 ? "md:border-r md:border-border" : ""
              }`}
            >
              <p className="pointer-events-none absolute left-0 top-8 font-heading text-[clamp(5rem,7vw,7.3rem)] leading-none tracking-[-0.04em] text-foreground/[0.11] md:left-8 md:top-11">
                {point.number}
              </p>

              <div className="relative z-10 mt-20">
                <FearIcon type={point.icon} />

                <p className="mt-8 font-label text-[10px] text-foreground-subtle">{point.label}</p>

                <h3 className="mt-4 max-w-[340px] font-heading text-[clamp(2.1rem,3.5vw,3.15rem)] leading-[0.9] tracking-[-0.03em]">
                  {point.title}
                </h3>

                <p className="mt-7 max-w-[340px] text-body-sm leading-relaxed text-foreground-muted">{point.description}</p>

                <div className="mt-12 h-px max-w-[340px] bg-border" />

                <p className="mt-8 font-label text-[10px] text-foreground-subtle">MARKETIV SOLVES THIS</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
