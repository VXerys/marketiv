import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { MarketplaceShell } from "@/components/marketplace/marketplace-shell";
import { getMarketplaceListings } from "./_data/marketplace-listings";

export const metadata: Metadata = buildMetadata({
  title: "Marketplace Campaign",
  description:
    "Jelajahi listing campaign UMKM, profil kreator mikro terverifikasi, serta opsi kolaborasi berbasis performa di Marketiv.",
  path: "/marketplace",
  keywords: [
    "marketplace campaign UMKM",
    "kreator mikro terverifikasi",
    "kolaborasi brand lokal",
    "analitik performa konten",
    "rate card berbasis views",
  ],
});

export default async function MarketplacePage() {
  const listings = await getMarketplaceListings();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <MarketplaceShell listings={listings} />
    </main>
  );
}
