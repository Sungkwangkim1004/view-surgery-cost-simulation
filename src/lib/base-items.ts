export const BASE_ITEM_PRICE = 500_000;
export const BASE_ITEMS_DISCOUNT_THRESHOLD = 10_000_000;
export const BASE_ITEMS_DISCOUNT_RATE = 0.3;

export const BASE_ITEM_NAMES = [
  "검사",
  "통역",
  "공항 픽업",
  "비타민 주사",
] as const;

export type BaseItemName = (typeof BASE_ITEM_NAMES)[number];
