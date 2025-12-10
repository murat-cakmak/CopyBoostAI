import type { MetadataRoute } from "next";
import { SUPPORTED_LANG_CODES } from "@/lib/i18n";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://copyboostai.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ["/", "/generate", "/dashboard", "/billing"];

  const localizedRoutes = SUPPORTED_LANG_CODES.flatMap((code) =>
    routes.map((route) => {
      const normalizedRoute = route === "/" ? "" : route;
      return {
        url: `${siteUrl}/${code}${normalizedRoute}`,
        lastModified,
      };
    }),
  );

  return localizedRoutes;
}
