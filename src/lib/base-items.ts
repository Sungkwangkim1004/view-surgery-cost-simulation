export const BASE_ITEM_PRICE = 500_000;
export const BASE_ITEMS_PARTIAL_FREE_THRESHOLD = 5_000_000;
export const BASE_ITEMS_FULL_FREE_THRESHOLD = 10_000_000;

export const BASE_ITEM_NAMES = [
  "검사",
  "통역",
  "공항 픽업",
  "비타민 주사",
] as const;

export type BaseItemName = (typeof BASE_ITEM_NAMES)[number];

export const PARTIAL_FREE_BASE_ITEMS: readonly BaseItemName[] = [
  "검사",
  "통역",
];

export type BaseItemsFreeTier = "none" | "partial" | "full";

export function getBaseItemsFreeTier(originalTotal: number): BaseItemsFreeTier {
  if (originalTotal >= BASE_ITEMS_FULL_FREE_THRESHOLD) return "full";
  if (originalTotal >= BASE_ITEMS_PARTIAL_FREE_THRESHOLD) return "partial";
  return "none";
}

export function isBaseItemFree(
  name: BaseItemName,
  tier: BaseItemsFreeTier
): boolean {
  if (tier === "full") return true;
  if (tier === "partial") return PARTIAL_FREE_BASE_ITEMS.includes(name);
  return false;
}
