"use client";

import { useEffect, useRef } from "react";
import {
  X,
  Github,
  ExternalLink,
  BookOpen,
  Database,
  ArrowLeft,
  ArrowRight,
  Hourglass,
  Users,
} from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import { StatusBadge } from "@/components/ui/status-badge";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export function ProjectModal({ project, onClose, onOpen }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const index = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prev = index > 0 ? projects[index - 1] : projects[projects.length - 1];
  const next = projects[(index + 1) % projects.length];

  // Escape closes, arrow keys page between case studies, body scroll locks.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onOpen(next.id);
      if (e.key === "ArrowLeft") onOpen(prev.id);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose, onOpen, next, prev]);

  // New project: scroll the panel back to the top and move focus into it.
  useEffect(() => {
    if (!project) return;
    panelRef.current?.scrollTo({ top: 0 });
    panelRef.current?.focus({ preventScroll: true });
  }, [project]);

  if (!project) return null;

  const links = project.links ?? {};

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
    >
      <button
        type="button"
        aria-label="Close project details"
        onClick={onClose}
        className="absolute inset-0 bg-ink/85 backdrop-blur-sm animate-fade-up"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-3xl bg-ink-50 border border-hairline-strong rounded-t-xl md:rounded-xl max-h-[92vh] overflow-y-auto animate-fade-up outline-none"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 md:px-8 py-5 border-b border-hairline bg-ink-50/95 backdrop-blur-sm">
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={project.status} />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-bone-mute">
                {project.period}
              </span>
            </div>
            <h2
              id="project-modal-title"
              className="font-serif text-2xl md:text-[34px] text-bone text-balance leading-tight"
            >
              {project.title}
            </h2>
            <p className="text-signal-blue text-[14px] font-medium">
              {project.org}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-ink-100 text-bone-dim hover:text-bone transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="px-6 md:px-8 py-7 space-y-8">
          <p className="text-bone leading-relaxed text-[16px] text-pretty">
            {project.tagline}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline border border-hairline rounded-md overflow-hidden">
            <div className="col-span-2 md:col-span-4 bg-ink p-5">
              <p className="font-serif text-4xl md:text-5xl text-bone leading-none">
                {project.headline.value}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-signal-amber">
                {project.headline.label}
              </p>
            </div>
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-ink p-4">
                <p className="font-serif text-2xl text-bone leading-none">
                  {m.value}
                </p>
                <p className="mt-2 text-[12.5px] text-bone-mute leading-snug">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          {project.pendingNote && (
            <div className="flex gap-3 px-4 py-3 rounded-md border border-signal-amber/30 bg-signal-amber/5">
              <Hourglass
                className="w-4 h-4 text-signal-amber flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-[14px] text-bone-dim leading-relaxed">
                {project.pendingNote}
              </p>
            </div>
          )}

          <Block title="The problem">
            <p className="text-bone-dim leading-relaxed text-pretty">
              {project.problem}
            </p>
          </Block>

          <Block title="What I built">
            <List items={project.approach} marker="→" />
          </Block>

          <Block title="Results">
            <List items={project.results} marker="✓" />
          </Block>

          <Block title="Honest limitations">
            <List items={project.limits} marker="!" tone="amber" />
          </Block>

          <Block title="Tools used">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md font-mono text-[12px] text-bone-dim border border-hairline-strong bg-ink"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Block>

          {project.team && (
            <p className="flex items-center gap-2 text-[13.5px] text-bone-mute">
              <Users className="w-4 h-4" aria-hidden="true" />
              {project.team}
            </p>
          )}

          {(links.live || links.github || links.docs || links.data) && (
            <div className="flex flex-wrap gap-3">
              {links.live && (
                <LinkButton href={links.live} primary icon={ExternalLink}>
                  Open live demo
                </LinkButton>
              )}
              {links.github && (
                <LinkButton href={links.github} icon={Github}>
                  Code on GitHub
                </LinkButton>
              )}
              {links.docs && (
                <LinkButton href={links.docs} icon={BookOpen}>
                  dbt docs & lineage
                </LinkButton>
              )}
              {links.data && (
                <LinkButton href={links.data} icon={Database}>
                  Dataset on Hugging Face
                </LinkButton>
              )}
            </div>
          )}
          {links.live && (
            <p className="-mt-4 text-[12px] text-bone-mute">
              Free-tier Streamlit apps sleep when idle. Allow ~30 s to wake.
            </p>
          )}
        </div>

        <footer className="sticky bottom-0 flex items-center justify-between gap-3 px-6 md:px-8 py-3 border-t border-hairline bg-ink-50/95 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => onOpen(prev.id)}
            className="group inline-flex items-center gap-2 text-[13px] text-bone-dim hover:text-bone transition-colors min-w-0"
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0 group-hover:-translate-x-0.5 transition-transform" />
            <span className="truncate">{prev.title}</span>
          </button>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.14em] text-bone-mute">
            ← → to browse · esc to close
          </span>
          <button
            type="button"
            onClick={() => onOpen(next.id)}
            className="group inline-flex items-center gap-2 text-[13px] text-bone-dim hover:text-bone transition-colors min-w-0"
          >
            <span className="truncate">{next.title}</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </footer>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="eyebrow mb-3">{title}</h3>
      {children}
    </section>
  );
}

function List({
  items,
  marker,
  tone = "blue",
}: {
  items: string[];
  marker: string;
  tone?: "blue" | "amber";
}) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-bone-dim leading-relaxed text-[15px]">
          <span
            className={
              tone === "amber"
                ? "text-signal-amber flex-shrink-0 font-mono text-[13px] mt-0.5 w-3 text-center"
                : "text-signal-blue flex-shrink-0 font-mono text-[13px] mt-0.5 w-3 text-center"
            }
            aria-hidden="true"
          >
            {marker}
          </span>
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function LinkButton({
  href,
  icon: Icon,
  primary = false,
  children,
}: {
  href: string;
  icon: typeof Github;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        primary
          ? "inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-signal-blue text-bone hover:bg-signal-blue-dim transition-colors text-sm font-medium"
          : "inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-hairline-strong text-bone hover:border-signal-blue/40 hover:bg-signal-blue/5 transition-colors text-sm font-medium"
      }
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
      {children}
    </a>
  );
}
