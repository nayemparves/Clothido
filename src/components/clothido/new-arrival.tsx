"use client";

import Image from "next/image";
import {
  newArrivalProducts,
  discountPercent,
  formatBDT,
} from "@/lib/clothido-data";
import { useStore } from "@/lib/store";
import { CardActions } from "./product-bits";

export function NewArrival() {
  const openQuickView = useStore((s) => s.openQuickView);

  return (
    <section id="new-arrival" className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6 scroll-mt-20">
      <h2 className="text-center text-[22px] font-extrabold tracking-wide text-[#373A3C] mb-1">
        NEW ARRIVAL
      </h2>
      <div className="w-10 h-[3px] bg-[#0275D8] mx-auto mb-6 rounded-full" />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {newArrivalProducts.map((card) => {
          const disc = discountPercent(card);
          return (
            <div
              key={card.id}
              role="button"
              tabIndex={0}
              onClick={() => openQuickView(card)}
              onKeyDown={(e) => e.key === "Enter" && openQuickView(card)}
              aria-label={`View ${card.name}`}
              className="group flex flex-col items-center rounded-lg overflow-hidden bg-[#F7F7F7] hover:shadow-md transition-shadow text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0275D8]"
            >
              <div className="relative w-full aspect-square bg-white">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width:640px) 33vw, (max-width:1024px) 17vw, 12vw"
                />
                {disc >= 30 && (
                  <span className="absolute top-1.5 left-1.5 bg-[#E91E63] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    -{disc}%
                  </span>
                )}
                <CardActions product={card} />
              </div>
              <span className="text-[11px] md:text-[12px] font-semibold text-center text-[#373A3C] px-1 py-2 leading-tight group-hover:text-[#0275D8] w-full line-clamp-2">
                {card.name}
              </span>
              <span className="text-[11px] font-bold text-[#282C3F] pb-2 -mt-1 md:hidden lg:block">
                {formatBDT(card.price)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
