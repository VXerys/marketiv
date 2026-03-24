import type { Metadata } from "next";
import { MarketivHero } from "@/components/sections/marketiv-hero";
import { MarketivFearSection } from "@/components/sections/marketiv-fear-section";
import { MarketivCreatorSection } from "@/components/sections/marketiv-creator-section";
import { MarketivUmkmSection } from "@/components/sections/marketiv-umkm-section";
import { MarketivRunwaySection } from "@/components/sections/marketiv-runway-section";
import { MarketivFooterSection } from "@/components/sections/marketiv-footer-section";

export const metadata: Metadata = {
  title: "Marketiv | Hybrid Marketplace",
  description:
    "Platform marketplace hybrid yang menghubungkan UMKM dan kreator mikro dengan campaign mode dan rate card mode.",
};

export default function Home() {
  return (
    <>
      <MarketivHero />
      <MarketivFearSection />
      <MarketivCreatorSection />
      <MarketivUmkmSection />
      <MarketivRunwaySection />
      <MarketivFooterSection />
    </>
  );
}
