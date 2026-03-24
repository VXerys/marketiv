import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Dashboard UMKM",
  description:
    "Kelola campaign, kontrol anggaran, dan evaluasi performa kreator dari satu dashboard UMKM yang terintegrasi.",
  path: "/dashboard/umkm",
  keywords: ["dashboard umkm", "campaign marketing umkm", "kontrol anggaran iklan", "kinerja kreator"],
  noIndex: true,
});

export default function UmkmDashboardPage() {
  return (
    <div className="text-foreground">
      <h1 className="font-heading text-5xl tracking-tight">Dashboard UMKM</h1>
      <p className="mt-4 max-w-xl text-foreground-muted">
        Pantau aktivitas campaign, status escrow, dan hasil performa konten untuk mendorong pertumbuhan penjualan yang terukur.
      </p>
    </div>
  );
}
