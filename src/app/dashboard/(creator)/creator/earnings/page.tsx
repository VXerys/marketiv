import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Earnings | Dashboard Kreator",
  description: "Metrik pendapatan kreator di Marketiv.",
};

export default function CreatorEarningsPage() {
  return (
    <div>
      <h1 className="font-heading text-4xl tracking-tight">Earnings</h1>
      <p className="mt-3 max-w-xl text-foreground-muted">Placeholder metrik pendapatan kreator.</p>
    </div>
  );
}
