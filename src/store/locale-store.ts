import { create } from "zustand";
import type { Locale } from "@/types/locale";

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: "ko",
  setLocale: (locale) => set({ locale }),
}));
