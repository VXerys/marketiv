"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { animateFooterSection } from "./marketiv-footer-section.animations";
import {
  COMMITMENTS,
  COMPANY_LINKS,
  LEGAL_LINKS,
  PLATFORM_LINKS,
} from "./marketiv-footer-section.data";

export function MarketivFooterSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      animateFooterSection(sectionRef.current);
    },
    { scope: sectionRef }
  );

  return (
    <footer ref={sectionRef} className="w-full min-h-[100dvh] overflow-x-hidden border-y border-border bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 pt-1 md:px-10">
        <div className="footer-top-line h-1.5 w-full bg-foreground" />

        <div className="py-12 md:py-20">
          <h2 className="overflow-hidden font-heading text-[clamp(2.6rem,8vw,8rem)] leading-[0.84] tracking-[-0.045em] uppercase">
            <span className="footer-title-line block">AKSELERASI</span>
            <span className="footer-title-line block">PERTUMBUHAN.</span>
          </h2>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <Link
              href="/register/umkm"
              className="footer-cta inline-flex h-12 w-full items-center justify-center gap-4 border border-foreground bg-foreground px-6 font-label text-[10px] tracking-[0.18em] text-background transition-all hover:opacity-90 sm:w-auto sm:min-w-[200px]"
            >
              MULAI SEBAGAI UMKM
              <span aria-hidden="true" className="text-xs">→</span>
            </Link>

            <Link
              href="/register/kreator"
              className="footer-cta inline-flex h-12 w-full items-center justify-center border border-border-strong px-6 font-label text-[10px] tracking-[0.18em] transition-all hover:bg-foreground hover:text-background sm:w-auto sm:min-w-[180px]"
            >
              GABUNG KREATOR
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <p className="footer-brand-stack pointer-events-none absolute inset-x-0 bottom-4 z-0 select-none text-center font-heading text-[clamp(4rem,18vw,16rem)] leading-none tracking-[-0.04em] text-foreground/[0.06] dark:text-foreground/[0.03]">
            MARKETIV
          </p>

          <div className="footer-main-divider relative z-10 h-px bg-border" />

          <div className="relative z-10 grid grid-cols-1 gap-12 py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-20">
            <div className="footer-column">
              <h3 className="font-heading text-3xl leading-none tracking-tight">MARKETIV</h3>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-foreground-muted/80">
                Marketplace pertumbuhan UMKM yang menghubungkan brand lokal dengan kreator mikro terverifikasi lewat workflow campaign berbasis data.
              </p>
            </div>

            <div className="footer-column">
              <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle lowercase">PLATFORM</p>
              <ul className="mt-6 space-y-3">
                {PLATFORM_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-foreground-muted transition-colors hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle lowercase">PERUSAHAAN</p>
              <ul className="mt-6 space-y-3">
                {COMPANY_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-foreground-muted transition-colors hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column flex flex-col gap-8">
              <div className="space-y-6">
                <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle lowercase">DAMPAK</p>
                <div className="space-y-4">
                  {COMMITMENTS.map((item) => (
                    <article key={item.title} className="border border-border p-4 transition-colors hover:border-foreground/30">
                      <p className="font-label text-[9px] tracking-[0.15em] text-foreground-subtle lowercase">{item.title}</p>
                      <p className="mt-2 text-xs leading-relaxed text-foreground-muted/90">{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="inline-flex h-10 w-full items-center justify-center border border-foreground bg-foreground px-4 font-label text-[9px] tracking-[0.18em] text-background transition-opacity hover:opacity-90"
              >
                MENDUKUNG EKONOMI KREATOR
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-legal border-t border-border bg-surface/5">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:gap-0 md:py-6">
          <p className="font-label text-[9px] tracking-[0.15em] text-foreground-subtle lowercase">© 2026 MARKETIV. ALL RIGHTS RESERVED.</p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {LEGAL_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-label text-[9px] tracking-[0.15em] text-foreground-subtle transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
