import type { FearIconType } from "./marketiv-fear-section.data";

interface FearIconProps {
  type: FearIconType;
}

export function FearIcon({ type }: FearIconProps) {
  if (type === "financial") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-11 text-foreground">
        <rect x="1.5" y="1.5" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <path d="M5 17l4-5 3 3 6-8" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M16 7h2.8V9.8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }

  if (type === "quality") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-11 text-foreground">
        <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="12" cy="12" r="1.3" fill="currentColor" />
        <path d="M12 1.5v5M12 17.5v5M1.5 12h5M17.5 12h5" fill="none" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-11 text-foreground">
      <rect x="4" y="2.5" width="12" height="18" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M7 7h6M7 10.5h6M7 14h4" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <rect x="16" y="13" width="4.8" height="7.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M17.7 16.5h1.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
