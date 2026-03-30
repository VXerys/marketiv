"use client";

import { SiteErrorTemplate } from "@/components/layout/site-error-template";
import { SITE_ERROR_PRESETS } from "@/data/error-presets";

interface GlobalCrashErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalCrashErrorProps) {
  const preset = SITE_ERROR_PRESETS.network;

  return (
    <html lang="id">
      <body className="bg-background text-foreground">
        <SiteErrorTemplate
          code={preset.code}
          eyebrow="GLOBAL APP CRASH"
          title="APLIKASI SEMENTARA TIDAK STABIL"
          description="Terjadi gangguan tingkat aplikasi. Coba muat ulang untuk memulai ulang sesi."
          highlights={preset.highlights}
          contextLabel="ROOT LAYOUT"
          reference={error.digest ?? "global-crash-unknown"}
          retryLabel="RESET APLIKASI"
          onRetry={reset}
          actions={[
            { label: "KEMBALI KE LANDING", href: "/", variant: "primary" },
          ]}
        />
      </body>
    </html>
  );
}
