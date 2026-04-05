import type { Metadata } from "next";
import { CreatorJobBoard } from "@/components/dashboard/creator/creator-job-board";
import { creatorDashboardMock } from "@/data/dashboard/creator-mock";
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
  return <CreatorJobBoard jobs={creatorDashboardMock.jobs} />;
}
