import type { Metadata } from "next";
import { DashboardTabLock } from "@/components/dashboard/dashboard-tab-lock";
import { UmkmAnalyticsBoard } from "@/components/dashboard/umkm/umkm-analytics-board";
import { umkmDashboardMock } from "@/data/dashboard/umkm-mock";
import { getDashboardAccess } from "@/lib/auth/getDashboardAccess";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Analitik Belanja Campaign",
  description:
    "Analisis biaya campaign, performa views tervalidasi, dan tren efektivitas untuk mengoptimalkan ROI pemasaran UMKM.",
  path: "/dashboard/umkm/analytics",
  keywords: ["analitik campaign umkm", "roi pemasaran", "biaya per views", "dashboard performa"],
  noIndex: true,
});

export default async function UmkmAnalyticsPage() {
  const access = await getDashboardAccess("umkm");
  if (access.kind === "guest") {
    return (
      <DashboardTabLock
        title="Spend Analytics Terkunci"
        description="Analitik performa campaign dan fraud-review membutuhkan data akun UMKM. Login dulu untuk membuka metrik biaya, views tervalidasi, dan indikator ROI."
        hints={[
          "Bandingkan biaya per 1.000 views antar campaign setelah login.",
          "Lihat fraud queue dan status review untuk keputusan release dana.",
          "Metrik personal UMKM tidak ditampilkan di mode preview publik.",
        ]}
      />
    );
  }

  return <UmkmAnalyticsBoard highlights={umkmDashboardMock.analyticsHighlights} fraudQueue={umkmDashboardMock.fraudQueue} orders={umkmDashboardMock.escrowOrders} />;
}
