"use client";

import { translateEntity } from "@/lib/i18n/entities";
import { t } from "@/lib/i18n/ui";
import { formatKRW } from "@/lib/utils";
import { useLocaleStore } from "@/store/locale-store";
import type { PriceBreakdown } from "@/types";

interface BaseItemsSectionProps {
  breakdown: PriceBreakdown;
  compact?: boolean;
}

export function BaseItemsSection({
  breakdown,
  compact = false,
}: BaseItemsSectionProps) {
  const { locale } = useLocaleStore();

  if (breakdown.baseItems.length === 0) return null;

  return (
    <div
      className={
        compact
          ? "space-y-2"
          : "rounded-lg border border-violet-100 bg-violet-50/40 p-4"
      }
    >
      <h4
        className={
          compact
            ? "text-sm font-semibold text-slate-700"
            : "mb-2 text-sm font-semibold text-violet-800"
        }
      >
        {t("baseItemsTitle", locale)}
      </h4>
      <ul className={compact ? "space-y-2" : "space-y-1.5"}>
        {breakdown.baseItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 text-sm text-violet-700"
          >
            <span>{translateEntity(item.name, locale)}</span>
            <span className="shrink-0 font-medium">{formatKRW(item.price)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex items-center justify-between gap-3 border-t border-violet-100 pt-2 text-sm">
        <span className="text-violet-600">{t("baseItemsSubtotal", locale)}</span>
        <span className="font-semibold text-violet-800">
          {formatKRW(breakdown.baseItemsTotal)}
        </span>
      </div>
      {breakdown.baseItemsDiscountApplied && (
        <p className="mt-2 text-xs leading-relaxed text-violet-600">
          {t("baseItemsDiscountNote", locale)}
        </p>
      )}
    </div>
  );
}

export function QuoteFooter({ className = "" }: { className?: string }) {
  const { locale } = useLocaleStore();
  const today = new Date().toLocaleDateString(
    locale === "ko"
      ? "ko-KR"
      : locale === "ja"
        ? "ja-JP"
        : locale === "zh"
          ? "zh-CN"
          : locale === "th"
            ? "th-TH"
            : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className={`space-y-1 text-xs text-muted-foreground ${className}`}>
      <p>
        {t("quoteDate", locale)}: {today}
      </p>
      <p>{t("quoteValidityNotice", locale)}</p>
    </div>
  );
}
