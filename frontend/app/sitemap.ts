import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://copyboostai.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ["", "/generate", "/dashboard", "/billing"];

  return routes.map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified
  }));
}
