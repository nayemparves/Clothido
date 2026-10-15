"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CategorySection } from "@/lib/clothido-data";
import { discountPercent, formatBDT } from "@/lib/clothido-data";
import { useStore } from "@/lib/store";
import { CardActions } from "./product-bits";

export function CategoryCarousel({ section }: { section: CategorySection }) {
  const scroller = useRef<HTMLDivElement>(null);
  const openQuickView = useStore((s) => s.openQuickView);
  const openCategory = useStore((s) => s.openCategory);

  const scrollBy = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 640, behavior: "smooth" });
  };

  const openThisCategory = () =>
    openCategory({ categoryId: section.id, title: section.tileTitle });

  return (
    <section
      id={`category-${section.id}`}
      className="max-w-[1280px] mx-auto px-4 lg:px-6 py-5 scroll-mt-20"
    >
      <div className="flex gap-4">
        {/* Left tile */}
        <div className="hidden md:flex w-[240px] shrink-0 flex-col gap-3">
          <button
            onClick={openThisCategory}
            aria-label={`Browse ${section.tileTitle}`}
            className="relative flex-1 rounded-xl overflow-hidden bg-[#F0F0F0] min-h-[220px] group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0275D8]"
          >
            <Image
              src={section.tileImage}
              alt={section.tileTitle}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="240px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="absolute bottom-3 left-3 right-3 text-white font-bold text-[15px] leading-tight">
              {section.tileTitle}
            </span>
          </button>
          {(section.tileImage2 || section.tileImage3) && (
            <div className="grid grid-cols-2 gap-3">
              {[section.tileImage2, section.tileImage3]
                .filter(Boolean)
                .slice(0, 2)
                .map((img, i) => (
                  <button
                    key={i}
                    onClick={openThisCategory}
                    aria-label={`${section.tileTitle} style ${i + 2}`}
                    className="relative aspect-square rounded-xl overflow-hidden bg-[#F0F0F0] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0275D8]"
                  >
                    <Image
                      src={img as string}
                      alt={`${section.tileTitle} ${i + 2}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="120px"
                    />
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Products carousel */}
        <div className="relative flex-1 min-w-0">
          <div
            ref={scroller}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x"
          >
            {section.products.map((p) => {
              const disc = discountPercent(p);
              return (
                <div
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => openQuickView(p)}
                  onKeyDown={(e) => e.key === "Enter" && openQuickView(p)}
                  aria-label={`View ${p.name}`}
                  className="group w-[46%] sm:w-[31%] md:w-[185px] shrink-0 snap-start cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0275D8] rounded-lg"
                >
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#F7F7F7]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="185px"
                    />
                    {disc > 0 && (
                      <span className="absolute top-2 left-2 bg-[#E91E63] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        -{disc}%
                      </span>
                    )}
                    <CardActions product={p} />
                  </div>
                  <div className="pt-2">
                    <p className="text-[12px] font-semibold text-[#373A3C] truncate group-hover:text-[#0275D8]">
                      {p.name}
                    </p>
                    <p className="text-[13px] mt-0.5">
                      <span className="font-bold text-[#282C3F]">{formatBDT(p.price)}</span>{" "}
                      <span className="text-[#999] line-through text-[11px]">
                        {formatBDT(p.oldPrice)}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}

            {/* View more card */}
            <button
              onClick={openThisCategory}
              aria-label={`View all in ${section.tileTitle}`}
              className="group w-[46%] sm:w-[31%] md:w-[185px] shrink-0 snap-start flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0275D8] rounded-lg"
            >
              <div className="relative flex-1 aspect-[4/5] rounded-lg overflow-hidden bg-[#282C3F]">
                <Image
                  src={section.products[0].image}
                  alt={section.viewMoreLabel}
                  fill
                  className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-300"
                  sizes="185px"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-3 text-center">
                  <p className="text-white text-[12px] font-semibold leading-snug">
                    {section.viewMoreLabel}
                  </p>
                  <span className="bg-white text-[#282C3F] text-[11px] font-bold tracking-wide px-4 py-2 rounded-full group-hover:bg-[#0275D8] group-hover:text-white transition-colors">
                    VIEW MORE
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Arrows */}
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous products"
            className="hidden md:grid absolute -left-3 top-[38%] h-9 w-9 place-items-center rounded-full bg-white shadow-lg border text-[#373A3C] hover:text-[#0275D8] z-10 active:scale-90 transition-transform"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next products"
            className="hidden md:grid absolute -right-3 top-[38%] h-9 w-9 place-items-center rounded-full bg-white shadow-lg border text-[#373A3C] hover:text-[#0275D8] z-10 active:scale-90 transition-transform"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
