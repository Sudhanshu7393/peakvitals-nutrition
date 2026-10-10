"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { SITE_CONFIG } from "@/data/config";
import { CustomerOrder } from "@/types";
import {
  X,
  ShieldCheck,
  Truck,
  MessageCircle,
  MapPin,
  Navigation,
  Loader2,
} from "lucide-react";

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discount,
    deliveryFee,
    cartTotal,
    clearCart,
    setActiveOrder,
    pincode: sharedPincode,
    pincodeInfo,
    selectedPostOffice,
    setSelectedPostOffice,
    isPincodeLoading,
    updatePincode,
    detectCurrentLocation,
    isDetectingLocation,
    userProfile,
  } = useCart();

  const [name, setName] = useState(userProfile ? userProfile.name : "");
  const [phone, setPhone] = useState(userProfile ? userProfile.phone : "");
  const [pincode, setPincode] = useState(sharedPincode || "232101");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("Mughalsarai, Uttar Pradesh");
  const paymentMethod = "whatsapp";
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (userProfile) {
      if (userProfile.name) setName(userProfile.name);
      if (userProfile.phone) setPhone(userProfile.phone);
    }
    if (sharedPincode) {
      setPincode(sharedPincode);
    }
  }, [userProfile, sharedPincode, isCheckoutOpen]);

  // When pincode info resolves, auto update the City/State
  React.useEffect(() => {
    if (pincodeInfo && pincodeInfo.valid) {
      const loc = pincodeInfo.district
        ? `${pincodeInfo.district}, ${pincodeInfo.state}`
        : pincodeInfo.formattedLocation;
      setCity(loc);
    }
  }, [pincodeInfo]);

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || pincode.length !== 6) {
      alert("Please fill in your Name, 10-digit Phone, 6-digit Pincode, and Delivery Address.");
      return;
    }

    setIsSubmitting(true);

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `SK-${randomSuffix}`;

    const newOrder: CustomerOrder = {
      orderId,
      customerName: name,
      customerPhone: phone,
      customerAddress: `${address}${landmark ? `, Near ${landmark}` : ""} (Post/Village: ${selectedPostOffice || pincodeInfo?.area || ""}, Pincode: ${pincode})`,
      landmark,
      city,
      pincode,
      paymentMethod,
      items: [...cart],
      subtotal,
      discount,
      deliveryFee,
      total: cartTotal,
      orderDate: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "confirmed",
    };

    setTimeout(() => {
      setActiveOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      setIsCheckoutOpen(false);

      let message = `🛒 *NEW ORDER - ${SITE_CONFIG.name}*\n`;
      message += `📍 *Ravi Nagar, Mughalsarai (Authorised Peakvitals Partner)*\n`;
      message += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `🆔 *Order ID:* #${orderId}\n`;
      message += `👤 *Customer Name:* ${name}\n`;
      message += `📞 *Phone Number:* ${phone}\n`;
      message += `🏠 *Delivery Address:* ${address}${landmark ? `, Near ${landmark}` : ""}\n`;
      if (selectedPostOffice) {
        message += `🏢 *Village / Post Office (डाकघर / गाँव):* ${selectedPostOffice}\n`;
      }
      message += `📍 *City / District:* ${city}\n`;
      message += `📮 *PIN Code:* ${pincode}\n`;
      message += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `📦 *ITEMS ORDERED:*\n`;
      newOrder.items.forEach((item, idx) => {
        message += `${idx + 1}️⃣ *${item.product.name}*\n`;
        message += `   • Flavour: ${item.flavor} | ${item.weight}\n`;
        message += `   • Qty: ${item.quantity} x ₹${item.price.toLocaleString("en-IN")} = ₹${(item.price * item.quantity).toLocaleString("en-IN")}\n\n`;
      });
      message += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `💰 *TOTAL PAYABLE: ₹${cartTotal.toLocaleString("en-IN")}*\n`;
      message += `🚚 *Delivery Status:* Direct Fast Dispatch via Express Courier\n`;
      message += `━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
      message += `📱 *PAYMENT & ORDER CONFIRMATION:*\n`;
      message += `Please share your official UPI QR Code / Payment details here so I can pay and confirm my order dispatch. Thank you!`;

      const waUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 text-gray-900 font-sans">
        {/* Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 text-orange-600 text-xs font-black uppercase tracking-wider">
              <Truck className="w-4 h-4" />
              <span>Fast Mughalsarai & Chandauli Dispatch</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
              Checkout & Delivery Details
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Enter delivery details for 100% Genuine Peakvitals Pre-Workout. We confirm details directly on WhatsApp & share our UPI QR code before dispatch.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98765 43210"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                    Delivery Pincode *
                  </label>
                  <button
                    type="button"
                    disabled={isDetectingLocation}
                    onClick={async () => {
                      const res = await detectCurrentLocation();
                      if (res && res.valid) {
                        setPincode(res.pincode);
                        const loc = res.district ? `${res.district}, ${res.state}` : res.formattedLocation;
                        setCity(loc);
                      } else {
                        alert("Could not detect GPS location. Please enter your 6-digit PIN code.");
                      }
                    }}
                    className="text-[11px] font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer disabled:opacity-60"
                  >
                    {isDetectingLocation ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Detecting...</span>
                      </>
                    ) : (
                      <>
                        <Navigation className="w-3 h-3" />
                        <span>Auto-Detect</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setPincode(val);
                      if (val.length === 6) {
                        updatePincode(val);
                      }
                    }}
                    placeholder="e.g. 221005"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-black text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                  {isPincodeLoading && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-orange-600 animate-pulse">
                      Checking Area...
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Live Detected Real Location & Village / Post Office Selector */}
            {pincodeInfo && pincodeInfo.valid && (
              <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200 text-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>Village / Post Office (गाँव / डाकघर) *</span>
                  </label>
                  {pincodeInfo.postOffices && pincodeInfo.postOffices.length > 1 && (
                    <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                      {pincodeInfo.postOffices.length} Places Found
                    </span>
                  )}
                </div>

                {/* If multiple Post Offices/Villages exist, show dropdown; otherwise show verified badge */}
                {pincodeInfo.postOffices && pincodeInfo.postOffices.length > 1 ? (
                  <div>
                    <select
                      value={selectedPostOffice}
                      onChange={(e) => setSelectedPostOffice(e.target.value)}
                      className="w-full bg-white border border-orange-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 cursor-pointer shadow-xs"
                    >
                      {pincodeInfo.postOffices.map((po, idx) => (
                        <option key={`${po.name}-${idx}`} value={po.name}>
                          {po.name} {po.branchType ? `(${po.branchType})` : ""} — {po.district}
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-gray-500 mt-1">
                      Choose your specific local post office or village branch.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-orange-200 font-bold text-gray-800">
                    <span className="truncate">
                      📮 Post Office: <strong>{selectedPostOffice || pincodeInfo.area || pincodeInfo.district}</strong>
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                      Verified ✅
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-gray-700 pt-1 border-t border-orange-200/60">
                  <span className="font-semibold text-gray-800">
                    📍 <strong>{pincodeInfo.district}</strong>, {pincodeInfo.state}
                  </span>
                  <span className="font-extrabold text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {pincodeInfo.isLocal ? "⚡ Same-Day Delivery" : "🚚 2-4 Days Express"}
                  </span>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1">
                Complete Delivery Address *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / Flat No., Street, Colony, Landmark"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1">
                  City / District *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Auto-detected from Pincode"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1">
                  Nearby Landmark
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Railway Station / Gym"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>

            {/* Direct WhatsApp Ordering Notice */}
            <div className="pt-2">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-black text-emerald-950 uppercase tracking-wide">
                    Direct WhatsApp Order &amp; UPI QR Deal
                  </p>
                  <p className="text-gray-600 mt-1 leading-relaxed">
                    Yeh order seedha hamare WhatsApp (<strong className="text-gray-800">9118732066</strong>) par jayega. Wahan hum aapko official UPI QR code bhejenge aur custom deal finalize karke fast courier dispatch karenge.
                  </p>
                </div>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Items ({cart.length})</span>
                <span className="font-bold text-gray-900">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Authenticity Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-200">
                <span>Total Payable</span>
                <span className="text-orange-600">₹{cartTotal}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Opening WhatsApp...</span>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Order on WhatsApp (₹{cartTotal}) • Get UPI QR</span>
                </>
              )}
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Store: {SITE_CONFIG.address} | Call/WhatsApp: {SITE_CONFIG.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
