import Image from "next/image";
import { newArrivalCards } from "@/lib/clothido-data";

export function NewArrival() {
  return (
    <section id="new-arrival" className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6">
      <h2 className="text-center text-[22px] font-extrabold tracking-wide text-[#373A3C] mb-1">
        NEW ARRIVAL
      </h2>
      <div className="w-10 h-[3px] bg-[#0275D8] mx-auto mb-6 rounded-full" />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {newArrivalCards.map((card, i) => (
          <a
            key={`${card.name}-${i}`}
            href="#"
            className="group flex flex-col items-center rounded-lg overflow-hidden bg-[#F7F7F7] hover:shadow-md transition-shadow"
          >
            <div className="relative w-full aspect-square bg-white">
              <Image
                src={card.image}
                alt={card.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width:640px) 33vw, (max-width:1024px) 17vw, 12vw"
              />
            </div>
            <span className="text-[11px] md:text-[12px] font-semibold text-center text-[#373A3C] px-1 py-2 leading-tight group-hover:text-[#0275D8]">
              {card.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
