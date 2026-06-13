import type { Locale } from "@/types/locale";

export const LOCALE_CONFIGS = {
  ko: {
    code: "ko" as Locale,
    label: "한국어",
    currency: "KRW",
    currencySymbol: "₩",
    naverExchangeCode: null,
    naverExchangeUrl:
      "https://finance.naver.com/marketindex/exchangeList.naver",
  },
  en: {
    code: "en" as Locale,
    label: "English",
    currency: "USD",
    currencySymbol: "$",
    naverExchangeCode: "FX_USDKRW",
    naverExchangeUrl:
      "https://finance.naver.com/marketindex/exchangeDetail.naver?marketindexCd=FX_USDKRW",
  },
  ja: {
    code: "ja" as Locale,
    label: "日本語",
    currency: "JPY",
    currencySymbol: "¥",
    naverExchangeCode: "FX_JPYKRW",
    naverExchangeUrl:
      "https://finance.naver.com/marketindex/exchangeDetail.naver?marketindexCd=FX_JPYKRW",
  },
  zh: {
    code: "zh" as Locale,
    label: "中文",
    currency: "CNY",
    currencySymbol: "¥",
    naverExchangeCode: "FX_CNYKRW",
    naverExchangeUrl:
      "https://finance.naver.com/marketindex/exchangeDetail.naver?marketindexCd=FX_CNYKRW",
  },
  th: {
    code: "th" as Locale,
    label: "ไทย",
    currency: "THB",
    currencySymbol: "฿",
    naverExchangeCode: "FX_THBKRW",
    naverExchangeUrl:
      "https://finance.naver.com/marketindex/exchangeDetail.naver?marketindexCd=FX_THBKRW",
  },
} as const;

export const LOCALES = Object.values(LOCALE_CONFIGS);
