import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

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

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground md:px-12">
      <h1 className="font-heading text-5xl tracking-tight">Marketplace Campaign Marketiv</h1>
      <p className="mt-4 max-w-xl text-foreground-muted">
        Temukan kreator mikro sesuai niche, bandingkan performa terverifikasi, dan pilih campaign dengan kontrol anggaran yang
        transparan.
      </p>
    </main>
  );
}
