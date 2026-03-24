import type { EscrowStatus } from "./marketiv-umkm-section.data";

interface StatusBadgeProps {
  status: EscrowStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isVerified = status === "VERIFIED";

  return (
    <span
      className={`inline-flex min-w-[78px] items-center justify-center border px-2 py-1 font-label text-[9px] tracking-[0.16em] ${
        isVerified
          ? "border-foreground bg-foreground text-background"
          : "border-border-strong/45 bg-transparent text-foreground-subtle"
      }`}
    >
      {status}
    </span>
  );
}
