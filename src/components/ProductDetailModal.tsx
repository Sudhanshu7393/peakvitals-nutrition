"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { SITE_CONFIG } from "@/data/config";
import { PEAKVITALS_BOX_INFO, PEAKVITALS_NUTRITION_FACTS } from "@/data/peakvitalsProducts";
import {
  X,
  ShieldCheck,
  ShoppingCart,
  MessageCircle,
  Truck,
  Sparkles,
  CheckCircle2,
  Droplets,
} from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"overview" | "nutrition">("overview");

  React.useEffect(() => {
    if (product && product.flavors.length > 0) {
      setSelectedFlavor(
        product.id.includes("orange")
          ? "Tangy Orange Flavour"
          : product.flavors[0]
      );
      setSelectedWeightIndex(0);
      setQuantity(1);
      setActiveMediaIndex(0);
      setActiveTab("overview");
    }
  }, [product]);

  if (!product) return null;

  const selectedWeight = product.weightOptions[selectedWeightIndex] || {
    label: "250g (35 Servings)",
    priceMultiplier: 1.0,
  };

  const calculatedPrice = Math.round(product.price * selectedWeight.priceMultiplier);

  const mediaGallery = [
    { id: "studio", label: "Studio Tub", image: product.image },
    ...PEAKVITALS_BOX_INFO.boxSidePhotos.map((p) => ({
      id: p.id,
      label: p.label,
      image: p.image,
    })),
  ];

  const handleAddToCart = () => {
    addToCart(product, selectedFlavor || product.flavors[0] || "Standard", selectedWeight.label, calculatedPrice, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
      onClose();
    }, 800);
  };

  const whatsAppDirectUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `🛒 *DIRECT ORDER - ${SITE_CONFIG.name}*\n` +
    `📍 *Official Peakvitals Brand Store*\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `Hello Peakvitals Team! 👋\n\n` +
    `I want to order this product:\n` +
    `🔥 *Item:* ${product.name}\n` +
    `🍃 *Flavour:* ${selectedFlavor}\n` +
    `⚖️ *Weight:* ${selectedWeight.label}\n` +
    `🔢 *Quantity:* ${quantity}\n` +
    `💰 *Total Price:* ₹${(calculatedPrice * quantity).toLocaleString("en-IN")}\n` +
    `🚚 *Delivery:* Direct Express Courier Dispatch\n` +
    `📱 *Payment:* Please share your official UPI QR code here for payment.\n\n` +
    `Please confirm stock and today's dispatch schedule. Thank you!`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white border border-gray-200 rounded-3xl shadow-2xl p-5 sm:p-8 text-gray-900 font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-950 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column (5 Cols): Interactive Studio + 5 Real Box Label Photos */}
          <div className="md:col-span-5 space-y-3">
            <div className="relative h-64 sm:h-76 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-black border border-zinc-800 flex items-center justify-center p-3 card-3d-glow">
              <div className="absolute inset-0 bg-radial from-[#A3E635]/20 via-[#EA580C]/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 w-3/4 h-3 bg-black/95 rounded-full blur-md" />

              <img
                src={mediaGallery[activeMediaIndex]?.image || product.image}
                alt={product.name}
                className="w-full h-full object-contain p-1 filter drop-shadow-[0_18px_22px_rgba(0,0,0,0.95)] z-10 transition-all"
              />
              <div className="absolute top-3 left-3 bg-[#EA580C] text-white font-black text-[9px] uppercase px-2.5 py-1 rounded-full shadow-lg z-20">
                {mediaGallery[activeMediaIndex]?.label || "Official Packshot"}
              </div>
            </div>

            {/* Thumbnail Strip (Studio + 5 Box Sides) */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                View All Box Sides (Click to Inspect):
              </span>
              <div className="grid grid-cols-6 gap-1.5">
                {mediaGallery.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`relative h-12 rounded-lg overflow-hidden border-2 bg-zinc-950 transition cursor-pointer ${
                      activeMediaIndex === idx
                        ? "border-[#EA580C] ring-1 ring-[#EA580C]"
                        : "border-zinc-300 opacity-75 hover:opacity-100"
                    }`}
                    title={m.label}
                  >
                    <img
                      src={m.image}
                      alt={m.label}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Official Licensing & Batch Box */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wide">
                  100% Genuine • {PEAKVITALS_BOX_INFO.marketedBy}
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold text-emerald-900 pt-0.5">
                <div className="bg-white/90 px-2 py-1 rounded border border-emerald-200">
                  FSSAI: <span className="font-mono">{PEAKVITALS_BOX_INFO.fssaiLicNo}</span>
                </div>
                <div className="bg-white/90 px-2 py-1 rounded border border-emerald-200">
                  Batch: <span className="font-mono">{PEAKVITALS_BOX_INFO.batchNo}</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-600 leading-snug">
                ISO 9001 &amp; GMP Certified • FDA Registered • USA Imported Ingredients
              </p>
            </div>
          </div>

          {/* Right Column (7 Cols): Details, Tabs & Ordering */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-orange-600 uppercase tracking-wider">
                  {PEAKVITALS_BOX_INFO.marketedBy}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  🟢 100% Vegetarian
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5 leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">{product.tagline}</p>
            </div>

            {/* Price & MRP Box */}
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-gray-500 block">
                  Limited Offer Deal Price (Incl. of all taxes)
                </span>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl font-black text-emerald-600">
                    ₹{calculatedPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-bold line-through text-gray-400">
                    ₹1,999
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    40% OFF
                  </span>
                  <span className="text-xs font-bold text-gray-600">
                    • 250g (35 Servings)
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-gray-500 block mt-0.5">
                  Official Box MRP: ₹1,999/- • U.S.P.: ₹4.79/g (MRP ₹7.99/g)
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-emerald-600 block">In Stock</span>
                <span className="text-[10px] font-semibold text-gray-500">Express Dispatch</span>
              </div>
            </div>

            {/* Toggle Tabs: Overview vs Full 13-Ingredient Nutrition Facts */}
            <div className="flex gap-2 border-b border-gray-200 pb-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Overview &amp; Dosage
              </button>
              <button
                onClick={() => setActiveTab("nutrition")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                  activeTab === "nutrition"
                    ? "bg-[#EA580C] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Full Nutrition Facts (13 Actives)
              </button>
            </div>

            {activeTab === "overview" ? (
              <div className="space-y-3.5">
                {/* Flavor Selection */}
                {product.flavors.length > 0 && (
                  <div>
                    <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                      Select Flavour:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.flavors.map((flavor) => (
                        <button
                          key={flavor}
                          onClick={() => setSelectedFlavor(flavor)}
                          className={`text-xs px-3.5 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                            selectedFlavor === flavor
                              ? "bg-gray-900 text-white border-gray-900 shadow-xs"
                              : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {flavor}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Active Matrix Highlights */}
                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 space-y-2">
                  <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Key Clinical Matrix (Per 7g Scoop)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-white p-2 rounded-xl border border-gray-200">
                      <span className="block text-orange-600 font-black text-sm">1.5g + 2g</span>
                      <span className="text-[10px] font-semibold text-gray-500">Citrulline + Arginine AKG</span>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-gray-200">
                      <span className="block text-gray-900 font-black text-sm">2g + 140mg</span>
                      <span className="text-[10px] font-semibold text-gray-500">Beta-Alanine + Taurine</span>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-gray-200 col-span-2 sm:col-span-1">
                      <span className="block text-emerald-600 font-black text-sm">195mg + 200mg</span>
                      <span className="text-[10px] font-semibold text-gray-500">Caffeine + L-Theanine</span>
                    </div>
                  </div>
                </div>

                {/* Suggested Use Box */}
                <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200 flex items-start gap-2.5 text-xs">
                  <Droplets className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-gray-900 uppercase text-[11px] block">
                      Suggested Use (As On Box):
                    </span>
                    <span className="text-gray-700 text-[11px]">
                      {PEAKVITALS_BOX_INFO.suggestedUseSummary}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Full 14-Row Nutrition Table inside Modal */
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 max-h-60 overflow-y-auto space-y-2">
                <div className="flex items-center justify-between border-b border-gray-300 pb-1.5 text-[11px] font-black text-gray-900">
                  <span>Serving Size: 7g (35 Servings)</span>
                  <span>Per Serving (%RDA)</span>
                </div>
                <div className="divide-y divide-gray-200 text-xs">
                  {PEAKVITALS_NUTRITION_FACTS.map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-1">
                      <span className="font-bold text-gray-800">{r.nutrient}</span>
                      <span className="font-black text-gray-900">
                        {r.amount}{" "}
                        <span className="text-[10px] font-normal text-gray-500">
                          ({r.rda})
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-500 pt-1 border-t border-gray-200">
                  <strong>Ingredients:</strong> {PEAKVITALS_BOX_INFO.ingredientsList}
                </p>
              </div>
            )}

            {/* Quantity & Action Buttons */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-full bg-white px-2 py-0.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-gray-600 hover:text-black font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-2.5 py-1 text-sm font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-gray-600 hover:text-black font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 text-white" />
                  <span>{isAddedFeedback ? "Added to Cart!" : "Add to Cart"}</span>
                </button>
              </div>

              <a
                href={whatsAppDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant Order on WhatsApp</span>
              </a>
            </div>

            <div className="text-[11px] text-gray-500 pt-0.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-orange-500" />
                All India Express Courier Dispatch
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Lab Tested
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
