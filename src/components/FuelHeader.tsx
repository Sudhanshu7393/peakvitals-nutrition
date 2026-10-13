"use client";

import React, { useState } from "react";
import { Search, ShoppingBag, Menu, X, MessageCircle, Truck, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SITE_CONFIG } from "@/data/config";
import { PeakvitalsLogo } from "@/components/PeakvitalsLogo";

export function FuelHeader() {
  const {
    cartCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategoryTab,
  } = useCart();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tabId: string) => {
    setSelectedCategoryTab(tabId);
    const el = document.getElementById("featured-products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 font-sans">
      {/* 1. Top Announcement Bar */}
      <div className="bg-black text-[#A3E635] text-[10px] sm:text-[11px] font-bold py-1 sm:py-1.5 px-3 text-center border-b border-zinc-900 flex items-center justify-center gap-1.5 tracking-wider uppercase overflow-hidden">
        <Truck className="w-3 h-3 text-[#A3E635] shrink-0" />
        <span className="hidden md:inline">🇮🇳 PEAKVITALS OFFICIAL BRAND STORE • ALL INDIA EXPRESS DELIVERY • DIRECT WHATSAPP ORDER &amp; UPI QR DEAL</span>
        <span className="md:hidden text-[10px] font-bold tracking-wide truncate">🇮🇳 PEAKVITALS OFFICIAL • ALL INDIA EXPRESS DELIVERY</span>
      </div>

      {/* 2. Main Navigation Bar (Fixed Dark Matte Black to match Peakvitals Jar & Hybrid Theme) */}
      <div className="bg-[#0A0B0E] text-white border-b border-zinc-800/90 px-4 sm:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Mobile Menu & Original Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-zinc-300 hover:text-white transition"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <a href="/" className="flex items-center" aria-label="Peakvitals Nutrition Home">
              <PeakvitalsLogo forceDark size="md" />
            </a>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-black uppercase tracking-wider text-zinc-300">
            <button
              onClick={() => handleNavClick("all")}
              className="hover:text-[#A3E635] transition-colors cursor-pointer flex items-center gap-0.5"
            >
              <span>Pre-Workout</span>
            </button>
            <a
              href="#nutrition-facts"
              className="hover:text-[#A3E635] transition-colors"
            >
              Nutrition Facts
            </a>
            <a
              href="#faq-section"
              className="hover:text-[#A3E635] transition-colors"
            >
              FAQs
            </a>
          </nav>

          {/* Right: Search, WhatsApp, Admin & Cart */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Search Toggle / Input */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center rounded-full px-3 py-1 border bg-zinc-900 border-zinc-700 text-white">
                  <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-24 sm:w-40 bg-transparent border-none text-xs outline-none pl-2 pr-1"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-zinc-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1.5 text-zinc-300 hover:text-white transition"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* WhatsApp Link */}
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                "🛒 *ORDER INQUIRY - PEAKVITALS NUTRITION*\n━━━━━━━━━━━━━━━━━━━━━\nHello Peakvitals Team! 👋\n\nI want to order *Peakvitals Nutrition Pre-Workout* (Special Offer: ₹1,199 | MRP: ₹1,999 — Available in Green Apple & Tangy Orange).\n\nPlease confirm stock & share your UPI QR code!"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
              <span>7651918284</span>
            </a>

            {/* Visible Admin Button (Desktop & Mobile) */}
            <a
              href="/admin"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-[#A3E635]/40 text-[#A3E635] text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition shadow-xs"
              title="Open Store Admin Panel"
            >
              <Lock className="w-3 h-3 shrink-0" />
              <span>Admin</span>
            </a>

            {/* Cart with Lime Green Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-zinc-300 hover:text-white transition cursor-pointer group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#A3E635] text-black text-[9px] font-black flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex font-sans">
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-2xs"
          />
          <div className="relative w-4/5 max-w-xs bg-zinc-950 text-white h-full shadow-2xl flex flex-col z-10 p-5 space-y-5 border-r border-zinc-800">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <PeakvitalsLogo forceDark size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm font-black uppercase tracking-wider text-zinc-300 flex-1 overflow-y-auto">
              <button
                onClick={() => {
                  handleNavClick("all");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 hover:text-[#A3E635] flex justify-between items-center"
              >
                <span>Pre-Workout (250g)</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#A3E635] text-xs font-black">₹1,199</span>
                  <span className="text-zinc-500 line-through text-[10px]">₹1,999</span>
                </div>
              </button>
              <a
                href="#nutrition-facts"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 hover:text-[#A3E635]"
              >
                Nutrition Facts
              </a>
              <a
                href="#faq-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 hover:text-[#A3E635]"
              >
                FAQs
              </a>

              <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs font-bold normal-case text-zinc-400">
                <a
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900 border border-[#A3E635]/40 text-[#A3E635] font-black uppercase tracking-wider text-xs"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Store Admin Panel</span>
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-white hover:text-[#A3E635] truncate"
                >
                  ✉️ {SITE_CONFIG.email}
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  "🛒 *ORDER INQUIRY - PEAKVITALS NUTRITION*\n━━━━━━━━━━━━━━━━━━━━━\nHello Peakvitals Team! 👋\n\nI want to order *Peakvitals Nutrition Pre-Workout* (Special Offer: ₹1,199 | MRP: ₹1,999 — Green Apple / Tangy Orange).\n\nPlease confirm stock & share your UPI QR code!"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#A3E635] text-black font-black text-xs uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Helpline: 7651918284</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
