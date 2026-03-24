import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk | Marketiv",
  description: "Masuk ke akun Marketiv.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground md:px-12">
      <h1 className="font-heading text-5xl tracking-tight">Masuk</h1>
      <p className="mt-4 max-w-xl text-foreground-muted">Halaman autentikasi Marketiv sedang disiapkan.</p>
    </main>
  );
}
