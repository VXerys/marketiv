import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Peluang Campaign Kreator",
  description:
    "Akses daftar campaign relevan berdasarkan niche agar kreator dapat memilih brief dengan potensi performa terbaik.",
  path: "/dashboard/creator/jobs",
  keywords: ["job kreator", "peluang campaign", "brief konten", "kolaborasi brand"],
  noIndex: true,
});

export default function CreatorJobsPage() {
  return (
    <div>
      <h1 className="font-heading text-4xl tracking-tight">Peluang Campaign</h1>
      <p className="mt-3 max-w-xl text-foreground-muted">
        Kurasi daftar campaign aktif berdasarkan niche dan kapasitasmu untuk meningkatkan peluang deal yang relevan.
      </p>
    </div>
  );
}
