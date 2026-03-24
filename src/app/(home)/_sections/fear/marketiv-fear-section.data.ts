export type FearIconType = "financial" | "quality" | "literacy";

export interface FearPoint {
  number: string;
  label: string;
  title: string;
  description: string;
  icon: FearIconType;
}

export const FEAR_POINTS: FearPoint[] = [
  {
    number: "01",
    label: "SISTEM RATE CARD KONVENSIONAL",
    title: "RISIKO FINANSIAL",
    description:
      "Bayar di muka tanpa jaminan. Kreator belum posting, budget sudah ludes. Model lama tidak punya safeguard.",
    icon: "financial",
  },
  {
    number: "02",
    label: "MANIPULASI BOT & VIEWS PALSU",
    title: "KUALITAS RENDAH",
    description:
      "Metrik terlihat besar, konversi nol. Bot memenuhi laporan engagement. UMKM tidak punya cara verifikasi.",
    icon: "quality",
  },
  {
    number: "03",
    label: "KESULITAN MENYUSUN BRIEF",
    title: "LITERASI DIGITAL",
    description:
      "UMKM tidak tahu cara komunikasi kreatif. Brief buruk menghasilkan konten buruk. Lingkaran setan.",
    icon: "literacy",
  },
];
