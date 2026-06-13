import { NextResponse } from "next/server";
import {
  getFallbackRates,
  normalizeExchangeRates,
  type ExchangeCurrency,
} from "@/lib/exchange-rates";

const CURRENCIES: ExchangeCurrency[] = ["USD", "JPY", "CNY", "THB"];

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/KRW", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Exchange API failed");

    const data = (await res.json()) as {
      result: string;
      rates: Record<string, number>;
      time_last_update_utc?: string;
    };

    if (data.result !== "success") throw new Error("Invalid exchange data");

    const rates = CURRENCIES.reduce(
      (acc, currency) => {
        acc[currency] = data.rates[currency] ?? getFallbackRates().rates[currency];
        return acc;
      },
      {} as Record<ExchangeCurrency, number>
    );

    const payload = normalizeExchangeRates({
      base: "KRW",
      rates,
      updatedAt: data.time_last_update_utc ?? new Date().toISOString(),
    });

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(getFallbackRates());
  }
}
