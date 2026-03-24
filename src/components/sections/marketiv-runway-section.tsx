"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

interface RunwayStep {
  number: string;
  stepLabel: string;
  title: string;
  description: string;
}

const RUNWAY_STEPS: RunwayStep[] = [
  {
    number: "01",
    stepLabel: "STEP 01",
    title: "UNGGAH ASET",
    description: "Upload foto, video, atau deskripsi produk UMKM ke platform.",
  },
  {
    number: "02",
    stepLabel: "STEP 02",
    title: "AI MENYUSUN\nNASKAH",
    description: "Model AI kami mengurai brand voice dan menghasilkan brief kreatif.",
  },
  {
    number: "03",
    stepLabel: "STEP 03",
    title: "KREATOR KLAIM",
    description: "Micro-creator memilih campaign yang relevan dengan niche mereka.",
  },
  {
    number: "04",
    stepLabel: "STEP 04",
    title: "BAYAR PER VIEWS",
    description: "Dana escrow dilepas hanya setelah views terverifikasi. Zero risk.",
  },
];

const TICKER_ITEMS = [
  "AI BRIEF",
  "KREATOR KLAIM",
  "BAYAR PER VIEWS",
  "UNGGAH ASET",
  "AI BRIEF",
  "KREATOR KLAIM",
  "BAYAR PER VIEWS",
  "UNGGAH ASET",
];

export function MarketivRunwaySection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 60%",
            markers: false,
          },
        })
        .from(".runway-eyebrow", { y: 14, opacity: 0, duration: 0.35 })
        .from(".runway-title", { yPercent: 102, opacity: 0, duration: 0.65 }, "-=0.1")
        .from(".runway-divider", { scaleX: 0, transformOrigin: "left center", duration: 0.45 }, "-=0.25")
        .from(".runway-card", { y: 24, opacity: 0, duration: 0.5, stagger: 0.09 }, "-=0.2")
        .from(".runway-ticker-shell", { y: 8, opacity: 0, duration: 0.35 }, "-=0.18");

      gsap.to(".runway-ticker-track", {
        xPercent: -34,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.85,
          markers: false,
        },
      });
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
