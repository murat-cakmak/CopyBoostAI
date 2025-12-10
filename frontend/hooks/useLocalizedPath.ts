import { useCallback } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { buildLocalizedPath } from "@/lib/i18n";

export function useLocalizedPath() {
  const { code } = useLanguage();
  return useCallback(
    (path: string) => buildLocalizedPath(path, code),
    [code],
  );
}
