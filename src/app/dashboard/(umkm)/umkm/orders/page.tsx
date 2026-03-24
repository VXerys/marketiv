import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | Dashboard UMKM",
  description: "Manajemen pesanan untuk workspace UMKM.",
};

export default function UmkmOrdersPage() {
  return (
    <div>
      <h1 className="font-heading text-4xl tracking-tight">Orders</h1>
      <p className="mt-3 max-w-xl text-foreground-muted">Placeholder halaman manajemen pesanan UMKM.</p>
    </div>
  );
}
