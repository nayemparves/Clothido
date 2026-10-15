"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useHasMounted, useStore } from "@/lib/store";
import {
  formatBDT,
  sizesFor,
  type Product,
} from "@/lib/clothido-data";

export function WishlistDrawer() {
  const wishOpen = useStore((s) => s.wishOpen);
  const closeWishlist = useStore((s) => s.closeWishlist);
  const mounted = useHasMounted();

  useEffect(() => {
    if (!wishOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeWishlist();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [wishOpen, closeWishlist]);

  if (!mounted || !wishOpen) return null;
  return <WishlistContent />;
}

function WishlistContent() {
  const closeWishlist = useStore((s) => s.closeWishlist);
  const wishlist = useStore((s) => s.wishlist);
  const removeFromWishlist = useStore((s) => s.removeFromWishlist);
  const addToCart = useStore((s) => s.addToCart);
  const openCart = useStore((s) => s.openCart);
  const openCategory = useStore((s) => s.openCategory);
  const { toast } = useToast();

  const moveToBag = (id: string) => {
    const item = wishlist.find((w) => w.id === id);
    if (!item) return;
    const product: Product = { ...item, oldPrice: item.price };
    addToCart(product, sizesFor(product)?.[1]);
    removeFromWishlist(id);
    toast({ title: "Moved to bag", description: item.name });
  };

  return (
    <div className="fixed inset-0 z-[88]" role="dialog" aria-modal="true" aria-label="Wishlist">
      <div className="absolute inset-0 bg-black/50" onClick={closeWishlist} />
      <aside className="absolute right-0 top-0 bottom-0 w-full max-w-[440px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center gap-3 px-5 h-16 border-b shrink-0">
          <h2 className="text-[15px] font-extrabold text-[#282C3F]">
            My Wishlist ({wishlist.length})
          </h2>
          <button
            onClick={closeWishlist}
            aria-label="Close wishlist"
            className="ml-auto h-8 w-8 grid place-items-center rounded-full hover:bg-[#F5F5F5] active:scale-90 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex-1 grid place-items-center px-8 text-center">
            <div>
              <div className="mx-auto h-16 w-16 rounded-full bg-[#FDF0F4] grid place-items-center mb-4">
                <Heart className="h-7 w-7 text-[#E91E63]" />
              </div>
              <p className="text-[15px] font-bold text-[#282C3F]">Your wishlist is empty</p>
              <p className="text-[13px] text-[#888] mt-1 mb-5">
                Tap the heart on any product to save it here.
              </p>
              <button
                onClick={() => {
                  closeWishlist();
                  openCategory({ categoryId: "new", title: "New Arrivals" });
                }}
                className="h-11 px-6 rounded-full bg-[#E91E63] text-white text-[13px] font-bold hover:bg-[#c81452] transition-all active:scale-95"
              >
                EXPLORE PRODUCTS
              </button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 divide-y">
              {wishlist.map((w) => (
                <li key={w.id} className="py-4 flex gap-3">
                  <div className="relative h-20 w-16 rounded-md overflow-hidden bg-[#F5F5F5] shrink-0">
                    <Image src={w.image} alt={w.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#373A3C] line-clamp-2">{w.name}</p>
                    <p className="text-[13px] font-bold text-[#282C3F] mt-1">
                      {formatBDT(w.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => moveToBag(w.id)}
                        className="h-8 px-3.5 rounded-full bg-[#0275D8] text-white text-[11px] font-bold hover:bg-[#0264b8] transition-all active:scale-95 flex items-center gap-1.5"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" /> Move to bag
                      </button>
                      <button
                        onClick={() => {
                          removeFromWishlist(w.id);
                          toast({ title: "Removed from wishlist", description: w.name });
                        }}
                        aria-label={`Remove ${w.name} from wishlist`}
                        className="h-8 w-8 grid place-items-center rounded-full text-[#999] hover:text-[#E91E63] hover:bg-[#FFF5F8] active:scale-90 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t px-5 py-4 shrink-0">
              <button
                onClick={() => {
                  wishlist.forEach((w) => {
                    const product: Product = { ...w, oldPrice: w.price };
                    addToCart(product, sizesFor(product)?.[1]);
                    removeFromWishlist(w.id);
                  });
                  const n = wishlist.length;
                  closeWishlist();
                  openCart();
                  toast({
                    title: `Moved ${n} item${n > 1 ? "s" : ""} to your bag`,
                    description: "Review your bag to continue.",
                  });
                }}
                className="w-full h-11 rounded-full border border-[#0275D8] text-[#0275D8] text-[13px] font-bold hover:bg-[#E8F4FD] transition-all active:scale-95"
              >
                MOVE ALL TO BAG
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

