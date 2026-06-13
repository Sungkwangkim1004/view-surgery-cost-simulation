export type ExchangeCurrency = "USD" | "JPY" | "CNY" | "THB";

export interface ExchangeRates {
  base: "KRW";
  rates: Record<ExchangeCurrency, number>;
  updatedAt: string;
}

const FALLBACK_RATES: Record<ExchangeCurrency, number> = {
  USD: 0.00072,
  JPY: 0.108,
  CNY: 0.0052,
  THB: 0.024,
};

export function getFallbackRates(): ExchangeRates {
  return {
    base: "KRW",
    rates: { ...FALLBACK_RATES },
    updatedAt: new Date().toISOString(),
  };
}

export function normalizeExchangeRates(
  data: Partial<ExchangeRates> & {
    rates?: Partial<Record<ExchangeCurrency, number>>;
  }
): ExchangeRates {
  const fallback = getFallbackRates();
  const incoming: Partial<Record<ExchangeCurrency, number>> = data.rates ?? {};

  return {
    base: "KRW",
    rates: {
      USD: incoming.USD ?? fallback.rates.USD,
      JPY: incoming.JPY ?? fallback.rates.JPY,
      CNY: incoming.CNY ?? fallback.rates.CNY,
      THB: incoming.THB ?? fallback.rates.THB,
    },
    updatedAt: data.updatedAt ?? fallback.updatedAt,
  };
}

export function getRate(
  currency: ExchangeCurrency,
  rates: ExchangeRates
): number {
  const rate = rates.rates[currency];
  if (!rate || !Number.isFinite(rate)) {
    return FALLBACK_RATES[currency];
  }
  return rate;
}

export function convertFromKRW(
  amountKRW: number,
  currency: ExchangeCurrency,
  rates: ExchangeRates
): number {
  return amountKRW * getRate(currency, rates);
}

export function formatForeignAmount(
  amount: number,
  currency: ExchangeCurrency,
  symbol: string
): string {
  const decimals = currency === "JPY" || currency === "THB" ? 0 : 2;
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
  return `${symbol}${formatted}`;
}

export function formatKrwPerUnit(
  currency: ExchangeCurrency,
  rates: ExchangeRates
): string {
  const rate = getRate(currency, rates);
  const krwPerUnit = 1 / rate;
  return new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 2,
  }).format(krwPerUnit);
}
