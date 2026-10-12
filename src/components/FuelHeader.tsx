"use client";

import React, { useState } from "react";
import { Search, ShoppingBag, Menu, X, ChevronDown, MessageCircle, Truck } from "lucide-react";
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
    setIsTrackOrderModalOpen,
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

      {/* 2. Main Navigation Bar (Fixed Dark Matte Black to match Peakvitals Jar) */}
      <div className="bg-[#0A0B0E] text-white border-b border-zinc-800/90 px-4 sm:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Mobile Menu & Logo */}
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
              <span>Shop All</span>
              <ChevronDown className="w-3 h-3 text-zinc-500" />
            </button>
            <button
              onClick={() => handleNavClick("green-apple")}
              className="hover:text-[#A3E635] transition-colors cursor-pointer flex items-center gap-0.5"
            >
              <span>Green Apple</span>
            </button>
            <button
              onClick={() => handleNavClick("orange")}
              className="hover:text-[#EA580C] transition-colors cursor-pointer flex items-center gap-0.5"
            >
              <span>Tangy Orange</span>
            </button>
            <button
              onClick={() => setIsTrackOrderModalOpen(true)}
              className="hover:text-[#A3E635] transition-colors cursor-pointer"
            >
              Track Order
            </button>
            <a
              href="#featured-products"
              className="hover:text-[#A3E635] transition-colors"
            >
              Products
            </a>
          </nav>

          {/* Right: Search, WhatsApp & Cart */}
          <div className="flex items-center gap-2.5 sm:gap-4">
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
                    placeholder="Green Apple, Orange..."
                    className="w-28 sm:w-44 bg-transparent border-none text-xs outline-none pl-2 pr-1"
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
                "🛒 *ORDER INQUIRY - PEAKVITALS NUTRITION*\n━━━━━━━━━━━━━━━━━━━━━\nHello Peakvitals Team! 👋\n\nI want to order *Peakvitals Nutrition Pre-Workout* (₹1,299 — Available in Green Apple & Tangy Orange).\n\nPlease confirm stock & share your UPI QR code!"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
              <span>9118732066</span>
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
                className="w-full text-left py-2 hover:text-[#A3E635] flex justify-between"
              >
                <span>All Pre-Workouts</span>
                <span className="text-[#A3E635] text-xs">₹1,299</span>
              </button>
              <button
                onClick={() => {
                  handleNavClick("green-apple");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 hover:text-[#A3E635] flex justify-between"
              >
                <span>Green Apple Flavour</span>
                <span className="text-zinc-500 text-xs">250g</span>
              </button>
              <button
                onClick={() => {
                  handleNavClick("orange");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 hover:text-[#EA580C] flex justify-between"
              >
                <span>Tangy Orange Flavour</span>
                <span className="text-zinc-500 text-xs">250g</span>
              </button>

              <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs font-bold normal-case text-zinc-400">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsTrackOrderModalOpen(true);
                  }}
                  className="w-full text-left py-2 text-white hover:text-[#A3E635]"
                >
                  🚚 Track My Order (PV-ID)
                </button>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ravi+Nagar+Mughalsarai+Chandauli+232101"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-white hover:text-[#A3E635]"
                >
                  📍 Dispatch Hub: Ravi Nagar, Mughalsarai (Map)
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  "🛒 *ORDER INQUIRY - PEAKVITALS NUTRITION*\n━━━━━━━━━━━━━━━━━━━━━\nHello Peakvitals Team! 👋\n\nI want to order *Peakvitals Nutrition Pre-Workout* (₹1,299 — Green Apple / Tangy Orange).\n\nPlease confirm stock & share your UPI QR code!"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#A3E635] text-black font-black text-xs uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Helpline: 9118732066</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
