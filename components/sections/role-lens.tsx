"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Crosshair } from "lucide-react";
import { ROLES, ROLE_BY_ID, type RoleId } from "@/lib/roles";
import { PROJECT_BY_ID, projects, rankForRole } from "@/lib/projects";
import { useLens } from "@/components/ui/lens-provider";
import { cn } from "@/lib/utils";

const OVERVIEW = {
  pitch:
    "Pick the role you're hiring for. The evidence below, the project grid and the toolkit all re-rank to show what's most relevant to it.",
  featured: ["zelis-payer-reporting", "gridcast", "auspolicyrag"],
  tools: ["SQL", "Snowflake", "dbt", "Power BI", "DAX", "Python", "LightGBM", "RAG", "GitHub Actions"],
};

export function RoleLens() {
  const { role, setRole, openProject } = useLens();

  const evidence = role
    ? rankForRole(projects, role).slice(0, 3)
    : OVERVIEW.featured.map((id) => PROJECT_BY_ID[id]);
  const tools = role ? ROLE_BY_ID[role].focusTools.slice(0, 9) : OVERVIEW.tools;
  const pitch = role ? ROLE_BY_ID[role].pitch : OVERVIEW.pitch;

  return (
    <div
      className="rounded-xl border border-hairline-strong bg-ink-50/70 backdrop-blur-sm shadow-[0_0_0_1px_rgba(37,99,235,0.06),0_30px_80px_-30px_rgba(37,99,235,0.35)] overflow-hidden"
      role="region"
      aria-label="Role lens: see the most relevant evidence for the role you are hiring for"
    >
      <header className="flex items-center justify-between gap-3 px-5 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-signal-amber" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone">
            Hiring for…
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-mute">
          Role lens
        </span>
      </header>

      <div
        role="radiogroup"
        aria-label="Role you are hiring for"
        className="flex flex-wrap gap-1.5 px-5 pb-4"
      >
        <LensTab active={role === null} onClick={() => setRole(null)}>
          All roles
        </LensTab>
        {ROLES.map((r) => (
          <LensTab
            key={r.id}
            active={role === r.id}
            onClick={() => setRole(r.id as RoleId)}
          >
            {r.label}
          </LensTab>
        ))}
      </div>

      <div className="border-t border-hairline px-5 py-5 min-h-[400px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={role ?? "all"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
            aria-live="polite"
          >
            <p className="text-bone-dim text-[15px] leading-relaxed text-pretty">
              {pitch}
            </p>

            <div className="space-y-2">
              <p className="eyebrow">
                {role ? "Strongest evidence" : "Start here"}
              </p>
              <ul className="space-y-2">
                {evidence.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => openProject(p.id)}
                      className="group w-full text-left flex items-center gap-4 px-3.5 py-3 rounded-md border border-hairline bg-ink/60 hover:border-signal-blue/40 hover:bg-signal-blue/5 transition-colors"
                    >
                      <div className="w-[88px] sm:w-[104px] flex-shrink-0">
                        <p className="font-serif text-xl sm:text-2xl text-bone leading-none truncate">
                          {p.headline.value}
                        </p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-bone text-[14.5px] font-medium leading-snug">
                          {p.title}
                        </p>
                        <p className="text-bone-mute text-[12.5px] leading-snug line-clamp-2">
                          {p.headline.label}
                        </p>
                      </div>
                      <ArrowUpRight
                        className="w-4 h-4 text-bone-mute group-hover:text-signal-blue flex-shrink-0 transition-colors"
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="eyebrow">Core tools for this role</p>
              <div className="flex flex-wrap gap-1.5">
                {tools.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-sm font-mono text-[11px] text-bone-dim border border-hairline-strong"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <a
        href="#work"
        className="group flex items-center justify-between px-5 py-3 border-t border-hairline bg-ink/40 hover:bg-signal-blue/5 transition-colors"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-dim group-hover:text-bone">
          {role
            ? `All ${projects.length} projects, ranked for ${ROLE_BY_ID[role].label}`
            : `Browse all ${projects.length} projects`}
        </span>
        <ArrowDown className="w-4 h-4 text-bone-mute group-hover:text-signal-blue group-hover:translate-y-0.5 transition-all" />
      </a>
    </div>
  );
}

function LensTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap border transition-colors duration-200",
        active
          ? "bg-signal-blue text-bone border-signal-blue"
          : "text-bone-dim border-hairline-strong hover:text-bone hover:border-signal-blue/40"
      )}
    >
      {children}
    </button>
  );
}
