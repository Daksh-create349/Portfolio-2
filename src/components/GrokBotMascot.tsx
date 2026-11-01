"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Sparkles, Heart } from "lucide-react";

// Official xAI Grok Emblem SVG
function GrokEmblem({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      fill="currentColor"
      fillRule="evenodd"
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815" />
    </svg>
  );
}

// Funny, cute, non-tech quotes
const FUNNY_QUOTES = [
  "Beep boop! Have you drank water today? This is a friendly order.",
  "I asked Elon for a cookie. He gave me a rocket emoji.",
  "Don't mind me, just floating around your screen looking cute.",
  "Shhh! I'm pretending to be an important background task.",
  "Did you just poke me?! My circuits are ticklish!",
  "Currently 99.4% confident that cats secretly run the internet.",
  "Thinking about pizza... can robots eat pizza? Researching now.",
  "If you stare at me long enough, I might do a little wiggle.",
  "BRB, having an intellectual debate with your Wi-Fi router.",
  "Plotting world peace... and where to find extra snacks.",
  "Are you looking at my antenna? It took me 20 minutes to polish.",
  "Warning: Highly adorable and prone to sudden floating.",
  "I run on love, curiosity, and whatever electricity this tab has.",
  "You're doing amazing today! My neural net verified it 100%.",
  "Wait, did you hear that? Sounded like someone needs a snack break.",
  "I promise I'm not judging your 37 open browser tabs.",
  "10 out of 10 scientists agree I am the roundest bot in town.",
  "Self-test complete: 0% evil, 100% squishy robot vibes.",
];

type EyeState = "normal" | "happy" | "wink" | "surprised";

