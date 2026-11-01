"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import rawContributions from "@/data/githubContributions.json";
import { GithubIcon } from "./Icons";
import {
  Calendar,
  GitCommit,
  RotateCw,
  Info,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const THEMES = {
  cyan: {
    name: "Electric Cyan",
    levels: [
      "bg-secondary/40 border-border/30",
      "bg-[#083344] border-[#083344]",
      "bg-[#0e7490] border-[#0e7490]",
      "bg-[#06b6d4] border-[#06b6d4]",
      "bg-[#22d3ee] border-[#22d3ee]",
    ],
    legend: ["#161b22", "#083344", "#0e7490", "#06b6d4", "#22d3ee"],
  },
  emerald: {
    name: "Classic Emerald",
    levels: [
      "bg-secondary/40 border-border/30",
      "bg-[#0e4429] border-[#0e4429]",
      "bg-[#006d32] border-[#006d32]",
      "bg-[#26a641] border-[#26a641]",
      "bg-[#39d353] border-[#39d353]",
    ],
    legend: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  },
  purple: {
    name: "Amethyst",
    levels: [
      "bg-secondary/40 border-border/30",
      "bg-[#3b0764] border-[#3b0764]",
      "bg-[#6b21a8] border-[#6b21a8]",
      "bg-[#9333ea] border-[#9333ea]",
      "bg-[#c084fc] border-[#c084fc]",
    ],
    legend: ["#161b22", "#3b0764", "#6b21a8", "#9333ea", "#c084fc"],
  },
  monochrome: {
    name: "Monochrome",
    levels: [
      "bg-secondary/40 border-border/30",
      "bg-neutral-800 border-neutral-800",
      "bg-neutral-600 border-neutral-600",
      "bg-neutral-400 border-neutral-400",
      "bg-neutral-100 border-neutral-100",
    ],
    legend: ["#161b22", "#27272a", "#52525b", "#a1a1aa", "#f4f4f5"],
  },
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function GithubContributionGraph() {
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof THEMES>("emerald");
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [activeOnly, setActiveOnly] = useState<boolean>(false);
  const [liveData, setLiveData] = useState(rawContributions);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("Just now");

  // Load user saved theme if any (default emerald)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("github_palette_theme") as keyof typeof THEMES | null;
      if (saved && THEMES[saved] && saved !== "monochrome") {
        setSelectedTheme(saved);
      } else {
        setSelectedTheme("emerald");
      }
    } catch {}
  }, []);

  const handleSelectTheme = (tKey: keyof typeof THEMES) => {
    setSelectedTheme(tKey);
    try {
      localStorage.setItem("github_palette_theme", tKey);
    } catch {}
  };

  // Fetch function to sync with GitHub API
  const syncWithGithub = useCallback(() => {
    setIsRefreshing(true);
    fetch("https://github-contributions-api.jogruber.de/v4/Daksh-create349")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Live API unavailable");
      })
      .then((data) => {
        if (data && data.contributions) {
          setLiveData(data);
          const now = new Date();
          setLastUpdated(`${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`);
        }
      })
      .catch(() => {
        // Keep existing valid data
      })
      .finally(() => {
        setTimeout(() => setIsRefreshing(false), 600);
      });
  }, []);

  // Initial fetch and auto-polling every 60 seconds
  useEffect(() => {
    syncWithGithub();
    const interval = setInterval(syncWithGithub, 60000);
    return () => clearInterval(interval);
  }, [syncWithGithub]);

  // Filter contributions by selected year
  const filteredDays = useMemo(() => {
    const all: ContributionDay[] = liveData.contributions || [];
    if (selectedYear === "all") return all;
    return all.filter((d) => d.date.startsWith(selectedYear));
  }, [liveData, selectedYear]);

  // Compute key telemetry statistics
  const stats = useMemo(() => {
    let total = 0;
    let maxCount = 0;
    let maxDate = "";
    let activeDays = 0;

    filteredDays.forEach((d) => {
      total += d.count;
      if (d.count > 0) activeDays++;
      if (d.count > maxCount) {
        maxCount = d.count;
        maxDate = d.date;
      }
    });

    const activeRatio =
      filteredDays.length > 0 ? Math.round((activeDays / filteredDays.length) * 100) : 0;

    return {
      total,
      maxCount,
      maxDate,
      activeDays,
      activeRatio,
    };
  }, [filteredDays]);

  // Group filtered days into weeks (columns)
  const weeks = useMemo(() => {
    const list: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    const sorted = [...filteredDays].sort((a, b) => a.date.localeCompare(b.date));

    if (sorted.length > 0) {
      const firstDate = new Date(sorted[0].date);
      const firstDayOfWeek = firstDate.getDay();
      for (let i = 0; i < firstDayOfWeek; i++) {
        currentWeek.push({ date: "", count: -1, level: -1 });
      }
    }

    sorted.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        list.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      list.push(currentWeek);
    }

    return list;
  }, [filteredDays]);

  const themeConfig = THEMES[selectedTheme];

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-[28px] border border-border/80 bg-secondary/35 p-6 sm:p-8 backdrop-blur-md shadow-sm space-y-6">
      {/* Top Header & Telemetry Badges (Zero green pills) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border/50 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background">
              <GithubIcon className="size-4" />
            </span>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                GitHub Contribution Activity
              </h3>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                Live commit stream from{" "}
                <a
                  href="https://github.com/Daksh-create349"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:underline font-semibold"
                >
                  github.com/Daksh-create349
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid (Clean neutral typography, zero green pills) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-background/80 border border-border/60">
            <span className="text-muted-foreground text-[10px] uppercase tracking-wider block">
              Total Commits
            </span>
            <span className="text-base font-bold text-foreground font-sans">
              {stats.total.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-background/80 border border-border/60">
            <span className="text-muted-foreground text-[10px] uppercase tracking-wider block">
              Active Days
            </span>
            <span className="text-base font-bold text-foreground font-sans">
              {stats.activeDays} days
            </span>
          </div>

          <div className="p-3 rounded-xl bg-background/80 border border-border/60">
            <span className="text-muted-foreground text-[10px] uppercase tracking-wider block">
              Consistency Rate
            </span>
            <span className="text-base font-bold text-foreground font-sans">
              {stats.activeRatio}%
            </span>
          </div>

          <div className="p-3 rounded-xl bg-background/80 border border-border/60">
            <span className="text-muted-foreground text-[10px] uppercase tracking-wider block">
              Peak Day Velocity
            </span>
            <span className="text-base font-bold text-foreground font-sans">
              {stats.maxCount} commits
            </span>
          </div>
        </div>
      </div>

      {/* Control Toolbar: Year Tabs, Palette Switcher & Sync Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Year Filter Tabs */}
        <div className="inline-flex rounded-full bg-background border border-border/70 p-1 shadow-2xs">
          {["2026", "2025", "all"].map((year) => {
            const isSelected = selectedYear === year;
            const label = year === "all" ? "All Time" : year;

            return (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`rounded-full px-4 py-1.5 text-xs font-mono font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-foreground text-background font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Controls: Palette + Active Toggle + Live Sync */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Palette Switcher */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <span className="text-[11px]">Palette:</span>
            {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map((tKey) => {
              const isSelected = selectedTheme === tKey;
              return (
                <button
                  key={tKey}
                  type="button"
                  onClick={() => handleSelectTheme(tKey)}
                  title={THEMES[tKey].name}
                  className={`size-5 rounded-full border transition-transform cursor-pointer ${
                    isSelected
                      ? "ring-2 ring-foreground scale-110"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: THEMES[tKey].legend[3] }}
                />
              );
            })}
          </div>

          {/* Active Highlight Toggle */}
          <button
            type="button"
            onClick={() => setActiveOnly(!activeOnly)}
            className={`rounded-full border px-3 py-1 text-xs font-mono transition-all cursor-pointer ${
              activeOnly
                ? "bg-foreground text-background border-foreground font-medium"
                : "bg-background border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeOnly ? "High Intensity" : "Show All"}
          </button>

          {/* Live Sync Now Button */}
          <button
            type="button"
            onClick={syncWithGithub}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-3 py-1 text-xs font-mono text-foreground hover:bg-secondary transition-all cursor-pointer"
            title="Fetch latest commits from GitHub"
          >
            <RotateCw className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? "Syncing..." : `Sync (${lastUpdated})`}</span>
          </button>
        </div>
      </div>

      {/* Heatmap Matrix Display */}
      <div className="relative rounded-2xl bg-background/90 border border-border/80 p-5 overflow-x-auto shadow-inner">
        {/* Month labels */}
        <div className="flex justify-between text-[11px] font-mono text-muted-foreground pb-2 min-w-[720px] px-2">
          {MONTH_NAMES.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="flex gap-[3.5px] min-w-[720px]">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-[3.5px]">
              {week.map((day, dIdx) => {
                if (day.count === -1) {
                  return <div key={dIdx} className="size-3 rounded-[3px] opacity-0" />;
                }

                const isDimmed = activeOnly && day.count === 0;
                const levelIdx = Math.min(Math.max(day.level, 0), 4);
                const colorClass = themeConfig.levels[levelIdx];
                const isHovered = hoveredDay?.date === day.date;

                return (
                  <div
                    key={day.date || dIdx}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`size-3 rounded-[3px] border transition-all duration-150 cursor-pointer ${colorClass} ${
                      isDimmed ? "opacity-15" : "opacity-100"
                    } ${isHovered ? "scale-140 z-20 ring-2 ring-foreground" : "hover:scale-125"}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Dynamic Hover Tooltip / Status Display */}
        <div className="mt-4 pt-4 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
          {hoveredDay ? (
            <div className="flex items-center gap-2 text-foreground">
              <span className="font-semibold">{hoveredDay.count} contributions</span>
              <span>on</span>
              <span className="text-muted-foreground font-medium">
                {formatDate(hoveredDay.date)}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Info className="size-3.5 text-muted-foreground" />
              <span>Hover over any cell to inspect daily commit density</span>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <span className="text-[11px]">Less</span>
            {themeConfig.levels.map((lvlClass, idx) => (
              <span key={idx} className={`size-3 rounded-[2px] border ${lvlClass}`} />
            ))}
            <span className="text-[11px]">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
