import { Award, Radio, ShieldCheck, Languages } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

type Role = {
  period: string;
  title: string;
  org: string;
  badge?: string;
  points: string[];
};

const EXPERIENCE: Role[] = [
  {
    period: "Semester 2 · 2026",
    title: "Industry project: AI assistant for funding reporting",
    org: "Better Health Network × RMIT Work-Integrated Learning",
    badge: "Health",
    points: [
      "Co-built AssistBot, a Copilot Studio agent in Teams that answers funding-reporting questions across 7 funding streams with cited sources and the exact TrakCare step.",
      "Structured scattered program guidelines into a 166-entry SharePoint knowledge base that staff can maintain without code; designed a 63-case, three-run evaluation in which the agent reached 90–95% answer accuracy.",
    ],
  },
  {
    period: "Jan 2024 – Mar 2025",
    title: "Data Analyst",
    org: "Zelis Healthcare · Hyderabad (US healthcare payments)",
    badge: "Healthcare",
    points: [
      "Cut weekly executive reporting ~38% (4 h → under 2.5 h) across 14 Power BI reports for 700+ US payers by rebuilding Snowflake stored procedures and moving Excel steps into dataflows.",
      "Automated month-end network reconciliation (~30% less effort), implemented Snowflake RBAC, mentored two interns. Quarterly Recognition Award.",
    ],
  },
  {
    period: "Feb – Dec 2023",
    title: "Software Analyst (promoted from intern in 4 months)",
    org: "EnergyTech Global · Hyderabad (for ReAmped Energy AU, Electric Kiwi NZ)",
    badge: "Energy",
    points: [
      "Built energy-consumption dashboards and a contract-tracking system in Python, PostgreSQL, Flask and Plotly/Dash; ~15% less project downtime via pipeline analysis.",
    ],
  },
  {
    period: "Mar 2025 – present",
    title: "Student IT Support Officer & casual roles",
    org: "RMIT University and Melbourne venues, alongside full-time study",
    points: [
      "Level 1 helpdesk (20+ tickets a day), plus customer-service and compliance-sensitive venue work: Australian workplace experience, reliability and stakeholder skills.",
    ],
  },
];

const EDUCATION = [
  {
    period: "Feb 2025 – Nov 2026",
    title: "Master of Data Science",
    org: "RMIT University, Melbourne",
    detail:
      "Machine learning, time series, multivariate analysis, big data processing (Spark, Hadoop), data wrangling, visualisation, social-network analytics.",
  },
  {
    period: "Dec 2023",
    title: "Executive Data Science Specialisation",
    org: "Johns Hopkins University · Coursera",
    detail: "Five-course specialisation.",
  },
  {
    period: "2019 – 2023",
    title: "Bachelor of Engineering, Information Technology",
    org: "Vasavi College of Engineering (Osmania University)",
    detail: "CGPA 8.50 / 10 · First Class with Distinction.",
  },
];

const CERTS = [
  "Study Australia Industry Experience Program (completer)",
  "Google Cloud: Digital Transformation",
  "Google Cloud: Security & Operations",
  "Cisco CCNAv7: Introduction to Networks",
  "NPTEL (IIT): The Joy of Computing using Python",
];

const NOW = [
  {
    label: "Collecting",
    text: "MoveMelbourne's 28-day train and tram study runs to 19 Nov 2026, covering Melbourne Cup Day.",
  },
  {
    label: "Forecasting",
    text: "GridCast publishes tomorrow's VIC1 demand and price forecast every day at 12:35 AEST.",
  },
  {
    label: "Preparing",
    text: "FootyForecast's live tips entry on the Squiggle leaderboard for the 2027 AFL season.",
  },
  {
    label: "Graduating",
    text: "Master of Data Science, RMIT, November 2026.",
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="section-pad border-t border-hairline scroll-mt-14"
      aria-label="Experience and education"
    >
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7 space-y-8">
          <Reveal className="space-y-3">
            <p className="eyebrow">Experience</p>
            <h2 className="font-serif text-display-lg text-bone text-balance leading-[1.02]">
              Real data, real stakeholders.
            </h2>
          </Reveal>
          <div className="space-y-8">
            {EXPERIENCE.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.05}
                className="relative pl-6 border-l border-hairline-strong"
              >
                <div>
                  <span
                    className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-signal-blue/30 border border-signal-blue"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-bone-mute">
                      {item.period}
                    </p>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.12em] text-signal-amber border border-signal-amber/30 bg-signal-amber/5">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1.5 font-serif text-xl text-bone leading-tight text-balance">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-signal-blue text-[13.5px] font-medium">
                    {item.org}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-bone-dim text-[14.5px] leading-relaxed">
                        <span className="text-signal-blue text-[10px] mt-2 flex-shrink-0" aria-hidden="true">
                          ●
                        </span>
                        <span className="text-pretty">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-10">
          <Reveal className="rounded-lg border border-signal-green/25 bg-signal-green/[0.04] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-signal-green" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-green">
                Right now
              </p>
            </div>
            <dl className="space-y-3">
              {NOW.map((n) => (
                <div key={n.label} className="grid grid-cols-[92px_1fr] gap-3">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-bone-mute pt-0.5">
                    {n.label}
                  </dt>
                  <dd className="text-bone-dim text-[14px] leading-relaxed text-pretty">
                    {n.text}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="space-y-5">
            <p className="eyebrow">Education</p>
            <ol className="space-y-5">
              {EDUCATION.map((e) => (
                <li key={e.title} className="space-y-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-bone-mute">
                    {e.period}
                  </p>
                  <h3 className="font-serif text-lg text-bone leading-tight">{e.title}</h3>
                  <p className="text-signal-blue text-[13px] font-medium">{e.org}</p>
                  <p className="text-bone-dim text-[13.5px] leading-relaxed">{e.detail}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="eyebrow inline-flex items-center gap-2">
                <Award className="w-3.5 h-3.5" aria-hidden="true" /> Certifications
              </p>
              <ul className="space-y-1.5">
                {CERTS.map((c) => (
                  <li key={c} className="text-bone-dim text-[13.5px] leading-snug">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="eyebrow inline-flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Checks
                </p>
                <ul className="space-y-1.5 text-bone-dim text-[13.5px] leading-snug">
                  <li>National Police Check (current)</li>
                  <li>Working With Children Check (valid to 2030)</li>
                  <li>Full Australian driver's licence</li>
                </ul>
              </div>
              <div className="space-y-3">
                <p className="eyebrow inline-flex items-center gap-2">
                  <Languages className="w-3.5 h-3.5" aria-hidden="true" /> Languages
                </p>
                <p className="text-bone-dim text-[13.5px] leading-snug">
                  English (professional), Telugu (native), Hindi (full
                  professional), German (elementary)
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
