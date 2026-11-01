"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Mail,
  Phone,
  Copy,
  Check,
  X,
  Sparkles,
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function GithubIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
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
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-lg rounded-[28px] border border-border/80 bg-background p-6 sm:p-8 shadow-2xl transition-all duration-300">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 inline-flex size-9 items-center justify-center rounded-full bg-secondary text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
          <Sparkles className="size-3.5 text-blue-500" />
          <span>Get in touch</span>
        </div>

        <h3 className="text-2xl font-semibold tracking-tight text-foreground">
          Let&apos;s build something exceptional.
        </h3>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          Available for software engineering, AI engineering, and DevSecOps roles. Based in Mumbai, open to global remote.
        </p>

        {/* Primary Email Card with Quick Copy */}
        <div className="mt-6 rounded-2xl border border-border/80 bg-secondary/40 p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 truncate">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background border border-border/60 text-foreground">
              <Mail className="size-4" />
            </span>
            <div className="truncate">
              <span className="text-[11px] font-mono text-muted-foreground block">Email</span>
              <span className="font-mono text-xs sm:text-sm font-medium text-foreground truncate block">
                {email}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-foreground px-3.5 py-2 text-xs font-medium text-background hover:opacity-90 transition-opacity cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-foreground" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Links Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/daksh-srivastava-2ba851344"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-border/70 bg-secondary/30 p-3.5 hover:bg-secondary/70 transition-all group"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background border border-border/60 text-foreground group-hover:scale-105 transition-transform">
              <LinkedinIcon className="size-4 text-blue-600" />
            </span>
            <div>
              <span className="text-[11px] font-mono text-muted-foreground block">LinkedIn</span>
              <span className="text-xs font-medium text-foreground">Daksh Srivastava</span>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Daksh-create349"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-border/70 bg-secondary/30 p-3.5 hover:bg-secondary/70 transition-all group"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background border border-border/60 text-foreground group-hover:scale-105 transition-transform">
              <GithubIcon className="size-4" />
            </span>
            <div>
              <span className="text-[11px] font-mono text-muted-foreground block">GitHub</span>
              <span className="text-xs font-medium text-foreground">Daksh-create349</span>
            </div>
          </a>

          {/* Phone */}
          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-secondary/30 p-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background border border-border/60 text-foreground">
              <Phone className="size-4 text-foreground/80" />
            </span>
            <div>
              <span className="text-[11px] font-mono text-muted-foreground block">Phone</span>
              <span className="text-xs font-medium text-foreground">{phone}</span>
            </div>
          </div>

          {/* Direct Mailto */}
          <a
            href={`mailto:${email}?subject=Hello%20Daksh!`}
            className="flex items-center gap-3 rounded-2xl border border-border/70 bg-secondary/30 p-3.5 hover:bg-secondary/70 transition-all group"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background border border-border/60 text-foreground group-hover:scale-105 transition-transform">
              <Mail className="size-4 text-purple-500" />
            </span>
            <div>
              <span className="text-[11px] font-mono text-muted-foreground block">Mail Client</span>
              <span className="text-xs font-medium text-foreground">Open Composer</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
