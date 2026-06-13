"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCALES } from "@/lib/i18n/locales";
import { t } from "@/lib/i18n/ui";
import { useLocaleStore } from "@/store/locale-store";
import type { Locale } from "@/types/locale";

export function LanguageSelector() {
  const { locale, setLocale } = useLocaleStore();

  return (
    <div className="flex items-center gap-2">
      <span className="shrink-0 text-xs font-medium text-muted-foreground sm:text-sm">
        {t("language", locale)}
      </span>
      <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
        <SelectTrigger className="h-9 w-[7.5rem] text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {LOCALES.map((config) => (
            <SelectItem key={config.code} value={config.code}>
              {config.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
