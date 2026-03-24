import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Dashboard Kreator",
  description: "Portofolio konten dan performa kreator.",
};

export default function CreatorPortfolioPage() {
  return (
    <div>
      <h1 className="font-heading text-4xl tracking-tight">Portfolio</h1>
      <p className="mt-3 max-w-xl text-foreground-muted">Placeholder showcase portofolio kreator.</p>
    </div>
  );
}
