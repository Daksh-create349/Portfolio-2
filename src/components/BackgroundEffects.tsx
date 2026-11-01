"use client";

import React, { useEffect, useRef } from "react";

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight * 0.7);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight * 0.7;
    };

    window.addEventListener("resize", handleResize);

    // Particle nodes
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    const count = Math.min(Math.floor(width / 35), 45);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    let t = 0;

    const render = () => {
      t += 0.008;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      // Draw faint connective aurora mesh
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(147, 197, 253, ${p.alpha * 0.5})`
          : `rgba(59, 130, 246, ${p.alpha * 0.35})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(167, 139, 250, ${(1 - dist / 110) * 0.12})`
              : `rgba(99, 102, 241, ${(1 - dist / 110) * 0.08})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Top Glassmorphism Blur Layers (Stepped Backdrop Blur) */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24">
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(0.5px)",
            WebkitBackdropFilter: "blur(0.5px)",
            maskImage: "linear-gradient(to bottom, #000 0%, #000 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(1px)",
            WebkitBackdropFilter: "blur(1px)",
            maskImage: "linear-gradient(to bottom, #000 0%, #000 41.6%, transparent 83.3%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 41.6%, transparent 83.3%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            maskImage: "linear-gradient(to bottom, #000 0%, #000 33.3%, transparent 66.6%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 33.3%, transparent 66.6%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            maskImage: "linear-gradient(to bottom, #000 0%, #000 25%, transparent 50%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 25%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(11px)",
            WebkitBackdropFilter: "blur(11px)",
            maskImage: "linear-gradient(to bottom, #000 0%, #000 16.6%, transparent 33.3%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 16.6%, transparent 33.3%)",
          }}
        />
      </div>

      {/* Bottom Glassmorphism Blur Layers */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-16">
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(0.5px)",
            WebkitBackdropFilter: "blur(0.5px)",
            maskImage: "linear-gradient(to top, #000 0%, #000 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, #000 0%, #000 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            maskImage: "linear-gradient(to top, #000 0%, #000 25%, transparent 50%)",
            WebkitMaskImage: "linear-gradient(to top, #000 0%, #000 25%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(11px)",
            WebkitBackdropFilter: "blur(11px)",
            maskImage: "linear-gradient(to top, #000 0%, #000 8.3%, transparent 16.6%)",
            WebkitMaskImage: "linear-gradient(to top, #000 0%, #000 8.3%, transparent 16.6%)",
          }}
        />
      </div>

      {/* Ambient Top Aurora & Clouds */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[650px] overflow-x-clip">
        {/* Canvas Particle Field */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-70"
        />

        {/* Ambient Gradient Glow */}
        <div
          className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_50%,transparent)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(224_240_253_/_0.8),rgb(239_247_254_/_0.4)_45%,transparent)] dark:bg-[linear-gradient(to_bottom,rgb(30_41_59_/_0.45),rgb(23_32_48_/_0.2)_45%,transparent)]" />
          
          {/* Floating Atmospheric Cloud Sprites */}
          <div className="absolute inset-0 opacity-80 dark:opacity-40">
            <div
              className="hero-cloud absolute left-0 h-24 w-72"
              style={
                {
                  top: "6%",
                  ["--cloud-scale" as string]: "1.1",
                  animationDuration: "75s",
                  animationDelay: "-10s",
                } as React.CSSProperties
              }
            >
              <span className="absolute left-6 top-8 h-14 w-40 rounded-full bg-white/90 blur-md dark:bg-slate-400/20" />
              <span className="absolute left-20 top-2 h-20 w-28 rounded-full bg-white/95 blur-md dark:bg-slate-300/20" />
              <span className="absolute left-36 top-7 h-14 w-28 rounded-full bg-white/90 blur-md dark:bg-slate-400/20" />
            </div>

            <div
              className="hero-cloud absolute left-0 h-24 w-72"
              style={
                {
                  top: "20%",
                  ["--cloud-scale" as string]: "0.85",
                  animationDuration: "95s",
                  animationDelay: "-45s",
                } as React.CSSProperties
              }
            >
              <span className="absolute left-6 top-8 h-14 w-40 rounded-full bg-white/90 blur-md dark:bg-slate-400/20" />
              <span className="absolute left-20 top-2 h-20 w-28 rounded-full bg-white/95 blur-md dark:bg-slate-300/20" />
              <span className="absolute left-36 top-7 h-14 w-28 rounded-full bg-white/90 blur-md dark:bg-slate-400/20" />
            </div>

            <div
              className="hero-cloud absolute left-0 h-24 w-72"
              style={
                {
                  top: "32%",
                  ["--cloud-scale" as string]: "0.95",
                  animationDuration: "85s",
                  animationDelay: "-30s",
                } as React.CSSProperties
              }
            >
              <span className="absolute left-6 top-8 h-14 w-40 rounded-full bg-white/90 blur-md dark:bg-slate-400/20" />
              <span className="absolute left-20 top-2 h-20 w-28 rounded-full bg-white/95 blur-md dark:bg-slate-300/20" />
              <span className="absolute left-36 top-7 h-14 w-28 rounded-full bg-white/90 blur-md dark:bg-slate-400/20" />
            </div>
          </div>

          {/* Warm Sun Orb in Light Mode */}
          <div className="dark:hidden">
            <div className="hero-sun absolute right-[-260px] top-[-280px] size-[760px] rounded-full bg-[radial-gradient(circle,rgb(254_243_199_/_0.9)_0%,rgb(253_230_138_/_0.6)_30%,rgb(252_211_77_/_0.2)_55%,transparent_72%)] blur-3xl" />
            <div className="absolute right-[-60px] top-[-100px] size-[320px] rounded-full bg-[radial-gradient(circle,rgb(255_251_235)_0%,rgb(254_243_199_/_0.6)_45%,transparent_70%)] blur-2xl" />
          </div>

          {/* Cosmic Glow in Dark Mode */}
          <div className="hidden dark:block">
            <div className="absolute right-[-200px] top-[-200px] size-[600px] rounded-full bg-[radial-gradient(circle,rgb(59_130_246_/_0.15)_0%,rgb(139_92_246_/_0.08)_40%,transparent_70%)] blur-3xl" />
            <div className="absolute left-[-150px] top-[-100px] size-[500px] rounded-full bg-[radial-gradient(circle,rgb(16_185_129_/_0.1)_0%,transparent_60%)] blur-3xl" />
          </div>
        </div>
      </div>
    </>
  );
}
