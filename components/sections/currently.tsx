import { Code2 } from "lucide-react";

const NOW_ITEMS = [
  {
    label: "Building",
    detail:
      "A production RAG-powered document Q&A bot — semantic chunking, vector retrieval, citation grounding. Separate from this site's embedded chat.",
  },
  {
    label: "Building",
    detail:
      "An Australian healthcare analytics dashboard on public AIHW / Medicare data, translating my Zelis-era US payer work to the AU context.",
  },
  {
    label: "Studying",
    detail:
      "RMIT third-semester subjects · time series, multivariate analysis, social networks analytics.",
  },
  {
    label: "Working",
    detail:
      "Gaming Supervisor across three PubCo Group venues in Melbourne, on a casual roster around study.",
  },
];

export function Currently() {
  return (
    <section
      id="currently"
      className="section-pad border-t border-hairline"
      aria-label="What I am working on now"
    >
      <div className="container-page max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Code2
            className="w-4 h-4 text-signal-amber"
            strokeWidth={2}
            aria-hidden="true"
          />
          <p className="eyebrow">Currently · {currentMonthYearAU()}</p>
        </div>

        <h2 className="font-serif text-display-md text-bone mb-10 text-balance">
          Active practitioner, not just a candidate.
        </h2>

        <dl className="space-y-6">
          {NOW_ITEMS.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[88px_1fr] gap-6 pb-6 border-b border-hairline last:border-b-0 last:pb-0"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-amber pt-1">
                {item.label}
              </dt>
              <dd className="text-bone-dim leading-relaxed text-pretty">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function currentMonthYearAU(): string {
  const date = new Date();
  return date.toLocaleDateString("en-AU", {
    month: "long",
    year: "numeric",
  });
}