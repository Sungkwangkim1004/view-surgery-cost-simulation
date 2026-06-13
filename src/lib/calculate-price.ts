import { bundlesDB } from "@/lib/data";
import type { CartItem, DiscountLine, PriceBreakdown } from "@/types";

interface WorkingItem {
  treatmentName: string;
  category: string;
  basePrice: number;
  sessions: number;
}

function getSessionDiscountRate(sessions: number): number {
  if (sessions >= 10) return 0.3;
  if (sessions >= 5) return 0.2;
  if (sessions >= 3) return 0.15;
  return 0;
}

function getVolumeDiscountRate(uniqueItemCount: number): number {
  if (uniqueItemCount >= 4) return 0.15;
  if (uniqueItemCount === 3) return 0.1;
  if (uniqueItemCount === 2) return 0.05;
  return 0;
}

function cloneWorkingItems(cartItems: CartItem[]): WorkingItem[] {
  return cartItems.map((item) => ({
    treatmentName: item.treatmentName,
    category: item.category,
    basePrice: item.basePrice,
    sessions: item.sessions,
  }));
}

function getOriginalTotal(cartItems: CartItem[]): number {
  return cartItems.reduce(
    (sum, item) => sum + item.basePrice * item.sessions,
    0
  );
}

function matchBundles(workingItems: WorkingItem[]) {
  const bundleMatches: PriceBreakdown["bundleMatches"] = [];
  const discountLines: DiscountLine[] = [];
  let bundleTotal = 0;

  let matched = true;
  while (matched) {
    matched = false;

    for (const bundle of bundlesDB) {
      const canMatch = bundle.required.every((requiredName) => {
        const item = workingItems.find((w) => w.treatmentName === requiredName);
        return item && item.sessions > 0;
      });

      if (!canMatch) continue;

      const individualPrice = bundle.required.reduce((sum, requiredName) => {
        const item = workingItems.find((w) => w.treatmentName === requiredName);
        return sum + (item?.basePrice ?? 0);
      }, 0);

      const savedAmount = individualPrice - bundle.price;

      bundle.required.forEach((requiredName) => {
        const item = workingItems.find((w) => w.treatmentName === requiredName);
        if (item) item.sessions -= 1;
      });

      bundleMatches.push({
        bundleName: bundle.name,
        bundlePrice: bundle.price,
        savedAmount,
        items: [...bundle.required],
      });

      discountLines.push({
        label: `✔️ ${bundle.name} 구성 성공`,
        amount: savedAmount,
      });

      bundleTotal += bundle.price;
      matched = true;
      break;
    }
  }

  return { bundleMatches, discountLines, bundleTotal };
}

export function calculatePrice(
  cartItems: CartItem[],
  isFirstVisit: boolean
): PriceBreakdown {
  const originalTotal = getOriginalTotal(cartItems);

  if (cartItems.length === 0) {
    return {
      cartItems: [],
      originalTotal: 0,
      bundleMatches: [],
      unbundledItems: [],
      discountLines: [],
      bundleTotal: 0,
      unbundledTotal: 0,
      firstVisitDiscount: 0,
      firstVisitItemName: null,
      supplyAmount: 0,
      vat: 0,
      finalTotal: 0,
    };
  }

  const workingItems = cloneWorkingItems(cartItems);
  const { bundleMatches, discountLines, bundleTotal } = matchBundles(workingItems);

  const remainingItems = workingItems.filter((item) => item.sessions > 0);
  const uniqueItemCount = remainingItems.length;

  let sessionDiscountTotal = 0;
  let unbundledAfterSessionDiscount = 0;

  const unbundledItems: PriceBreakdown["unbundledItems"] = remainingItems.map(
    (item) => {
      const subtotalBeforeDiscount = item.basePrice * item.sessions;
      const sessionRate = getSessionDiscountRate(item.sessions);
      const sessionDiscount = Math.round(subtotalBeforeDiscount * sessionRate);
      const subtotalAfterDiscount = subtotalBeforeDiscount - sessionDiscount;

      sessionDiscountTotal += sessionDiscount;
      unbundledAfterSessionDiscount += subtotalAfterDiscount;

      return {
        treatmentName: item.treatmentName,
        category: item.category,
        basePrice: item.basePrice,
        sessions: item.sessions,
        subtotalBeforeDiscount,
        subtotalAfterDiscount,
      };
    }
  );

  if (sessionDiscountTotal > 0) {
    const maxSessions = Math.max(...remainingItems.map((i) => i.sessions));
    let sessionLabel = "다회차 할인";
    if (maxSessions >= 10) sessionLabel = "다회차 할인 (10회 이상 30%)";
    else if (maxSessions >= 5) sessionLabel = "다회차 할인 (5~9회 20%)";
    else if (maxSessions >= 3) sessionLabel = "다회차 할인 (3~4회 15%)";

    discountLines.push({
      label: `✔️ ${sessionLabel}`,
      amount: sessionDiscountTotal,
    });
  }

  const volumeRate = getVolumeDiscountRate(uniqueItemCount);
  const volumeDiscount = Math.round(unbundledAfterSessionDiscount * volumeRate);

  if (volumeDiscount > 0) {
    const volumeLabel =
      uniqueItemCount >= 4
        ? "교차 카테고리 볼륨 할인 (4종 이상 15%)"
        : uniqueItemCount === 3
          ? "교차 카테고리 볼륨 할인 (3종 10%)"
          : "교차 카테고리 볼륨 할인 (2종 5%)";

    discountLines.push({
      label: `✔️ ${volumeLabel}`,
      amount: volumeDiscount,
    });
  }

  let unbundledTotal = unbundledAfterSessionDiscount - volumeDiscount;

  let firstVisitDiscount = 0;
  let firstVisitItemName: string | null = null;

  if (isFirstVisit && remainingItems.length > 0) {
    const cheapest = remainingItems.reduce((min, item) =>
      item.basePrice < min.basePrice ? item : min
    );
    firstVisitDiscount = Math.round(cheapest.basePrice * 0.5);
    firstVisitItemName = cheapest.treatmentName;

    discountLines.push({
      label: `✔️ 첫 방문 로스리더 (${cheapest.treatmentName} 1회 50%)`,
      amount: firstVisitDiscount,
    });

    unbundledTotal -= firstVisitDiscount;
  }

  const supplyAmount = bundleTotal + unbundledTotal;
  const vat = Math.round(supplyAmount * 0.1);
  const finalTotal = supplyAmount + vat;

  return {
    cartItems,
    originalTotal,
    bundleMatches,
    unbundledItems,
    discountLines,
    bundleTotal,
    unbundledTotal,
    firstVisitDiscount,
    firstVisitItemName,
    supplyAmount,
    vat,
    finalTotal,
  };
}
