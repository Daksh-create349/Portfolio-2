"use client";

import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { getDakshAnswer } from "@/data/askDakshKnowledge";
import {
  Send,
  Bot,
  Mail,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  followUps?: string[];
}

const DEFAULT_SUGGESTIONS = [
  "What makes Sonaura 2.0 unique?",
  "Explain AQUILA's flood prediction pipeline",
  "What is your GPA and university standing?",
  "What awards have you won?",
  "How can I contact or hire Daksh?",
];

const SUBJECT_PRESETS = [
  "Software / AI Internship Opportunity",
  "Full-Stack Project Collaboration",
  "Technical Workshop / Speaking Invitation",
  "General Engineering Inquiry",
];

export function AskDakshSection() {
  const [activeTab, setActiveTab] = useState<"message" | "assistant">("message");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Message Form State
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState("");

  // AI Assistant Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      sender: "bot",
      text: "Hi! I'm Daksh's interactive portfolio assistant. Ask me anything about his projects (**Sonaura 2.0**, **AQUILA**, **GitHub Guardian**, **HyperMind**), academic record (**CGPA 9.57** at ITM Skills University), hackathon wins, or engineering stack!",
      followUps: DEFAULT_SUGGESTIONS.slice(0, 3),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const DAKSH_EMAIL = "dakshshrivastav56@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DAKSH_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
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

    // Build the mailto link
    const bodyFormatted = `From: ${senderName || "Visitor"} (${senderEmail || "No email provided"})\n\n${content}`;
    const mailtoUrl = `mailto:${DAKSH_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyFormatted)}`;

    // Trigger email client
    window.location.href = mailtoUrl;

    // Fire confetti celebration
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#3b82f6", "#10b981", "#8b5cf6"],
      });
    } catch {
      // safe fallback
    }

    setIsSent(true);
  };

  const resetForm = () => {
    setSubject("");
    setContent("");
    setIsSent(false);
    setFormError("");
  };

  // Assistant Scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeTab === "assistant") {
      scrollToBottom();
    }
  }, [messages, isTyping, activeTab]);

  const handleAssistantSend = (queryToSend?: string) => {
    const text = (queryToSend || input).trim();
    if (!text) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const { response, followUps } = getDakshAnswer(text);
      const botMessage: Message = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: response,
        followUps,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const resetChat = () => {
    setMessages([
      {
        id: "intro-reset",
        sender: "bot",
        text: "Chat cleared! Ask me anything about Daksh's projects, coursework, or awards.",
        followUps: DEFAULT_SUGGESTIONS.slice(0, 3),
      },
    ]);
  };

  return (
    <div className="w-full">
      <div className="rounded-[28px] border border-border/80 bg-secondary/30 p-5 sm:p-8 backdrop-blur-md shadow-sm flex flex-col gap-6">
        {/* Header with Email and Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="size-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  Send a Direct Message
                </h3>
                <span className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-mono font-medium text-foreground border border-border/70">
                  <span className="size-1.5 rounded-full bg-foreground/60" />
                  <span>Available</span>
                </span>
              </div>
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

          {/* Tab Switcher */}
          <div className="inline-flex rounded-full bg-background border border-border/70 p-1 self-start sm:self-auto shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab("message")}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeTab === "message"
                  ? "bg-foreground text-background font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mail className="size-3.5" />
              <span>Direct Message</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("assistant")}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeTab === "assistant"
                  ? "bg-foreground text-background font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Bot className="size-3.5" />
              <span>AI Assistant</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Direct Message Form (Default) */}
        {activeTab === "message" && (
          <div>
            {isSent ? (
              <div className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-4 rounded-2xl bg-background/80 border border-border/80">
                <div className="grid size-12 place-items-center rounded-full bg-secondary text-foreground">
                  <CheckCircle2 className="size-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-foreground tracking-tight">
                    Message Dispatched!
                  </h4>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Your email client has been launched with your message pre-filled to{" "}
                    <strong className="text-foreground">{DAKSH_EMAIL}</strong>. Daksh will reply directly to your inbox.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-2 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-mono font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Send Another Message</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-5">
                {/* Sender Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="sender-name"
                      className="block text-xs font-mono font-medium text-muted-foreground"
                    >
                      Your Name
                    </label>
                    <input
                      id="sender-name"
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Alex Chen"
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="sender-email"
                      className="block text-xs font-mono font-medium text-muted-foreground"
                    >
                      Your Email (for replies)
                    </label>
                    <input
                      id="sender-email"
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full rounded-xl border border-border/80 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="message-subject"
                    className="block text-xs font-mono font-medium text-muted-foreground"
                  >
                    Subject *
                  </label>
                  <input
                    id="message-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject of your message..."
                    className="w-full rounded-xl border border-border/80 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
                  />

                  {/* Quick Preset Subject Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-mono text-muted-foreground/70 mr-1">
                      Quick Topics:
                    </span>
                    {SUBJECT_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setSubject(preset)}
                        className="rounded-full bg-background border border-border/60 hover:border-foreground/30 px-2.5 py-1 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Box (Message Body) */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="message-content"
                    className="block text-xs font-mono font-medium text-muted-foreground"
                  >
                    Message Content *
                  </label>
                  <textarea
                    id="message-content"
                    rows={5}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Hi Daksh, I came across your portfolio and wanted to reach out regarding..."
                    className="w-full resize-y rounded-xl border border-border/80 bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all font-sans leading-relaxed"
                  />
                </div>

                {formError && (
                  <p className="text-xs font-mono text-rose-500">{formError}</p>
                )}

                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border/40">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <Clock className="size-3.5" />
                    <span>Typically responds within 12–24h · Mumbai IST</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02] shadow-sm cursor-pointer w-full sm:w-auto"
                    >
                      <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: AI Assistant Q&A */}
        {activeTab === "assistant" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Ask about Sonaura, AQUILA, GPA, awards, or internship availability</span>
              <button
                type="button"
                onClick={resetChat}
                className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
              >
                <RotateCcw className="size-3" />
                <span>Reset Chat</span>
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="max-h-[380px] overflow-y-auto space-y-4 pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-2 ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-foreground text-background font-medium"
                        : "bg-background border border-border/70 text-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>

                  {/* Suggestion Chips */}
                  {msg.followUps && msg.followUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1 max-w-[90%]">
                      {msg.followUps.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => handleAssistantSend(prompt)}
                          className="inline-flex items-center gap-1 rounded-full bg-background border border-border/60 px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all cursor-pointer"
                        >
                          <Sparkles className="size-3 text-primary" />
                          <span>{prompt}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground p-3 rounded-xl bg-background border border-border/50 w-fit">
                  <span className="size-2 rounded-full bg-primary animate-ping" />
                  <span>Daksh AI is synthesizing response...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAssistantSend();
              }}
              className="flex items-center gap-2 pt-2 border-t border-border/40"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Sonaura, AQUILA, GPA, awards, or internship availability..."
                className="flex-1 rounded-xl border border-border/80 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="grid size-10 place-items-center rounded-xl bg-foreground text-background hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer shrink-0"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
