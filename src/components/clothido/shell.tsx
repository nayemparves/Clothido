"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { SearchOverlay } from "./search-overlay";
import { CategoryOverlay } from "./category-overlay";
import { QuickView } from "./quick-view";
import { CartDrawer } from "./cart-drawer";
import { WishlistDrawer } from "./wishlist-drawer";
import { AllModals } from "./info-modals";

export function InteractiveShell() {
  const searchOpen = useStore((s) => s.searchOpen);
  const categoryView = useStore((s) => s.categoryView);

  /* Body scroll lock for the custom (non-Radix) full-screen overlays */
  useEffect(() => {
    const locked = searchOpen || Boolean(categoryView);
    if (!locked) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen, categoryView]);

  return (
    <>
      <SearchOverlay />
      <CategoryOverlay />
      <QuickView />
      <CartDrawer />
      <WishlistDrawer />
      <AllModals />
    </>
  );
}
