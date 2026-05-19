import { Database, Heart, Users } from "lucide-react";

const CARDS = [
  {
    icon: Database,
    eyebrow: "Stack",
    title: "Production BI engineer first, AI builder second",
    body: "Snowflake SQL, Power BI (full stack — Desktop, Service, Dataflows, DAX, M), Python (pandas, NumPy, Plotly, Dash), PostgreSQL. The portfolio chat is a Gemini-powered Next.js app — a working demo of the LLM application engineering I'm growing into.",
  },
  {
    icon: Heart,
    eyebrow: "Domain",
    title: "Healthcare and finance, deliberately",
    body: "I spent 1 yr 3 mo at Zelis Healthcare building US payer analytics. Long term, I want to bring international-standard data work back to Indian healthcare and finance. Short term, I'm targeting Bupa, Medibank, CBA, NAB, ANZ, Westpac, Macquarie, and Deloitte / EY / PwC / KPMG analytics graduate programmes.",
  },
  {
    icon: Users,
    eyebrow: "How I work",
    title: "End-to-end ownership, regulated-industry fluency",
    body: "I've delivered across a 10.5-hour US-India time gap, mentored 5 interns, and supervised 50–60 EGM gaming floors under VCGLR compliance with zero breaches. I'm comfortable in environments where accuracy, audit trails, and documentation matter.",
  },
];

export function HowIWork() {
  return (
    <section
      className="section-pad border-t border-hairline"
      aria-label="How I work"
    >
      <div className="container-page">
        <p className="eyebrow mb-10">How I work</p>

        <div className="grid md:grid-cols-3 gap-px bg-hairline border border-hairline">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.eyebrow}
                className="bg-ink p-7 md:p-8 space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className="w-4 h-4 text-signal-blue"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-mute">
                    {card.eyebrow}
                  </p>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-bone leading-tight text-balance">
                  {card.title}
                </h3>
                <p className="text-bone-dim leading-relaxed text-[14.5px] text-pretty">
                  {card.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}