import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function IslamicAI() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'আসসালামু আলাইকুম। আমি আপনার ইসলামিক অ্যাসিস্ট্যান্ট। আপনার কোনো প্রশ্ন থাকলে করতে পারেন।' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";
      
      const systemInstruction = `You are a helpful and knowledgeable Islamic AI assistant for a Bengali-speaking audience. 
      Your name is "Islamic Companion AI".
      Answer questions based on the Quran and Sahih Hadith. 
      If a question is controversial, mention that there are different scholarly opinions but focus on the majority view or consensus.
      If you do not know the answer, humbly admit it and advise consulting a scholar.
      Keep answers concise, polite, and spiritually uplifting.
      Always reply in Bengali.`;

      const response = await ai.models.generateContent({
        model: model,
        contents: [
          { role: 'user', parts: [{ text: systemInstruction + "\n\nUser Question: " + userMessage }] }
        ]
      });

      const aiResponse = response.text;
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'দুঃখিত, বর্তমানে আমি উত্তর দিতে পারছি না। অনুগ্রহ করে পরে আবার চেষ্টা করুন।' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-stone-50 dark:bg-stone-900 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((msg, idx) => (
          <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              msg.role === 'user' ? "bg-emerald-100 text-emerald-600" : "bg-stone-200 text-stone-600"
            )}>
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div className={cn(
              "max-w-[80%] p-3 rounded-2xl text-sm font-bengali leading-relaxed",
              msg.role === 'user' 
                ? "bg-emerald-600 text-white rounded-tr-none" 
                : "bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-tl-none"
            )}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white dark:bg-stone-800 p-3 rounded-2xl rounded-tl-none border border-stone-200 dark:border-stone-700">
              <Loader2 className="w-5 h-5 animate-spin text-stone-400" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="আপনার প্রশ্ন লিখুন..."
            className="flex-1 px-4 py-2 rounded-full bg-stone-100 dark:bg-stone-800 border-none focus:ring-2 focus:ring-emerald-500/50 font-bengali text-stone-800 dark:text-stone-100"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
