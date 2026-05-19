"use client";

export function TypingIndicator() {
  return (
    <div
      className="flex justify-start mt-4 animate-fade-up"
      aria-label="Karthik's assistant is typing"
      role="status"
    >
      <div className="flex items-center gap-1.5 px-3.5 py-3 rounded-md bg-ink-100 border border-hairline">
        <span className="sr-only">Typing</span>
        <span
          className="w-1.5 h-1.5 rounded-full bg-bone-dim animate-pulse-dot"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-bone-dim animate-pulse-dot"
          style={{ animationDelay: "200ms" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-bone-dim animate-pulse-dot"
          style={{ animationDelay: "400ms" }}
        />
      </div>
    </div>
  );
}