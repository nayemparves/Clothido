"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Heart, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/lib/store";
import { ModalShell } from "./product-bits";
import {
  categoryForName,
  discountPercent,
  formatBDT,
  sizesFor,
  type Product,
} from "@/lib/clothido-data";

export function QuickView() {
  const product = useStore((s) => s.quickView);
  if (!product) return null;
  return <QuickViewContent key={product.id} product={product} />;
}

function QuickViewContent({ product }: { product: Product }) {
  const closeQuickView = useStore((s) => s.closeQuickView);
  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wishlisted = useStore((s) =>
    s.wishlist.some((w) => w.id === product.id)
  );
  const openCart = useStore((s) => s.openCart);
  const openCategory = useStore((s) => s.openCategory);
  const { toast } = useToast();

  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const sizes = useMemo(() => sizesFor(product), [product]);
  const disc = discountPercent(product);
  const cat = categoryForName(product.name);

  const handleAdd = (goToCart: boolean) => {
    if (sizes && !size) {
      setSizeError(true);
      toast({ title: "Please select a size first." });
      return;
    }
    addToCart(product, size ?? undefined, qty);
    closeQuickView();
    if (goToCart) openCart();
    toast({
      title: goToCart ? "Added to bag" : `Added to bag — ${qty} item${qty > 1 ? "s" : ""}`,
      description: product.name,
    });
  };

  return (
    <ModalShell onClose={closeQuickView} labelledBy="qv-title" wide>
      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/5] bg-[#F7F7F7] md:rounded-l-xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 440px"
            priority
          />
          {disc > 0 && (
            <span className="absolute top-3 left-3 bg-[#E91E63] text-white text-[11px] font-bold px-2.5 py-1 rounded">
              -{disc}% OFF
            </span>
          )}
        </div>

        {/* Details */}
        <div className="p-6 md:pr-10 flex flex-col">
          <h2 id="qv-title" className="text-[18px] font-bold text-[#282C3F] leading-snug pr-8">
            {product.name}
          </h2>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-[22px] font-extrabold text-[#282C3F]">
              {formatBDT(product.price)}
            </span>
            <span className="text-[14px] text-[#999] line-through">
              {formatBDT(product.oldPrice)}
            </span>
            {disc > 0 && (
              <span className="text-[13px] font-bold text-[#E91E63]">{disc}% off</span>
            )}
          </div>

          {/* Sizes */}
          {sizes && (
            <div className="mt-5">
              <p className="text-[12px] font-bold text-[#373A3C] mb-2">
                Select size{" "}
                <span className="font-normal text-[#888]">
                  ({product.name.toLowerCase().includes("kid") ? "age" : "inches"})
                </span>
              </p>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s);
                      setSizeError(false);
                    }}
                    aria-pressed={size === s}
                    className={`min-w-[44px] h-9 px-3 rounded-md text-[12px] font-bold border transition-all active:scale-95 ${
                      size === s
                        ? "bg-[#282C3F] text-white border-[#282C3F]"
                        : sizeError
                          ? "border-[#E91E63] text-[#373A3C] bg-[#FFF5F8]"
                          : "border-[#DDD] text-[#373A3C] hover:border-[#0275D8] hover:text-[#0275D8]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-[11px] text-[#E91E63] mt-1.5">
                  Please choose a size to continue.
                </p>
              )}
            </div>
          )}

          {/* Qty */}
          <div className="mt-5 flex items-center gap-3">
            <span className="text-[12px] font-bold text-[#373A3C]">Quantity</span>
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="h-9 w-9 grid place-items-center hover:bg-[#F5F5F5] active:scale-90 transition"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center text-[13px] font-bold" aria-live="polite">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                aria-label="Increase quantity"
                className="h-9 w-9 grid place-items-center hover:bg-[#F5F5F5] active:scale-90 transition"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex gap-2.5">
            <button
              onClick={() => handleAdd(true)}
              className="flex-1 h-11 rounded-full bg-[#0275D8] text-white text-[13px] font-bold tracking-wide hover:bg-[#0264b8] transition-all active:scale-95"
            >
              ADD TO BAG
            </button>
            <button
              onClick={() => handleAdd(false)}
              aria-label="Add to bag and keep browsing"
              className="h-11 px-5 rounded-full border border-[#0275D8] text-[#0275D8] text-[13px] font-bold hover:bg-[#E8F4FD] transition-all active:scale-95"
            >
              ADD & BROWSE
            </button>
            <button
              onClick={() => {
                const added = toggleWishlist(product);
                toast({
                  title: added ? "Added to wishlist" : "Removed from wishlist",
                  description: product.name,
                });
              }}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={`h-11 w-11 grid place-items-center rounded-full border transition-all active:scale-90 ${
                wishlisted
                  ? "bg-[#E91E63] border-[#E91E63] text-white"
                  : "border-[#DDD] text-[#373A3C] hover:border-[#E91E63] hover:text-[#E91E63]"
              }`}
            >
              <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Meta */}
          <div className="mt-6 pt-4 border-t space-y-2 text-[12px] text-[#666]">
            <p className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-[#0275D8]" /> Free delivery on orders over ৳ 1,500
              (else ৳ 80)
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0275D8]" /> 7-day easy return & quality
              guaranteed
            </p>
          </div>

          <button
            onClick={() => {
              closeQuickView();
              openCategory(cat);
            }}
            className="mt-4 text-left text-[12px] font-bold text-[#0275D8] hover:underline"
          >
            More from {cat.title} ❯
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
