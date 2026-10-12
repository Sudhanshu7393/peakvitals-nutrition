"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Star, Check, ArrowRight, Search, X } from "lucide-react";
import { PEAKVITALS_PREWORKOUTS, PeakvitalsProduct } from "@/data/peakvitalsProducts";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

interface FuelProductGridProps {
  onSelectProduct: (product: PeakvitalsProduct) => void;
  onAddToCart: (product: PeakvitalsProduct) => void;
}

export function FuelProductGrid({
  onSelectProduct,
  onAddToCart,
}: FuelProductGridProps) {
  const { searchQuery, setSearchQuery, selectedCategoryTab, setSelectedCategoryTab } = useCart();
  const { theme } = useTheme();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (e: React.MouseEvent, prod: PeakvitalsProduct) => {
    e.stopPropagation();
    onAddToCart(prod);
    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filtered = PEAKVITALS_PREWORKOUTS.filter((p) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.flavor.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Category tab
    if ((selectedCategoryTab === "green-apple" || selectedCategoryTab === "high-stim") && !p.id.includes("green")) return false;
    if ((selectedCategoryTab === "orange" || selectedCategoryTab === "endurance" || selectedCategoryTab === "pump") && !p.id.includes("orange")) return false;
    if (selectedCategoryTab === "combo" && !p.id.includes("pack") && !p.id.includes("stack")) return false;

    return true;
  });

  const getFlavorGlow = (id: string) => {
    if (id.includes("green")) return "rgba(163, 230, 53, 0.28)";
    if (id.includes("orange")) return "rgba(249, 115, 22, 0.32)";
    return "rgba(163, 230, 53, 0.25)";
  };

  return (
    <section
      id="featured-products"
      className={`py-14 font-sans scroll-mt-24 border-b relative overflow-hidden transition-colors duration-300 ${
        theme === "dark"
          ? "bg-zinc-950 border-zinc-800 text-white"
          : "bg-zinc-100 border-zinc-200 text-zinc-900"
      }`}
    >
      {/* Background radial glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-3xl pointer-events-none ${
          theme === "dark" ? "bg-[#A3E635]/5" : "bg-lime-500/10"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        {/* Section Header */}
        <div
          className={`flex items-center justify-between border-b pb-3 ${
            theme === "dark" ? "border-zinc-800" : "border-zinc-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A3E635] shadow-[0_0_8px_#A3E635]" />
            <h2
              className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${
                theme === "dark" ? "text-white" : "text-zinc-900"
              }`}
            >
              PEAKVITALS <span className="text-[#EA580C]">LINEUP</span>
            </h2>
          </div>

          <button
            onClick={() => {
              setSelectedCategoryTab("all");
              setSearchQuery("");
            }}
            className={`flex items-center gap-1 text-xs font-black uppercase transition tracking-wider cursor-pointer ${
              theme === "dark"
                ? "text-zinc-400 hover:text-white"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search feedback pill */}
        {searchQuery && (
          <div
            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs ${
              theme === "dark"
                ? "bg-zinc-900 border-zinc-700 text-zinc-300"
                : "bg-white border-zinc-300 text-zinc-700 shadow-xs"
            }`}
          >
            <Search className="w-4 h-4 text-[#EA580C] shrink-0" />
            <span>
              Showing flavours matching:{" "}
              <strong className={theme === "dark" ? "text-white" : "text-zinc-900"}>
                &ldquo;{searchQuery}&rdquo;
              </strong>{" "}
              ({filtered.length} found)
            </span>
            <button
              onClick={() => setSearchQuery("")}
              className="ml-auto flex items-center gap-1 text-[11px] font-bold text-[#EA580C] hover:underline cursor-pointer"
            >
              Clear <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 4-Card Product Grid with 3D Shining Borders */}
        {filtered.length === 0 ? (
          <div
            className={`py-12 text-center rounded-3xl border space-y-3 p-6 ${
              theme === "dark"
                ? "bg-zinc-900/60 border-zinc-800 text-zinc-300"
                : "bg-white border-zinc-200 text-zinc-700 shadow-sm"
            }`}
          >
            <p className="font-bold">No flavours found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategoryTab("all");
              }}
              className="px-4 py-2 bg-[#EA580C] text-white rounded-xl text-xs font-bold uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
            {filtered.map((prod, idx) => {
              const isAdded = addedId === prod.id;
              const isBestSeller = idx === 0 || idx === 2 || idx === 4;

              return (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className={`group relative p-[1.5px] rounded-2xl sm:rounded-3xl card-3d-glow transition-all duration-300 cursor-pointer flex flex-col ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-zinc-700/80 via-zinc-800 to-zinc-900 hover:from-[#A3E635] hover:to-[#EA580C]"
                      : "bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 hover:from-[#A3E635] hover:to-[#EA580C] shadow-sm shadow-zinc-200/80"
                  }`}
                >
                  <div
                    className={`rounded-[14px] sm:rounded-[22px] p-2.5 sm:p-4 flex flex-col justify-between h-full relative overflow-hidden ${
                      theme === "dark"
                        ? "bg-gradient-to-b from-zinc-900 via-zinc-950 to-black"
                        : "bg-white shadow-xs"
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between min-h-[20px]">
                        {isBestSeller ? (
                          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-white bg-[#EA580C] px-2 py-0.5 rounded-full shadow-xs">
                            ⚡ BEST SELLER
                          </span>
                        ) : (
                          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-black bg-[#A3E635] px-2 py-0.5 rounded-full shadow-xs">
                            ★ HIGH STIM
                          </span>
                        )}

                        {/* Veg Green Dot */}
                        <div
                          className={`w-3.5 h-3.5 border border-emerald-500 rounded-sm flex items-center justify-center shrink-0 ${
                            theme === "dark" ? "bg-black/80" : "bg-white"
                          }`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                      </div>

                      {/* 3D Showcase Pedestal for the Dabba */}
                      <div
                        className={`relative w-full h-32 sm:h-52 my-2 sm:my-3 rounded-xl sm:rounded-2xl border flex items-center justify-center overflow-hidden transition-colors ${
                          theme === "dark"
                            ? "bg-gradient-to-b from-zinc-950/90 via-zinc-900/60 to-black border-zinc-800/80 group-hover:border-[#A3E635]/50"
                            : "bg-gradient-to-b from-zinc-100/90 via-zinc-50 to-zinc-200/50 border-zinc-200 group-hover:border-[#A3E635]/80"
                        }`}
                      >
                        {/* Flavor-specific radial spotlight */}
                        <div
                          className="absolute inset-0 transition-transform duration-500 group-hover:scale-125 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at 50% 60%, ${getFlavorGlow(
                              prod.id
                            )} 0%, transparent 72%)`,
                          }}
                        />

                        {/* 3D Contact Floor Shadow */}
                        <div className="absolute bottom-1.5 sm:bottom-2.5 w-3/4 h-2 sm:h-3 rounded-full blur-sm bg-black/20 dark:bg-black/75 pointer-events-none" />

                        {/* Realistic Transparent Packshot */}
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className={`object-contain p-1.5 sm:p-2 group-hover:scale-105 transition-all duration-300 ${
                            theme === "dark"
                              ? "filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.95)]"
                              : "filter drop-shadow-[0_12px_16px_rgba(0,0,0,0.2)]"
                          }`}
                        />
                      </div>

                      {/* Product Name */}
                      <h3
                        className={`font-black text-[11px] sm:text-sm uppercase leading-snug line-clamp-2 transition-colors ${
                          theme === "dark"
                            ? "text-white group-hover:text-[#A3E635]"
                            : "text-zinc-900 group-hover:text-emerald-600"
                        }`}
                      >
                        {prod.name}
                      </h3>
                      <p
                        className={`text-[10px] sm:text-[11px] mt-0.5 font-medium truncate ${
                          theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                        }`}
                      >
                        {prod.flavor} • {prod.weight}
                      </p>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mt-1 sm:mt-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span
                          className={`text-[9px] sm:text-[10px] font-bold ${
                            theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                          }`}
                        >
                          (980+)
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="mt-1.5 sm:mt-2.5 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                        <span
                          className={`text-sm sm:text-lg font-black ${
                            theme === "dark" ? "text-[#A3E635]" : "text-emerald-600"
                          }`}
                        >
                          {prod.price}
                        </span>
                        <span
                          className={`text-[10px] sm:text-xs line-through ${
                            theme === "dark" ? "text-zinc-500" : "text-zinc-400"
                          }`}
                        >
                          {prod.originalPrice}
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-black uppercase text-[#EA580C] bg-[#EA580C]/15 px-1 py-0.5 rounded border border-[#EA580C]/30">
                          35% OFF
                        </span>
                      </div>
                    </div>

                    {/* Signature Neon Lime Green "ADD TO CART" Button */}
                    <div className="mt-2.5 sm:mt-4 pt-1">
                      <button
                        onClick={(e) => handleAdd(e, prod)}
                        className={`w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer active:scale-95 shadow-xs ${
                          isAdded
                            ? theme === "dark"
                              ? "bg-white text-black"
                              : "bg-zinc-900 text-white"
                            : "bg-[#A3E635] hover:bg-[#86efac] text-black shadow-[#A3E635]/20 hover:shadow-[#A3E635]/40"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>ADDED</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span>ADD TO CART</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
