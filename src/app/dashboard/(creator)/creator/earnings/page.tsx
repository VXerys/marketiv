import type { Metadata } from "next";
import { CreatorEarningsBoard } from "@/components/dashboard/creator/creator-earnings-board";
import { creatorDashboardMock } from "@/data/dashboard/creator-mock";
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
  return <CreatorEarningsBoard summary={creatorDashboardMock.earningsSummary} earnings={creatorDashboardMock.earnings} />;
}
