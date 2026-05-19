type TimelineItem = {
  period: string;
  title: string;
  org: string;
  detail: string;
  badge?: string;
};

const EDUCATION: TimelineItem[] = [
  {
    period: "Feb 2025 — Nov 2026",
    title: "Master of Data Science",
    org: "RMIT University, Melbourne",
    detail:
      "Third semester · GPA 3.0 · Coursework: Machine Learning, Time Series, Data Wrangling, Visualisation, SQL Databases, Advanced Python.",
    badge: "In progress",
  },
  {
    period: "Dec 2023",
    title: "Executive Data Science Specialisation",
    org: "Johns Hopkins University · Coursera",
    detail: "Five-course specialisation. Completed.",
  },
  {
    period: "2019 — 2023",
    title: "Bachelor of Engineering, Information Technology",
    org: "Vasavi College of Engineering (Osmania University)",
    detail: "CGPA 8.50/10 · First Class with Distinction · NAAC A++ accredited.",
  },
];

const EXPERIENCE: TimelineItem[] = [
  {
    period: "Oct 2025 — Present",
    title: "Gaming Supervisor",
    org: "PubCo Group (Pegasus Leisure Group) · Melbourne",
    detail:
      "Three venues. Supervise 50–60 EGMs per venue under VCGLR compliance. Zero breaches. RSG-trained patron welfare interventions.",
  },
  {
    period: "Mar 2025 — Present",
    title: "Student IT Support · Customer Service · Exam Invigilator",
    org: "RMIT · Coles · HOBAN / University of Melbourne",
    detail:
      "Casual portfolio alongside study: 20+ daily IT tickets at RMIT, 50+ customer enquiries at Coles, 30+ examination sessions invigilated at UoM.",
  },
  {
    period: "Jan 2024 — Mar 2025",
    title: "Data Analyst",
    org: "Zelis Healthcare India · Hyderabad",
    detail:
      "Production Snowflake SQL + Power BI for US healthcare payer analytics. 14 weekly reports covering 700+ payers. Cut reporting time ~38%. Quarterly Recognition Award.",
  },
  {
    period: "Feb 2023 — Dec 2023",
    title: "Software Analyst",
    org: "EnergyTech Global · Hyderabad",
    detail:
      "Promoted from intern. Built energy consumption analytics and contract tracking for ReAmped Energy (AU) and Electric Kiwi (NZ) using Python, PostgreSQL, Plotly/Dash.",
  },
];

function Column({
  title,
  items,
}: {
  title: string;
  items: TimelineItem[];
}) {
  return (
    <div className="space-y-8">
      <p className="eyebrow">{title}</p>
      <ol className="space-y-7">
        {items.map((item) => (
          <li
            key={`${item.period}-${item.title}`}
            className="relative pl-5 border-l border-hairline-strong"
          >
            <span
              className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-signal-blue/30 border border-signal-blue"
              aria-hidden="true"
            />
            <div className="space-y-1.5">
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
              <h3 className="font-serif text-lg text-bone text-balance leading-tight">
                {item.title}
              </h3>
              <p className="text-signal-blue text-[13.5px] font-medium">
                {item.org}
              </p>
              <p className="text-bone-dim text-[14px] leading-relaxed text-pretty">
                {item.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Background() {
  return (
    <section
      id="background"
      className="section-pad border-t border-hairline"
      aria-label="Education and experience"
    >
      <div className="container-page grid md:grid-cols-2 gap-12 lg:gap-20">
        <Column title="Education" items={EDUCATION} />
        <Column title="Experience" items={EXPERIENCE} />
      </div>
    </section>
  );
}