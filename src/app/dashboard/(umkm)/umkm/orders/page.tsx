import type { Metadata } from "next";
import { DashboardTabLock } from "@/components/dashboard/dashboard-tab-lock";
import { UmkmOrdersBoard } from "@/components/dashboard/umkm/umkm-orders-board";
import { umkmDashboardMock } from "@/data/dashboard/umkm-mock";
import { getDashboardAccess } from "@/lib/auth/getDashboardAccess";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Manajemen Order Campaign",
  description:
    "Kelola alur order campaign dari brief, proses produksi konten, hingga verifikasi hasil untuk menjaga SLA kolaborasi.",
  path: "/dashboard/umkm/orders",
  keywords: ["order campaign", "manajemen campaign umkm", "proses kolaborasi kreator", "tracking deliverable"],
  noIndex: true,
});

export default async function UmkmOrdersPage() {
  const access = await getDashboardAccess("umkm");
  if (access.kind === "guest") {
    return (
      <DashboardTabLock
        title="Order & Escrow Terkunci"
        description="Modul ini menampilkan status deposit, escrow, dan release dana. Untuk menjaga keamanan transaksi, akses penuh hanya tersedia setelah login UMKM."
        hints={[
          "Pantau update webhook Midtrans dan status order secara real-time setelah login.",
          "Aksi operasional seperti validasi dan eskalasi dispute memerlukan identitas akun.",
          "Kamu tetap bisa melihat ringkasan umum di tab Overview tanpa login.",
        ]}
      />
    );
  }

  return <UmkmOrdersBoard orders={umkmDashboardMock.escrowOrders} />;
}
