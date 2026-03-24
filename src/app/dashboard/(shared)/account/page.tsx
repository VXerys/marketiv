import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account | Marketiv",
  description: "Pengaturan akun Marketiv.",
};

export default function AccountPage() {
  return (
    <div className="text-foreground">
      <h1 className="font-heading text-5xl tracking-tight">Account</h1>
      <p className="mt-4 max-w-xl text-foreground-muted">
        Halaman account digunakan sebagai target migrasi route lama dan pusat pengaturan profil.
      </p>
    </div>
  );
}
