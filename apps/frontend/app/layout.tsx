import type { Metadata } from "next";
import { Barlow_Condensed, Jost } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/sonner'

const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-sans" });
const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "CrumbHaus",
  description: "Order custom cakes online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", jost.variable, barlowCondensed.variable)}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
