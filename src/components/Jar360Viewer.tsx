"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Eye, RotateCw } from "lucide-react";
import { PEAKVITALS_BOX_INFO } from "@/data/peakvitalsProducts";

const TOTAL_FRAMES = 20;
const FRAMES = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = i < 10 ? `0${i}` : `${i}`;
  return `/images/jar_360_frames/frame_${num}.jpg`;
});

// Map 20 frames back to the 5 major sides (each side spans 4 frames)
const SIDE_INFO = [
  {
    side: 1,
    label: "Front Label",
    detail: "35 Servings • 1.5g L-Citrulline • 2g Arginine AKG • 195mg Caffeine • 2g Beta-Alanine",
  },
  {
    side: 2,
    label: "Nutrition Facts",
    detail: "Serving Size: 7g Scoop • 13 Clinical Active Ingredients • 8 Kcal per Serving",
  },
  {
    side: 3,
    label: "FSSAI & Certifications",
    detail: "Marketed By Peakvitals Pvt. Ltd. • FSSAI Lic. No. 12723999000427 • USA Imported Actives",
  },
  {
    side: 4,
    label: "Suggested Use & MRP",
    detail: "1 Scoop in 400ml Cold Water • Batch PVPW/02/26 • Official MRP ₹1,999 (Offer ₹1,199)",
  },
  {
    side: 5,
    label: "Key Benefits",
    detail: "Explosive Energy • Skin-Splitting Nitric Oxide Pump • Zero Crash Tunnel Focus",
  },
];

interface Jar360ViewerProps {
  showFloorRings?: boolean;
  className?: string;
}

