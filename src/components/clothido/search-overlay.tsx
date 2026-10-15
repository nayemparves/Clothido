"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Search, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/lib/store";
import {
  allProducts,
  categoryForName,
  formatBDT,
} from "@/lib/clothido-data";

const POPULAR = ["Polo", "Panjabi", "Jersey", "Socks", "Kids", "Face Mask", "Kurti"];

export function SearchOverlay() {
  const searchOpen = useStore((s) => s.searchOpen);
  const closeSearch = useStore((s) => s.closeSearch);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeSearch();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, closeSearch]);

  if (!searchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[85] bg-black/50"
      onClick={closeSearch}
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
    >
      <SearchPanel onClose={closeSearch} />
    </div>
  );
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const openQuickView = useStore((s) => s.openQuickView);
  const openCategory = useStore((s) => s.openCategory);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allProducts.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  const goCategory = (label: string) => {
    onClose();
    openCategory(categoryForName(label));
  };

  return (
    <div
      className="bg-white shadow-2xl max-w-[720px] mx-auto mt-[72px] rounded-xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
        <div className="flex items-center gap-3 px-5 h-16 border-b">
          <Search className="h-5 w-5 text-[#888] shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) {
                openQuickView(results[0]);
                onClose();
              }
            }}
            placeholder="Search for polo, panjabi, socks, kids…"
            aria-label="Search products"
            className="flex-1 h-full text-[15px] outline-none placeholder:text-[#AAA]"
          />
          <button
            onClick={onClose}
            className="text-[12px] font-bold text-[#888] hover:text-[#0275D8] transition-colors"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div className="p-5">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#888] mb-3">
                <TrendingUp className="h-3.5 w-3.5" /> Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR.map((p) => (
                  <button
                    key={p}
                    onClick={() => goCategory(p)}
                    className="text-[12px] px-3 py-1.5 rounded-full bg-[#F5F5F5] hover:bg-[#0275D8] hover:text-white transition-colors text-[#333] active:scale-95"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-[14px] font-semibold text-[#373A3C]">
                No matches for “{query}”
              </p>
              <p className="text-[12px] text-[#888] mt-1">
                Try “polo”, “kurti”, “jeans” or browse popular searches.
              </p>
            </div>
          ) : (
            <ul className="py-2">
              {results.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      openQuickView(p);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-[#F5F9FE] transition-colors text-left"
                  >
                    <div className="relative h-12 w-12 rounded-md overflow-hidden bg-[#F0F0F0] shrink-0">
                      <Image src={p.image} alt="" fill className="object-cover" sizes="48px" />
                    </div>
                    <span className="flex-1 text-[13px] font-medium text-[#373A3C] truncate">
                      {p.name}
                    </span>
                    <span className="text-[13px] font-bold text-[#282C3F]">
                      {formatBDT(p.price)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {query.trim() !== "" && (
          <button
            onClick={() => {
              goCategory(query);
              toast({
                title: `Browsing “${query}”`,
                description: "Showing the closest collection we have.",
              });
            }}
            className="w-full border-t px-5 py-3 text-[13px] font-bold text-[#0275D8] hover:bg-[#F5F9FE] transition-colors text-left"
          >
            See all results for “{query}” ❯
          </button>
        )}
      </div>
  );
}
