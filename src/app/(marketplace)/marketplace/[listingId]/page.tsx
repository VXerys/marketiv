import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketplaceDetailShell } from "@/components/marketplace/marketplace-detail-shell";
import { buildMetadata } from "@/lib/seo";
import { getMarketplaceListingById, getMarketplaceListingIds } from "../_data/marketplace-listings";

type MarketplaceDetailRouteParams = {
  listingId: string;
};

async function resolveRouteParams(
  params: MarketplaceDetailRouteParams | Promise<MarketplaceDetailRouteParams>
): Promise<MarketplaceDetailRouteParams> {
  return Promise.resolve(params);
}

export async function generateStaticParams() {
  const listingIds = await getMarketplaceListingIds();
  return listingIds.map((listingId) => ({ listingId }));
}

export async function generateMetadata({
  params,
}: {
  params: MarketplaceDetailRouteParams | Promise<MarketplaceDetailRouteParams>;
}): Promise<Metadata> {
  const { listingId } = await resolveRouteParams(params);
  const item = await getMarketplaceListingById(listingId);

  if (!item) {
    return buildMetadata({
      title: "Detail Marketplace Tidak Ditemukan",
      description: "Data listing marketplace yang kamu cari tidak tersedia.",
      path: `/marketplace/${listingId}`,
      keywords: [
        "detail marketplace tidak ditemukan",
        "marketiv 404 detail",
        "listing marketplace",
      ],
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${item.title} | Detail Marketplace`,
    description: item.description,
    path: `/marketplace/${item.id}`,
    keywords: [
      "detail marketplace marketiv",
      item.mode === "campaign" ? "campaign umkm" : "rate card creator",
      item.category.toLowerCase(),
      "kolaborasi umkm kreator",
      "escrow marketiv",
    ],
  });
}

export default async function MarketplaceDetailPage({
  params,
}: {
  params: MarketplaceDetailRouteParams | Promise<MarketplaceDetailRouteParams>;
}) {
  const { listingId } = await resolveRouteParams(params);
  const item = await getMarketplaceListingById(listingId);

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <MarketplaceDetailShell item={item} />
    </main>
  );
}
