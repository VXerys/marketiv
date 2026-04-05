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

export interface UmkmGrowthMetric {
  label: string;
  value: string;
  trend: string;
}

export interface UmkmPulseSignal {
  label: string;
  value: string;
}

export interface UmkmCreatorAvatar {
  id: string;
  initials: string;
  toneClass: string;
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
    title: "ESCROW TERPROTEKSI",
    description: "Anggaran kampanye ditahan aman sampai hasil tervalidasi, sehingga risiko fraud dapat ditekan signifikan.",
  },
  {
    label: "KECERDASAN",
    title: "AI BRIEF GENERATOR",
    description: "Cukup masukkan detail produk, AI menyusun brief kreatif lengkap dalam hitungan detik.",
  },
  {
    label: "TRANSPARANSI",
    title: "RATE CARD LIVE",
    description: "Biaya promosi dihitung per views tervalidasi dengan dashboard transparan untuk evaluasi ROI.",
  },
];

export const UMKM_GROWTH_METRICS: UmkmGrowthMetric[] = [
  {
    label: "UMKM BERGABUNG",
    value: "500+",
    trend: "+12.4% pertumbuhan 30 hari",
  },
  {
    label: "CAMPAIGN LIVE",
    value: "1,247",
    trend: "Rata-rata 82 brief aktif per hari",
  },
];

export const UMKM_PULSE_SIGNALS: UmkmPulseSignal[] = [
  {
    label: "VALIDASI ESCROW",
    value: "96.8%",
  },
  {
    label: "SUBMISSION ON-TIME",
    value: "91.2%",
  },
  {
    label: "ROI POSITIF",
    value: "3.6x",
  },
];

export const UMKM_CREATOR_AVATARS: UmkmCreatorAvatar[] = [
  {
    id: "ara",
    initials: "AR",
    toneClass: "bg-[#1f2937] text-white",
  },
  {
    id: "bimo",
    initials: "BM",
    toneClass: "bg-[#334155] text-white",
  },
  {
    id: "nisa",
    initials: "NS",
    toneClass: "bg-[#0f172a] text-white",
  },
  {
    id: "dani",
    initials: "DN",
    toneClass: "bg-[#475569] text-white",
  },
  {
    id: "lia",
    initials: "LI",
    toneClass: "bg-[#111827] text-white",
  },
];
