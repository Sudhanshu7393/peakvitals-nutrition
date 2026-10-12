"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

export function FuelFaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { theme } = useTheme();

  const faqs = [
    {
      q: "Are Peakvitals Pre-Workout supplements 100% genuine?",
      a: "Yes, 100%. You are ordering directly from the official Peakvitals Nutrition brand store. Every tub features an official batch hologram, scratch-verification QR code, and FSSAI certification.",
    },
    {
      q: "Which flavours are currently available?",
      a: "Peakvitals Pre-Workout (250g / 35 Servings) is currently available in two flavours: Green Apple Flavour and Tangy Orange Flavour.",
    },
    {
      q: "Do you deliver all across India? How long does delivery take?",
      a: "Yes! We deliver Peakvitals Pre-Workout across all 28,000+ PIN codes in India. Local orders in Mughalsarai (PIN 232101), Ravi Nagar, and Chandauli arrive within same-day / 24 hours. All other Indian cities and states arrive within 2 to 4 days via Express Air Courier with tracking updates.",
    },
    {
      q: "What key ingredients are in Peakvitals Pre-Workout?",
      a: "Each 250g tub provides 35 clinical servings: 1.5g L-Citrulline Malate, 2.0g Arginine AAKG (for nitric oxide vascular pump), 195mg Natural Caffeine (for extreme mental focus), and 2.0g Beta-Alanine (for endurance).",
    },
    {
      q: "How does ordering and payment work?",
      a: "All orders are handled directly through our Official WhatsApp Desk (9118732066). Once you choose your flavour (Green Apple or Tangy Orange) and provide your delivery details, our team shares our official UPI QR code and dispatches your order immediately.",
    },
    {
      q: "How should I take Peakvitals for maximum results?",
      a: "Mix 1 rounded scoop (approx. 7g) with 200-250ml of chilled water 20-30 minutes before your workout. For beginners, start with half a scoop to assess caffeine tolerance.",
    },
  ];

  return (
    <section
      className={`py-8 sm:py-16 border-b font-sans transition-colors duration-300 ${
        theme === "dark" ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-100 border-zinc-200 text-zinc-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2
            className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}
          >
            FREQUENTLY ASKED{" "}
            <span className={theme === "dark" ? "text-[#A3E635] italic" : "text-emerald-600 italic"}>
              QUESTIONS
            </span>
          </h2>
          <p
            className={`text-xs sm:text-sm max-w-md mx-auto ${
              theme === "dark" ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Everything you need to know about Peakvitals Pre-Workout, delivery speed, and authenticity.
          </p>
        </div>

        {/* 2-Column Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-colors ${
                  theme === "dark" ? "border-zinc-800 bg-zinc-900/60" : "border-zinc-200 bg-white shadow-xs"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className={`w-full p-4 sm:p-5 flex items-center justify-between text-left font-black text-xs sm:text-sm transition-colors cursor-pointer gap-3 ${
                    theme === "dark"
                      ? "text-white hover:text-[#A3E635]"
                      : "text-zinc-900 hover:text-emerald-600"
                  }`}
                >
                  <span>{faq.q}</span>
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                      theme === "dark"
                        ? "bg-zinc-800 border-zinc-700 text-zinc-400"
                        : "bg-zinc-100 border-zinc-200 text-zinc-600"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-[#A3E635]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div
                    className={`px-4 sm:px-5 pb-5 text-xs leading-relaxed border-t pt-3 font-medium ${
                      theme === "dark"
                        ? "text-zinc-400 border-zinc-800 bg-zinc-900/90"
                        : "text-zinc-600 border-zinc-200 bg-zinc-50"
                    }`}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
