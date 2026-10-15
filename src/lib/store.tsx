"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useSyncExternalStore } from "react";
import type { CategoryRequest, Product } from "./clothido-data";

export interface CartItem {
  key: string;
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  qty: number;
}

export interface WishItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface User {
  name: string;
  phone: string;
}

interface ClothidoState {
  /* persisted */
  cart: CartItem[];
  wishlist: WishItem[];
  user: User | null;
  /* ui */
  searchOpen: boolean;
  cartOpen: boolean;
  wishOpen: boolean;
  authOpen: boolean;
  trackOpen: boolean;
  storesOpen: boolean;
  bulkOpen: boolean;
  affiliateOpen: boolean;
  infoKey: string | null;
  quickView: Product | null;
  categoryView: CategoryRequest | null;
  /* cart & wishlist actions */
  addToCart: (p: Product, size?: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  toggleWishlist: (p: Product) => boolean;
  removeFromWishlist: (id: string) => void;
  setUser: (u: User | null) => void;
  /* ui actions */
  openSearch: () => void;
  closeSearch: () => void;
  openCart: () => void;
  closeCart: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  openAuth: () => void;
  closeAuth: () => void;
  openTrack: () => void;
  closeTrack: () => void;
  openStores: () => void;
  closeStores: () => void;
  openBulk: () => void;
  closeBulk: () => void;
  openAffiliate: () => void;
  closeAffiliate: () => void;
  openInfo: (key: string) => void;
  closeInfo: () => void;
  openQuickView: (p: Product) => void;
  closeQuickView: () => void;
  openCategory: (r: CategoryRequest) => void;
  closeCategory: () => void;
  closeAllOverlays: () => void;
}

export const useStore = create<ClothidoState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      user: null,

      searchOpen: false,
      cartOpen: false,
      wishOpen: false,
      authOpen: false,
      trackOpen: false,
      storesOpen: false,
      bulkOpen: false,
      affiliateOpen: false,
      infoKey: null,
      quickView: null,
      categoryView: null,

      addToCart: (p, size, qty = 1) => {
        const key = `${p.id}::${size ?? "onesize"}`;
        const existing = get().cart.find((i) => i.key === key);
        const cart = existing
          ? get().cart.map((i) =>
              i.key === key ? { ...i, qty: Math.min(i.qty + qty, 20) } : i
            )
          : [
              ...get().cart,
              {
                key,
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.image,
                size,
                qty,
              },
            ];
        set({ cart });
      },
      setQty: (key, qty) =>
        set((s) => ({
          cart:
            qty <= 0
              ? s.cart.filter((i) => i.key !== key)
              : s.cart.map((i) =>
                  i.key === key ? { ...i, qty: Math.min(qty, 20) } : i
                ),
        })),
      removeFromCart: (key) =>
        set((s) => ({ cart: s.cart.filter((i) => i.key !== key) })),
      clearCart: () => set({ cart: [] }),

      toggleWishlist: (p) => {
        const exists = get().wishlist.some((w) => w.id === p.id);
        set((s) => ({
          wishlist: exists
            ? s.wishlist.filter((w) => w.id !== p.id)
            : [
                { id: p.id, name: p.name, price: p.price, image: p.image },
                ...s.wishlist,
              ],
        }));
        return !exists;
      },
      removeFromWishlist: (id) =>
        set((s) => ({ wishlist: s.wishlist.filter((w) => w.id !== id) })),
      setUser: (u) => set({ user: u }),

      openSearch: () => set({ searchOpen: true, categoryView: null }),
      closeSearch: () => set({ searchOpen: false }),
      openCart: () => set({ cartOpen: true }),
      closeCart: () => set({ cartOpen: false }),
      openWishlist: () => set({ wishOpen: true }),
      closeWishlist: () => set({ wishOpen: false }),
      openAuth: () => set({ authOpen: true }),
      closeAuth: () => set({ authOpen: false }),
      openTrack: () => set({ trackOpen: true }),
      closeTrack: () => set({ trackOpen: false }),
      openStores: () => set({ storesOpen: true }),
      closeStores: () => set({ storesOpen: false }),
      openBulk: () => set({ bulkOpen: true }),
      closeBulk: () => set({ bulkOpen: false }),
      openAffiliate: () => set({ affiliateOpen: true }),
      closeAffiliate: () => set({ affiliateOpen: false }),
      openInfo: (key) => set({ infoKey: key }),
      closeInfo: () => set({ infoKey: null }),
      openQuickView: (p) => set({ quickView: p }),
      closeQuickView: () => set({ quickView: null }),
      openCategory: (r) => set({ categoryView: r, searchOpen: false }),
      closeCategory: () => set({ categoryView: null }),
      closeAllOverlays: () =>
        set({
          searchOpen: false,
          cartOpen: false,
          wishOpen: false,
          authOpen: false,
          trackOpen: false,
          storesOpen: false,
          bulkOpen: false,
          affiliateOpen: false,
          infoKey: null,
          quickView: null,
          categoryView: null,
        }),
    }),
    {
      name: "clothido-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ cart: s.cart, wishlist: s.wishlist, user: s.user }),
    }
  )
);

/** Avoids hydration mismatches for values that come from localStorage. */
export function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export const cartCount = (cart: CartItem[]) =>
  cart.reduce((sum, i) => sum + i.qty, 0);
