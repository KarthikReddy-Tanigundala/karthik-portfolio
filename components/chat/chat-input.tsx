"use client";

import { ArrowUp, X } from "lucide-react";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type ChatInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
  disabled: boolean;
  isLoading: boolean;
};

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onClear,
  disabled,
  isLoading,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter to send, Shift+Enter for newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim().length > 0 && !isLoading) {
        onSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  const canSubmit = value.trim().length > 0 && !isLoading;

  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-hairline bg-ink-50/60 px-3 py-3"
    >
      <div
        className={cn(
          "flex items-end gap-2 px-3 py-2 rounded-md bg-ink border border-hairline transition-colors duration-200",
          "focus-within:border-signal-blue/50"
        )}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          placeholder="Ask about my projects, work rights, Snowflake experience…"
          aria-label="Ask Karthik's portfolio assistant"
          className={cn(
            "flex-1 bg-transparent text-bone placeholder:text-bone-mute text-[15px] leading-relaxed",
            "resize-none outline-none focus:outline-none",
            "min-h-[24px] max-h-[120px]",
            "disabled:opacity-50"
          )}
        />

        {value.length > 0 && !isLoading && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear input"
            className="text-bone-mute hover:text-bone transition-colors p-1 -mr-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          aria-label="Send message"
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 flex-shrink-0",
            canSubmit
              ? "bg-signal-blue text-bone hover:bg-signal-blue-dim"
              : "bg-ink-100 text-bone-mute cursor-not-allowed"
          )}
        >
          <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </form>
  );
}