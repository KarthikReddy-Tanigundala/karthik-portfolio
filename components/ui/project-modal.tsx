"use client";

import { useEffect } from "react";
import { X, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  "in-development": "In Development",
  "production-archived": "Production · Archived",
  academic: "Academic",
};

const STATUS_COLOUR: Record<Project["status"], string> = {
  live: "text-signal-blue border-signal-blue/30 bg-signal-blue/10",
  "in-development": "text-signal-amber border-signal-amber/30 bg-signal-amber/10",
  "production-archived": "text-bone-dim border-hairline-strong bg-ink-100",
  academic: "text-bone-dim border-hairline-strong bg-ink-100",
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Escape to close + lock body scroll while open
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close project details"
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm animate-fade-up"
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-ink-50 border border-hairline-strong rounded-t-xl md:rounded-xl max-h-[88vh] overflow-y-auto animate-fade-up">
        <header className="sticky top-0 flex items-start justify-between gap-4 px-6 py-5 border-b border-hairline bg-ink-50/95 backdrop-blur-sm">
          <div className="flex-1">
            <span
              className={cn(
                "inline-block px-2.5 py-1 rounded-full border text-[10px] uppercase tracking-[0.14em] font-mono mb-3",
                STATUS_COLOUR[project.status]
              )}
            >
              {STATUS_LABEL[project.status]}
            </span>
            <h2
              id="project-modal-title"
              className="font-serif text-2xl md:text-3xl text-bone text-balance leading-tight"
            >
              {project.title}
            </h2>
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

        <div className="px-6 py-6 space-y-6">
          <section>
            <h3 className="eyebrow mb-2">Problem</h3>
            <p className="text-bone-dim leading-relaxed text-pretty">
              {project.problem}
            </p>
          </section>

          <section>
            <h3 className="eyebrow mb-2">Detail</h3>
            <p className="text-bone-dim leading-relaxed text-pretty">
              {project.longDescription}
            </p>
          </section>

          <section>
            <h3 className="eyebrow mb-3">Stack</h3>
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
          </section>

          <section>
            <h3 className="eyebrow mb-3">Outcomes</h3>
            <ul className="space-y-2">
              {project.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex gap-3 text-bone-dim leading-relaxed"
                >
                  <span className="text-signal-blue mt-1.5 flex-shrink-0">
                    →
                  </span>
                  <span className="text-pretty">{outcome}</span>
                </li>
              ))}
            </ul>
          </section>

          {project.callToChat && (
            <section className="px-4 py-3 rounded-md border border-signal-blue/20 bg-signal-blue/5">
              <p className="text-bone-dim text-sm leading-relaxed text-pretty">
                {project.callToChat}
              </p>
            </section>
          )}

          {project.links && (
            <section className="flex flex-wrap gap-3 pt-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-hairline-strong text-bone hover:border-signal-blue/40 hover:bg-signal-blue/5 transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {project.links.liveDemo && (
                <a
                  href={project.links.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-signal-blue text-bone hover:bg-signal-blue-dim transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}