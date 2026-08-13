"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const NUDGE_DELAY_MS = 7000;
const NUDGE_AUTO_HIDE_MS = 16000;
const NUDGE_SEEN_KEY = "nestline_chat_nudge_seen";

const COPY = {
  en: {
    launcherLabel: "Chat with NestLine",
    title: "NestLine Assistant",
    subtitle: "Ask about pricing, timelines, or how it works",
    placeholder: "Type your question…",
    greeting: "Hey! What's slowing you down in your business right now? Tell me a bit about it and I can tell you if we're a fit.",
    nudge: "Not sure if we're a fit? Ask me anything — takes 30 seconds.",
    nudgeDismissLabel: "Dismiss",
    error: "Something went wrong — try again, or book a call directly.",
    rateLimited: "You're sending messages a bit fast — give it a minute and try again.",
  },
  fr: {
    launcherLabel: "Clavarder avec NestLine",
    title: "Assistant NestLine",
    subtitle: "Pose-moi une question sur les prix, les délais, ou comment ça marche",
    placeholder: "Écris ta question…",
    greeting: "Salut! Qu'est-ce qui te ralentit le plus dans ton entreprise en ce moment? Raconte-moi un peu, je peux te dire si on est un bon fit.",
    nudge: "Pas sûr qu'on soit un bon fit? Pose-moi une question — ça prend 30 secondes.",
    nudgeDismissLabel: "Fermer",
    error: "Une erreur est survenue — réessaie, ou réserve un appel directement.",
    rateLimited: "Tu envoies des messages un peu vite — attends une minute et réessaie.",
  },
};

export default function ChatWidget() {
  const { lang } = useLanguage();
  const copy = COPY[lang];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (sessionStorage.getItem(NUDGE_SEEN_KEY)) return;

    const showTimer = setTimeout(() => {
      setShowNudge(true);
      sessionStorage.setItem(NUDGE_SEEN_KEY, "1");
    }, NUDGE_DELAY_MS);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showNudge) return;
    const hideTimer = setTimeout(() => setShowNudge(false), NUDGE_AUTO_HIDE_MS);
    return () => clearTimeout(hideTimer);
  }, [showNudge]);

  function openFromNudge() {
    setShowNudge(false);
    setOpen(true);
  }

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

      if (res.status === 429) {
        setMessages([...nextMessages, { role: "assistant", content: copy.rateLimited }]);
        return;
      }
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
            style={{ border: "1px solid rgba(46,230,166,0.2)" }}
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
                  style={m.role === "user" ? { background: "#2ee6a6" } : undefined}
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
                className="flex-1 bg-white/5 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:ring-1 focus:ring-[#2ee6a6]/40"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 disabled:opacity-30 transition-opacity"
                style={{ background: "#2ee6a6" }}
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNudge && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(280px,calc(100vw-2rem))] rounded-2xl glass px-4 py-3 flex items-start gap-2.5 cursor-pointer"
            style={{ border: "1px solid rgba(46,230,166,0.2)" }}
            onClick={openFromNudge}
          >
            <p className="flex-1 text-sm leading-relaxed text-white/80">{copy.nudge}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNudge(false);
              }}
              aria-label={copy.nudgeDismissLabel}
              className="shrink-0 text-white/30 hover:text-white/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          setShowNudge(false);
          setOpen((o) => !o);
        }}
        aria-label={copy.launcherLabel}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        style={{ background: "#2ee6a6" }}
      >
        {open ? <X className="w-6 h-6 text-black" /> : <MessageCircle className="w-6 h-6 text-black" />}
      </button>
    </div>
  );
}
