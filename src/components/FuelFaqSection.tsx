"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

export function FuelFaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { theme } = useTheme();

  const faqs = [
    {
      q: "Are Peakvitals Pre-Workout supplements 100% genuine & certified?",
      a: "Yes, 100%. Peakvitals Pre-Workout is marketed by Peakvitals Pvt. Ltd. (FSSAI Lic. No.: 12723999000427) and manufactured in an ISO 9001, GMP Certified & FDA Registered facility using Lab-Tested Ingredients Imported from the USA (Current Batch: PVPW/02/26).",
    },
    {
      q: "What are the complete 13 active ingredients per 7g serving?",
      a: "Each 7g scoop (8 Kcal) delivers 13 active ingredients: Beta-Alanine (2g), Arginine AKG (2g), L-Citrulline Malate (1.5g), Tryptophan (200mg), Theanine (200mg), Natural Caffeine (195mg), N-Acetyl L-Tyrosine (150mg), Taurine (140mg), Betaine Anhydrous (110mg), Choline Bitartrate (100mg), Piperine (5mg), Vitamin B6 (1500 mcg - 75% RDA), and Vitamin B1 (1050 mcg - 61.76% RDA).",
    },
    {
      q: "How should I take Peakvitals Pre-Workout for maximum results?",
      a: "As printed on the box under Suggested Use: Take 1 scoop (7g approx) of Peakvitals Pre-Workout with 400ml of cold water, shake or blend until completely mixed, and drink 15–30 minutes before your workout.",
    },
    {
      q: "Which flavours are available and what is the official box MRP?",
      a: "Peakvitals Pre-Workout (Net Weight: 250g / 35 Servings) is available in two refreshing 100% Vegetarian flavours: Green Apple Flavour and Tangy Orange Flavour. The official box MRP is ₹1,999/-, currently available at a Special Direct Brand Offer Price of ₹1,199/- (40% OFF, Incl. of all taxes) with an 18-month shelf life from manufacture.",
    },
    {
      q: "Do you deliver all across India? How long does delivery take?",
      a: "Yes! We deliver Peakvitals Pre-Workout across all 28,000+ PIN codes in India. All orders are dispatched via Express Air Courier with live tracking updates and arrive within 2 to 4 business days.",
    },
    {
      q: "How does ordering and payment work?",
      a: "All orders are handled directly through our Official WhatsApp Desk (7651918284) or via email at Peakvitalsnutrition@gmail.com. Once you choose your flavour (Green Apple or Tangy Orange) and provide your delivery details, our team shares our official UPI QR code and dispatches your order immediately.",
    },
  ];

  return (
    <section
      id="faq-section"
      className={`py-8 sm:py-16 border-b font-sans scroll-mt-24 transition-colors duration-300 ${
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
