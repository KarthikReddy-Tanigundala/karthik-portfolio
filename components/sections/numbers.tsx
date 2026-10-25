import { AnimatedNumber } from "@/components/ui/animated-number";
import { Reveal } from "@/components/ui/reveal";

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
    value: 2,
    suffix: "+ yrs",
    label: "Production data & BI",
    sublabel: "Zelis Healthcare · EnergyTech Global",
  },
  {
    value: 38,
    prefix: "~",
    suffix: "%",
    label: "Faster exec reporting",
    sublabel: "14 Power BI reports · 700+ US payers",
  },
  {
    value: 7,
    label: "Projects shipped in 2026",
    sublabel: "Health · energy · transport · sport · GenAI",
  },
  {
    value: 300,
    suffix: "+",
    label: "dbt nodes passing",
    sublabel: "LittleVitals + MoveMelbourne, tested in CI",
  },
  {
    value: 0.48,
    decimals: 2,
    label: "MASE, day-ahead demand",
    sublabel: "GridCast · 972 out-of-sample days",
  },
  {
    value: 0.17,
    decimals: 2,
    prefix: "+",
    label: "MRR from hybrid retrieval",
    sublabel: "AusPolicyRAG · 95% CI [+0.03, +0.31]",
  },
];

export function Numbers() {
  return (
    <section
      className="px-4 sm:px-6 md:px-10 lg:px-16 py-14 md:py-20 border-t border-hairline"
      aria-label="Proof in numbers"
    >
      <div className="container-page">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-ink p-5 md:p-6 space-y-2 hover:bg-ink-50 transition-colors duration-300"
              >
                <div className="font-serif text-4xl md:text-[44px] text-bone leading-none">
                  <AnimatedNumber
                    end={stat.value}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-signal-amber pt-1">
                  {stat.label}
                </p>
                <p className="text-[12.5px] text-bone-mute leading-snug">
                  {stat.sublabel}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
