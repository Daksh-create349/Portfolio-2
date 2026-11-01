"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, Sparkles, RotateCcw, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface GrokChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STARTER_PROMPTS = [
  "What are Daksh's top projects?",
  "What is Sonaura 2.0?",
  "What is his full technical stack?",
  "How can I contact or hire Daksh?",
];

// Helper to render simple markdown: bold, code, lists, and links
function formatMarkdown(text: string) {
  // Split into paragraphs / lines
  const lines = text.split("\n");
  
  return lines.map((line, lineIdx) => {
    // Check if bullet point
    const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
    const content = isBullet ? line.trim().replace(/^[\*\-]\s+/, "") : line;

    // Parse inline bold, code, and links
    // Split by markdown link pattern [label](url)
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
    const parts: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      const label = match[1];
      const url = match[2];
      parts.push(
        <a
          key={`link-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors font-medium"
        >
          {label}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    // Process bold (**text**) in each part if string
    const processedParts = parts.map((part, pIdx) => {
      if (typeof part !== "string") return part;
      const boldSegments = part.split(/(\*\*[^*]+\*\*)/g);
      return boldSegments.map((seg, sIdx) => {
        if (seg.startsWith("**") && seg.endsWith("**")) {
          return (
            <strong key={`bold-${pIdx}-${sIdx}`} className="text-white font-semibold">
              {seg.slice(2, -2)}
            </strong>
          );
        }
        return seg;
      });
    });

    if (isBullet) {
      return (
        <li key={lineIdx} className="ml-4 list-disc text-foreground/90 my-1">
          {processedParts}
        </li>
      );
    }

    if (line.trim() === "") {
      return <div key={lineIdx} className="h-2" />;
    }

    return (
      <p key={lineIdx} className="my-1 text-foreground/90 leading-relaxed">
        {processedParts}
      </p>
    );
  });
}

export function GrokChatModal({ isOpen, onClose }: GrokChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      content:
        "Hey! I'm **Daksh's AI Assistant**, powered by Groq. I have complete knowledge about his projects (like Sonaura 2.0 & Contradiction-MCP), skills, hackathon wins, and experience.\n\nAsk me anything, or pick one of the quick prompts below!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [blink, setBlink] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isGenerating, isOpen]);

  // Mini Grok Bot Blinking in Header
  useEffect(() => {
    if (!isOpen) return;
    const blinkInterval = setInterval(() => {
      setBlink(0.08);
      setTimeout(() => setBlink(1), 110);
    }, 3500);
    return () => clearInterval(blinkInterval);
  }, [isOpen]);

  const handleSend = async (userText?: string) => {
    const textToSend = (userText || input).trim();
    if (!textToSend || isGenerating) return;

    setInput("");
    const userMsgId = `user-${Date.now()}`;
    const botMsgId = `assistant-${Date.now()}`;

    const newMessages: Message[] = [
      ...messages,
      { id: userMsgId, role: "user", content: textToSend },
    ];

    setMessages(newMessages);
    setIsGenerating(true);

    try {
      // Prepare payload with conversation history
      const apiPayload = {
        messages: newMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Failed to contact Groq API: ${response.statusText}`);
      }

      // Add placeholder assistant message
      setMessages((prev) => [
        ...prev,
        { id: botMsgId, role: "assistant", content: "" },
      ]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const dataStr = trimmed.slice(5).trim();
          if (dataStr === "[DONE]") continue;

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.content) {
              accumulated += parsed.content;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMsgId ? { ...m, content: accumulated } : m
                )
              );
            }
          } catch {
            // Partial chunk
          }
        }
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "Sorry, I had trouble reaching the Groq engine. Please check your network connection and try again.",
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "initial",
        role: "assistant",
        content:
          "Conversation cleared! Ask me anything about Daksh's projects, experience, or skills.",
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Centered ChatGPT-like Modal Window */}
      <div className="relative z-10 flex flex-col w-full max-w-2xl h-[640px] max-h-[90vh] rounded-2xl border border-white/10 bg-[#0a0d14]/95 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3.5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            {/* Mini Animated Grok Bot Avatar */}
            <div className="relative size-9 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center overflow-hidden shrink-0">
              <svg
                viewBox="-125 -125 250 250"
                aria-hidden="true"
                className="size-8"
              >
                <defs>
                  <mask
                    id="grok-modal-mask"
                    maskUnits="userSpaceOnUse"
                    x="-125"
                    y="-125"
                    width="250"
                    height="250"
                  >
                    <path
                      d="M100.1 0.26C100.1 3.55 99.94 6.85 99.62 10.11C99.3 13.38 98.82 16.65 98.18 19.87C97.54 23.09 96.74 26.29 95.8 29.43C94.85 32.57 93.74 35.68 92.49 38.72C91.24 41.75 89.83 44.74 88.29 47.63C86.75 50.53 85.06 53.36 83.25 56.09C81.43 58.82 79.48 61.47 77.4 64.01C75.33 66.55 73.12 68.99 70.81 71.32C68.5 73.64 66.07 75.85 63.54 77.94C61.02 80.02 58.38 81.99 55.66 83.81C52.94 85.64 50.12 87.33 47.24 88.88C44.36 90.43 41.39 91.84 38.37 93.1C35.35 94.35 32.26 95.47 29.13 96.42C26 97.37 22.82 98.17 19.61 98.81C16.41 99.46 13.16 99.94 9.9 100.26C6.65 100.58 3.37 100.75 0.1 100.75C-3.16 100.75 -6.45 100.58 -9.7 100.26C-12.95 99.94 -16.2 99.46 -19.41 98.81C-22.61 98.17 -25.8 97.37 -28.93 96.42C-32.05 95.47 -35.15 94.35 -38.17 93.1C-41.18 91.84 -44.16 90.43 -47.04 88.88C-49.92 87.33 -52.74 85.64 -55.45 83.81C-58.17 81.99 -60.81 80.02 -63.34 77.94C-65.86 75.85 -68.3 73.64 -70.61 71.32C-72.92 68.99 -75.13 66.55 -77.2 64.01C-79.27 61.47 -81.23 58.82 -83.04 56.09C-84.86 53.36 -86.55 50.53 -88.09 47.63C-89.63 44.74 -91.04 41.75 -92.29 38.72C-93.54 35.68 -94.64 32.57 -95.59 29.43C-96.54 26.29 -97.34 23.09 -97.98 19.87C-98.61 16.65 -99.1 13.38 -99.42 10.11C-99.74 6.85 -99.9 3.55 -99.9 0.26C-99.9 -3.02 -99.74 -6.32 -99.42 -9.58C-99.1 -12.85 -98.61 -16.12 -97.98 -19.34C-97.34 -22.56 -96.54 -25.76 -95.59 -28.9C-94.64 -32.05 -93.54 -35.15 -92.29 -38.19C-91.04 -41.22 -89.63 -44.21 -88.09 -47.1C-86.55 -50 -84.86 -52.83 -83.04 -55.56C-81.23 -58.29 -79.27 -60.94 -77.2 -63.48C-75.13 -66.02 -72.92 -68.46 -70.61 -70.79C-68.3 -73.11 -65.86 -75.33 -63.34 -77.41C-60.81 -79.49 -58.17 -81.46 -55.45 -83.28C-52.74 -85.11 -49.92 -86.8 -47.04 -88.35C-44.16 -89.9 -41.18 -91.31 -38.17 -92.57C-35.15 -93.82 -32.05 -94.94 -28.93 -95.89C-25.8 -96.84 -22.61 -97.65 -19.41 -98.29C-16.2 -98.93 -12.95 -99.41 -9.7 -99.73C-6.45 -100.05 -3.16 -100.22 0.1 -100.22C3.37 -100.22 6.65 -100.05 9.9 -99.73C13.16 -99.41 16.41 -98.93 19.61 -98.29C22.82 -97.65 26 -96.84 29.13 -95.89C32.26 -94.94 35.35 -93.82 38.37 -92.57C41.39 -91.31 44.36 -89.9 47.24 -88.35C50.12 -86.8 52.94 -85.11 55.66 -83.28C58.38 -81.46 61.02 -79.49 63.54 -77.41C66.07 -75.33 68.5 -73.11 70.81 -70.79C73.12 -68.46 75.33 -66.02 77.4 -63.48C79.48 -60.94 81.43 -58.29 83.25 -55.56C85.06 -52.83 86.75 -50 88.29 -47.1C89.83 -44.21 91.24 -41.22 92.49 -38.19C93.74 -35.15 94.85 -32.05 95.8 -28.9C96.74 -25.76 97.54 -22.56 98.18 -19.34C98.82 -16.12 99.3 -12.85 99.62 -9.58C99.94 -6.32 100.1 -3.02 100.1 0.26Z"
                      fill="#ffffff"
                    />
                    <g
                      style={{
                        transform: `scale(1, ${blink})`,
                        transformOrigin: "0px -5px",
                        transition: "transform 0.08s ease-out",
                      }}
                    >
                      <path
                        d="M-10.5 -11.5A10.5 10.5 0 0 1 0 -22L0 -22A10.5 10.5 0 0 1 10.5 -11.5L10.5 11.5A10.5 10.5 0 0 1 0 22L0 22A10.5 10.5 0 0 1 -10.5 11.5Z"
                        transform="matrix(0.98,-0.1,0.09,0.99,-17.3,-9.14)"
                        fill="#000000"
                      />
                      <path
                        d="M-10.5 -11.5A10.5 10.5 0 0 1 0 -22L0 -22A10.5 10.5 0 0 1 10.5 -11.5L10.5 11.5A10.5 10.5 0 0 1 0 22L0 22A10.5 10.5 0 0 1 -10.5 11.5Z"
                        transform="matrix(0.92,-0.04,0.09,0.99,37.32,-13.26)"
                        fill="#000000"
                      />
                    </g>
                  </mask>
                  <radialGradient
                    id="grok-modal-fill"
                    gradientUnits="userSpaceOnUse"
                    cx="-40"
                    cy="-50"
                    r="193.75"
                  >
                    <stop offset="0%" stopColor="#b5d6f9" />
                    <stop offset="32%" stopColor="#62a9f3" />
                    <stop offset="72%" stopColor="#3b93f0" />
                    <stop offset="100%" stopColor="#275c95" />
                  </radialGradient>
                </defs>
                <path
                  d="M100.1 0.26C100.1 3.55 99.94 6.85 99.62 10.11C99.3 13.38 98.82 16.65 98.18 19.87C97.54 23.09 96.74 26.29 95.8 29.43C94.85 32.57 93.74 35.68 92.49 38.72C91.24 41.75 89.83 44.74 88.29 47.63C86.75 50.53 85.06 53.36 83.25 56.09C81.43 58.82 79.48 61.47 77.4 64.01C75.33 66.55 73.12 68.99 70.81 71.32C68.5 73.64 66.07 75.85 63.54 77.94C61.02 80.02 58.38 81.99 55.66 83.81C52.94 85.64 50.12 87.33 47.24 88.88C44.36 90.43 41.39 91.84 38.37 93.1C35.35 94.35 32.26 95.47 29.13 96.42C26 97.37 22.82 98.17 19.61 98.81C16.41 99.46 13.16 99.94 9.9 100.26C6.65 100.58 3.37 100.75 0.1 100.75C-3.16 100.75 -6.45 100.58 -9.7 100.26C-12.95 99.94 -16.2 99.46 -19.41 98.81C-22.61 98.17 -25.8 97.37 -28.93 96.42C-32.05 95.47 -35.15 94.35 -38.17 93.1C-41.18 91.84 -44.16 90.43 -47.04 88.88C-49.92 87.33 -52.74 85.64 -55.45 83.81C-58.17 81.99 -60.81 80.02 -63.34 77.94C-65.86 75.85 -68.3 73.64 -70.61 71.32C-72.92 68.99 -75.13 66.55 -77.2 64.01C-79.27 61.47 -81.23 58.82 -83.04 56.09C-84.86 53.36 -86.55 50.53 -88.09 47.63C-89.63 44.74 -91.04 41.75 -92.29 38.72C-93.54 35.68 -94.64 32.57 -95.59 29.43C-96.54 26.29 -97.34 23.09 -97.98 19.87C-98.61 16.65 -99.1 13.38 -99.42 10.11C-99.74 6.85 -99.9 3.55 -99.9 0.26C-99.9 -3.02 -99.74 -6.32 -99.42 -9.58C-99.1 -12.85 -98.61 -16.12 -97.98 -19.34C-97.34 -22.56 -96.54 -25.76 -95.59 -28.9C-94.64 -32.05 -93.54 -35.15 -92.29 -38.19C-91.04 -41.22 -89.63 -44.21 -88.09 -47.1C-86.55 -50 -84.86 -52.83 -83.04 -55.56C-81.23 -58.29 -79.27 -60.94 -77.2 -63.48C-75.13 -66.02 -72.92 -68.46 -70.61 -70.79C-68.3 -73.11 -65.86 -75.33 -63.34 -77.41C-60.81 -79.49 -58.17 -81.46 -55.45 -83.28C-52.74 -85.11 -49.92 -86.8 -47.04 -88.35C-44.16 -89.9 -41.18 -91.31 -38.17 -92.57C-35.15 -93.82 -32.05 -94.94 -28.93 -95.89C-25.8 -96.84 -22.61 -97.65 -19.41 -98.29C-16.2 -98.93 -12.95 -99.41 -9.7 -99.73C-6.45 -100.05 -3.16 -100.22 0.1 -100.22C3.37 -100.22 6.65 -100.05 9.9 -99.73C13.16 -99.41 16.41 -98.93 19.61 -98.29C22.82 -97.65 26 -96.84 29.13 -95.89C32.26 -94.94 35.35 -93.82 38.37 -92.57C41.39 -91.31 44.36 -89.9 47.24 -88.35C50.12 -86.8 52.94 -85.11 55.66 -83.28C58.38 -81.46 61.02 -79.49 63.54 -77.41C66.07 -75.33 68.5 -73.11 70.81 -70.79C73.12 -68.46 75.33 -66.02 77.4 -63.48C79.48 -60.94 81.43 -58.29 83.25 -55.56C85.06 -52.83 86.75 -50 88.29 -47.1C89.83 -44.21 91.24 -41.22 92.49 -38.19C93.74 -35.15 94.85 -32.05 95.8 -28.9C96.74 -25.76 97.54 -22.56 98.18 -19.34C98.82 -16.12 99.3 -12.85 99.62 -9.58C99.94 -6.32 100.1 -3.02 100.1 0.26Z"
                  fill="#080b11"
                />
                <g mask="url(#grok-modal-mask)">
                  <rect
                    x="-125"
                    y="-125"
                    width="250"
                    height="250"
                    fill="url(#grok-modal-fill)"
                  />
                </g>
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white tracking-tight">
                  Daksh AI
                </span>
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Groq LPU
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Grounded in Daksh&apos;s verified engineering portfolio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleResetChat}
              title="Reset conversation"
              className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="size-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Close (Esc)"
              className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === "user";

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="size-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="size-3.5 text-blue-400" />
                  </div>
                )}

                <div
                  className={`text-sm rounded-2xl px-4 py-2.5 max-w-[86%] sm:max-w-[80%] ${
                    isUser
                      ? "bg-blue-600/20 border border-blue-500/35 text-white rounded-tr-sm"
                      : "bg-white/[0.04] border border-white/5 text-foreground/90 rounded-tl-sm shadow-sm"
                  }`}
                >
                  {formatMarkdown(msg.content)}
                </div>
              </div>
            );
          })}

          {/* Animated Grok Thinking / Iterating State */}
          {isGenerating && (
            <div className="flex items-start gap-3 animate-in fade-in duration-150">
              {/* Mini Pulsing Grok Bot Avatar while thinking */}
              <div className="relative size-8 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(59,147,240,0.4)] animate-pulse">
                <svg
                  viewBox="-125 -125 250 250"
                  aria-hidden="true"
                  className="size-7"
                >
                  <mask
                    id="grok-iterating-mask"
                    maskUnits="userSpaceOnUse"
                    x="-125"
                    y="-125"
                    width="250"
                    height="250"
                  >
                    <path
                      d="M100.1 0.26C100.1 3.55 99.94 6.85 99.62 10.11C99.3 13.38 98.82 16.65 98.18 19.87C97.54 23.09 96.74 26.29 95.8 29.43C94.85 32.57 93.74 35.68 92.49 38.72C91.24 41.75 89.83 44.74 88.29 47.63C86.75 50.53 85.06 53.36 83.25 56.09C81.43 58.82 79.48 61.47 77.4 64.01C75.33 66.55 73.12 68.99 70.81 71.32C68.5 73.64 66.07 75.85 63.54 77.94C61.02 80.02 58.38 81.99 55.66 83.81C52.94 85.64 50.12 87.33 47.24 88.88C44.36 90.43 41.39 91.84 38.37 93.1C35.35 94.35 32.26 95.47 29.13 96.42C26 97.37 22.82 98.17 19.61 98.81C16.41 99.46 13.16 99.94 9.9 100.26C6.65 100.58 3.37 100.75 0.1 100.75C-3.16 100.75 -6.45 100.58 -9.7 100.26C-12.95 99.94 -16.2 99.46 -19.41 98.81C-22.61 98.17 -25.8 97.37 -28.93 96.42C-32.05 95.47 -35.15 94.35 -38.17 93.1C-41.18 91.84 -44.16 90.43 -47.04 88.88C-49.92 87.33 -52.74 85.64 -55.45 83.81C-58.17 81.99 -60.81 80.02 -63.34 77.94C-65.86 75.85 -68.3 73.64 -70.61 71.32C-72.92 68.99 -75.13 66.55 -77.2 64.01C-79.27 61.47 -81.23 58.82 -83.04 56.09C-84.86 53.36 -86.55 50.53 -88.09 47.63C-89.63 44.74 -91.04 41.75 -92.29 38.72C-93.54 35.68 -94.64 32.57 -95.59 29.43C-96.54 26.29 -97.34 23.09 -97.98 19.87C-98.61 16.65 -99.1 13.38 -99.42 10.11C-99.74 6.85 -99.9 3.55 -99.9 0.26C-99.9 -3.02 -99.74 -6.32 -99.42 -9.58C-99.1 -12.85 -98.61 -16.12 -97.98 -19.34C-97.34 -22.56 -96.54 -25.76 -95.59 -28.9C-94.64 -32.05 -93.54 -35.15 -92.29 -38.19C-91.04 -41.22 -89.63 -44.21 -88.09 -47.1C-86.55 -50 -84.86 -52.83 -83.04 -55.56C-81.23 -58.29 -79.27 -60.94 -77.2 -63.48C-75.13 -66.02 -72.92 -68.46 -70.61 -70.79C-68.3 -73.11 -65.86 -75.33 -63.34 -77.41C-60.81 -79.49 -58.17 -81.46 -55.45 -83.28C-52.74 -85.11 -49.92 -86.8 -47.04 -88.35C-44.16 -89.9 -41.18 -91.31 -38.17 -92.57C-35.15 -93.82 -32.05 -94.94 -28.93 -95.89C-25.8 -96.84 -22.61 -97.65 -19.41 -98.29C-16.2 -98.93 -12.95 -99.41 -9.7 -99.73C-6.45 -100.05 -3.16 -100.22 0.1 -100.22C3.37 -100.22 6.65 -100.05 9.9 -99.73C13.16 -99.41 16.41 -98.93 19.61 -98.29C22.82 -97.65 26 -96.84 29.13 -95.89C32.26 -94.94 35.35 -93.82 38.37 -92.57C41.39 -91.31 44.36 -89.9 47.24 -88.35C50.12 -86.8 52.94 -85.11 55.66 -83.28C58.38 -81.46 61.02 -79.49 63.54 -77.41C66.07 -75.33 68.5 -73.11 70.81 -70.79C73.12 -68.46 75.33 -66.02 77.4 -63.48C79.48 -60.94 81.43 -58.29 83.25 -55.56C85.06 -52.83 86.75 -50 88.29 -47.1C89.83 -44.21 91.24 -41.22 92.49 -38.19C93.74 -35.15 94.85 -32.05 95.8 -28.9C96.74 -25.76 97.54 -22.56 98.18 -19.34C98.82 -16.12 99.3 -12.85 99.62 -9.58C99.94 -6.32 100.1 -3.02 100.1 0.26Z"
                      fill="#ffffff"
                    />
                    {/* Animated side-to-side scanning eyes */}
                    <g className="animate-[bounce_1.4s_infinite]">
                      <path
                        d="M-10.5 -11.5A10.5 10.5 0 0 1 0 -22L0 -22A10.5 10.5 0 0 1 10.5 -11.5L10.5 11.5A10.5 10.5 0 0 1 0 22L0 22A10.5 10.5 0 0 1 -10.5 11.5Z"
                        transform="matrix(0.98,-0.1,0.09,0.99,-17.3,-9.14)"
                        fill="#000000"
                      />
                      <path
                        d="M-10.5 -11.5A10.5 10.5 0 0 1 0 -22L0 -22A10.5 10.5 0 0 1 10.5 -11.5L10.5 11.5A10.5 10.5 0 0 1 0 22L0 22A10.5 10.5 0 0 1 -10.5 11.5Z"
                        transform="matrix(0.92,-0.04,0.09,0.99,37.32,-13.26)"
                        fill="#000000"
                      />
                    </g>
                  </mask>
                  <path
                    d="M100.1 0.26C100.1 3.55 99.94 6.85 99.62 10.11C99.3 13.38 98.82 16.65 98.18 19.87C97.54 23.09 96.74 26.29 95.8 29.43C94.85 32.57 93.74 35.68 92.49 38.72C91.24 41.75 89.83 44.74 88.29 47.63C86.75 50.53 85.06 53.36 83.25 56.09C81.43 58.82 79.48 61.47 77.4 64.01C75.33 66.55 73.12 68.99 70.81 71.32C68.5 73.64 66.07 75.85 63.54 77.94C61.02 80.02 58.38 81.99 55.66 83.81C52.94 85.64 50.12 87.33 47.24 88.88C44.36 90.43 41.39 91.84 38.37 93.1C35.35 94.35 32.26 95.47 29.13 96.42C26 97.37 22.82 98.17 19.61 98.81C16.41 99.46 13.16 99.94 9.9 100.26C6.65 100.58 3.37 100.75 0.1 100.75C-3.16 100.75 -6.45 100.58 -9.7 100.26C-12.95 99.94 -16.2 99.46 -19.41 98.81C-22.61 98.17 -25.8 97.37 -28.93 96.42C-32.05 95.47 -35.15 94.35 -38.17 93.1C-41.18 91.84 -44.16 90.43 -47.04 88.88C-49.92 87.33 -52.74 85.64 -55.45 83.81C-58.17 81.99 -60.81 80.02 -63.34 77.94C-65.86 75.85 -68.3 73.64 -70.61 71.32C-72.92 68.99 -75.13 66.55 -77.2 64.01C-79.27 61.47 -81.23 58.82 -83.04 56.09C-84.86 53.36 -86.55 50.53 -88.09 47.63C-89.63 44.74 -91.04 41.75 -92.29 38.72C-93.54 35.68 -94.64 32.57 -95.59 29.43C-96.54 26.29 -97.34 23.09 -97.98 19.87C-98.61 16.65 -99.1 13.38 -99.42 10.11C-99.74 6.85 -99.9 3.55 -99.9 0.26C-99.9 -3.02 -99.74 -6.32 -99.42 -9.58C-99.1 -12.85 -98.61 -16.12 -97.98 -19.34C-97.34 -22.56 -96.54 -25.76 -95.59 -28.9C-94.64 -32.05 -93.54 -35.15 -92.29 -38.19C-91.04 -41.22 -89.63 -44.21 -88.09 -47.1C-86.55 -50 -84.86 -52.83 -83.04 -55.56C-81.23 -58.29 -79.27 -60.94 -77.2 -63.48C-75.13 -66.02 -72.92 -68.46 -70.61 -70.79C-68.3 -73.11 -65.86 -75.33 -63.34 -77.41C-60.81 -79.49 -58.17 -81.46 -55.45 -83.28C-52.74 -85.11 -49.92 -86.8 -47.04 -88.35C-44.16 -89.9 -41.18 -91.31 -38.17 -92.57C-35.15 -93.82 -32.05 -94.94 -28.93 -95.89C-25.8 -96.84 -22.61 -97.65 -19.41 -98.29C-16.2 -98.93 -12.95 -99.41 -9.7 -99.73C-6.45 -100.05 -3.16 -100.22 0.1 -100.22C3.37 -100.22 6.65 -100.05 9.9 -99.73C13.16 -99.41 16.41 -98.93 19.61 -98.29C22.82 -97.65 26 -96.84 29.13 -95.89C32.26 -94.94 35.35 -93.82 38.37 -92.57C41.39 -91.31 44.36 -89.9 47.24 -88.35C50.12 -86.8 52.94 -85.11 55.66 -83.28C58.38 -81.46 61.02 -79.49 63.54 -77.41C66.07 -75.33 68.5 -73.11 70.81 -70.79C73.12 -68.46 75.33 -66.02 77.4 -63.48C79.48 -60.94 81.43 -58.29 83.25 -55.56C85.06 -52.83 86.75 -50 88.29 -47.1C89.83 -44.21 91.24 -41.22 92.49 -38.19C93.74 -35.15 94.85 -32.05 95.8 -28.9C96.74 -25.76 97.54 -22.56 98.18 -19.34C98.82 -16.12 99.3 -12.85 99.62 -9.58C99.94 -6.32 100.1 -3.02 100.1 0.26Z"
                    fill="#080b11"
                  />
                  <g mask="url(#grok-iterating-mask)">
                    <rect
                      x="-125"
                      y="-125"
                      width="250"
                      height="250"
                      fill="url(#grok-modal-fill)"
                    />
                  </g>
                </svg>
              </div>

              {/* Iterating Status Indicator */}
              <div className="flex items-center gap-2 rounded-2xl bg-white/[0.04] border border-white/10 px-3.5 py-2 text-xs text-muted-foreground">
                <span className="flex gap-1">
                  <span className="size-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="size-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="size-1.5 rounded-full bg-blue-400 animate-bounce" />
                </span>
                <span className="font-mono text-[11px] text-blue-300">
                  Synthesizing answer with Groq...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Chips (shown when only initial message exists) */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 pt-0">
            <p className="text-[11px] font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <Sparkles className="size-3 text-blue-400" />
              Suggested questions:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-foreground/80 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 transition-all cursor-pointer text-left"
                >
                  <span>{prompt}</span>
                  <ArrowRight className="size-3 opacity-60" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form Bar */}
        <div className="border-t border-white/10 p-3 sm:p-4 bg-white/[0.02]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Daksh's projects, experience, or skills..."
              disabled={isGenerating}
              className="flex-1 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/40 disabled:opacity-50 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isGenerating}
              aria-label="Send message"
              className="inline-flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 transition-colors shadow-md shadow-blue-600/30 shrink-0 cursor-pointer"
            >
              <Send className="size-4" />
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-muted-foreground/70">
            <span>Powered by Groq LPU & Qwen Model</span>
            <span className="hidden sm:inline">Press Esc to close</span>
          </div>
        </div>

      </div>
    </div>
  );
}
