"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { Search } from "lucide-react";

interface StudioProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const StudioProductGrid: React.FC<StudioProductGridProps> = ({
  products,
  onQuickView,
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((p) => {
    if (activeTab === "pump" && !p.name.toLowerCase().includes("vein")) return false;
    if (activeTab === "highstim" && !p.name.toLowerCase().includes("outlaw")) return false;
    if (activeTab === "ultra" && !p.name.toLowerCase().includes("conquer")) return false;
    if (searchTerm.trim() !== "") {
      return (
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.flavors.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return true;
  });

  return (
    <section id="products-catalog" className="py-12 bg-[#FBFBFA] border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Title: RECOMMENDED FOR YOU (Exact Reference Style) */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
            RECOMMENDED FOR YOU
          </h2>

          {/* Centered Search Bar with Red Button (Exact Reference Style) */}
          <div className="max-w-md mx-auto flex items-center shadow-xs rounded-full overflow-hidden border border-zinc-300 bg-white">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search pre-workout, pump, aminos..."
              className="flex-1 px-4 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 transition-colors">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Filter Pills with Red Active Tab (Exact Reference Style) */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-1.5 rounded transition-all ${
                activeTab === "all"
                  ? "bg-red-600 text-white shadow"
                  : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("ultra")}
              className={`px-4 py-1.5 rounded transition-all ${
                activeTab === "ultra"
                  ? "bg-red-600 text-white shadow"
                  : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700"
              }`}
            >
              Conquer Ultra
            </button>
            <button
              onClick={() => setActiveTab("pump")}
              className={`px-4 py-1.5 rounded transition-all ${
                activeTab === "pump"
                  ? "bg-red-600 text-white shadow"
                  : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700"
              }`}
            >
              Nitric Oxide Pump
            </button>
            <button
              onClick={() => setActiveTab("highstim")}
              className={`px-4 py-1.5 rounded transition-all ${
                activeTab === "highstim"
                  ? "bg-red-600 text-white shadow"
                  : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700"
              }`}
            >
              High-Stimulant
            </button>
          </div>
        </div>

        {/* 3 Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* View All / Order on WhatsApp button at bottom */}
        <div className="text-center pt-4">
          <a
            href="https://wa.me/917651918284?text=Hi%20Peakvitals%20Nutrition,%20I%20want%20to%20order%20Peakvitals%20Pre-Workout"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest px-8 py-3 rounded shadow-md transition-all active:scale-95"
          >
            ORDER VIA WHATSAPP (7651918284)
          </a>
        </div>
      </div>
    </section>
  );
};
