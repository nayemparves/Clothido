"use client";

import { useState } from "react";
import { Heart, LogOut, MapPin, Menu, Package, Search, ShoppingBag, User, X } from "lucide-react";
import { ClothidoLogo } from "./logo";
import { useToast } from "@/hooks/use-toast";
import { cartCount, useHasMounted, useStore } from "@/lib/store";
import { categoryForName } from "@/lib/clothido-data";

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

const ICON_ACTIONS = ["Stores", "Profile", "Wishlist", "Bag"] as const;

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const openCategory = useStore((s) => s.openCategory);
  const openSearch = useStore((s) => s.openSearch);
  const openCart = useStore((s) => s.openCart);
  const openWishlist = useStore((s) => s.openWishlist);
  const openStores = useStore((s) => s.openStores);
  const openAuth = useStore((s) => s.openAuth);
  const openTrack = useStore((s) => s.openTrack);
  const user = useStore((s) => s.user);
  const setUser = useStore((s) => s.setUser);
  const cart = useStore((s) => s.cart);
  const wishCount = useStore((s) => s.wishlist.length);
  const mounted = useHasMounted();
  const { toast } = useToast();

  const pickCategory = (chip: string) => {
    openCategory(categoryForName(chip));
    setOpenMenu(null);
  };

  const iconClick = (label: (typeof ICON_ACTIONS)[number]) => {
    setOpenMenu(null);
    if (label === "Stores") openStores();
    if (label === "Profile") {
      if (user) setProfileMenu((v) => !v);
      else openAuth();
    }
    if (label === "Wishlist") openWishlist();
    if (label === "Bag") openCart();
  };

  const iconBtn = (
    label: (typeof ICON_ACTIONS)[number],
    Icon: typeof MapPin,
    mobile = false
  ) => {
    const badge =
      label === "Bag" && mounted && cartCount(cart) > 0
        ? cartCount(cart)
        : label === "Wishlist" && mounted && wishCount > 0
          ? wishCount
          : null;
    return (
      <button
        key={label}
        onClick={() => iconClick(label)}
        aria-label={`${label}${badge ? ` (${badge})` : ""}`}
        className={
          mobile
            ? "relative flex items-center gap-1.5 py-2 text-sm font-semibold"
            : "relative flex flex-col items-center gap-0.5 text-[#373A3C] hover:text-[#0275D8] transition-colors"
        }
      >
        <span className="relative">
          <Icon className={mobile ? "h-4 w-4" : "h-[18px] w-[18px]"} />
          {badge !== null && (
            <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 grid place-items-center rounded-full bg-[#E91E63] text-white text-[9px] font-bold">
              {badge > 9 ? "9+" : badge}
            </span>
          )}
        </span>
        {!mobile && <span className="text-[10px] font-semibold">{label}</span>}
      </button>
    );
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-[64px] flex items-center gap-4">
        {/* Logo */}
        <a
          href="#"
          aria-label="Clothido home"
          className="shrink-0"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
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
                aria-expanded={openMenu === item.label}
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
                          <button
                            key={c}
                            onClick={() => pickCategory(c)}
                            className="text-[12px] px-3 py-1.5 rounded-full bg-[#F5F5F5] hover:bg-[#0275D8] hover:text-white transition-all text-[#333] active:scale-95"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => pickCategory(item.label)}
                    className="col-span-2 w-full text-center text-[12px] font-bold text-[#0275D8] border-t pt-4 hover:underline"
                  >
                    Shop all {item.label.charAt(0) + item.label.slice(1).toLowerCase()} ❯
                  </button>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search */}
        <form
          className="hidden md:flex flex-1 max-w-[300px] ml-auto"
          onSubmit={(e) => {
            e.preventDefault();
            openSearch();
          }}
          role="search"
        >
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Search"
              onFocus={openSearch}
              onClick={openSearch}
              readOnly
              className="w-full h-10 pl-4 pr-10 rounded-md bg-[#F5F5F5] text-sm outline-none cursor-pointer focus:ring-2 focus:ring-[#0275D8]/40 transition-shadow"
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
          {iconBtn("Stores", MapPin)}
          {iconBtn("Profile", User)}
          {iconBtn("Wishlist", Heart)}
          {iconBtn("Bag", ShoppingBag)}
        </div>

        {/* Profile dropdown (logged in) */}
        {profileMenu && user && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setProfileMenu(false)}
              aria-hidden="true"
            />
            <div className="absolute right-4 top-[64px] z-50 w-56 bg-white rounded-lg shadow-[0_12px_30px_rgba(0,0,0,0.18)] border overflow-hidden">
              <div className="px-4 py-3 border-b bg-[#F7FAFD]">
                <p className="text-[13px] font-bold text-[#282C3F] truncate">{user.name}</p>
                <p className="text-[11px] text-[#888]">{user.phone}</p>
              </div>
              <button
                onClick={() => {
                  setProfileMenu(false);
                  openTrack();
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#373A3C] hover:bg-[#F5F5F5] transition-colors"
              >
                <Package className="h-4 w-4" /> Track Order
              </button>
              <button
                onClick={() => {
                  setProfileMenu(false);
                  setUser(null);
                  toast({ title: "Logged out", description: "See you soon!" });
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#E91E63] hover:bg-[#FFF5F8] transition-colors"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </>
        )}

        {/* Mobile toggle */}
        <button
          className="lg:hidden ml-auto h-10 w-10 grid place-items-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white px-4 py-4 space-y-3 max-h-[calc(100vh-64px)] overflow-y-auto">
          <button
            onClick={() => {
              setMobileOpen(false);
              openSearch();
            }}
            className="w-full flex items-center gap-2 h-10 px-4 rounded-md bg-[#F5F5F5] text-sm text-[#888]"
            aria-label="Search products"
          >
            <Search className="h-4 w-4" /> Search
          </button>
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
                        <button
                          key={c}
                          onClick={() => {
                            setMobileOpen(false);
                            pickCategory(c);
                          }}
                          className="text-[12px] px-3 py-1.5 rounded-full bg-[#F5F5F5] text-[#333] active:scale-95 transition-transform"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ))}
          <div className="flex items-center gap-5 pt-2 border-t">
            {iconBtn("Stores", MapPin, true)}
            {iconBtn("Profile", User, true)}
            {iconBtn("Wishlist", Heart, true)}
            {iconBtn("Bag", ShoppingBag, true)}
          </div>
        </div>
      )}
    </header>
  );
}
