import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Campaign Brief UMKM",
  description:
    "Susun brief campaign berbasis AI agar arahan konten lebih presisi, revisi lebih minim, dan eksekusi kreator lebih cepat.",
  path: "/dashboard/umkm/campaigns",
  keywords: ["campaign brief umkm", "ai brief generator", "brief konten marketing", "arahan kreator"],
  noIndex: true,
});

export default function UmkmCampaignsPage() {
  return (
    <div>
      <h1 className="font-heading text-4xl tracking-tight">Campaign Brief</h1>
      <p className="mt-3 max-w-xl text-foreground-muted">
        Buat brief campaign berbasis tujuan bisnis dan unggah aset produk agar kreator mengeksekusi konten sesuai arahan brand.
      </p>
    </div>
  );
}
