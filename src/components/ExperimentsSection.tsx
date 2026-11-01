"use client";

import React, { useState } from "react";
import {
  Bot,
  ShieldAlert,
  Flame,
  Star,
  ExternalLink,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export function ExperimentsSection() {
  // Experiment 1 State: Contradiction-MCP Reconciler
  const [resolved, setResolved] = useState(false);

  // Experiment 2 State: data-autopsy Scanner
  const [leakDetected, setLeakDetected] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  // Experiment 3 State: Blood-Bridge 3.0 Units
  const [bloodUnits, setBloodUnits] = useState({
    oNeg: 2,
    aPos: 48,
    bPos: 24,
  });

  const runAutopsyScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setLeakDetected(!leakDetected);
      setIsScanning(false);
    }, 700);
  };

  const dispatchBloodDonor = () => {
    setBloodUnits((prev) => ({
      ...prev,
      oNeg: prev.oNeg + 1,
    }));
  };

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
          <div className="flex items-center gap-2 mb-2">
            <span className="size-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Featured Open-Source Innovations
            </span>
          </div>
          <h2 id="experiments-title" className="text-3xl font-medium leading-tight md:text-4xl text-foreground">
            Top Starred GitHub Systems &amp; Labs
          </h2>
          <p className="text-sm font-mono text-muted-foreground mt-2">
            Interactive playgrounds running live instances of my most starred and recognized open-source engines.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] border-x border-foreground/5 px-4 pb-20 pt-8 md:px-10">
        <ul className="grid gap-8 md:grid-cols-3">
          {/* Lab 1: Contradiction-MCP (★ 7 Stars) */}
          <li className="flex flex-col justify-between rounded-[26px] border border-border/80 bg-background/90 p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                    <Bot className="size-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">
                        Contradiction-MCP
                      </h3>
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/10 text-amber-500 font-mono text-[10px] px-2 py-0.5 font-bold">
                        <Star className="size-2.5 fill-amber-500" /> 7 Stars
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-muted-foreground">Model Context Protocol</p>
                  </div>
                </div>

                <a
                  href="https://github.com/Daksh-create349/Contradiction-MCP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="size-4" />
                </a>
              </div>

              {/* Interactive Mockup */}
              <div className="rounded-[18px] bg-neutral-950 p-4 font-mono text-xs text-neutral-200 border border-neutral-800 space-y-2.5">
                <div className="flex justify-between items-center text-[10px] text-neutral-400">
                  <span>MCP SERVER: ONLINE</span>
                  <span className="text-purple-400">PORT: 8080</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                    <span className="text-neutral-500 block">Source A</span>
                    <span className="text-red-400">Cache TTL: 60s</span>
                  </div>
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                    <span className="text-neutral-500 block">Source B</span>
                    <span className="text-emerald-400">Cache TTL: 300s</span>
                  </div>
                </div>

                <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-[10px]">
                  {resolved ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="size-3" />
                      Consensus reached: Reconciled to authoritative TTL (300s)
                    </span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1">
                      <AlertTriangle className="size-3" />
                      Divergence detected: 2 conflicting statements in knowledge base
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Autonomous Model Context Protocol (MCP) engine for factual consistency, version reconciliation,
                  and conflict resolution across engineering knowledge bases.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <button
                type="button"
                onClick={() => setResolved(!resolved)}
                className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-full bg-secondary hover:bg-secondary/80 border border-border px-5 text-xs font-mono font-medium text-foreground transition-all cursor-pointer"
              >
                <RotateCcw className="size-3.5 text-purple-500" />
                <span>{resolved ? "Simulate New Conflict" : "Trigger Autonomous Reconciliation"}</span>
              </button>
            </div>
          </li>

          {/* Lab 2: data-autopsy (★ 6 Stars) */}
          <li className="flex flex-col justify-between rounded-[26px] border border-border/80 bg-background/90 p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                    <ShieldAlert className="size-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">
                        data-autopsy
                      </h3>
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/10 text-amber-500 font-mono text-[10px] px-2 py-0.5 font-bold">
                        <Star className="size-2.5 fill-amber-500" /> 6 Stars
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-muted-foreground">AI Dataset Forensic Suite</p>
                  </div>
                </div>

                <a
                  href="https://github.com/Daksh-create349/data-autopsy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="size-4" />
                </a>
              </div>

              {/* Interactive Mockup */}
              <div className="rounded-[18px] bg-neutral-950 p-4 font-mono text-xs text-neutral-200 border border-neutral-800 space-y-2">
                <div className="flex justify-between items-center text-[10px] text-neutral-400">
                  <span>FORENSIC SCANNER</span>
                  <span className="text-rose-400">{isScanning ? "SCANNING..." : "IDLE"}</span>
                </div>

                <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 space-y-1 text-[11px]">
                  <p className="text-neutral-400">$ data-autopsy inspect --file train.csv</p>
                  {leakDetected ? (
                    <p className="text-rose-400 font-semibold">
                      [ALERT] Target Leakage: &apos;tx_post_event&apos; (cov: 0.994)
                    </p>
                  ) : (
                    <p className="text-emerald-400 font-semibold">
                      [PASS] Zero target leakage detected across 42 columns
                    </p>
                  )}
                  <p className="text-neutral-500 text-[10px]">Statistical anomaly entropy: 0.042</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Serious AI forensic investigation workstation for tabular datasets: detects target leakage,
                  structural corruption, and statistical anomalies with reproducible local AI evidence.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <button
                type="button"
                onClick={runAutopsyScan}
                disabled={isScanning}
                className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-full bg-secondary hover:bg-secondary/80 border border-border px-5 text-xs font-mono font-medium text-foreground transition-all cursor-pointer"
              >
                <Play className="size-3.5 text-rose-500" />
                <span>{isScanning ? "Processing Heuristics..." : "Run Forensic Investigation"}</span>
              </button>
            </div>
          </li>

          {/* Lab 3: Blood-Bridge 3.0 (★ 3 Stars) */}
          <li className="flex flex-col justify-between rounded-[26px] border border-border/80 bg-background/90 p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                    <Flame className="size-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">
                        Blood-Bridge 3.0
                      </h3>
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/10 text-amber-500 font-mono text-[10px] px-2 py-0.5 font-bold">
                        <Star className="size-2.5 fill-amber-500" /> 3 Stars
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-muted-foreground">Emergency Health Logistics</p>
                  </div>
                </div>

                <a
                  href="https://github.com/Daksh-create349/Blood-Bridge-3.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="size-4" />
                </a>
              </div>

              {/* Interactive Mockup */}
              <div className="rounded-[18px] bg-neutral-950 p-4 font-mono text-xs text-neutral-200 border border-neutral-800 space-y-2">
                <div className="flex justify-between items-center text-[10px] text-neutral-400">
                  <span>HOSPITAL NETWORK</span>
                  <span className="text-red-400">DISPATCH READY</span>
                </div>

                <div className="space-y-1.5 text-[10px]">
                  <div className="flex justify-between items-center p-1.5 rounded bg-neutral-900 border border-neutral-800">
                    <span className="text-red-400 font-semibold">O- Universal Donor</span>
                    <span className="text-red-400 font-bold">{bloodUnits.oNeg} Units In Stock</span>
                  </div>
                  <div className="flex justify-between items-center p-1.5 rounded bg-neutral-900 border border-neutral-800">
                    <span>A+ Positive</span>
                    <span className="text-emerald-400">{bloodUnits.aPos} Units</span>
                  </div>
                  <div className="flex justify-between items-center p-1.5 rounded bg-neutral-900 border border-neutral-800">
                    <span>B+ Positive</span>
                    <span className="text-emerald-400">{bloodUnits.bPos} Units</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Real-time platform connecting blood donors with nearby ICUs, automating blood inventory
                  telemetry, and optimizing emergency dispatch via geospatial matching.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <button
                type="button"
                onClick={dispatchBloodDonor}
                className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-full bg-secondary hover:bg-secondary/80 border border-border px-5 text-xs font-mono font-medium text-foreground transition-all cursor-pointer"
              >
                <Flame className="size-3.5 text-red-500" />
                <span>Simulate Emergency Donor Dispatch</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
