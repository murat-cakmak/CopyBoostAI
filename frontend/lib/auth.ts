"use client";

export type AuthUser = {
  id?: string;
  email: string;
  name?: string | null;
  role?: string;
};

const STORAGE_KEY = "copyboost-user";

const safeParse = (value: string | null): AuthUser | null => {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? (parsed as AuthUser) : null;
  } catch (error) {
    return null;
  }
};

export const getStoredUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
};

export const saveStoredUser = (user: AuthUser) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("copyboost-auth-changed"));
};

export const clearStoredUser = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("copyboost-auth-changed"));
};
