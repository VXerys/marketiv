import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs | Dashboard Kreator",
  description: "Daftar job untuk kreator di Marketiv.",
};

export default function CreatorJobsPage() {
  return (
    <div>
      <h1 className="font-heading text-4xl tracking-tight">Jobs</h1>
      <p className="mt-3 max-w-xl text-foreground-muted">Placeholder daftar job kreator.</p>
    </div>
  );
}
