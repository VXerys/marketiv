"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

interface FearPoint {
  number: string;
  label: string;
  title: string;
  description: string;
  icon: "financial" | "quality" | "literacy";
}

const FEAR_POINTS: FearPoint[] = [
  {
    number: "01",
    label: "SISTEM RATE CARD KONVENSIONAL",
    title: "RISIKO FINANSIAL",
    description:
      "Bayar di muka tanpa jaminan. Kreator belum posting, budget sudah ludes. Model lama tidak punya safeguard.",
    icon: "financial",
  },
  {
    number: "02",
    label: "MANIPULASI BOT & VIEWS PALSU",
    title: "KUALITAS RENDAH",
    description:
      "Metrik terlihat besar, konversi nol. Bot memenuhi laporan engagement. UMKM tidak punya cara verifikasi.",
    icon: "quality",
  },
  {
    number: "03",
    label: "KESULITAN MENYUSUN BRIEF",
    title: "LITERASI DIGITAL",
    description:
      "UMKM tidak tahu cara komunikasi kreatif. Brief buruk menghasilkan konten buruk. Lingkaran setan.",
    icon: "literacy",
  },
];

function FearIcon({ type }: { type: FearPoint["icon"] }) {
  if (type === "financial") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-11 text-foreground">
        <rect x="1.5" y="1.5" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <path d="M5 17l4-5 3 3 6-8" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M16 7h2.8V9.8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }

  if (type === "quality") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-11 text-foreground">
        <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="12" cy="12" r="1.3" fill="currentColor" />
        <path d="M12 1.5v5M12 17.5v5M1.5 12h5M17.5 12h5" fill="none" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-11 text-foreground">
      <rect x="4" y="2.5" width="12" height="18" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M7 7h6M7 10.5h6M7 14h4" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <rect x="16" y="13" width="4.8" height="7.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M17.7 16.5h1.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function MarketivFearSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            markers: false,
          },
        })
        .from(".fear-label", { y: 16, opacity: 0, duration: 0.4 })
        .from(".fear-heading-line", { yPercent: 105, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.15")
        .from(".fear-divider", { scaleX: 0, duration: 0.45, transformOrigin: "left center" }, "-=0.25")
        .from(".fear-card", { y: 24, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.15");
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
