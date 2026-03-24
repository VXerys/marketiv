"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

type EscrowStatus = "VERIFIED" | "PROCESSING";

interface EscrowRow {
  creator: string;
  niche: string;
  views: string;
  status: EscrowStatus;
  escrow: string;
}

interface UmkmFeature {
  label: string;
  title: string;
  description: string;
}

const ESCROW_ROWS: EscrowRow[] = [
  {
    creator: "@haniafood",
    niche: "Kuliner",
    views: "128K",
    status: "VERIFIED",
    escrow: "Rp 320K",
  },
  {
    creator: "@stylebyara",
    niche: "Fashion",
    views: "89K",
    status: "VERIFIED",
    escrow: "Rp 210K",
  },
  {
    creator: "@techwithbimo",
    niche: "Tech",
    views: "210K",
    status: "PROCESSING",
    escrow: "Rp 525K",
  },
  {
    creator: "@dapur.id",
    niche: "Kuliner",
    views: "75K",
    status: "VERIFIED",
    escrow: "Rp 190K",
  },
];

const UMKM_FEATURES: UmkmFeature[] = [
  {
    label: "KEAMANAN",
    title: "SISTEM ESCROW",
    description: "Dana terlindungi sampai kampanye selesai dan terverifikasi. Zero fraud.",
  },
  {
    label: "KECERDASAN",
    title: "AI BRIEF GEN",
    description: "Deskripsikan produkmu, AI susun brief kreatif siap pakai.",
  },
  {
    label: "TRANSPARANSI",
    title: "RATE CARD LIVE",
    description: "Harga transparan per views. Tidak ada biaya tersembunyi.",
  },
];

function StatusBadge({ status }: { status: EscrowStatus }) {
  const isVerified = status === "VERIFIED";

  return (
    <span
      className={`inline-flex min-w-[78px] items-center justify-center border px-2 py-1 font-label text-[9px] tracking-[0.16em] ${
        isVerified
          ? "border-foreground bg-foreground text-background"
          : "border-border-strong/45 bg-transparent text-foreground-subtle"
      }`}
    >
      {status}
    </span>
  );
}

export function MarketivUmkmSection() {
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
        .from(".umkm-table-eyebrow", { y: 16, opacity: 0, duration: 0.35 })
        .from(".umkm-table-shell", { y: 22, opacity: 0, duration: 0.55 }, "-=0.15")
        .from(".umkm-ai-brief", { y: 14, opacity: 0, duration: 0.4 }, "-=0.22")
        .from(".umkm-edition-eyebrow", { y: 12, opacity: 0, duration: 0.3 }, "-=0.25")
        .from(".umkm-title-line", { yPercent: 102, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.1")
        .from(".umkm-feature", { y: 18, opacity: 0, duration: 0.45, stagger: 0.1 }, "-=0.18")
        .from(".umkm-cta", { y: 12, opacity: 0, duration: 0.35 }, "-=0.15");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="border-b border-border bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-0">
          <div className="border border-border bg-background px-4 py-8 md:px-8 md:py-12 lg:border-r-0">
            <p className="umkm-table-eyebrow font-label text-[10px] tracking-[0.26em] text-foreground-subtle">
              ESCROW DASHBOARD - REAL-TIME
            </p>

            <div className="umkm-table-shell mt-5 overflow-x-auto border border-border">
              <table className="min-w-[760px] border-collapse text-left md:min-w-[620px]">
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

            <div className="umkm-ai-brief mt-6 border border-border px-3 py-4 md:px-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex size-5 items-center justify-center border border-border-strong/40">
                  <span className="inline-block size-1.5 bg-foreground-subtle" />
                </span>

                <div>
                  <p className="font-label text-[9px] tracking-[0.2em] text-foreground-subtle">AI BRIEF GENERATOR</p>
                  <p className="mt-1 text-body-sm text-foreground-muted">Naskah siap dalam &lt; 30 detik. Dikurasi AI.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-border bg-background px-5 py-8 md:px-9 md:py-12 lg:border-l-0">
            <p className="umkm-edition-eyebrow font-label text-[10px] tracking-[0.26em] text-foreground-subtle">EDITION 2 OF 2</p>

            <h2 className="mt-5 overflow-hidden font-heading text-[clamp(2.35rem,5.6vw,5.15rem)] leading-[0.9] tracking-[-0.04em] text-foreground">
              <span className="umkm-title-line block">EDITION 2:</span>
              <span className="umkm-title-line block text-foreground-subtle">UMKM</span>
            </h2>

            <div className="mt-8 divide-y divide-border border-t border-border">
              {UMKM_FEATURES.map((feature) => (
                <article key={feature.title} className="umkm-feature py-6 md:py-7">
                  <p className="font-label text-[9px] tracking-[0.2em] text-foreground-subtle">{feature.label}</p>
                  <h3 className="mt-2 font-heading text-[clamp(1.85rem,2.8vw,2.9rem)] leading-[0.92] tracking-[-0.025em]">{feature.title}</h3>
                  <p className="mt-3 max-w-[520px] text-body-sm leading-relaxed text-foreground-muted">{feature.description}</p>
                </article>
              ))}
            </div>

            <a
              href="/login"
              className="umkm-cta mt-9 inline-flex w-full items-center justify-center gap-3 border border-foreground bg-foreground px-5 py-3 font-label text-[10px] tracking-[0.2em] text-background transition-opacity hover:opacity-90 md:w-[210px]"
            >
              DAFTARKAN UMKM
              <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
