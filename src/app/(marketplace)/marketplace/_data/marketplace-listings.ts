import { cache } from "react";
import type { CampaignContext, MarketplaceListing, RateCardContext } from "@/types/marketplace";

const MARKETPLACE_LISTINGS: ReadonlyArray<MarketplaceListing> = [
  {
    id: "cmp-sukabumi-kuliner-001",
    mode: "campaign",
    title: "Campaign Kuliner Sukabumi - Paket Review Cepat",
    description:
      "Brief siap pakai untuk kreator mikro F&B. Fokus pada awareness menu baru dengan target performa terukur.",
    category: "Kuliner",
    amountIdr: 4200000,
    targetViews: 85000,
    reachedViews: 26120,
    status: "verified",
    creatorName: "Nadia Kitchen Stories",
    brandName: "Warung Rempah Cibadak",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=1600&q=80",
    channels: ["tiktok", "instagram"],
    tags: ["UGC", "Food Review", "Local Brand"],
    rating: 4.8,
    totalCollaborations: 34,
    updatedAt: "2026-03-30T08:32:00.000Z",
  },
  {
    id: "cmp-fashion-umkm-002",
    mode: "campaign",
    title: "Drop Koleksi Fashion Ramadan UMKM",
    description:
      "Campaign performa untuk mendorong traffic toko. Konten difokuskan pada styling before-after dan CTA checkout.",
    category: "Fashion",
    amountIdr: 5100000,
    targetViews: 120000,
    reachedViews: 74010,
    status: "open",
    creatorName: "Raka Daily Outfit",
    brandName: "Sinar Textile",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80",
    channels: ["tiktok"],
    tags: ["OOTD", "Live Shopping", "Conversion"],
    rating: 4.7,
    totalCollaborations: 51,
    updatedAt: "2026-03-30T07:50:00.000Z",
  },
  {
    id: "cmp-tech-gadget-003",
    mode: "campaign",
    title: "Awareness Gadget UMKM Elektronik",
    description:
      "Format short demo 30 detik untuk mendorong minat beli awal. Direkomendasikan untuk niche teknologi.",
    category: "Tech",
    amountIdr: 6200000,
    targetViews: 150000,
    reachedViews: 41250,
    status: "processing",
    creatorName: "Bimo Tech Everyday",
    brandName: "GadgetKita Store",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    channels: ["tiktok", "youtube"],
    tags: ["Unboxing", "Demo", "Tech"],
    rating: 4.6,
    totalCollaborations: 27,
    updatedAt: "2026-03-29T23:20:00.000Z",
  },
  {
    id: "cmp-kecantikan-004",
    mode: "campaign",
    title: "Launch Serum Lokal dengan Konten Testimoni",
    description:
      "Campaign pay-per-view dengan fokus trust building. Cocok untuk audience perempuan 18-30 tahun.",
    category: "Beauty",
    amountIdr: 4700000,
    targetViews: 96000,
    reachedViews: 39100,
    status: "verified",
    creatorName: "Alya Beauty Notes",
    brandName: "Seruni Skincare",
    avatarUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=240&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
    channels: ["instagram", "tiktok"],
    tags: ["Skincare", "Review", "UGC"],
    rating: 4.9,
    totalCollaborations: 62,
    updatedAt: "2026-03-30T06:20:00.000Z",
  },
  {
    id: "cmp-home-living-005",
    mode: "campaign",
    title: "Campaign Dekorasi Rumah Minimalis",
    description:
      "Konten transformasi ruangan untuk mendorong awareness produk home living UMKM.",
    category: "Home Living",
    amountIdr: 3900000,
    targetViews: 70000,
    reachedViews: 12800,
    status: "open",
    creatorName: "Tama Home Setup",
    brandName: "RumahRapi Studio",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80",
    channels: ["tiktok", "instagram"],
    tags: ["Home Tour", "Before After"],
    rating: 4.5,
    totalCollaborations: 18,
    updatedAt: "2026-03-29T19:20:00.000Z",
  },
  {
    id: "cmp-jasa-006",
    mode: "campaign",
    title: "Promo Jasa Desain Logo UMKM",
    description:
      "Konten edukasi singkat untuk mendorong lead jasa branding UMKM dengan CTA konsultasi.",
    category: "Jasa",
    amountIdr: 2800000,
    targetViews: 52000,
    reachedViews: 22310,
    status: "processing",
    creatorName: "Nico Branding Lab",
    brandName: "VisualKita Agency",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    channels: ["tiktok", "youtube"],
    tags: ["Branding", "Lead Gen"],
    rating: 4.4,
    totalCollaborations: 21,
    updatedAt: "2026-03-30T03:40:00.000Z",
  },
  {
    id: "rate-creator-kuliner-101",
    mode: "rate_card",
    title: "Rate Card UGC Kuliner - 2 Video Reels",
    description:
      "Paket fixed price untuk produksi konten kuliner dengan 2 revisi, termasuk script hook dan caption.",
    category: "Kuliner",
    amountIdr: 1700000,
    targetViews: null,
    reachedViews: null,
    status: "verified",
    creatorName: "Nadia Kitchen Stories",
    brandName: "Creator Service",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80",
    channels: ["instagram", "tiktok"],
    tags: ["UGC", "Rate Card", "Negotiation"],
    rating: 4.9,
    totalCollaborations: 73,
    updatedAt: "2026-03-30T07:00:00.000Z",
  },
  {
    id: "rate-fashion-102",
    mode: "rate_card",
    title: "Fashion Lookbook Creator Package",
    description:
      "Konten lookbook untuk katalog produk UMKM. Include storyboard, talent direction, dan collab post.",
    category: "Fashion",
    amountIdr: 2400000,
    targetViews: null,
    reachedViews: null,
    status: "verified",
    creatorName: "Raka Daily Outfit",
    brandName: "Creator Service",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80",
    channels: ["tiktok", "instagram"],
    tags: ["Lookbook", "Collab Post"],
    rating: 4.8,
    totalCollaborations: 58,
    updatedAt: "2026-03-29T22:16:00.000Z",
  },
  {
    id: "rate-tech-103",
    mode: "rate_card",
    title: "Creator Tech Review Dedicated Slot",
    description:
      "Dedicated content review dengan angle edukatif untuk gadget UMKM. Cocok untuk positioning trust.",
    category: "Tech",
    amountIdr: 3100000,
    targetViews: null,
    reachedViews: null,
    status: "open",
    creatorName: "Bimo Tech Everyday",
    brandName: "Creator Service",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=80",
    channels: ["youtube", "tiktok"],
    tags: ["Dedicated Review", "Tech"],
    rating: 4.7,
    totalCollaborations: 39,
    updatedAt: "2026-03-30T00:28:00.000Z",
  },
  {
    id: "rate-beauty-104",
    mode: "rate_card",
    title: "Beauty Creator Package - Story + Reels",
    description:
      "Paket consultative untuk launch produk kecantikan dengan pendekatan storytelling dan collab post.",
    category: "Beauty",
    amountIdr: 2250000,
    targetViews: null,
    reachedViews: null,
    status: "processing",
    creatorName: "Alya Beauty Notes",
    brandName: "Creator Service",
    avatarUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=240&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=80",
    channels: ["instagram", "tiktok"],
    tags: ["Skincare", "Storytelling"],
    rating: 4.9,
    totalCollaborations: 67,
    updatedAt: "2026-03-30T08:00:00.000Z",
  },
  {
    id: "rate-home-105",
    mode: "rate_card",
    title: "Home Decor Creator Collab Premium",
    description:
      "Produksi konten interior style modern minimalis, termasuk 1 sesi konsultasi strategi konten.",
    category: "Home Living",
    amountIdr: 2600000,
    targetViews: null,
    reachedViews: null,
    status: "open",
    creatorName: "Tama Home Setup",
    brandName: "Creator Service",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1600&q=80",
    channels: ["instagram"],
    tags: ["Home Living", "Consultative"],
    rating: 4.6,
    totalCollaborations: 31,
    updatedAt: "2026-03-29T17:45:00.000Z",
  },
  {
    id: "rate-jasa-106",
    mode: "rate_card",
    title: "Creator Ads Script + Production Paket",
    description:
      "Paket kreatif untuk UMKM jasa: script, talent delivery, dan editing siap publish.",
    category: "Jasa",
    amountIdr: 1950000,
    targetViews: null,
    reachedViews: null,
    status: "verified",
    creatorName: "Nico Branding Lab",
    brandName: "Creator Service",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=80",
    channels: ["tiktok", "youtube"],
    tags: ["Ads Creative", "Negotiation"],
    rating: 4.5,
    totalCollaborations: 42,
    updatedAt: "2026-03-30T02:11:00.000Z",
  },
];

