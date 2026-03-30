"use client";

import Image from "next/image";
import { useDeferredValue, useMemo, useRef, useState } from "react";
import { useGSAP } from "@/lib/gsap";
import { UMKM_MARKETPLACE_CATEGORIES, MARKETPLACE_SORT_OPTIONS } from "@/data/constants";
import type { MarketplaceListing, MarketplaceMode } from "@/types/marketplace";
import { MarketplaceCard } from "./marketplace-card";
import { animateMarketplaceCards, animateMarketplaceIntro } from "./marketplace-shell.animations";

interface MarketplaceShellProps {
  listings: ReadonlyArray<MarketplaceListing>;
}

type SortOption = (typeof MARKETPLACE_SORT_OPTIONS)[number]["value"];

function normalizeSearch(text: string): string {
  return text.trim().toLowerCase();
}

function scoreItem(item: MarketplaceListing, search: string): number {
  if (!search) {
    return 0;
  }

  let score = 0;

  if (item.title.toLowerCase().includes(search)) {
    score += 4;
  }

  if (item.creatorName.toLowerCase().includes(search)) {
    score += 3;
  }

  if (item.brandName.toLowerCase().includes(search)) {
    score += 2;
  }

  if (item.description.toLowerCase().includes(search)) {
    score += 1;
  }

  return score;
}

function toUpdatedTime(value: string): number {
  return Date.parse(value);
}

