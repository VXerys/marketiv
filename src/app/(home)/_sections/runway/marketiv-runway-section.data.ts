export interface RunwayStep {
  number: string;
  stepLabel: string;
  title: string;
  description: string;
}

export const RUNWAY_STEPS: RunwayStep[] = [
  {
    number: "01",
    stepLabel: "STEP 01",
    title: "UNGGAH ASET",
    description: "Upload foto, video, atau deskripsi produk UMKM ke platform.",
  },
  {
    number: "02",
    stepLabel: "STEP 02",
    title: "AI MENYUSUN\nNASKAH",
    description: "Model AI kami mengurai brand voice dan menghasilkan brief kreatif.",
  },
  {
    number: "03",
    stepLabel: "STEP 03",
    title: "KREATOR KLAIM",
    description: "Micro-creator memilih campaign yang relevan dengan niche mereka.",
  },
  {
    number: "04",
    stepLabel: "STEP 04",
    title: "BAYAR PER VIEWS",
    description: "Dana escrow dilepas hanya setelah views terverifikasi. Zero risk.",
  },
];

export const TICKER_ITEMS = [
  "AI BRIEF",
  "KREATOR KLAIM",
  "BAYAR PER VIEWS",
  "UNGGAH ASET",
  "AI BRIEF",
  "KREATOR KLAIM",
  "BAYAR PER VIEWS",
  "UNGGAH ASET",
];
