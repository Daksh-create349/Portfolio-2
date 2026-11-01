"use client";

import React, { useState, useEffect } from "react";
import { Users, Sparkles, ArrowRight, X } from "lucide-react";

export interface CursorUser {
  id: string;
  name: string;
  color: string;
}

export const CURSOR_COLORS = [
  { name: "Figma Blue", hex: "#0D99FF" },
  { name: "Purple", hex: "#A259FF" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Coral", hex: "#FF7262" },
  { name: "Amber", hex: "#F59E0B" },
  { name: "Hot Pink", hex: "#EC4899" },
  { name: "Cyan", hex: "#06B6D4" },
];

interface JoinCanvasModalProps {
  isOpen: boolean;
  onJoin: (user: CursorUser) => void;
  onClose: () => void;
  currentUser?: CursorUser;
}

export function JoinCanvasModal({
  isOpen,
  onJoin,
  onClose,
  currentUser,
}: JoinCanvasModalProps) {
  const [name, setName] = useState(currentUser?.name || "");
  const [selectedColor, setSelectedColor] = useState(
    currentUser?.color || CURSOR_COLORS[0].hex
  );

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setSelectedColor(currentUser.color);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || "Visitor";
    const user: CursorUser = {
      id: currentUser?.id || `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: finalName,
      color: selectedColor,
    };
    onJoin(user);
  };

  const handleGuest = () => {
    const randomColor =
      CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)].hex;
    const user: CursorUser = {
      id: currentUser?.id || `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: `Guest #${Math.floor(Math.random() * 899 + 100)}`,
      color: randomColor,
    };
    onJoin(user);
  };

  const handleDismiss = () => {
    if (!currentUser) {
      handleGuest();
    } else {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xl transition-opacity duration-300"
        onClick={handleDismiss}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[32px] border border-border/80 bg-background/95 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all">
        {/* Top Glow Accent */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 size-56 rounded-full blur-3xl opacity-25 transition-colors duration-300"
          style={{ backgroundColor: selectedColor }}
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-5 top-5 inline-flex size-8 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border/50"
          title="Dismiss"
        >
          <X className="size-3.5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/50 text-xs font-mono text-muted-foreground">
            <Users className="size-3 text-blue-500" />
            <span>Multiplayer Canvas</span>
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            Choose your cursor.
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Pick a name and cursor color so others can see you exploring in real-time. (Only movement is shared &mdash; zero clicks or interactions).
          </p>
        </div>

        {/* Live Cursor Preview */}
        <div className="my-6 rounded-2xl border border-border/70 bg-secondary/35 p-5 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground self-start">
            Live Preview
          </span>

          <div className="py-2 flex items-start select-none">
            {/* Pointer SVG */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-md"
            >
              <path
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                fill={selectedColor}
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>

            {/* Tag Badge */}
            <div
              className="ml-1 -mt-0.5 rounded-full px-3 py-1 text-xs font-medium text-white shadow-md border border-white/35 whitespace-nowrap transition-colors"
              style={{ backgroundColor: selectedColor }}
            >
              <span className="font-mono text-[11px] leading-none">
                {name.trim() || "Your Name"}
              </span>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="cursor-display-name"
              className="text-xs font-mono text-foreground font-medium block"
            >
              Your Name
            </label>
            <input
              id="cursor-display-name"
              type="text"
              maxLength={20}
              placeholder="e.g. Sarah, Alex, Fellow Dev..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-xs font-sans text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-foreground/50 transition-colors"
            />
          </div>

          {/* Color Palette Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-foreground font-medium block">
              Cursor Color
            </label>
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-secondary/40 border border-border/60">
              {CURSOR_COLORS.map((c) => {
                const isSelected = selectedColor === c.hex;
                return (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setSelectedColor(c.hex)}
                    title={c.name}
                    aria-label={`Select ${c.name} cursor color`}
                    className={`size-7 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${
                      isSelected
                        ? "scale-115 ring-2 ring-white ring-offset-2 ring-offset-background"
                        : "hover:scale-105 opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-full py-2.5 px-4 text-xs font-semibold text-white transition-opacity hover:opacity-90 shadow-md cursor-pointer"
              style={{ backgroundColor: selectedColor }}
            >
              <span>Join Live Canvas</span>
              <ArrowRight className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={handleGuest}
              className="w-full text-center text-[11px] font-mono text-muted-foreground hover:text-foreground py-1 transition-colors cursor-pointer"
            >
              Skip &amp; continue as guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
