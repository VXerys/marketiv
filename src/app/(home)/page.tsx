import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  MarketivCreatorSection,
  MarketivFearSection,
  MarketivFooterSection,
  MarketivHero,
  MarketivRunwaySection,
  MarketivUmkmSection,
} from "./_sections";

export const metadata: Metadata = buildMetadata({
  title: "Marketplace UMKM dan Kreator Mikro",
  description:
    "Scale pemasaran UMKM lewat kampanye kreator mikro terverifikasi, AI brief generator, escrow aman, dan analitik performa real-time.",
  path: "/",
  keywords: [
    "marketplace UMKM Indonesia",
    "kreator mikro terverifikasi",
    "AI brief campaign",
    "escrow pemasaran digital",
    "campaign analytics UMKM",
    "pembayaran per views tervalidasi",
  ],
});

export default function Home() {
  return (
    <main className="landing-light">
      <MarketivHero />
      <MarketivFearSection />
      <MarketivCreatorSection />
      <MarketivUmkmSection />
      <MarketivRunwaySection />
      <MarketivFooterSection />
    </main>
  );
}
