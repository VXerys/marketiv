"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

interface CreatorFeature {
  id: string;
  title: string;
  description: string;
}

interface CreatorMetric {
  label: string;
  value: string;
}

const CREATOR_FEATURES: CreatorFeature[] = [
  {
    id: "01",
    title: "PERFORMA YANG TERUKUR",
    description:
      "Setiap konten ditrack secara real-time. UMKM melihat performa aktual, kreator mendapat feedback yang jelas.",
  },
  {
    id: "02",
    title: "KONTROL BRIEF YANG JELAS",
    description:
      "Template brief membuat ekspektasi sinkron dari awal. Revisi lebih sedikit, hasil konten lebih tepat sasaran.",
  },
  {
    id: "03",
    title: "EKOSISTEM KAMPANYE BERULANG",
    description:
      "Bukan transaksi sekali jalan. Kreator yang konsisten dapat repeat campaign dan pendapatan yang stabil.",
  },
];

const CREATOR_METRICS: CreatorMetric[] = [
  { label: "Views tervalidasi", value: "2.8M+" },
  { label: "CPV rata-rata", value: "Rp48" },
  { label: "Kampanye aktif", value: "124" },
  { label: "Kreator bergabung", value: "4.3K" },
];

export function MarketivCreatorSection() {
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
        .from(".creator-eyebrow", { y: 14, opacity: 0, duration: 0.35 })
        .from(".creator-title-line", { yPercent: 105, opacity: 0, duration: 0.6, stagger: 0.09 }, "-=0.05")
        .from(".creator-intro", { y: 18, opacity: 0, duration: 0.45 }, "-=0.2")
        .from(".creator-feature", { y: 20, opacity: 0, duration: 0.45, stagger: 0.1 }, "-=0.2")
        .from(".creator-cta", { y: 14, opacity: 0, duration: 0.35 }, "-=0.15")
        .from(".creator-visual", { scale: 0.97, opacity: 0, duration: 0.55 }, "-=0.25")
        .from(".creator-metric-card", { x: 24, opacity: 0, duration: 0.45 }, "-=0.2");
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="border-y border-border bg-foreground text-background">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-0">
          <div className="flex h-full flex-col border border-background/20 bg-foreground px-5 py-8 md:px-9 md:py-12">
            <p className="creator-eyebrow font-label text-[10px] tracking-[0.26em] text-background/65">EDITION 1 OF 2</p>

            <h2 className="mt-5 overflow-hidden font-heading text-[clamp(2.3rem,5.4vw,4.9rem)] leading-[0.9] tracking-[-0.038em]">
              <span className="creator-title-line block">EDITION 1:</span>
              <span className="creator-title-line block text-background/82">KREATOR</span>
            </h2>

            <p className="creator-intro mt-6 max-w-[540px] text-body-sm leading-relaxed text-background/72">
              Marketiv menyiapkan alur kerja yang rapi untuk kreator mikro: brief lebih jelas, target lebih terukur, dan peluang
              kerja sama berulang yang lebih sehat.
            </p>

            <div className="mt-9 divide-y divide-background/20 border-y border-background/20">
              {CREATOR_FEATURES.map((feature) => (
                <article key={feature.id} className="creator-feature py-5 md:py-6">
                  <p className="font-label text-[10px] tracking-[0.2em] text-background/55">{feature.id}</p>
                  <h3 className="mt-2 font-heading text-[clamp(1.25rem,2vw,1.8rem)] leading-[0.95] tracking-[-0.02em]">{feature.title}</h3>
                  <p className="mt-3 max-w-[520px] text-body-sm leading-relaxed text-background/70">{feature.description}</p>
                </article>
              ))}
            </div>

            <a
              href="/dashboard/creator"
              className="creator-cta mt-8 inline-flex w-full items-center justify-between border border-background/30 px-4 py-3 font-label text-[10px] tracking-[0.2em] transition-colors hover:bg-background hover:text-foreground md:max-w-[360px]"
            >
              JADI KREATOR MARKETIV
              <span aria-hidden="true">-&gt;</span>
            </a>
          </div>

          <div className="creator-visual relative border border-background/20 bg-background/5 lg:border-l-0">
            <div className="relative min-h-[420px] overflow-hidden md:min-h-[640px]">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1500&q=80"
                alt="Kreator mikro menyiapkan konten kampanye di studio sederhana"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />

              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-foreground/88 via-foreground/45 to-foreground/72" />
            </div>

            <aside className="creator-metric-card relative mx-4 -mt-8 border border-background/30 bg-foreground/70 p-4 backdrop-blur md:absolute md:bottom-8 md:right-8 md:mx-0 md:mt-0 md:w-[290px] md:p-5">
              <p className="font-label text-[10px] tracking-[0.2em] text-background/75">METRICS SNAPSHOT</p>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-background/20 pt-4">
                {CREATOR_METRICS.map((metric) => (
                  <div key={metric.label}>
                    <p className="font-heading text-[1.55rem] leading-none tracking-[-0.03em] text-background">{metric.value}</p>
                    <p className="mt-1 text-[11px] leading-snug text-background/70">{metric.label}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
