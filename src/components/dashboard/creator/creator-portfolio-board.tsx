"use client";

import { useRef } from "react";
import { ChartLine, Eye, Heart, ShieldCheck } from "lucide-react";
import { useGSAP } from "@/lib/gsap";
import type { CreatorPortfolioItem } from "@/types/creator";
import { animateCreatorPortfolioBoard } from "./creator-portfolio-board.animations";

interface CreatorPortfolioBoardProps {
  portfolio: CreatorPortfolioItem[];
}

function healthClass(health: CreatorPortfolioItem["health"]): string {
  if (health === "healthy") {
    return "bg-[#eefaf2] text-[#247a52]";
  }

  if (health === "watch") {
    return "bg-[#fff4dc] text-[#9c6b00]";
  }

  return "bg-[#ffeaea] text-[#b63939]";
}

export function CreatorPortfolioBoard({ portfolio }: CreatorPortfolioBoardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (rootRef.current) {
        animateCreatorPortfolioBoard(rootRef.current);
      }
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="space-y-6">
      <section className="creator-portfolio-head umkm-panel rounded-2xl border border-border p-6 md:p-8">
        <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">PORTFOLIO SHOWCASE</p>
        <h1 className="mt-3 font-heading text-4xl tracking-tight md:text-5xl">Portofolio Creator</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground-muted md:text-base">
          Kelola konten terbaikmu, pantau health score per karya, dan tunjukkan bukti performa yang relevan untuk meningkatkan peluang deal.
        </p>
      </section>

      <section className="grid items-stretch gap-4 lg:grid-cols-3">
        {portfolio.map((item) => (
          <article
            key={item.id}
            className="creator-portfolio-card umkm-panel rounded-2xl border border-border p-5 transition-[transform,box-shadow,border-color] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-border-strong motion-safe:hover:shadow-[0_22px_34px_-28px_rgba(15,23,42,0.5)]"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-label text-[10px] tracking-[0.14em] text-foreground-subtle">{item.platform}</p>
                <h2 className="mt-1 font-heading text-2xl tracking-tight">{item.title}</h2>
              </div>
              <span className={`inline-flex min-h-7 items-center rounded-full px-2.5 font-label text-[10px] tracking-[0.12em] uppercase ${healthClass(item.health)}`}>
                <ShieldCheck className="mr-1 size-3.5" aria-hidden="true" />
                {item.health}
              </span>
            </div>

            <p className="mt-2 text-sm text-foreground-muted">Niche: {item.niche}</p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-border bg-surface/50 px-3 py-2 transition-colors duration-200 hover:border-border-strong hover:bg-surface">
                <p className="text-xs text-foreground-subtle">Views</p>
                <p className="mt-1 font-medium text-foreground">{item.views.toLocaleString("id-ID")}</p>
              </div>
              <div className="rounded-lg border border-border bg-surface/50 px-3 py-2 transition-colors duration-200 hover:border-border-strong hover:bg-surface">
                <p className="text-xs text-foreground-subtle">ER</p>
                <p className="mt-1 font-medium text-foreground">{item.engagementRate.toFixed(1)}%</p>
              </div>
              <div className="rounded-lg border border-border bg-surface/50 px-3 py-2 transition-colors duration-200 hover:border-border-strong hover:bg-surface">
                <p className="text-xs text-foreground-subtle">Completion</p>
                <p className="mt-1 font-medium text-foreground">{item.completionRate}%</p>
              </div>
              <div className="rounded-lg border border-border bg-surface/50 px-3 py-2 transition-colors duration-200 hover:border-border-strong hover:bg-surface">
                <p className="text-xs text-foreground-subtle">Signal</p>
                <p className="mt-1 font-medium text-foreground">{item.health.toUpperCase()}</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{item.highlight}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-foreground-subtle">
              <span className="inline-flex items-center gap-1">
                <Eye className="size-3.5" aria-hidden="true" />
                Visibility
              </span>
              <span className="inline-flex items-center gap-1">
                <Heart className="size-3.5" aria-hidden="true" />
                Engagement
              </span>
              <span className="inline-flex items-center gap-1">
                <ChartLine className="size-3.5" aria-hidden="true" />
                Growth
              </span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
