import { SiteErrorTemplate } from "@/components/layout/site-error-template";
import { SITE_ERROR_PRESETS } from "@/data/error-presets";

export default function GlobalNotFound() {
  const preset = SITE_ERROR_PRESETS["not-found"];

  return (
    <SiteErrorTemplate
      code={preset.code}
      eyebrow={preset.eyebrow}
      title={preset.title}
      description={preset.description}
      highlights={preset.highlights}
      contextLabel="GLOBAL WEBSITE"
      actions={[
        { label: "KEMBALI KE LANDING", href: "/", variant: "primary" },
        { label: "BUKA MARKETPLACE", href: "/marketplace", variant: "secondary" },
      ]}
    />
  );
}
