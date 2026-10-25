import { Ruler, Scale, RefreshCcw, Stethoscope } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const PRINCIPLES = [
  {
    icon: Ruler,
    title: "Measured, not claimed",
    body: "Design choices are made on a validation split and the test set is scored once. Comparisons carry bootstrap confidence intervals, so +0.17 MRR comes with its CI of [+0.03, +0.31].",
    proof: "AusPolicyRAG · FootyForecast · GridCast",
  },
  {
    icon: Scale,
    title: "Honest about where it loses",
    body: "AEMO beats GridCast on demand. The betting market beats FootyForecast. A naive RAG baseline answers nearly as well. Each write-up says so, because that is what makes the wins credible.",
    proof: "Every case study has a limitations section",
  },
  {
    icon: RefreshCcw,
    title: "Built to be re-run",
    body: "CI on every repo, offline sample builds, enforced dbt contracts, reconciliation tests, pinned environments and decision records. A reviewer can clone it and get the same numbers.",
    proof: "300+ dbt nodes · GitHub Actions on 5 repos",
  },
  {
    icon: Stethoscope,
    title: "Domain first",
    body: "ACEM triage targets and Australian financial years in health, AEST interval-ending timestamps in the NEM, Squiggle's bits metric in footy, TrakCare steps for BHN staff. The details that silently break models get unit tests.",
    proof: "Healthcare · energy · transport · sport",
  },
];

export function HowIWork() {
  return (
    <section
      className="section-pad border-t border-hairline"
      aria-label="How I work"
    >
      <div className="container-page">
        <Reveal className="mb-10 space-y-3">
          <p className="eyebrow">How I work</p>
          <h2 className="font-serif text-display-lg text-bone text-balance leading-[1.02] max-w-3xl">
            What you get on your team.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal
                key={p.title}
                delay={i * 0.06}
                className="bg-ink p-6 md:p-7 flex flex-col gap-4 hover:bg-ink-50 transition-colors duration-300"
              >
                <Icon className="w-5 h-5 text-signal-blue" strokeWidth={1.8} aria-hidden="true" />
                <h3 className="font-serif text-2xl text-bone leading-tight text-balance">
                  {p.title}
                </h3>
                <p className="text-bone-dim leading-relaxed text-[14.5px] text-pretty">
                  {p.body}
                </p>
                <p className="mt-auto pt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-signal-amber">
                  {p.proof}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
