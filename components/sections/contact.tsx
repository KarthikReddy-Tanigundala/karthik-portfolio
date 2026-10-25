"use client";

import { useState } from "react";
import { Mail, Linkedin, MessageSquare, Loader2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";

const SCREENING: [string, string][] = [
  ["Location", "Niddrie, Melbourne VIC · car and licence"],
  ["Work rights", "Full Australian work rights · no sponsorship needed"],
  ["Availability", "Available now · full-time, part-time or contract"],
  ["Checks", "National Police Check · Working With Children Check"],
];

export function Contact() {
  const [state, setState] = useState<FormState>("idle");
  const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formspreeEndpoint) {
      setState("error");
      return;
    }
    setState("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  return (
    <section
      id="contact"
      className="section-pad border-t border-hairline scroll-mt-14"
      aria-label="Contact"
    >
      <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <Reveal className="space-y-7">
          <p className="eyebrow">Contact</p>
          <h2 className="font-serif text-display-lg text-bone text-balance leading-[1.05]">
            Let's talk about your team.
          </h2>
          <p className="text-bone-dim leading-relaxed text-pretty max-w-prose">
            Open to Data Analyst, BI, Analytics Engineer and Data Scientist
            roles in Melbourne, available now. I reply within 24 hours AEST.
          </p>

          <div className="space-y-4 pt-2">
            <a
              href="mailto:karthikreddytanigundala@gmail.com"
              className="group flex items-center gap-4 py-4 border-b border-hairline hover:border-signal-blue/50 transition-colors"
            >
              <Mail
                className="w-5 h-5 text-signal-blue flex-shrink-0"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <div className="flex-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-mute mb-1">
                  Email · fastest
                </p>
                <p className="text-bone group-hover:text-signal-blue transition-colors">
                  karthikreddytanigundala@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/karthik-reddy-datascience"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 py-4 border-b border-hairline hover:border-signal-blue/50 transition-colors"
            >
              <Linkedin
                className="w-5 h-5 text-signal-blue flex-shrink-0"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <div className="flex-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-mute mb-1">
                  LinkedIn
                </p>
                <p className="text-bone group-hover:text-signal-blue transition-colors">
                  /in/karthik-reddy-datascience
                </p>
              </div>
            </a>

            <a
              href="#ask"
              className="group flex items-center gap-4 py-4 border-b border-hairline hover:border-signal-blue/50 transition-colors"
            >
              <MessageSquare
                className="w-5 h-5 text-signal-blue flex-shrink-0"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <div className="flex-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-mute mb-1">
                  Or ask the chat
                </p>
                <p className="text-bone group-hover:text-signal-blue transition-colors">
                  Ask my AI assistant
                </p>
              </div>
            </a>
          </div>
        </Reveal>

        {formspreeEndpoint ? (
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6 md:p-8 rounded-lg border border-hairline bg-ink-50/40"
          >
            <p className="eyebrow">Or send a quick note</p>

            <Field label="Name" name="name" type="text" required />
            <Field label="Email" name="email" type="email" required />
            <Field
              label="Company / role context"
              name="context"
              type="text"
            />

            <div>
              <label
                htmlFor="message"
                className="block font-mono text-[11px] uppercase tracking-[0.14em] text-bone-mute mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Hi Karthik"
                className={cn(
                  "w-full px-3.5 py-3 bg-ink border border-hairline-strong rounded-md",
                  "text-bone placeholder:text-bone-mute text-[15px] leading-relaxed",
                  "outline-none focus:border-signal-blue/50 transition-colors",
                  "resize-y min-h-[120px]"
                )}
              />
            </div>

            <button
              type="submit"
              disabled={state === "submitting"}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium text-sm transition-colors",
                state === "submitting"
                  ? "bg-ink-100 text-bone-mute cursor-not-allowed"
                  : "bg-signal-blue text-bone hover:bg-signal-blue-dim"
              )}
            >
              {state === "submitting" && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {state === "submitting" ? "Sending..." : "Send message"}
            </button>

            {state === "success" && (
              <p
                role="status"
                className="text-sm text-signal-blue px-3 py-2.5 rounded-md border border-signal-blue/30 bg-signal-blue/5"
              >
                Got it. I will reply within 24 hrs AEST.
              </p>
            )}

            {state === "error" && (
              <p
                role="alert"
                className="text-sm text-signal-amber px-3 py-2.5 rounded-md border border-signal-amber/30 bg-signal-amber/5"
              >
                Something went wrong. Email me directly at karthikreddytanigundala@gmail.com.
              </p>
            )}
          </form>
        </Reveal>
        ) : (
          <Reveal delay={0.1} className="p-6 md:p-8 rounded-lg border border-hairline bg-ink-50/40 space-y-4 self-start">
            <p className="eyebrow">Quick facts for screening</p>
            <dl className="space-y-3 text-[14.5px]">
              {SCREENING.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[120px_1fr] gap-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-bone-mute pt-0.5">{k}</dt>
                  <dd className="text-bone-dim">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required = false,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-mono text-[11px] uppercase tracking-[0.14em] text-bone-mute mb-2"
      >
        {label}
        {required && <span className="text-signal-amber ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={cn(
          "w-full px-3.5 py-2.5 bg-ink border border-hairline-strong rounded-md",
          "text-bone placeholder:text-bone-mute text-[15px]",
          "outline-none focus:border-signal-blue/50 transition-colors"
        )}
      />
    </div>
  );
}