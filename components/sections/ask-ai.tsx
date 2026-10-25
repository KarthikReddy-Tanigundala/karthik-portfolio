import { Sparkles } from "lucide-react";
import { ChatPanel } from "@/components/chat/chat-panel";
import { Reveal } from "@/components/ui/reveal";

export function AskAI() {
  return (
    <section
      id="ask"
      className="section-pad border-t border-hairline scroll-mt-14"
      aria-label="Ask my AI assistant"
    >
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <Reveal className="lg:col-span-5 space-y-6">
          <p className="eyebrow inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-signal-amber" aria-hidden="true" />
            Ask my AI assistant
          </p>
          <h2 className="font-serif text-display-lg text-bone text-balance leading-[1.02]">
            Got a screening question? Ask it here.
          </h2>
          <p className="text-bone-dim leading-relaxed text-pretty">
            It answers in my voice from the same project data this page is
            built on: experience, tools, results, availability and work rights.
            If it doesn't know, it says so and points you to my email.
          </p>
          <ul className="space-y-2 text-[14px] text-bone-mute">
            <li>→ "Have you used dbt with Snowflake?"</li>
            <li>→ "Walk me through GridCast in 30 seconds."</li>
            <li>→ "What did you build for Better Health Network?"</li>
          </ul>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-bone-mute">
            Built with Next.js, the Vercel AI SDK and Gemini · rate-limited
          </p>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7 min-w-0">
          <ChatPanel />
        </Reveal>
      </div>
    </section>
  );
}
