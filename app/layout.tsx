import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { BottomNav } from "@/components/BottomNav";
import { ScrollAnimationObserver } from "@/components/ScrollAnimationObserver";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EyeNova Qatar | Online Contact Lenses & Eyewear Store in Doha",
  description:
    "Qatar's #1 online store for colored contact lenses (Bella, Amara, Lensme, Diva), medical lenses (Acuvue, Alcon), titanium glasses, and solutions. Same-day delivery in Doha.",
  keywords: [
    "EyeNova",
    "EyeNova Qatar",
    "Contact Lenses Qatar",
    "Bella Lenses Doha",
    "Amara Lenses Qatar",
    "Lensme Lenses Qatar",
    "Acuvue Moist Qatar",
    "Glasses Doha",
  ],
  openGraph: {
    title: "EyeNova Qatar | Premium Contact Lenses & Optical Store",
    description: "Same-day delivery in Doha for Bella, Amara, Lensme, Acuvue & prescription frames.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${tajawal.variable}`}>
      <body className="font-sans bg-white text-[#121212] antialiased flex flex-col min-h-screen">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <ScrollAnimationObserver />
              <Navbar />
              <main className="flex-1 pb-16 lg:pb-0">{children}</main>
              <Footer />
              <CartDrawer />
              <AuthModal />
              <BottomNav />
              <Analytics />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
