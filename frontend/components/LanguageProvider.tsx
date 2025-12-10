"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultLanguageContents, languageMetadata } from "@/lib/translations";

type LocalizedContent = Record<string, unknown>;

export type LanguageFile = {
  id?: string;
  code: string;
  name: string;
  flagIcon?: string | null;
  isDefault?: boolean;
  content?: LocalizedContent | null;
};

type LanguageContextValue = {
  languages: LanguageFile[];
  selectedLanguage?: LanguageFile;
  code: string | null;
  loading: boolean;
  error: string | null;
  setLanguage: (code: string) => void;
  content: LocalizedContent;
  t: (path: string, fallback?: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "copyboost-language";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

const fallbackLanguages: LanguageFile[] = Object.entries(languageMetadata).map(
  ([code, meta]) => ({
    code,
    name: meta.name,
    flagIcon: meta.flagIcon,
    isDefault: meta.isDefault,
    content: defaultLanguageContents[code],
  }),
);

const fallbackContentByCode: Record<string, LocalizedContent> = defaultLanguageContents;

const fallbackDefaultCode =
  fallbackLanguages.find((lang) => lang.isDefault)?.code || fallbackLanguages[0]?.code || null;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const deepMerge = (base: LocalizedContent, patch: LocalizedContent): LocalizedContent => {
  const result: LocalizedContent = { ...base };

  Object.entries(patch || {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      result[key] = value;
      return;
    }
    if (isPlainObject(value) && isPlainObject(result[key])) {
      result[key] = deepMerge(result[key] as LocalizedContent, value);
      return;
    }
    result[key] = value;
  });

  return result;
};

const getNestedValue = (obj: LocalizedContent, path: string): unknown => {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (!acc || typeof acc !== "object") return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj);
};

type LanguageProviderProps = {
  children: React.ReactNode;
  initialCode?: string | null;
};

export function LanguageProvider({ children, initialCode }: LanguageProviderProps) {
  const [languages, setLanguages] = useState<LanguageFile[]>(fallbackLanguages);
  const [selectedCode, setSelectedCode] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
    }
    return initialCode || fallbackDefaultCode;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setSelectedCode(event.newValue || fallbackDefaultCode);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const loadLanguages = async () => {
      try {
        const response = await fetch(`${API_BASE}/languages`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Diller alınamadı (${response.status})`);
        }
        const data = (await response.json()) as LanguageFile[];
        if (Array.isArray(data) && data.length > 0) {
          setLanguages(data);
          setSelectedCode((prev) => {
            const stored =
              typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
            const candidate = stored || prev;
            if (candidate && data.some((lang) => lang.code === candidate)) {
              return candidate;
            }
            return (
              data.find((lang) => lang.isDefault)?.code ||
              data[0]?.code ||
              fallbackDefaultCode ||
              null
            );
          });
          setError(null);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        setError(err instanceof Error ? err.message : "Dil listesi alınamadı");
      } finally {
        setLoading(false);
      }
    };
    loadLanguages();
    return () => controller.abort();
  }, []);

  const selectedLanguage =
    languages.find((lang) => lang.code === selectedCode) ||
    languages.find((lang) => lang.isDefault) ||
    languages[0];

  useEffect(() => {
    if (!selectedLanguage || typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, selectedLanguage.code);
    document.cookie = `${STORAGE_KEY}=${selectedLanguage.code}; path=/; max-age=31536000`;
    window.dispatchEvent(
      new CustomEvent("copyboost-language-changed", {
        detail: {
          code: selectedLanguage.code,
          name: selectedLanguage.name,
          content: selectedLanguage.content ?? {},
        },
      }),
    );
  }, [selectedLanguage]);

  const baseContent =
    fallbackContentByCode[selectedLanguage?.code ?? ""] ?? fallbackContentByCode.tr;

  const mergedContent = useMemo(
    () => deepMerge(baseContent, (selectedLanguage?.content ?? {}) as LocalizedContent),
    [baseContent, selectedLanguage],
  );

  const setLanguage = useCallback(
    (code: string) => {
      if (!languages.some((lang) => lang.code === code)) return;
      setSelectedCode(code);
    },
    [languages],
  );

  const t = useCallback(
    (path: string, fallback = "") => {
      const value = getNestedValue(mergedContent, path);
      return typeof value === "string" ? value : fallback;
    },
    [mergedContent],
  );

  const value: LanguageContextValue = {
    languages,
    selectedLanguage,
    code: selectedLanguage?.code ?? null,
    loading,
    error,
    setLanguage,
    content: mergedContent,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
