
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText, type CoreMessage } from "ai";
import { SYSTEM_PROMPT } from "@/lib/knowledge-base";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

// Run on the Edge — faster cold starts, lower latency for streaming
export const runtime = "edge";

// Don't cache responses — every chat is unique
export const dynamic = "force-dynamic";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

type ChatRequestBody = {
  messages: CoreMessage[];
};

export async function POST(req: Request) {
  // ─── Step 0: Load API key at REQUEST time (not module-load time) ──
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    console.error("[/api/chat] ❌ GEMINI_API_KEY missing or empty");
    return new Response(
      JSON.stringify({
        error: "config_error",
        message:
          "The chat isn't configured. Please email karthikreddytanigundala@gmail.com directly.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  console.log(
    `[/api/chat] ✅ API key loaded (length: ${apiKey.length}, starts with: ${apiKey.slice(0, 6)}...)`
  );

  // Initialise Google AI with explicit API key
  const google = createGoogleGenerativeAI({ apiKey });

  // ─── Step 1: Rate limit check ─────────────────────────────────────
  const ip = getClientIp(req);
  const rateLimit = await checkRateLimit(ip);

  if (!rateLimit.success) {
    const resetIn = Math.ceil((rateLimit.reset - Date.now()) / 1000 / 60);
    return new Response(
      JSON.stringify({
        error: "rate_limited",
        message: `Looks like you've explored a lot — drop me an email at karthikreddytanigundala@gmail.com and let's chat directly. Limit resets in ~${resetIn} minutes.`,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(rateLimit.reset),
        },
      }
    );
  }

  // ─── Step 2: Parse & validate the request ────────────────────────
  let body: ChatRequestBody;
  try {
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return new Response(
      JSON.stringify({ error: "invalid_json", message: "Bad request format." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({
        error: "invalid_messages",
        message: "No messages provided.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (messages.length > MAX_MESSAGES) {
    return new Response(
      JSON.stringify({
        error: "too_many_messages",
        message: "Conversation too long. Refresh to start fresh.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Sanity-check each message
  for (const msg of messages) {
    if (typeof msg.content !== "string" && !Array.isArray(msg.content)) {
      return new Response(
        JSON.stringify({
          error: "invalid_message_content",
          message: "Message content malformed.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (
      typeof msg.content === "string" &&
      msg.content.length > MAX_MESSAGE_LENGTH
    ) {
      return new Response(
        JSON.stringify({
          error: "message_too_long",
          message: `Keep messages under ${MAX_MESSAGE_LENGTH} characters.`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  console.log(`[/api/chat] 📨 Processing ${messages.length} message(s)`);

  // ─── Step 3: Stream from Gemini ──────────────────────────────────
  try {
    // Only send the last ~8 turns to Gemini — the KB carries all context anyway.
    const trimmedMessages = messages.slice(-8);

    const result = streamText({
      model: google("gemini-flash-latest"),
      system: SYSTEM_PROMPT,
      messages: trimmedMessages,
      temperature: 0.4, // low temp = consistent, factual, on-message
      maxTokens: 300, // 2-4 sentence answers rarely exceed 200 tokens
      maxRetries: 1, // fail fast instead of silently retrying
      providerOptions: {
        google: {
          // Disable Gemini 2.5 Flash's "thinking" mode — saves 3-5s per request.
          // The KB has all facts pre-baked; no reasoning required.
          thinkingConfig: { thinkingBudget: 0, includeThoughts: false },
        },
      },
    });

    console.log("[/api/chat] 🚀 Streaming response...");

    return result.toDataStreamResponse({
      headers: {
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
      getErrorMessage: (error) => {
        console.error("[/api/chat] ❌ Stream error during response:", error);
        if (error == null) return "Unknown error";
        if (typeof error === "string") return error;
        if (error instanceof Error) {
          console.error("[/api/chat] ❌ Stack:", error.stack);
          return error.message;
        }
        return JSON.stringify(error);
      },
    });
  } catch (error) {
    console.error("[/api/chat] ❌ Gemini error:", error);
    return new Response(
      JSON.stringify({
        error: "ai_error",
        message:
          "The chat had a hiccup. Try again, or email karthikreddytanigundala@gmail.com directly.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}