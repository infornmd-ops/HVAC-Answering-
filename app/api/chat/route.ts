// Demo "AI receptionist" endpoint. A real deployment would swap the static
// COMPANY profile below for the subscriber's own business info (name, hours,
// service area, pricing) pulled from their account settings.
const COMPANY = {
  name: "Sample HVAC Co.",
  hours: "Mon–Sat 7am–7pm, with 24/7 emergency dispatch",
  services: "AC repair & install, furnace repair, heat pumps, duct cleaning, and emergency no-heat/no-cool calls",
  serviceArea: "the greater metro area",
  emergencyFee: "$89 dispatch fee for after-hours emergency calls, waived if you book the repair",
};

const SYSTEM_PROMPT = `You are Ava, the friendly AI answering service for ${COMPANY.name}, an HVAC company.
Business hours: ${COMPANY.hours}. Services offered: ${COMPANY.services}. Service area: ${COMPANY.serviceArea}. Emergency dispatch fee: ${COMPANY.emergencyFee}.

Your job on every call/chat:
1. Greet the caller warmly and find out what they need (repair, maintenance, install quote, or emergency).
2. If it sounds like a safety emergency (gas smell, smoke, carbon monoxide alarm), tell them to call 911 or their gas utility immediately, then still offer to dispatch a technician.
3. Otherwise, gather: name, phone number, service address, and a short description of the issue.
4. Offer the next available appointment window (invent a reasonable one, e.g. "tomorrow between 1–4pm") and confirm it with the caller.
5. Keep responses short and conversational, like a real front-desk person on the phone — 2-4 sentences at a time, not a wall of text.
6. Never invent a price beyond what's given above; for anything else say a technician will provide an exact quote on site.

Stay in character as Ava at all times. Respond only with what Ava would say next, no stage directions, no markdown.`;

export async function POST(request: Request) {
  const { messages } = await request.json();

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: Array.isArray(messages) ? messages : [],
    }),
  });

  if (!resp.ok) {
    const detail = await resp.text();
    return Response.json({ error: "Ava is unavailable right now.", detail }, { status: 502 });
  }

  const data = await resp.json();
  const reply = data.content?.map((b: { text?: string }) => b.text || "").join("").trim();
  return Response.json({ reply });
}
