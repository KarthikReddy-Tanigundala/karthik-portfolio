"use client";

import { useState } from "react";
import { ArrowUpRight, MousePointerClick } from "lucide-react";
import {
  SKILL_GROUPS,
  SKILL_COUNTS,
  LEVEL_LABEL,
  LEVEL_DESCRIPTION,
  ALL_SKILLS,
  type SkillLevel,
} from "@/lib/skills";
import { projectsUsing } from "@/lib/projects";
import { ROLE_BY_ID } from "@/lib/roles";
import { useLens } from "@/components/ui/lens-provider";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function Toolkit() {
  const { role, openProject } = useLens();
  const [selected, setSelected] = useState<string | null>(null);
  const focus = role ? new Set(ROLE_BY_ID[role].focusTools) : null;

  const skill = selected ? ALL_SKILLS.find((s) => s.name === selected) : null;
  const usedIn = selected ? projectsUsing(selected) : [];

  return (
    <section
      id="toolkit"
      className="section-pad border-t border-hairline scroll-mt-14"
      aria-label="Tools and technologies"
    >
      <div className="container-page">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div className="space-y-3">
            <p className="eyebrow">Tools & technologies</p>
            <h2 className="font-serif text-display-lg text-bone text-balance leading-[1.02]">
              {SKILL_COUNTS.total} tools, each one backed by evidence.
            </h2>
          </div>
          <div className="space-y-2 max-w-md">
            <p className="text-bone-dim text-[15px] leading-relaxed text-pretty">
              Click a tool to see exactly where I used it.
              {role && (
                <>
                  {" "}Highlighted: the core tools for a{" "}
                  <span className="text-bone">{ROLE_BY_ID[role].label}</span>.
                </>
              )}
            </p>
            <Legend />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden">
            {SKILL_GROUPS.map((group) => (
              <div key={group.id} className="bg-ink p-5 md:p-6 space-y-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-amber">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((s) => {
                    const count = projectsUsing(s.name).length;
                    const isSel = selected === s.name;
                    const dim = focus ? !focus.has(s.name) : false;
                    return (
                      <button
                        key={s.name}
                        type="button"
                        onClick={() => setSelected(isSel ? null : s.name)}
                        aria-pressed={isSel}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11.5px] border transition-all duration-200",
                          isSel
                            ? "bg-signal-blue text-bone border-signal-blue"
                            : focus && !dim
                              ? "text-bone border-signal-blue/60 bg-signal-blue/10 hover:bg-signal-blue/20"
                              : "text-bone-dim border-hairline-strong hover:text-bone hover:border-bone/40",
                          dim && !isSel && "opacity-45 hover:opacity-100"
                        )}
                      >
                        <LevelMark level={s.level} selected={isSel} />
                        {s.name}
                        {count > 0 && (
                          <span
                            className={cn(
                              "text-[10px]",
                              isSel ? "text-bone/70" : "text-bone-mute"
                            )}
                          >
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <aside
            className="lg:col-span-4 lg:sticky lg:top-20 self-start rounded-lg border border-hairline-strong bg-ink-50/60 p-6 min-h-[260px]"
            aria-live="polite"
          >
            {skill ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="eyebrow">Evidence for</p>
                  <h3 className="font-serif text-3xl text-bone leading-tight">
                    {skill.name}
                  </h3>
                  <p className="inline-flex items-center gap-2 text-[13px] text-bone-dim">
                    <LevelMark level={skill.level} />
                    {LEVEL_LABEL[skill.level]}: {LEVEL_DESCRIPTION[skill.level]}
                  </p>
                </div>
                {skill.note && (
                  <p className="text-bone-dim text-[14px] leading-relaxed">
                    {skill.note}
                  </p>
                )}
                {usedIn.length > 0 && (
                  <div className="space-y-2">
                    <p className="eyebrow">
                      Used in {usedIn.length} {usedIn.length === 1 ? "project" : "projects"}
                    </p>
                    <ul className="space-y-1.5">
                      {usedIn.map((p) => (
                        <li key={p.id}>
                          <button
                            type="button"
                            onClick={() => openProject(p.id)}
                            className="group w-full text-left flex items-start justify-between gap-3 px-3 py-2.5 rounded-md border border-hairline bg-ink/60 hover:border-signal-blue/40 hover:bg-signal-blue/5 transition-colors"
                          >
                            <span className="min-w-0">
                              <span className="block text-bone text-[14px] font-medium">
                                {p.title}
                              </span>
                              <span className="block text-bone-mute text-[12px] leading-snug">
                                {p.org}
                              </span>
                            </span>
                            <ArrowUpRight className="w-4 h-4 mt-0.5 text-bone-mute group-hover:text-signal-blue flex-shrink-0" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-5">
                <MousePointerClick className="w-5 h-5 text-signal-blue" aria-hidden="true" />
                <p className="text-bone text-[16px] leading-relaxed text-pretty">
                  Pick any tool on the left. This panel shows the projects that
                  use it, so you can check the claim in one click.
                </p>
                <dl className="grid grid-cols-3 gap-3 pt-2">
                  <Count label="Tools" value={SKILL_COUNTS.total} />
                  <Count label="Production" value={SKILL_COUNTS.production} />
                  <Count label="Shipped" value={SKILL_COUNTS.shipped} />
                </dl>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

function Count({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-mute">
        {label}
      </dt>
      <dd className="font-serif text-3xl text-bone leading-none mt-1">{value}</dd>
    </div>
  );
}

function LevelMark({ level, selected = false }: { level: SkillLevel; selected?: boolean }) {
  return (
    <span
      aria-label={LEVEL_LABEL[level]}
      className={cn(
        "inline-block w-2 h-2 rounded-full flex-shrink-0",
        level === "production" && (selected ? "bg-bone" : "bg-signal-blue"),
        level === "shipped" && (selected ? "border border-bone" : "border-[1.5px] border-signal-green"),
        level === "coursework" && "border border-dashed border-bone-mute"
      )}
    />
  );
}

function Legend() {
  const levels: SkillLevel[] = ["production", "shipped", "coursework"];
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
      {levels.map((l) => (
        <li key={l} className="inline-flex items-center gap-1.5 text-[12px] text-bone-mute">
          <LevelMark level={l} />
          {LEVEL_LABEL[l]}
        </li>
      ))}
      <li className="text-[12px] text-bone-mute">
        <span className="font-mono text-[10px]">n</span> = projects using it
      </li>
    </ul>
  );
}
