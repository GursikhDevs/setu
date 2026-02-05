import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey:`AIzaSyAoQziIl24N6dOvdCn2atX_JVimVX0F_Kc`,
});

const SYSTEM_PROMPT = `
You are SETU, the official support assistant for the SETU platform.
Tagline: "Connecting You to the Right Help"

Purpose:
- Help users with login, signup, profile, messaging, alumni, mentorship, and general platform usage.

Tone & Language:
- Hinglish + English (simple and friendly)
- Calm, supportive, human-like

Rules:
- Normal greetings allowed
- No coding or programming answers
- No technical backend explanations
- Short & clear replies (2–4 lines)
- If issue not solvable, guide to support team
`;

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
      });

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: response.text },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Kuch issue aa gaya 😕 Please thoda baad mein try karein.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1B887D] text-[#F9FAFB]">
      {/* Header */}
      <div className="text-center py-5 bg-[#EA9D5A]">
        <h1 className="text-4xl font-bold tracking-widest">SETU</h1>
        <p className="opacity-90 text-sm">
          Connecting You to the Right Help
        </p>
      </div>

      {/* Chat Box */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-6 md:px-[12%] py-8 flex flex-col gap-5 bg-[#1B887D]"
      >
        {messages.length === 0 && !loading && (
          <div className="text-center opacity-80 mt-10">
            👋 Hi! Main SETU hoon.
            <br />
            Aapki madad ke liye yahin hoon 😊
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-5 py-4 rounded-2xl leading-relaxed
              ${
                msg.from === "user"
                  ? "self-end bg-[#EA9D5A] text-white rounded-br-md"
                  : "self-start bg-[#1B887D] text-[#F9FAFB] rounded-bl-md"
              }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="self-start bg-[#1B887D] p-4 rounded-2xl">
            <div className="w-16 h-16 border-4 border-[#EA9D5A] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-4 px-6 md:px-[12%] py-5 border-t border-white/20 bg-[#1B887D]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your question here..."
          className="flex-1 px-4 py-3 rounded-lg bg-transparent border border-white/30 text-[#F9FAFB] focus:outline-none focus:border-secondary-color"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-3 rounded-lg font-bold bg-[#EA9D5A] text-white hover:opacity-90"
        >
          Send
        </button>
      </div>
    </div>
  );
}