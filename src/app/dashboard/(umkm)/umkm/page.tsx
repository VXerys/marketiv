import type { Metadata } from "next";
import { UmkmOverview } from "@/components/dashboard/umkm/umkm-overview";
import { umkmDashboardMock } from "@/data/dashboard/umkm-mock";
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
    <UmkmOverview
      metrics={umkmDashboardMock.metrics}
      quickActions={umkmDashboardMock.quickActions}
      campaigns={umkmDashboardMock.campaigns}
      escrowOrders={umkmDashboardMock.escrowOrders}
      fraudQueue={umkmDashboardMock.fraudQueue}
    />
  );
}
