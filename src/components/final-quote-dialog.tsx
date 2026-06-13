"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useExchangeRates } from "@/contexts/exchange-rates-context";
import { translateDiscountLine } from "@/lib/i18n/discounts";
import { translateEntity, translateDepartment } from "@/lib/i18n/entities";
import { LOCALE_CONFIGS } from "@/lib/i18n/locales";
import { t } from "@/lib/i18n/ui";
import {
  convertFromKRW,
  formatForeignAmount,
  formatKrwPerUnit,
  type ExchangeCurrency,
} from "@/lib/exchange-rates";
import { formatKRW } from "@/lib/utils";
import { useLocaleStore } from "@/store/locale-store";
import type { PriceBreakdown } from "@/types";
import { BaseItemsSection, QuoteFooter } from "@/components/base-items-section";
import { QuoteShareActions } from "@/components/quote-share-actions";

interface FinalQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  breakdown: PriceBreakdown;
}

function DualAmount({
  amountKRW,
  className = "",
}: {
  amountKRW: number;
  className?: string;
}) {
  const { locale } = useLocaleStore();
  const { rates } = useExchangeRates();
  const config = LOCALE_CONFIGS[locale];
  const showForeign = locale !== "ko" && config.currency !== "KRW";
  const foreignCurrency = config.currency as ExchangeCurrency;

  return (
    <div className={className}>
      <p className="font-semibold text-slate-900">{formatKRW(amountKRW)}</p>
      {showForeign && (
        <p className="mt-0.5 text-xs text-muted-foreground">
          {t("foreignAmount", locale)}:{" "}
          {formatForeignAmount(
            convertFromKRW(amountKRW, foreignCurrency, rates),
            foreignCurrency,
            config.currencySymbol
          )}
        </p>
      )}
    </div>
  );
}

export function FinalQuoteDialog({
  open,
  onOpenChange,
  breakdown,
}: FinalQuoteDialogProps) {
  const { locale } = useLocaleStore();
  const { rates } = useExchangeRates();
  const config = LOCALE_CONFIGS[locale];
  const showForeign = locale !== "ko";
  const foreignCurrency = config.currency as ExchangeCurrency;

  const totalDiscount = breakdown.discountLines.reduce(
    (sum, line) => sum + line.amount,
    0
  );

  const updatedLabel = rates.updatedAt
    ? new Date(rates.updatedAt).toLocaleString(
        locale === "ko"
          ? "ko-KR"
          : locale === "ja"
            ? "ja-JP"
            : locale === "zh"
              ? "zh-CN"
              : locale === "th"
                ? "th-TH"
                : "en-US"
      )
    : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{t("finalQuote", locale)}</DialogTitle>
          <DialogDescription>{t("finalQuoteDesc", locale)}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <section>
            <h3 className="mb-2 text-sm font-semibold text-slate-700">
              {t("quoteItems", locale)}
            </h3>
            <ul className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
              {breakdown.cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between gap-3 text-sm"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800">
                      {translateEntity(item.treatmentName, locale)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {translateDepartment(item.department, locale)} ·{" "}
                      {translateEntity(item.category, locale)} · {item.sessions}
                      {t("times", locale)}
                    </p>
                  </div>
                  <DualAmount
                    amountKRW={item.basePrice * item.sessions}
                    className="shrink-0 text-right"
                  />
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-muted-foreground">
                {t("quoteSubtotal", locale)}
              </span>
              <DualAmount amountKRW={breakdown.originalTotal} className="text-right" />
            </div>
          </section>

          <BaseItemsSection breakdown={breakdown} compact />

          {breakdown.discountLines.length > 0 && (
            <section>
              <h3 className="mb-2 text-sm font-semibold text-slate-700">
                {t("quoteDiscounts", locale)}
              </h3>
              <ul className="space-y-3">
                {breakdown.discountLines.map((line, index) => {
                  const translated = translateDiscountLine(line, locale);
                  return (
                    <li
                      key={`${line.id}-${index}`}
                      className="rounded-lg border border-emerald-100 bg-emerald-50/60 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-emerald-800">
                          {translated.label}
                        </p>
                        <span className="shrink-0 text-sm font-semibold text-emerald-700">
                          -{formatKRW(line.amount)}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-emerald-600">
                        <span className="font-medium">
                          {t("quoteDiscountCondition", locale)}:{" "}
                        </span>
                        {translated.condition}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-200 pt-3 text-sm">
                <span className="text-muted-foreground">
                  {t("quoteTotalDiscount", locale)}
                </span>
                <span className="font-semibold text-emerald-700">
                  -{formatKRW(totalDiscount)}
                </span>
              </div>
            </section>
          )}

          <section className="space-y-2 rounded-xl border-2 border-blue-100 bg-blue-50/40 p-4">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">
                {t("treatmentSubtotal", locale)}
              </span>
              <span className="font-medium text-slate-800">
                {formatKRW(breakdown.treatmentSupplyAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">
                {t("baseItemsSubtotal", locale)}
              </span>
              <span className="font-medium text-slate-800">
                {formatKRW(breakdown.baseItemsTotal)}
              </span>
            </div>
            {breakdown.baseItems.length > 0 && (
              <p className="text-xs text-violet-600">
                {t("baseItemsPolicyNote", locale)}
              </p>
            )}
            <div className="flex items-center justify-between gap-3 border-t border-blue-100 pt-2 text-sm">
              <span className="text-slate-600">{t("supplyAmount", locale)}</span>
              <span className="font-medium text-slate-800">
                {formatKRW(breakdown.supplyAmount)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-blue-100 pt-2 text-sm">
              <span className="text-muted-foreground">{t("vat", locale)}</span>
              <span className="font-medium">{formatKRW(breakdown.vat)}</span>
            </div>

            <div className="border-t border-blue-200 pt-3">
              <p className="text-sm font-medium text-blue-800">
                {t("quoteFinal", locale)}
              </p>
              <p className="mt-1 text-2xl font-bold text-blue-900">
                {formatKRW(breakdown.finalTotal)}
              </p>
              {showForeign && (
                <p className="mt-1 text-sm text-blue-700">
                  {t("foreignAmount", locale)}:{" "}
                  {formatForeignAmount(
                    convertFromKRW(
                      breakdown.finalTotal,
                      foreignCurrency,
                      rates
                    ),
                    foreignCurrency,
                    config.currencySymbol
                  )}
                </p>
              )}
            </div>

            {showForeign && config.naverExchangeCode && (
              <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
                <p className="text-xs font-semibold text-slate-700">
                  {t("exchangeRateTitle", locale)}
                </p>
                <p className="mt-1 text-sm text-slate-800">
                  1 {config.currency} = ₩
                  {formatKrwPerUnit(foreignCurrency, rates)} KRW
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t("exchangeRateLive", locale)}
                </p>
                {updatedLabel && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t("exchangeRateUpdated", locale)}: {updatedLabel}
                  </p>
                )}
                <a
                  href={config.naverExchangeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                >
                  {t("exchangeRateNaver", locale)}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </section>
        </div>

        <QuoteShareActions breakdown={breakdown} />

        <QuoteFooter />

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("close", locale)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
