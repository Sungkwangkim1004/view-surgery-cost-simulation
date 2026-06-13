"use client";

import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExchangeRates } from "@/contexts/exchange-rates-context";
import { formatQuoteShareText } from "@/lib/format-quote-share";
import { t } from "@/lib/i18n/ui";
import { shareViaEmail, shareViaKakao } from "@/lib/share-quote";
import { useLocaleStore } from "@/store/locale-store";
import type { PriceBreakdown } from "@/types";

interface QuoteShareActionsProps {
  breakdown: PriceBreakdown;
}

export function QuoteShareActions({ breakdown }: QuoteShareActionsProps) {
  const { locale } = useLocaleStore();
  const { rates } = useExchangeRates();
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const { subject, body } = formatQuoteShareText({
    locale,
    breakdown,
    rates,
  });

  const handleEmail = () => {
    shareViaEmail(subject, body);
  };

  const handleKakao = async () => {
    setStatus("idle");
    const result = await shareViaKakao(subject, body);
    if (result === "copied") setStatus("copied");
    else if (result === "failed") setStatus("failed");
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-slate-700">
        {t("shareTitle", locale)}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {t("shareDesc", locale)}
      </p>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          className="gap-2 border-blue-200 bg-white hover:bg-blue-50"
          onClick={handleEmail}
        >
          <Mail className="h-4 w-4 text-blue-600" />
          {t("shareEmail", locale)}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="gap-2 border-[#FEE500] bg-[#FEE500]/20 hover:bg-[#FEE500]/40"
          onClick={handleKakao}
        >
          <MessageCircle className="h-4 w-4 text-[#3C1E1E]" />
          {t("shareKakao", locale)}
        </Button>
      </div>

      {status === "copied" && (
        <p className="mt-2 text-xs font-medium text-emerald-600">
          {t("shareKakaoCopied", locale)}
        </p>
      )}
      {status === "failed" && (
        <p className="mt-2 text-xs font-medium text-destructive">
          {t("shareFailed", locale)}
        </p>
      )}
    </section>
  );
}
