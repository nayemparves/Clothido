import Image from "next/image";
import { partners } from "@/lib/clothido-data";

export function BulkOrder() {
  return (
    <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
      <div className="relative rounded-2xl overflow-hidden min-h-[220px]">
        <Image
          src="/images/bulk-order.png"
          alt="Bulk order plain apparel stacked on shelves"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative p-8 md:p-10 max-w-[560px] h-full flex flex-col justify-center min-h-[220px]">
          <h3 className="text-white text-2xl font-extrabold mb-2">Bulk Order / Wholesale</h3>
          <p className="text-white/85 text-[14px] leading-6 mb-4">
            We supply plain t-shirts and apparel for all your custom branding needs — quality
            basics at wholesale prices. With no minimum order quantity, anyone can enjoy bulk
            pricing without ordering in bulk.
          </p>
          <a
            href="#"
            className="inline-block w-fit bg-white text-[#282C3F] text-[12px] font-bold tracking-widest px-6 py-2.5 rounded-full hover:bg-[#0275D8] hover:text-white transition-colors"
          >
            GET A QUOTE
          </a>
        </div>
      </div>
    </section>
  );
}

export function Partners() {
  return (
    <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
      <div className="text-center mb-6">
        <h3 className="text-[22px] font-extrabold text-[#373A3C]">Work with us Today</h3>
        <p className="text-[14px] text-[#777] mt-1">
          We are the official merchandising partner of leading organizations
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {partners.map((p) => (
          <div
            key={p}
            className="h-[72px] rounded-lg border border-[#EEE] bg-white grid place-items-center hover:shadow-md transition-shadow"
          >
            <span className="text-[15px] font-extrabold tracking-tight text-[#9AA3AF]">
              {p}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AffiliateBanner() {
  return (
    <section className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
      <a
        href="#"
        className="relative block rounded-2xl overflow-hidden bg-gradient-to-r from-[#FFB800] via-[#FF8A00] to-[#FF5E00] p-8 md:p-10 text-center group"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, white 0 2px, transparent 2px), radial-gradient(circle at 70% 60%, white 0 3px, transparent 3px), radial-gradient(circle at 45% 80%, white 0 2px, transparent 2px)",
            backgroundSize: "120px 120px",
          }}
        />
        <div className="relative">
          <p className="text-[12px] font-bold tracking-[0.25em] text-white/90 uppercase">
            Earn Money
          </p>
          <h3 className="text-white text-3xl md:text-4xl font-extrabold my-1 drop-shadow-sm">
            JOIN CLOTHIDOSQUAD
          </h3>
          <p className="text-white/95 text-[14px]">
            An Affiliate Program by Clothido — share styles you love, earn on every order.
          </p>
          <span className="inline-block mt-4 bg-white text-[#E05A00] text-[12px] font-bold tracking-widest px-7 py-2.5 rounded-full group-hover:scale-105 transition-transform">
            BECOME AN AFFILIATE
          </span>
        </div>
      </a>
    </section>
  );
}
