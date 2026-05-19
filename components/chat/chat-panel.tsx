"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect, useState } from "react";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import { ExampleChips } from "./example-chips";
import { TypingIndicator } from "./typing-indicator";

const INITIAL_GREETING =
  "Hi — I'm Karthik's portfolio assistant. Ask me about my work, projects, work rights, or anything in my background. I'll answer in his voice.";

const EXAMPLE_QUESTIONS = [
  "What's your strongest project?",
  "Healthcare data experience?",
  "Work rights in Australia?",
  "Available for internships?",
];

export function ChatPanel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    append,
    setInput,
  } = useChat({
    api: "/api/chat",
    onError: (err) => {
      console.error("[chat] error:", err);
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Smooth scroll if user is near bottom; jump if far up (don't fight them)
    const distanceFromBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight;
    const shouldAutoScroll = distanceFromBottom < 200;

    if (shouldAutoScroll) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const handleExampleClick = (question: string) => {
    setHasInteracted(true);
    void append({ role: "user", content: question });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    if (input.trim().length === 0) return;
    setHasInteracted(true);
    handleSubmit(e);
  };

  return (
    <div
      className="flex flex-col h-full min-h-[480px] max-h-[640px] bg-ink-50/60 border border-hairline rounded-lg overflow-hidden backdrop-blur-sm"
      role="region"
      aria-label="Chat with Karthik's portfolio assistant"
    >
      {/* Header bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-hairline bg-ink-50/80">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-signal-blue" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-signal-blue animate-ping opacity-60" />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-bone-dim">
            Live · Ask anything
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-mute">
          AI · First-person
        </span>
      </header>

      {/* Messages area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-5 scroll-smooth"
        aria-live="polite"
        aria-atomic="false"
      >
        {/* Initial greeting */}
        {messages.length === 0 && (
          <div className="mb-5 animate-fade-up">
            <p className="text-bone-dim text-[15px] leading-relaxed text-pretty">
              {INITIAL_GREETING}
            </p>
          </div>
        )}

        <MessageList messages={messages} />

        {/* Typing indicator while AI thinks */}
        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && (
            <TypingIndicator />
          )}

        {/* Error state */}
        {error && (
          <div
            role="alert"
            className="mt-3 px-3 py-2.5 rounded-md border border-signal-amber/30 bg-signal-amber/5 text-sm text-bone-dim"
          >
            Something went wrong. Try again, or email{" "}
            <a
              href="mailto:karthikreddytanigundala@gmail.com"
              className="text-signal-amber link-underline"
            >
              karthikreddytanigundala@gmail.com
            </a>{" "}
            directly.
          </div>
        )}
      </div>

      {/* Example chips — only before first interaction */}
      {!hasInteracted && messages.length === 0 && (
        <ExampleChips
          questions={EXAMPLE_QUESTIONS}
          onSelect={handleExampleClick}
          disabled={isLoading}
        />
      )}

      {/* Input bar */}
      <ChatInput
        value={input}
        onChange={handleInputChange}
        onSubmit={handleFormSubmit}
        onClear={() => setInput("")}
        disabled={isLoading}
        isLoading={isLoading}
      />

      {/* Powered-by line */}
      <div className="px-4 py-2 border-t border-hairline bg-ink-50/40">
        <p className="font-mono text-[10px] text-bone-mute text-center">
          Powered by Gemini · Answers grounded in Karthik's portfolio
        </p>
      </div>
    </div>
  );
}