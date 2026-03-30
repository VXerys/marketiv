import Image from "next/image";
import Link from "next/link";
import type { MarketplaceListing } from "@/types/marketplace";

const MARKETPLACE_SCROLL_Y_KEY = "marketplace:scrollY";
const MARKETPLACE_RESTORE_FLAG_KEY = "marketplace:restoreOnBack";

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(value);
}

function statusClassName(status: MarketplaceListing["status"]): string {
  if (status === "verified") {
    return "border-foreground bg-foreground text-background";
  }

  if (status === "processing") {
    return "border-border-strong/75 bg-surface text-foreground";
  }

  return "border-border-strong/75 bg-background/95 text-foreground";
}

function statusLabel(status: MarketplaceListing["status"]): string {
  if (status === "verified") {
    return "VERIFIED";
  }

  if (status === "processing") {
    return "PROCESSING";
  }

  return "OPEN";
}

function modeLabel(mode: MarketplaceListing["mode"]): string {
  return mode === "campaign" ? "CAMPAIGN" : "RATE CARD";
}

function channelLabel(channels: MarketplaceListing["channels"]): string {
  return channels.map((item) => item.toUpperCase()).join(" + ");
}

function campaignModeSummary(item: MarketplaceListing): ReadonlyArray<{ label: string; value: string }> {
  return [
    {
      label: "VIEWS TERCAPAI",
      value: formatNumber(item.reachedViews ?? 0),
    },
    {
      label: "TARGET VIEWS",
      value: formatNumber(item.targetViews ?? 0),
    },
    {
      label: "UMKM",
      value: item.brandName,
    },
    {
      label: "SKEMA",
      value: "PAY PER VIEW",
    },
  ];
}

function rateCardModeSummary(item: MarketplaceListing, ratingLabel: string): ReadonlyArray<{ label: string; value: string }> {
  return [
    {
      label: "RATING",
      value: `${ratingLabel} / 5`,
    },
    {
      label: "KOLABORASI",
      value: formatNumber(item.totalCollaborations),
    },
    {
      label: "KREATOR",
      value: item.creatorName,
    },
    {
      label: "DELIVERY",
      value: "COLLAB POST",
    },
  ];
}

interface MarketplaceCardProps {
  item: MarketplaceListing;
}

export function MarketplaceCard({ item }: MarketplaceCardProps) {
  const priceLabel = formatRupiah(item.amountIdr);
  const ratingLabel = item.rating.toFixed(1);
  const summaryItems =
    item.mode === "campaign"
      ? campaignModeSummary(item)
      : rateCardModeSummary(item, ratingLabel);
  const mobileSummaryItems = summaryItems.slice(0, 2);

  const persistMarketplaceScrollPosition = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.sessionStorage.setItem(MARKETPLACE_SCROLL_Y_KEY, String(window.scrollY));
    window.sessionStorage.setItem(MARKETPLACE_RESTORE_FLAG_KEY, "1");
  };

  return (
    <article className="mp-card group flex h-full flex-col border border-border bg-background/95 backdrop-blur-[1.5px]">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
        <Image
          src={item.thumbnailUrl}
          alt={item.title}
          fill
          className="object-cover grayscale transition-transform duration-500 ease-quart-out motion-safe:group-hover:scale-[1.03]"
          sizes="(max-width: 419px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 to-transparent" />

        <div className="absolute left-2 right-2 top-2 flex items-center justify-between gap-1.5">
          <span className="inline-flex min-h-6 max-w-[48%] items-center justify-center truncate border border-border-strong/70 bg-background px-2 font-label text-[8px] tracking-[0.11em] text-foreground shadow-[0_1px_0_rgba(0,0,0,0.08)] md:min-h-7 md:px-2.5 md:text-[10px] md:tracking-[0.14em]">
            {modeLabel(item.mode)}
          </span>
          <span className={`inline-flex min-h-6 max-w-[48%] items-center justify-center truncate border px-2 font-label text-[8px] tracking-[0.11em] shadow-[0_1px_0_rgba(0,0,0,0.08)] md:min-h-7 md:px-2.5 md:text-[10px] md:tracking-[0.14em] ${statusClassName(item.status)}`}>
            {statusLabel(item.status)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3 py-3 md:px-4 md:py-4">
        <div className="flex flex-col gap-1 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between min-[420px]:gap-2">
          <p className="font-label text-[9px] tracking-[0.12em] text-foreground-muted md:text-[10px] md:tracking-[0.14em]">{item.category}</p>
          <p className="font-label text-[9px] tracking-[0.12em] text-foreground-muted min-[420px]:text-right md:text-[10px] md:tracking-[0.14em]">{channelLabel(item.channels)}</p>
        </div>

        <h3 className="mt-1.5 line-clamp-2 font-heading text-[clamp(1.05rem,3.4vw,1.2rem)] leading-[0.95] tracking-[-0.02em] text-foreground md:mt-2 md:text-[clamp(1.05rem,1.45vw,1.35rem)]">
          {item.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-foreground-muted md:mt-2 md:line-clamp-3 md:text-[13px]">{item.description}</p>

        <div className="mt-2.5 flex flex-col gap-1 border-t border-border pt-2.5 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between md:mt-3 md:pt-3">
          <p className="font-heading text-[1.04rem] leading-none tracking-[-0.02em] text-foreground md:text-[1.1rem]">{priceLabel}</p>
          <p className="font-label text-[8px] tracking-[0.14em] text-foreground-subtle md:text-[9px] md:tracking-[0.16em]">
            {item.mode === "campaign" ? "EST. BUDGET" : "START FROM"}
          </p>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-x-2 gap-y-2 border-t border-border pt-2.5 text-[11px] text-foreground-muted md:hidden">
          {mobileSummaryItems.map((summary) => (
            <div key={summary.label}>
              <p className="font-label text-[8px] tracking-[0.12em] text-foreground-subtle">{summary.label}</p>
              <p className="mt-1 truncate text-[11px] text-foreground md:text-[13px]">{summary.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 hidden grid-cols-2 gap-x-2 gap-y-2.5 border-t border-border pt-3 text-[12px] text-foreground-muted md:grid">
          {summaryItems.map((summary) => (
            <div key={summary.label}>
              <p className="font-label text-[9px] tracking-[0.14em] text-foreground-subtle">{summary.label}</p>
              <p className="mt-1 truncate text-[12px] text-foreground md:text-[13px]">{summary.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-3 md:pt-4">
          <Link
            href={`/marketplace/${item.id}`}
            onClick={persistMarketplaceScrollPosition}
            className="inline-flex min-h-11 w-full items-center justify-center border border-foreground bg-accent px-3 py-2 font-label text-[10px] tracking-[0.18em] text-accent-foreground transition-[opacity,transform] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:opacity-90"
          >
            LIHAT DETAIL
          </Link>
        </div>
      </div>
    </article>
  );
}