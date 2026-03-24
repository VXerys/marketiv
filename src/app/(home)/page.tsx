import type { Metadata } from "next";
import {
  MarketivCreatorSection,
  MarketivFearSection,
  MarketivFooterSection,
  MarketivHero,
  MarketivRunwaySection,
  MarketivUmkmSection,
} from "./_sections";

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
