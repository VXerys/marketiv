"use client";

import { SiteErrorTemplate } from "@/components/layout/site-error-template";
import { SITE_ERROR_PRESETS } from "@/data/error-presets";

interface MarketplaceErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MarketplaceError({ error, reset }: MarketplaceErrorProps) {
  const preset = SITE_ERROR_PRESETS.runtime;

  return (
    <SiteErrorTemplate
      code={preset.code}
      eyebrow="MARKETPLACE LISTING ERROR"
      title="GAGAL MEMUAT LISTING MARKETPLACE"
      description="Terjadi gangguan ketika mengambil data marketplace. Silakan coba muat ulang halaman."
      highlights={preset.highlights}
      contextLabel="MARKETPLACE FEED"
      reference={error.digest ?? "marketplace-unknown"}
      retryLabel="COBA MUAT LISTING"
      onRetry={reset}
      actions={[
        { label: "KEMBALI KE LANDING", href: "/", variant: "secondary" },
      ]}
    />
  );
}