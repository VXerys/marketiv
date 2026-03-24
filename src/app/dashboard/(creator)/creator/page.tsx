import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Kreator | Marketiv",
  description: "Workspace kreator untuk campaign, portofolio, dan metrik penghasilan.",
};

export default function CreatorDashboardPage() {
  return (
    <div className="text-foreground">
      <h1 className="font-heading text-5xl tracking-tight">Dashboard Kreator</h1>
      <p className="mt-4 max-w-xl text-foreground-muted">Halaman ini adalah scaffold awal untuk workspace kreator.</p>
    </div>
  );
}
