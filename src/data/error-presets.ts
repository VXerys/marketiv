export type SiteErrorVariant = "not-found" | "runtime" | "network" | "forbidden" | "maintenance";

export interface SiteErrorPreset {
  code: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: ReadonlyArray<string>;
}

export const SITE_ERROR_PRESETS: Record<SiteErrorVariant, SiteErrorPreset> = {
  "not-found": {
    code: "404",
    eyebrow: "RESOURCE NOT FOUND",
    title: "HALAMAN TIDAK DITEMUKAN",
    description: "URL yang kamu akses tidak tersedia atau sudah dipindahkan.",
    highlights: [
      "Periksa kembali URL yang dimasukkan",
      "Gunakan navigasi utama untuk kembali ke flow yang benar",
      "Lanjutkan eksplorasi dari halaman marketplace atau landing",
    ],
  },
  runtime: {
    code: "500",
    eyebrow: "UNEXPECTED RUNTIME ERROR",
    title: "TERJADI GANGGUAN SISTEM",
    description: "Ada kesalahan tak terduga saat memproses halaman ini.",
    highlights: [
      "Coba muat ulang halaman",
      "Jika berulang, kembali ke halaman sebelumnya",
      "Lanjutkan dari area yang paling relevan untuk task kamu",
    ],
  },
  network: {
    code: "503",
    eyebrow: "SERVICE UNAVAILABLE",
    title: "LAYANAN SEMENTARA TIDAK TERSEDIA",
    description: "Server sedang sibuk atau koneksi terputus sementara.",
    highlights: [
      "Cek koneksi internet kamu",
      "Tunggu beberapa saat lalu coba lagi",
      "Gunakan halaman yang sudah sempat terbuka sebagai fallback",
    ],
  },
  forbidden: {
    code: "403",
    eyebrow: "ACCESS FORBIDDEN",
    title: "AKSES DITOLAK",
    description: "Kamu tidak memiliki izin untuk membuka halaman ini.",
    highlights: [
      "Pastikan role akun kamu sesuai",
      "Coba login ulang dengan role yang benar",
      "Kembali ke dashboard atau halaman publik",
    ],
  },
  maintenance: {
    code: "503",
    eyebrow: "MAINTENANCE WINDOW",
    title: "SISTEM SEDANG PERAWATAN",
    description: "Platform sedang diperbarui untuk peningkatan stabilitas.",
    highlights: [
      "Simpan pekerjaan penting kamu",
      "Coba akses kembali dalam beberapa menit",
      "Pantau halaman utama untuk update status",
    ],
  },
};
