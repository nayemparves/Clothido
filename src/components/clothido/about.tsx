"use client";

import Image from "next/image";
import { mediumTiles } from "@/lib/clothido-data";
import { useStore } from "@/lib/store";
import { categoryForName } from "@/lib/clothido-data";

export function AboutBrand() {
  return (
    <section
      id="about"
      className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center scroll-mt-20"
    >
      <div>
        <h2 className="text-[26px] font-extrabold text-[#373A3C] mb-1">
          Cloth<span className="font-light">ido</span>
        </h2>
        <p className="text-[15px] font-semibold text-[#0275D8] mb-3">
          Because great days start with what you wear.
        </p>
        <p className="text-[14px] leading-7 text-[#555]">
          At Clothido, we believe everyday clothing should feel as good as it looks. Every piece in
          our collection is chosen with care — soft, breathable fabrics, thoughtful cuts, and
          finishing that stands up to real life. Beyond fabric, design and fit, each product passes
          through rigorous quality checks before it reaches your wardrobe, so you always get the
          comfort you deserve. The right outfit does more than dress you; it changes how you carry
          yourself through the day.
        </p>
      </div>
      <div className="relative h-[200px] md:h-[240px] rounded-xl overflow-hidden">
        <Image
          src="/images/hero-bg.png"
          alt="Clothido lifestyle — relaxed everyday comfort"
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 480px"
        />
      </div>
    </section>
  );
}

export function MediumTiles() {
  const openCategory = useStore((s) => s.openCategory);

  return (
    <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-2">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {mediumTiles.map((t, i) => (
          <button
            key={`${t.name}-${i}`}
            onClick={() => openCategory(categoryForName(t.name))}
            aria-label={`Browse ${t.name}`}
            className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F0F0F0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0275D8] active:scale-[0.98] transition-transform"
          >
            <Image
              src={t.image}
              alt={t.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width:768px) 50vw, 16vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-0 right-0 text-center text-white text-[13px] font-bold drop-shadow">
              {t.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
