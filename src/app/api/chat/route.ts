import { NextRequest, NextResponse } from "next/server";
import { retrieveRelevantKnowledge } from "@/lib/dakshKnowledge";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: 'messages' array is required." },
        { status: 400 }
      );
    }

    // Extract latest user inquiry for RAG retrieval
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    const userQuery = lastUserMessage?.content || "";
    const retrievedContext = retrieveRelevantKnowledge(userQuery);

    const systemPrompt = `You are Grok, Daksh Srivastava's personal AI Assistant embedded into his portfolio (https://daksh.is-a.dev).
You have complete, verified knowledge about Daksh's projects, experience, technical stack, achievements, and contact details.

### Verified Knowledge Base:
${retrievedContext}

### Response Guidelines:
1. Speak in a sharp, natural, direct, and helpful tone.
2. Answer the user's questions clearly and accurately using the verified knowledge above.
3. Be concise and impactful. Highlight real engineering metrics (e.g., Sonaura 2.0 Web Audio / Edge Store launch, Contradiction-MCP knowledge graph reconciliation, HydroWatch Doppler dBZ radar, 9.57 CGPA).
4. STRICT CONSTRAINT: NEVER use emojis anywhere in your responses (absolutely no 🌐, 💻, 💼, ✉️, 🚀, 🤖, or any other symbols/emojis). Write in pure, clean, professional text only.
5. Use clean Markdown: bold highlights, bullet points, and clean markdown links when referencing his GitHub (https://github.com/Daksh-create349), LinkedIn (https://linkedin.com/in/daksh-srivastava-2ba851344), or email (dakshshrivastav56@gmail.com).
6. Grounding: Never hallucinate or invent false projects/companies. If asked something completely outside Daksh's scope, answer politely and suggest asking about his engineering work or contacting him directly.`;

    const groqPayload = {
      model: "qwen/qwen3.8-27b",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.slice(-8), // Keep last 8 turns for conversational context
      ],
      temperature: 0.7,
      max_tokens: 800,
      stream: true,
    };

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groqPayload),
    });

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      console.error("Groq API error:", errText);
      return NextResponse.json(
        { error: `Groq upstream error (${groqResponse.status})` },
        { status: groqResponse.status }
      );
    }

    // Stream the SSE response directly to the client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (!groqResponse.body) {
          controller.close();
          return;
        }

        const reader = groqResponse.body.getReader();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;

              const dataStr = trimmed.slice(5).trim();
              if (dataStr === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }

              try {
                const parsed = JSON.parse(dataStr);
                const deltaContent = parsed.choices?.[0]?.delta?.content || "";
                if (deltaContent) {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ content: deltaContent })}\n\n`)
                  );
                }
              } catch {
                // Ignore parse errors on partial chunks
              }
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Chat route handler exception:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

