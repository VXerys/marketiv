import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portofolio Kreator",
  description:
    "Susun portofolio campaign lengkap dengan metrik performa agar peluang kolaborasi brand meningkat konsisten.",
  path: "/dashboard/creator/portfolio",
  keywords: ["portofolio kreator", "hasil campaign", "rekam jejak konten", "profil kreator"],
  noIndex: true,
});

export default function CreatorPortfolioPage() {
  return (
    <div>
      <h1 className="font-heading text-4xl tracking-tight">Portofolio Kreator</h1>
      <p className="mt-3 max-w-xl text-foreground-muted">
        Tampilkan hasil konten terbaik beserta data performa untuk memperkuat positioning profesionalmu di hadapan brand.
      </p>
    </div>
  );
}
