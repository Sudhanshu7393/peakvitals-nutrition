"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Leaf, FlaskConical, ShieldAlert, Award, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface FuelHeroProps {
  onShopNow: () => void;
}

export function FuelHero({ onShopNow }: FuelHeroProps) {
  const { storeConfig, storeProducts } = useCart();
  const mainProduct = storeProducts?.[0];
  const displayPrice = mainProduct?.price || storeConfig?.heroPriceDisplay || "₹1,199";
  const displayOriginalPrice = mainProduct?.originalPrice || "₹1,999";
  const displayDiscountBadge = mainProduct?.discountBadge || "40% OFF";

  return (
    <section className="relative overflow-hidden py-6 sm:py-12 lg:py-20 border-b border-zinc-800 bg-[#07080A] text-white font-sans">
      {/* Subtle gym background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-lime-500/15 via-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-900/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* 1. MOBILE HERO (< lg): DABBA IS FRONT & CENTER ON SCREEN 1 */}
        {/* ========================================================= */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-3">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider bg-[#EA580C]/15 border-[#EA580C]/40 text-[#FB923C]">
            <Zap className="w-3 h-3 text-[#FB923C]" />
            <span>Peakvitals Official Brand Store • Direct Supply</span>
          </div>

          {/* Compact Punchy Headline */}
          <div className="space-y-0.5 leading-none tracking-tight">
            <h1 className="text-2xl sm:text-3xl font-black italic uppercase text-white">
              DISCIPLINE. <span className="text-[#A3E635]">NUTRITION.</span>
            </h1>
            <h1 className="text-2xl sm:text-3xl font-black italic uppercase text-[#EA580C]">
              DOMINATION.
            </h1>
          </div>

          <p className="text-[11px] sm:text-xs font-medium max-w-xs leading-relaxed text-zinc-300">
            <strong className="text-[#A3E635]">Be The Boss Of Your Workout</strong> — Explosive energy, skin-splitting pumps &amp; zero crash.
          </p>

          {/* PRE-WORKOUT DABBA (PACKSHOT) - VISIBLE DIRECTLY ON FIRST SCREEN! */}
          <div className="relative w-full max-w-[270px] h-52 sm:h-64 my-1 flex items-center justify-center">
            {/* Soft Ambient Spotlight */}
            <div className="absolute inset-0 bg-radial from-[#A3E635]/20 via-[#EA580C]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Illuminated Floor Ring on Mobile */}
            <div className="absolute bottom-3 w-44 sm:w-56 h-4 border border-[#A3E635]/40 rounded-full shadow-[0_0_18px_rgba(163,230,53,0.45)] pointer-events-none" />
            <div className="absolute bottom-3 w-40 sm:w-52 h-3 bg-black/90 rounded-full blur-xs pointer-events-none" />

            {/* Packshot Image */}
            <Image
              src="/images/peakvitals_trans/green_apple_v2.png"
              alt="Peakvitals Pre-Workout"
              fill
              priority
              className="object-contain z-10 filter drop-shadow-[0_18px_22px_rgba(0,0,0,0.95)]"
            />

            {/* Official Flavours Badge */}
            <div className="absolute top-1 right-2 z-20 px-2.5 py-0.5 rounded-full bg-[#A3E635] text-black font-black text-[9px] uppercase tracking-wider shadow-md">
              35 Servings • 250g
            </div>
          </div>

          {/* Active Dosage Stats Pill */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-full border bg-zinc-900/95 border-zinc-700/90 text-zinc-200 shadow-md text-center text-[10px] font-bold">
            <span><strong className="text-[#A3E635]">1.5G</strong> Citrulline</span>
            <span className="text-zinc-500">•</span>
            <span><strong className="text-white">2.0G</strong> Arginine</span>
            <span className="text-zinc-500">•</span>
            <span><strong className="text-[#FB923C]">195MG</strong> Caffeine</span>
            <span className="text-zinc-500">•</span>
            <span><strong className="text-emerald-400">35</strong> Servings</span>
          </div>

          {/* Pricing & CTA Button (Inline Row - No Scroll Needed) */}
          <div className="w-full max-w-sm flex items-center gap-2.5 pt-1">
            <div className="flex-1 flex items-baseline justify-center gap-1.5 px-3 py-2.5 rounded-xl border bg-zinc-900/90 border-zinc-800 text-center flex-wrap">
              <span className="text-base font-black text-[#A3E635]">
                {displayPrice}
              </span>
              <span className="text-[11px] font-bold line-through text-zinc-500">
                {displayOriginalPrice}
              </span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {displayDiscountBadge}
              </span>
            </div>

            <button
              onClick={onShopNow}
              className="flex-1 py-3 px-4 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4 Micro Trust Badges */}
          <div className="grid grid-cols-2 gap-1.5 w-full max-w-sm pt-0.5">
            {[
              { icon: Leaf, label: "USA Imported Ingredients" },
              { icon: FlaskConical, label: "Lab Tested • 13 Actives" },
              { icon: ShieldAlert, label: "ISO 9001 & GMP Certified" },
              { icon: Award, label: "FSSAI: 12723999000427" },
            ].map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg border bg-zinc-900/70 border-zinc-800 text-zinc-300 text-[9px] font-bold uppercase truncate"
                >
                  <Icon className="w-3 h-3 text-[#A3E635] shrink-0" />
                  <span className="truncate">{b.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. DESKTOP HERO (lg:grid): SPACIOUS 2-COLUMN LUXURY HERO */}
        {/* ========================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Typography & Features */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            {/* 3-Tone Headline */}
            <div className="space-y-0 tracking-tighter">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black italic uppercase leading-[0.95] block text-white drop-shadow-sm">
                DISCIPLINE.
              </h1>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black italic uppercase leading-[0.95] block text-[#A3E635] drop-shadow-sm">
                NUTRITION.
              </h1>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black italic uppercase leading-[0.95] block text-[#EA580C] drop-shadow-sm">
                DOMINATION.
              </h1>
            </div>

            {/* Subtitle */}
            <div className="space-y-1">
              <p className="text-base lg:text-xl font-black uppercase tracking-wider text-zinc-100">
                PEAKVITALS PRE-WORKOUT • BE THE BOSS OF YOUR WORKOUT
              </p>
              <p className="text-sm font-medium max-w-lg leading-relaxed text-zinc-300">
                Formulated with 13 clinical active ingredients per 7g scoop — 1.5g L-Citrulline Malate, 2g Arginine AKG, 2g Beta-Alanine, 195mg Natural Caffeine &amp; 200mg Theanine for instant pump, explosive energy, and zero crash.
              </p>
            </div>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-4 gap-2 pt-0.5">
              {[
                { icon: Leaf, label: "USA Imported Actives" },
                { icon: FlaskConical, label: "Lab Tested • 13 Actives" },
                { icon: ShieldAlert, label: "ISO 9001 & GMP" },
                { icon: Award, label: "FSSAI Certified" },
              ].map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 p-2 rounded-xl border bg-zinc-900/80 border-zinc-800 text-zinc-200 transition"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#A3E635] shrink-0" />
                    <span className="text-[11px] font-black uppercase leading-tight truncate">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button & Pricing Pill */}
            <div className="flex flex-row items-center gap-4 pt-1">
              <button
                onClick={onShopNow}
                className="px-8 py-4 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white font-black text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-baseline gap-2.5 px-4 py-3 rounded-xl border bg-zinc-900 border-zinc-800 transition">
                <span className="text-xl font-black text-[#A3E635]">
                  {displayPrice}
                </span>
                <span className="text-xs font-bold line-through text-zinc-500">
                  {displayOriginalPrice}
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {displayDiscountBadge}
                </span>
                <span className="text-xs font-bold text-zinc-400">
                  • 250g Tub
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Packshot with 3D Glowing Pedestal */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md h-[460px] flex items-center justify-center">
              {/* 3D Glowing Ambient Halo */}
              <div className="absolute inset-0 bg-radial from-[#A3E635]/20 via-[#EA580C]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* 3D Illuminated Floating Floor Pedestal */}
              <div className="absolute bottom-6 w-80 h-16 bg-gradient-to-r from-[#A3E635]/25 via-[#EA580C]/35 to-[#A3E635]/25 rounded-full blur-xl pointer-events-none animate-pulse" />
              <div className="absolute bottom-10 w-72 h-7 border border-[#A3E635]/50 rounded-full shadow-[0_0_25px_#A3E635] pointer-events-none" />
              <div className="absolute bottom-12 w-56 h-3 rounded-full blur-xs pointer-events-none bg-black/90" />

              <Image
                src="/images/peakvitals_trans/green_apple_v2.png"
                alt="Peakvitals Pre-Workout"
                fill
                priority
                className="object-contain hover:scale-105 transition-transform duration-500 z-10 filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)]"
              />

              {/* Floating Active Dose Stats Pill */}
              <div className="absolute bottom-2 left-4 z-20 backdrop-blur-md border rounded-2xl p-3 shadow-2xl card-3d-glow whitespace-nowrap bg-zinc-950/95 border-zinc-700">
                <div className="flex items-center gap-3 text-center">
                  <div>
                    <span className="block text-sm font-black text-[#A3E635]">1.5G</span>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-400">
                      Citrulline
                    </span>
                  </div>
                  <div className="w-px h-6 bg-zinc-800" />
                  <div>
                    <span className="block text-sm font-black text-white">
                      2.0G
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-400">
                      Arginine
                    </span>
                  </div>
                  <div className="w-px h-6 bg-zinc-800" />
                  <div>
                    <span className="block text-sm font-black text-[#EA580C]">195MG</span>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-400">
                      Caffeine
                    </span>
                  </div>
                  <div className="w-px h-6 bg-zinc-800" />
                  <div>
                    <span className="block text-sm font-black text-emerald-400">35</span>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-400">
                      Servings
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Servings Badge */}
              <div className="absolute top-2 right-4 z-20 px-3 py-1 rounded-full bg-[#A3E635] text-black font-black text-[10px] uppercase tracking-wider shadow-lg">
                35 Servings • 250g
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
