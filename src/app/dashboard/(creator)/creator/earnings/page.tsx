import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pendapatan Kreator",
  description:
    "Analisis pendapatan campaign, status pembayaran escrow, dan tren performa untuk menjaga arus kas kreator tetap sehat.",
  path: "/dashboard/creator/earnings",
  keywords: ["pendapatan kreator", "pembayaran escrow", "laporan campaign", "arus kas kreator"],
  noIndex: true,
});

export default function CreatorEarningsPage() {
  return (
    <div>
      <h1 className="font-heading text-4xl tracking-tight">Pendapatan Kreator</h1>
      <p className="mt-3 max-w-xl text-foreground-muted">
        Lihat ringkasan payout, status pencairan escrow, dan performa campaign untuk perencanaan pendapatan yang lebih presisi.
      </p>
    </div>
  );
}
