import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { OnboardingGuideTemplate } from "../_components/onboarding-guide-template";
import { creatorGuideContent } from "../_data/guide-content";

export const metadata: Metadata = buildMetadata({
  title: "Panduan Konten Kreator",
  description:
    "Pelajari alur step-by-step sisi konten kreator di Marketiv, dari setup profil hingga monitoring performa campaign real-time.",
  path: "/panduan/kreator",
  keywords: [
    "panduan konten kreator",
    "onboarding kreator marketiv",
    "tutorial brief campaign",
    "dashboard kreator",
    "repeat campaign kreator mikro",
  ],
});

export default function CreatorGuidePage() {
  return <OnboardingGuideTemplate {...creatorGuideContent} />;
}
