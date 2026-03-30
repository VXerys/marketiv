import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { OnboardingGuideTemplate } from "../_components/onboarding-guide-template";
import { umkmGuideContent } from "../_data/guide-content";

export const metadata: Metadata = buildMetadata({
  title: "Panduan UMKM",
  description:
    "Pahami alur step-by-step sisi UMKM di Marketiv, dari setup campaign, AI brief, escrow, sampai evaluasi ROI yang transparan.",
  path: "/panduan/umkm",
  keywords: [
    "panduan umkm marketiv",
    "tutorial campaign umkm",
    "ai brief umkm",
    "escrow campaign",
    "analitik ROI campaign",
  ],
});

export default function UmkmGuidePage() {
  return <OnboardingGuideTemplate {...umkmGuideContent} />;
}
