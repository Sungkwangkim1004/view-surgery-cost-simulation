import { create } from "zustand";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isFirstVisit: boolean;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateSessions: (id: string, sessions: number) => void;
  setFirstVisit: (value: boolean) => void;
  clearCart: () => void;
}

let itemCounter = 0;

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isFirstVisit: false,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.treatmentName === item.treatmentName
      );

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === existing.id
              ? { ...i, sessions: i.sessions + item.sessions }
              : i
          ),
        };
      }

      itemCounter += 1;
      return {
        items: [
          ...state.items,
          { ...item, id: `cart-${itemCounter}` },
        ],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  updateSessions: (id, sessions) =>
    set((state) => ({
      items:
        sessions <= 0
          ? state.items.filter((i) => i.id !== id)
          : state.items.map((i) =>
              i.id === id ? { ...i, sessions } : i
            ),
    })),

  setFirstVisit: (value) => set({ isFirstVisit: value }),

  clearCart: () => set({ items: [], isFirstVisit: false }),
}));
