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
import { ClothidoLogo, ClothidoLogoWhite } from "./logo";
import { useToast } from "@/hooks/use-toast";

const FOOT_LINKS = [
  "About Clothido",
  "Terms & Conditions",
  "Privacy Policy",
  "Cancellation & Return Policy",
  "FAQs",
  "Contact Us",
  "Careers",
];

const PAYMENTS = ["bKash", "Nagad", "Rocket", "Visa", "Mastercard", "Upay"];

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

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
              <li key={l}>
                <a href="#" className="text-[13px] text-white/70 hover:text-white transition-colors">
                  {l}
                </a>
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
              className="h-11 px-5 rounded-md bg-[#0275D8] hover:bg-[#0264b8] text-white text-[13px] font-bold flex items-center gap-1.5 transition-colors"
            >
              Subscribe <Send className="h-3.5 w-3.5" />
            </button>
          </form>
          <p className="mt-6 text-[12px] text-white/50">
            Hotline: 16XXX &nbsp;·&nbsp; Open 9:00 – 22:00 (Fri 14:00 – 22:00)
          </p>
        </div>

        {/* Social + app */}
        <div>
          <p className="text-[15px] font-bold mb-3">Follow Clothido on social</p>
          <div className="flex gap-3">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Music2, label: "TikTok" },
              { icon: Facebook, label: "Facebook" },
              { icon: Twitter, label: "X (Twitter)" },
              { icon: Youtube, label: "YouTube" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-[#0275D8] transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            {["Play Store", "App Store"].map((s) => (
              <a
                key={s}
                href="#"
                className="bg-black/40 border border-white/15 rounded-md px-3 py-2 text-[10px] leading-tight hover:border-white/40"
              >
                <span className="block opacity-60">Get it on</span>
                <span className="font-bold">{s}</span>
              </a>
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
  return <ClothidoLogo />;
}
