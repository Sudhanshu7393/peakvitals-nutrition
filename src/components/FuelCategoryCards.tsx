"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

export function FuelCategoryCards() {
  const { setSelectedCategoryTab, setSearchQuery } = useCart();
  const { theme } = useTheme();

  const cards = [
    {
      id: "green-apple",
      search: "green apple",
      title: "GREEN APPLE",
      desc: "Original. High Stim. Focus.",
      img: "/images/peakvitals_trans/green_apple.png",
      tag: "FLAGSHIP",
    },
    {
      id: "orange",
      search: "orange",
      title: "TANGY ORANGE",
      desc: "Citrus Rush. 2g Beta-Alanine.",
      img: "/images/peakvitals_trans/tangy_orange.png",
      tag: "BESTSELLER",
    },
    {
      id: "combo",
      search: "twin pack",
      title: "TWIN PACK COMBO",
      desc: "Green Apple + Orange + Shaker.",
      img: "/images/peakvitals_trans/twin_pack.png",
      tag: "SAVE 40%",
    },
    {
      id: "combo",
      search: "triple",
      title: "TRIPLE POWER STACK",
      desc: "3 Tubs (105 Servings) Pack.",
      img: "/images/peakvitals_trans/triple_stack.png",
      tag: "MAX VALUE",
    },
  ];

  const handleCardClick = (c: typeof cards[0]) => {
    setSelectedCategoryTab(c.id);
    setSearchQuery(c.search);
    const el = document.getElementById("featured-products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={`py-8 sm:py-10 border-b font-sans relative overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-zinc-950 border-zinc-800 text-white" : "bg-zinc-100 border-zinc-200 text-zinc-900"
      }`}
    >
      {/* Background radial glow */}
      <div
        className={`absolute top-0 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          theme === "dark" ? "bg-[#A3E635]/5" : "bg-lime-500/10"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {cards.map((c, i) => (
            <div
              key={i}
              onClick={() => handleCardClick(c)}
              className={`p-[1.5px] rounded-2xl sm:rounded-3xl card-3d-glow transition-all duration-300 cursor-pointer group shadow-sm hover:-translate-y-1 flex flex-col ${
                theme === "dark"
                  ? "bg-gradient-to-br from-zinc-700/80 via-zinc-800 to-zinc-900 hover:from-[#A3E635] hover:to-[#EA580C]"
                  : "bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 hover:from-[#A3E635] hover:to-[#EA580C] shadow-zinc-200/80"
              }`}
            >
              <div
                className={`h-full p-2.5 sm:p-4 rounded-[14px] sm:rounded-[22px] flex flex-col justify-between relative overflow-hidden ${
                  theme === "dark" ? "bg-gradient-to-b from-zinc-900 via-zinc-950 to-black" : "bg-white shadow-xs"
                }`}
              >
                {/* 3D Showcase Pod for transparent jar */}
                <div
                  className={`relative w-full h-24 sm:h-38 mb-2 sm:mb-3 rounded-xl sm:rounded-2xl border flex items-center justify-center overflow-hidden transition-colors ${
                    theme === "dark"
                      ? "bg-gradient-to-b from-zinc-950 via-zinc-900/60 to-black border-zinc-800 group-hover:border-[#A3E635]/50"
                      : "bg-gradient-to-b from-zinc-100 via-zinc-50 to-zinc-200/50 border-zinc-200 group-hover:border-[#A3E635]/80"
                  }`}
                >
                  {/* Subtle radial glow */}
                  <div className="absolute inset-0 bg-radial from-[#A3E635]/20 to-transparent pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                  {/* Natural floor shadow */}
                  <div className="absolute bottom-1 w-3/4 h-2 bg-black/20 dark:bg-black/80 rounded-full blur-xs pointer-events-none" />

                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    className={`object-contain p-1.5 sm:p-2 group-hover:scale-105 transition-all duration-300 ${
                      theme === "dark"
                        ? "filter drop-shadow-[0_12px_16px_rgba(0,0,0,0.9)]"
                        : "filter drop-shadow-[0_10px_14px_rgba(0,0,0,0.15)]"
                    }`}
                  />
                  <span
                    className={`absolute top-1 right-1 sm:top-1.5 sm:right-1.5 text-[7px] sm:text-[8px] font-black uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full border z-10 shadow-xs ${
                      theme === "dark"
                        ? "bg-zinc-900/95 border-zinc-700 text-[#A3E635]"
                        : "bg-white border-zinc-300 text-emerald-700"
                    }`}
                  >
                    {c.tag}
                  </span>
                </div>

                <div>
                  <h3
                    className={`font-black text-[11px] sm:text-sm uppercase tracking-tight transition-colors truncate ${
                      theme === "dark"
                        ? "text-white group-hover:text-[#A3E635]"
                        : "text-zinc-900 group-hover:text-emerald-600"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p
                    className={`text-[10px] sm:text-[11px] mt-0.5 leading-tight line-clamp-1 font-medium ${
                      theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                    }`}
                  >
                    {c.desc}
                  </p>

                  <div
                    className={`mt-2 sm:mt-3 flex items-center gap-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-colors ${
                      theme === "dark"
                        ? "text-[#A3E635] group-hover:text-white"
                        : "text-emerald-600 group-hover:text-zinc-900"
                    }`}
                  >
                    <span>SHOP NOW</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
