"use client";

import { Dashboard } from "@/components/dashboard";
import { ExchangeRatesProvider } from "@/contexts/exchange-rates-context";

export function DashboardPage() {
  return (
    <ExchangeRatesProvider>
      <Dashboard />
    </ExchangeRatesProvider>
  );
}
