"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { RotateCw, Sparkles, ChevronLeft, ChevronRight, Eye, ShieldCheck } from "lucide-react";
import { PEAKVITALS_BOX_INFO } from "@/data/peakvitalsProducts";

interface Jar360ViewerProps {
  initialSide?: number;
  showFloorRings?: boolean;
  className?: string;
}

export function Jar360Viewer({
  initialSide = 0,
  showFloorRings = true,
  className = "",
}: Jar360ViewerProps) {
  const [currentIdx, setCurrentIdx] = useState(initialSide);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const sides = PEAKVITALS_BOX_INFO.boxSidePhotos;
  const totalSides = sides.length;

  const nextSide = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % totalSides);
  }, [totalSides]);

  const prevSide = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + totalSides) % totalSides);
  }, [totalSides]);

  // Auto-rotation toggle
  useEffect(() => {
    if (isAutoRotate) {
      autoRotateIntervalRef.current = setInterval(() => {
        nextSide();
      }, 2200);
    } else if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
    }
    return () => {
      if (autoRotateIntervalRef.current) clearInterval(autoRotateIntervalRef.current);
    };
  }, [isAutoRotate, nextSide]);

  // Touch / Mouse Drag Rotation handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoRotate(false);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        prevSide();
      } else {
        nextSide();
      }
      startXRef.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoRotate(false);
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    if (Math.abs(deltaX) > 35) {
      if (deltaX > 0) {
        prevSide();
      } else {
        nextSide();
      }
      startXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const currentSide = sides[currentIdx];

  return (
    <div
      className={`relative w-full flex flex-col items-center select-none ${className}`}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 360 Interactive Stage Container */}
      <div
        className="relative w-full h-[270px] sm:h-[380px] lg:h-[430px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Soft Ambient Radial Spotlight */}
        <div className="absolute inset-0 bg-radial from-[#A3E635]/25 via-[#EA580C]/12 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* 3D Illuminated Floating Floor Pedestal */}
        {showFloorRings && (
          <>
            <div className="absolute bottom-4 sm:bottom-6 w-60 sm:w-80 h-14 bg-gradient-to-r from-[#A3E635]/25 via-[#EA580C]/35 to-[#A3E635]/25 rounded-full blur-xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-8 sm:bottom-10 w-52 sm:w-72 h-6 border border-[#A3E635]/50 rounded-full shadow-[0_0_25px_#A3E635] pointer-events-none" />
            <div className="absolute bottom-10 sm:bottom-12 w-44 sm:w-56 h-3 rounded-full blur-xs pointer-events-none bg-black/90" />
          </>
        )}

        {/* The 360 Packshot Image */}
        <div className="relative w-full h-full max-h-[360px] sm:max-h-[420px] flex items-center justify-center p-2 z-10 transition-transform duration-300">
          <img
            key={currentSide.id}
            src={currentSide.image}
            alt={currentSide.caption}
            className="w-full h-full object-contain filter drop-shadow-[0_22px_32px_rgba(0,0,0,0.95)] animate-in fade-in zoom-in-95 duration-200"
            draggable={false}
          />
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsAutoRotate(false);
            prevSide();
          }}
          className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-700/80 text-zinc-300 hover:text-white transition shadow-lg active:scale-90 cursor-pointer"
          title="Previous Angle"
          aria-label="Previous angle"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsAutoRotate(false);
            nextSide();
          }}
          className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-700/80 text-zinc-300 hover:text-white transition shadow-lg active:scale-90 cursor-pointer"
          title="Next Angle"
          aria-label="Next angle"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* 360 Badge & Auto-Rotate Toggle (Top Right) */}
        <div className="absolute top-2 right-2 sm:right-4 z-30 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsAutoRotate((prev) => !prev);
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition border cursor-pointer ${
              isAutoRotate
                ? "bg-[#A3E635] text-black border-[#A3E635] shadow-[0_0_12px_rgba(163,230,53,0.5)]"
                : "bg-zinc-950/90 text-zinc-300 border-zinc-700 hover:border-[#A3E635]"
            }`}
            title="Auto-rotate 360 jar"
          >
            <RotateCw className={`w-3 h-3 ${isAutoRotate ? "animate-spin" : ""}`} />
            <span>{isAutoRotate ? "360° SPINNING" : "AUTO 360°"}</span>
          </button>
        </div>

        {/* Drag Hint Overlay */}
        <div className="absolute bottom-1 right-2 sm:right-4 z-20 pointer-events-none text-[9px] sm:text-[10px] font-bold text-zinc-400 bg-black/60 px-2 py-0.5 rounded-md border border-zinc-800">
          ↔ Drag or click to rotate
        </div>
      </div>

      {/* Angle Selector Pills & Active Side Caption */}
      <div className="w-full space-y-2 mt-1 z-20">
        {/* 5 Side Thumbnails / Pills */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {sides.map((side, idx) => (
            <button
              key={side.id}
              onClick={() => {
                setIsAutoRotate(false);
                setCurrentIdx(idx);
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer border ${
                currentIdx === idx
                  ? "bg-[#A3E635] text-black border-[#A3E635] shadow-xs"
                  : "bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
              }`}
            >
              {idx + 1}. {side.label}
            </button>
          ))}
        </div>

        {/* Live Detail Badge of Active Side */}
        <div className="p-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800 text-center space-y-0.5">
          <div className="inline-flex items-center gap-1 text-[10px] font-black text-[#EA580C] uppercase tracking-wider">
            <Eye className="w-3 h-3 text-[#A3E635]" />
            <span>Angle {currentIdx + 1} of 5: {currentSide.label}</span>
          </div>
          <p className="text-[11px] sm:text-xs font-semibold text-zinc-200">
            {currentSide.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
