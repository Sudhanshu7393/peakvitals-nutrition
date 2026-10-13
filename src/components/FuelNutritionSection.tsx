"use client";

import React, { useState } from "react";
import {
  PEAKVITALS_NUTRITION_FACTS,
  PEAKVITALS_BOX_INFO,
} from "@/data/peakvitalsProducts";
import {
  ShieldCheck,
  Flame,
  Droplets,
  Timer,
  CheckCircle2,
  Sparkles,
  FileText,
  Layers,
} from "lucide-react";

type ActiveTab = "nutrition" | "benefits";

export function FuelNutritionSection() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("nutrition");

  return (
    <section
      id="nutrition-facts"
      className="py-12 sm:py-16 bg-[#0A0B0E] text-white border-b border-zinc-800/80 font-sans relative overflow-hidden"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/3 w-[420px] h-[420px] bg-[#A3E635]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Clean Minimal Heading + 3 Sleek Tabs */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[#A3E635] text-[10px] sm:text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Transparent Formula • FSSAI: 12723999000427</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tight leading-none">
            INSIDE EVERY <span className="text-[#A3E635]">7G SCOOP</span>
          </h2>

          {/* Segmented Tab Switcher (Keeps the page super clean & uncluttered) */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                activeTab === "nutrition"
                  ? "bg-[#A3E635] text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Nutrition Facts</span>
            </button>

            <button
              onClick={() => setActiveTab("benefits")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                activeTab === "benefits"
                  ? "bg-[#A3E635] text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>How To Use & Benefits</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CLEAN NUTRITION FACTS + QUICK HIGHLIGHTS */}
        {activeTab === "nutrition" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left (6 Cols): Crisp Nutrition Facts Card */}
            <div className="lg:col-span-6 bg-white text-zinc-950 rounded-2xl p-5 shadow-xl border-2 border-zinc-200">
              <div className="flex items-center justify-between border-b-2 border-zinc-950 pb-2.5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-none">
                    NUTRITION FACTS
                  </h3>
                  <p className="text-xs font-bold text-zinc-700 mt-1">
                    Serving Size: <strong className="text-black">7g</strong> •{" "}
                    Servings: <strong className="text-black">35 (250g)</strong>
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                  100% Veg
                </span>
              </div>

              <div className="grid grid-cols-12 py-1.5 border-b border-zinc-900 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-zinc-700">
                <div className="col-span-7">Active Ingredient</div>
                <div className="col-span-3 text-right">Per 7g</div>
                <div className="col-span-2 text-right">%RDA</div>
              </div>

              <div className="divide-y divide-zinc-200 text-xs">
                {PEAKVITALS_NUTRITION_FACTS.map((row, idx) => {
                  const isKey =
                    row.nutrient.includes("Beta-Alanine") ||
                    row.nutrient.includes("Citrulline") ||
                    row.nutrient.includes("Arginine") ||
                    row.nutrient.includes("Caffeine") ||
                    row.nutrient.includes("Theanine");
                  return (
                    <div
                      key={idx}
                      className={`grid grid-cols-12 py-1.5 items-center ${
                        isKey ? "font-black text-zinc-950" : "font-semibold text-zinc-700"
                      }`}
                    >
                      <div className="col-span-7 truncate">{row.nutrient}</div>
                      <div className="col-span-3 text-right font-black text-zinc-950">
                        {row.amount}
                      </div>
                      <div className="col-span-2 text-right text-[10px] text-zinc-500">
                        {row.rda}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right (6 Cols): Clean 4-Card Dosage Summary + Official Box Verification Strip */}
            <div className="lg:col-span-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    dose: "2.0g",
                    name: "Beta-Alanine",
                    sub: "Delays Muscle Fatigue",
                    accent: "text-[#A3E635]",
                  },
                  {
                    dose: "2.0g",
                    name: "Arginine AKG",
                    sub: "Nitric Oxide & Vascularity",
                    accent: "text-white",
                  },
                  {
                    dose: "1.5g",
                    name: "L-Citrulline Malate",
                    sub: "Intense Muscle Pumps",
                    accent: "text-[#A3E635]",
                  },
                  {
                    dose: "195mg",
                    name: "Natural Caffeine",
                    sub: "+ 200mg Theanine (Zero Crash)",
                    accent: "text-[#EA580C]",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1"
                  >
                    <span className={`text-2xl sm:text-3xl font-black block ${item.accent}`}>
                      {item.dose}
                    </span>
                    <span className="text-xs sm:text-sm font-black uppercase text-white block">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-zinc-400 block">{item.sub}</span>
                  </div>
                ))}
              </div>

              {/* Clean Compact Box Details Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-zinc-400 block">
                      Marketed By
                    </span>
                    <span className="text-xs sm:text-sm font-black text-white">
                      {PEAKVITALS_BOX_INFO.marketedBy}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-zinc-400 block">
                      FSSAI Lic. No.
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-black text-[#A3E635]">
                      {PEAKVITALS_BOX_INFO.fssaiLicNo}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800/80">
                    <span className="text-[9px] text-zinc-500 uppercase font-bold block">
                      Box MRP
                    </span>
                    <span className="font-bold line-through text-zinc-400 text-xs">₹1,999</span>
                    <span className="text-[8px] font-black uppercase text-emerald-400 block">40% OFF</span>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800/80">
                    <span className="text-[9px] text-zinc-500 uppercase font-bold block">
                      Offer Price
                    </span>
                    <span className="font-black text-[#A3E635] text-sm">₹1,199/-</span>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800/80">
                    <span className="text-[9px] text-zinc-500 uppercase font-bold block">
                      Batch / Use
                    </span>
                    <span className="font-mono font-bold text-white text-[11px]">{PEAKVITALS_BOX_INFO.batchNo}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {[
                    "USA Imported Ingredients",
                    "ISO 9001 & GMP",
                    "FDA Registered",
                    "Lab Tested",
                  ].map((b, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] font-bold text-zinc-300"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#A3E635]" />
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}


        {/* TAB 3: HOW TO USE (3 STEPS) & KEY BENEFITS */}
        {activeTab === "benefits" && (
          <div className="space-y-6">
            {/* 3-Step Suggested Use */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PEAKVITALS_BOX_INFO.suggestedUseSteps.map((st, i) => {
                const icons = [Flame, Droplets, Timer];
                const Icon = icons[i] || Flame;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-widest text-[#EA580C]">
                        {st.step}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#A3E635]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="text-sm font-black uppercase text-white">
                      {st.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{st.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Key Ingredient Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PEAKVITALS_BOX_INFO.keyBenefits.map((b, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1 ${
                    idx === 4 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-black text-white">
                      {b.ingredient}
                    </span>
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-zinc-950 text-[#A3E635] border border-zinc-800">
                      {b.badge}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
