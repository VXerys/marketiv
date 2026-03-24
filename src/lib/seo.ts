import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://marketiv.id";
const DEFAULT_IMAGE_PATH = "/file.svg";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

export const seoConfig = {
  siteName: "Marketiv",
  siteUrl,
  defaultLocale: "id_ID",
  defaultImagePath: DEFAULT_IMAGE_PATH,
};

export interface SeoMetaInput {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  imagePath?: string;
  noIndex?: boolean;
}

function toAbsoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata(input: SeoMetaInput): Metadata {
  const canonicalUrl = toAbsoluteUrl(input.path);
  const ogImage = toAbsoluteUrl(input.imagePath ?? seoConfig.defaultImagePath);

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: seoConfig.defaultLocale,
      url: canonicalUrl,
      title: input.title,
      description: input.description,
      siteName: seoConfig.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${input.title} | ${seoConfig.siteName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [ogImage],
    },
    robots: input.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
