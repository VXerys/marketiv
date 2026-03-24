import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar | Marketiv",
  description: "Daftar akun baru Marketiv.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground md:px-12">
      <h1 className="font-heading text-5xl tracking-tight">Daftar</h1>
      <p className="mt-4 max-w-xl text-foreground-muted">Onboarding UMKM dan kreator akan dirilis pada iterasi berikutnya.</p>
    </main>
  );
}
