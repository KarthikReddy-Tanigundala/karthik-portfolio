"use client";

import { cn } from "@/lib/utils";

type ExampleChipsProps = {
  questions: string[];
  onSelect: (question: string) => void;
  disabled?: boolean;
};

export function ExampleChips({
  questions,
  onSelect,
  disabled = false,
}: ExampleChipsProps) {
  return (
    <div
      className="px-4 pb-3 pt-1 flex flex-wrap gap-2 border-t border-hairline/50"
      role="group"
      aria-label="Suggested questions"
    >
      {questions.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          disabled={disabled}
          className={cn(
            "px-3 py-1.5 rounded-full",
            "text-[12.5px] font-medium text-bone-dim",
            "bg-ink border border-hairline-strong",
            "hover:border-signal-blue/40 hover:text-bone hover:bg-signal-blue/5",
            "transition-all duration-200 ease-stripe",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            "focus-visible:border-signal-blue"
          )}
        >
          {question}
        </button>
      ))}
    </div>
  );
}