import { Header } from "@/components/clothido/header";
import { Hero } from "@/components/clothido/hero";
import { NewArrival } from "@/components/clothido/new-arrival";
import { AboutBrand, MediumTiles } from "@/components/clothido/about";
import { CategoryCarousel } from "@/components/clothido/category-carousel";
import { SocksSpotlight } from "@/components/clothido/socks-spotlight";
import { BulkOrder, Partners, AffiliateBanner } from "@/components/clothido/promos";
import { Footer } from "@/components/clothido/footer";
import { categorySections } from "@/lib/clothido-data";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-[64px] lg:pt-[64px]">
        <Hero />
        <NewArrival />
        <MediumTiles />

        {/* Brand story */}
        <AboutBrand />

        {/* Category product carousels */}
        {categorySections
          .slice(0, 2)
          .map((s) => <CategoryCarousel key={s.id} section={s} />)}

        <SocksSpotlight />

        {categorySections
          .slice(2, 6)
          .map((s) => <CategoryCarousel key={s.id} section={s} />)}

        <BulkOrder />

        {categorySections
          .slice(6)
          .map((s) => <CategoryCarousel key={s.id} section={s} />)}

        <Partners />
        <AffiliateBanner />
      </main>
      <Footer />
    </div>
  );
}
