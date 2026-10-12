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
  Eye,
  Award,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

export function FuelNutritionSection() {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const currentPhoto = PEAKVITALS_BOX_INFO.boxSidePhotos[activePhotoIdx];

  return (
    <section
      id="nutrition-facts"
      className="py-12 sm:py-20 bg-[#0A0B0E] text-white border-b border-zinc-800/80 font-sans relative overflow-hidden"
    >
      {/* Subtle Ambient Lime & Orange Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#A3E635]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#EA580C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-14">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[#A3E635] text-[10px] sm:text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Transparent Label • Zero Proprietary Blends</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tight leading-none">
            INSIDE EVERY <span className="text-[#A3E635]">7G SCOOP</span>{" "}
            <span className="text-[#EA580C]">FORMULA</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            {PEAKVITALS_BOX_INFO.boxDescription}
          </p>
        </div>

        {/* Main 2-Column Layout: Left = Exact Nutrition Facts Table, Right = Benefits + Suggested Use + Box Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN (5 Cols): Official Box Nutrition Facts Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white text-zinc-950 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-zinc-200">
              {/* Nutrition Facts Header */}
              <div className="border-b-4 border-zinc-950 pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 leading-none">
                    NUTRITION FACTS
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider">
                    100% Veg
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-zinc-800 mt-1.5">
                  Serving Size: <span className="font-black">7g</span>
                </p>
                <p className="text-xs sm:text-sm font-bold text-zinc-800">
                  Servings Per Container:{" "}
                  <span className="font-black">35 (Approx)</span>
                </p>
              </div>

              {/* Table Column Headers */}
              <div className="grid grid-cols-12 py-1.5 border-b-2 border-zinc-950 text-[11px] sm:text-xs font-black uppercase tracking-wider text-zinc-900">
                <div className="col-span-7">Nutrient / Active Ingredient</div>
                <div className="col-span-3 text-right">Per Serving</div>
                <div className="col-span-2 text-right">%RDA</div>
              </div>

              {/* 14 Nutrition Fact Rows */}
              <div className="divide-y divide-zinc-300 text-xs sm:text-[13px]">
                {PEAKVITALS_NUTRITION_FACTS.map((row, idx) => {
                  const isHighlight =
                    row.nutrient.includes("Beta-Alanine") ||
                    row.nutrient.includes("Citrulline") ||
                    row.nutrient.includes("Arginine") ||
                    row.nutrient.includes("Caffeine") ||
                    row.nutrient.includes("Theanine");
                  return (
                    <div
                      key={idx}
                      className={`grid grid-cols-12 py-1.5 items-center ${
                        isHighlight
                          ? "font-black text-zinc-950 bg-lime-50/70 -mx-2 px-2 rounded"
                          : "font-bold text-zinc-800"
                      }`}
                    >
                      <div className="col-span-7 truncate">{row.nutrient}</div>
                      <div className="col-span-3 text-right font-black text-zinc-950">
                        {row.amount}
                      </div>
                      <div className="col-span-2 text-right text-[11px] font-bold text-zinc-600">
                        {row.rda}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footnotes */}
              <div className="mt-3 pt-2.5 border-t-2 border-zinc-950 text-[10px] leading-snug font-semibold text-zinc-700 space-y-0.5">
                <p>
                  *% Recommended Dietary Allowance values are based on a 2,730
                  calorie diet.
                </p>
                <p>**Recommended Dietary Allowance not established.</p>
              </div>
            </div>

            {/* Complete Ingredients Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#A3E635]">
                INGREDIENTS (AS PRINTED ON BOX):
              </h4>
              <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed font-medium">
                {PEAKVITALS_BOX_INFO.ingredientsList}
              </p>
            </div>

            {/* Official Licensing, Batch & MRP Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Marketed By
                  </span>
                  <span className="text-xs sm:text-sm font-black text-white">
                    {PEAKVITALS_BOX_INFO.marketedBy}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    FSSAI Lic. No.
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-black text-[#A3E635]">
                    {PEAKVITALS_BOX_INFO.fssaiLicNo}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80 text-[11px]">
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase font-bold">
                    Batch No.
                  </span>
                  <span className="font-mono font-black text-white">
                    {PEAKVITALS_BOX_INFO.batchNo}
                  </span>
                </div>
                <div className="border-x border-zinc-800">
                  <span className="text-zinc-500 block text-[9px] uppercase font-bold">
                    MRP (Incl. Taxes)
                  </span>
                  <span className="font-black text-[#A3E635]">₹1,999/-</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase font-bold">
                    U.S.P. Rate
                  </span>
                  <span className="font-bold text-zinc-200">
                    {PEAKVITALS_BOX_INFO.usp}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  "ISO 9001 & GMP Certified",
                  "FDA Registered",
                  "Ingredients Imported From USA",
                  "Lab Tested",
                  "Best Before 18 Months",
                ].map((badge, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] font-bold text-zinc-300"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#A3E635] shrink-0" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (7 Cols): Key Benefits + 3-Step Suggested Use + 5-Side Real Box Gallery */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Key Benefits Panel from Box */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <h3 className="text-lg sm:text-xl font-black italic uppercase tracking-tight text-white">
                  KEY <span className="text-[#A3E635]">BENEFITS</span> ON THE
                  BODY
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-[#A3E635]/15 border border-[#A3E635]/40 text-[#A3E635] text-[10px] font-black uppercase">
                    ⚡ Explosive Energy
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#EA580C]/15 border border-[#EA580C]/40 text-[#EA580C] text-[10px] font-black uppercase">
                    💪 Max Pump
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] font-black uppercase">
                    🏋️ Increased Strength
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PEAKVITALS_BOX_INFO.keyBenefits.map((b, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-800/90 hover:border-[#A3E635]/60 transition space-y-1 ${
                      idx === 4 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-black text-white">
                        {b.ingredient}
                      </span>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-zinc-900 text-[#A3E635] border border-zinc-800 shrink-0">
                        {b.badge}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Suggested Use (3 Steps from Box: 1 Scoop 7g + 400ml Cold Water + 15-30m Pre) */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-zinc-800 pb-3">
                <h3 className="text-lg sm:text-xl font-black italic uppercase tracking-tight text-white">
                  SUGGESTED <span className="text-[#EA580C]">USE</span>{" "}
                  <span className="text-xs font-bold not-italic text-zinc-400">
                    (15–30 Mins Before Workout)
                  </span>
                </h3>
                <span className="text-[11px] font-bold text-[#A3E635]">
                  1 Scoop (7g) + 400ml Cold Water
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PEAKVITALS_BOX_INFO.suggestedUseSteps.map((st, i) => {
                  const icons = [Flame, Droplets, Timer];
                  const Icon = icons[i] || Flame;
                  return (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#EA580C]">
                          {st.step}
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#A3E635]">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black uppercase text-white">
                          {st.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Real Physical Box 360° Label Photos Verification Gallery */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#A3E635]" />
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-wide text-white">
                    INSPECT REAL BOX LABEL (ALL 5 SIDES)
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-zinc-400">
                  Click any side to verify physical tub details
                </span>
              </div>

              {/* Side Selector Pills */}
              <div className="flex flex-wrap gap-1.5">
                {PEAKVITALS_BOX_INFO.boxSidePhotos.map((photo, idx) => (
                  <button
                    key={photo.id}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition cursor-pointer border ${
                      activePhotoIdx === idx
                        ? "bg-[#A3E635] text-black border-[#A3E635] shadow-sm"
                        : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    {idx + 1}. {photo.label}
                  </button>
                ))}
              </div>

              {/* Active Real Box Photo Display */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800">
                <div className="sm:col-span-5 relative h-56 sm:h-60 rounded-xl overflow-hidden bg-black border border-zinc-800 flex items-center justify-center">
                  <img
                    src={currentPhoto.image}
                    alt={currentPhoto.label}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="sm:col-span-7 space-y-2.5">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#EA580C] text-[10px] font-black uppercase">
                    Side {activePhotoIdx + 1} of 5 • {currentPhoto.label}
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-white">
                    {currentPhoto.caption}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Official 360° studio 3D view of all 5 sides of the{" "}
                    <strong className="text-white">
                      Peakvitals Nutrition Pre-Workout (250g)
                    </strong>{" "}
                    jar — verify every active ingredient, FSSAI license number (
                    <span className="text-[#A3E635] font-mono">12723999000427</span>
                    ), and batch detail before ordering.
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-[11px] font-bold text-emerald-400">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>
                      What you see on the label is 100% what gets delivered.
                    </span>
                  </div>
                </div>
              </div>

              {/* Advisory Warning from Box */}
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-2.5 text-[10px] text-zinc-500 leading-relaxed">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-zinc-400 uppercase">
                    Box Advisory Warning:
                  </strong>{" "}
                  {PEAKVITALS_BOX_INFO.warningText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
