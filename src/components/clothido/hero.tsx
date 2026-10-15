"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/lib/store";

const QUICK_LINKS: { label: string; target: string }[] = [
  { label: "SHOP NOW", target: "#new-arrival" },
  { label: "MEN", target: "#category-polo" },
  { label: "WOMEN", target: "#category-women" },
  { label: "KIDS", target: "#category-kids" },
];

const UTILITY_LINKS = [
  { label: "Login", desc: "Enter Your Account", action: "login" as const },
  { label: "Track Order", desc: "Know Your Order Status", action: "track" as const },
];

export function Hero() {
  const [popupOpen, setPopupOpen] = useState(false);
  const openAuth = useStore((s) => s.openAuth);
  const openTrack = useStore((s) => s.openTrack);
  const { toast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setPopupOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  const goTo = (target: string) => {
    setPopupOpen(false);
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Utility strip */}
      <div className="hidden md:flex max-w-[1280px] mx-auto px-6 gap-6 pt-[72px]">
        {UTILITY_LINKS.map((l) => (
          <button
            key={l.label}
            onClick={() => (l.action === "login" ? openAuth() : openTrack())}
            className="flex-1 flex items-center justify-between border border-[#EBEBEB] rounded-lg px-5 py-3 hover:border-[#0275D8] group transition-colors text-left active:scale-[0.99]"
          >
            <div>
              <p className="text-sm font-bold text-[#373A3C]">{l.label}</p>
              <p className="text-xs text-[#888]">{l.desc}</p>
            </div>
            <span className="text-[#0275D8] group-hover:translate-x-1 transition-transform">❯</span>
          </button>
        ))}
      </div>

      {/* Hero banner — new campaign imagery */}
      <section className="relative w-full h-[420px] md:h-[487px] mt-3 md:mt-4 overflow-hidden bg-[#E8E2D8]">
        <Image
          src="/images/hero-campaign-v3.png"
          alt="Clothido seasonal campaign — new arrivals for men"
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
            <button
              onClick={() => goTo("#new-arrival")}
              className="inline-block mt-6 bg-white text-[#282C3F] text-[13px] font-bold tracking-widest px-8 py-3 rounded-full hover:bg-[#0275D8] hover:text-white transition-all active:scale-95"
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </section>

      {/* Quick links + app promo */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-4 flex flex-col md:flex-row items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          {QUICK_LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => goTo(l.target)}
              className="text-[12px] font-bold tracking-wide border border-[#DDD] rounded-full px-5 py-2 hover:border-[#0275D8] hover:text-[#0275D8] transition-all active:scale-95"
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 md:ml-8">
          <span className="text-[12px] font-bold text-[#373A3C]">GET 5% OFF ON APP</span>
          {["Play Store", "App Store"].map((s) => (
            <button
              key={s}
              onClick={() =>
                toast({
                  title: "Clothido app is coming soon 📱",
                  description: "Web orders already enjoy free delivery over ৳ 1,500.",
                })
              }
              className="bg-black text-white text-[10px] leading-tight rounded-md px-3 py-1.5 flex flex-col hover:opacity-80 transition-opacity active:scale-95"
            >
              <span className="opacity-70">Get it on</span>
              <span className="font-bold">{s}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Event announcement strip */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 pb-4">
        <button
          onClick={() => goTo("#bulk-order")}
          className="w-full flex items-center justify-center gap-2 bg-[#FFF6E5] border border-[#FFE2A8] rounded-lg px-4 py-3 text-[13px] text-[#373A3C] hover:border-[#F0A500] transition-colors text-left"
        >
          <strong className="text-[#C47B00]">Event T-shirt</strong>
          <span>
            Need clothing with your own brand logo or design? We deliver worldwide at unbeatable
            prices.
          </span>
          <strong className="text-[#C47B00] underline">Get a quote</strong>
        </button>
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
                src="/images/hero-campaign-v3.png"
                alt="Clothido monsoon campaign — male model in navy polo, enjoy 600 BDT cashback"
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
            <div className="p-4">
              <button
                onClick={() => goTo("#new-arrival")}
                className="w-full h-11 rounded-full bg-[#0275D8] text-white text-[13px] font-bold tracking-widest hover:bg-[#0264b8] transition-all active:scale-95"
              >
                SHOP NOW
              </button>
            </div>
            <button
              onClick={() => setPopupOpen(false)}
              aria-label="Close campaign popup"
              className="absolute top-2 right-2 h-8 w-8 grid place-items-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
