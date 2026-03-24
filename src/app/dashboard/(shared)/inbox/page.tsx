import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox | Marketiv",
  description: "Pusat notifikasi dan komunikasi di Marketiv.",
};

export default function InboxPage() {
  return (
    <div className="text-foreground">
      <h1 className="font-heading text-5xl tracking-tight">Inbox</h1>
      <p className="mt-4 max-w-xl text-foreground-muted">
        Halaman inbox menjadi target migrasi route contact lama dan pondasi komunikasi terautentikasi.
      </p>
    </div>
  );
}
