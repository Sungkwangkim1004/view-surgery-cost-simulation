import { create } from "zustand";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isFirstVisit: boolean;
  activeTreatmentName: string | null;
  syncItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateSessions: (id: string, sessions: number) => void;
  setFirstVisit: (value: boolean) => void;
  setActiveTreatmentName: (name: string | null) => void;
  clearCart: () => void;
}

let itemCounter = 0;

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isFirstVisit: false,
  activeTreatmentName: null,

  syncItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.treatmentName === item.treatmentName
      );

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.treatmentName === item.treatmentName
              ? {
                  ...i,
                  department: item.department,
                  category: item.category,
                  basePrice: item.basePrice,
                  sessions: item.sessions,
                }
              : i
          ),
          activeTreatmentName: item.treatmentName,
        };
      }

      itemCounter += 1;
      return {
        items: [...state.items, { ...item, id: `cart-${itemCounter}` }],
        activeTreatmentName: item.treatmentName,
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const removed = state.items.find((i) => i.id === id);
      const nextItems = state.items.filter((i) => i.id !== id);
      return {
        items: nextItems,
        activeTreatmentName:
          removed?.treatmentName === state.activeTreatmentName
            ? nextItems[0]?.treatmentName ?? null
            : state.activeTreatmentName,
      };
    }),

  updateSessions: (id, sessions) =>
    set((state) => {
      if (sessions <= 0) {
        const removed = state.items.find((i) => i.id === id);
        const nextItems = state.items.filter((i) => i.id !== id);
        return {
          items: nextItems,
          activeTreatmentName:
            removed?.treatmentName === state.activeTreatmentName
              ? nextItems[0]?.treatmentName ?? null
              : state.activeTreatmentName,
        };
      }

      const updated = state.items.map((i) =>
        i.id === id ? { ...i, sessions } : i
      );
      const changed = updated.find((i) => i.id === id);
      return {
        items: updated,
        activeTreatmentName: changed?.treatmentName ?? state.activeTreatmentName,
      };
    }),

  setFirstVisit: (value) => set({ isFirstVisit: value }),

  setActiveTreatmentName: (name) => set({ activeTreatmentName: name }),

  clearCart: () =>
    set({ items: [], isFirstVisit: false, activeTreatmentName: null }),
}));
