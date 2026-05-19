import { Check } from "lucide-react";

export function WorkRightsBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-signal-blue/30 bg-signal-blue/10"
      role="status"
      aria-label="Australian work rights status"
    >
      <Check
        className="w-3.5 h-3.5 text-signal-blue flex-shrink-0"
        strokeWidth={2.5}
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-bone">
        Australian work rights · 485 from Nov 2026
      </span>
    </div>
  );
}