import type { Metadata } from "next";
import { DashboardTabLock } from "@/components/dashboard/dashboard-tab-lock";
import { UmkmCampaignWizard } from "@/components/dashboard/umkm/umkm-campaign-wizard";
import { umkmDashboardMock } from "@/data/dashboard/umkm-mock";
import { getDashboardAccess } from "@/lib/auth/getDashboardAccess";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Campaign Brief UMKM",
  description:
    "Susun brief campaign berbasis AI agar arahan konten lebih presisi, revisi lebih minim, dan eksekusi kreator lebih cepat.",
  path: "/dashboard/umkm/campaigns",
  keywords: ["campaign brief umkm", "ai brief generator", "brief konten marketing", "arahan kreator"],
  noIndex: true,
});

export default async function UmkmCampaignsPage() {
  const access = await getDashboardAccess("umkm");
  if (access.kind === "guest") {
    return (
      <DashboardTabLock
        title="Campaign Brief Terkunci"
        description="Untuk membuat brief campaign, mengatur budget escrow, dan aktivasi campaign ke Job Pool, silakan login sebagai UMKM terlebih dahulu."
        hints={[
          "Campaign Mode tidak menyediakan chat, semua instruksi lewat brief wizard.",
          "Validasi aset dan budget membutuhkan sesi akun agar progres tersimpan.",
          "Setelah login, kamu bisa langsung lanjut ke Step 1-4 tanpa kehilangan konteks.",
        ]}
      />
    );
  }

  return <UmkmCampaignWizard steps={umkmDashboardMock.campaignWizardSteps} />;
}
