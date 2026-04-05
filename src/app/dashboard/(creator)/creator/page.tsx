import type { Metadata } from "next";
import { CreatorOverview } from "@/components/dashboard/creator/creator-overview";
import { creatorDashboardMock } from "@/data/dashboard/creator-mock";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Dashboard Kreator",
  description:
    "Kelola campaign aktif, performa konten, dan peluang pendapatan berulang melalui dashboard kreator Marketiv.",
  path: "/dashboard/creator",
  keywords: [
    "dashboard kreator",
    "pendapatan kreator mikro",
    "campaign konten brand",
    "metrik performa kreator",
  ],
  noIndex: true,
});

export default function CreatorDashboardPage() {
  const { metrics, alerts, recommendedActions, submissions } = creatorDashboardMock;

  return (
    <CreatorOverview
      metrics={metrics}
      alerts={alerts}
      recommendedActions={recommendedActions}
      submissions={submissions}
    />
  );
}
