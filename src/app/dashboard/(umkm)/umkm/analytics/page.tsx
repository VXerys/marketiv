import type { Metadata } from "next";
import { DashboardTabLock } from "@/components/dashboard/dashboard-tab-lock";
import { UmkmAnalyticsBoard } from "@/components/dashboard/umkm/umkm-analytics-board";
import { umkmDashboardMock } from "@/data/dashboard/umkm-mock";
import { getDashboardAccess } from "@/lib/auth/getDashboardAccess";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Analitik Performa",
  description:
    "Pantau pengeluaran, traksi tayangan, dan efisiensi kolaborasi kreator untuk mengoptimalkan performa marketing UMKM.",
  path: "/dashboard/umkm/analytics",
  keywords: ["analitik performa umkm", "dashboard marketing", "cost per view", "traksi tayangan"],
  noIndex: true,
});

export default async function UmkmAnalyticsPage() {
  const access = await getDashboardAccess("umkm");
  if (access.kind === "guest") {
    return (
      <DashboardTabLock
        title="Analitik Performa Terkunci"
        description="Halaman analitik membutuhkan data akun UMKM. Login dulu untuk membuka metrik pengeluaran, traksi tayangan, dan efisiensi kolaborasi kreator."
        hints={[
          "Bandingkan CPV antar kampanye untuk melihat efisiensi biaya.",
          "Pantau distribusi anggaran Campaign vs Rate Card secara real-time.",
          "Metrik personal UMKM tidak ditampilkan di mode preview publik.",
        ]}
      />
    );
  }

  return <UmkmAnalyticsBoard highlights={umkmDashboardMock.analyticsHighlights} fraudQueue={umkmDashboardMock.fraudQueue} orders={umkmDashboardMock.escrowOrders} />;
}
