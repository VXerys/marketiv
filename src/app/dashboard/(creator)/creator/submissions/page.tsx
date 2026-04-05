import type { Metadata } from "next";
import { CreatorSubmissionsBoard } from "@/components/dashboard/creator/creator-submissions-board";
import { creatorDashboardMock } from "@/data/dashboard/creator-mock";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tracking Submission Kreator",
  description:
    "Monitor status submission campaign, catatan revisi, dan eskalasi dispute untuk menjaga kualitas delivery kreator.",
  path: "/dashboard/creator/submissions",
  keywords: ["submission kreator", "status revisi", "dispute campaign", "tracking deliverable"],
  noIndex: true,
});

export default function CreatorSubmissionsPage() {
  return <CreatorSubmissionsBoard submissions={creatorDashboardMock.submissions} />;
}
