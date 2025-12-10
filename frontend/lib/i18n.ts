import { languageMetadata } from "./translations";

export const SUPPORTED_LANG_CODES = Object.keys(languageMetadata);

export const DEFAULT_LANGUAGE =
  SUPPORTED_LANG_CODES.find((code) => languageMetadata[code]?.isDefault) ||
  SUPPORTED_LANG_CODES[0] ||
  "tr";

export const isSupportedLocale = (locale?: string | null): locale is string =>
  !!locale && SUPPORTED_LANG_CODES.includes(locale);

const localePattern = new RegExp(`^/(?:${SUPPORTED_LANG_CODES.join("|")})(?=/|$)`);

const normalizePath = (path?: string) => {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
};

export const stripLocaleFromPath = (pathname?: string) => {
  const normalized = normalizePath(pathname);
  if (normalized === "/") return normalized;
  if (localePattern.test(normalized)) {
    const stripped = normalized.replace(localePattern, "") || "/";
    return stripped;
  }
  return normalized;
};

export const addLocaleToPath = (path: string, locale?: string | null) => {
  const targetLocale = isSupportedLocale(locale) ? locale : DEFAULT_LANGUAGE;
  const normalized = normalizePath(path);
  if (normalized === "/") return `/${targetLocale}`;
  return `/${targetLocale}${normalized}`;
};

export const buildLocalizedPath = (path: string, locale?: string | null) => {
  if (/^https?:\/\//i.test(path)) return path;
  const stripped = stripLocaleFromPath(path);
  return addLocaleToPath(stripped, locale);
};
