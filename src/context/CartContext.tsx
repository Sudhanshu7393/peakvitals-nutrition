"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, CustomerOrder } from "@/types";
import { SITE_CONFIG } from "@/data/config";
import { lookupIndianPincode, reverseGeocodeCoords, PincodeInfo } from "@/utils/pincodeService";

interface UserProfile {
  name: string;
  phone: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, flavor: string, weight: string, price: number, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  activeOrder: CustomerOrder | null;
  setActiveOrder: (order: CustomerOrder | null) => void;
  // Coupon
  appliedCoupon: string | null;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  // Shared Pincode & Real Location
  pincode: string;
  pincodeInfo: import("@/utils/pincodeService").PincodeInfo | null;
  selectedPostOffice: string;
  setSelectedPostOffice: (po: string) => void;
  isPincodeLoading: boolean;
  isDetectingLocation: boolean;
  setPincode: (pin: string) => void;
  updatePincode: (pin: string) => Promise<import("@/utils/pincodeService").PincodeInfo>;
  detectCurrentLocation: () => Promise<import("@/utils/pincodeService").PincodeInfo | null>;
  // Search & Filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategoryTab: string;
  setSelectedCategoryTab: (tab: string) => void;
  // User Login & Tracking
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isTrackOrderModalOpen: boolean;
  setIsTrackOrderModalOpen: (open: boolean) => void;
  generateWhatsAppOrderUrl: (order?: { name: string; phone: string; address: string; city: string }) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [activeOrder, setActiveOrder] = useState<CustomerOrder | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [pincode, setPincode] = useState("");
  const [pincodeInfo, setPincodeInfo] = useState<PincodeInfo | null>(null);
  const [selectedPostOffice, setSelectedPostOffice] = useState("");
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryTab, setSelectedCategoryTab] = useState("all");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTrackOrderModalOpen, setIsTrackOrderModalOpen] = useState(false);

  // Auto-fetch pincode details only if a 6-digit pincode is entered
  useEffect(() => {
    let active = true;
    if (pincode && pincode.length === 6) {
      setIsPincodeLoading(true);
      lookupIndianPincode(pincode).then((info) => {
        if (active) {
          setPincodeInfo(info);
          if (info.selectedPostOffice) {
            setSelectedPostOffice(info.selectedPostOffice);
          } else if (info.area) {
            setSelectedPostOffice(info.area);
          }
          setIsPincodeLoading(false);
        }
      });
    } else {
      setPincodeInfo(null);
      setSelectedPostOffice("");
      setIsPincodeLoading(false);
    }
    return () => {
      active = false;
    };
  }, [pincode]);

  const updatePincode = async (newPin: string) => {
    const clean = newPin.replace(/\D/g, "").slice(0, 6);
    setPincode(clean);
    if (clean.length === 6) {
      setIsPincodeLoading(true);
      const res = await lookupIndianPincode(clean);
      setPincodeInfo(res);
      if (res.selectedPostOffice) {
        setSelectedPostOffice(res.selectedPostOffice);
      } else if (res.area) {
        setSelectedPostOffice(res.area);
      }
      setIsPincodeLoading(false);
      return res;
    }
    return {
      pincode: clean,
      valid: false,
      area: "",
      district: "",
      state: "",
      formattedLocation: "",
      isLocal: false,
      deliveryTime: "",
      courierPartner: "",
      codAvailable: false,
      freeShippingAvailable: false,
      message: "Please enter a 6-digit Pincode",
    };
  };

  const detectCurrentLocation = async (): Promise<PincodeInfo | null> => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      return null;
    }

    setIsDetectingLocation(true);
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const info = await reverseGeocodeCoords(latitude, longitude);
            if (info && info.valid && info.pincode) {
              setPincode(info.pincode);
              setPincodeInfo(info);
              setIsDetectingLocation(false);
              resolve(info);
              return;
            }
          } catch (e) {
            console.error("GPS Reverse Geocoding Error:", e);
          }
          setIsDetectingLocation(false);
          resolve(null);
        },
        (err) => {
          console.warn("GPS Location access skipped/denied:", err.message);
          setIsDetectingLocation(false);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 7000, maximumAge: 30000 }
      );
    });
  };

  // Fresh reset on every site visit - no pre-filled or cached state
  useEffect(() => {
    try {
      localStorage.removeItem("sk_nutrition_cart");
      localStorage.removeItem("sk_nutrition_pin");
      localStorage.removeItem("sk_nutrition_user");
    } catch {
      // Ignore
    }
  }, []);

  const addToCart = (product: Product, flavor: string, weight: string, price: number, quantity: number = 1) => {
    const itemKey = `${product.id}-${flavor}-${weight}`;
    
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          flavor,
          weight,
          price,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === "PEAKVITALS5" || normalized === "NUTRABAY5" || normalized === "SK5") {
      setAppliedCoupon("PEAKVITALS5");
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // 5% coupon discount
  const couponDiscount = appliedCoupon && subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
  const discount = couponDiscount;
  
  const deliveryFee = subtotal >= SITE_CONFIG.freeDeliveryThreshold || subtotal === 0 ? 0 : 99;
  const cartTotal = Math.max(0, subtotal - discount + deliveryFee);

  const generateWhatsAppOrderUrl = (customerDetails?: { name: string; phone: string; address: string; city: string }) => {
    let message = `🛒 *NEW ORDER - ${SITE_CONFIG.name}*\n`;
    message += `📍 *Official Peakvitals Brand Store*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    if (cart.length === 0) {
      message += `Hello Peakvitals Team! 👋\n\n`;
      message += `I want to order *Peakvitals Nutrition Pre-Workout*.\n\n`;
      message += `🔥 *Flavours Available:* Green Apple | Tangy Orange | Twin Pack Combo | Triple Power Stack\n`;
      message += `💳 *Payment & Deal:* Direct WhatsApp Order (Please send UPI QR code)\n\n`;
      message += `Please confirm stock availability and fastest delivery time. Thank you!`;
    } else {
      message += `📦 *ORDER ITEMS:*\n`;
      cart.forEach((item, index) => {
        message += `${index + 1}️⃣ *${item.product.name}*\n`;
        message += `   • Flavour: ${item.flavor}\n`;
        message += `   • Pack: ${item.weight}\n`;
        message += `   • Qty: ${item.quantity} x ₹${item.price.toLocaleString("en-IN")} = ₹${(item.quantity * item.price).toLocaleString("en-IN")}\n\n`;
      });

      message += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `💵 *Subtotal:* ₹${subtotal.toLocaleString("en-IN")}\n`;
      if (discount > 0) message += `🎟️ *Coupon (${appliedCoupon}):* -₹${discount.toLocaleString("en-IN")}\n`;
      message += `🚚 *Delivery Fee:* ${deliveryFee === 0 ? "FREE (All India)" : `₹${deliveryFee}`}\n`;
      message += `💰 *TOTAL PAYABLE: ₹${cartTotal.toLocaleString("en-IN")}*\n`;
      message += `💳 *Payment Mode:* Direct WhatsApp Order & UPI QR Deal\n`;
      message += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

      if (customerDetails) {
        message += `📍 *DELIVERY DETAILS:*\n`;
        message += `👤 *Name:* ${customerDetails.name}\n`;
        message += `📞 *Phone:* ${customerDetails.phone}\n`;
        message += `🏠 *Address:* ${customerDetails.address}, ${customerDetails.city}\n`;
        message += `📮 *PIN Code:* ${pincode || "232101"}\n`;
        message += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      }
      message += `\n📱 Please share your official UPI QR code here so I can pay and confirm dispatch. Thank you!`;
    }

    return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discount,
        deliveryFee,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        activeOrder,
        setActiveOrder,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        pincode,
        pincodeInfo,
        selectedPostOffice,
        setSelectedPostOffice,
        isPincodeLoading,
        isDetectingLocation,
        setPincode,
        updatePincode,
        detectCurrentLocation,
        searchQuery,
        setSearchQuery,
        selectedCategoryTab,
        setSelectedCategoryTab,
        userProfile,
        setUserProfile,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isTrackOrderModalOpen,
        setIsTrackOrderModalOpen,
        generateWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
