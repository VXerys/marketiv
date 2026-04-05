"use client";

import Image from "next/image";
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
              <div className="relative min-h-[400px] overflow-hidden md:min-h-[500px] lg:min-h-0">
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80"
                  alt="Kreator mikro menyiapkan konten kampanye di studio sederhana"
                  fill
                  className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority={false}
                />

                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-foreground/90 via-foreground/40 to-foreground/75" />
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
