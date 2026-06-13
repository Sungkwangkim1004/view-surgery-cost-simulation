"use client";

import { useEffect, useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getCategoriesByDepartment,
  getTreatmentsByCategory,
  getTreatmentByName,
} from "@/lib/data";
import { translateEntity } from "@/lib/i18n/entities";
import { t } from "@/lib/i18n/ui";
import { formatKRW, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useLocaleStore } from "@/store/locale-store";
import type { CartItem, Department } from "@/types";

const DEPARTMENTS: Department[] = ["성형외과", "피부과"];

function buildCartItem(
  treatment: NonNullable<ReturnType<typeof getTreatmentByName>>,
  sessions: number
): Omit<CartItem, "id"> {
  return {
    department: treatment.department,
    treatmentName: treatment.name,
    category: treatment.category,
    basePrice: treatment.base_price,
    sessions,
  };
}

export function TreatmentSelector() {
  const { locale } = useLocaleStore();
  const [department, setDepartment] = useState<Department | "">("");
  const [category, setCategory] = useState<string>("");
  const [treatmentName, setTreatmentName] = useState<string>("");
  const [sessions, setSessions] = useState<number>(1);

  const { syncItem, isFirstVisit, setFirstVisit, items } = useCartStore();

  const categories = useMemo(
    () => (department ? getCategoriesByDepartment(department) : []),
    [department]
  );

  const treatments = useMemo(
    () =>
      department && category
        ? getTreatmentsByCategory(department, category)
        : [],
    [department, category]
  );

  const selectedTreatment = treatmentName
    ? getTreatmentByName(treatmentName)
    : undefined;

  const pushToCart = (
    treatment: NonNullable<ReturnType<typeof getTreatmentByName>>,
    nextSessions: number
  ) => {
    syncItem(buildCartItem(treatment, nextSessions));
  };

  const handleDepartmentChange = (value: Department) => {
    setDepartment(value);
    setCategory("");
    setTreatmentName("");
    setSessions(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setTreatmentName("");
    setSessions(1);
  };

  const handleTreatmentChange = (value: string) => {
    setTreatmentName(value);
    const treatment = getTreatmentByName(value);
    if (!treatment || !department) return;

    const existingSessions =
      items.find((item) => item.treatmentName === value)?.sessions ?? 1;

    setSessions(existingSessions);
    pushToCart(treatment, existingSessions);
  };

  const handleSessionsChange = (rawValue: string) => {
    const nextSessions = Math.max(1, parseInt(rawValue, 10) || 1);
    setSessions(nextSessions);

    if (selectedTreatment && department) {
      pushToCart(selectedTreatment, nextSessions);
    }
  };

  useEffect(() => {
    if (!treatmentName) return;

    const cartItem = items.find((item) => item.treatmentName === treatmentName);
    if (cartItem && cartItem.sessions !== sessions) {
      setSessions(cartItem.sessions);
    }
  }, [items, treatmentName, sessions]);

  const departmentLabel = (dept: Department) =>
    dept === "성형외과" ? t("plasticSurgery", locale) : t("dermatology", locale);

  return (
    <Card className="w-full overflow-visible border-slate-200 shadow-lg">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-800 sm:text-xl">
              <ShoppingCart className="h-5 w-5 shrink-0 text-blue-600" />
              {t("treatmentSelection", locale)}
            </CardTitle>
            <CardDescription className="mt-1 text-xs sm:text-sm">
              {t("treatmentSelectionDesc", locale)}
            </CardDescription>
          </div>
          <LanguageSelector />
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-6 sm:space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">{t("department", locale)}</Label>
          <div
            className="grid grid-cols-2 gap-3"
            role="radiogroup"
            aria-label={t("department", locale)}
          >
            {DEPARTMENTS.map((dept) => {
              const isSelected = department === dept;
              return (
                <Button
                  key={dept}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  variant={isSelected ? "default" : "outline"}
                  className={cn(
                    "min-h-[4.5rem] h-auto rounded-lg py-4 text-[1.3125rem] font-bold leading-tight",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow hover:bg-primary/90"
                      : "border-2 bg-background hover:bg-accent"
                  )}
                  onClick={() => handleDepartmentChange(dept)}
                >
                  {departmentLabel(dept)}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium">
            {t("category", locale)}
          </Label>
          <Select
            value={category || undefined}
            onValueChange={handleCategoryChange}
            disabled={!department}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder={t("categoryPlaceholder", locale)} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {translateEntity(cat, locale)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="treatment" className="text-sm font-medium">
            {t("treatment", locale)}
          </Label>
          <Select
            value={treatmentName || undefined}
            onValueChange={handleTreatmentChange}
            disabled={!category}
          >
            <SelectTrigger id="treatment" className="w-full">
              <SelectValue placeholder={t("treatmentPlaceholder", locale)} />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {treatments.map((treatment) => (
                <SelectItem key={treatment.name} value={treatment.name}>
                  <span className="truncate">
                    {translateEntity(treatment.name, locale)} (
                    {formatKRW(treatment.base_price)})
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sessions" className="text-sm font-medium">
            {t("sessions", locale)}
          </Label>
          <input
            id="sessions"
            type="number"
            min={1}
            max={99}
            value={sessions}
            onChange={(e) => handleSessionsChange(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {selectedTreatment && (
          <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4">
            <p className="text-sm text-slate-600">{t("selectedPrice", locale)}</p>
            <p className="text-lg font-semibold text-slate-800">
              {formatKRW(selectedTreatment.base_price)}
              <span className="ml-1 text-sm font-normal text-slate-500">
                {t("perSession", locale)}
              </span>
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {sessions}
              {t("sessionsTotal", locale)}:{" "}
              {formatKRW(selectedTreatment.base_price * sessions)}
            </p>
            <p className="mt-2 text-xs text-blue-600">{t("livePreviewHint", locale)}</p>
          </div>
        )}

        <div className="flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50/60 p-4">
          <Checkbox
            id="first-visit"
            checked={isFirstVisit}
            onCheckedChange={(checked) => setFirstVisit(checked === true)}
            className="mt-0.5"
          />
          <div className="min-w-0 space-y-0.5">
            <Label htmlFor="first-visit" className="cursor-pointer">
              {t("firstVisit", locale)}
            </Label>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t("firstVisitDesc", locale)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
