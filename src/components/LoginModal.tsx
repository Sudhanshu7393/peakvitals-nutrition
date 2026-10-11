"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { SITE_CONFIG } from "@/data/config";
import { X, Smartphone, User, ArrowRight, ShieldCheck, MessageCircle } from "lucide-react";

export function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, userProfile, setUserProfile } = useCart();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  if (!isLoginModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, "");
    if (!name.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    setError("");
    const profile = {
      name: name.trim(),
      phone: cleanPhone,
    };
    setUserProfile(profile);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUserProfile(null);
    setName("");
    setPhone("");
    setIsLoginModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 border border-gray-200 text-gray-900 space-y-5">
        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {userProfile ? (
          /* Logged In View */
          <div className="text-center space-y-4 py-2">
            <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
              <User className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-black text-lg text-gray-900">Welcome, {userProfile.name}!</h3>
              <p className="text-xs text-gray-500 mt-0.5">+91 {userProfile.phone}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                Active Customer Profile ✅
              </span>
            </div>

            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                `Hello S.K Nutrition! 👋\n\nMy Name: *${userProfile.name}*\nMobile: *+91 ${userProfile.phone}*\n\nI want to check latest offers and stock on Peakvitals Pre-Workout!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase flex items-center justify-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp Support</span>
            </a>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs uppercase transition cursor-pointer"
            >
              Sign Out / Clear Details
            </button>
          </div>
        ) : (
          /* Direct Customer Sign In */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-orange-600 text-[11px] font-black uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Fast Customer Sign-In</span>
              </div>
              <h3 className="text-xl font-black text-gray-900 mt-1">Customer Details</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Enter your details for faster 1-click WhatsApp checkout &amp; order updates.
              </p>
            </div>

            {error && <p className="text-xs text-red-600 font-bold">{error}</p>}

            <div>
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 text-sm font-semibold text-gray-900 outline-none transition"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1">
                10-Digit WhatsApp / Mobile Number *
              </label>
              <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-orange-500 overflow-hidden">
                <span className="px-3 text-sm font-bold text-gray-500 border-r border-gray-200">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="98765 43210"
                  className="flex-1 px-3 py-2.5 text-sm font-bold text-gray-900 outline-none bg-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider transition shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Save &amp; Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Secure • Direct WhatsApp Order Updates</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