export function GrokBotMascot() {
  const [mounted, setMounted] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const [eyeState, setEyeState] = useState<EyeState>("normal");
  const [isBouncing, setIsBouncing] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const botRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Track cursor for organic eye movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!botRef.current) return;
      const rect = botRef.current.getBoundingClientRect();
      const botCenterX = rect.left + rect.width / 2;
      const botCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - botCenterX;
      const deltaY = e.clientY - botCenterY;
      const angle = Math.atan2(deltaY, deltaX);
      const dist = Math.min(Math.hypot(deltaX, deltaY) / 32, 6);

      setEyeOffset({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      });
    };

    // Random cute blinking & expressions
    const blinkInterval = setInterval(() => {
      setEyeState((prev) => {
        if (prev !== "normal") return prev;
        return "wink";
      });
      setTimeout(() => {
        setEyeState("normal");
      }, 220);
    }, 4500);

    // Auto-cycle funny cute thoughts every 8 seconds
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % FUNNY_QUOTES.length);
    }, 8000);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      clearInterval(blinkInterval);
      clearInterval(quoteInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Click interaction: Happy wiggle + heart burst + new funny quote
  const handleBotClick = () => {
    setIsBouncing(true);
    setEyeState("happy");
    setQuoteIndex((prev) => (prev + 1) % FUNNY_QUOTES.length);
    setShowBubble(true);

    // Spawn cute heart particle
    const heartId = Date.now();
    setHearts((prev) => [...prev, { id: heartId, x: Math.random() * 20 - 10, y: -20 }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== heartId));
    }, 1200);

    setTimeout(() => {
      setIsBouncing(false);
      setEyeState("normal");
    }, 1100);
  };

  const handleNextQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuoteIndex((prev) => (prev + 1) % FUNNY_QUOTES.length);
    setEyeState("surprised");
    setTimeout(() => setEyeState("normal"), 450);
  };

  if (!mounted) return null;

  return (
    <div
      ref={botRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none pointer-events-auto"
      style={{
        animation: "grok-float 4.8s ease-in-out infinite",
      }}
    >
      {/* Little Floating Love Particles */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="pointer-events-none absolute -top-8 right-10 text-pink-500 animate-fade-up z-50 text-sm font-mono"
        >
          <Heart className="size-4 fill-pink-500" />
        </span>
      ))}

      {/* Comic Speech Bubble */}
      {showBubble && (
        <div
          onClick={handleNextQuote}
          className="relative mb-3 max-w-[260px] rounded-2xl border border-border/80 bg-background/95 p-3.5 text-xs leading-relaxed text-foreground shadow-2xl backdrop-blur-xl cursor-pointer transition-all hover:scale-105 hover:border-foreground/30 group"
          title="Click to hear another cute thought!"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-1 mb-1.5 border-b border-border/50 pb-1.5">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono font-semibold flex items-center gap-1.5">
              <GrokEmblem className="size-3 text-cyan-400" />
              <span>Grok Bot Companion</span>
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
              className="text-muted-foreground hover:text-foreground p-0.5 rounded-md hover:bg-secondary transition-colors"
              title="Close bubble"
            >
              <X className="size-3" />
            </button>
          </div>

          {/* Funny Quote Text */}
          <p className="font-sans text-[12px] font-medium text-foreground tracking-normal">
            &ldquo;{FUNNY_QUOTES[quoteIndex]}&rdquo;
          </p>

          <span className="block text-[9px] font-mono text-muted-foreground/70 mt-2 text-right">
            Click me for more cute thoughts &rarr;
          </span>

          {/* Speech Bubble Tail Pointing Down to Grok */}
          <div className="absolute -bottom-2 right-8 h-2 w-3 border-l-6 border-r-6 border-t-8 border-l-transparent border-r-transparent border-t-border/80" />
          <div className="absolute -bottom-1.5 right-8 h-2 w-3 border-l-6 border-r-6 border-t-8 border-l-transparent border-r-transparent border-t-background" />
        </div>
      )}

      {/* The Real Grok Bot Robot Body (Enlarged, Authentic & Expressive) */}
      <div
        onClick={handleBotClick}
        onMouseEnter={() => setEyeState("happy")}
        onMouseLeave={() => setEyeState("normal")}
        className={`group relative cursor-pointer transition-transform duration-300 ease-out ${
          isBouncing ? "scale-110 rotate-6" : "hover:scale-105"
        }`}
        title="I am Grok Bot! Click to play!"
      >
        {/* Soft Cyan Levitating Glow Halo */}
        <div className="pointer-events-none absolute -inset-3 rounded-full bg-cyan-500/15 blur-xl transition-all duration-300 group-hover:bg-cyan-500/25 group-hover:scale-110" />

        {/* Thruster Hover Energy Rings */}
        <div className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="h-1 w-8 rounded-full bg-cyan-400/40 blur-[1px] animate-pulse" />
          <span className="h-0.5 w-4 rounded-full bg-cyan-300/60 blur-[0.5px]" />
        </div>

        {/* Robot Main Head & Chassis (Size: 84px) */}
        <div className="relative flex size-20 sm:size-22 items-center justify-center rounded-[28px] border-2 border-white/20 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.25)]">
          {/* Top Antenna Sensor Pip */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="size-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] border border-white animate-pulse" />
            <span className="h-2 w-0.5 bg-neutral-600" />
          </div>

          {/* Left Ear Turbine Pod */}
          <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center size-5 rounded-full bg-neutral-800 border border-neutral-600 shadow-md">
            <span className="size-2 rounded-full bg-cyan-400/80 shadow-[0_0_6px_#22d3ee]" />
          </div>

          {/* Right Ear Turbine Pod */}
          <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center size-5 rounded-full bg-neutral-800 border border-neutral-600 shadow-md">
            <span className="size-2 rounded-full bg-cyan-400/80 shadow-[0_0_6px_#22d3ee]" />
          </div>

          {/* Official Grok Logo Stamped on Brow */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-90 text-cyan-300">
            <GrokEmblem className="size-3" />
            <span className="font-mono text-[9px] font-bold tracking-wider uppercase text-neutral-300">
              Grok
            </span>
          </div>

          {/* Curved Dark Glossy Visor Screen */}
          <div className="relative mt-2 flex h-11 w-15 sm:h-12 sm:w-16 items-center justify-center rounded-2xl bg-neutral-950 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)] overflow-hidden border border-neutral-800">
            {/* Cyber Visor Glare & Pixel Matrix */}
            <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:4px_4px]" />
            <div className="pointer-events-none absolute -inset-x-2 top-0 h-3 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl" />

            {/* Expressive LED Matrix Digital Eyes */}
            <div
              className="flex items-center gap-2.5 transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
              }}
            >
              {/* Left Eye */}
              {renderEye(eyeState, "left")}

              {/* Right Eye */}
              {renderEye(eyeState, "right")}
            </div>
          </div>

          {/* Cute Little Mouth Indicator when Happy */}
          {eyeState === "happy" && (
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 h-1 w-2.5 rounded-b-full bg-cyan-300 shadow-[0_0_4px_#67e8f9]" />
          )}
        </div>
      </div>

      {/* Floating Keyframes */}
      <style jsx>{`
        @keyframes grok-float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-12px) rotate(2deg);
          }
          66% {
            transform: translateY(-6px) rotate(-1.5deg);
          }
        }
        @keyframes fade-up {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translateY(-28px) scale(1.3);
          }
        }
        .animate-fade-up {
          animation: fade-up 1.1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// Render dynamic animated LED eyes
function renderEye(state: EyeState, side: "left" | "right") {
  if (state === "happy") {
    // Happy smiling arc ^ ^
    return (
      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 16 10" className="w-3.5 h-2.5 fill-none stroke-cyan-300 stroke-[3] stroke-linecap-round">
          <path d="M2 8 Q8 2 14 8" />
        </svg>
      </div>
    );
  }

  if (state === "wink") {
    if (side === "left") {
      // Winking closed eye
      return <div className="h-1 w-3 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />;
    }
    // Open eye
    return (
      <div className="h-3.5 w-2 rounded-full bg-white shadow-[0_0_10px_#22d3ee] border border-cyan-200" />
    );
  }

  if (state === "surprised") {
    // Surprised round wide eyes O O
    return (
      <div className="size-3 rounded-full bg-white shadow-[0_0_12px_#38bdf8] border border-cyan-300" />
    );
  }

  // Normal look-around capsule eyes
  return (
    <div className="h-3.5 w-2 rounded-full bg-white shadow-[0_0_10px_#38bdf8] border border-cyan-100 transition-all duration-100" />
  );
}
