"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PeakvitalsLogo } from "@/components/PeakvitalsLogo";
import { PeakvitalsProduct } from "@/data/peakvitalsProducts";
import defaultStoreData from "@/data/store-data.json";
import { useCart, LOCAL_STORE_CACHE_KEY, LiveStoreConfig } from "@/context/CartContext";
import {
  Lock,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  CheckCircle2,
  Upload,
  Package,
  Settings,
  Cloud,
  RotateCcw,
  ExternalLink,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

const SESSION_AUTH_KEY = "peakvitals_admin_authed";
const GITHUB_TOKEN_STORAGE_KEY = "peakvitals_admin_gh_token";

export default function AdminDashboardPage() {
  const { refreshStoreData } = useCart();

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Store Data state
  const [products, setProducts] = useState<PeakvitalsProduct[]>(
    defaultStoreData.products as PeakvitalsProduct[]
  );
  const [storeConfig, setStoreConfig] = useState<LiveStoreConfig>(
    defaultStoreData.storeConfig as LiveStoreConfig
  );
  const [githubToken, setGithubToken] = useState("");

  // UI state
  const [activeTab, setActiveTab] = useState<"products" | "settings" | "cloud">("products");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "warning" | "error";
    text: string;
  } | null>(null);

  // Load initial store data & check session
  useEffect(() => {
    try {
      const savedPass = sessionStorage.getItem(SESSION_AUTH_KEY);
      if (savedPass) {
        setPasswordInput(savedPass);
        setIsAuthenticated(true);
      }
      const savedGhToken = localStorage.getItem(GITHUB_TOKEN_STORAGE_KEY);
      if (savedGhToken) {
        setGithubToken(savedGhToken);
      }
    } catch {
      // Ignore
    }

    async function loadLatest() {
      try {
        let localCached: typeof defaultStoreData | null = null;
        const raw = localStorage.getItem(LOCAL_STORE_CACHE_KEY);
        if (raw) {
          localCached = JSON.parse(raw);
        }

        const res = await fetch("/api/store", { cache: "no-store" });
        if (res.ok) {
          const serverData = await res.json();
          const sTime = new Date(serverData?.updatedAt || 0).getTime();
          const lTime = new Date(localCached?.updatedAt || 0).getTime();
          const chosen = lTime > sTime && localCached ? localCached : serverData;
          if (chosen?.products) setProducts(chosen.products);
          if (chosen?.storeConfig) setStoreConfig(chosen.storeConfig);
        } else if (localCached) {
          if (localCached.products) setProducts(localCached.products);
          if (localCached.storeConfig) setStoreConfig(localCached.storeConfig);
        }
      } catch {
        // Keep defaults
      }
    }
    loadLatest();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password: passwordInput.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem(SESSION_AUTH_KEY, passwordInput.trim());
      } else {
        setAuthError(data.error || "Incorrect Admin Password");
      }
    } catch {
      if (passwordInput.trim() === "Peakvitals@2026") {
        setIsAuthenticated(true);
        sessionStorage.setItem(SESSION_AUTH_KEY, passwordInput.trim());
      } else {
        setAuthError("Incorrect Admin Password");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  // Update a product field
  const updateProduct = (index: number, patch: Partial<PeakvitalsProduct>) => {
    setProducts((prev) =>
      prev.map((item, idx) => {
        if (idx !== index) return item;
        const updated = { ...item, ...patch };
        if (patch.numericPrice !== undefined) {
          const num = Number(patch.numericPrice) || 0;
          updated.numericPrice = num;
          updated.price = `₹${num.toLocaleString("en-IN")}`;
          updated.numericOriginalPrice = num;
          updated.originalPrice = `₹${num.toLocaleString("en-IN")}`;
        }
        return updated;
      })
    );
  };

  const updateProductHighlight = (
    index: number,
    key: keyof PeakvitalsProduct["highlights"],
    value: string
  ) => {
    setProducts((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? {
              ...item,
              highlights: {
                ...item.highlights,
                [key]: value,
              },
            }
          : item
      )
    );
  };

  // Compress & convert uploaded image to Data URL
  const handleImageUpload = (index: number, file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 650;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL("image/png", 0.9);
          updateProduct(index, { image: dataUrl });
        }
      };
      if (typeof ev.target?.result === "string") {
        img.src = ev.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  // Add a new product
  const handleAddNewProduct = () => {
    const newId = `peakvitals-product-${Date.now().toString().slice(-5)}`;
    const newProd: PeakvitalsProduct = {
      id: newId,
      name: "PEAKVITALS PRE-WORKOUT - NEW FLAVOUR",
      flavor: "New Flavour",
      servings: "35 Servings",
      weight: "250g",
      price: "₹1,199",
      numericPrice: 1199,
      originalPrice: "₹1,999",
      numericOriginalPrice: 1999,
      discountBadge: "40% OFF",
      inStock: true,
      image: "/images/peakvitals_trans/green_apple_v2.png",
      tagline: "Be The Boss of Your Workout - Official Peakvitals Supply",
      highlights: {
        caffeine: "195mg Natural Caffeine",
        citrulline: "1.5g L-Citrulline Malate",
        arginine: "2g Arginine AKG",
        betaAlanine: "2g Beta-Alanine",
      },
    };
    setProducts((prev) => [...prev, newProd]);
    setSaveStatus({
      type: "warning",
      text: "New product card added below! Edit its details and click 'Save & Publish Changes'.",
    });
  };

  const handleDeleteProduct = (index: number) => {
    if (products.length <= 1) {
      alert("At least 1 product must remain in the store catalog.");
      return;
    }
    const target = products[index];
    if (window.confirm(`Remove "${target.name}" from the website?`)) {
      setProducts((prev) => prev.filter((_, idx) => idx !== index));
    }
  };

  // Save & publish changes
  const handleSaveStore = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    const payload = {
      updatedAt: new Date().toISOString(),
      storeConfig: {
        ...storeConfig,
        heroPriceDisplay: products[0]?.price || storeConfig.heroPriceDisplay || "₹1,999",
      },
      products,
    };

    try {
      // 1. Save in browser localStorage immediately
      localStorage.setItem(LOCAL_STORE_CACHE_KEY, JSON.stringify(payload));
      if (githubToken.trim()) {
        localStorage.setItem(GITHUB_TOKEN_STORAGE_KEY, githubToken.trim());
      }

      // 2. Save to /api/store (writes to disk / serverless cache / GitHub repo)
      const res = await fetch("/api/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: passwordInput.trim() || sessionStorage.getItem(SESSION_AUTH_KEY) || "Peakvitals@2026",
          storeData: payload,
          githubToken: githubToken.trim(),
        }),
      });

      const data = await res.json();
      await refreshStoreData();

      if (res.ok && data.ok) {
        const extraMsg = data.savedGithub
          ? " & Auto-Committed to GitHub Live!"
          : data.savedLocal
          ? " & Saved to Server File!"
          : " & Published to Store Cache!";
        setSaveStatus({
          type: "success",
          text: `All changes saved successfully${extraMsg}`,
        });
      } else {
        setSaveStatus({
          type: "warning",
          text: data.error || "Saved locally in browser, but server returned a warning.",
        });
      }
    } catch {
      await refreshStoreData();
      setSaveStatus({
        type: "success",
        text: "Changes saved to browser store cache!",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    if (
      !window.confirm(
        "Reset all products and prices back to the original Peakvitals Box Defaults (Green Apple & Tangy Orange @ ₹1,999)?"
      )
    ) {
      return;
    }
    localStorage.removeItem(LOCAL_STORE_CACHE_KEY);
    setProducts(defaultStoreData.products as PeakvitalsProduct[]);
    setStoreConfig(defaultStoreData.storeConfig as LiveStoreConfig);

    await fetch("/api/store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: passwordInput.trim() || sessionStorage.getItem(SESSION_AUTH_KEY) || "Peakvitals@2026",
        storeData: defaultStoreData,
        githubToken: githubToken.trim(),
      }),
    });
    await refreshStoreData();
    setSaveStatus({
      type: "success",
      text: "Store restored to official box defaults (₹1,999)!",
    });
  };

  // ============================================================================
  // 1. LOGIN SCREEN
  // ============================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07080A] text-white flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col items-center text-center space-y-2">
            <PeakvitalsLogo forceDark size="lg" />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-[#A3E635] text-[10px] font-black uppercase tracking-widest mt-2">
              <Lock className="w-3 h-3" /> Official Brand Admin Panel
            </span>
            <p className="text-xs text-zinc-400">
              Manage Peakvitals products, box prices, stock availability &amp; contact details.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-300 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter Admin Password..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:border-[#A3E635] outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-[#A3E635] hover:bg-[#86efac] text-black font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-lg"
            >
              {isLoggingIn ? "Verifying..." : "Login to Admin Dashboard"}
            </button>
          </form>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
            <Link href="/" className="hover:text-[#A3E635] flex items-center gap-1 font-bold">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
            </Link>
            <span className="text-[11px] text-zinc-500">Peakvitals Pvt. Ltd.</span>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#07080A] text-white font-sans pb-20">
      {/* Top Sticky Admin Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0B0E]/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <PeakvitalsLogo forceDark size="sm" />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#A3E635]/15 border border-[#A3E635]/40 text-[#A3E635] text-[10px] font-black uppercase tracking-wider">
              Store Admin Manager
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-200 flex items-center gap-1.5 transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>View Live Store</span>
            </Link>

            <button
              onClick={handleResetDefaults}
              className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
              title="Reset to Default Box Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Defaults</span>
            </button>

            <button
              onClick={handleSaveStore}
              disabled={isSaving}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#A3E635] hover:bg-[#86efac] text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer active:scale-95 transition"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save & Publish"}</span>
            </button>

            <button
              onClick={handleLogout}
              className="text-[11px] font-bold text-zinc-500 hover:text-red-400 pl-1 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Status Toast Banner */}
        {saveStatus && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-bold ${
              saveStatus.type === "success"
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                : saveStatus.type === "warning"
                ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                : "bg-red-500/15 border-red-500/40 text-red-300"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-[#A3E635]" />
              <span>{saveStatus.text}</span>
            </div>
            <Link
              href="/"
              className="px-3 py-1 rounded-lg bg-black/50 hover:bg-black text-[#A3E635] text-xs font-black uppercase shrink-0"
            >
              Check Live Page →
            </Link>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition cursor-pointer ${
                activeTab === "products"
                  ? "bg-[#EA580C] text-white shadow-md"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>1. Products, Prices &amp; Stock ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition cursor-pointer ${
                activeTab === "settings"
                  ? "bg-[#EA580C] text-white shadow-md"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>2. Box Batch, Phone &amp; Email</span>
            </button>

            <button
              onClick={() => setActiveTab("cloud")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition cursor-pointer ${
                activeTab === "cloud"
                  ? "bg-[#EA580C] text-white shadow-md"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              <Cloud className="w-4 h-4" />
              <span>3. GitHub / Vercel Cloud Auto-Sync</span>
            </button>
          </div>

          {activeTab === "products" && (
            <button
              onClick={handleAddNewProduct}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-[#A3E635]/50 text-[#A3E635] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product / Flavour</span>
            </button>
          )}
        </div>

        {/* =================================================================== */}
        {/* TAB 1: PRODUCTS, PRICES & STOCK MANAGER */}
        {/* =================================================================== */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {products.map((prod, idx) => (
                <div
                  key={prod.id}
                  className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xl"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#A3E635] text-black font-black text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h3 className="font-black text-sm sm:text-base text-white uppercase truncate max-w-[240px] sm:max-w-xs">
                        {prod.flavor || prod.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* In Stock Toggle */}
                      <button
                        type="button"
                        onClick={() => updateProduct(idx, { inStock: !prod.inStock })}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider cursor-pointer transition ${
                          prod.inStock
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-red-500/20 text-red-400 border border-red-500/40"
                        }`}
                      >
                        {prod.inStock ? "🟢 In Stock" : "🔴 Out of Stock"}
                      </button>

                      {/* Delete Product */}
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(idx)}
                        className="p-1.5 rounded-lg bg-zinc-950 hover:bg-red-950/60 text-zinc-400 hover:text-red-400 border border-zinc-800 transition cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Image Preview & Upload Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800">
                    <div className="sm:col-span-4 h-36 rounded-xl bg-black border border-zinc-800 flex items-center justify-center p-2 relative overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="sm:col-span-8 space-y-2.5">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400">
                        Product Image (Select Studio Jar or Upload Photo)
                      </label>

                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            updateProduct(idx, {
                              image: "/images/peakvitals_trans/green_apple_v2.png",
                            })
                          }
                          className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-[10px] font-bold text-[#A3E635] cursor-pointer"
                        >
                          🍏 Green Apple Jar
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateProduct(idx, {
                              image: "/images/peakvitals_trans/tangy_orange_v2.png",
                            })
                          }
                          className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-[10px] font-bold text-[#EA580C] cursor-pointer"
                        >
                          🍊 Tangy Orange Jar
                        </button>
                        <label className="px-2.5 py-1 rounded-lg bg-[#A3E635] hover:bg-[#86efac] text-black text-[10px] font-black uppercase flex items-center gap-1 cursor-pointer">
                          <Upload className="w-3 h-3" />
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(idx, e.target.files?.[0])}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <input
                        type="text"
                        value={prod.image.startsWith("data:") ? "(Custom Uploaded Image)" : prod.image}
                        onChange={(e) => {
                          if (!e.target.value.startsWith("(Custom")) {
                            updateProduct(idx, { image: e.target.value });
                          }
                        }}
                        placeholder="Or paste image URL..."
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 outline-none focus:border-[#A3E635]"
                      />
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                        Product Full Title
                      </label>
                      <input
                        type="text"
                        value={prod.name}
                        onChange={(e) => updateProduct(idx, { name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm font-bold text-white focus:border-[#A3E635] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                        Flavour Name
                      </label>
                      <input
                        type="text"
                        value={prod.flavor}
                        onChange={(e) => updateProduct(idx, { flavor: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white focus:border-[#A3E635] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-[#A3E635] mb-1">
                        Box Price / MRP (in ₹)
                      </label>
                      <input
                        type="number"
                        value={prod.numericPrice}
                        onChange={(e) =>
                          updateProduct(idx, { numericPrice: Number(e.target.value) })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-[#A3E635]/50 text-sm font-black text-[#A3E635] focus:border-[#A3E635] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                        Net Weight (e.g. 250g)
                      </label>
                      <input
                        type="text"
                        value={prod.weight}
                        onChange={(e) => updateProduct(idx, { weight: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white focus:border-[#A3E635] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                        Servings (e.g. 35 Servings)
                      </label>
                      <input
                        type="text"
                        value={prod.servings}
                        onChange={(e) => updateProduct(idx, { servings: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white focus:border-[#A3E635] outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                        Subtitle / Tagline
                      </label>
                      <input
                        type="text"
                        value={prod.tagline}
                        onChange={(e) => updateProduct(idx, { tagline: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 focus:border-[#A3E635] outline-none"
                      />
                    </div>
                  </div>

                  {/* 4 Key Ingredient Highlights */}
                  <div className="pt-2 border-t border-zinc-800">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-2">
                      Key Ingredient Callouts on Card:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={prod.highlights?.citrulline || ""}
                        onChange={(e) =>
                          updateProductHighlight(idx, "citrulline", e.target.value)
                        }
                        placeholder="1.5g L-Citrulline Malate"
                        className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300"
                      />
                      <input
                        type="text"
                        value={prod.highlights?.arginine || ""}
                        onChange={(e) =>
                          updateProductHighlight(idx, "arginine", e.target.value)
                        }
                        placeholder="2g Arginine AKG"
                        className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300"
                      />
                      <input
                        type="text"
                        value={prod.highlights?.caffeine || ""}
                        onChange={(e) =>
                          updateProductHighlight(idx, "caffeine", e.target.value)
                        }
                        placeholder="195mg Natural Caffeine"
                        className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300"
                      />
                      <input
                        type="text"
                        value={prod.highlights?.betaAlanine || ""}
                        onChange={(e) =>
                          updateProductHighlight(idx, "betaAlanine", e.target.value)
                        }
                        placeholder="2g Beta-Alanine"
                        className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: BOX BATCH, PHONE & EMAIL SETTINGS */}
        {/* =================================================================== */}
        {activeTab === "settings" && (
          <div className="max-w-3xl bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-black uppercase tracking-tight text-white border-b border-zinc-800 pb-3">
              Official Contact, Batch &amp; Regulatory Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                  Display Phone Number
                </label>
                <input
                  type="text"
                  value={storeConfig.phone}
                  onChange={(e) =>
                    setStoreConfig({ ...storeConfig, phone: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-bold text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#A3E635] mb-1">
                  WhatsApp Order Number (with 91)
                </label>
                <input
                  type="text"
                  value={storeConfig.whatsappNumber}
                  onChange={(e) =>
                    setStoreConfig({ ...storeConfig, whatsappNumber: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-bold text-[#A3E635]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                  Official Support Email
                </label>
                <input
                  type="email"
                  value={storeConfig.email}
                  onChange={(e) =>
                    setStoreConfig({ ...storeConfig, email: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-bold text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                  Support Hours
                </label>
                <input
                  type="text"
                  value={storeConfig.hours}
                  onChange={(e) =>
                    setStoreConfig({ ...storeConfig, hours: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-bold text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                  Batch Number (Printed on Tub)
                </label>
                <input
                  type="text"
                  value={storeConfig.batchNo}
                  onChange={(e) =>
                    setStoreConfig({ ...storeConfig, batchNo: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-mono font-bold text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                  Manufacturing Date (MFD)
                </label>
                <input
                  type="text"
                  value={storeConfig.mfd}
                  onChange={(e) =>
                    setStoreConfig({ ...storeConfig, mfd: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-bold text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                  FSSAI License Number
                </label>
                <input
                  type="text"
                  value={storeConfig.fssaiLicNo}
                  onChange={(e) =>
                    setStoreConfig({ ...storeConfig, fssaiLicNo: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-mono font-bold text-[#A3E635]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-zinc-400 mb-1">
                  Marketed By Company Name
                </label>
                <input
                  type="text"
                  value={storeConfig.marketedBy}
                  onChange={(e) =>
                    setStoreConfig({ ...storeConfig, marketedBy: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-bold text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: CLOUD AUTO-SYNC (GITHUB / VERCEL) */}
        {/* =================================================================== */}
        {activeTab === "cloud" && (
          <div className="max-w-2xl bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <h3 className="text-lg font-black uppercase tracking-tight text-white border-b border-zinc-800 pb-3">
              Permanent GitHub &amp; Vercel Auto-Deploy Setup
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              When you click <strong>&ldquo;Save &amp; Publish&rdquo;</strong>, changes are saved immediately to the active server. If the website is hosted on <strong>Vercel</strong> and you want every Admin Panel change to also auto-commit permanently to your GitHub repository (<code>Sudhanshu7393/peakvitals-nutrition</code>), paste a GitHub Personal Access Token below once (or add <code>GITHUB_TOKEN</code> in Vercel Environment Variables).
            </p>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-[#A3E635] mb-1.5">
                GitHub Personal Access Token (Optional — For Vercel Auto-Commit)
              </label>
              <input
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm font-mono text-white focus:border-[#A3E635] outline-none"
              />
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 space-y-1.5">
              <p className="font-bold text-white">How to generate a GitHub Token (1-time setup):</p>
              <p>1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens (Tokens Classic).</p>
              <p>2. Generate a new token with the <code>repo</code> checkbox ticked.</p>
              <p>3. Paste it above (or in Vercel Project Settings → Environment Variables as <code>GITHUB_TOKEN</code>).</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
