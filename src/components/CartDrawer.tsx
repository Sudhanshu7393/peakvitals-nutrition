"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  Truck,
  ArrowRight,
  ShieldCheck,
  Gift,
  Tag,
  Check,
  MapPin,
} from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    deliveryFee,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    generateWhatsAppOrderUrl,
    pincode,
    pincodeInfo,
    selectedPostOffice,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ text: string; success: boolean } | null>(null);

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 999;
  const freeGiftThreshold = 2499;

  const freeDeliveryShortfall = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeGiftShortfall = Math.max(0, freeGiftThreshold - subtotal);
  const deliveryProgressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const ok = applyCoupon(couponInput);
    if (ok) {
      setCouponMessage({ text: "Coupon PEAKVITALS5 applied! You saved 5%", success: true });
      setCouponInput("");
    } else {
      setCouponMessage({ text: "Invalid coupon. Use code: PEAKVITALS5", success: false });
    }
    setTimeout(() => setCouponMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-gray-200 text-gray-900 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              <h2 className="font-extrabold text-base text-gray-900">
                Shopping Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full bg-white hover:bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Milestone Incentive Bar */}
          <div className="px-5 py-3.5 bg-orange-50/40 border-b border-gray-200 text-xs">
            {freeDeliveryShortfall > 0 ? (
              <div>
                <p className="text-gray-600 font-medium flex items-center justify-between">
                  <span>Add <strong className="text-orange-600">₹{freeDeliveryShortfall}</strong> more for <strong className="text-emerald-600">FREE SHIPPING</strong></span>
                  <Truck className="w-4 h-4 text-orange-500" />
                </p>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-orange-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${deliveryProgressPercent}%` }}
                  />
                </div>
              </div>
            ) : freeGiftShortfall > 0 ? (
              <div className="flex items-center justify-between text-orange-700 font-bold">
                <span className="flex items-center gap-1.5">
                  <Gift className="w-4 h-4" /> Add ₹{freeGiftShortfall} more for FREE Peakvitals Shaker!
                </span>
                <span className="text-[10px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">Reward</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <Truck className="w-4 h-4" />
                <span>You unlocked FREE Delivery &amp; Peakvitals Shaker Bottle! 🎉</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Your bag is empty</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs">
                    Explore Peakvitals Pre-Workout flavours and combos.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase shadow-xs transition"
                >
                  Explore Flavours
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex gap-3 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain p-1.5 rounded-xl bg-gradient-to-b from-zinc-950 to-zinc-900 shrink-0 border border-zinc-800 shadow-inner"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {item.weight} • {item.flavor}
                    </p>
                    <p className="text-xs font-black text-orange-600 mt-1">
                      ₹{item.price * item.quantity}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-gray-300 rounded-full bg-white px-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-500 hover:text-black cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 py-0.5 text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-500 hover:text-black cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1 text-xs transition-colors ml-auto cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50/80 space-y-3">
              {/* Working Coupon Code Box */}
              <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-800 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-orange-500" /> Apply Coupon
                  </span>
                  {appliedCoupon ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      <Check className="w-3 h-3 text-emerald-600" /> {appliedCoupon} applied (-5%)
                      <button onClick={removeCoupon} className="text-gray-400 hover:text-red-600 ml-1">×</button>
                    </span>
                  ) : (
                    <button
                      onClick={() => applyCoupon("PEAKVITALS5")}
                      className="text-[10px] text-orange-600 font-bold hover:underline"
                    >
                      Use PEAKVITALS5
                    </button>
                  )}
                </div>

                {!appliedCoupon && (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Enter PEAKVITALS5"
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-bold uppercase outline-none focus:border-orange-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponMessage && (
                  <p className={`text-[10px] font-bold ${couponMessage.success ? "text-emerald-600" : "text-red-600"}`}>
                    {couponMessage.text}
                  </p>
                )}
              </div>

              {/* Real Delivering Location & All India Status */}
              <div className="p-2.5 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Delivering To:</p>
                    <p className="font-bold text-gray-900 truncate text-[11px]">
                      {pincodeInfo && pincodeInfo.valid
                        ? `${selectedPostOffice || pincodeInfo.area ? (selectedPostOffice || pincodeInfo.area) + " (Post), " : ""}${pincodeInfo.district}, ${pincodeInfo.state}`
                        : pincode
                        ? `PIN: ${pincode} (All India)`
                        : "Enter PIN at Checkout (All India Express)"}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                  All India ✅
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount ({appliedCoupon})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Local Delivery</span>
                  <span className="font-bold text-gray-900">
                    {deliveryFee === 0 ? <span className="text-emerald-600">FREE</span> : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Payable</span>
                  <span className="text-orange-600">₹{cartTotal}</span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Enter Address &amp; Order on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <a
                  href={generateWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp Order (Fast QR Deal)</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Genuine Direct Supply • WhatsApp Order &amp; UPI QR Deal</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
