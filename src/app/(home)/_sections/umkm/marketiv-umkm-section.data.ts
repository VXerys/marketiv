export type EscrowStatus = "VERIFIED" | "PROCESSING";

export interface EscrowRow {
  creator: string;
  niche: string;
  views: string;
  status: EscrowStatus;
  escrow: string;
}

export interface UmkmFeature {
  label: string;
  title: string;
  description: string;
}

export const ESCROW_ROWS: EscrowRow[] = [
  {
    creator: "@haniafood",
    niche: "Kuliner",
    views: "128K",
    status: "VERIFIED",
    escrow: "Rp 320K",
  },
  {
    creator: "@stylebyara",
    niche: "Fashion",
    views: "89K",
    status: "VERIFIED",
    escrow: "Rp 210K",
  },
  {
    creator: "@techwithbimo",
    niche: "Tech",
    views: "210K",
    status: "PROCESSING",
    escrow: "Rp 525K",
  },
  {
    creator: "@dapur.id",
    niche: "Kuliner",
    views: "75K",
    status: "VERIFIED",
    escrow: "Rp 190K",
  },
];

export const UMKM_FEATURES: UmkmFeature[] = [
  {
    label: "KEAMANAN",
    title: "SISTEM ESCROW",
    description: "Dana terlindungi sampai kampanye selesai dan terverifikasi. Zero fraud.",
  },
  {
    label: "KECERDASAN",
    title: "AI BRIEF GEN",
    description: "Deskripsikan produkmu, AI susun brief kreatif siap pakai.",
  },
  {
    label: "TRANSPARANSI",
    title: "RATE CARD LIVE",
    description: "Harga transparan per views. Tidak ada biaya tersembunyi.",
  },
];