export function MarketplaceShell({ listings }: MarketplaceShellProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeMode, setActiveMode] = useState<MarketplaceMode>("campaign");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [isCategoryDesktopOpen, setIsCategoryDesktopOpen] = useState(false);
  const [isCategoryMobileOpen, setIsCategoryMobileOpen] = useState(false);

  const deferredSearch = useDeferredValue(search);
  const normalizedSearch = useMemo(() => normalizeSearch(deferredSearch), [deferredSearch]);

  const filteredListings = useMemo(() => {
    const modeFiltered = listings.filter((item) => item.mode === activeMode);

    const searched = modeFiltered.filter((item) => {
      if (!normalizedSearch) {
        return true;
      }

      return scoreItem(item, normalizedSearch) > 0;
    });

    const categorized = searched.filter((item) => {
      if (category === "all") {
        return true;
      }

      return item.category === category;
    });

    const sorted = [...categorized].sort((first, second) => {
      if (sortBy === "latest") {
        return toUpdatedTime(second.updatedAt) - toUpdatedTime(first.updatedAt);
      }

      if (sortBy === "lowest_price") {
        return first.amountIdr - second.amountIdr;
      }

      if (sortBy === "highest_views") {
        const firstViews = first.targetViews ?? first.reachedViews ?? 0;
        const secondViews = second.targetViews ?? second.reachedViews ?? 0;
        return secondViews - firstViews;
      }

      const firstScore = scoreItem(first, normalizedSearch);
      const secondScore = scoreItem(second, normalizedSearch);

      if (secondScore !== firstScore) {
        return secondScore - firstScore;
      }

      return toUpdatedTime(second.updatedAt) - toUpdatedTime(first.updatedAt);
    });

    return sorted;
  }, [activeMode, category, listings, normalizedSearch, sortBy]);

  useGSAP(
    () => {
      animateMarketplaceIntro(sectionRef.current);
      animateMarketplaceCards(sectionRef.current);
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section ref={sectionRef} className="landing-light overflow-x-clip border-y border-border bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-10 md:px-10 md:py-14">
        <div className="relative overflow-hidden border border-border">
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=2200&q=80"
              alt="Tim UMKM dan kreator berdiskusi untuk campaign marketplace"
              fill
              sizes="100vw"
              className="object-cover grayscale"
              priority={false}
            />
            <div className="absolute inset-0 bg-background/86" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:52px_52px] opacity-35" />
          </div>

          <div className="relative z-10 bg-background/68 px-4 py-5 backdrop-blur-[2.5px] md:px-6 md:py-7">
            <p className="mp-eyebrow font-label text-[10px] tracking-[0.26em] text-foreground-subtle">MARKETPLACE - DISCOVERY FEED</p>

          <h1 className="mt-3 overflow-hidden font-heading text-[clamp(2.1rem,5vw,4.6rem)] leading-[0.9] tracking-[-0.04em]">
            <span className="mp-heading-line block">TEMUKAN CAMPAIGN</span>
            <span className="mp-heading-line block text-foreground/82">DAN RATE CARD KREATOR</span>
          </h1>

          <p className="mp-description mt-4 max-w-[920px] text-body-sm text-foreground-muted">
            Satu marketplace untuk dua mode kolaborasi. Campaign mode fokus target views terverifikasi, sedangkan Rate Card mode
            fokus negosiasi paket kreator dengan escrow.
          </p>

            <div className="mp-controls mt-5 flex flex-col gap-3 border-t border-border pt-4 md:mt-6 md:gap-3 md:pt-5">
              <div className="grid gap-2 md:grid-cols-[auto_minmax(0,1fr)_auto_auto] md:items-center">
              <div className="inline-flex border border-border">
                <button
                  type="button"
                  onClick={() => setActiveMode("campaign")}
                  className={`min-h-10 px-3 font-label text-[10px] tracking-[0.18em] transition-[opacity,transform,color,background-color,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    activeMode === "campaign"
                      ? "border-r border-foreground bg-foreground text-background"
                      : "bg-background/92 text-foreground hover:bg-surface"
                  }`}
                  aria-pressed={activeMode === "campaign"}
                >
                  CAMPAIGN UMKM
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode("rate_card")}
                  className={`min-h-10 border-l border-border px-3 font-label text-[10px] tracking-[0.18em] transition-[opacity,transform,color,background-color,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    activeMode === "rate_card"
                      ? "border-l-foreground bg-foreground text-background"
                      : "bg-background/92 text-foreground hover:bg-surface"
                  }`}
                  aria-pressed={activeMode === "rate_card"}
                >
                  RATE CARD CREATOR
                </button>
              </div>

              <label className="flex min-h-10 items-center border border-border-strong/35 bg-background/88 px-3">
                <span className="sr-only">Cari campaign atau kreator</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari judul, deskripsi, kreator, atau brand"
                  className="w-full bg-transparent text-[13px] text-foreground placeholder:text-foreground-muted focus:outline-none"
                />
              </label>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="min-h-10 border border-border-strong/40 bg-background/95 px-3 font-label text-[10px] tracking-[0.16em] text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {MARKETPLACE_SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setIsCategoryDesktopOpen((value) => !value)}
                className="hidden min-h-10 items-center justify-center border border-border-strong/40 bg-background/95 px-3 font-label text-[10px] tracking-[0.18em] transition-[opacity,transform,border-color,background-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 hover:border-foreground/65 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:inline-flex"
              >
                {isCategoryDesktopOpen ? "SEMBUNYIKAN" : "KATEGORI"}
              </button>
            </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-3">
                <div className="flex items-center gap-2">
                  <p className="font-label text-[10px] tracking-[0.16em] text-foreground-muted">
                    MODE AKTIF: {activeMode === "campaign" ? "CAMPAIGN UMKM" : "RATE CARD CREATOR"}
                  </p>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                  <p className="font-label text-[10px] tracking-[0.16em] text-foreground-subtle">{filteredListings.length} HASIL</p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setCategory("all");
                      setSortBy("relevance");
                    }}
                    className="inline-flex min-h-10 items-center border border-border-strong/45 bg-background/95 px-3 font-label text-[10px] tracking-[0.18em] transition-[opacity,transform,border-color,background-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 hover:border-foreground/65 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    RESET FILTER
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-start gap-2 md:hidden">
                <button
                  type="button"
                  onClick={() => setIsCategoryMobileOpen(true)}
                  className="inline-flex min-h-10 items-center border border-border-strong/45 bg-background/95 px-3 font-label text-[10px] tracking-[0.18em] transition-[opacity,transform,border-color,background-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 hover:border-foreground/65 hover:bg-surface md:hidden"
                >
                  PILIH KATEGORI
                </button>
              </div>
            </div>
          </div>
        </div>

        {isCategoryDesktopOpen ? (
          <div className="mt-3 hidden border border-border bg-surface px-4 py-4 md:block">
            <div className="flex flex-wrap gap-2">
              {["all", ...UMKM_MARKETPLACE_CATEGORIES].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`min-h-10 border px-3 font-label text-[10px] tracking-[0.16em] transition-[opacity,transform,color,background-color,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 ${
                    category === item
                      ? "border-foreground bg-foreground text-background"
                      : "border-border-strong/45 bg-background/95 text-foreground hover:border-foreground/65 hover:bg-surface"
                  }`}
                >
                  {item === "all" ? "SEMUA KATEGORI" : item.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {isCategoryMobileOpen ? (
          <div className="fixed inset-0 z-50 flex min-h-screen flex-col bg-background md:hidden">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="font-label text-[11px] tracking-[0.18em]">PILIH KATEGORI UMKM</p>
              <button
                type="button"
                onClick={() => setIsCategoryMobileOpen(false)}
                className="inline-flex min-h-10 items-center border border-border px-3 font-label text-[10px] tracking-[0.18em]"
              >
                TUTUP
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 overflow-y-auto px-5 py-5">
              {["all", ...UMKM_MARKETPLACE_CATEGORIES].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setCategory(item);
                    setIsCategoryMobileOpen(false);
                  }}
                  className={`min-h-11 border px-3 font-label text-[10px] tracking-[0.16em] ${
                    category === item
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground"
                  }`}
                >
                  {item === "all" ? "SEMUA" : item.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {filteredListings.length === 0 ? (
          <div className="mt-6 border border-border bg-surface px-5 py-8 text-center md:mt-8">
            <p className="font-heading text-[clamp(1.6rem,2.7vw,2.1rem)] leading-[0.94] tracking-[-0.02em]">HASIL TIDAK DITEMUKAN</p>
            <p className="mt-3 text-body-sm text-foreground-muted">Ubah kata kunci, mode, atau kategori untuk melihat listing lain.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:mt-8 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {filteredListings.map((item) => (
              <MarketplaceCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}