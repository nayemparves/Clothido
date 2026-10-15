"use client";

import { useState } from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Music2,
  Send,
} from "lucide-react";
import { ClothidoLogoWhite } from "./logo";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/lib/store";

const FOOT_LINKS: { label: string; key: string }[] = [
  { label: "About Clothido", key: "about" },
  { label: "Terms & Conditions", key: "terms" },
  { label: "Privacy Policy", key: "privacy" },
  { label: "Cancellation & Return Policy", key: "returns" },
  { label: "FAQs", key: "faq" },
  { label: "Contact Us", key: "faq" },
  { label: "Careers", key: "careers" },
];

const PAYMENTS = ["bKash", "Nagad", "Rocket", "Visa", "Mastercard", "Upay"];

const SOCIALS = [
  { icon: Instagram, label: "Instagram", url: "https://instagram.com" },
  { icon: Music2, label: "TikTok", url: "https://tiktok.com" },
  { icon: Facebook, label: "Facebook", url: "https://facebook.com" },
  { icon: Twitter, label: "X (Twitter)", url: "https://x.com" },
  { icon: Youtube, label: "YouTube", url: "https://youtube.com" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const openInfo = useStore((s) => s.openInfo);
  const openTrack = useStore((s) => s.openTrack);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({ title: "Please enter a valid email address." });
      return;
    }
    toast({
      title: "Subscribed!",
      description: "You'll now receive offers, discounts and more from Clothido.",
    });
    setEmail("");
  };

  return (
    <footer className="mt-auto bg-[#282C3F] text-white">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Brand + links */}
        <div>
          <ClothidoLogoWhite className="h-8" />
          <ul className="mt-5 space-y-2.5">
            {FOOT_LINKS.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => openInfo(l.key)}
                  className="text-[13px] text-white/70 hover:text-white transition-colors text-left"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className="text-[15px] font-bold mb-2">Join the Clothido newsletter</p>
          <p className="text-[13px] text-white/60 leading-6 mb-4">
            Stay updated on our latest arrivals, exclusive promotions and events.
          </p>
          <form onSubmit={subscribe} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email to get offers, discounts and more."
              aria-label="Email address"
              className="flex-1 h-11 px-4 rounded-md bg-white/10 border border-white/15 text-[13px] placeholder:text-white/40 outline-none focus:border-[#7BD3EA]"
            />
            <button
              type="submit"
              className="h-11 px-5 rounded-md bg-[#0275D8] hover:bg-[#0264b8] text-white text-[13px] font-bold flex items-center gap-1.5 transition-all active:scale-95"
            >
              Subscribe <Send className="h-3.5 w-3.5" />
            </button>
          </form>
          <p className="mt-6 text-[12px] text-white/50">
            Hotline:{" "}
            <button
              onClick={openTrack}
              className="underline hover:text-white transition-colors"
            >
              Track your order
            </button>{" "}
            &nbsp;·&nbsp; Open 9:00 – 22:00 (Fri 14:00 – 22:00)
          </p>
        </div>

        {/* Social + app */}
        <div>
          <p className="text-[15px] font-bold mb-3">Follow Clothido on social</p>
          <div className="flex gap-3">
            {SOCIALS.map(({ icon: Icon, label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-[#0275D8] transition-all hover:scale-105 active:scale-95"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            {["Play Store", "App Store"].map((s) => (
              <button
                key={s}
                onClick={() =>
                  toast({
                    title: "Clothido app is coming soon 📱",
                    description: "All app perks will apply to early sign-ups.",
                  })
                }
                className="bg-black/40 border border-white/15 rounded-md px-3 py-2 text-[10px] leading-tight hover:border-white/40 transition-colors active:scale-95"
              >
                <span className="block opacity-60">Get it on</span>
                <span className="font-bold">{s}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Payment strip */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-white/50 mr-1">We accept</span>
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="text-[10px] font-bold bg-white text-[#282C3F] rounded px-2 py-1"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="text-[12px] text-white/50">
            © {new Date().getFullYear()} Clothido. All rights reserved. Made with ❤️ in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}

export function FooterLogo() {
  return <ClothidoLogoWhite />;
}
