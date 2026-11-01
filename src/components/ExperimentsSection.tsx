"use client";

import React, { useState } from "react";
import { Sliders, GitBranch, Layers, Play, CheckCircle2, AlertTriangle } from "lucide-react";

export function ExperimentsSection() {
  // Experiment 1 State: Binaural Audio DSP Lab
  const [haasDelay, setHaasDelay] = useState(18); // ms
  const [reverbWet, setReverbWet] = useState(35); // %
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // Experiment 2 State: DevSecOps Commit DAG
  const [selectedCommit, setSelectedCommit] = useState<string>("c2");

  // Experiment 3 State: Geospatial Elevation Slider
  const [waterLevel, setWaterLevel] = useState(42); // meters

  return (
    <section id="experiments" aria-labelledby="experiments-title" className="overflow-x-clip px-6 md:px-10">
      <div className="mx-auto w-full max-w-[1200px] border-x border-foreground/5">
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

        <div className="px-4 pb-8 pt-20 md:px-10 lg:pt-28">
          <h2 id="experiments-title" className="text-3xl font-medium leading-tight md:text-4xl text-foreground">
            AI Experiments &amp; Labs
          </h2>
          <p className="text-sm font-mono text-muted-foreground mt-2">
            Interactive micro-applications exploring audio spatialization, Git forensics, and geospatial modeling.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] border-x border-foreground/5 px-4 pb-20 pt-8 md:px-10">
        <ul className="grid gap-8 md:grid-cols-3">
          {/* Experiment 1: Binaural DSP Lab */}
          <li className="flex flex-col justify-between rounded-[24px] border border-border/60 bg-secondary/30 p-5 transition-all hover:bg-secondary/50">
            <div className="flex flex-col gap-4">
              {/* Interactive Mockup Container */}
              <div className="relative aspect-video overflow-hidden rounded-[18px] bg-neutral-950 p-4 flex flex-col justify-between text-neutral-200 font-mono text-xs border border-neutral-800">
                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="size-3.5 text-blue-400" />
                    HRTF Spatial Matrix
                  </span>
                  <span className="text-blue-400">{haasDelay} ms</span>
                </div>

                {/* Spatial Sound Wave Animation */}
                <div className="flex items-center justify-center gap-1.5 h-16">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-blue-500/80 transition-all duration-150"
                      style={{
                        height: `${12 + Math.sin(i * 0.5 + haasDelay * 0.1) * 22}px`,
                      }}
                    />
                  ))}
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>Haas Interaural Delay</span>
                    <span>{haasDelay}ms</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="35"
                    value={haasDelay}
                    onChange={(e) => setHaasDelay(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground tracking-tight">
                  Interactive 3D Binaural DSP Lab
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                  Direct browser implementation of HRTF spatial convolution with Haas-effect interaural
                  delay adjustment and 10-band FFT frequency analyzer.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <button
                type="button"
                onClick={() => setIsPlayingSound(!isPlayingSound)}
                className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-full bg-background px-5 text-sm font-medium text-foreground outline-none transition-all shadow-sm border border-border/80 hover:bg-secondary cursor-pointer"
              >
                <Play className={`size-3.5 ${isPlayingSound ? "text-emerald-500" : ""}`} />
                {isPlayingSound ? "Acoustic Matrix Active" : "Test Binaural Acoustic"}
              </button>
            </div>
          </li>

          {/* Experiment 2: Git DAG Vulnerability Inspector */}
          <li className="flex flex-col justify-between rounded-[24px] border border-border/60 bg-secondary/30 p-5 transition-all hover:bg-secondary/50">
            <div className="flex flex-col gap-4">
              {/* Interactive Mockup Container */}
              <div className="relative aspect-video overflow-hidden rounded-[18px] bg-neutral-950 p-4 flex flex-col justify-between text-neutral-200 font-mono text-xs border border-neutral-800">
                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <GitBranch className="size-3.5 text-purple-400" />
                    DAG Commit Graph
                  </span>
                  <span className="text-purple-400">SAST: Live</span>
                </div>

                {/* Commit Tree Nodes */}
                <div className="flex items-center justify-around py-2">
                  <button
                    onClick={() => setSelectedCommit("c1")}
                    className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all ${
                      selectedCommit === "c1" ? "bg-neutral-800 border border-purple-500" : ""
                    }`}
                  >
                    <span className="size-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] text-black font-bold">
                      ✓
                    </span>
                    <span className="text-[9px] text-neutral-400">c4a8b</span>
                  </button>

                  <div className="h-0.5 w-6 bg-neutral-700" />

                  <button
                    onClick={() => setSelectedCommit("c2")}
                    className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all ${
                      selectedCommit === "c2" ? "bg-neutral-800 border border-destructive" : ""
                    }`}
                  >
                    <span className="size-4 rounded-full bg-destructive animate-ping" />
                    <span className="text-[9px] text-destructive font-bold">8f9b2</span>
                  </button>

                  <div className="h-0.5 w-6 bg-neutral-700" />

                  <button
                    onClick={() => setSelectedCommit("c3")}
                    className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all ${
                      selectedCommit === "c3" ? "bg-neutral-800 border border-purple-500" : ""
                    }`}
                  >
                    <span className="size-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] text-black font-bold">
                      ✓
                    </span>
                    <span className="text-[9px] text-neutral-400">e21fd</span>
                  </button>
                </div>

                <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-[10px]">
                  {selectedCommit === "c2" ? (
                    <span className="text-destructive flex items-center gap-1">
                      <AlertTriangle className="size-3" />
                      Detected AWS Secret Key in commit 8f9b2 (Deleted branch)
                    </span>
                  ) : (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="size-3" />
                      Commit cleanly verified via non-linear SAST
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground tracking-tight">
                  DevSecOps Git DAG Inspector
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                  Visual graph traversing commit parents, orphan branches, and deleted stash objects to
                  uncover leaked credentials with non-linear scoring.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <a
                href="https://github-guardian.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex h-11 items-center justify-center rounded-full bg-background px-5 text-sm font-medium text-foreground outline-none transition-all shadow-sm border border-border/80 hover:bg-secondary cursor-pointer"
              >
                Launch Scanner Sandbox
              </a>
            </div>
          </li>

          {/* Experiment 3: Geospatial Elevation & Flood Simulator */}
          <li className="flex flex-col justify-between rounded-[24px] border border-border/60 bg-secondary/30 p-5 transition-all hover:bg-secondary/50">
            <div className="flex flex-col gap-4">
              {/* Interactive Mockup Container */}
              <div className="relative aspect-video overflow-hidden rounded-[18px] bg-neutral-950 p-4 flex flex-col justify-between text-neutral-200 font-mono text-xs border border-neutral-800">
                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Layers className="size-3.5 text-emerald-400" />
                    DEM Topography Mask
                  </span>
                  <span className="text-emerald-400">+{waterLevel}m Datum</span>
                </div>

                {/* Simulated Elevation Contour Water Inundation */}
                <div className="relative h-16 w-full rounded overflow-hidden bg-neutral-900 border border-neutral-800 flex items-end">
                  <div
                    className="w-full bg-emerald-500/30 transition-all duration-200 border-t border-emerald-400 flex items-center justify-center text-[10px] text-emerald-300 font-semibold"
                    style={{ height: `${(waterLevel / 80) * 100}%` }}
                  >
                    SAR Water Extent: {(waterLevel * 2.4).toFixed(0)} km²
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>Simulated Inundation Level</span>
                    <span>{waterLevel} meters</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    value={waterLevel}
                    onChange={(e) => setWaterLevel(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground tracking-tight">
                  Geospatial Flood Basin Simulator
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                  Topographic DEM inundation slider demonstrating adaptive Otsu thresholding across
                  elevation contours in real-time.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <a
                href="#work"
                className="w-full inline-flex h-11 items-center justify-center rounded-full bg-background px-5 text-sm font-medium text-foreground outline-none transition-all shadow-sm border border-border/80 hover:bg-secondary cursor-pointer"
              >
                Inspect Climate Engine
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
