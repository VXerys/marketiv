import { SiteErrorTemplate } from "@/components/layout/site-error-template";
import { SITE_ERROR_PRESETS } from "@/data/error-presets";

export default function MarketplaceDetailNotFound() {
  const preset = SITE_ERROR_PRESETS["not-found"];

  return (
    <SiteErrorTemplate
      code={preset.code}
      eyebrow="MARKETPLACE DETAIL - NOT FOUND"
      title="DETAIL POSTINGAN TIDAK DITEMUKAN"
      description="Postingan yang kamu buka mungkin sudah dihapus, dipindahkan, atau URL yang diakses tidak valid."
      highlights={preset.highlights}
      contextLabel="MARKETPLACE DETAIL"
      actions={[
        { label: "KEMBALI KE FEED MARKETPLACE", href: "/marketplace", variant: "primary" },
        { label: "KEMBALI KE LANDING", href: "/", variant: "secondary" },
      ]}
    />
  );
}
