"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { publicNav } from "@/data/nav";
import { animateHeroSection } from "./marketiv-hero.animations";

export function MarketivHero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      animateHeroSection(rootRef.current);
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen overflow-hidden border border-border bg-background text-foreground lg:h-[100svh] lg:max-h-[100svh]"
    >
      <Image
        src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=2000"
        alt="Pelaku UMKM lokal menyiapkan produk usaha rumahan"
        fill
        priority
        sizes="100vw"
        className="object-cover grayscale"
      />
      <div className="absolute inset-0 bg-background/84" />

      <header className="hero-navbar fixed inset-x-0 top-0 z-50">
        <div className="hero-navbar-bg pointer-events-none absolute inset-0 opacity-0 bg-background/88 backdrop-blur-[6px]" />
        <div className="hero-navbar-divider pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border/75 opacity-100" />

        <div className="relative z-10 flex w-full items-center justify-between gap-3 px-4 py-4 md:px-12">
          <span className="hero-nav-item font-heading text-[2rem] leading-none tracking-tight md:text-4xl">MARKETIV</span>

          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
            <nav className="pointer-events-auto flex items-center gap-10">
              {publicNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hero-nav-item font-label text-xs text-foreground-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link
            href="/login"
            className="hero-nav-item inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap border-brutal bg-accent px-3 py-2 font-label text-[10px] tracking-[0.14em] text-accent-foreground transition-[opacity,transform] duration-300 ease-quart-out hover:opacity-90 motion-safe:hover:-translate-y-0.5 sm:px-5 sm:text-xs sm:tracking-[0.18em]"
          >
            Pilih Role Login
          </Link>
        </div>
      </header>

      <div className="relative z-20 mx-auto grid min-h-screen w-full max-w-[1320px] grid-cols-1 px-5 pb-10 pt-28 md:px-10 md:pb-14 md:pt-32 lg:h-[100svh] lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-6 lg:pr-10 lg:pt-30 lg:pb-10 xl:grid-cols-[minmax(0,1fr)_390px] xl:pr-14">
        <div className="relative z-30 flex flex-col justify-between">
          <div className="hero-season font-label mb-3 text-xs text-foreground-subtle md:mb-8">HYBRID MARKETPLACE UMKM & KREATOR</div>

          <div className="hero-title-wrap max-w-[980px] lg:max-w-[760px] xl:max-w-[780px]">
            <h1 className="overflow-hidden font-heading text-[clamp(2.2rem,8.4vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em] text-foreground xl:text-[clamp(2.4rem,7.2vw,7.8rem)]">
              <span className="hero-title-line block">UMKM TUMBUH</span>
              <span className="hero-title-line block">LEWAT KREATOR</span>
              <span className="hero-title-line block">TERVERIFIKASI.</span>
            </h1>
            <p className="mt-3 max-w-xl text-body-sm text-foreground-muted md:mt-5">
              Jalankan kampanye lebih cepat dengan AI brief generator, proteksi escrow, dan pembayaran hanya untuk views yang tervalidasi.
            </p>
          </div>

          <div className="mt-7 flex flex-col items-stretch justify-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 md:mt-10 md:justify-end">
            <Link
              href="/register/umkm"
              className="hero-cta inline-flex min-h-11 w-full items-center justify-center border-brutal bg-accent px-8 py-3 text-center font-label text-xs text-accent-foreground transition-[opacity,transform] duration-300 ease-quart-out hover:opacity-90 motion-safe:hover:-translate-y-0.5 sm:w-auto"
            >
              Luncurkan Campaign
            </Link>
            <Link
              href="/marketplace"
              className="hero-cta inline-flex min-h-11 w-full items-center justify-center border border-border-strong/45 bg-background/90 px-6 py-3 text-center font-label text-xs tracking-[0.16em] text-foreground transition-[transform,background-color,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-foreground/65 motion-safe:hover:bg-surface sm:w-auto"
            >
              Jelajahi Marketplace
            </Link>
          </div>
        </div>

        <div className="pointer-events-none relative z-10 mt-7 h-[350px] w-full max-w-[340px] justify-self-center md:h-[430px] md:max-w-[390px] lg:mt-8 lg:h-[460px] lg:w-full lg:max-w-none lg:justify-self-end xl:h-[500px]">
          <article className="hero-card group pointer-events-auto absolute bottom-0 left-0 z-20 w-[58%] border border-border-strong bg-background shadow-[0_22px_60px_rgba(0,0,0,0.22)] md:left-2 lg:left-0">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="UMKM storefront owner"
                fill
                sizes="(max-width: 768px) 40vw, 22vw"
                className="object-cover grayscale transition-[filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0"
              />
            </div>
            <div className="space-y-1 border-t border-border px-3 py-2 md:px-4 md:py-3">
              <p className="font-label text-[10px] text-foreground-subtle">SISI UMKM</p>
              <p className="font-label text-xs text-foreground">KONTROL ANGGARAN</p>
            </div>
          </article>

          <article className="hero-card group pointer-events-auto absolute right-0 top-0 z-10 w-[62%] border border-border-strong bg-background shadow-[0_26px_70px_rgba(0,0,0,0.24)] md:right-2 lg:right-0 lg:top-0">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Content creator profile"
                fill
                sizes="(max-width: 768px) 44vw, 24vw"
                className="object-cover grayscale transition-[filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0"
              />
            </div>
            <div className="space-y-1 border-t border-border px-3 py-2 md:px-4 md:py-3">
              <p className="font-label text-[10px] text-foreground-subtle">SISI KREATOR</p>
              <p className="font-label text-xs text-foreground">PERFORMA REAL-TIME</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
