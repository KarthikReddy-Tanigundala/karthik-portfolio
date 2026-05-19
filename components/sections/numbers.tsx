import { AnimatedNumber } from "@/components/ui/animated-number";

type Stat = {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel: string;
};

const STATS: Stat[] = [
  {
    value: 8.5,
    decimals: 2,
    suffix: "/10",
    label: "CGPA",
    sublabel: "Vasavi · Distinction",
  },
  {
    value: 2,
    suffix: "+ yrs",
    label: "Production BI",
    sublabel: "Zelis + EnergyTech",
  },
  {
    value: 14,
    label: "Reports Shipped",
    sublabel: "Weekly · Zelis Healthcare",
  },
  {
    value: 700,
    suffix: "+",
    label: "US Payers Served",
    sublabel: "via Zelis platform",
  },
  {
    value: 5,
    label: "Interns Mentored",
    sublabel: "across 2 roles",
  },
  {
    value: 3,
    suffix: " yrs",
    label: "485 Work Rights",
    sublabel: "from Nov 2026",
  },
];

export function Numbers() {
  return (
    <section
      className="section-pad border-t border-hairline"
      aria-label="Proof in numbers"
    >
      <div className="container-page">
        <p className="eyebrow mb-10">Proof in numbers</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-hairline border border-hairline">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-ink p-6 md:p-7 space-y-2 hover:bg-ink-50 transition-colors duration-300"
            >
              <div className="font-serif text-4xl md:text-5xl text-bone leading-none">
                <AnimatedNumber
                  end={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-amber pt-1">
                {stat.label}
              </p>
              <p className="text-[13px] text-bone-mute leading-relaxed">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}