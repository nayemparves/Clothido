"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const UTILITY_LINKS = [
  { label: "Login", desc: "Enter Your Account" },
  { label: "Track Order", desc: "Know Your Order Status" },
];

export function Hero() {
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPopupOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Utility strip */}
      <div className="hidden md:flex max-w-[1280px] mx-auto px-6 gap-6 pt-[72px]">
        {UTILITY_LINKS.map((l) => (
          <a
            key={l.label}
            href="#"
            className="flex-1 flex items-center justify-between border border-[#EBEBEB] rounded-lg px-5 py-3 hover:border-[#0275D8] group transition-colors"
          >
            <div>
              <p className="text-sm font-bold text-[#373A3C]">{l.label}</p>
              <p className="text-xs text-[#888]">{l.desc}</p>
            </div>
            <span className="text-[#0275D8] group-hover:translate-x-1 transition-transform">❯</span>
          </a>
        ))}
      </div>

      {/* Hero banner — new campaign imagery */}
      <section className="relative w-full h-[420px] md:h-[487px] mt-3 md:mt-4 overflow-hidden bg-[#E8E2D8]">
        <Image
          src="/images/hero-campaign.png"
          alt="Clothido seasonal campaign — new arrivals for men and women"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
        <div className="relative max-w-[1280px] mx-auto px-6 h-full flex flex-col justify-center">
          <div className="max-w-[420px]">
            <p className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase bg-white/90 text-[#282C3F] px-3 py-1 rounded-full mb-4">
              Monsoon Collection 2026
            </p>
            <h1 className="text-white text-4xl md:text-[52px] font-extrabold leading-[1.05] drop-shadow-md">
              Minimalist Aura
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-light mt-2 drop-shadow">
              A signature blend of comfort
            </p>
            <a
              href="#new-arrival"
              className="inline-block mt-6 bg-white text-[#282C3F] text-[13px] font-bold tracking-widest px-8 py-3 rounded-full hover:bg-[#0275D8] hover:text-white transition-colors"
            >
              SHOP NOW
            </a>
          </div>
        </div>
      </section>

      {/* Quick links + app promo */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-4 flex flex-col md:flex-row items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          {["SHOP NOW", "MEN", "WOMEN", "KIDS"].map((l) => (
            <a
              key={l}
              href="#new-arrival"
              className="text-[12px] font-bold tracking-wide border border-[#DDD] rounded-full px-5 py-2 hover:border-[#0275D8] hover:text-[#0275D8] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3 md:ml-8">
          <span className="text-[12px] font-bold text-[#373A3C]">GET 5% OFF ON APP</span>
          {["Play Store", "App Store"].map((s) => (
            <a
              key={s}
              href="#"
              className="bg-black text-white text-[10px] leading-tight rounded-md px-3 py-1.5 flex flex-col hover:opacity-80"
            >
              <span className="opacity-70">Get it on</span>
              <span className="font-bold">{s}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Event announcement strip */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 pb-4">
        <a
          href="#"
          className="flex items-center justify-center gap-2 bg-[#FFF6E5] border border-[#FFE2A8] rounded-lg px-4 py-3 text-[13px] text-[#373A3C] hover:border-[#F0A500] transition-colors"
        >
          <strong className="text-[#C47B00]">Event T-shirt</strong>
          <span>
            Need clothing with your own brand logo or design? We deliver worldwide at unbeatable
            prices.
          </span>
          <strong className="text-[#C47B00] underline">Click here</strong>
        </a>
      </div>

      {/* Campaign popup — replaced hero artwork */}
      {popupOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setPopupOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Seasonal campaign offer"
        >
          <div
            className="relative w-full max-w-[560px] rounded-xl overflow-hidden bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2.5 bg-white">
              <span className="font-extrabold text-[#282C3F] text-sm">
                CLOTH<span className="font-light">IDO</span>
              </span>
              <span className="text-[11px] font-bold text-[#0275D8] bg-[#E8F4FD] px-2.5 py-1 rounded-full">
                বিজ্ঞাপন
              </span>
            </div>
            <div className="relative aspect-[4/5] sm:aspect-[5/5] bg-[#EAD9C9]">
              <Image
                src="/images/hero-campaign.png"
                alt="Clothido monsoon campaign — enjoy 600 BDT cashback"
                fill
                className="object-cover"
                sizes="560px"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-[#E91E75] to-[#F4511E] rounded-lg px-4 py-3 text-white">
                <p className="text-[11px] opacity-90">অনলাইন ক্যাশব্যাক অফার</p>
                <p className="text-xl font-extrabold leading-tight">
                  ৳৬০০ ক্যাশব্যাক <span className="text-xs font-medium">সার্ভিস চার্জে*</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setPopupOpen(false)}
              aria-label="Close campaign popup"
              className="absolute top-2 right-2 h-8 w-8 grid place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