export function Jar360Viewer({
  showFloorRings = true,
  className = "",
}: Jar360ViewerProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastXRef = useRef<number | null>(null);
  const accumulatedDeltaRef = useRef<number>(0);
  const autoSpinTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Preload all 20 frames into memory immediately
  useEffect(() => {
    FRAMES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Continuous Auto-Spin option
  useEffect(() => {
    if (isAutoSpin) {
      autoSpinTimerRef.current = setInterval(() => {
        setFrameIndex((prev) => (prev + 1) % TOTAL_FRAMES);
      }, 150);
    } else if (autoSpinTimerRef.current) {
      clearInterval(autoSpinTimerRef.current);
    }
    return () => {
      if (autoSpinTimerRef.current) clearInterval(autoSpinTimerRef.current);
    };
  }, [isAutoSpin]);

  // Smooth Cursor Move Rotation (Triggers seamlessly as cursor moves across the jar)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isAutoSpin) setIsAutoSpin(false);

    if (lastXRef.current === null) {
      lastXRef.current = e.clientX;
      return;
    }

    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    accumulatedDeltaRef.current += deltaX;

    // Every 14px of cursor movement shifts 1 frame smoothly
    const threshold = 14;
    if (Math.abs(accumulatedDeltaRef.current) >= threshold) {
      const stepCount = Math.trunc(accumulatedDeltaRef.current / threshold);
      accumulatedDeltaRef.current -= stepCount * threshold;

      setFrameIndex((prev) => {
        // Moving cursor right moves jar right, moving left moves left
        const next = (prev - stepCount) % TOTAL_FRAMES;
        return next < 0 ? next + TOTAL_FRAMES : next;
      });
    }
  }, [isAutoSpin]);

  const handleMouseLeave = () => {
    lastXRef.current = null;
    accumulatedDeltaRef.current = 0;
  };

  // Touch Swipe on mobile devices
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (isAutoSpin) setIsAutoSpin(false);

    const touchX = e.touches[0].clientX;
    if (lastXRef.current === null) {
      lastXRef.current = touchX;
      return;
    }

    const deltaX = touchX - lastXRef.current;
    lastXRef.current = touchX;
    accumulatedDeltaRef.current += deltaX;

    const threshold = 12;
    if (Math.abs(accumulatedDeltaRef.current) >= threshold) {
      const stepCount = Math.trunc(accumulatedDeltaRef.current / threshold);
      accumulatedDeltaRef.current -= stepCount * threshold;

      setFrameIndex((prev) => {
        const next = (prev - stepCount) % TOTAL_FRAMES;
        return next < 0 ? next + TOTAL_FRAMES : next;
      });
    }
  }, [isAutoSpin]);

  const handleTouchEnd = () => {
    lastXRef.current = null;
    accumulatedDeltaRef.current = 0;
  };

  // Determine current active side metadata
  const currentSideIdx = Math.floor(frameIndex / 4) % 5;
  const currentInfo = SIDE_INFO[currentSideIdx];

  // Quick jump to a specific side if clicked
  const handleSelectSide = (sideIdx: number) => {
    setIsAutoSpin(false);
    setFrameIndex(sideIdx * 4);
  };

  return (
    <div className={`relative w-full flex flex-col items-center select-none ${className}`}>
      {/* 360 Interactive Jar Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[280px] sm:h-[390px] lg:h-[440px] flex items-center justify-center cursor-ew-resize overflow-hidden rounded-2xl group"
      >
        {/* Soft Ambient Radial Spotlight */}
        <div className="absolute inset-0 bg-radial from-[#A3E635]/25 via-[#EA580C]/12 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* 3D Floor Glow Rings */}
        {showFloorRings && (
          <>
            <div className="absolute bottom-4 sm:bottom-6 w-60 sm:w-80 h-14 bg-gradient-to-r from-[#A3E635]/25 via-[#EA580C]/35 to-[#A3E635]/25 rounded-full blur-xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-8 sm:bottom-10 w-52 sm:w-72 h-6 border border-[#A3E635]/50 rounded-full shadow-[0_0_25px_#A3E635] pointer-events-none" />
            <div className="absolute bottom-10 sm:bottom-12 w-44 sm:w-56 h-3 rounded-full blur-xs pointer-events-none bg-black/90" />
          </>
        )}

        {/* Frame Preload + Active Frame Rendering */}
        <div className="relative w-full h-full max-h-[350px] sm:max-h-[410px] flex items-center justify-center p-2 z-10 pointer-events-none">
          <img
            src={FRAMES[frameIndex]}
            alt={`Peakvitals 360 Pre-Workout Frame ${frameIndex + 1}`}
            className="w-full h-full object-contain filter drop-shadow-[0_22px_32px_rgba(0,0,0,0.95)]"
            draggable={false}
          />
        </div>

        {/* Top Badges: 360° Indicator & Auto-spin toggle */}
        <div className="absolute top-2 left-2 z-30">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-[#A3E635]/50 text-[#A3E635] text-[9px] sm:text-[10px] font-black uppercase tracking-wider backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635] animate-ping" />
            360° Interactive View
          </span>
        </div>

        <div className="absolute top-2 right-2 z-30">
          <button
            onClick={() => setIsAutoSpin((prev) => !prev)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition border cursor-pointer backdrop-blur-xs ${
              isAutoSpin
                ? "bg-[#A3E635] text-black border-[#A3E635] shadow-[0_0_12px_rgba(163,230,53,0.5)]"
                : "bg-black/70 text-zinc-300 border-zinc-700 hover:border-[#A3E635]"
            }`}
            title="Auto Spin 360"
          >
            <RotateCw className={`w-3 h-3 ${isAutoSpin ? "animate-spin" : ""}`} />
            <span>{isAutoSpin ? "Spinning" : "Auto Spin"}</span>
          </button>
        </div>

        {/* Smooth 360 Progress Scrubber at Bottom of Jar */}
        <div className="absolute bottom-2 left-4 right-4 z-30 flex items-center justify-center gap-1 pointer-events-none">
          <div className="w-40 sm:w-52 h-1 bg-zinc-800/80 rounded-full overflow-hidden backdrop-blur-xs border border-zinc-700/60">
            <div
              className="h-full bg-gradient-to-r from-[#A3E635] to-[#EA580C] transition-all duration-75"
              style={{ width: `${((frameIndex + 1) / TOTAL_FRAMES) * 100}%` }}
            />
          </div>
          <span className="text-[9px] font-mono font-bold text-zinc-400 pl-1.5">
            {Math.round(((frameIndex + 1) / TOTAL_FRAMES) * 360)}°
          </span>
        </div>

        {/* Floating Move Cursor Hint */}
        <div className="absolute bottom-6 z-20 pointer-events-none text-[9px] sm:text-[10px] font-bold text-zinc-300 bg-black/75 px-3 py-1 rounded-full border border-zinc-800 backdrop-blur-xs opacity-90 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
          <span>⇄ Move cursor across jar to rotate 360°</span>
        </div>
      </div>

      {/* Live Label Detail Card of whatever side is currently facing front */}
      <div className="w-full mt-2.5 space-y-2 z-20">
        {/* 5 Quick Angle Jump Buttons */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {SIDE_INFO.map((info, idx) => (
            <button
              key={info.side}
              onClick={() => handleSelectSide(idx)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer border ${
                currentSideIdx === idx
                  ? "bg-[#A3E635] text-black border-[#A3E635] shadow-xs"
                  : "bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              {info.side}. {info.label}
            </button>
          ))}
        </div>

        {/* Live Detail Strip */}
        <div className="p-2.5 rounded-xl bg-zinc-950/95 border border-zinc-800 text-center space-y-0.5">
          <div className="inline-flex items-center gap-1 text-[10px] font-black text-[#EA580C] uppercase tracking-wider">
            <Eye className="w-3 h-3 text-[#A3E635]" />
            <span>Angle {currentInfo.side} of 5: {currentInfo.label}</span>
          </div>
          <p className="text-[11px] sm:text-xs font-semibold text-zinc-200">
            {currentInfo.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