const CAMPAIGN_CONTEXT_BY_ID: Record<string, CampaignContext> = {
  "cmp-sukabumi-kuliner-001": {
    briefObjective: "Meningkatkan awareness menu seasonal UMKM kuliner melalui konten review cepat.",
    briefInstructions: [
      "Gunakan hook 3 detik pertama yang menyorot visual plating.",
      "Tunjukkan 2 keunggulan rasa dan 1 value pricing.",
      "Sisipkan CTA kunjungi toko atau pesan via marketplace.",
    ],
    payoutPer1kViewsIdr: 4800,
    creatorQuotaTotal: 12,
    creatorQuotaClaimed: 7,
    deadlineText: "Submit konten maksimal 4 hari setelah klaim",
    assetPackage: {
      internalAssets: ["Logo brand PNG", "Foto menu hero", "Panduan tone caption"],
      externalDriveUrl: "https://drive.google.com/drive/folders/marketiv-cmp-kuliner-001",
      note: "Video mentah > 100MB disediakan via Google Drive sesuai policy Marketiv.",
    },
  },
  "cmp-fashion-umkm-002": {
    briefObjective: "Dorong traffic ke katalog fashion Ramadan dengan format look transition.",
    briefInstructions: [
      "Buka dengan before-after outfit dalam 5 detik pertama.",
      "Tampilkan detail bahan dan cutting utama.",
      "Akhiri dengan CTA cek koleksi terbaru.",
    ],
    payoutPer1kViewsIdr: 5200,
    creatorQuotaTotal: 15,
    creatorQuotaClaimed: 11,
    deadlineText: "Draft pertama dalam 3 hari, final maks 5 hari",
    assetPackage: {
      internalAssets: ["Brand guideline mini", "Foto produk flatlay", "Daftar hashtag"],
      externalDriveUrl: "https://drive.google.com/drive/folders/marketiv-cmp-fashion-002",
      note: "Aset video catwalk full-res dikirim via Drive karena melewati batas upload internal.",
    },
  },
  "cmp-tech-gadget-003": {
    briefObjective: "Perkuat trust produk gadget lokal dengan demo fitur singkat.",
    briefInstructions: [
      "Highlight fitur unggulan dalam format quick demo.",
      "Tunjukkan use case real 1 hari pemakaian.",
      "Gunakan CTA bandingkan harga dan spesifikasi.",
    ],
    payoutPer1kViewsIdr: 5600,
    creatorQuotaTotal: 10,
    creatorQuotaClaimed: 6,
    deadlineText: "Konten harus tayang dalam 6 hari setelah klaim",
    assetPackage: {
      internalAssets: ["Product sheet PDF", "Brand logo SVG", "Angle shooting list"],
      externalDriveUrl: null,
      note: "Seluruh aset tersedia langsung dari dashboard Marketiv.",
    },
  },
  "cmp-kecantikan-004": {
    briefObjective: "Naikkan trust skincare lokal lewat testimoni terstruktur.",
    briefInstructions: [
      "Buat narasi problem-solution dalam 20-30 detik.",
      "Tampilkan texture shot dan cara pakai.",
      "Cantumkan disclaimer hasil penggunaan.",
    ],
    payoutPer1kViewsIdr: 5000,
    creatorQuotaTotal: 14,
    creatorQuotaClaimed: 9,
    deadlineText: "Maksimal 5 hari dari waktu campaign diklaim",
    assetPackage: {
      internalAssets: ["FAQ produk", "Before-after references", "Caption key points"],
      externalDriveUrl: "https://drive.google.com/drive/folders/marketiv-cmp-beauty-004",
      note: "Aset close-up footage HD tersedia melalui link eksternal.",
    },
  },
  "cmp-home-living-005": {
    briefObjective: "Membangun awareness produk home living dengan konsep room transformation.",
    briefInstructions: [
      "Buka dengan kondisi ruangan sebelum styling.",
      "Tampilkan proses pemasangan 2-3 properti utama.",
      "Akhiri dengan showcase hasil akhir + CTA.",
    ],
    payoutPer1kViewsIdr: 4300,
    creatorQuotaTotal: 8,
    creatorQuotaClaimed: 3,
    deadlineText: "Deadline publikasi 7 hari setelah klaim",
    assetPackage: {
      internalAssets: ["Moodboard visual", "List produk prioritas", "Template caption"],
      externalDriveUrl: null,
      note: "Aset tersedia di Marketiv, tidak memerlukan link eksternal.",
    },
  },
  "cmp-jasa-006": {
    briefObjective: "Menghasilkan lead jasa desain logo lewat konten edukasi praktis.",
    briefInstructions: [
      "Mulai dengan 1 kesalahan umum branding UMKM.",
      "Tunjukkan contoh before-after logo.",
      "Ajak audience konsultasi via CTA akhir.",
    ],
    payoutPer1kViewsIdr: 3900,
    creatorQuotaTotal: 9,
    creatorQuotaClaimed: 5,
    deadlineText: "Konten tayang maksimal 4 hari dari klaim",
    assetPackage: {
      internalAssets: ["Slide edukasi", "Contoh logo", "Angle narasi"],
      externalDriveUrl: "https://drive.google.com/drive/folders/marketiv-cmp-service-006",
      note: "Contoh project besar diberikan via link Drive karena ukuran file tinggi.",
    },
  },
};

