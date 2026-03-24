import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Inbox Kolaborasi",
  description:
    "Pantau notifikasi campaign, pembaruan brief, dan komunikasi lintas tim agar eksekusi kolaborasi tetap sinkron.",
  path: "/dashboard/inbox",
  keywords: ["inbox marketiv", "notifikasi campaign", "komunikasi kreator umkm", "update brief"],
  noIndex: true,
});

export default function InboxPage() {
  return (
    <div className="text-foreground">
      <h1 className="font-heading text-5xl tracking-tight">Inbox Kolaborasi</h1>
      <p className="mt-4 max-w-xl text-foreground-muted">
        Seluruh notifikasi campaign, revisi brief, dan pesan operasional terkonsolidasi untuk mempercepat pengambilan keputusan.
      </p>
    </div>
  );
}
