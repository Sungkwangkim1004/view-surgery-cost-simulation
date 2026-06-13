"use client";

import { useMemo } from "react";
import { Minus, Plus, Receipt, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calculatePrice } from "@/lib/calculate-price";
import { formatKRW } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
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
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="break-keep font-medium leading-snug text-slate-800">
            {item.treatmentName}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {item.department} · {item.category}
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
          <span className="text-xs text-muted-foreground">회차</span>
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
  const { items, isFirstVisit, updateSessions, removeItem, clearCart } =
    useCartStore();

  const breakdown = useMemo(
    () => calculatePrice(items, isFirstVisit),
    [items, isFirstVisit]
  );

  const totalSavings = breakdown.originalTotal - breakdown.supplyAmount;

  return (
    <Card className="w-full min-h-[28rem] border-slate-200 shadow-xl lg:sticky lg:top-6 lg:min-h-0">
      <CardHeader className="border-b bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-800 sm:text-xl">
              <Receipt className="h-5 w-5 shrink-0 text-emerald-600" />
              예상 영수증
            </CardTitle>
            <CardDescription className="mt-1 text-xs sm:text-sm">
              패키지·다회차·볼륨·첫방문 할인이 자동 적용됩니다.
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
              장바구니가 비어 있습니다.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              왼쪽에서 시술을 선택해 담아주세요.
            </p>
          </div>
        ) : (
          <>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-slate-700">
                담은 시술 ({items.length})
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

            {breakdown.bundleMatches.length > 0 && (
              <div className="rounded-lg border border-blue-100 bg-blue-50/40 p-4">
                <h4 className="mb-2 text-sm font-semibold text-blue-800">
                  적용된 패키지
                </h4>
                <ul className="space-y-1.5 text-sm text-blue-700">
                  {breakdown.bundleMatches.map((bundle, index) => (
                    <li
                      key={`${bundle.bundleName}-${index}`}
                      className="break-keep leading-snug"
                    >
                      {bundle.bundleName} — {formatKRW(bundle.bundlePrice)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {breakdown.discountLines.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-700">
                  할인 내역
                </h4>
                <ul className="space-y-2">
                  {breakdown.discountLines.map((line, index) => (
                    <li
                      key={`${line.label}-${index}`}
                      className="flex flex-col gap-1 rounded-md bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                    >
                      <span className="min-w-0 break-keep leading-snug">
                        {line.label}
                      </span>
                      <span className="shrink-0 font-semibold">
                        -{formatKRW(line.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4 rounded-xl border-2 border-slate-200 bg-slate-50 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">정상가 합계</span>
                <span className="text-base text-slate-400 line-through sm:text-lg">
                  {formatKRW(breakdown.originalTotal)}
                </span>
              </div>

              {totalSavings > 0 && (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-emerald-600">
                    총 절약 금액
                  </span>
                  <span className="text-base font-semibold text-emerald-600 sm:text-lg">
                    -{formatKRW(totalSavings)}
                  </span>
                </div>
              )}

              <div className="space-y-3 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-700 sm:text-base">
                    공급가액
                  </span>
                  <span className="text-xl font-bold text-slate-900 sm:text-2xl">
                    {formatKRW(breakdown.supplyAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground">
                    부가세 (10%)
                  </span>
                  <span className="text-base font-semibold text-slate-700 sm:text-lg">
                    {formatKRW(breakdown.vat)}
                  </span>
                </div>

                <div className="flex flex-col gap-2 rounded-lg bg-blue-600 px-4 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm font-medium sm:text-base">
                    최종 결제 예상액
                  </span>
                  <span className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {formatKRW(breakdown.finalTotal)}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
