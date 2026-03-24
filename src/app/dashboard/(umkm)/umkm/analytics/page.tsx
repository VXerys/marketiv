import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spend Analytics | Dashboard UMKM",
  description: "Metrik pengeluaran dan performa campaign UMKM.",
};

export default function UmkmAnalyticsPage() {
  return (
    <div>
      <h1 className="font-heading text-4xl tracking-tight">Spend Analytics</h1>
      <p className="mt-3 max-w-xl text-foreground-muted">Placeholder metrik performa UMKM.</p>
    </div>
  );
}
