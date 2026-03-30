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
          </div>
        </div>

        <div className="mp-controls sticky top-0 z-40 mt-3 border border-border bg-background/95 p-3 backdrop-blur md:top-2 md:p-4">
          <div className="grid gap-2 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
            <div className="inline-flex border border-border">
              <button
                type="button"
                onClick={() => setActiveMode("campaign")}
                className={`min-h-10 px-3 font-label text-[9px] tracking-[0.14em] transition-[opacity,transform,color,background-color,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-[10px] md:tracking-[0.18em] ${
                  activeMode === "campaign"
                    ? "border-r border-foreground bg-foreground text-background"
                    : "bg-background text-foreground hover:bg-surface"
                }`}
                aria-pressed={activeMode === "campaign"}
              >
                CAMPAIGN
              </button>
              <button
                type="button"
                onClick={() => setActiveMode("rate_card")}
                className={`min-h-10 border-l border-border px-3 font-label text-[9px] tracking-[0.14em] transition-[opacity,transform,color,background-color,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-[10px] md:tracking-[0.18em] ${
                  activeMode === "rate_card"
                    ? "border-l-foreground bg-foreground text-background"
                    : "bg-background text-foreground hover:bg-surface"
                }`}
                aria-pressed={activeMode === "rate_card"}
              >
                RATE CARD
              </button>
            </div>

            <label className="flex min-h-10 items-center border border-border-strong/35 bg-background px-3">
              <span className="sr-only">Cari campaign atau kreator</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari campaign atau kreator"
                className="w-full bg-transparent text-[12px] text-foreground placeholder:text-foreground-muted focus:outline-none"
              />
            </label>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="min-h-10 border border-border-strong/40 bg-background px-2.5 font-label text-[9px] tracking-[0.14em] text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring md:px-3 md:text-[10px] md:tracking-[0.16em]"
            >
              {MARKETPLACE_SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2 flex items-center justify-between gap-2 border-t border-border/75 pt-2.5">
            <p className="font-label text-[9px] tracking-[0.14em] text-foreground-subtle">{filteredListings.length} HASIL</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("all");
                setSortBy("relevance");
              }}
              className="inline-flex min-h-8 items-center border border-border-strong/45 bg-background px-2.5 font-label text-[9px] tracking-[0.14em] transition-[opacity,transform,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-foreground/65"
            >
              RESET
            </button>
          </div>

          <div className="no-scrollbar mt-2.5 flex gap-2 overflow-x-auto border-t border-border/75 pt-2.5">
            {["all", ...UMKM_MARKETPLACE_CATEGORIES].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 min-h-9 border px-3 font-label text-[9px] tracking-[0.14em] transition-[opacity,transform,color,background-color,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 md:text-[10px] md:tracking-[0.16em] ${
                  category === item
                    ? "border-foreground bg-foreground text-background"
                    : "border-border-strong/45 bg-background text-foreground hover:border-foreground/65 hover:bg-surface"
                }`}
              >
                {item === "all" ? "SEMUA" : item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {filteredListings.length === 0 ? (
          <div className="mt-6 border border-border bg-surface px-5 py-8 text-center md:mt-8">
            <p className="font-heading text-[clamp(1.6rem,2.7vw,2.1rem)] leading-[0.94] tracking-[-0.02em]">HASIL TIDAK DITEMUKAN</p>
            <p className="mt-3 text-body-sm text-foreground-muted">Ubah kata kunci, mode, atau kategori untuk melihat listing lain.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-2.5 md:mt-8 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {filteredListings.map((item) => (
              <MarketplaceCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}