const RATE_CARD_CONTEXT_BY_ID: Record<string, RateCardContext> = {
  "rate-creator-kuliner-101": {
    packageName: "UGC Kuliner Starter",
    deliverables: ["2 video reels 30-45 detik", "1 caption pack", "Thumbnail cover"],
    revisionPolicy: "2x revisi minor dalam 3 hari",
    estimatedDays: 4,
    chatPolicy: "Negosiasi aktif melalui chat room rate card",
    escrowPolicy: "Pembayaran diamankan lewat escrow sebelum produksi",
    collabPostRequired: true,
    portfolioLinks: [
      "https://instagram.com/p/sample-kuliner-01",
      "https://tiktok.com/@creator/sample-kuliner-02",
    ],
    customOfferScope: "Script hook, produksi konten, dan editing final.",
  },
  "rate-fashion-102": {
    packageName: "Lookbook Fashion Pro",
    deliverables: ["2 video lookbook", "1 storyboard", "1 CTA variation"],
    revisionPolicy: "2x revisi dengan feedback terstruktur",
    estimatedDays: 5,
    chatPolicy: "Brief dan negosiasi harga dikelola via chat rate card",
    escrowPolicy: "UMKM deposit dulu, kreator eksekusi setelah escrow aktif",
    collabPostRequired: true,
    portfolioLinks: [
      "https://instagram.com/p/sample-fashion-01",
      "https://tiktok.com/@creator/sample-fashion-02",
    ],
    customOfferScope: "Styling concept, shoot plan, dan final editing.",
  },
  "rate-tech-103": {
    packageName: "Tech Dedicated Review",
    deliverables: ["1 dedicated review", "1 short teaser", "Spec comparison note"],
    revisionPolicy: "1x revisi utama + 1x minor",
    estimatedDays: 6,
    chatPolicy: "Diskusi script dan angle review melalui chat",
    escrowPolicy: "Escrow release setelah konten tervalidasi",
    collabPostRequired: true,
    portfolioLinks: [
      "https://youtube.com/watch/sample-tech-01",
      "https://tiktok.com/@creator/sample-tech-02",
    ],
    customOfferScope: "Review naratif + demo penggunaan real case.",
  },
  "rate-beauty-104": {
    packageName: "Beauty Story Reels",
    deliverables: ["1 reels storytelling", "1 reels tutorial", "Caption education"],
    revisionPolicy: "2x revisi dengan batas perubahan script",
    estimatedDays: 5,
    chatPolicy: "Negosiasi deliverable dilakukan di chat room",
    escrowPolicy: "Escrow wajib sebelum timeline produksi dimulai",
    collabPostRequired: true,
    portfolioLinks: [
      "https://instagram.com/p/sample-beauty-01",
      "https://tiktok.com/@creator/sample-beauty-02",
    ],
    customOfferScope: "Story concept, treatment visual, dan editing tone skin-safe.",
  },
  "rate-home-105": {
    packageName: "Home Decor Showcase",
    deliverables: ["1 room makeover video", "1 before-after cut", "1 shotlist setup"],
    revisionPolicy: "1x revisi mayor + 1x minor",
    estimatedDays: 7,
    chatPolicy: "Kebutuhan setting dan properti dibahas via chat",
    escrowPolicy: "Escrow memastikan keamanan biaya kolaborasi",
    collabPostRequired: true,
    portfolioLinks: [
      "https://instagram.com/p/sample-home-01",
      "https://tiktok.com/@creator/sample-home-02",
    ],
    customOfferScope: "Konsep makeover, produksi, dan final walkthrough cut.",
  },
  "rate-jasa-106": {
    packageName: "Ads Script Production",
    deliverables: ["1 video ads", "1 script custom", "1 CTA optimization set"],
    revisionPolicy: "2x revisi untuk angle script dan CTA",
    estimatedDays: 4,
    chatPolicy: "UMKM dapat negosiasi scope dan deadline via chat",
    escrowPolicy: "Dana ditahan di escrow sampai hasil diverifikasi",
    collabPostRequired: true,
    portfolioLinks: [
      "https://youtube.com/watch/sample-service-01",
      "https://tiktok.com/@creator/sample-service-02",
    ],
    customOfferScope: "Penulisan script conversion dan produksi ads siap tayang.",
  },
};

function withModeContext(item: MarketplaceListing): MarketplaceListing {
  if (item.mode === "campaign") {
    return {
      ...item,
      campaignContext: CAMPAIGN_CONTEXT_BY_ID[item.id],
    };
  }

  return {
    ...item,
    rateCardContext: RATE_CARD_CONTEXT_BY_ID[item.id],
  };
}

function cloneListings() {
  return MARKETPLACE_LISTINGS.map((item) => withModeContext(item));
}

export const getMarketplaceListings = cache(async (): Promise<ReadonlyArray<MarketplaceListing>> => {
  return cloneListings();
});

export const getMarketplaceListingById = cache(async (listingId: string): Promise<MarketplaceListing | null> => {
  const normalizedListingId = decodeURIComponent(listingId).trim();
  const found = MARKETPLACE_LISTINGS.find((item) => item.id === normalizedListingId);

  if (!found) {
    return null;
  }

  return withModeContext(found);
});

export const getMarketplaceListingIds = cache(async (): Promise<ReadonlyArray<string>> => {
  return MARKETPLACE_LISTINGS.map((item) => item.id);
});