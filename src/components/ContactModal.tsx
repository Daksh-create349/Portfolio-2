"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Mail,
  Phone,
  Copy,
  Check,
  X,
  ArrowUpRight,
  Send,
  MessageSquare,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const email = "dakshshrivastav56@gmail.com";
  const phone = "+91-9588415901";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    try {
      confetti({
        particleCount: 55,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#d4d4d8", "#71717a"],
      });
    } catch {}

    setTimeout(() => setCopied(false), 2400);
  };

  const scrollToContactForm = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById("about");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Dimmed Ambient Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xl transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Standard Clean Dialog Card */}
      <div className="relative z-10 w-full max-w-lg rounded-[28px] border border-border bg-background p-6 sm:p-8 shadow-2xl transition-all duration-300">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-5 top-5 inline-flex size-9 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors cursor-pointer border border-border/50"
        >
          <X className="size-4" />
        </button>

        {/* Dialog Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/50 text-xs font-mono text-muted-foreground">
            <span>Direct Channel &middot; Mumbai (IST)</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground pt-1">
            Let&apos;s build together.
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
            Available for full-stack engineering, AI systems, and DevSecOps opportunities. Open to worldwide remote and hybrid work.
          </p>
        </div>

        {/* Featured Email & Direct Dispatch Hero Card */}
        <div className="mt-6 rounded-2xl border border-border/80 bg-secondary/35 p-4 sm:p-5 space-y-3.5 backdrop-blur-sm shadow-xs">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                <Mail className="size-4.5" />
              </span>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                  Direct Email
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-foreground truncate block">
                  {email}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-foreground px-3.5 py-2 text-xs font-medium text-background hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="size-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Action: Scroll to On-Page Direct Form */}
          <button
            type="button"
            onClick={scrollToContactForm}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-background/80 hover:bg-background border border-border/70 text-xs font-mono text-foreground font-medium transition-all group cursor-pointer"
          >
            <Send className="size-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span>Open in-page direct message form</span>
            <ArrowUpRight className="size-3 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 2x2 Network Channels Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/daksh-srivastava-2ba851344"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-secondary/30 p-3 hover:bg-secondary/60 hover:border-foreground/20 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background border border-border/60 text-foreground group-hover:scale-105 transition-transform">
                <LinkedinIcon className="size-4" />
              </span>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-muted-foreground block">Professional</span>
                <span className="text-xs font-medium text-foreground truncate block">LinkedIn Profile</span>
              </div>
            </div>
            <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Daksh-create349"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-secondary/30 p-3 hover:bg-secondary/60 hover:border-foreground/20 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background border border-border/60 text-foreground group-hover:scale-105 transition-transform">
                <GithubIcon className="size-4" />
              </span>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-muted-foreground block">Open Source</span>
                <span className="text-xs font-medium text-foreground truncate block">Daksh-create349</span>
              </div>
            </div>
            <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </a>

          {/* Phone */}
          <a
            href={`tel:${phone}`}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-secondary/30 p-3 hover:bg-secondary/60 hover:border-foreground/20 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background border border-border/60 text-foreground group-hover:scale-105 transition-transform">
                <Phone className="size-4" />
              </span>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-muted-foreground block">Direct Phone</span>
                <span className="text-xs font-medium text-foreground truncate block">{phone}</span>
              </div>
            </div>
            <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </a>

          {/* Mail Composer */}
          <a
            href={`mailto:${email}?subject=Hello%20Daksh!`}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-secondary/30 p-3 hover:bg-secondary/60 hover:border-foreground/20 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background border border-border/60 text-foreground group-hover:scale-105 transition-transform">
                <MessageSquare className="size-4" />
              </span>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-muted-foreground block">Mail App</span>
                <span className="text-xs font-medium text-foreground truncate block">Open Composer</span>
              </div>
            </div>
            <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
