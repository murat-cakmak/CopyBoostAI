import type { MetadataRoute } from "next";
import { SUPPORTED_LANG_CODES } from "@/lib/i18n";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://copyboostai.xyz";

export default function robots(): MetadataRoute.Robots {
  const disallowed = SUPPORTED_LANG_CODES.flatMap((code) => [
    `/${code}/admin`,
    `/${code}/settings`,
    `/${code}/auth`,
  ]);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowed
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
