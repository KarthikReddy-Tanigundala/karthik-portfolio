import { Mail, Linkedin, ArrowDown, FileDown } from "lucide-react";
import { ChatPanel } from "@/components/chat/chat-panel";
import { DotGrid } from "@/components/ui/dot-grid";
import { WorkRightsBadge } from "@/components/ui/work-rights-badge";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-20 pb-12 md:pt-24 md:pb-16"
      aria-label="Introduction"
    >
      <DotGrid />

      <div className="container-page w-full px-6 md:px-10 lg:px-16 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT: intro */}
        <div className="lg:col-span-5 space-y-7">
          <div className="space-y-3 animate-fade-up">
            <p className="eyebrow">Melbourne · AU · Available</p>
            <h1 className="font-serif text-display-xl text-bone text-balance">
              Karthik <span className="text-signal-blue italic">Reddy</span>
            </h1>
            <p className="font-serif text-display-md text-bone-dim text-balance italic leading-[1.1]">
              Data Analyst, shipping production AI for Australian industry.
            </p>
          </div>

          <p
            className="text-bone-dim leading-relaxed text-pretty max-w-prose animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            Master of Data Science @ RMIT · ex-Data Analyst at Zelis Healthcare
            (Snowflake, Power BI, US payer analytics) · ex-EnergyTech Global
            (Python, PostgreSQL, ANZ retail energy).
          </p>

          <div
            className="animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <WorkRightsBadge />
          </div>

          <div
            className="flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href="/Karthik-Reddy-Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-signal-blue text-bone hover:bg-signal-blue-dim transition-colors text-sm font-medium"
            >
              <FileDown className="w-4 h-4" />
              Resume
            </a>
            <a
              href="mailto:karthikreddytanigundala@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-hairline-strong text-bone hover:border-signal-blue/40 hover:bg-signal-blue/5 transition-colors text-sm font-medium"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
            <a
              href="https://linkedin.com/in/karthik-reddy-datascience"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-hairline-strong text-bone hover:border-signal-blue/40 hover:bg-signal-blue/5 transition-colors text-sm font-medium"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>

          <div
            className="hidden md:flex items-center gap-2 pt-4 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-bone-mute" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-mute">
              Or scroll · or ask the chat →
            </span>
          </div>
        </div>

        {/* RIGHT: chat */}
        <div
          className="lg:col-span-7 animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          <ChatPanel />
        </div>
      </div>
    </section>
  );
}