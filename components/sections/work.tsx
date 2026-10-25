"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, BookOpen, X } from "lucide-react";
import {
  CATEGORY_LABEL,
  projects,
  rankForRole,
  type Category,
  type Project,
} from "@/lib/projects";
import { ROLE_BY_ID } from "@/lib/roles";
import { useLens } from "@/components/ui/lens-provider";
import { StatusBadge } from "@/components/ui/status-badge";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const FILTERS: (Category | "all")[] = [
  "all",
  "industry",
  "analytics-engineering",
  "ml",
  "genai",
  "bi",
];

export function Work() {
  const { role, setRole, openProject } = useLens();
  const [filter, setFilter] = useState<Category | "all">("all");

  const visible = useMemo(() => {
    const filtered =
      filter === "all"
        ? projects
        : projects.filter((p) => p.categories.includes(filter));
    return rankForRole(filtered, role);
  }, [filter, role]);

  return (
    <section
      id="work"
      className="section-pad border-t border-hairline scroll-mt-14"
      aria-label="Projects and work"
    >
      <div className="container-page">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div className="space-y-3">
            <p className="eyebrow">Work</p>
            <h2 className="font-serif text-display-lg text-bone text-balance leading-[1.02]">
              Shipped, measured, and honest about the limits.
            </h2>
          </div>
          <p className="text-bone-dim text-[15px] leading-relaxed max-w-md text-pretty">
            Every project opens into a short case study: the problem, what I
            built, the results and where it falls short. Click any card.
          </p>
        </Reveal>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          {FILTERS.map((f) => {
            const count =
              f === "all"
                ? projects.length
                : projects.filter((p) => p.categories.includes(f)).length;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[12.5px] font-medium border transition-colors",
                  filter === f
                    ? "bg-bone text-ink border-bone"
                    : "text-bone-dim border-hairline-strong hover:text-bone hover:border-bone/40"
                )}
              >
                {f === "all" ? "All work" : CATEGORY_LABEL[f]}
                <span className={cn("ml-1.5 font-mono text-[11px]", filter === f ? "text-ink/60" : "text-bone-mute")}>
                  {count}
                </span>
              </button>
            );
          })}
          {role && (
            <span className="inline-flex items-center gap-2 pl-3 pr-1.5 py-1 rounded-full border border-signal-blue/40 bg-signal-blue/10 text-[12.5px] text-bone">
              Ranked for {ROLE_BY_ID[role].label}
              <button
                type="button"
                onClick={() => setRole(null)}
                aria-label="Clear role ranking"
                className="p-0.5 rounded-full hover:bg-signal-blue/20"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard
                  project={project}
                  strongFit={role ? project.roleFit[role] === 3 : false}
                  roleShort={role ? ROLE_BY_ID[role].short : ""}
                  onOpen={() => openProject(project.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  strongFit,
  roleShort,
  onOpen,
}: {
  project: Project;
  strongFit: boolean;
  roleShort: string;
  onOpen: () => void;
}) {
  const links = project.links ?? {};
  return (
    <article
      className={cn(
        "group relative h-full flex flex-col rounded-lg border bg-ink-50/40 p-6 transition-all duration-300",
        "hover:bg-ink-50 hover:-translate-y-0.5 hover:border-signal-blue/40",
        strongFit ? "border-signal-blue/50" : "border-hairline"
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <StatusBadge status={project.status} />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-bone-mute text-right">
          {project.period}
        </span>
      </div>

      <h3 className="font-serif text-[26px] text-bone leading-tight text-balance">
        <button
          type="button"
          onClick={onOpen}
          className="text-left after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none"
          aria-label={`Open the ${project.title} case study`}
        >
          {project.title}
        </button>
      </h3>
      <p className="mt-1 text-signal-blue text-[13px] font-medium leading-snug">
        {project.org}
      </p>

      <p className="mt-3 text-bone-dim text-[14.5px] leading-relaxed text-pretty line-clamp-3">
        {project.tagline}
      </p>

      <div className="mt-5 pt-4 border-t border-hairline">
        <p className="font-serif text-[32px] text-bone leading-none">
          {project.headline.value}
        </p>
        <p className="mt-1.5 text-[12.5px] text-bone-mute leading-snug">
          {project.headline.label}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded-sm font-mono text-[10.5px] text-bone-mute border border-hairline-strong"
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="font-mono text-[10.5px] text-bone-mute self-center">
            +{project.stack.length - 4}
          </span>
        )}
      </div>

      <div className="mt-auto pt-5 flex items-center justify-between gap-3">
        <div className="relative z-10 flex items-center gap-1">
          {links.live && (
            <CardLink href={links.live} label={`${project.title} live demo`} icon={ExternalLink} text="Live" />
          )}
          {links.github && (
            <CardLink href={links.github} label={`${project.title} code on GitHub`} icon={Github} text="Code" />
          )}
          {links.docs && (
            <CardLink href={links.docs} label={`${project.title} dbt docs`} icon={BookOpen} text="Docs" />
          )}
        </div>
        <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-bone-mute group-hover:text-signal-blue transition-colors">
          {strongFit ? `Strong ${roleShort} fit ·` : ""} Case study
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </article>
  );
}

function CardLink({
  href,
  label,
  icon: Icon,
  text,
}: {
  href: string;
  label: string;
  icon: typeof Github;
  text: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[12px] text-bone-dim hover:text-bone hover:bg-ink-100 transition-colors"
    >
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      {text}
    </a>
  );
}
