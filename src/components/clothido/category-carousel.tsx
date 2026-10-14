"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CategorySection } from "@/lib/clothido-data";
import { formatBDT } from "@/lib/clothido-data";

export function CategoryCarousel({ section }: { section: CategorySection }) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 640, behavior: "smooth" });
  };

  return (
    <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-5">
      <div className="flex gap-4">
        {/* Left tile */}
        <div className="hidden md:flex w-[240px] shrink-0 flex-col gap-3">
          <div className="relative flex-1 rounded-xl overflow-hidden bg-[#F0F0F0] min-h-[220px]">
            <Image
              src={section.tileImage}
              alt={section.tileTitle}
              fill
              className="object-cover"
              sizes="240px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="absolute bottom-3 left-3 right-3 text-white font-bold text-[15px] leading-tight">
              {section.tileTitle}
            </span>
          </div>
          {(section.tileImage2 || section.tileImage3) && (
            <div className="grid grid-cols-2 gap-3">
              {[section.tileImage2, section.tileImage3]
                .filter(Boolean)
                .slice(0, 2)
                .map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-[#F0F0F0]">
                    <Image src={img as string} alt={`${section.tileTitle} ${i + 2}`} fill className="object-cover" sizes="120px" />
                  </div>
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
            {section.products.map((p) => (
              <a
                key={p.id}
                href="#"
                className="group w-[46%] sm:w-[31%] md:w-[185px] shrink-0 snap-start"
              >
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#F7F7F7]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="185px"
                  />
                  {p.badge && (
                    <span className="absolute top-2 left-2 bg-[#0275D8] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {p.badge}
                    </span>
                  )}
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
              </a>
            ))}

            {/* View more card */}
            <a
              href="#"
              className="w-[46%] sm:w-[31%] md:w-[185px] shrink-0 snap-start flex flex-col"
            >
              <div className="relative flex-1 aspect-[4/5] rounded-lg overflow-hidden bg-[#282C3F]">
                <Image
                  src={section.products[0].image}
                  alt={section.viewMoreLabel}
                  fill
                  className="object-cover opacity-40"
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
            </a>
          </div>

          {/* Arrows */}
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous products"
            className="hidden md:grid absolute -left-3 top-[38%] h-9 w-9 place-items-center rounded-full bg-white shadow-lg border text-[#373A3C] hover:text-[#0275D8] z-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next products"
            className="hidden md:grid absolute -right-3 top-[38%] h-9 w-9 place-items-center rounded-full bg-white shadow-lg border text-[#373A3C] hover:text-[#0275D8] z-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
