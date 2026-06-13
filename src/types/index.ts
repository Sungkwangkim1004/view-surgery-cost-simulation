export type Department = "성형외과" | "피부과";

export interface Treatment {
  department: Department;
  category: string;
  name: string;
  base_price: number;
}

export interface Bundle {
  name: string;
  required: string[];
  price: number;
}

export interface CartItem {
  id: string;
  department: Department;
  treatmentName: string;
  category: string;
  basePrice: number;
  sessions: number;
}

export interface DiscountLine {
  id: "bundle" | "session" | "volume" | "first_visit" | "base_items";
  label: string;
  amount: number;
  params?: Record<string, string | number>;
}

export interface BaseItemLine {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  isFree: boolean;
}

export interface PriceBreakdown {
  cartItems: CartItem[];
  originalTotal: number;
  bundleMatches: Array<{
    bundleName: string;
    bundlePrice: number;
    savedAmount: number;
    items: string[];
  }>;
  unbundledItems: Array<{
    treatmentName: string;
    category: string;
    basePrice: number;
    sessions: number;
    subtotalBeforeDiscount: number;
    subtotalAfterDiscount: number;
  }>;
  discountLines: DiscountLine[];
  bundleTotal: number;
  unbundledTotal: number;
  firstVisitDiscount: number;
  firstVisitItemName: string | null;
  treatmentSupplyAmount: number;
  baseItems: BaseItemLine[];
  baseItemsOriginalTotal: number;
  baseItemsDiscount: number;
  baseItemsTotal: number;
  baseItemsDiscountApplied: boolean;
  baseItemsFreeTier: "none" | "partial" | "full";
  supplyAmount: number;
  vat: number;
  finalTotal: number;
}
