import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Analitik Belanja Campaign",
  description:
    "Analisis biaya campaign, performa views tervalidasi, dan tren efektivitas untuk mengoptimalkan ROI pemasaran UMKM.",
  path: "/dashboard/umkm/analytics",
  keywords: ["analitik campaign umkm", "roi pemasaran", "biaya per views", "dashboard performa"],
  noIndex: true,
});

export default function UmkmAnalyticsPage() {
  return (
    <div>
      <h1 className="font-heading text-4xl tracking-tight">Analitik Belanja Campaign</h1>
      <p className="mt-3 max-w-xl text-foreground-muted">
        Evaluasi pengeluaran, bandingkan hasil performa antar campaign, dan tentukan strategi anggaran berikutnya berbasis data.
      </p>
    </div>
  );
}
