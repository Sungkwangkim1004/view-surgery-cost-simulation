"use client";

import { useMemo, useState } from "react";
import { Plus, ShoppingCart } from "lucide-react";
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
import { formatKRW, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Department } from "@/types";

const DEPARTMENTS: Department[] = ["성형외과", "피부과"];

export function TreatmentSelector() {
  const [department, setDepartment] = useState<Department | "">("");
  const [category, setCategory] = useState<string>("");
  const [treatmentName, setTreatmentName] = useState<string>("");
  const [sessions, setSessions] = useState<number>(1);

  const { addItem, isFirstVisit, setFirstVisit } = useCartStore();

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

  const handleDepartmentChange = (value: Department) => {
    setDepartment(value);
    setCategory("");
    setTreatmentName("");
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setTreatmentName("");
  };

  const handleAddToCart = () => {
    if (!selectedTreatment || !department) return;

    addItem({
      department: selectedTreatment.department,
      treatmentName: selectedTreatment.name,
      category: selectedTreatment.category,
      basePrice: selectedTreatment.base_price,
      sessions,
    });

    setSessions(1);
  };

  return (
    <Card className="w-full overflow-visible border-slate-200 shadow-lg">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center gap-2 text-lg text-slate-800 sm:text-xl">
          <ShoppingCart className="h-5 w-5 shrink-0 text-blue-600" />
          시술 선택
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          진료과 → 카테고리 → 시술 순으로 선택한 뒤 장바구니에 담아보세요.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 pt-6 sm:space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">진료과 (Department)</Label>
          <div
            className="grid grid-cols-2 gap-3"
            role="radiogroup"
            aria-label="진료과 선택"
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
                  {dept}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium">
            카테고리
          </Label>
          <Select
            value={category || undefined}
            onValueChange={handleCategoryChange}
            disabled={!department}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="카테고리를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="treatment" className="text-sm font-medium">
            시술
          </Label>
          <Select
            value={treatmentName || undefined}
            onValueChange={setTreatmentName}
            disabled={!category}
          >
            <SelectTrigger id="treatment" className="w-full">
              <SelectValue placeholder="시술을 선택하세요" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {treatments.map((treatment) => (
                <SelectItem key={treatment.name} value={treatment.name}>
                  <span className="truncate">
                    {treatment.name} ({formatKRW(treatment.base_price)})
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sessions" className="text-sm font-medium">
            회차
          </Label>
          <input
            id="sessions"
            type="number"
            min={1}
            max={99}
            value={sessions}
            onChange={(e) =>
              setSessions(Math.max(1, parseInt(e.target.value, 10) || 1))
            }
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {selectedTreatment && (
          <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4">
            <p className="text-sm text-slate-600">선택 시술 정가</p>
            <p className="text-lg font-semibold text-slate-800">
              {formatKRW(selectedTreatment.base_price)}
              <span className="ml-1 text-sm font-normal text-slate-500">
                / 1회
              </span>
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {sessions}회 기준 정가:{" "}
              {formatKRW(selectedTreatment.base_price * sessions)}
            </p>
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
              첫 방문 (First Visit)
            </Label>
            <p className="text-xs leading-relaxed text-muted-foreground">
              미번들 최저가 시술 1회에 50% 추가 할인이 적용됩니다.
            </p>
          </div>
        </div>

        <Button
          className="w-full gap-2"
          size="lg"
          onClick={handleAddToCart}
          disabled={!selectedTreatment}
        >
          <Plus className="h-4 w-4" />
          장바구니 담기
        </Button>
      </CardContent>
    </Card>
  );
}
