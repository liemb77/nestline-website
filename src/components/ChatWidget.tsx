"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const COPY = {
  en: {
    launcherLabel: "Chat with NestLine",
    title: "NestLine Assistant",
    subtitle: "Ask about pricing, timelines, or how it works",
    placeholder: "Type your question…",
    greeting: "Hey! Ask me anything about NestLine's services, pricing, or how we work.",
    error: "Something went wrong — try again, or book a call directly.",
  },
  fr: {
    launcherLabel: "Clavarder avec NestLine",
    title: "Assistant NestLine",
    subtitle: "Pose-moi une question sur les prix, les délais, ou comment ça marche",
    placeholder: "Écris ta question…",
    greeting: "Salut! Pose-moi une question sur les services, les prix, ou comment on travaille.",
    error: "Une erreur est survenue — réessaie, ou réserve un appel directement.",
  },
};

export default function ChatWidget() {
  const { lang } = useLanguage();
  const copy = COPY[lang];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) throw new Error(data.error || "Chat request failed");

      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error("[ChatWidget] send failed:", err);
      setMessages([...nextMessages, { role: "assistant", content: copy.error }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(360px,calc(100vw-2rem))] h-[min(480px,calc(100vh-8rem))] rounded-2xl glass flex flex-col overflow-hidden"
            style={{ border: "1px solid rgba(0,232,135,0.2)" }}
          >
            <div className="px-5 py-4 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-sm font-bold text-white">{copy.title}</p>
              <p className="text-xs text-white/40 mt-0.5">{copy.subtitle}</p>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              <div className="max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed bg-white/5 text-white/70 self-start">
                {copy.greeting}
              </div>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "self-end text-black"
                      : "self-start bg-white/5 text-white/70"
                  }`}
                  style={m.role === "user" ? { background: "#00e887" } : undefined}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="self-start flex items-center gap-2 text-white/30 text-xs px-3.5 py-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                </div>
              )}
            </div>

            <div className="p-3 shrink-0 flex items-center gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={copy.placeholder}
                className="flex-1 bg-white/5 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:ring-1 focus:ring-[#00e887]/40"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 disabled:opacity-30 transition-opacity"
                style={{ background: "#00e887" }}
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={copy.launcherLabel}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        style={{ background: "#00e887" }}
      >
        {open ? <X className="w-6 h-6 text-black" /> : <MessageCircle className="w-6 h-6 text-black" />}
      </button>
    </div>
  );
}
