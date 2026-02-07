import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

//!change the direct api key to env file
const ai = new GoogleGenAI({
  // apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  apiKey: "AIzaSyDXeqaTtU9BdqUA6OCnh1J84aFhDcFclqU"
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

const ChatBot = () => {
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
    <div className="min-h-screen  w-full flex flex-col bg-transparent text-theme-white">
      {/* Header */}
      <div className="text-center py-3 bg-secondary-color shadow-sm shadow-theme-white">
        <h1 className="text-4xl font-bold tracking-widest">SETU</h1>
        <p className="opacity-90 text-sm">
          Connecting You to the Right Help
        </p>
      </div>

      {/* Chat Box */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-6 md:px-[12%] py-3 flex flex-col gap-5 "
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
            className={`max-w-[75%] px-4 text-sm md:py-3 md:px-5 md:text-base py-1 rounded-2xl leading-relaxed
              ${
                msg.from === "user"
                  ? "self-end bg-secondary-color text-white-color rounded-br-md"
                  : "self-start bg-forest-green-600 text-white-color rounded-bl-md"
              }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="self-start bg-forest-green-600 p-4 rounded-2xl">
            <div className="w-5 h-5 border-2 border-secondary-color border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-4 px-6 md:px-[12%] py-3 border-t border-theme-white opacity-90">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your question here..."
          className="flex-1 px-4 py-3 rounded-lg bg-transparent border border-theme-white opacity-80 focus:outline-none transition-all  focus:shadow-sm shadow-theme-white"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-2 rounded-2xl font-bold bg-secondary-color text-white-color hover:opacity-90 hover:scale-105 transition-all active:scale-95"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot