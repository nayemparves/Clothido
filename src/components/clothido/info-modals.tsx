"use client";

import { useState } from "react";
import {
  CheckCircle2,
  MapPin,
  Package,
  Phone,
  Send,
  Truck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useHasMounted, useStore } from "@/lib/store";
import { ModalShell } from "./product-bits";

/* --------------------------------- AUTH --------------------------------- */
export function AuthModal() {
  const authOpen = useStore((s) => s.authOpen);
  if (!authOpen) return null;
  return <AuthContent />;
}

function AuthContent() {
  const closeAuth = useStore((s) => s.closeAuth);
  const setUser = useStore((s) => s.setUser);
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!/^01\d{9}$/.test(form.phone.trim()))
      errs.phone = "Enter a valid 11-digit mobile number (e.g. 01712345678).";
    if (form.password.length < 6) errs.password = "Password must be at least 6 characters.";
    if (mode === "register") {
      if (form.name.trim().length < 3) errs.name = "Please enter your full name.";
      if (form.confirm !== form.password) errs.confirm = "Passwords do not match.";
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setUser({
      name: mode === "register" ? form.name.trim() : `Customer ${form.phone.slice(-4)}`,
      phone: form.phone.trim(),
    });
    closeAuth();
    toast({
      title: mode === "register" ? "Account created!" : "Welcome back!",
      description: mode === "register"
        ? `Welcome to Clothido, ${form.name.trim().split(" ")[0]}.`
        : "You are now logged in.",
    });
  };

  const inputCls = (bad?: string) =>
    `w-full h-11 px-3.5 rounded-md border text-[13px] outline-none transition-colors ${
      bad ? "border-[#E91E63] bg-[#FFF5F8]" : "border-[#DDD] focus:border-[#0275D8]"
    }`;

  return (
    <ModalShell onClose={closeAuth} labelledBy="auth-title">
      <div className="px-7 py-7">
        <div className="flex gap-6 mb-6">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setErrors({});
              }}
              className={`text-[15px] font-extrabold pb-1.5 border-b-2 transition-colors ${
                mode === m
                  ? "border-[#0275D8] text-[#0275D8]"
                  : "border-transparent text-[#999] hover:text-[#373A3C]"
              }`}
            >
              {m === "login" ? "Login" : "Register"}
            </button>
          ))}
          <span id="auth-title" className="sr-only">
            Account {mode}
          </span>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {mode === "register" && (
            <div>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name"
                aria-label="Full name"
                className={inputCls(errors.name)}
              />
              {errors.name && <p className="text-[11px] text-[#E91E63] mt-1">{errors.name}</p>}
            </div>
          )}
          <div>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Mobile number (01XXXXXXXXX)"
              inputMode="numeric"
              aria-label="Mobile number"
              className={inputCls(errors.phone)}
            />
            {errors.phone && <p className="text-[11px] text-[#E91E63] mt-1">{errors.phone}</p>}
          </div>
          <div>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Password"
              aria-label="Password"
              className={inputCls(errors.password)}
            />
            {errors.password && (
              <p className="text-[11px] text-[#E91E63] mt-1">{errors.password}</p>
            )}
          </div>
          {mode === "register" && (
            <div>
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                placeholder="Confirm password"
                aria-label="Confirm password"
                className={inputCls(errors.confirm)}
              />
              {errors.confirm && (
                <p className="text-[11px] text-[#E91E63] mt-1">{errors.confirm}</p>
              )}
            </div>
          )}
          <button
            type="submit"
            className="w-full h-11 rounded-full bg-[#0275D8] text-white text-[13px] font-bold tracking-wide hover:bg-[#0264b8] transition-all active:scale-95"
          >
            {mode === "login" ? "LOGIN" : "CREATE ACCOUNT"}
          </button>
          <p className="text-[11px] text-[#999] text-center leading-5">
            By continuing you agree to Clothido's{" "}
            <span className="text-[#0275D8]">Terms of Use</span> and{" "}
            <span className="text-[#0275D8]">Privacy Policy</span>.
          </p>
        </form>
      </div>
    </ModalShell>
  );
}

/* ------------------------------- TRACK ORDER ------------------------------- */
const TRACK_STEPS = [
  { label: "Order placed", icon: CheckCircle2 },
  { label: "Packed at warehouse", icon: Package },
  { label: "Shipped — on the way", icon: Truck },
  { label: "Delivered", icon: MapPin },
];

