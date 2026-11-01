"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, MessageCircle, X } from "lucide-react";

const GROK_MESSAGES = [
  "Grokking Daksh's 1,600+ commits...",
  "Sonaura 2.0: <1.8ms Web Audio latency!",
  "HydroWatch: Sentinel-2 SAR digital twin active.",
  "ITM Skills University: 9.57 CGPA verified.",
  "Contradiction-MCP: Autonomous consistency.",
  "DevSecOps: 0 leaked credentials detected.",
];

export function GrokBotMascot() {
  const [mounted, setMounted] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const [isWinking, setIsWinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const botRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Eye tracking cursor
    const handleMouseMove = (e: MouseEvent) => {
      if (!botRef.current) return;
      const rect = botRef.current.getBoundingClientRect();
      const botCenterX = rect.left + rect.width / 2;
      const botCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - botCenterX;
      const deltaY = e.clientY - botCenterY;
      const angle = Math.atan2(deltaY, deltaX);
      const dist = Math.min(Math.hypot(deltaX, deltaY) / 25, 4.5);

      setEyeOffset({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      });
    };

    // Auto-blink interval
    const blinkInterval = setInterval(() => {
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 240);
    }, 4200);

    // Auto-cycle speech bubble every 7 seconds
    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % GROK_MESSAGES.length);
    }, 7000);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      clearInterval(blinkInterval);
      clearInterval(msgInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    setIsWinking(true);
    setMsgIndex((prev) => (prev + 1) % GROK_MESSAGES.length);
    setShowBubble(true);
    setTimeout(() => setIsWinking(false), 350);
  };

  if (!mounted) return null;

  return (
    <div
      ref={botRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none pointer-events-auto"
      style={{
        animation: "grok-float 4.2s ease-in-out infinite",
      }}
    >
      {/* Dynamic Speech Bubble */}
      {showBubble && (
        <div
          onClick={() => setMsgIndex((prev) => (prev + 1) % GROK_MESSAGES.length)}
          className="mb-2.5 max-w-[210px] rounded-2xl border border-border/80 bg-background/95 px-3 py-2 text-[11px] font-mono leading-snug text-foreground shadow-lg backdrop-blur-md cursor-pointer transition-all hover:scale-105 group"
        >
          <div className="flex items-center justify-between gap-1 mb-1 border-b border-border/40 pb-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-foreground/60" />
              <span>Grok Bot</span>
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
              className="text-muted-foreground hover:text-foreground p-0.5"
              title="Dismiss"
            >
              <X className="size-2.5" />
            </button>
          </div>
          <p className="text-foreground font-medium">{GROK_MESSAGES[msgIndex]}</p>
        </div>
      )}

      {/* The Grok Mascot Orb Body */}
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative cursor-pointer"
        title="Grok Bot Companion — Click me!"
      >
        {/* Soft Ambient Glow Halo */}
        <div className="pointer-events-none absolute -inset-2 rounded-full bg-foreground/5 blur-md transition-opacity duration-300 group-hover:opacity-100" />

        {/* Circular Robotic Chassis */}
        <div className="relative flex size-14 items-center justify-center rounded-full border border-foreground/15 bg-background shadow-[0_8px_24px_rgba(0,0,0,0.22),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-transform duration-300 ease-out group-hover:scale-110">
          {/* Subtle Outer Metal Ring */}
          <div className="absolute inset-0.5 rounded-full border border-border/60 bg-gradient-to-b from-secondary/80 to-secondary/30" />

          {/* Visor Screen */}
          <div className="relative flex size-10 items-center justify-center rounded-full bg-neutral-950 shadow-inner overflow-hidden border border-neutral-800">
            {/* Grok Screen Grid Line */}
            <div className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]" />

            {/* Expressive Capsule Digital Eyes */}
            <div
              className="flex items-center gap-1.5 transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
              }}
            >
              {/* Left Eye */}
              <div
                className={`rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] transition-all duration-150 ${
                  isWinking ? "h-0.5 w-2" : "h-2.5 w-1.5"
                }`}
              />

              {/* Right Eye */}
              <div
                className={`rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] transition-all duration-150 ${
                  isWinking ? "h-2.5 w-1.5" : "h-2.5 w-1.5"
                }`}
              />
            </div>
          </div>

          {/* Little Floating Antenna / Halo Top Pip */}
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-1.5 rounded-full bg-foreground/80 shadow-xs border border-background" />

          {/* Small Status Indicator Pip */}
          <span className="absolute -bottom-0.5 right-1 size-2 rounded-full bg-foreground border border-background" />
        </div>
      </div>

      {/* Keyframe Floating Styles */}
      <style jsx>{`
        @keyframes grok-float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-9px) rotate(1.5deg);
          }
        }
      `}</style>
    </div>
  );
}
