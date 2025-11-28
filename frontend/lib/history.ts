export const DAILY_LIMIT = 5;
const STORAGE_KEY = "copyboost-history";

export type GenerationHistoryItem = {
  id: string;
  createdAt: string;
  input: {
    title: string;
    category: string;
    platform: string;
    language: string;
    tone: string;
  };
  output: {
    longDescription?: string;
    shortDescription?: string;
    seoTitle?: string;
    seoDescription?: string;
    tags?: string[];
  };
  info?: string;
};

const safeParse = (value: string | null): GenerationHistoryItem[] => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    // Ignore corrupted state and start fresh.
    return [];
  }
};

export const getHistory = (): GenerationHistoryItem[] => {
  if (typeof window === "undefined") return [];

  return safeParse(window.localStorage.getItem(STORAGE_KEY));
};

export const addGenerationToHistory = (entry: GenerationHistoryItem) => {
  if (typeof window === "undefined") return;

  const existing = getHistory();
  const next = [entry, ...existing].slice(0, 50);

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("copyboost-history-updated"));
};
