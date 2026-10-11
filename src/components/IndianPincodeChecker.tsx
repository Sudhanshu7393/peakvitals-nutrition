"use client";

import React, { useState } from "react";
import {
  MapPin,
  CheckCircle2,
  Truck,
  Zap,
  Globe2,
  Loader2,
  Navigation,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

export function IndianPincodeChecker() {
  const {
    pincode,
    pincodeInfo,
    selectedPostOffice,
    setSelectedPostOffice,
    isPincodeLoading,
    updatePincode,
    detectCurrentLocation,
    isDetectingLocation,
  } = useCart();
  const { theme } = useTheme();
  const [inputVal, setInputVal] = useState(pincode || "");

  React.useEffect(() => {
    setInputVal(pincode || "");
  }, [pincode]);

  const handleInputChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 6);
    setInputVal(clean);
    if (clean.length === 6) {
      updatePincode(clean);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.length === 6) {
      updatePincode(inputVal);
    }
  };

  return (
    <div
      className={`border-y py-2.5 sm:py-3 px-3 sm:px-8 font-sans transition-colors duration-300 ${
        theme === "dark"
          ? "bg-zinc-900/90 border-zinc-800/80 text-white"
          : "bg-white border-zinc-200 text-zinc-900 shadow-xs"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 text-xs">
        {/* Left: Quick Label + Live Detected Location + Village/Post Selector */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
          <div
            className={`flex items-center gap-1 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] ${
              theme === "dark" ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-[#A3E635] shrink-0" />
            <span className="shrink-0">All India Delivery:</span>
          </div>

          {pincodeInfo && pincodeInfo.valid ? (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <div
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full border text-[10px] sm:text-[11px] max-w-full overflow-hidden ${
                  theme === "dark"
                    ? "bg-zinc-950 border-zinc-700/80 text-zinc-300"
                    : "bg-zinc-50 border-zinc-300 text-zinc-800 shadow-xs"
                }`}
              >
                <span className="flex items-center gap-1 text-emerald-600 dark:text-[#A3E635] font-black truncate">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">
                    {selectedPostOffice || pincodeInfo.area ? `${selectedPostOffice || pincodeInfo.area} (Post), ` : ""}
                    {pincodeInfo.district}, {pincodeInfo.state}
                  </span>
                </span>
                <span className="text-zinc-400">•</span>
                <span className="font-semibold flex items-center gap-1 shrink-0">
                  {pincodeInfo.isLocal ? (
                    <Zap className="w-3 h-3 text-[#A3E635]" />
                  ) : (
                    <Truck className="w-3 h-3 text-orange-500" />
                  )}
                  <span>{pincodeInfo.isLocal ? "Same-Day" : "2-4 Days"}</span>
                </span>
              </div>

              {pincodeInfo.postOffices && pincodeInfo.postOffices.length > 1 && (
                <select
                  value={selectedPostOffice}
                  onChange={(e) => setSelectedPostOffice(e.target.value)}
                  className={`px-2.5 py-1 rounded-full border text-[10px] sm:text-[11px] font-bold cursor-pointer outline-none ${
                    theme === "dark"
                      ? "bg-zinc-950 border-zinc-700 text-[#A3E635]"
                      : "bg-orange-50 border-orange-300 text-orange-800"
                  }`}
                >
                  {pincodeInfo.postOffices.map((po, idx) => (
                    <option key={`${po.name}-${idx}`} value={po.name} className="bg-white text-black">
                      📮 Gaon / Post: {po.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ) : (
            <span className={`text-[11px] ${theme === "dark" ? "text-zinc-400 font-medium" : "text-zinc-500 font-medium"}`}>
              Enter pincode to check dispatch speed:
            </span>
          )}
        </div>

        {/* Right: Compact Input Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-40">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter Pincode"
              maxLength={6}
              className={`w-full pl-3 pr-7 py-1.5 border rounded-xl text-xs font-bold tracking-wider focus:outline-none focus:border-[#A3E635] ${
                theme === "dark"
                  ? "bg-zinc-950 border-zinc-700 text-white placeholder-zinc-500"
                  : "bg-zinc-100 border-zinc-300 text-zinc-900 placeholder-zinc-400"
              }`}
            />
            {isPincodeLoading && (
              <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#A3E635] animate-spin" />
            )}
          </div>

          {/* 1-Tap GPS Auto-Detect Button */}
          <button
            type="button"
            title="Auto-detect my pincode via GPS"
            disabled={isDetectingLocation}
            onClick={async () => {
              const res = await detectCurrentLocation();
              if (!res || !res.valid) {
                alert("GPS permission was denied or unavailable. Please type your 6-digit PIN code.");
              }
            }}
            className={`p-1.5 border rounded-xl transition cursor-pointer shrink-0 ${
              theme === "dark"
                ? "bg-zinc-950 hover:bg-zinc-800 border-zinc-700 text-[#A3E635]"
                : "bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-600"
            }`}
          >
            {isDetectingLocation ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4" />
            )}
          </button>

          <button
            type="submit"
            disabled={inputVal.length !== 6 || isPincodeLoading}
            className="px-3.5 py-1.5 bg-[#A3E635] hover:bg-[#86efac] text-black font-black text-[11px] uppercase rounded-xl transition cursor-pointer disabled:opacity-40 shrink-0"
          >
            Check
          </button>
        </form>
      </div>
    </div>
  );
}
