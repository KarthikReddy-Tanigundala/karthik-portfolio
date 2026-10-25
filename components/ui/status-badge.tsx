import { STATUS_LABEL, type ProjectStatus } from "@/lib/projects";
import { cn } from "@/lib/utils";

const STYLE: Record<ProjectStatus, string> = {
  live: "text-signal-green border-signal-green/30 bg-signal-green/10",
  collecting: "text-signal-green border-signal-green/30 bg-signal-green/10",
  delivered: "text-signal-amber border-signal-amber/30 bg-signal-amber/10",
  production: "text-signal-blue border-signal-blue/30 bg-signal-blue/10",
  code: "text-bone-dim border-hairline-strong bg-ink-100",
  built: "text-bone-dim border-hairline-strong bg-ink-100",
  academic: "text-bone-mute border-hairline-strong bg-ink-100",
};

const PULSE: Partial<Record<ProjectStatus, true>> = {
  live: true,
  collecting: true,
};

export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] uppercase tracking-[0.14em] font-mono whitespace-nowrap",
        STYLE[status],
        className
      )}
    >
      {PULSE[status] && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-60 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {STATUS_LABEL[status]}
    </span>
  );
}
