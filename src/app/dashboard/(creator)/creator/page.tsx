import type { Metadata } from "next";
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
  return (
    <div className="text-foreground">
      <h1 className="font-heading text-5xl tracking-tight">Dashboard Kreator</h1>
      <p className="mt-4 max-w-xl text-foreground-muted">
        Pantau peluang campaign, progres deliverable, dan performa konten agar pertumbuhan karier kreator lebih terarah.
      </p>
    </div>
  );
}
