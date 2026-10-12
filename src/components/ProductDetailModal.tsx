"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { SITE_CONFIG } from "@/data/config";
import {
  X,
  Star,
  ShieldCheck,
  ShoppingCart,
  MessageCircle,
  Truck,
  Sparkles,
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

  React.useEffect(() => {
    if (product && product.flavors.length > 0) {
      setSelectedFlavor(product.flavors[0]);
      setSelectedWeightIndex(0);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const selectedWeight = product.weightOptions[selectedWeightIndex] || {
    label: "Standard",
    priceMultiplier: 1.0,
  };

  const calculatedPrice = Math.round(product.price * selectedWeight.priceMultiplier);
  const calculatedOriginalPrice = Math.round(product.originalPrice * selectedWeight.priceMultiplier);
  const discountAmount = calculatedOriginalPrice - calculatedPrice;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-gray-900 font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Image & Authenticity Guarantee */}
          <div className="space-y-4">
            <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-black border border-zinc-800 flex items-center justify-center p-4 card-3d-glow">
              {/* 3D Radial Spotlight */}
              <div className="absolute inset-0 bg-radial from-[#A3E635]/25 via-[#EA580C]/15 to-transparent pointer-events-none" />
              {/* 3D Contact Shadow */}
              <div className="absolute bottom-4 w-3/4 h-3.5 bg-black/95 rounded-full blur-md" />

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-2 filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.95)] z-10 hover:scale-105 transition-transform"
              />
              <div className="absolute top-3 left-3 bg-[#EA580C] text-white font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-lg shadow-orange-950 z-20">
                {product.brand}
              </div>
            </div>

            {/* Authenticity Certificate Box */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                  100% Lab-Tested &amp; Authentic
                </h4>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Direct factory supply by {SITE_CONFIG.name}. Includes batch verification code.
                </p>
                <p className="text-[10px] text-emerald-700 font-mono mt-1 font-bold">
                  Sample Batch: {product.batchNumberSample}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Ordering */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                {product.brand}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-1 leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-gray-500 mt-1">{product.tagline}</p>
            </div>

            {/* Price Box */}
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-gray-500 block">Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-gray-900">₹{calculatedPrice}</span>
                  <span className="text-xs font-bold text-gray-500">/ 250g (35 Servings)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-600 block">In Stock</span>
                <span className="text-[11px] text-gray-500">Same Day Dispatch</span>
              </div>
            </div>

            {/* Weight / Pack Size Options */}
            <div>
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                Choose Size / Pack:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.weightOptions.map((opt, idx) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedWeightIndex(idx)}
                    className={`py-1.5 px-3.5 rounded-full text-xs font-bold transition-all border ${
                      selectedWeightIndex === idx
                        ? "bg-orange-500 text-white border-orange-500 shadow-xs"
                        : "bg-white text-gray-800 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor Options */}
            {product.flavors.length > 0 && (
              <div>
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                  Select Flavor:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {product.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`text-xs px-3.5 py-1.5 rounded-full border font-semibold transition-all ${
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

            {/* Nutritional Facts Highlights */}
            <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
              <h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Key Active Dose
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {product.nutritionalHighlights.protein && (
                  <div className="bg-white p-2 rounded-xl border border-gray-200">
                    <span className="block text-orange-600 font-black text-sm">
                      {product.nutritionalHighlights.protein}
                    </span>
                    <span className="text-[10px] text-gray-500">Citrulline</span>
                  </div>
                )}
                {product.nutritionalHighlights.bcaa && (
                  <div className="bg-white p-2 rounded-xl border border-gray-200">
                    <span className="block text-gray-900 font-black text-sm">
                      {product.nutritionalHighlights.bcaa}
                    </span>
                    <span className="text-[10px] text-gray-500">Beta-Alanine</span>
                  </div>
                )}
                {product.nutritionalHighlights.creatine && (
                  <div className="bg-white p-2 rounded-xl border border-gray-200">
                    <span className="block text-emerald-600 font-black text-sm">
                      {product.nutritionalHighlights.creatine}
                    </span>
                    <span className="text-[10px] text-gray-500">Arginine / Caffeine</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity & Action Buttons */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-full bg-white px-2 py-0.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-1 text-gray-600 hover:text-black font-bold"
                  >
                    -
                  </button>
                  <span className="px-2 py-1 text-sm font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 py-1 text-gray-600 hover:text-black font-bold"
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

            <div className="text-[11px] text-gray-500 pt-1 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-orange-500" />
              <span>Available for immediate All India Express Courier dispatch.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
