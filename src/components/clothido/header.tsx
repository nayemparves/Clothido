"use client";

import { useState } from "react";
import { Search, MapPin, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { ClothidoLogo } from "./logo";

const NAV = [
  {
    label: "MEN",
    groups: [
      {
        title: "Top Wear",
        chips: ["T-Shirt", "Polo", "Hoodie", "Jacket", "Panjabi", "Jersey", "Raglan", "Drop Shoulder"],
      },
      {
        title: "Bottom Wear",
        chips: ["Trousers", "Jeans", "Shorts", "Joggers", "Cargo Pants", "Track Pants"],
      },
      {
        title: "Accessories",
        chips: ["Cap", "Belt", "Wallet", "Socks", "Face Mask"],
      },
    ],
  },
  {
    label: "WOMEN",
    groups: [
      {
        title: "Top Wear",
        chips: ["T-Shirt", "Kurti", "Tunic & Tops", "Co-ord Set", "Blouse"],
      },
      {
        title: "Bottom Wear",
        chips: ["Trousers", "Pajamas", "Shorts", "Palazzo"],
      },
      {
        title: "Accessories",
        chips: ["Scarf", "Socks", "Face Mask"],
      },
    ],
  },
  {
    label: "TEENS",
    groups: [
      {
        title: "Top Wear",
        chips: ["T-Shirt", "Polo", "Co-Ords", "Tops", "Hoodie"],
      },
      {
        title: "Bottom Wear",
        chips: ["Trousers", "Shorts", "Jeans"],
      },
    ],
  },
  {
    label: "KIDS",
    groups: [
      {
        title: "Boys",
        chips: ["T-Shirt", "Polo", "Trousers", "Shorts"],
      },
      {
        title: "Girls",
        chips: ["Frock", "Tops", "T-shirt & Shorts"],
      },
      {
        title: "Accessories",
        chips: ["Masks", "Socks"],
      },
    ],
  },
  {
    label: "SPORTS",
    groups: [
      {
        title: "Jerseys",
        chips: ["Football Jerseys", "Player Edition", "Fan Edition", "Training Kit"],
      },
      {
        title: "Activewear",
        chips: ["Sports T-shirt", "Activewear Shorts", "Track Pants"],
      },
    ],
  },
];

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-[64px] flex items-center gap-4">
        {/* Logo */}
        <a href="#" aria-label="Clothido home" className="shrink-0">
          <ClothidoLogo className="h-9" />
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center gap-6 ml-8"
          onMouseLeave={() => setOpenMenu(null)}
        >
          {NAV.map((item) => (
            <div key={item.label} className="relative">
              <button
                className={`text-[13px] font-bold tracking-wide py-5 border-b-2 transition-colors ${
                  openMenu === item.label
                    ? "border-[#0275D8] text-[#0275D8]"
                    : "border-transparent text-[#373A3C] hover:text-[#0275D8]"
                }`}
                onMouseEnter={() => setOpenMenu(item.label)}
                onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
              >
                {item.label}
              </button>
              {openMenu === item.label && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-[560px] bg-white rounded-b-lg shadow-[0_12px_30px_rgba(0,0,0,0.15)] p-6 grid grid-cols-2 gap-6">
                  {item.groups.map((g) => (
                    <div key={g.title}>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#888] mb-2">
                        {g.title}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {g.chips.map((c) => (
                          <a
                            key={c}
                            href="#new-arrival"
                            className="text-[12px] px-3 py-1.5 rounded-full bg-[#F5F5F5] hover:bg-[#0275D8] hover:text-white transition-colors text-[#333]"
                          >
                            {c}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search */}
        <form
          className="hidden md:flex flex-1 max-w-[300px] ml-auto"
          onSubmit={(e) => e.preventDefault()}
          role="search"
        >
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Search"
              className="w-full h-10 pl-4 pr-10 rounded-md bg-[#F5F5F5] text-sm outline-none focus:ring-2 focus:ring-[#0275D8]/40 transition-shadow"
              aria-label="Search products"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center rounded text-[#888] hover:text-[#0275D8]"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Icons */}
        <div className="hidden lg:flex items-center gap-5 ml-2">
          {[
            { icon: MapPin, label: "Stores" },
            { icon: User, label: "Profile" },
            { icon: Heart, label: "Wishlist" },
            { icon: ShoppingBag, label: "Bag" },
          ].map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              className="flex flex-col items-center gap-0.5 text-[#373A3C] hover:text-[#0275D8] transition-colors"
            >
              <Icon className="h-[18px] w-[18px]" />
              <span className="text-[10px] font-semibold">{label}</span>
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden ml-auto h-10 w-10 grid place-items-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white px-4 py-4 space-y-3 max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              className="w-full h-10 px-4 rounded-md bg-[#F5F5F5] text-sm outline-none"
              aria-label="Search products"
            />
          </div>
          {NAV.map((item) => (
            <details key={item.label} className="group">
              <summary className="flex items-center justify-between text-[14px] font-bold py-2 cursor-pointer">
                {item.label}
                <span className="text-[#888] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="pb-3 space-y-3">
                {item.groups.map((g) => (
                  <div key={g.title}>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#888] mb-1">
                      {g.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {g.chips.map((c) => (
                        <a
                          key={c}
                          href="#new-arrival"
                          onClick={() => setMobileOpen(false)}
                          className="text-[12px] px-3 py-1.5 rounded-full bg-[#F5F5F5] text-[#333]"
                        >
                          {c}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ))}
          <div className="flex items-center gap-5 pt-2 border-t">
            {[
              { icon: MapPin, label: "Stores" },
              { icon: User, label: "Profile" },
              { icon: Heart, label: "Wishlist" },
              { icon: ShoppingBag, label: "Bag" },
            ].map(({ icon: Icon, label }) => (
              <a key={label} href="#" className="flex items-center gap-1.5 py-2 text-sm font-semibold">
                <Icon className="h-4 w-4" /> {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
