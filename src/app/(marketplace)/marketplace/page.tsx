import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace | Marketiv",
  description: "Jelajahi listing campaign dan layanan kreator di Marketiv.",
};

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground md:px-12">
      <h1 className="font-heading text-5xl tracking-tight">Marketplace</h1>
      <p className="mt-4 max-w-xl text-foreground-muted">Katalog layanan dan discovery flow sedang dipersiapkan.</p>
    </main>
  );
}
