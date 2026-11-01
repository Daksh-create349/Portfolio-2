"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Send,
  Mail,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const SUBJECT_PRESETS = [
  "Software / AI Internship Opportunity",
  "Full-Stack Project Collaboration",
  "Technical Workshop / Speaking Invitation",
  "General Engineering Inquiry",
];

export function AskDakshSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Message Form State
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const DAKSH_EMAIL = "dakshshrivastav56@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DAKSH_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) {
      setFormError("Please enter a subject.");
      return;
    }
    if (!content.trim()) {
      setFormError("Please enter your message content.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      // 1. Send directly via internal Next.js API route (FormSubmit integration)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: senderName || "Portfolio Visitor",
          email: senderEmail || "anonymous@visitor.dev",
          subject,
          message: content,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSent(true);
        try {
          confetti({
            particleCount: 65,
            spread: 60,
            origin: { y: 0.7 },
            colors: ["#3b82f6", "#10b981", "#8b5cf6"],
          });
        } catch {}
        return;
      }

      throw new Error(data.error || "Failed to deliver");
    } catch {
      // 2. Direct browser fallback to FormSubmit
      try {
        const directRes = await fetch("https://formsubmit.co/ajax/dakshshrivastav56@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: senderName || "Portfolio Visitor",
            email: senderEmail || "anonymous@visitor.dev",
            _subject: `[Portfolio] ${subject}`,
            message: content,
            _captcha: "false",
          }),
        });

        const directData = await directRes.json();
        if (directRes.ok && (directData.success === "true" || directData.success === true)) {
          setIsSent(true);
          try {
            confetti({
              particleCount: 65,
              spread: 60,
              origin: { y: 0.7 },
              colors: ["#3b82f6", "#10b981", "#8b5cf6"],
            });
          } catch {}
          return;
        }
      } catch {}

      // 3. Fallback to native mailto client
      const bodyFormatted = `From: ${senderName || "Visitor"} (${senderEmail || "No email provided"})\n\n${content}`;
      window.location.href = `mailto:${DAKSH_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(bodyFormatted)}`;
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubject("");
    setContent("");
    setIsSent(false);
    setFormError("");
  };

  return (
    <div className="w-full">
      <div className="rounded-[28px] border border-border/80 bg-secondary/30 p-5 sm:p-8 backdrop-blur-md shadow-sm flex flex-col gap-6">
        {/* Header with Email */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                Send a Direct Message
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-mono text-muted-foreground">
                  To:{" "}
                  <strong className="text-foreground font-semibold">
                    {DAKSH_EMAIL}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 text-[11px] font-mono cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="size-3 text-foreground" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Message Form */}
        <div>
          {isSent ? (
            <div className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-4 rounded-2xl bg-background/80 border border-border/80">
              <div className="grid size-12 place-items-center rounded-full bg-secondary text-foreground">
                <CheckCircle2 className="size-6 text-foreground" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-foreground">
                  Message Delivered Directly to Daksh!
                </h4>
                <p className="text-xs text-muted-foreground max-w-sm">
                  Your message has been sent directly to <strong className="text-foreground">{DAKSH_EMAIL}</strong>. Daksh will reply to <strong className="text-foreground">{senderEmail || "your email"}</strong> shortly.
                </p>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-mono text-foreground hover:bg-secondary transition-colors cursor-pointer"
              >
                <RotateCcw className="size-3" />
                <span>Send another message</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4">
              {/* Subject Presets */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                  Quick Subject Presets
                </label>
                <div className="flex flex-wrap gap-2">
                  {SUBJECT_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setSubject(preset)}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                        subject === preset
                          ? "bg-foreground text-background font-semibold"
                          : "bg-background/80 hover:bg-secondary border border-border/70 text-foreground/80 hover:text-foreground"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-subject"
                  className="text-xs font-mono text-foreground font-medium flex items-center justify-between"
                >
                  <span>Subject</span>
                  <span className="text-muted-foreground text-[10px]">*Required</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="e.g. AI Systems Collaboration / Opportunity"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-xs font-sans text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-foreground/40 transition-colors"
                />
              </div>

              {/* Sender Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-sender-name"
                    className="text-xs font-mono text-foreground font-medium"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-sender-name"
                    type="text"
                    placeholder="Alex Chen"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-xs font-sans text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-foreground/40 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-sender-email"
                    className="text-xs font-mono text-foreground font-medium"
                  >
                    Your Email (For reply)
                  </label>
                  <input
                    id="contact-sender-email"
                    type="email"
                    placeholder="alex@company.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-xs font-sans text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-foreground/40 transition-colors"
                  />
                </div>
              </div>

              {/* Content Box */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message-body"
                  className="text-xs font-mono text-foreground font-medium flex items-center justify-between"
                >
                  <span>Message Content</span>
                  <span className="text-muted-foreground text-[10px]">*Required</span>
                </label>
                <textarea
                  id="contact-message-body"
                  required
                  rows={4}
                  placeholder="Hi Daksh, I came across your portfolio and would love to discuss..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full rounded-xl border border-border/70 bg-background p-3 text-xs font-sans text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-foreground/40 transition-colors resize-y leading-relaxed"
                />
              </div>

              {formError && (
                <p className="text-xs font-mono text-destructive">
                  {formError}
                </p>
              )}

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] font-mono text-muted-foreground">
                  Sends directly to Daksh&apos;s personal inbox
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs font-semibold text-background hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shadow-sm w-full sm:w-auto justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <RotateCcw className="size-3.5 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="size-3.5" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
