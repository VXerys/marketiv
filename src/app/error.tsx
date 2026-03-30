"use client";

import { SiteErrorTemplate } from "@/components/layout/site-error-template";
import { SITE_ERROR_PRESETS } from "@/data/error-presets";

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: RootErrorProps) {
  const preset = SITE_ERROR_PRESETS.runtime;

  return (
    <SiteErrorTemplate
      code={preset.code}
      eyebrow="GLOBAL ROUTE ERROR"
      title={preset.title}
      description="Aplikasi mengalami gangguan ketika memproses halaman ini."
      highlights={preset.highlights}
      contextLabel="APPLICATION ROUTE"
      reference={error.digest ?? "app-route-unknown"}
      retryLabel="MUAT ULANG HALAMAN"
      onRetry={reset}
      actions={[
        { label: "KEMBALI KE LANDING", href: "/", variant: "primary" },
        { label: "BUKA MARKETPLACE", href: "/marketplace", variant: "secondary" },
      ]}
    />
  );
}
