import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Manajemen Order Campaign",
  description:
    "Kelola alur order campaign dari brief, proses produksi konten, hingga verifikasi hasil untuk menjaga SLA kolaborasi.",
  path: "/dashboard/umkm/orders",
  keywords: ["order campaign", "manajemen campaign umkm", "proses kolaborasi kreator", "tracking deliverable"],
  noIndex: true,
});

export default function UmkmOrdersPage() {
  return (
    <div>
      <h1 className="font-heading text-4xl tracking-tight">Manajemen Order Campaign</h1>
      <p className="mt-3 max-w-xl text-foreground-muted">
        Monitor progres setiap order campaign, status validasi konten, dan kebutuhan tindak lanjut operasional secara terpusat.
      </p>
    </div>
  );
}
