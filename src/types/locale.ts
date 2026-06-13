export type Locale = "ko" | "en" | "ja" | "zh" | "th";

export interface LocaleConfig {
  code: Locale;
  label: string;
  currency: string;
  currencySymbol: string;
  naverExchangeCode: string | null;
  naverExchangeUrl: string;
}
