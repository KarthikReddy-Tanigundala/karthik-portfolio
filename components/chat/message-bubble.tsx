"use client";

import type { Message } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex animate-fade-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[88%] px-3.5 py-2.5 rounded-md text-[15px] leading-relaxed",
          isUser
            ? "bg-signal-blue/15 border border-signal-blue/25 text-bone"
            : "bg-ink-100 border border-hairline text-bone"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-pretty">{message.content}</p>
        ) : (
          <div className="prose-chat text-pretty">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="text-bone font-semibold">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="text-bone-dim italic">{children}</em>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-signal-blue link-underline"
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1 my-2 ml-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-1 my-2 ml-1">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-bone-dim">{children}</li>
                ),
                code: ({ children }) => (
                  <code className="px-1.5 py-0.5 rounded bg-ink-200 font-mono text-[13px] text-signal-amber">
                    {children}
                  </code>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}