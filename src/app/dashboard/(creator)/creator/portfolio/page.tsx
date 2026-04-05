import type { Metadata } from "next";
import { CreatorPortfolioBoard } from "@/components/dashboard/creator/creator-portfolio-board";
import { creatorDashboardMock } from "@/data/dashboard/creator-mock";
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
  return <CreatorPortfolioBoard portfolio={creatorDashboardMock.portfolio} />;
}
