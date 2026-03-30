import Link from "next/link";
import type { UserRole } from "@/types/user";

interface RoleMismatchStateProps {
  currentRole: UserRole;
  targetHref: string;
}

const roleLabelMap: Record<UserRole, string> = {
  umkm: "UMKM",
  creator: "Content Creator",
  admin: "Admin",
};

export function RoleMismatchState({ currentRole, targetHref }: RoleMismatchStateProps) {
  const roleLabel = roleLabelMap[currentRole];

  return (
    <section className="umkm-panel border border-border p-7 md:p-10">
      <p className="font-label text-[10px] tracking-[0.2em] text-foreground-subtle">ROLE CHECK</p>
      <h1 className="mt-3 font-heading text-4xl tracking-tight text-foreground">Oops, role kamu adalah {roleLabel}</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-muted">
        Area ini khusus untuk UMKM Workspace. Untuk pengalaman yang sesuai kebutuhan akunmu, lanjutkan ke dashboard role kamu.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={targetHref}
          className="inline-flex min-h-11 items-center justify-center border border-foreground bg-foreground px-5 py-3 font-label text-[10px] tracking-[0.16em] text-background transition-opacity hover:opacity-90"
        >
          BUKA DASHBOARD {roleLabel.toUpperCase()}
        </Link>
        <Link
          href="/dashboard/account"
          className="inline-flex min-h-11 items-center justify-center border border-border-strong px-5 py-3 font-label text-[10px] tracking-[0.16em] text-foreground transition-colors hover:bg-surface"
        >
          LIHAT AKUN
        </Link>
      </div>
    </section>
  );
}
