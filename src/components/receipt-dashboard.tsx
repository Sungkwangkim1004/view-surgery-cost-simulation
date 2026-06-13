"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, Receipt, Trash2 } from "lucide-react";
import { BaseItemsSection, QuoteFooter } from "@/components/base-items-section";
import { FinalQuoteDialog } from "@/components/final-quote-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calculatePrice } from "@/lib/calculate-price";
import { translateDiscountLine } from "@/lib/i18n/discounts";
import { translateEntity, translateDepartment } from "@/lib/i18n/entities";
import { t } from "@/lib/i18n/ui";
import { formatKRW } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useLocaleStore } from "@/store/locale-store";
import type { CartItem } from "@/types";

function CartItemRow({
  item,
  onUpdateSessions,
  onRemove,
}: {
  item: CartItem;
  onUpdateSessions: (id: string, sessions: number) => void;
  onRemove: (id: string) => void;
}) {
  const { locale } = useLocaleStore();

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="break-keep font-medium leading-snug text-slate-800">
            {translateEntity(item.treatmentName, locale)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {translateDepartment(item.department, locale)} ·{" "}
            {translateEntity(item.category, locale)}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {t("sessions", locale)}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => onUpdateSessions(item.id, item.sessions - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-6 text-center text-sm font-medium">
            {item.sessions}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => onUpdateSessions(item.id, item.sessions + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <p className="shrink-0 text-sm font-semibold text-slate-700">
          {formatKRW(item.basePrice * item.sessions)}
        </p>
      </div>
    </div>
  );
}

export function ReceiptDashboard() {
  const { locale } = useLocaleStore();
  const { items, isFirstVisit, updateSessions, removeItem, clearCart } =
    useCartStore();
  const [quoteOpen, setQuoteOpen] = useState(false);

  const breakdown = useMemo(
    () => calculatePrice(items, isFirstVisit),
    [items, isFirstVisit]
  );

  const totalSavings = Math.max(
    0,
    breakdown.originalTotal +
      (breakdown.baseItemsOriginalTotal ?? 0) -
      breakdown.supplyAmount
  );

  return (
    <>
      <Card className="w-full min-h-[28rem] border-slate-200 shadow-xl lg:sticky lg:top-6 lg:min-h-0">
        <CardHeader className="border-b bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="flex items-center gap-2 text-lg text-slate-800 sm:text-xl">
                <Receipt className="h-5 w-5 shrink-0 text-emerald-600" />
                {t("receipt", locale)}
              </CardTitle>
              <CardDescription className="mt-1 text-xs sm:text-sm">
                {t("receiptDesc", locale)}
              </CardDescription>
            </div>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-5 pt-6 sm:space-y-6">
          {items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-12 text-center sm:py-16">
              <p className="text-sm text-muted-foreground">
                {t("emptyCart", locale)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("emptyCartDesc", locale)}
              </p>
            </div>
          ) : (
            <>
              <div>
                <h4 className="mb-3 text-sm font-semibold text-slate-700">
                  {t("cartItems", locale)} ({items.length})
                </h4>
                <div className="space-y-3">
                  {items.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onUpdateSessions={updateSessions}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </div>

              <BaseItemsSection breakdown={breakdown} />

              {breakdown.bundleMatches.length > 0 && (
                <div className="rounded-lg border border-blue-100 bg-blue-50/40 p-4">
                  <h4 className="mb-2 text-sm font-semibold text-blue-800">
                    {t("appliedBundles", locale)}
                  </h4>
                  <ul className="space-y-1.5 text-sm text-blue-700">
                    {breakdown.bundleMatches.map((bundle, index) => (
                      <li
                        key={`${bundle.bundleName}-${index}`}
                        className="break-keep leading-snug"
                      >
                        {translateEntity(bundle.bundleName, locale)} —{" "}
                        {formatKRW(bundle.bundlePrice)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {breakdown.discountLines.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-700">
                    {t("discountDetails", locale)}
                  </h4>
                  <ul className="space-y-2">
                    {breakdown.discountLines.map((line, index) => {
                      const translated = translateDiscountLine(line, locale);
                      return (
                        <li
                          key={`${line.id}-${index}`}
                          className="flex flex-col gap-1 rounded-md bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                        >
                          <span className="min-w-0 break-keep leading-snug">
                            {translated.label}
                          </span>
                          <span className="shrink-0 font-semibold">
                            -{formatKRW(line.amount)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="space-y-4 rounded-xl border-2 border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground">
                    {t("originalTotal", locale)}
                  </span>
                  <span className="text-base text-slate-400 line-through sm:text-lg">
                    {formatKRW(breakdown.originalTotal)}
                  </span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-emerald-600">
                      {t("totalSavings", locale)}
                    </span>
                    <span className="text-base font-semibold text-emerald-600 sm:text-lg">
                      -{formatKRW(totalSavings)}
                    </span>
                  </div>
                )}

                <div className="space-y-3 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">
                      {t("treatmentSubtotal", locale)}
                    </span>
                    <span className="font-medium text-slate-800">
                      {formatKRW(breakdown.treatmentSupplyAmount ?? 0)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-slate-700 sm:text-base">
                      {t("supplyAmount", locale)}
                    </span>
                    <span className="text-xl font-bold text-slate-900 sm:text-2xl">
                      {formatKRW(breakdown.supplyAmount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-muted-foreground">
                      {t("vat", locale)}
                    </span>
                    <span className="text-base font-semibold text-slate-700 sm:text-lg">
                      {formatKRW(breakdown.vat)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setQuoteOpen(true)}
                    className="flex w-full flex-col gap-2 rounded-lg bg-blue-600 px-4 py-4 text-left text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <span className="text-sm font-medium sm:text-base">
                        {t("finalTotal", locale)}
                      </span>
                      <p className="mt-0.5 text-xs text-blue-100">
                        {t("finalTotalHint", locale)}
                      </p>
                    </div>
                    <span className="text-2xl font-bold tracking-tight sm:text-3xl">
                      {formatKRW(breakdown.finalTotal)}
                    </span>
                  </button>
                </div>

                <QuoteFooter className="pt-2" />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <FinalQuoteDialog
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        breakdown={breakdown}
      />
    </>
  );
}
