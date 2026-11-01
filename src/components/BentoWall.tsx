"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Waves,
  Radio,
  GitBranch,
  Mic,
  Star,
  ExternalLink,
  ShieldAlert,
  Terminal,
  Activity,
  Calendar,
  Layers,
  Sparkles,
  Bot,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Play,
} from "lucide-react";

export function BentoWall() {
  const audioCanvasRef = useRef<HTMLCanvasElement>(null);
  const radarCanvasRef = useRef<HTMLCanvasElement>(null);
  const [activeEqPreset, setActiveEqPreset] = useState("Cinema");
  const [mcpConflictResolved, setMcpConflictResolved] = useState(false);
  const [autopsyScanning, setAutopsyScanning] = useState(true);

  // Audio Spectrum Canvas
  useEffect(() => {
    const canvas = audioCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const barCount = 36;
    const values = Array.from({ length: barCount }, () => Math.random() * 40 + 10);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");
      const barWidth = canvas.width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        const target =
          Math.sin(Date.now() * 0.006 + i * 0.28) * 26 +
          Math.cos(Date.now() * 0.003 + i * 0.15) * 16 +
          40;
        values[i] += (target - values[i]) * 0.12;

        const h = Math.max(4, (values[i] / 100) * (canvas.height - 8));
        const x = i * (barWidth + 2);
        const y = canvas.height - h;

        const grad = ctx.createLinearGradient(0, y, 0, canvas.height);
        if (isDark) {
          grad.addColorStop(0, "#60a5fa");
          grad.addColorStop(1, "rgba(59, 130, 246, 0.2)");
        } else {
          grad.addColorStop(0, "#2563eb");
          grad.addColorStop(1, "rgba(37, 99, 235, 0.25)");
        }

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, h);

        ctx.fillStyle = isDark ? "#93c5fd" : "#1d4ed8";
        ctx.fillRect(x, y - 2, barWidth, 2);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeEqPreset]);

  // Doppler Radar Sweep Canvas (HydroWatch)
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
      const r = Math.min(cx, cy) - 8;

      ctx.strokeStyle = isDark ? "rgba(52, 211, 153, 0.2)" : "rgba(16, 185, 129, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.35, 0, Math.PI * 2);
      ctx.arc(cx, cy, r * 0.7, 0, Math.PI * 2);
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      angle += 0.035;
      const sx = cx + Math.cos(angle) * r;
      const sy = cy + Math.sin(angle) * r;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, isDark ? "rgba(16, 185, 129, 0.18)" : "rgba(5, 150, 105, 0.2)");

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, angle - 0.5, angle);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = isDark ? "#34d399" : "#059669";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sx, sy);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section aria-labelledby="work-gallery-title" className="overflow-x-clip px-6 md:px-10 py-10">
      <div className="mx-auto w-full max-w-[1200px] border-x border-foreground/5 py-8">
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

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 py-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-2">
              <Sparkles className="size-3.5 text-blue-500" />
              <span>Selected Work &amp; GitHub OS</span>
            </span>
            <h2
              id="work-gallery-title"
              className="text-2xl font-semibold leading-snug sm:text-3xl lg:text-4xl text-foreground max-w-3xl"
            >
              Architected systems and open-source intelligence—from autonomous MCP engines and data
              forensics to browser DSP and geospatial digital twins.
            </h2>
          </div>

          <a
            href="https://github.com/Daksh-create349"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border/80 bg-secondary/60 hover:bg-secondary px-4 py-2 text-xs font-mono text-foreground transition-all shadow-sm group cursor-pointer"
          >
            <span>github.com/Daksh-create349</span>
            <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Scrollable Bento Gallery Wall */}
        <div className="rounded-[28px] border border-foreground/[0.08] bg-secondary/25 p-4 sm:p-6 backdrop-blur-md shadow-sm">
          <div className="max-h-[820px] overflow-y-auto pr-1 space-y-4">
            {/* Top Tier Flagship Row: Contradiction-MCP + data-autopsy */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Card 1: Contradiction-MCP (7 Stars, Autonomous MCP Engine) */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-[22px] border border-border/80 bg-background/90 p-5 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start justify-between gap-3 border-b border-border/40 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                      <Bot className="size-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground tracking-tight">
                          Contradiction-MCP
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 text-amber-500 font-mono text-[10px] px-2 py-0.5 font-semibold">
                          <Star className="size-3 fill-amber-500 text-amber-500" />
                          <span>7 Stars</span>
                        </span>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground">
                        Model Context Protocol · Autonomous Reconciliation Engine
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://github.com/Daksh-create349/Contradiction-MCP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </div>

                {/* Interactive MCP Reconciliation Visualizer */}
                <div className="my-4 rounded-xl bg-secondary/50 p-3.5 font-mono text-xs border border-border/40 space-y-2">
                  <div className="flex justify-between items-center text-[11px] text-muted-foreground">
                    <span>ENGINE STATUS: ACTIVE</span>
                    <button
                      onClick={() => setMcpConflictResolved(!mcpConflictResolved)}
                      className="text-[10px] text-purple-500 hover:underline cursor-pointer"
                    >
                      {mcpConflictResolved ? "Simulate Conflict" : "Resolve Conflict"}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-background border border-border/60">
                      <span className="text-muted-foreground block text-[10px]">Doc A (v1.4)</span>
                      <span className="text-destructive font-medium">Timeout: 3000ms</span>
                    </div>
                    <div className="p-2 rounded bg-background border border-border/60">
                      <span className="text-muted-foreground block text-[10px]">Doc B (v1.9)</span>
                      <span className="text-emerald-500 font-medium">Timeout: 5000ms</span>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-background/80 border border-purple-500/30 flex items-center justify-between text-[11px]">
                    <span className="text-foreground">
                      {mcpConflictResolved
                        ? "✓ Factual Consensus: Reconciled to v1.9 (5000ms SLA verified)"
                        : "⚠ Conflict Detected: Version divergence across 2 engineering sources"}
                    </span>
                    <span className="text-purple-500 font-semibold text-[10px]">
                      {mcpConflictResolved ? "RESOLVED" : "ANALYZING"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <span>TypeScript · Knowledge Reconciliation</span>
                  <span className="text-foreground font-mono text-[11px]">Daksh-create349/Contradiction-MCP</span>
                </div>
              </div>

              {/* Card 2: data-autopsy (6 Stars, Tabular AI Forensics) */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-[22px] border border-border/80 bg-background/90 p-5 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start justify-between gap-3 border-b border-border/40 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                      <ShieldAlert className="size-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground tracking-tight">
                          data-autopsy
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 text-amber-500 font-mono text-[10px] px-2 py-0.5 font-semibold">
                          <Star className="size-3 fill-amber-500 text-amber-500" />
                          <span>6 Stars</span>
                        </span>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground">
                        AI Forensic Investigation Workstation
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://github.com/Daksh-create349/data-autopsy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </div>

                {/* Live Forensic Terminal */}
                <div className="my-4 rounded-xl bg-neutral-950 p-3.5 font-mono text-[11px] text-neutral-300 border border-neutral-800 space-y-1.5">
                  <div className="flex justify-between text-neutral-500 text-[10px]">
                    <span>FORENSIC TELEMETRY</span>
                    <span className="text-rose-400">TARGET LEAK SCAN</span>
                  </div>
                  <p className="text-neutral-400">$ data-autopsy scan --input dataset_v3.parquet</p>
                  <p className="text-rose-400 font-semibold">
                    [!] Leakage detected: feature_id_corr = 0.9984
                  </p>
                  <p className="text-emerald-400">
                    [+] Structural corruption check: 0 null bytes
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <span>Python · Local AI &amp; Tabular Forensics</span>
                  <span className="text-foreground font-mono text-[11px]">Daksh-create349/data-autopsy</span>
                </div>
              </div>
            </div>

            {/* Mid Tier Row: Sonaura 2.0 (Audio DSP) + HydroWatch (Doppler Satellite) + Blood-Bridge 3.0 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
              {/* Card 3: Sonaura 2.0 (Edge Add-ons Store) */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-[22px] border border-border/80 bg-background/90 p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-3 border-b border-border/40 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                      <Waves className="size-4" />
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-semibold text-foreground">Sonaura 2.0</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold">
                          Edge Store Live
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-muted-foreground">
                        Web Audio API · HRTF 5.1 Virtualization
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://github.com/Daksh-create349/Sonaura-2.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </div>

                {/* Canvas Spectrum */}
                <div className="my-3 h-28 w-full">
                  <canvas
                    ref={audioCanvasRef}
                    width={340}
                    height={110}
                    className="w-full h-full block rounded-lg bg-secondary/50"
                  />
                </div>

                <div className="flex justify-between items-center text-[11px] font-mono text-muted-foreground">
                  <div className="flex gap-1">
                    {["Cinema", "Action Boost", "Night Mode"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setActiveEqPreset(p)}
                        className={`text-[9px] px-2 py-0.5 rounded-full border transition-colors ${
                          activeEqPreset === p
                            ? "bg-foreground text-background"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <span className="text-emerald-500 font-semibold">&lt;1.8ms Latency</span>
                </div>
              </div>

              {/* Card 4: HydroWatch (SIH 2026 Flood Warning) */}
              <div className="lg:col-span-4 flex flex-col justify-between rounded-[22px] border border-border/80 bg-background/90 p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-3 border-b border-border/40 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                      <Radio className="size-4" />
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-semibold text-foreground">HydroWatch SIH</h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-semibold">
                          Cesium 3D
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-muted-foreground">
                        Doppler Radar (dBZ) + Sentinel-2
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://github.com/Daksh-create349/Hydrowatch-SIH26071"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </div>

                {/* Radar Sweep Canvas */}
                <div className="my-2 flex justify-center items-center h-28">
                  <canvas
                    ref={radarCanvasRef}
                    width={130}
                    height={110}
                    className="rounded-full bg-secondary/50"
                  />
                </div>

                <div className="flex justify-between items-center text-[11px] font-mono text-muted-foreground">
                  <span>NASA POWER + NOAA GFS</span>
                  <span className="text-emerald-500 font-semibold">3D Digital Twin</span>
                </div>
              </div>

              {/* Card 5: Blood-Bridge 3.0 (★ 3 Stars) */}
              <div className="lg:col-span-3 flex flex-col justify-between rounded-[22px] border border-border/80 bg-background/90 p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-3 border-b border-border/40 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                      <Flame className="size-4" />
                    </span>
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="text-sm font-semibold text-foreground">Blood-Bridge 3.0</h4>
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/10 text-amber-500 font-mono text-[9px] px-1.5 py-0.5 font-semibold">
                          <Star className="size-2.5 fill-amber-500" /> 3
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-muted-foreground">Emergency Logistics</p>
                    </div>
                  </div>

                  <a
                    href="https://github.com/Daksh-create349/Blood-Bridge-3.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                </div>

                {/* Live Donor Inventory Matrix */}
                <div className="my-2 space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between p-1.5 rounded bg-secondary/50">
                    <span className="text-red-500 font-semibold">O- Negative</span>
                    <span className="text-destructive font-bold">CRITICAL (2 Units)</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-secondary/50">
                    <span className="text-foreground">A+ Positive</span>
                    <span className="text-emerald-500">OPTIMAL (48 Units)</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-secondary/50">
                    <span className="text-foreground">B+ Positive</span>
                    <span className="text-emerald-500">STABLE (22 Units)</span>
                  </div>
                </div>

                <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Donor Network</span>
                  <span className="text-foreground font-semibold">Live GPS Matching</span>
                </div>
              </div>
            </div>

            {/* Lower Tier Row: macOS Wallpaper Widget + Procrastinate-OS + BoundaryBench + LifeLog */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 6: GitHub Contribution Wallpaper Widget */}
              <div className="flex flex-col justify-between rounded-[22px] border border-border/80 bg-background/90 p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-emerald-500" />
                    Heatmap Wallpaper
                  </span>
                  <a
                    href="https://github.com/Daksh-create349/Github-Contribution-Widget"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>

                {/* Live Mini Heatmap */}
                <div className="my-3 p-2 rounded-lg bg-secondary/40 border border-border/40">
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 32 }).map((_, i) => {
                      const level = (i * 7 + 3) % 4;
                      const colors = [
                        "bg-neutral-800/40 dark:bg-neutral-800",
                        "bg-emerald-900/60",
                        "bg-emerald-600",
                        "bg-emerald-400",
                      ];
                      return <div key={i} className={`size-2.5 rounded-sm ${colors[level]}`} />;
                    })}
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground leading-normal">
                  Renders live GitHub contribution heatmap directly on macOS wallpaper with zero battery drain.
                </p>
              </div>

              {/* Card 7: BoundaryBench (Gemma 4 API Framework) */}
              <div className="flex flex-col justify-between rounded-[22px] border border-border/80 bg-background/90 p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <ShieldAlert className="size-3.5 text-blue-500" />
                    BoundaryBench
                  </span>
                  <a
                    href="https://github.com/Daksh-create349/BoundaryBench"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>

                <div className="my-3 space-y-1.5 font-mono text-[10px]">
                  <div className="flex justify-between p-1.5 rounded bg-secondary/60">
                    <span>GET /api/v1/auth</span>
                    <span className="text-emerald-500">SAFE</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-secondary/60">
                    <span>POST /api/v1/admin</span>
                    <span className="text-destructive font-semibold">BOLA LEAK</span>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground leading-normal">
                  Local-first AI authorization testing framework using Gemma 4 for automated security boundaries.
                </p>
              </div>

              {/* Card 8: Procrastinate-OS */}
              <div className="flex flex-col justify-between rounded-[22px] border border-border/80 bg-background/90 p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Activity className="size-3.5 text-amber-500" />
                    Procrastinate-OS
                  </span>
                  <a
                    href="https://github.com/Daksh-create349/Procrastinate-OS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>

                <div className="my-3 p-2 rounded-lg bg-secondary/40 border border-border/40 font-mono text-[10px] space-y-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>RECOVERED WORK</span>
                    <span className="text-emerald-400 font-semibold">+4 Files</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                    <div className="bg-amber-500 h-full w-[78%]" />
                  </div>
                  <span className="text-[9px] text-muted-foreground block text-right">78% Clutter Reduced</span>
                </div>

                <p className="text-[11px] text-muted-foreground leading-normal">
                  100% local-first privacy productivity system that recovers forgotten work and duplicate files.
                </p>
              </div>

              {/* Card 9: LifeLog (Go macOS Tracker) */}
              <div className="flex flex-col justify-between rounded-[22px] border border-border/80 bg-background/90 p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Terminal className="size-3.5 text-cyan-500" />
                    LifeLog (Go CLI)
                  </span>
                  <a
                    href="https://github.com/Daksh-create349/LifeLog-Pick-up-where-you-left-off"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>

                <div className="my-3 p-2 rounded-lg bg-neutral-950 font-mono text-[10px] text-neutral-300 border border-neutral-800 space-y-1">
                  <p className="text-neutral-500">$ lifelog status</p>
                  <p className="text-cyan-400">✓ Git branch: main</p>
                  <p className="text-emerald-400">✓ 12 file events logged</p>
                </div>

                <p className="text-[11px] text-muted-foreground leading-normal">
                  Go-based macOS daemon recording filesystem activity &amp; Git history so developers resume instantly.
                </p>
              </div>
            </div>

            {/* Bottom Banner Card: Notes-Automation + HyperMind Realtime */}
            <div className="rounded-[22px] border border-border/80 bg-gradient-to-r from-background via-secondary/30 to-background p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                  <Mic className="size-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-foreground">
                      Notes-Automation &amp; HyperMind Voice
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-semibold">
                      Groq Whisper + LLaMA 3.3 + Gemini Live
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Autonomous audio transcription pipeline syncing chunked lectures to Notion and real-time Socratic voice tutoring.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://github.com/Daksh-create349/Notes-Automation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 border border-border text-xs font-mono text-foreground transition-all"
                >
                  <span>Notes-Automation</span>
                  <ExternalLink className="size-3" />
                </a>
                <a
                  href="https://github.com/Daksh-create349/Hypermind-main"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-foreground text-background text-xs font-mono hover:opacity-90 transition-opacity"
                >
                  <span>HyperMind</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
