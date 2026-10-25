import { Mail, Linkedin, Github, FileDown, MapPin, GraduationCap } from "lucide-react";
import { DotGrid } from "@/components/ui/dot-grid";
import { RoleLens } from "@/components/sections/role-lens";

export function Hero() {
  return (
    <section
      id="top"
      className="relative lg:min-h-[92vh] flex items-center pt-24 pb-14 md:pb-16"
      aria-label="Introduction"
    >
      <DotGrid />

      <div className="container-page w-full px-4 sm:px-6 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* LEFT: intro */}
        <div className="lg:col-span-6 space-y-7 min-w-0">
          <div
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-hairline-strong bg-ink-50/60 animate-fade-up"
            role="status"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-signal-green opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-green" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-dim">
              Open to Melbourne data roles · available now
            </span>
          </div>

          <div className="space-y-4">
            <h1
              className="font-serif text-display-xl text-bone text-balance animate-fade-up"
              style={{ animationDelay: "60ms" }}
            >
              Karthik <span className="text-signal-blue italic">Reddy</span>
            </h1>
            <p
              className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-signal-amber animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              Data Analyst · Analytics Engineer · Data Scientist
            </p>
            <p
              className="font-serif text-display-md text-bone-dim text-balance italic leading-[1.12] animate-fade-up"
              style={{ animationDelay: "180ms" }}
            >
              From raw feeds to tested models, calibrated forecasts and dashboards people act on.
            </p>
          </div>

          <p
            className="text-bone-dim leading-relaxed text-pretty max-w-prose animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <span className="text-bone">2+ years of production data and BI</span>{" "}
            at Zelis Healthcare (US payers) and EnergyTech Global (AU/NZ energy),
            plus <span className="text-bone">seven end-to-end projects in 2026</span>
            {" "}across health, energy, transport, sport and an AI assistant
            delivered to Better Health Network.
          </p>

          <ul
            className="flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-bone-mute animate-fade-up"
            style={{ animationDelay: "280ms" }}
          >
            <li className="inline-flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-signal-blue" aria-hidden="true" />
              Master of Data Science, RMIT · Nov 2026
            </li>
            <li className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-signal-blue" aria-hidden="true" />
              Melbourne, VIC
            </li>
          </ul>


          <div
            className="flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href="/Karthik-Reddy-Resume.pdf"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-signal-blue text-bone hover:bg-signal-blue-dim transition-colors text-sm font-medium"
            >
              <FileDown className="w-4 h-4" />
              Resume
            </a>
            <HeroLink href="mailto:karthikreddytanigundala@gmail.com" icon={Mail}>
              Email
            </HeroLink>
            <HeroLink href="https://linkedin.com/in/karthik-reddy-datascience" icon={Linkedin} external>
              LinkedIn
            </HeroLink>
            <HeroLink href="https://github.com/KarthikReddy-Tanigundala" icon={Github} external>
              GitHub
            </HeroLink>
          </div>
        </div>

        {/* RIGHT: interactive role lens */}
        <div
          className="lg:col-span-6 min-w-0 animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <RoleLens />
        </div>
      </div>
    </section>
  );
}

function HeroLink({
  href,
  icon: Icon,
  external = false,
  children,
}: {
  href: string;
  icon: typeof Mail;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-hairline-strong text-bone hover:border-signal-blue/40 hover:bg-signal-blue/5 transition-colors text-sm font-medium"
    >
      <Icon className="w-4 h-4" />
      {children}
    </a>
  );
}
