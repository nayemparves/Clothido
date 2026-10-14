"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { socksProducts, formatBDT } from "@/lib/clothido-data";

export function SocksSpotlight() {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) =>
    scroller.current?.scrollBy({ left: dir * 640, behavior: "smooth" });

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
          <a
            href="#"
            className="inline-block mt-2 text-[12px] font-bold text-[#0E8C7F] underline underline-offset-4 hover:text-[#0B6B60]"
          >
            Visit Store ❯
          </a>
        </div>

        <div className="relative">
          <div
            ref={scroller}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x"
          >
            {socksProducts.map((p) => (
              <a key={p.id} href="#" className="group w-[46%] sm:w-[31%] md:w-[185px] shrink-0 snap-start">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-white">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="185px"
                  />
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
              </a>
            ))}
            <a href="#" className="w-[46%] sm:w-[31%] md:w-[185px] shrink-0 snap-start flex flex-col">
              <div className="relative flex-1 aspect-[4/5] rounded-lg overflow-hidden bg-[#0B6B60]">
                <Image
                  src="/images/socks-colorful.png"
                  alt="More antibacterial socks"
                  fill
                  className="object-cover opacity-40"
                  sizes="185px"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-3 text-center">
                  <p className="text-white text-[12px] font-semibold">Premium Antibacterial Socks - Squash</p>
                  <span className="bg-white text-[#0B6B60] text-[11px] font-bold tracking-wide px-4 py-2 rounded-full">
                    VIEW MORE
                  </span>
                </div>
              </div>
            </a>
          </div>
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous socks"
            className="hidden md:grid absolute -left-3 top-[38%] h-9 w-9 place-items-center rounded-full bg-white shadow-lg text-[#373A3C] hover:text-[#0E8C7F] z-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next socks"
            className="hidden md:grid absolute -right-3 top-[38%] h-9 w-9 place-items-center rounded-full bg-white shadow-lg text-[#373A3C] hover:text-[#0E8C7F] z-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
