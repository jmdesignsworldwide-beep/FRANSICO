import type { MetadataRoute } from "next";
import { SITE, NAV_LINKS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return NAV_LINKS.map((link) => ({
    url: `${SITE.url}${link.href === "/" ? "" : link.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: link.href === "/" ? 1 : 0.8,
  }));
}
