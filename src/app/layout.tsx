import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://peakvitalsnutrition.in"),
  title: {
    default: "PEAKVITALS NUTRITION | Official Pre-Workout Store (Be The Boss Of Your Workout)",
    template: "%s | PEAKVITALS NUTRITION",
  },
  description:
    "Official Brand Store of Peakvitals Nutrition Pre-Workout (250g / 35 Servings). Formulated with 13 clinical active ingredients per 7g scoop — 2g Beta-Alanine, 2g Arginine AKG, 1.5g L-Citrulline Malate, 195mg Natural Caffeine & 200mg Theanine • 100% Vegetarian Dietary Supplement • All India Express Delivery.",
  keywords: [
    "Peakvitals",
    "Peakvitals Nutrition",
    "Peakvitals Pre-Workout",
    "Peakvitals Pvt Ltd",
    "Best Pre-Workout in India",
    "Be The Boss Of Your Workout",
    "1.5g Citrulline Pre-Workout",
    "2g Arginine AKG Pre-Workout",
    "195mg Caffeine Pre-Workout",
    "2g Beta-Alanine Pre-Workout",
    "Vegetarian Gym Supplement India",
  ],
  authors: [{ name: "Peakvitals Pvt. Ltd." }],
  creator: "Peakvitals Pvt. Ltd.",
  publisher: "Peakvitals Pvt. Ltd.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "PEAKVITALS NUTRITION",
    title: "PEAKVITALS NUTRITION | Official Pre-Workout Brand Store",
    description:
      "Be The Boss Of Your Workout • 13 Clinical Actives per 7g Scoop (2g Beta-Alanine, 2g Arginine AKG, 1.5g L-Citrulline, 195mg Caffeine) • Offer Price ₹1,199 • All India Express Delivery.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PEAKVITALS NUTRITION Official Pre-Workout Store",
        type: "image/jpeg",
      },
      {
        url: "/logo-square.jpg",
        width: 500,
        height: 500,
        alt: "PEAKVITALS NUTRITION Logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PEAKVITALS NUTRITION | Official Pre-Workout Brand Store",
    description:
      "Be The Boss Of Your Workout • 13 Clinical Actives per 7g Scoop • Offer Price ₹1,199 • All India Express Delivery.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-square.jpg",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://peakvitalsnutrition.in/#organization",
      name: "Peakvitals Pvt. Ltd.",
      alternateName: "Peakvitals Nutrition",
      url: "https://peakvitalsnutrition.in",
      logo: "https://peakvitalsnutrition.in/logo-square.jpg",
      email: "Peakvitalsnutrition@gmail.com",
      telephone: "+91-7651918284",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-7651918284",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "Product",
      "@id": "https://peakvitalsnutrition.in/#preworkout",
      name: "Peakvitals Nutrition Pre-Workout (250g - 35 Servings)",
      image: [
        "https://peakvitalsnutrition.in/images/peakvitals_trans/green_apple_v2.png",
        "https://peakvitalsnutrition.in/images/peakvitals_trans/tangy_orange_v2.png",
      ],
      description:
        "Peakvitals Nutrition Pre-Workout contains 13 essential active ingredients per 7g scoop (2g Beta-Alanine, 2g Arginine AKG, 1.5g L-Citrulline Malate, 195mg Natural Caffeine, 200mg Theanine, 200mg Tryptophan, 150mg N-Acetyl L-Tyrosine, 140mg Taurine, 110mg Betaine Anhydrous, 100mg Choline Bitartrate, 5mg Piperine, Vitamin B1 & B6) for explosive energy, max pump, and increased strength.",
      sku: "PVPW-02-26",
      brand: {
        "@type": "Brand",
        name: "Peakvitals Nutrition",
      },
      offers: {
        "@type": "Offer",
        url: "https://peakvitalsnutrition.in",
        priceCurrency: "INR",
        price: "1199",
        priceValidUntil: "2027-12-31",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Peakvitals Pvt. Ltd.",
        },
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth light`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  localStorage.removeItem('peakvitals_theme_v2');
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-zinc-900 selection:bg-lime-400 selection:text-black transition-colors duration-300">
        <ThemeProvider>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
