import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign Brief | Dashboard UMKM",
  description: "Pembuatan brief campaign untuk UMKM.",
};

export default function UmkmCampaignsPage() {
  return (
    <div>
      <h1 className="font-heading text-4xl tracking-tight">Campaign Brief</h1>
      <p className="mt-3 max-w-xl text-foreground-muted">Placeholder pembuatan brief dan upload asset UMKM.</p>
    </div>
  );
}
