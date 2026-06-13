import { translateDiscountLine } from "@/lib/i18n/discounts";
import { translateEntity, translateDepartment } from "@/lib/i18n/entities";
import { LOCALE_CONFIGS } from "@/lib/i18n/locales";
import { t } from "@/lib/i18n/ui";
import {
  convertFromKRW,
  formatForeignAmount,
  formatKrwPerUnit,
  type ExchangeCurrency,
  type ExchangeRates,
} from "@/lib/exchange-rates";
import { formatKRW } from "@/lib/utils";
import type { PriceBreakdown } from "@/types";
import type { Locale } from "@/types/locale";

interface FormatQuoteShareOptions {
  locale: Locale;
  breakdown: PriceBreakdown;
  rates: ExchangeRates;
}

function formatForeignLine(
  amountKRW: number,
  locale: Locale,
  rates: ExchangeRates
): string | null {
  if (locale === "ko") return null;
  const config = LOCALE_CONFIGS[locale];
  const currency = config.currency as ExchangeCurrency;
  const converted = convertFromKRW(amountKRW, currency, rates);
  return `  (${t("foreignAmount", locale)}: ${formatForeignAmount(converted, currency, config.currencySymbol)})`;
}

function formatQuoteDate(locale: Locale): string {
  return new Date().toLocaleDateString(
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
}

export function formatQuoteShareText({
  locale,
  breakdown,
  rates,
}: FormatQuoteShareOptions): { subject: string; body: string } {
  const lines: string[] = [];
  const subject = t("emailSubject", locale);
  const brand = t("appTitleBrand", locale);

  lines.push(`[${brand}] ${t("finalQuote", locale)}`);
  lines.push(`${t("quoteDate", locale)}: ${formatQuoteDate(locale)}`);
  lines.push("");

  lines.push(`■ ${t("quoteItems", locale)}`);
  for (const item of breakdown.cartItems) {
    const name = translateEntity(item.treatmentName, locale);
    const dept = translateDepartment(item.department, locale);
    const cat = translateEntity(item.category, locale);
    const amount = formatKRW(item.basePrice * item.sessions);
    const foreign = formatForeignLine(item.basePrice * item.sessions, locale, rates);
    lines.push(
      `- ${name} | ${dept} · ${cat} · ${item.sessions}${t("times", locale)} | ${amount}${foreign ?? ""}`
    );
  }
  lines.push("");

  lines.push(`■ ${t("quoteSubtotal", locale)}: ${formatKRW(breakdown.originalTotal)}`);
  const subtotalForeign = formatForeignLine(breakdown.originalTotal, locale, rates);
  if (subtotalForeign) lines.push(subtotalForeign.trim());

  if (breakdown.baseItems.length > 0) {
    lines.push("");
    lines.push(`■ ${t("baseItemsTitle", locale)}`);
    for (const item of breakdown.baseItems) {
      const priceLabel = item.isFree
        ? `${t("baseItemFree", locale)} (${formatKRW(item.originalPrice)})`
        : formatKRW(item.price);
      lines.push(`- ${translateEntity(item.name, locale)}: ${priceLabel}`);
    }
    lines.push(
      `- ${t("baseItemsSubtotal", locale)}: ${formatKRW(breakdown.baseItemsTotal)}`
    );
    lines.push(`  ${t("baseItemsPolicyNote", locale)}`);
  }

  if (breakdown.discountLines.length > 0) {
    lines.push("");
    lines.push(`■ ${t("quoteDiscounts", locale)}`);
    for (const line of breakdown.discountLines) {
      const translated = translateDiscountLine(line, locale);
      lines.push(`- ${translated.label}: -${formatKRW(line.amount)}`);
      lines.push(`  ${t("quoteDiscountCondition", locale)}: ${translated.condition}`);
    }
    const totalDiscount = breakdown.discountLines.reduce(
      (sum, line) => sum + line.amount,
      0
    );
    lines.push(`- ${t("quoteTotalDiscount", locale)}: -${formatKRW(totalDiscount)}`);
  }

  lines.push("");
  lines.push(`■ ${t("treatmentSubtotal", locale)}: ${formatKRW(breakdown.treatmentSupplyAmount)}`);
  lines.push(`■ ${t("baseItemsSubtotal", locale)}: ${formatKRW(breakdown.baseItemsTotal)}`);
  lines.push(`■ ${t("supplyAmount", locale)}: ${formatKRW(breakdown.supplyAmount)}`);
  lines.push(`■ ${t("vat", locale)}: ${formatKRW(breakdown.vat)}`);
  lines.push(`■ ${t("quoteFinal", locale)}: ${formatKRW(breakdown.finalTotal)}`);

  const finalForeign = formatForeignLine(breakdown.finalTotal, locale, rates);
  if (finalForeign) lines.push(finalForeign.trim());

  if (locale !== "ko") {
    const config = LOCALE_CONFIGS[locale];
    const currency = config.currency as ExchangeCurrency;
    if (config.naverExchangeCode) {
      lines.push("");
      lines.push(`■ ${t("exchangeRateTitle", locale)}`);
      lines.push(`  1 ${config.currency} = ₩${formatKrwPerUnit(currency, rates)} KRW`);
    }
  }

  lines.push("");
  lines.push(`※ ${t("shareDisclaimer", locale)}`);
  lines.push(`※ ${t("quoteValidityNotice", locale)}`);

  return { subject, body: lines.join("\n") };
}
