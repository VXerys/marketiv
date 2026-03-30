"use client";

import { SiteErrorTemplate } from "@/components/layout/site-error-template";
import { SITE_ERROR_PRESETS } from "@/data/error-presets";

interface MarketplaceDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MarketplaceDetailError({ error, reset }: MarketplaceDetailErrorProps) {
  const preset = SITE_ERROR_PRESETS.runtime;

  return (
    <SiteErrorTemplate
      code={preset.code}
      eyebrow="DETAIL LISTING ERROR"
      title="GAGAL MEMUAT DETAIL POSTINGAN"
      description="Terjadi gangguan ketika menampilkan detail postingan. Coba muat ulang halaman."
      highlights={preset.highlights}
      contextLabel="MARKETPLACE DETAIL"
      reference={error.digest ?? "marketplace-detail-unknown"}
      retryLabel="COBA MUAT DETAIL"
      onRetry={reset}
      actions={[
        { label: "KEMBALI KE FEED MARKETPLACE", href: "/marketplace", variant: "secondary" },
      ]}
    />
  );
}
