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
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 to-transparent" />

        <div className="absolute left-2 top-2 flex items-center gap-1.5">
          <span className="inline-flex min-h-7 items-center border border-border-strong/70 bg-background px-2.5 font-label text-[10px] tracking-[0.14em] text-foreground shadow-[0_1px_0_rgba(0,0,0,0.08)]">
            {modeLabel(item.mode)}
          </span>
          <span className={`inline-flex min-h-7 items-center border px-2.5 font-label text-[10px] tracking-[0.14em] shadow-[0_1px_0_rgba(0,0,0,0.08)] ${statusClassName(item.status)}`}>
            {statusLabel(item.status)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3 py-3 md:px-4 md:py-4">
        <div className="flex items-start justify-between gap-2">
          <p className="font-label text-[10px] tracking-[0.14em] text-foreground-muted">{item.category}</p>
          <p className="font-label text-[10px] tracking-[0.14em] text-foreground-muted">{channelLabel(item.channels)}</p>
        </div>

        <h3 className="mt-2 line-clamp-2 font-heading text-[clamp(1.05rem,1.45vw,1.35rem)] leading-[0.95] tracking-[-0.02em] text-foreground">
          {item.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-[12px] leading-relaxed text-foreground-muted md:text-[13px]">{item.description}</p>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <p className="font-heading text-[1.1rem] leading-none tracking-[-0.02em] text-foreground">{priceLabel}</p>
          <p className="font-label text-[9px] tracking-[0.16em] text-foreground-subtle">
            {item.mode === "campaign" ? "EST. BUDGET" : "START FROM"}
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-2.5 border-t border-border pt-3 text-[12px] text-foreground-muted">
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
            className="inline-flex min-h-10 w-full items-center justify-center border border-foreground bg-accent px-3 py-2 font-label text-[10px] tracking-[0.18em] text-accent-foreground transition-[opacity,transform] duration-300 ease-quart-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:opacity-90"
          >
            LIHAT DETAIL
          </Link>
        </div>
      </div>
    </article>
  );
}