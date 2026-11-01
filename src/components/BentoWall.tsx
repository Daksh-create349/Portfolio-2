"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sliders, Radio, GitBranch, Mic, Waves, ShieldCheck, ArrowRight } from "lucide-react";

export function BentoWall() {
  const audioCanvasRef = useRef<HTMLCanvasElement>(null);
  const radarCanvasRef = useRef<HTMLCanvasElement>(null);
  const [activeEqPreset, setActiveEqPreset] = useState("Cinema");
  const [otsuThreshold, setOtsuThreshold] = useState(128);

  // Live Audio Spectrum Visualizer (48 bars at 25 FPS simulation)
  useEffect(() => {
    const canvas = audioCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const barCount = 42;
    const values = Array.from({ length: barCount }, () => Math.random() * 50 + 10);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");
      const barWidth = canvas.width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        // Natural audio bounce
        const target = Math.sin(Date.now() * 0.005 + i * 0.3) * 28 + 40 + Math.random() * 15;
        values[i] += (target - values[i]) * 0.15;

        const h = (values[i] / 100) * (canvas.height - 10);
        const x = i * (barWidth + 2);
        const y = canvas.height - h;

        ctx.fillStyle = isDark
          ? `rgba(96, 165, 250, ${0.4 + (values[i] / 100) * 0.6})`
          : `rgba(37, 99, 235, ${0.5 + (values[i] / 100) * 0.5})`;
        ctx.fillRect(x, y, barWidth, h);

        // Peak cap
        ctx.fillStyle = isDark ? "#93c5fd" : "#1d4ed8";
        ctx.fillRect(x, y - 3, barWidth, 2);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeEqPreset]);

  // Live Sentinel Radar Sweep
  useEffect(() => {
    const canvas = radarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = Math.min(cx, cy) - 10;

      // Concentric radar rings
      ctx.strokeStyle = isDark ? "rgba(52, 211, 153, 0.15)" : "rgba(16, 185, 129, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.33, 0, Math.PI * 2);
      ctx.arc(cx, cy, r * 0.66, 0, Math.PI * 2);
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Radar sweep line
      angle += 0.025;
      const sx = cx + Math.cos(angle) * r;
      const sy = cy + Math.sin(angle) * r;

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(1, isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(5, 150, 105, 0.15)");

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, angle - 0.5, angle);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = isDark ? "#34d399" : "#059669";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sx, sy);
      ctx.stroke();

      // Simulated SAR water blips
      const blips = [
        { x: cx + 25, y: cy - 20, active: Math.sin(angle) > 0 },
        { x: cx - 40, y: cy + 15, active: Math.cos(angle) > 0 },
        { x: cx + 50, y: cy + 40, active: Math.sin(angle + 1) > 0 },
      ];

      blips.forEach((b) => {
        if (b.active) {
          ctx.beginPath();
          ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? "#6ee7b7" : "#047857";
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section aria-labelledby="work-gallery-title" className="overflow-x-clip px-6 md:px-10">
      <div className="mx-auto w-full max-w-[1176px] border-x border-foreground/5 py-8">
        {/* Top Decorative Line with Dot Caps */}
        <div aria-hidden="true" className="pointer-events-none relative h-px">
          <div className="absolute -inset-x-[129px] top-0 h-px bg-foreground/10" />
          <span className="absolute top-0 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-background left-0 -translate-x-1/2">
            <span className="size-1 rounded-full bg-foreground" />
          </span>
          <span className="absolute top-0 grid size-5 -translate-y-1/2 place-items-center rounded-full bg-background right-0 translate-x-1/2">
            <span className="size-1 rounded-full bg-foreground" />
          </span>
        </div>

        <h2
          id="work-gallery-title"
          className="px-2.5 py-8 text-2xl font-medium leading-[1.25] sm:text-3xl lg:text-4xl text-foreground"
        >
          Engineered components and systems rooted in deep technical discovery—bridging raw
          algorithms, DSP pipelines, and DevSecOps into intuitive production experiences.
        </h2>

        {/* Bento Wall Container */}
        <div className="rounded-[24px] border border-foreground/[0.08] bg-secondary/30 p-4 md:p-6 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Tile 1: Sonaura Real-Time DSP Spectrum (Large Tile) */}
            <div className="md:col-span-2 lg:col-span-2 flex flex-col justify-between rounded-[20px] border border-border/70 bg-card p-5 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between pb-3 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                    <Waves className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight">
                      Sonaura 2.0 DSP Spectrum
                    </h3>
                    <p className="text-[11px] font-mono text-muted-foreground">
                      48-Bar FFT Auto-Calibration · 25 FPS
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {["Cinema", "Action Boost", "Night Mode"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setActiveEqPreset(p)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors ${
                        activeEqPreset === p
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spectrum Canvas */}
              <div className="my-4 h-32 w-full flex items-end">
                <canvas
                  ref={audioCanvasRef}
                  width={460}
                  height={128}
                  className="w-full h-full block rounded-lg bg-secondary/40"
                />
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-muted-foreground pt-2">
                <span>HRTF 5.1 Matrix Active</span>
                <span className="text-emerald-500 font-semibold">Latency: &lt;1.8ms</span>
              </div>
            </div>

            {/* Tile 2: Sentinel-1 SAR Radar Sweep */}
            <div className="flex flex-col justify-between rounded-[20px] border border-border/70 bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Radio className="size-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold">AQUILA Radar</h4>
                    <p className="text-[11px] font-mono text-muted-foreground">Sentinel-1 SAR</p>
                  </div>
                </div>
              </div>

              <div className="my-2 flex justify-center items-center h-32">
                <canvas
                  ref={radarCanvasRef}
                  width={160}
                  height={130}
                  className="rounded-full bg-secondary/50"
                />
              </div>

              <div className="text-[11px] font-mono text-muted-foreground flex justify-between">
                <span>Otsu Threshold</span>
                <span className="text-emerald-500 font-semibold">{otsuThreshold} dB</span>
              </div>
            </div>

            {/* Tile 3: Git DAG Forensics Tree */}
            <div className="flex flex-col justify-between rounded-[20px] border border-border/70 bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 pb-2">
                <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500">
                  <GitBranch className="size-4" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold">Git DAG Traversal</h4>
                  <p className="text-[11px] font-mono text-muted-foreground">GitHub Guardian</p>
                </div>
              </div>

              {/* Simulated Git Commits */}
              <div className="my-2 space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/60">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span className="truncate max-w-[120px]">feat: hrtf delay</span>
                  </div>
                  <span className="text-emerald-500">PASS</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-destructive animate-pulse" />
                    <span className="truncate max-w-[120px]">fix: api client</span>
                  </div>
                  <span className="text-destructive font-semibold">SECRET</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/60">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span className="truncate max-w-[120px]">merge: main</span>
                  </div>
                  <span className="text-emerald-500">CLEAN</span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-muted-foreground pt-1 flex justify-between">
                <span>Deleted commits scanned</span>
                <span className="font-semibold text-foreground">100%</span>
              </div>
            </div>

            {/* Tile 4: Gemini Live Multimodal Session */}
            <div className="md:col-span-3 lg:col-span-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[20px] border border-border/70 bg-gradient-to-r from-card via-secondary/20 to-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <Mic className="size-5" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    HyperMind · Gemini Live Bidirectional Voice Streaming
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Sub-second Socratic tutoring with Generative UI rendering dynamic Recharts and
                    ReactFlow concept nodes directly in conversational responses.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 font-mono text-xs">
                  <span className="size-2 rounded-full bg-amber-500 animate-ping" />
                  Live Audio Stream
                </span>
                <a
                  href="#work"
                  className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:underline"
                >
                  View Case Study <ArrowRight className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

