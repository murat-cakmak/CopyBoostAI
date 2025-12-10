import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LANGUAGE, isSupportedLocale } from "./lib/i18n";

const IGNORED_PATHS = ["/_next", "/api", "/static", "/favicon", "/robots.txt", "/sitemap", "/.well-known"];

const isPublicAsset = (pathname: string) => /\.[a-zA-Z0-9]+$/.test(pathname);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (IGNORED_PATHS.some((path) => pathname.startsWith(path)) || isPublicAsset(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const localeCandidate = segments[0];

  if (isSupportedLocale(localeCandidate)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-copyboost-locale", localeCandidate);
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    response.cookies.set("copyboost-language", localeCandidate, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const targetPath = normalizedPath === "/" ? `/${DEFAULT_LANGUAGE}` : `/${DEFAULT_LANGUAGE}${normalizedPath}`;
  const url = request.nextUrl.clone();
  url.pathname = targetPath;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
