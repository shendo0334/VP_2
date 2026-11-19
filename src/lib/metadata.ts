import type { Metadata } from "next";
import { httpsDestination, site } from "@/lib/content";

export const siteOrigin = httpsDestination(site.SITE_URL);

export function pageMetadata(title: string, description: string, path: string, image = "/images/og.jpg"): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${site.brand}`;
  const canonical = siteOrigin ? new URL(path, siteOrigin).href : undefined;
  const socialImage = siteOrigin ? new URL(image, siteOrigin).href : undefined;

  return {
    title: fullTitle,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: "website",
      siteName: site.brand,
      title: fullTitle,
      description,
      locale: "en_IN",
      url: canonical,
      images: socialImage ? [{ url: socialImage, alt: path === "/" ? "Gold bridal jewellery in a burgundy editorial portrait" : title }] : undefined,
    },
    twitter: { card: socialImage ? "summary_large_image" : "summary", title: fullTitle, description, images: socialImage ? [socialImage] : undefined },
  };
}
