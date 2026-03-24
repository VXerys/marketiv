import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { inter, playfairDisplay, spaceGrotesk } from "@/lib/fonts";
import { seoConfig } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: "Marketiv | Marketplace Kolaborasi UMKM dan Kreator",
    template: "%s | Marketiv",
  },
  description:
    "Marketiv adalah marketplace kolaborasi untuk UMKM dan kreator mikro dengan AI brief generator, escrow aman, dan pembayaran berbasis views tervalidasi.",
  keywords: [
    "marketplace UMKM",
    "kreator mikro Indonesia",
    "AI brief generator",
    "escrow campaign",
    "pembayaran per views",
    "platform influencer UMKM",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: "Marketiv | Marketplace Kolaborasi UMKM dan Kreator",
    description:
      "Tingkatkan hasil pemasaran UMKM lewat kampanye kreator mikro terverifikasi, brief berbasis AI, dan kontrol anggaran berbasis escrow.",
    images: [
      {
        url: "/file.svg",
        width: 1200,
        height: 630,
        alt: "Marketiv - Marketplace UMKM x Kreator Mikro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketiv | Marketplace Kolaborasi UMKM dan Kreator",
    description:
      "Scale campaign UMKM dengan kreator mikro terverifikasi, AI brief generator, dan transparansi performa real-time.",
    images: ["/file.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Marketiv",
    url: seoConfig.siteUrl,
    description:
      "Marketplace kolaborasi UMKM dan kreator mikro dengan AI brief generator, escrow aman, serta analitik performa campaign.",
    logo: `${seoConfig.siteUrl}/file.svg`,
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Marketiv",
    url: seoConfig.siteUrl,
    inLanguage: "id-ID",
    description:
      "Platform pemasaran digital untuk UMKM dan kreator mikro dengan model pembayaran berbasis views tervalidasi.",
  };

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${playfairDisplay.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-body antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
