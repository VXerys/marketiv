"use client";

import Image from "next/image";
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
    <section ref={sectionRef} className="overflow-x-clip border-y border-border bg-foreground text-background">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-10 md:px-10 md:py-14">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-start lg:gap-0">
          <div className="flex h-full flex-col border border-background/20 bg-foreground px-5 py-7 md:px-8 md:py-10 lg:col-span-5">
            <p className="creator-eyebrow font-label text-[10px] tracking-[0.26em] text-background/65">SISI KREATOR - EDISI 1/2</p>

            <h2 className="mt-4 overflow-hidden font-heading text-[clamp(2.3rem,5vw,4.8rem)] leading-[0.9] tracking-[-0.038em]">
              <span className="creator-title-line block">EDISI 1:</span>
              <span className="creator-title-line block text-background/82">KREATOR MIKRO</span>
            </h2>

            <p className="creator-intro mt-5 max-w-[520px] text-body-sm leading-relaxed text-background/72">
              Tingkatkan pendapatan dengan brief siap eksekusi, metrik performa real-time, dan peluang campaign berulang dari brand
              UMKM aktif.
            </p>

            <div className="mt-7 divide-y divide-background/20 border-y border-background/20">
              {CREATOR_FEATURES.map((feature) => (
                <article key={feature.id} className="creator-feature py-4 md:py-5">
                  <p className="font-label text-[10px] tracking-[0.2em] text-background/55">{feature.id}</p>
                  <h3 className="mt-2 font-heading text-[clamp(1.5rem,2.2vw,2.1rem)] leading-[0.94] tracking-[-0.02em]">{feature.title}</h3>
                  <p className="mt-2.5 max-w-[520px] text-body-sm leading-relaxed text-background/70">{feature.description}</p>
                </article>
              ))}
            </div>

            <a
              href="/dashboard/creator"
              className="creator-cta mt-7 inline-flex w-full items-center justify-between border border-background/30 px-4 py-3 font-label text-[10px] tracking-[0.2em] transition-colors hover:bg-background hover:text-foreground md:max-w-[360px]"
            >
              MASUK KE DASHBOARD KREATOR
              <span aria-hidden="true">-&gt;</span>
            </a>
          </div>

          <div className="creator-visual relative border border-background/20 bg-background/5 lg:col-span-7 lg:border-l-0">
            <div className="grid h-full grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="relative min-h-[360px] overflow-hidden md:min-h-[430px] lg:min-h-[520px]">
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80"
                  alt="Kreator mikro menyiapkan konten kampanye di studio sederhana"
                  fill
                  className="object-cover grayscale"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 46vw, 40vw"
                  priority={false}
                />

                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-foreground/88 via-foreground/45 to-foreground/72" />
              </div>

              <aside className="creator-metric-card border-t border-background/20 bg-foreground/72 p-4 backdrop-blur lg:border-l lg:border-t-0 lg:p-5">
                <p className="font-label text-[10px] tracking-[0.2em] text-background/75">METRICS SNAPSHOT</p>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-background/20 pt-4 lg:grid-cols-1 lg:gap-4">
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
      </div>
    </section>
  );
}