export function TrackOrderModal() {
  const trackOpen = useStore((s) => s.trackOpen);
  if (!trackOpen) return null;
  return <TrackContent />;
}

function TrackContent() {
  const closeTrack = useStore((s) => s.closeTrack);
  const { toast } = useToast();
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const track = (e: React.FormEvent) => {
    e.preventDefault();
    const id = orderId.trim();
    if (id.length < 4) {
      toast({
        title: "Invalid order ID",
        description: "Order IDs look like CD-123456 (min 4 characters).",
      });
      return;
    }
    let hash = 0;
    for (const ch of id) hash = (hash * 31 + ch.charCodeAt(0)) % 997;
    setResult(hash % 4);
  };

  return (
    <ModalShell onClose={closeTrack} labelledBy="track-title">
      <div className="px-7 py-7">
        <h2 id="track-title" className="text-[17px] font-extrabold text-[#282C3F]">
          Track your order
        </h2>
        <p className="text-[12px] text-[#888] mt-1 mb-5">
          Enter the order ID from your confirmation (demo: try CD-123456).
        </p>
        <form onSubmit={track} className="flex gap-2">
          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="CD-123456"
            aria-label="Order ID"
            className="flex-1 h-11 px-3.5 rounded-md border border-[#DDD] text-[13px] outline-none focus:border-[#0275D8]"
          />
          <button
            type="submit"
            className="h-11 px-6 rounded-full bg-[#0275D8] text-white text-[13px] font-bold hover:bg-[#0264b8] transition-all active:scale-95"
          >
            TRACK
          </button>
        </form>

        {result !== null && (
          <div className="mt-6 border rounded-xl p-5 bg-[#FAFCFF]">
            <p className="text-[12px] font-bold text-[#373A3C] mb-4">
              Order {orderId.toUpperCase()} —{" "}
              <span className="text-[#0275D8]">{TRACK_STEPS[result].label}</span>
            </p>
            <ol className="space-y-4">
              {TRACK_STEPS.map((s, i) => {
                const Icon = s.icon;
                const done = i <= result;
                return (
                  <li key={s.label} className="flex items-center gap-3">
                    <span
                      className={`h-8 w-8 grid place-items-center rounded-full transition-colors ${
                        done ? "bg-[#0275D8] text-white" : "bg-[#EEE] text-[#AAA]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span
                      className={`text-[13px] ${
                        done ? "font-semibold text-[#282C3F]" : "text-[#AAA]"
                      }`}
                    >
                      {s.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </ModalShell>
  );
}

/* --------------------------------- STORES --------------------------------- */
const STORES = [
  { name: "Clothido Gulshan Flagship", area: "Gulshan Avenue, Dhaka 1212", hours: "10:00 – 22:00 daily" },
  { name: "Clothido Dhanmondi", area: "Road 27, Dhanmondi, Dhaka 1209", hours: "10:00 – 21:30 daily" },
  { name: "Clothido Chattogram", area: "GEC Circle, Khulshi, Chattogram", hours: "10:00 – 21:00 daily" },
  { name: "Clothido Sylhet", area: "Zindabazar Point, Sylhet", hours: "10:00 – 21:00 daily" },
];

export function StoresModal() {
  const storesOpen = useStore((s) => s.storesOpen);
  const closeStores = useStore((s) => s.closeStores);
  const { toast } = useToast();
  if (!storesOpen) return null;

  return (
    <ModalShell onClose={closeStores} labelledBy="stores-title">
      <div className="px-7 py-7">
        <h2 id="stores-title" className="text-[17px] font-extrabold text-[#282C3F] mb-1">
          Clothido Stores
        </h2>
        <p className="text-[12px] text-[#888] mb-5">
          Visit us in person — try before you buy.
        </p>
        <ul className="space-y-3">
          {STORES.map((s) => (
            <li
              key={s.name}
              className="border rounded-lg p-4 flex items-start gap-3 hover:border-[#0275D8] transition-colors"
            >
              <MapPin className="h-5 w-5 text-[#0275D8] shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-[#282C3F]">{s.name}</p>
                <p className="text-[12px] text-[#666]">{s.area}</p>
                <p className="text-[11px] text-[#999] mt-0.5">Open {s.hours}</p>
              </div>
              <button
                onClick={() =>
                  toast({
                    title: "Opening directions…",
                    description: `${s.name} — ${s.area}`,
                  })
                }
                className="text-[11px] font-bold text-[#0275D8] hover:underline whitespace-nowrap active:scale-95 transition-transform"
              >
                Directions
              </button>
            </li>
          ))}
        </ul>
        <p className="text-[11px] text-[#999] mt-5 flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5" /> Hotline 16XXX — 9:00 to 22:00 daily
        </p>
      </div>
    </ModalShell>
  );
}

/* -------------------------------- BULK QUOTE -------------------------------- */
export function BulkQuoteModal() {
  const bulkOpen = useStore((s) => s.bulkOpen);
  if (!bulkOpen) return null;
  return <BulkContent />;
}

function BulkContent() {
  const closeBulk = useStore((s) => s.closeBulk);
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", type: "T-shirts", qty: "100" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 3) errs.name = "Please enter your name.";
    if (!/^01\d{9}$/.test(form.phone.trim())) errs.phone = "Enter a valid mobile number.";
    if (!Number(form.qty) || Number(form.qty) < 10)
      errs.qty = "Bulk orders start from 10 pieces.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    closeBulk();
    toast({
      title: "Quote request received!",
      description: `Our bulk team will call ${form.phone} within 24 hours.`,
    });
    setForm({ name: "", phone: "", type: "T-shirts", qty: "100" });
  };

  const inputCls = (bad?: string) =>
    `w-full h-11 px-3.5 rounded-md border text-[13px] outline-none transition-colors ${
      bad ? "border-[#E91E63] bg-[#FFF5F8]" : "border-[#DDD] focus:border-[#0275D8]"
    }`;

  return (
    <ModalShell onClose={closeBulk} labelledBy="bulk-title">
      <div className="px-7 py-7">
        <h2 id="bulk-title" className="text-[17px] font-extrabold text-[#282C3F]">
          Bulk Order / Wholesale
        </h2>
        <p className="text-[12px] text-[#888] mt-1 mb-5">
          No minimum order quantity — get wholesale pricing for your brand, team or event.
        </p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name / company"
              aria-label="Your name or company"
              className={inputCls(errors.name)}
            />
            {errors.name && <p className="text-[11px] text-[#E91E63] mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Mobile number"
              inputMode="numeric"
              aria-label="Mobile number"
              className={inputCls(errors.phone)}
            />
            {errors.phone && <p className="text-[11px] text-[#E91E63] mt-1">{errors.phone}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                aria-label="Product type"
                className={inputCls()}
              >
                {["T-shirts", "Polos", "Hoodies", "Caps", "Event T-shirts", "Custom design"].map(
                  (t) => (
                    <option key={t}>{t}</option>
                  )
                )}
              </select>
            </div>
            <div>
              <input
                value={form.qty}
                onChange={(e) => setForm({ ...form, qty: e.target.value })}
                inputMode="numeric"
                aria-label="Quantity"
                placeholder="Quantity"
                className={inputCls(errors.qty)}
              />
              {errors.qty && <p className="text-[11px] text-[#E91E63] mt-1">{errors.qty}</p>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-11 rounded-full bg-[#0275D8] text-white text-[13px] font-bold tracking-wide hover:bg-[#0264b8] transition-all active:scale-95"
          >
            REQUEST QUOTE
          </button>
        </form>
      </div>
    </ModalShell>
  );
}

/* ------------------------------- AFFILIATE ------------------------------- */
export function AffiliateModal() {
  const affiliateOpen = useStore((s) => s.affiliateOpen);
  if (!affiliateOpen) return null;
  return <AffiliateContent />;
}

function AffiliateContent() {
  const closeAffiliate = useStore((s) => s.closeAffiliate);
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", social: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 3) errs.name = "Please enter your name.";
    if (!form.email.includes("@")) errs.email = "Enter a valid email address.";
    if (form.social.trim().length < 3) errs.social = "Add your social profile link.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    closeAffiliate();
    toast({
      title: "Welcome to ClothidoSquad!",
      description: "We'll review your application and email you within 3 days.",
    });
    setForm({ name: "", email: "", social: "" });
  };

  const inputCls = (bad?: string) =>
    `w-full h-11 px-3.5 rounded-md border text-[13px] outline-none transition-colors ${
      bad ? "border-[#E91E63] bg-[#FFF5F8]" : "border-[#DDD] focus:border-[#0275D8]"
    }`;

  return (
    <ModalShell onClose={closeAffiliate} labelledBy="aff-title">
      <div className="px-7 py-7">
        <h2 id="aff-title" className="text-[17px] font-extrabold text-[#282C3F]">
          Join ClothidoSquad
        </h2>
        <p className="text-[12px] text-[#888] mt-1 mb-5">
          Share styles you love, earn up to 10% commission on every order.
        </p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
              aria-label="Full name"
              className={inputCls(errors.name)}
            />
            {errors.name && <p className="text-[11px] text-[#E91E63] mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email address"
              aria-label="Email address"
              className={inputCls(errors.email)}
            />
            {errors.email && <p className="text-[11px] text-[#E91E63] mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
              value={form.social}
              onChange={(e) => setForm({ ...form, social: e.target.value })}
              placeholder="Social profile (YouTube / Instagram / TikTok)"
              aria-label="Social profile link"
              className={inputCls(errors.social)}
            />
            {errors.social && <p className="text-[11px] text-[#E91E63] mt-1">{errors.social}</p>}
          </div>
          <button
            type="submit"
            className="w-full h-11 rounded-full bg-gradient-to-r from-[#FFB800] to-[#FF5E00] text-white text-[13px] font-bold tracking-wide hover:opacity-90 transition-all active:scale-95"
          >
            BECOME AN AFFILIATE
          </button>
        </form>
      </div>
    </ModalShell>
  );
}

/* ------------------------------ INFO PAGES ------------------------------ */
const INFO_CONTENT: Record<
  string,
  { title: string; body: React.ReactNode }
> = {
  about: {
    title: "About Clothido",
    body: (
      <>
        <p>
          Clothido is a Bangladesh-based everyday-clothing brand built on one belief: great days
          start with what you wear. From premium polos and buttery-soft tees to panjabi, kurti,
          denim and kids' essentials, every piece is designed in-house and quality-checked before
          it reaches your wardrobe.
        </p>
        <p>
          We started with a simple question — why should comfortable, well-made basics cost a
          fortune? Today Clothido serves thousands of customers nationwide through this online
          store and four physical locations, with worldwide delivery for bulk and event orders.
        </p>
        <p>
          Beyond fabric, design and fit, we stand behind every order with a 7-day easy return
          policy, Cash on Delivery nationwide, and a support team that actually answers.
        </p>
      </>
    ),
  },
  terms: {
    title: "Terms & Conditions",
    body: (
      <>
        <p>
          By using this website you agree to these terms. All product prices are listed in
          Bangladeshi Taka (৳) and include VAT where applicable. Orders are confirmed by phone
          before dispatch; unverifiable orders may be cancelled.
        </p>
        <p>
          Product photography is for illustration — slight color variation may occur due to screen
          settings. Discounted prices apply while stock lasts. Abuse of promotional codes, fake
          orders or payment fraud may result in account suspension.
        </p>
      </>
    ),
  },
  privacy: {
    title: "Privacy Policy",
    body: (
      <>
        <p>
          We collect only the information needed to fulfil your order: name, phone number,
          delivery address and payment preference. Your data is stored securely and never sold to
          third parties.
        </p>
        <p>
          We may use your email or phone to send order updates and — with your consent — marketing
          offers. You can opt out anytime from the newsletter link or by contacting support.
        </p>
      </>
    ),
  },
  returns: {
    title: "Cancellation & Return Policy",
    body: (
      <>
        <p>
          Orders can be cancelled free of charge any time before dispatch — just call our hotline.
          Once delivered, you have 7 days to request a return or size exchange for unworn items
          with tags intact.
        </p>
        <p>
          Refunds are issued to your bKash / Nagad / bank account within 3–5 working days of the
          returned item passing our quality check. Delivery fees are non-refundable unless the
          return is due to our error.
        </p>
      </>
    ),
  },
  faq: {
    title: "Frequently Asked Questions",
    body: (
      <>
        <details className="group border-b pb-3">
          <summary className="text-[13px] font-bold cursor-pointer flex justify-between items-center">
            How long does delivery take?
            <span className="text-[#888] group-open:rotate-45 transition-transform">+</span>
          </summary>
          <p className="text-[12px] text-[#666] mt-2 leading-6">
            Inside Dhaka: 1–2 working days. Outside Dhaka: 2–4 working days. Bulk/event orders
            ship worldwide in 5–10 days.
          </p>
        </details>
        <details className="group border-b pb-3">
          <summary className="text-[13px] font-bold cursor-pointer flex justify-between items-center">
            What payment methods do you accept?
            <span className="text-[#888] group-open:rotate-45 transition-transform">+</span>
          </summary>
          <p className="text-[12px] text-[#666] mt-2 leading-6">
            bKash, Nagad, Rocket, Upay, Visa, Mastercard, and Cash on Delivery nationwide.
          </p>
        </details>
        <details className="group border-b pb-3">
          <summary className="text-[13px] font-bold cursor-pointer flex justify-between items-center">
            Can I exchange a size?
            <span className="text-[#888] group-open:rotate-45 transition-transform">+</span>
          </summary>
          <p className="text-[12px] text-[#666] mt-2 leading-6">
            Yes — within 7 days of delivery, free inside Dhaka for the first exchange. Items must
            be unworn with tags intact.
          </p>
        </details>
        <details className="group pb-1">
          <summary className="text-[13px] font-bold cursor-pointer flex justify-between items-center">
            Do you offer custom logo printing?
            <span className="text-[#888] group-open:rotate-45 transition-transform">+</span>
          </summary>
          <p className="text-[12px] text-[#666] mt-2 leading-6">
            Absolutely — event t-shirts and bulk branding are our specialty. Request a quote from
            the Bulk Order section.
          </p>
        </details>
      </>
    ),
  },
  careers: {
    title: "Careers at Clothido",
    body: (
      <>
        <p>
          We're a fast-growing team of designers, engineers and retail people. Current openings:
          <strong> Retail Store Manager (Dhaka)</strong>, <strong>Graphic Designer</strong>, and{" "}
          <strong>Customer Support Executive</strong>.
        </p>
        <p>
          Email your CV to careers@clothido.com or apply below — we reply to every application
          within a week.
        </p>
      </>
    ),
  },
};

export function InfoModal() {
  const infoKey = useStore((s) => s.infoKey);
  if (!infoKey || !INFO_CONTENT[infoKey]) return null;
  return <InfoContent infoKey={infoKey} />;
}

function InfoContent({ infoKey }: { infoKey: string }) {
  const closeInfo = useStore((s) => s.closeInfo);
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const { title, body } = INFO_CONTENT[infoKey];

  return (
    <ModalShell onClose={closeInfo} labelledBy="info-title">
      <div className="px-7 py-7">
        <h2 id="info-title" className="text-[17px] font-extrabold text-[#282C3F] mb-4">
          {title}
        </h2>
        <div className="space-y-3 text-[13px] text-[#555] leading-6 max-h-[55vh] overflow-y-auto pr-1">
          {body}
        </div>
        {infoKey === "careers" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@")) {
                toast({ title: "Please enter a valid email address." });
                return;
              }
              closeInfo();
              toast({
                title: "Application started!",
                description: "We've sent an application link to your email.",
              });
              setEmail("");
            }}
            className="mt-5 flex gap-2"
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email for the application link"
              aria-label="Email for application"
              className="flex-1 h-11 px-3.5 rounded-md border border-[#DDD] text-[13px] outline-none focus:border-[#0275D8]"
            />
            <button
              type="submit"
              className="h-11 px-5 rounded-full bg-[#0275D8] text-white text-[13px] font-bold hover:bg-[#0264b8] transition-all active:scale-95 flex items-center gap-1.5"
            >
              Apply <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        )}
        {infoKey === "about" && (
          <a
            href="#about"
            onClick={closeInfo}
            className="inline-block mt-5 text-[12px] font-bold text-[#0275D8] hover:underline"
          >
            Read our full brand story ❯
          </a>
        )}
      </div>
    </ModalShell>
  );
}

/* --------------------------- COMPOSITE MODAL HOST --------------------------- */
export function AllModals() {
  useHasMounted();
  return (
    <>
      <AuthModal />
      <TrackOrderModal />
      <StoresModal />
      <BulkQuoteModal />
      <AffiliateModal />
      <InfoModal />
    </>
  );
}
