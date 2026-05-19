"use client";

import { useState } from "react";
import { highlightedProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import { ProjectModal } from "@/components/ui/project-modal";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  "in-development": "In Development",
  "production-archived": "Production",
  academic: "Academic",
};

const STATUS_COLOUR: Record<Project["status"], string> = {
  live: "text-signal-blue",
  "in-development": "text-signal-amber",
  "production-archived": "text-bone-dim",
  academic: "text-bone-mute",
};

export function SelectedWork() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="section-pad border-t border-hairline"
      aria-label="Selected work"
    >
      <div className="container-page">
        <div className="flex items-baseline justify-between mb-10 gap-6 flex-wrap">
          <p className="eyebrow">Selected work</p>
          <p className="font-mono text-[12px] text-bone-mute">
            {highlightedProjects.length} of {highlightedProjects.length} ·
            click any card
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-hairline border border-hairline">
          {highlightedProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveProject(project)}
              className={cn(
                "group relative text-left bg-ink p-7 md:p-8 space-y-5",
                "hover:bg-ink-50 transition-colors duration-300",
                "focus-visible:bg-ink-50"
              )}
              aria-label={`View ${project.title} details`}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.14em]",
                    STATUS_COLOUR[project.status]
                  )}
                >
                  · {STATUS_LABEL[project.status]}
                </span>
                <ArrowUpRight
                  className="w-5 h-5 text-bone-mute group-hover:text-signal-blue group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 ease-stripe flex-shrink-0"
                  aria-hidden="true"
                />
              </div>

              <h3 className="font-serif text-2xl md:text-[28px] text-bone leading-tight text-balance">
                {project.title}
              </h3>

              <p className="text-bone-dim leading-relaxed text-[15px] text-pretty">
                {project.problem}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-sm font-mono text-[11px] text-bone-mute border border-hairline-strong"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="font-mono text-[11px] text-bone-mute self-center">
                    +{project.stack.length - 4}
                  </span>
                )}
              </div>

              <ul className="space-y-1.5 pt-1">
                {project.outcomes.slice(0, 2).map((outcome) => (
                  <li
                    key={outcome}
                    className="flex gap-2.5 text-[13.5px] text-bone-dim leading-relaxed"
                  >
                    <span className="text-signal-blue mt-1.5 flex-shrink-0 text-[10px]">
                      →
                    </span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <p className="font-mono text-[12px] text-bone-mute mt-6 text-center md:text-left">
          ↑ The chat in the hero is itself a working RAG-style assistant — built
          on the same patterns as the standalone project.
        </p>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}