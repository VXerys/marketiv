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
    <section ref={rootRef} className="relative min-h-screen overflow-hidden border border-border bg-background text-foreground">
      <Image
        src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1800&q=80"
        alt="Fashion-style grayscale backdrop"
        fill
        priority
        sizes="100vw"
        className="object-cover grayscale"
      />
      <div className="absolute inset-0 bg-background/84" />

      <header className="hero-navbar fixed inset-x-0 top-0 z-50">
        <div className="hero-navbar-bg pointer-events-none absolute inset-0 opacity-0 bg-background/55 backdrop-blur-[7px]" />
        <div className="hero-navbar-divider pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border opacity-0" />

        <div className="relative z-10 flex w-full items-center justify-between px-6 py-4 md:px-12">
          <span className="hero-nav-item font-heading text-4xl leading-none tracking-tight">MARKETIV</span>

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
            className="hero-nav-item font-label border-brutal bg-accent px-5 py-2 text-xs text-accent-foreground transition-opacity hover:opacity-90"
          >
            Masuk
          </Link>
        </div>
      </header>

      <div className="relative z-20 mx-auto grid min-h-screen w-full max-w-[1400px] grid-cols-1 px-5 pb-10 pt-28 md:px-10 md:pb-14 md:pt-32 lg:grid-cols-[1fr_auto] lg:pr-14 xl:pr-20">
        <div className="flex flex-col justify-between">
          <div className="hero-season font-label mb-3 text-xs text-foreground-subtle md:mb-8">SEASON 01 - INDONESIA 2026</div>

          <div className="hero-title-wrap max-w-[980px]">
            <h1 className="overflow-hidden font-heading text-[clamp(2.4rem,10.2vw,8.9rem)] font-bold leading-[0.9] tracking-[-0.04em] text-foreground">
              <span className="hero-title-line block">MENDEMOKRATISASI</span>
              <span className="hero-title-line block">PEMASARAN</span>
              <span className="hero-title-line block">DIGITAL.</span>
            </h1>
            <p className="mt-3 max-w-xl text-body-sm text-foreground-muted md:mt-5">
              Marketiv membangun ekosistem adil antara UMKM dan kreator mikro.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-start gap-5 md:mt-10 md:justify-end">
            <Link
              href="/register"
              className="hero-cta font-label border-brutal bg-accent px-8 py-3 text-xs text-accent-foreground transition-opacity hover:opacity-90"
            >
              Mulai Sekarang
            </Link>
            <Link href="/marketplace" className="hero-cta font-label text-xs text-foreground-subtle underline-offset-4 hover:underline">
              Pelajari
            </Link>
          </div>
        </div>

        <div className="pointer-events-none relative mt-7 h-[350px] w-full max-w-[340px] justify-self-center md:h-[430px] md:max-w-[390px] lg:mt-0 lg:h-auto lg:w-[420px] lg:max-w-none lg:justify-self-end lg:mr-8 xl:mr-12">
          <article className="hero-card pointer-events-auto absolute -bottom-2 -left-4 w-[58%] border border-border-strong bg-background shadow-[0_22px_60px_rgba(0,0,0,0.22)] md:-left-9 lg:-left-[210px] lg:bottom-5">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="UMKM storefront owner"
                fill
                sizes="(max-width: 768px) 40vw, 22vw"
                className="object-cover grayscale"
              />
            </div>
            <div className="space-y-1 border-t border-border px-3 py-2 md:px-4 md:py-3">
              <p className="font-label text-[10px] text-foreground-subtle">EKOSISTEM A</p>
              <p className="font-label text-xs text-foreground">UMKM STOREFRONT</p>
            </div>
          </article>

          <article className="hero-card pointer-events-auto absolute -top-1 right-2 w-[62%] border border-border-strong bg-background shadow-[0_26px_70px_rgba(0,0,0,0.24)] md:-top-8 md:right-3 lg:right-4 lg:top-4">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Content creator profile"
                fill
                sizes="(max-width: 768px) 44vw, 24vw"
                className="object-cover grayscale"
              />
            </div>
            <div className="space-y-1 border-t border-border px-3 py-2 md:px-4 md:py-3">
              <p className="font-label text-[10px] text-foreground-subtle">EKOSISTEM B</p>
              <p className="font-label text-xs text-foreground">CREATOR ANALYTICS</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
