"use client";

import React, { useState } from "react";
import { Menu, MapPin, Search, User, ShoppingBag, MessageCircle, ChevronRight, X, ShieldCheck, Truck, Navigation, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SITE_CONFIG } from "@/data/config";

export function NutrabayHeader({ onSearch }: { onSearch?: (q: string) => void }) {
  const {
    cartCount,
    setIsCartOpen,
    pincode,
    pincodeInfo,
    selectedPostOffice,
    setPincode,
    updatePincode,
    detectCurrentLocation,
    isDetectingLocation,
    searchQuery,
    setSearchQuery,
    setSelectedCategoryTab,
    userProfile,
    setIsLoginModalOpen,
    setIsTrackOrderModalOpen,
  } = useCart();

  const [isPincodeModal, setIsPincodeModal] = useState(false);
  const [modalPinInput, setModalPinInput] = useState(pincode || "");

  React.useEffect(() => {
    setModalPinInput(pincode || "");
  }, [pincode, isPincodeModal]);

  const postName = selectedPostOffice || pincodeInfo?.area;
  const displayLocation = pincode
    ? (postName && pincodeInfo?.district
        ? `${pincode}, ${postName}`
        : pincodeInfo?.district
        ? `${pincode}, ${pincodeInfo.district}`
        : pincode)
    : "Select Pincode";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) onSearch(val);
  };

  const handleNavCategoryClick = (tabId: string) => {
    setSelectedCategoryTab(tabId);
    const el = document.getElementById("bestsellers");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-2xs font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-18 gap-3 sm:gap-6">
            {/* 1. Left: Hamburger & Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Menu"
                className="p-1.5 text-gray-700 hover:text-black rounded-lg hover:bg-gray-100 transition sm:hidden cursor-pointer"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Nutrabay-style Brand Logo */}
              <a href="/" className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-950 uppercase">
                  S.K NUTRITION
                </span>
                <span className="hidden md:inline text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Peakvitals Store
                </span>
              </a>
            </div>

            {/* 2. Pincode Selector (Nutrabay Signature) */}
            <div
              onClick={() => setIsPincodeModal(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs text-gray-700 hover:text-gray-950 cursor-pointer shrink-0 py-1 px-2 rounded-lg hover:bg-gray-50 transition"
            >
              <MapPin className="w-4 h-4 text-orange-500 fill-orange-500/20" />
              <div className="text-left leading-tight">
                <span className="text-[10px] text-gray-500 block">Deliver to:</span>
                <span className="font-bold text-gray-900 flex items-center gap-0.5 truncate max-w-[170px]">
                  {displayLocation} <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                </span>
              </div>
            </div>

            {/* 3. Center: Rounded Search Bar (Exact Nutrabay Style) */}
            <div className="flex-1 max-w-xl mx-auto">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder='Search "green apple", "blue razz", "watermelon", "combo"...'
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-gray-50 hover:bg-gray-100/80 focus:bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none transition"
                />
              </div>
            </div>

            {/* 4. Right: WhatsApp Quick Order, Login & Cart */}
            <div className="flex items-center gap-3 sm:gap-5 shrink-0">
              {/* WhatsApp Support Button */}
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20SK%20Nutrition,%20I%20want%20to%20order%20Peakvitals%20Pre-Workout`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-full transition"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>WhatsApp Order</span>
              </a>

              {/* Login item */}
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden md:flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-black cursor-pointer"
              >
                <User className="w-4 h-4 text-orange-500" />
                <span>{userProfile ? userProfile.name.split(" ")[0] : "Login"}</span>
                <span className="text-gray-300 ml-1">|</span>
              </button>

              {/* Cart with Orange Badge (Exact Nutrabay) */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 p-1.5 text-gray-800 hover:text-black cursor-pointer group"
                aria-label="Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 group-hover:scale-105 transition-transform" />
                  <span className="absolute -top-1.5 -right-2 min-w-4.5 h-4.5 px-1 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                </div>
                <span className="hidden sm:inline text-xs font-bold">Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Category Navigation Bar */}
        <div className="hidden md:block bg-gray-50 border-t border-gray-100 py-1.5 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between text-gray-600 font-bold">
            <div className="flex items-center gap-5 overflow-x-auto scrollbar-none">
              <button onClick={() => handleNavCategoryClick("all")} className="hover:text-orange-600 cursor-pointer">
                All Flavours
              </button>
              <button onClick={() => handleNavCategoryClick("high-stim")} className="hover:text-orange-600 cursor-pointer">
                High Stim (Green / Blue)
              </button>
              <button onClick={() => handleNavCategoryClick("pump")} className="hover:text-orange-600 cursor-pointer">
                Muscle Pump (Watermelon)
              </button>
              <button onClick={() => handleNavCategoryClick("endurance")} className="hover:text-orange-600 cursor-pointer">
                Citrus (Tangy Orange)
              </button>
              <button onClick={() => handleNavCategoryClick("combo")} className="hover:text-orange-600 cursor-pointer">
                Value Combos &amp; Stacks
              </button>
              <button
                onClick={() => setIsTrackOrderModalOpen(true)}
                className="flex items-center gap-1 text-orange-600 hover:text-orange-700 cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Track Order</span>
              </button>
              <a href="#store-location" className="hover:text-gray-900 transition">
                Ravi Nagar Store
              </a>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 text-[11px] shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Genuine Peakvitals Nutrition</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex font-sans">
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-2xs"
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 p-5 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <h3 className="font-black text-base uppercase text-gray-900">S.K NUTRITION</h3>
                <p className="text-[10px] text-emerald-700 font-bold">Official Peakvitals Store</p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm font-bold text-gray-700 flex-1 overflow-y-auto">
              <div
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPincodeModal(true);
                }}
                className="p-3 rounded-xl bg-orange-50 border border-orange-200 cursor-pointer"
              >
                <span className="text-[10px] uppercase font-black text-orange-600 block">Deliver to:</span>
                <p className="text-xs font-bold text-gray-900 flex items-center justify-between mt-0.5">
                  <span className="flex items-center gap-1 truncate max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" /> {displayLocation}
                  </span>
                  <span className="text-[10px] text-orange-600 font-bold underline shrink-0">Change</span>
                </p>
              </div>

              {/* Login profile in mobile */}
              <div
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-2.5 cursor-pointer"
              >
                <User className="w-4 h-4 text-orange-500" />
                <div className="text-left leading-tight">
                  <span className="text-xs font-bold text-gray-900 block">
                    {userProfile ? `Hi, ${userProfile.name}` : "Sign In / Register"}
                  </span>
                  <span className="text-[10px] text-gray-500">Manage orders &amp; addresses</span>
                </div>
              </div>

              {/* Track order in mobile */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsTrackOrderModalOpen(true);
                }}
                className="w-full text-left p-3 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center justify-between text-xs font-bold"
              >
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" /> Track My Order
                </span>
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </button>

              <div className="pt-2">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2">
                  Filter by Flavour
                </p>
                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      handleNavCategoryClick("all");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-50 flex items-center justify-between text-xs"
                  >
                    <span>All Flavours</span>
                    <span className="text-orange-600 font-bold">From ₹1,299</span>
                  </button>
                  <button
                    onClick={() => {
                      handleNavCategoryClick("high-stim");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-50 flex items-center justify-between text-xs"
                  >
                    <span>High Stim (Green &amp; Blue)</span>
                    <span className="text-orange-600 font-bold">₹1,299</span>
                  </button>
                  <button
                    onClick={() => {
                      handleNavCategoryClick("pump");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-50 flex items-center justify-between text-xs"
                  >
                    <span>Watermelon Punch</span>
                    <span className="text-orange-600 font-bold">₹1,299</span>
                  </button>
                  <button
                    onClick={() => {
                      handleNavCategoryClick("endurance");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-50 flex items-center justify-between text-xs"
                  >
                    <span>Tangy Orange Citrus</span>
                    <span className="text-orange-600 font-bold">₹1,299</span>
                  </button>
                  <button
                    onClick={() => {
                      handleNavCategoryClick("combo");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg bg-orange-50/50 hover:bg-orange-50 flex items-center justify-between text-xs"
                  >
                    <span>⚡ Value Combos &amp; Stacks</span>
                    <span className="text-orange-600 font-bold">From ₹2,399</span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#store-location"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg text-gray-700 hover:bg-gray-50 text-xs"
                >
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>Ravi Nagar Mughalsarai Store</span>
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 space-y-2">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20SK%20Nutrition`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Helpline</span>
              </a>
              <p className="text-[10px] text-center text-gray-500">
                Call/WhatsApp: {SITE_CONFIG.phone}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pincode Change Modal */}
      {isPincodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-gray-900">Check Delivery Pincode</h3>
                <p className="text-[11px] text-gray-500">All India Express Shipping Serviceable</p>
              </div>
              <button
                onClick={() => setIsPincodeModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* GPS Auto-Detect Button */}
            <button
              type="button"
              disabled={isDetectingLocation}
              onClick={async () => {
                const info = await detectCurrentLocation();
                if (info && info.valid) {
                  setModalPinInput(info.pincode);
                  setTimeout(() => setIsPincodeModal(false), 800);
                } else {
                  alert("Could not detect location. Please type your 6-digit PIN code.");
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 font-bold text-xs transition cursor-pointer disabled:opacity-60"
            >
              {isDetectingLocation ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
                  <span>Detecting GPS Location...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4 text-orange-600" />
                  <span>Use Current Location (Auto-Detect)</span>
                </>
              )}
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-2 text-[10px] uppercase font-bold text-gray-400 absolute">or enter pincode</span>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={modalPinInput}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setModalPinInput(clean);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && modalPinInput.length === 6) {
                      updatePincode(modalPinInput);
                      setIsPincodeModal(false);
                    }
                  }}
                  maxLength={6}
                  placeholder="e.g. 221005"
                  className="flex-1 px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm font-black text-gray-900 tracking-wider outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
                <button
                  type="button"
                  disabled={modalPinInput.length !== 6}
                  onClick={() => {
                    if (modalPinInput.length === 6) {
                      updatePincode(modalPinInput);
                      setIsPincodeModal(false);
                    }
                  }}
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-black text-xs rounded-xl transition cursor-pointer disabled:cursor-not-allowed shadow-xs"
                >
                  Apply
                </button>
              </div>

              {pincodeInfo && pincodeInfo.valid && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center justify-between">
                  <span className="font-bold">
                    📍 {pincodeInfo.district}, {pincodeInfo.state}
                  </span>
                  <span className="font-extrabold text-[10px] text-emerald-700">
                    {pincodeInfo.isLocal ? "⚡ Same-Day" : "🚚 Express"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
