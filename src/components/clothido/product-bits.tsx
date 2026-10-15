"use client";

import Image from "next/image";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/lib/store";
import {
  discountPercent,
  formatBDT,
  sizesFor,
  type Product,
} from "@/lib/clothido-data";

/** Floating heart + quick-add buttons for product cards. */
export function CardActions({ product }: { product: Product }) {
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const addToCart = useStore((s) => s.addToCart);
  const wishlisted = useStore((s) => s.wishlist.some((w) => w.id === product.id));
  const { toast } = useToast();
  const sizes = sizesFor(product);

  return (
    <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity z-10">
      <button
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={(e) => {
          e.stopPropagation();
          const added = toggleWishlist(product);
          toast({
            title: added ? "Added to wishlist" : "Removed from wishlist",
            description: product.name,
          });
        }}
        className={`h-8 w-8 grid place-items-center rounded-full shadow-md transition-all active:scale-90 ${
          wishlisted
            ? "bg-[#E91E63] text-white"
            : "bg-white text-[#373A3C] hover:text-[#E91E63]"
        }`}
      >
        <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
      </button>
      <button
        aria-label={`Add ${product.name} to bag`}
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product, sizes ? "M" : undefined);
          toast({
            title: "Added to bag",
            description: sizes
              ? `${product.name} — size M`
              : product.name,
          });
        }}
        className="h-8 w-8 grid place-items-center rounded-full bg-white shadow-md text-[#373A3C] hover:text-[#0275D8] transition-all active:scale-90"
      >
        <ShoppingBag className="h-4 w-4" />
      </button>
    </div>
  );
}

/** Big card used inside the category overlay grid. */
export function OverlayProductCard({ product }: { product: Product }) {
  const openQuickView = useStore((s) => s.openQuickView);
  const disc = discountPercent(product);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => openQuickView(product)}
      onKeyDown={(e) => e.key === "Enter" && openQuickView(product)}
      className="group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0275D8] rounded-lg"
    >
      <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#F7F7F7]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
        />
        {disc > 0 && (
          <span className="absolute top-2 left-2 bg-[#E91E63] text-white text-[10px] font-bold px-2 py-0.5 rounded">
            -{disc}%
          </span>
        )}
        <CardActions product={product} />
      </div>
      <div className="pt-2">
        <p className="text-[12px] font-semibold text-[#373A3C] line-clamp-2 group-hover:text-[#0275D8]">
          {product.name}
        </p>
        <p className="text-[13px] mt-0.5">
          <span className="font-bold text-[#282C3F]">{formatBDT(product.price)}</span>{" "}
          <span className="text-[#999] line-through text-[11px]">
            {formatBDT(product.oldPrice)}
          </span>
        </p>
      </div>
    </div>
  );
}

/** Shared modal chrome: backdrop + centered panel with close button. */
export function ModalShell({
  onClose,
  children,
  labelledBy,
  wide,
}: {
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
  wide?: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-[90] bg-black/50 flex items-start sm:items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <div
        className={`relative bg-white rounded-xl shadow-2xl w-full ${
          wide ? "max-w-[880px]" : "max-w-[480px]"
        } my-6 sm:my-10`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3 right-3 z-10 h-8 w-8 grid place-items-center rounded-full bg-black/5 text-[#373A3C] hover:bg-black/15 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
