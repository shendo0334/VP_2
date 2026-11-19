import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/metadata";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", ...(siteOrigin ? { allow: "/" } : { disallow: "/" }) },
    sitemap: siteOrigin ? new URL("/sitemap.xml", siteOrigin).href : undefined,
  };
}
