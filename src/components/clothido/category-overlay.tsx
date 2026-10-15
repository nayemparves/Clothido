"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpDown } from "lucide-react";
import { useStore } from "@/lib/store";
import { OverlayProductCard } from "./product-bits";
import { productsForCategory, type CategoryRequest } from "@/lib/clothido-data";

type SortKey = "featured" | "price-asc" | "price-desc" | "discount";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "discount", label: "Biggest Discount" },
];

export function CategoryOverlay() {
  const categoryView = useStore((s) => s.categoryView);
  const closeCategory = useStore((s) => s.closeCategory);

  useEffect(() => {
    if (!categoryView) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCategory();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [categoryView, closeCategory]);

  if (!categoryView) return null;
  return <CategoryContent key={`${categoryView.categoryId}-${categoryView.title}`} request={categoryView} />;
}

function CategoryContent({ request }: { request: CategoryRequest }) {
  const closeCategory = useStore((s) => s.closeCategory);
  const [sort, setSort] = useState<SortKey>("featured");

  const products = useMemo(() => {
    const list = [...productsForCategory(request.categoryId)];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "discount":
        return list.sort(
          (a, b) =>
            (b.oldPrice - b.price) / b.oldPrice - (a.oldPrice - a.price) / a.oldPrice
        );
      default:
        return list;
    }
  }, [request.categoryId, sort]);

  return (
    <div className="fixed inset-0 z-[80] bg-white flex flex-col" role="dialog" aria-modal="true" aria-label={request.title}>
      {/* Top bar */}
      <div className="shrink-0 border-b bg-white shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-16 flex items-center gap-4">
          <button
            onClick={closeCategory}
            aria-label="Back to store"
            className="h-10 w-10 grid place-items-center rounded-full hover:bg-[#F5F5F5] text-[#373A3C] transition-colors active:scale-90"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h2 className="text-[16px] font-extrabold text-[#282C3F] truncate">
              {request.title}
            </h2>
            <p className="text-[11px] text-[#888]">{products.length} products</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-[#888]" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort products"
              className="h-9 text-[12px] font-semibold text-[#373A3C] border rounded-md px-2 bg-white outline-none focus:ring-2 focus:ring-[#0275D8]/40"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
          {products.length === 0 ? (
            <p className="text-center text-[14px] text-[#888] py-20">
              No products found in this collection yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-6">
              {products.map((p) => (
                <OverlayProductCard key={`${p.id}-${p.name}`} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
