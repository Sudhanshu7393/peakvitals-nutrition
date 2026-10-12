"use client";

import React from "react";
import { SITE_CONFIG } from "@/data/config";
import { MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const WhatsAppFloatingButton: React.FC = () => {
  const { cart, generateWhatsAppOrderUrl } = useCart();

  const getWhatsAppUrl = () => {
    if (cart.length > 0) {
      return generateWhatsAppOrderUrl();
    }

    const message =
      `🛒 *ORDER INQUIRY - PEAKVITALS NUTRITION*\n` +
      `📍 *Official Brand Dispatch Hub*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Hello Peakvitals Team! 👋\n\n` +
      `I want to order *Peakvitals Nutrition Pre-Workout* (250g / 35 Servings):\n\n` +
      `🔥 *Available Flavours:*\n` +
      `1️⃣ Green Apple Flavour (250g) — ₹1,299\n` +
      `2️⃣ Tangy Orange Flavour (250g) — ₹1,299\n\n` +
      `🚚 *Delivery:* All India Express Dispatch\n` +
      `📍 *My City / PIN Code:* [Enter City/PIN]\n\n` +
      `Please confirm stock & share your UPI QR code for order confirmation. Thank you!`;

    return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-emerald-950/60 border border-emerald-400/40 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
      aria-label="Order or Chat on WhatsApp"
      title="Order on WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 fill-white/20" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-emerald-600 animate-pulse" />
      </div>
      <span className="text-xs font-black uppercase tracking-wider hidden sm:inline">
        {cart.length > 0 ? `Order Cart (${cart.length}) on WhatsApp` : "Order on WhatsApp"}
      </span>
    </a>
  );
};
