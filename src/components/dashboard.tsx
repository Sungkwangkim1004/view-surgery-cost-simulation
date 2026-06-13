"use client";

import { ReceiptDashboard } from "@/components/receipt-dashboard";
import { TreatmentSelector } from "@/components/treatment-selector";
import { t } from "@/lib/i18n/ui";
import { useLocaleStore } from "@/store/locale-store";

export function Dashboard() {
  const { locale } = useLocaleStore();

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-100 via-white to-blue-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            <span className="text-blue-600">{t("appTitleBrand", locale)}</span>{" "}
            <span className="text-slate-900">{t("appTitleDept", locale)}</span>{" "}
            <span className="text-blue-600">{t("appTitleSuffix", locale)}</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {t("appSubtitle", locale)}
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <TreatmentSelector />
          <ReceiptDashboard />
        </div>
      </div>
    </main>
  );
}
