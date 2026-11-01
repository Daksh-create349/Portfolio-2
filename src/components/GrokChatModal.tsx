"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ArrowUp, RotateCcw } from "lucide-react";

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
  "What is his technical stack?",
  "How can I contact or hire Daksh?",
];

// Helper to format clean text with bold, bullet points, and markdown links (strictly zero emojis)
function formatMarkdown(text: string) {
  // Strip any accidental emojis
  const cleanText = text.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ""
  );

  const lines = cleanText.split("\n");

  return lines.map((line, lineIdx) => {
    const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
    const content = isBullet ? line.trim().replace(/^[\*\-]\s+/, "") : line;

    // Parse [label](url)
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+|mailto:[^\)]+)\)/g;
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

    // Process bold (**text**)
    const processedParts = parts.map((part, pIdx) => {
      if (typeof part !== "string") return part;
      const boldSegments = part.split(/(\*\*[^*]+\*\*)/g);
      return boldSegments.map((seg, sIdx) => {
        if (seg.startsWith("**") && seg.endsWith("**")) {
          return (
            <strong key={`bold-${pIdx}-${sIdx}`} className="text-white font-medium">
              {seg.slice(2, -2)}
            </strong>
          );
        }
        return seg;
      });
    });

    if (isBullet) {
      return (
        <li key={lineIdx} className="ml-5 list-disc text-zinc-300 my-1 leading-relaxed">
          {processedParts}
        </li>
      );
    }

    if (line.trim() === "") {
      return <div key={lineIdx} className="h-2" />;
    }

    return (
      <p key={lineIdx} className="my-1.5 text-zinc-300 leading-relaxed">
        {processedParts}
      </p>
    );
  });
}

export function GrokChatModal({ isOpen, onClose }: GrokChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
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

  // Scroll to bottom on new content
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isGenerating, isOpen]);

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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Chat error (${response.status})`);
      }

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
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "Unable to connect to the assistant right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      {/* Dimmed Clean Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Clean, Normal Centered Window (Inspired by ChatGPT) */}
      <div className="relative z-10 flex flex-col w-full max-w-2xl h-[580px] max-h-[88vh] rounded-2xl border border-white/10 bg-[#121214] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Minimal Clean Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 bg-[#121214]">
          <span className="text-xs font-medium text-zinc-300 tracking-wide">
            Daksh AI
          </span>

          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleReset}
                title="New chat"
                className="inline-flex size-7 items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              title="Close"
              className="inline-flex size-7 items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {/* Empty State — Clean Centered Prompt like ChatGPT */}
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-white mb-2">
                Hey, ready to dive in?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mb-8">
                Ask anything about Daksh&apos;s projects, technical stack, or background.
              </p>

              {/* Minimal Suggestion Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="text-left text-xs text-zinc-300 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2.5 hover:bg-white/[0.07] hover:border-white/10 transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => {
                const isUser = msg.role === "user";

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`text-sm leading-relaxed ${
                        isUser
                          ? "bg-[#27272a] text-white rounded-2xl px-4 py-2.5 max-w-[85%]"
                          : "text-zinc-200 max-w-[95%] py-1"
                      }`}
                    >
                      {formatMarkdown(msg.content)}
                    </div>
                  </div>
                );
              })}

              {/* Quiet, Clean Thinking Indicator */}
              {isGenerating && (
                <div className="flex items-center gap-1.5 py-2 text-zinc-500">
                  <span className="size-1.5 rounded-full bg-zinc-400 animate-pulse" />
                  <span className="size-1.5 rounded-full bg-zinc-400 animate-pulse [animation-delay:200ms]" />
                  <span className="size-1.5 rounded-full bg-zinc-400 animate-pulse [animation-delay:400ms]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Clean, Rounded ChatGPT-style Input Bar */}
        <div className="p-3 sm:p-4 bg-[#121214]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-[#212124] px-4 py-1.5 focus-within:border-white/20 transition-all shadow-md"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Daksh..."
              disabled={isGenerating}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isGenerating}
              aria-label="Send message"
              className="inline-flex size-8 items-center justify-center rounded-full bg-white text-black hover:bg-zinc-200 disabled:opacity-30 disabled:hover:bg-white transition-all shrink-0 cursor-pointer disabled:cursor-not-allowed"
            >
              <ArrowUp className="size-4 stroke-[2.5]" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
