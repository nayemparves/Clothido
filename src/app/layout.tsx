import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Clothido | Fashion & Comfort",
  description:
    "Clothido — premium everyday clothing designed for comfort and confidence. Shop t-shirts, polos, panjabi, kurtis, denim and more.",
  keywords: ["Clothido", "fashion", "clothing", "t-shirt", "polo", "e-commerce"],
  icons: {
    icon: "/images/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${assistant.variable} font-sans antialiased bg-white text-[#373A3C]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
