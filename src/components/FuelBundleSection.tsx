"use client";

import React from "react";
import Image from "next/image";
import { Check, Truck, ShieldCheck, Gift, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { PEAKVITALS_PREWORKOUTS, peakvitalsToProduct } from "@/data/peakvitalsProducts";

export function FuelBundleSection() {
  const { addToCart } = useCart();
  const { theme } = useTheme();

  const handleOrderBundle = () => {
    const twinPack = PEAKVITALS_PREWORKOUTS.find((p) => p.id === "peakvitals-twin-pack") || PEAKVITALS_PREWORKOUTS[2];
    const fullProd = peakvitalsToProduct(twinPack);
    addToCart(fullProd, twinPack.flavor, twinPack.weight, twinPack.numericPrice, 1);
  };

  return (
    <section
      className={`py-8 sm:py-16 border-b font-sans transition-colors duration-300 ${
        theme === "dark" ? "bg-black border-zinc-900 text-white" : "bg-zinc-100 border-zinc-200 text-zinc-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center rounded-2xl sm:rounded-3xl p-4 sm:p-10 border shadow-xl sm:shadow-2xl relative overflow-hidden transition-colors ${
            theme === "dark" ? "bg-zinc-950 border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"
          }`}
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#EA580C]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left: Twin Pack Visual with 3D Shining Pedestal */}
          <div
            className={`lg:col-span-5 relative flex items-center justify-center p-[1.5px] rounded-2xl sm:rounded-3xl card-3d-glow ${
              theme === "dark"
                ? "bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900"
                : "bg-gradient-to-br from-zinc-300 via-zinc-200 to-zinc-400 shadow-md"
            }`}
          >
            <div
              className={`w-full rounded-[14px] sm:rounded-[22px] p-3 sm:p-4 relative overflow-hidden flex items-center justify-center min-h-[220px] sm:min-h-[300px] ${
                theme === "dark"
                  ? "bg-gradient-to-b from-zinc-900 via-zinc-950 to-black"
                  : "bg-gradient-to-b from-zinc-100 via-zinc-50 to-zinc-200/50"
              }`}
            >
              {/* 3D Radial Glow */}
              <div className="absolute inset-0 bg-radial from-[#EA580C]/25 via-[#A3E635]/15 to-transparent pointer-events-none" />
              {/* Natural Floor Shadow */}
              <div className="absolute bottom-3 sm:bottom-4 w-4/5 h-3 sm:h-4 bg-black/25 dark:bg-black/80 rounded-full blur-md pointer-events-none" />

              <div className="relative w-full h-48 sm:h-72">
                <Image
                  src="/images/peakvitals_trans/twin_pack.png"
                  alt="Peakvitals Twin Pack Value Bundle"
                  fill
                  className={`object-contain hover:scale-105 transition-transform duration-300 ${
                    theme === "dark"
                      ? "filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.95)]"
                      : "filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.25)]"
                  }`}
                />
              </div>

              <div className="absolute top-3 left-3 bg-[#EA580C] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-orange-950/40">
                🎁 FREE SHAKER INCLUDED
              </div>
            </div>
          </div>

          {/* Center: Bundle Copy & Badges */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#EA580C]">
                MAXIMUM VALUE COMBO
              </span>
              <h2
                className={`text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1 ${
                  theme === "dark" ? "text-white" : "text-zinc-900"
                }`}
              >
                TWIN PACK{" "}
                <span className={theme === "dark" ? "text-[#A3E635] italic" : "text-emerald-600 italic"}>
                  STACK &amp; SAVE
                </span>
              </h2>
              <p
                className={`text-xs sm:text-sm mt-1.5 leading-relaxed font-medium ${
                  theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Get 2x 250g Peakvitals Pre-Workout tubs (Green Apple + Tangy Orange, 70 heavy workout servings) plus an authentic heavy-duty Peakvitals Shaker bottle free!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div
                className={`p-3 rounded-xl border flex items-center gap-2 ${
                  theme === "dark" ? "bg-zinc-900 border-zinc-800 text-zinc-200" : "bg-zinc-50 border-zinc-200 text-zinc-800"
                }`}
              >
                <Gift className="w-4 h-4 text-[#EA580C] shrink-0" />
                <span className="text-[11px] font-bold">
                  Save ₹1,600 on MRP
                </span>
              </div>
              <div
                className={`p-3 rounded-xl border flex items-center gap-2 ${
                  theme === "dark" ? "bg-zinc-900 border-zinc-800 text-zinc-200" : "bg-zinc-50 border-zinc-200 text-zinc-800"
                }`}
              >
                <Truck className="w-4 h-4 text-[#A3E635] shrink-0" />
                <span className="text-[11px] font-bold">
                  All India Express Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right: Checklist & Neon CTA */}
          <div
            className={`lg:col-span-3 space-y-4 border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6 ${
              theme === "dark" ? "border-zinc-800" : "border-zinc-200"
            }`}
          >
            <ul
              className={`space-y-2 text-xs font-bold ${
                theme === "dark" ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#A3E635] shrink-0 stroke-[3]" />
                <span>Save up to 40% on Bundle</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#A3E635] shrink-0 stroke-[3]" />
                <span>Free Pro Peakvitals Gym Shaker</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#A3E635] shrink-0 stroke-[3]" />
                <span>Green Apple + Tangy Orange</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#A3E635] shrink-0 stroke-[3]" />
                <span>Direct WhatsApp Order &amp; QR Deal</span>
              </li>
            </ul>

            <div className="pt-2">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-black text-[#A3E635]">₹2,399</span>
                <span className="text-xs text-zinc-500 line-through">MRP ₹3,999</span>
              </div>

              <button
                onClick={handleOrderBundle}
                className="w-full py-3.5 px-4 rounded-xl bg-[#A3E635] hover:bg-[#86efac] text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#A3E635]/20 hover:shadow-[#A3E635]/40 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ORDER TWIN BUNDLE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
