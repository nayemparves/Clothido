"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cartCount, useHasMounted, useStore } from "@/lib/store";
import { formatBDT } from "@/lib/clothido-data";

const FREE_DELIVERY_FROM = 1500;
const DELIVERY_FEE = 80;

type Step = "cart" | "checkout" | "done";

export function CartDrawer() {
  const cartOpen = useStore((s) => s.cartOpen);
  const closeCart = useStore((s) => s.closeCart);
  const mounted = useHasMounted();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen, closeCart]);

  if (!mounted || !cartOpen) return null;
  return <CartContent />;
}

function CartContent() {
  const closeCart = useStore((s) => s.closeCart);
  const cart = useStore((s) => s.cart);
  const setQty = useStore((s) => s.setQty);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const clearCart = useStore((s) => s.clearCart);
  const openCategory = useStore((s) => s.openCategory);
  const { toast } = useToast();

  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: "bKash" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderId, setOrderId] = useState("");

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;
  const progress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_FROM) * 100));

  const placeOrder = () => {
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 3) errs.name = "Please enter your full name.";
    if (!/^01\d{9}$/.test(form.phone.trim()))
      errs.phone = "Enter a valid 11-digit mobile number (e.g. 01712345678).";
    if (form.address.trim().length < 10)
      errs.address = "Please enter a complete delivery address.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const id = `CD-${Date.now().toString().slice(-6)}`;
    setOrderId(id);
    setStep("done");
    clearCart();
    toast({ title: "Order placed successfully!", description: `Order ID: ${id}` });
  };

  const inputCls = (bad?: string) =>
    `w-full h-11 px-3.5 rounded-md border text-[13px] outline-none transition-colors ${
      bad
        ? "border-[#E91E63] bg-[#FFF5F8]"
        : "border-[#DDD] focus:border-[#0275D8]"
    }`;

  return (
    <div className="fixed inset-0 z-[88]" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="absolute inset-0 bg-black/50" onClick={closeCart} />
      <aside className="absolute right-0 top-0 bottom-0 w-full max-w-[440px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 h-16 border-b shrink-0">
          {step === "checkout" && (
            <button
              onClick={() => setStep("cart")}
              aria-label="Back to bag"
              className="h-8 w-8 grid place-items-center rounded-full hover:bg-[#F5F5F5] active:scale-90 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <h2 className="text-[15px] font-extrabold text-[#282C3F]">
            {step === "cart" && `Your Bag (${cartCount(cart)})`}
            {step === "checkout" && "Checkout"}
            {step === "done" && "Order Confirmed"}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close bag"
            className="ml-auto h-8 w-8 grid place-items-center rounded-full hover:bg-[#F5F5F5] active:scale-90 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* CART STEP */}
        {step === "cart" && (
          <>
            {cart.length === 0 ? (
              <div className="flex-1 grid place-items-center px-8 text-center">
                <div>
                  <div className="mx-auto h-16 w-16 rounded-full bg-[#F0F6FD] grid place-items-center mb-4">
                    <ShoppingBag className="h-7 w-7 text-[#0275D8]" />
                  </div>
                  <p className="text-[15px] font-bold text-[#282C3F]">Your bag is empty</p>
                  <p className="text-[13px] text-[#888] mt-1 mb-5">
                    Add something you love — new arrivals are waiting.
                  </p>
                  <button
                    onClick={() => {
                      closeCart();
                      openCategory({ categoryId: "new", title: "New Arrivals" });
                    }}
                    className="h-11 px-6 rounded-full bg-[#0275D8] text-white text-[13px] font-bold hover:bg-[#0264b8] transition-all active:scale-95"
                  >
                    BROWSE NEW ARRIVALS
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Free delivery progress */}
                <div className="px-5 py-3 bg-[#F0F6FD] border-b shrink-0">
                  <p className="text-[12px] font-semibold text-[#282C3F] flex items-center gap-1.5">
                    <Truck className="h-4 w-4 text-[#0275D8]" />
                    {delivery === 0
                      ? "You've unlocked FREE delivery!"
                      : `Add ${formatBDT(FREE_DELIVERY_FROM - subtotal)} more for FREE delivery`}
                  </p>
                  <div className="h-1.5 bg-white rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-[#0275D8] rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <ul className="flex-1 overflow-y-auto px-5 divide-y">
                  {cart.map((i) => (
                    <li key={i.key} className="py-4 flex gap-3">
                      <div className="relative h-20 w-16 rounded-md overflow-hidden bg-[#F5F5F5] shrink-0">
                        <Image src={i.image} alt={i.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#373A3C] line-clamp-2">
                          {i.name}
                        </p>
                        {i.size && (
                          <p className="text-[11px] text-[#888] mt-0.5">Size: {i.size}</p>
                        )}
                        <p className="text-[13px] font-bold text-[#282C3F] mt-1">
                          {formatBDT(i.price)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border rounded-md overflow-hidden">
                            <button
                              onClick={() => setQty(i.key, i.qty - 1)}
                              aria-label={`Decrease quantity of ${i.name}`}
                              className="h-7 w-7 grid place-items-center hover:bg-[#F5F5F5] active:scale-90 transition"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-[12px] font-bold">{i.qty}</span>
                            <button
                              onClick={() => setQty(i.key, i.qty + 1)}
                              aria-label={`Increase quantity of ${i.name}`}
                              className="h-7 w-7 grid place-items-center hover:bg-[#F5F5F5] active:scale-90 transition"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              removeFromCart(i.key);
                              toast({ title: "Removed from bag", description: i.name });
                            }}
                            aria-label={`Remove ${i.name} from bag`}
                            className="h-7 w-7 grid place-items-center rounded text-[#999] hover:text-[#E91E63] hover:bg-[#FFF5F8] active:scale-90 transition"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <span className="text-[13px] font-bold text-[#282C3F] whitespace-nowrap">
                        {formatBDT(i.price * i.qty)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="border-t px-5 py-4 space-y-3 shrink-0">
                  <div className="space-y-1.5 text-[13px]">
                    <p className="flex justify-between text-[#555]">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#282C3F]">{formatBDT(subtotal)}</span>
                    </p>
                    <p className="flex justify-between text-[#555]">
                      <span>Delivery</span>
                      <span className="font-semibold text-[#282C3F]">
                        {delivery === 0 ? "FREE" : formatBDT(delivery)}
                      </span>
                    </p>
                    <p className="flex justify-between text-[15px] font-extrabold text-[#282C3F] pt-1 border-t">
                      <span>Total</span>
                      <span>{formatBDT(total)}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setStep("checkout")}
                    className="w-full h-12 rounded-full bg-[#0275D8] text-white text-[13px] font-bold tracking-wide hover:bg-[#0264b8] transition-all active:scale-95"
                  >
                    PROCEED TO CHECKOUT ({formatBDT(total)})
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* CHECKOUT STEP */}
        {step === "checkout" && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <div>
                <label className="text-[12px] font-bold text-[#373A3C]" htmlFor="co-name">
                  Full name
                </label>
                <input
                  id="co-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rahim Ahmed"
                  className={`${inputCls(errors.name)} mt-1.5`}
                />
                {errors.name && <p className="text-[11px] text-[#E91E63] mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-[12px] font-bold text-[#373A3C]" htmlFor="co-phone">
                  Mobile number
                </label>
                <input
                  id="co-phone"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="01XXXXXXXXX"
                  className={`${inputCls(errors.phone)} mt-1.5`}
                />
                {errors.phone && <p className="text-[11px] text-[#E91E63] mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-[12px] font-bold text-[#373A3C]" htmlFor="co-address">
                  Delivery address
                </label>
                <textarea
                  id="co-address"
                  rows={3}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="House, road, area, city"
                  className={`${inputCls(errors.address)} mt-1.5 py-2.5 h-auto resize-none`}
                />
                {errors.address && (
                  <p className="text-[11px] text-[#E91E63] mt-1">{errors.address}</p>
                )}
              </div>
              <div>
                <p className="text-[12px] font-bold text-[#373A3C] mb-2">Payment method</p>
                <div className="grid grid-cols-3 gap-2">
                  {["bKash", "Nagad", "Cash on Delivery"].map((pm) => (
                    <button
                      key={pm}
                      onClick={() => setForm({ ...form, payment: pm })}
                      aria-pressed={form.payment === pm}
                      className={`h-10 rounded-md border text-[12px] font-bold transition-all active:scale-95 ${
                        form.payment === pm
                          ? "border-[#0275D8] bg-[#E8F4FD] text-[#0275D8]"
                          : "border-[#DDD] text-[#555] hover:border-[#0275D8]"
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-[#F7F7F7] rounded-lg p-4 space-y-1.5 text-[13px]">
                <p className="flex justify-between text-[#555]">
                  <span>{cartCount(cart)} item(s)</span>
                  <span>{formatBDT(subtotal)}</span>
                </p>
                <p className="flex justify-between text-[#555]">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? "FREE" : formatBDT(delivery)}</span>
                </p>
                <p className="flex justify-between font-extrabold text-[#282C3F] pt-1 border-t">
                  <span>To pay</span>
                  <span>{formatBDT(total)}</span>
                </p>
              </div>
            </div>
            <div className="border-t px-5 py-4 shrink-0">
              <button
                onClick={placeOrder}
                className="w-full h-12 rounded-full bg-[#0275D8] text-white text-[13px] font-bold tracking-wide hover:bg-[#0264b8] transition-all active:scale-95"
              >
                PLACE ORDER · {formatBDT(total)}
              </button>
            </div>
          </>
        )}

        {/* DONE STEP */}
        {step === "done" && (
          <div className="flex-1 grid place-items-center px-8 text-center">
            <div>
              <CheckCircle2 className="h-16 w-16 text-[#2E9E5B] mx-auto" strokeWidth={1.5} />
              <p className="text-[18px] font-extrabold text-[#282C3F] mt-4">
                Thank you, {form.name.split(" ")[0] || "friend"}!
              </p>
              <p className="text-[13px] text-[#666] mt-1 leading-6">
                Your order <span className="font-bold text-[#0275D8]">{orderId}</span> has been
                placed. Pay via <span className="font-semibold">{form.payment}</span> on delivery
                confirmation. Estimated delivery in 2–4 days.
              </p>
              <button
                onClick={closeCart}
                className="mt-6 h-11 px-8 rounded-full bg-[#0275D8] text-white text-[13px] font-bold tracking-wide hover:bg-[#0264b8] transition-all active:scale-95"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
