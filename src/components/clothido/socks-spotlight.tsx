"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { discountPercent, formatBDT, socksProducts } from "@/lib/clothido-data";
import { useStore } from "@/lib/store";
import { CardActions } from "./product-bits";

export function SocksSpotlight() {
  const scroller = useRef<HTMLDivElement>(null);
  const openQuickView = useStore((s) => s.openQuickView);
  const openCategory = useStore((s) => s.openCategory);

  const scrollBy = (dir: number) =>
    scroller.current?.scrollBy({ left: dir * 640, behavior: "smooth" });

  const openSocks = () =>
    openCategory({ categoryId: "socks", title: "Premium Antibacterial Socks" });

  return (
    <section className="bg-gradient-to-br from-[#DFF6F0] to-[#C9EDE4] py-8 mt-6">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
        <div className="text-center mb-6">
          <p className="text-[12px] font-bold tracking-[0.18em] uppercase text-[#0E8C7F] mb-1">
            The best quality socks you can find in Bangladesh
          </p>
          <h2 className="text-[24px] font-extrabold text-[#0B6B60]">
            Premium Antibacterial Socks
          </h2>
          <button
            onClick={openSocks}
            className="inline-block mt-2 text-[12px] font-bold text-[#0E8C7F] underline underline-offset-4 hover:text-[#0B6B60] transition-colors"
          >
            Visit Store ❯
          </button>
        </div>

        <div className="relative">
          <div
            ref={scroller}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x"
          >
            {socksProducts.map((p) => {
              const disc = discountPercent(p);
              return (
                <div
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => openQuickView(p)}
                  onKeyDown={(e) => e.key === "Enter" && openQuickView(p)}
                  aria-label={`View ${p.name}`}
                  className="group w-[46%] sm:w-[31%] md:w-[185px] shrink-0 snap-start cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8C7F] rounded-lg"
                >
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-white">
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
                    <p className="text-[12px] font-semibold text-[#373A3C] truncate group-hover:text-[#0E8C7F]">
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
            <button
              onClick={openSocks}
              aria-label="View all premium socks"
              className="group w-[46%] sm:w-[31%] md:w-[185px] shrink-0 snap-start flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8C7F] rounded-lg"
            >
              <div className="relative flex-1 aspect-[4/5] rounded-lg overflow-hidden bg-[#0B6B60]">
                <Image
                  src="/images/socks-colorful.png"
                  alt="More antibacterial socks"
                  fill
                  className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-300"
                  sizes="185px"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-3 text-center">
                  <p className="text-white text-[12px] font-semibold">
                    Premium Antibacterial Socks - Squash
                  </p>
                  <span className="bg-white text-[#0B6B60] text-[11px] font-bold tracking-wide px-4 py-2 rounded-full group-hover:bg-[#0B6B60] group-hover:text-white transition-colors">
                    VIEW MORE
                  </span>
                </div>
              </div>
            </button>
          </div>
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous socks"
            className="hidden md:grid absolute -left-3 top-[38%] h-9 w-9 place-items-center rounded-full bg-white shadow-lg text-[#373A3C] hover:text-[#0E8C7F] z-10 active:scale-90 transition-transform"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next socks"
            className="hidden md:grid absolute -right-3 top-[38%] h-9 w-9 place-items-center rounded-full bg-white shadow-lg text-[#373A3C] hover:text-[#0E8C7F] z-10 active:scale-90 transition-transform"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
