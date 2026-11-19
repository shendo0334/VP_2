import type { MetadataRoute } from "next";
import { campaigns, navigation } from "@/lib/content";
import { siteOrigin } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin) return [];
  return [
    ...navigation.map(([, path]) => path),
    ...campaigns.map(({ slug }) => `/events-offers/${slug}/`),
  ].map((path) => ({ url: new URL(path, siteOrigin).href }));
}
