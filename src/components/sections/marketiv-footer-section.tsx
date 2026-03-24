"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

interface FooterLinkItem {
  label: string;
  href: string;
}

interface CommitmentItem {
  title: string;
  description: string;
}

const PLATFORM_LINKS: FooterLinkItem[] = [
  { label: "Untuk Kreator", href: "/dashboard/creator" },
  { label: "Untuk UMKM", href: "/dashboard/umkm" },
  { label: "Campaign Aktif", href: "/marketplace" },
  { label: "Rate Card", href: "/marketplace" },
  { label: "Escrow", href: "/marketplace" },
];

const COMPANY_LINKS: FooterLinkItem[] = [
  { label: "Tentang Kami", href: "/about" },
  { label: "Blog", href: "/marketplace" },
  { label: "Karir", href: "/marketplace" },
  { label: "Press Kit", href: "/marketplace" },
  { label: "Kontak", href: "/contact" },
];

const LEGAL_LINKS: FooterLinkItem[] = [
  { label: "Syarat & Ketentuan", href: "/marketplace" },
  { label: "Kebijakan Privasi", href: "/marketplace" },
  { label: "Cookie Policy", href: "/marketplace" },
];

const COMMITMENTS: CommitmentItem[] = [
  {
    title: "SDG 8 - PEKERJAAN LAYAK",
    description: "Mendukung pertumbuhan ekonomi inklusif UMKM.",
  },
  {
    title: "SDG 9 - INOVASI INDUSTRI",
    description: "Infrastruktur digital untuk kreator lokal.",
  },
];

export function MarketivFooterSection() {
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
        .from(".footer-top-line", { scaleX: 0, duration: 0.45, transformOrigin: "left center" })
        .from(".footer-title-line", { yPercent: 102, opacity: 0, duration: 0.68, stagger: 0.08 }, "-=0.18")
        .from(".footer-cta", { y: 16, opacity: 0, duration: 0.4, stagger: 0.08 }, "-=0.2")
        .from(".footer-main-divider", { scaleX: 0, duration: 0.45, transformOrigin: "left center" }, "-=0.15")
        .from(".footer-column", { y: 18, opacity: 0, duration: 0.45, stagger: 0.09 }, "-=0.15")
        .from(".footer-legal", { y: 10, opacity: 0, duration: 0.35 }, "-=0.15");
    },
    { scope: sectionRef }
  );

  return (
    <footer ref={sectionRef} className="border-y border-border bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1400px] px-5 pt-1 md:px-10">
        <div className="footer-top-line h-1 bg-foreground" />

        <div className="py-12 md:py-16">
          <h2 className="overflow-hidden font-heading text-[clamp(3.1rem,9vw,9.4rem)] leading-[0.84] tracking-[-0.045em]">
            <span className="footer-title-line block">CIPTAKAN</span>
            <span className="footer-title-line block">DAMPAK.</span>
          </h2>

          <div className="mt-7 flex flex-wrap items-center gap-3 md:gap-4">
            <Link
              href="/register"
              className="footer-cta inline-flex h-12 min-w-[170px] items-center justify-center gap-3 border border-foreground bg-foreground px-6 font-label text-[10px] tracking-[0.2em] text-background transition-opacity hover:opacity-90"
            >
              MULAI GRATIS
              <span aria-hidden="true">-&gt;</span>
            </Link>

            <Link
              href="/contact"
              className="footer-cta inline-flex h-12 min-w-[156px] items-center justify-center border border-border-strong/28 px-6 font-label text-[10px] tracking-[0.2em] transition-colors hover:border-foreground/55"
            >
              HUBUNGI KAMI
            </Link>
          </div>
        </div>

        <div className="footer-main-divider h-px bg-border" />

        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-10 lg:py-14">
          <div className="footer-column">
            <h3 className="font-heading text-[clamp(1.9rem,2.4vw,2.5rem)] leading-none tracking-[-0.025em]">MARKETIV</h3>
            <p className="mt-5 max-w-[250px] text-body-sm leading-relaxed text-foreground-muted">
              Hybrid marketplace menghubungkan UMKM lokal dengan micro-creator Indonesia.
            </p>
          </div>

          <div className="footer-column">
            <p className="font-label text-[9px] tracking-[0.22em] text-foreground-subtle">PLATFORM</p>
            <ul className="mt-5 space-y-2.5">
              {PLATFORM_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-body-sm text-foreground-muted transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <p className="font-label text-[9px] tracking-[0.22em] text-foreground-subtle">PERUSAHAAN</p>
            <ul className="mt-5 space-y-2.5">
              {COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-body-sm text-foreground-muted transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <p className="font-label text-[9px] tracking-[0.22em] text-foreground-subtle">KOMITMEN</p>

            <div className="mt-5 space-y-3">
              {COMMITMENTS.map((item) => (
                <article key={item.title} className="border border-border px-3 py-3">
                  <p className="font-label text-[8px] tracking-[0.18em] text-foreground-subtle">{item.title}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-foreground-muted">{item.description}</p>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="mt-3 inline-flex h-8 w-full items-center justify-start border border-foreground bg-foreground px-3 font-label text-[9px] tracking-[0.2em] text-background transition-opacity hover:opacity-90"
            >
              MENDUKUNG ASTA CITA
            </button>
          </div>
        </div>
      </div>

      <div className="footer-legal border-t border-border">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="font-label text-[8px] tracking-[0.2em] text-foreground-subtle">© 2026 MARKETIV. ALL RIGHTS RESERVED.</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-label text-[8px] tracking-[0.2em] text-foreground-subtle transition-colors hover:text-foreground"
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
