"use client";

import React from "react";
import { Zap, Dumbbell, Clock, ShieldCheck, ArrowRight } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

export function FuelWhySection() {
  const { theme } = useTheme();

  const pillars = [
    {
      icon: Zap,
      title: "EXPLOSIVE ENERGY & FOCUS",
      desc: "195mg Natural Caffeine + 200mg Theanine + 150mg N-Acetyl L-Tyrosine + 100mg Choline for laser focus & zero crash.",
    },
    {
      icon: Dumbbell,
      title: "UNREAL MUSCLE PUMP",
      desc: "1.5g L-Citrulline Malate + 2g Arginine AKG + 110mg Betaine Anhydrous for maximum blood flow, strength & vascularity.",
    },
    {
      icon: Clock,
      title: "PEAK ENDURANCE (TTE)",
      desc: "2g Beta-Alanine + 140mg Taurine + Vitamins B1 & B6 to increase Time To Exhaustion (TTE) and athletic output.",
    },
    {
      icon: ShieldCheck,
      title: "USA IMPORTED & CERTIFIED",
      desc: "Marketed by Peakvitals Pvt. Ltd. • FSSAI Lic. No. 12723999000427 • ISO 9001, GMP & FDA Registered facility.",
    },
  ];

  return (
    <section
      className={`py-8 sm:py-16 border-b font-sans transition-colors duration-300 ${
        theme === "dark" ? "bg-black text-white border-zinc-900" : "bg-white text-zinc-900 border-zinc-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          {/* Left Description Column */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-5">
            <h2
              className={`text-2xl sm:text-4xl font-black italic uppercase tracking-tight leading-none ${
                theme === "dark" ? "text-white" : "text-zinc-900"
              }`}
            >
              WHY <br className="hidden sm:inline" />
              <span className={theme === "dark" ? "text-[#A3E635]" : "text-emerald-600"}>PEAKVITALS?</span>
            </h2>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                theme === "dark" ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              We don&apos;t just sell supplements. We fuel the driven. Every scoop of Peakvitals Pre-Workout delivers uncompromised active grams for pure gym dominance.
            </p>
            <a
              href="#featured-products"
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all ${
                theme === "dark"
                  ? "border-zinc-700 hover:border-[#A3E635] text-zinc-200 hover:text-[#A3E635]"
                  : "border-zinc-300 hover:border-emerald-600 text-zinc-700 hover:text-emerald-700 shadow-xs"
              }`}
            >
              <span>SHOP PRE-WORKOUT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Right 4 Pillars Grid - 2 cols on mobile for clean balance */}
          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className={`p-3 sm:p-5 rounded-xl sm:rounded-2xl border transition-all space-y-2 sm:space-y-3 flex flex-col justify-between ${
                    theme === "dark"
                      ? "bg-zinc-950 border-zinc-800/90 hover:border-zinc-700"
                      : "bg-zinc-50 border-zinc-200 hover:border-zinc-300 shadow-xs"
                  }`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border flex items-center justify-center shrink-0 ${
                      theme === "dark"
                        ? "bg-zinc-900 border-zinc-800 text-[#A3E635]"
                        : "bg-white border-zinc-200 text-emerald-600 shadow-xs"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3
                      className={`font-black text-[11px] sm:text-sm uppercase tracking-tight ${
                        theme === "dark" ? "text-white" : "text-zinc-900"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p
                      className={`text-[10px] sm:text-[11px] mt-0.5 sm:mt-1 leading-snug line-clamp-3 sm:line-clamp-none ${
                        theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
