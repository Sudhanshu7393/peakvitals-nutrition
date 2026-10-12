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
  metadataBase: new URL("https://sk-nutrition-black.vercel.app"),
  title: "PEAKVITALS NUTRITION | Official Pre-Workout Brand Store",
  description:
    "Official Peakvitals Nutrition Pre-Workout Store. Available in Green Apple & Tangy Orange flavours. High-stimulant energy, explosive nitric oxide muscle pumps, All India Express Delivery & Direct WhatsApp Order.",
  keywords: [
    "Peakvitals",
    "Peakvitals Nutrition",
    "Peakvitals Pre-Workout",
    "Green Apple Pre-Workout",
    "Tangy Orange Pre-Workout",
    "High Stim Pre-Workout India",
    "Authentic Gym Supplements",
  ],
  authors: [{ name: "Peakvitals Nutrition", url: "https://sk-nutrition-black.vercel.app" }],
  creator: "Peakvitals Nutrition",
  publisher: "Peakvitals Nutrition",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sk-nutrition-black.vercel.app",
    siteName: "PEAKVITALS NUTRITION",
    title: "PEAKVITALS NUTRITION | Official Pre-Workout Brand Store",
    description:
      "100% Genuine Peakvitals Pre-Workout (Green Apple & Tangy Orange) • All India Express Delivery & Direct WhatsApp UPI QR Deal.",
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
      "100% Genuine Peakvitals Pre-Workout (Green Apple & Tangy Orange) • Direct WhatsApp Order & UPI QR Deal.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-square.jpg",
  },
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
                  localStorage.removeItem('sk_theme_v2');
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                } catch(e) {}
              })();
            `,
          }}
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
