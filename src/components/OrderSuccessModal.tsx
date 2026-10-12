"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { SITE_CONFIG } from "@/data/config";
import {
  CheckCircle2,
  MapPin,
  MessageCircle,
  Truck,
  ArrowRight,
} from "lucide-react";

export const OrderSuccessModal: React.FC = () => {
  const { activeOrder, setActiveOrder } = useCart();

  if (!activeOrder) return null;

  const whatsAppConfirmUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `📦 *ORDER TRACKING & DISPATCH CONFIRMATION*\n` +
    `📍 *${SITE_CONFIG.name} - Official Brand Store*\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `Hello Peakvitals Team! 👋\n\n` +
    `I just placed an order on your website:\n` +
    `🆔 *Order ID:* #${activeOrder.orderId}\n` +
    `👤 *Name:* ${activeOrder.customerName}\n` +
    `🏠 *Delivery Address:* ${activeOrder.customerAddress}, ${activeOrder.city}${activeOrder.pincode ? ` (${activeOrder.pincode})` : ""}\n` +
    `💰 *Total Amount:* ₹${activeOrder.total.toLocaleString("en-IN")}\n` +
    `💳 *Payment Mode:* Direct WhatsApp Order & UPI QR Deal\n` +
    `📱 Please share your official UPI QR code here so I can complete payment and get dispatch tracking. Thank you!`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-gray-900 text-center space-y-6">
        {/* Animated Success Badge */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Order Confirmed
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3">
            Thank You, {activeOrder.customerName}!
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Your Peakvitals Pre-Workout order has been received at our Official Dispatch Desk.
          </p>
        </div>

        {/* Order Details Receipt Box */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-left space-y-3 text-xs">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Order ID</span>
              <span className="font-mono font-bold text-orange-600 text-sm">{activeOrder.orderId}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Total Amount</span>
              <span className="font-black text-gray-900 text-sm">₹{activeOrder.total}</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="flex items-start gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Delivery Address:</p>
              <p className="text-gray-600">
                {activeOrder.customerAddress}, {activeOrder.landmark && `${activeOrder.landmark}, `}
                {activeOrder.city}
              </p>
              <p className="text-gray-600">Mobile: {activeOrder.customerPhone}</p>
            </div>
          </div>

          {/* Items Summary */}
          <div className="pt-2 border-t border-gray-200">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
              Items Ordered:
            </span>
            <div className="space-y-1">
              {activeOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-700">
                  <span className="truncate pr-2">
                    {item.product.name} ({item.weight}) x{item.quantity}
                  </span>
                  <span className="font-bold text-gray-900 shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-emerald-700 border-t border-gray-200 text-[11px] font-semibold">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-600" /> Fast Express Dispatch
            </span>
            <span>All India Air Courier (2-4 Days)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <a
            href={whatsAppConfirmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Get Tracking on WhatsApp</span>
          </a>

          <button
            onClick={() => setActiveOrder(null)}
            className="w-full py-3 px-4 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
