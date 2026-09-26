"use client";
import { useEffect, useRef, useState } from "react";

const TRADES = ["HVAC", "Plumbing", "Electrical", "Garage Door", "Roofing", "Pest Control"];

const FEATURES = [
  {
    icon: "📞",
    title: "Answers Every Call, 24/7",
    desc: "No more voicemail. Ava picks up nights, weekends, and holidays so every emergency call gets a real response.",
  },
  {
    icon: "🗓️",
    title: "Books the Job on the Spot",
    desc: "Collects the caller's name, address, and issue, then offers your next open appointment window — no back-and-forth.",
  },
  {
    icon: "💬",
    title: "Texts You the Summary",
    desc: "Every call is summarized and sent straight to your phone: who called, what they need, and when you're booked.",
  },
  {
    icon: "🚨",
    title: "Triages Real Emergencies",
    desc: "Gas smell or carbon monoxide alarm? Ava tells the caller to reach 911 or the utility first, then still gets the job queued.",
  },
  {
    icon: "🔧",
    title: "Works Across Trades",
    desc: `Built for HVAC and easy to configure for ${TRADES.slice(1).join(", ")}, and more — one answering service for every crew.`,
  },
  {
    icon: "💰",
    title: "Priced for Small Shops",
    desc: "Flat monthly pricing with no per-minute overages, so a two-truck outfit pays the same predictable rate as a growing one.",
  },
];

const PLANS = [
  {
    name: "Solo",
    price: "$49",
    period: "/mo",
    desc: "One truck, one phone line",
    features: ["Unlimited AI-answered calls", "Same-day text summaries", "1 business phone number"],
  },
  {
    name: "Growing Crew",
    price: "$99",
    period: "/mo",
    highlight: true,
    desc: "Most popular for 2–10 techs",
    features: ["Everything in Solo", "Emergency triage & dispatch rules", "Calendar sync for booking", "Up to 3 phone numbers"],
  },
  {
    name: "Multi-Location",
    price: "$199",
    period: "/mo",
    desc: "Multiple shops or franchises",
    features: ["Everything in Growing Crew", "Per-location routing", "Priority support", "Unlimited phone numbers"],
  },
];

type ChatMsg = { role: "user" | "assistant"; content: string };

const GREETING: ChatMsg = {
  role: "assistant",
  content: "Thanks for calling Sample HVAC Co., this is Ava! How can I help you today?",
};

function ChatDemo() {
  const [messages, setMessages] = useState<ChatMsg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text } as ChatMsg];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await resp.json();
      if (!resp.ok || !data.reply) throw new Error(data.error || "No reply");
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Ava couldn't respond just now — this demo needs an ANTHROPIC_API_KEY configured on the server.");
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
      <div className="flex items-center gap-3 bg-slate-900 px-5 py-4 text-white">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 font-bold">A</div>
        <div>
          <div className="text-sm font-bold">Ava · AI Answering Service</div>
          <div className="text-xs text-slate-300">Sample HVAC Co. · live demo</div>
        </div>
      </div>
      <div ref={scrollRef} className="flex h-80 flex-col gap-3 overflow-y-auto bg-slate-50 p-4">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
            m.role === "assistant"
              ? "self-start bg-white text-slate-800 shadow-sm"
              : "self-end bg-orange-500 text-white"
          }`}>
            {m.content}
          </div>
        ))}
        {loading && <div className="self-start rounded-2xl bg-white px-4 py-2 text-sm text-slate-400 shadow-sm">Ava is typing…</div>}
        {error && <div className="self-center rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</div>}
      </div>
      <div className="flex gap-2 border-t border-slate-200 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type what you'd say on the phone…"
          className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-orange-400"
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-white disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default function AnsweringServiceApp() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="text-lg font-black">
          TradeLine<span className="text-orange-500"> AI</span>
        </div>
        <div className="hidden gap-8 text-sm font-semibold text-slate-300 sm:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#demo" className="hover:text-white">Live Demo</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
        </div>
        <a href="#demo" className="rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-white">Try the Demo →</a>
      </nav>

      <section className="mx-auto max-w-4xl px-6 pb-16 pt-10 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-xs font-bold text-orange-400">
          ★ Built for HVAC, Plumbing, Electrical & More
        </div>
        <h1 className="text-4xl font-black leading-tight sm:text-6xl">
          Never Miss Another<br />
          <span className="text-orange-500">Service Call.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
          TradeLine AI answers your business phone 24/7, books the job, and texts you a summary —
          so a two-truck shop can sound (and perform) like a call center.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="#demo" className="rounded-xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/30">
            See It Answer a Call →
          </a>
          <a href="#pricing" className="rounded-xl border border-slate-600 px-8 py-4 text-base font-bold text-white">
            View Pricing
          </a>
        </div>
        <p className="mt-4 text-xs text-slate-500">No contract · Cancel anytime · Set up in one afternoon</p>
      </section>

      <section id="features" className="border-t border-slate-800 bg-slate-900 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-black sm:text-4xl">Built to Run Your Front Desk</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-400">
            Every plan includes the same core answering service — priced so it pays for itself after one recovered job.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <div className="mb-3 text-3xl">{f.icon}</div>
                <div className="mb-2 text-base font-bold">{f.title}</div>
                <div className="text-sm leading-relaxed text-slate-400">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-black sm:text-4xl">Talk to Ava Right Now</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            This is the same assistant your customers would call — try a real HVAC question below.
          </p>
          <div className="mt-10">
            <ChatDemo />
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-slate-800 bg-slate-900 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-black sm:text-4xl">One Flat Price. No Per-Call Fees.</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-400">
            Built for small trade businesses first — every tier is priced to make sense for a shop, not an enterprise call center.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-8 ${
                  p.highlight ? "border-orange-500 bg-slate-950 shadow-xl shadow-orange-500/10" : "border-slate-800 bg-slate-950"
                }`}
              >
                {p.highlight && (
                  <div className="mb-3 inline-block rounded-full bg-orange-500 px-3 py-1 text-[10px] font-black tracking-wide">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-lg font-bold">{p.name}</div>
                <div className="mt-2 text-4xl font-black text-orange-500">
                  {p.price}
                  <span className="text-base text-slate-500">{p.period}</span>
                </div>
                <div className="mt-1 mb-6 text-sm text-slate-400">{p.desc}</div>
                <ul className="space-y-2 text-sm text-slate-300">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-orange-500">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white">
                  Start with {p.name} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-10 text-center text-sm text-slate-500">
        TradeLine AI · An answering service for the trades — HVAC, plumbing, electrical, and beyond.
      </footer>
    </div>
  );
}
