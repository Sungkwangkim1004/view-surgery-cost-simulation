"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getFallbackRates,
  normalizeExchangeRates,
  type ExchangeRates,
} from "@/lib/exchange-rates";

interface ExchangeRatesContextValue {
  rates: ExchangeRates;
  loading: boolean;
}

const ExchangeRatesContext = createContext<ExchangeRatesContextValue | null>(
  null
);

export function ExchangeRatesProvider({ children }: { children: ReactNode }) {
  const [rates, setRates] = useState<ExchangeRates>(getFallbackRates());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchRates() {
      try {
        const res = await fetch("/api/exchange-rates");
        if (!res.ok) throw new Error("Failed");
        const data = normalizeExchangeRates(
          (await res.json()) as Partial<ExchangeRates>
        );
        if (!cancelled) setRates(data);
      } catch {
        if (!cancelled) setRates(getFallbackRates());
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRates();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ rates, loading }), [rates, loading]);

  return (
    <ExchangeRatesContext.Provider value={value}>
      {children}
    </ExchangeRatesContext.Provider>
  );
}

export function useExchangeRates() {
  const context = useContext(ExchangeRatesContext);
  if (!context) {
    throw new Error("useExchangeRates must be used within ExchangeRatesProvider");
  }
  return context;
}
