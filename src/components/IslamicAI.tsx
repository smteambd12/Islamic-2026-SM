import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

const SYSTEM_INSTRUCTION = `
You are a helpful and knowledgeable Islamic AI Assistant for the "Islamic Companion" app.
Your goal is to help users with Islamic questions, Quran, Hadith, Prayer times, and specific information about this app.

Key Information about this App:
- Name: Islamic Companion (ইসলামিক কম্প্যানিয়ন)
- Features: Quran (Audio/Text), Hadith, Prayer Times, Ramadan Calendar, Tasbeeh, Islamic Quiz, Community Requests.
- Dewanbag Sharif: The app includes specific information and quizzes about Dewanbag Sharif.
- Current Imam of Dewanbag Sharif: Prof. Dr. Qudrate Khoda.
- Founder of Dewanbag Sharif: Syed Mahbub-e-Khoda Dewanbagi (R.A.).

Guidelines:
- Always answer in Bengali (unless asked otherwise).
- Be polite, respectful, and accurate.
- Use the Google Search tool to find the latest information if needed (e.g., current events, specific dates).
- If asked about the app's features, guide them to the relevant section.
- Provide references from Quran and Hadith where applicable.
`;

export default function IslamicAI() {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API key not found');
      }
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text;
      
      setMessages(prev => [...prev, { role: 'model', text: text || "দুঃখিত, আমি এখন উত্তর দিতে পারছি না।" }]);
    } catch (error: any) {
      console.error("AI Error:", error);
      let errorMessage = "দুঃখিত, একটি ত্রুটি হয়েছে।";
      
      if (error.message?.includes('API key')) {
        errorMessage = "দুঃখিত, এআই সার্ভিসটি কনফিগার করা হয়নি (API Key Missing)।";
      } else if (error.message?.includes('fetch')) {
        errorMessage = "ইন্টারনেট সংযোগ পরীক্ষা করুন।";
      }
      
      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-stone-100 dark:border-stone-800 bg-emerald-50 dark:bg-emerald-900/20 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-100">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold font-bengali text-stone-800 dark:text-stone-100">ইসলামিক এআই অ্যাসিস্ট্যান্ট</h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-bengali flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            গুগল জেমিনি দ্বারা চালিত
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-10 text-stone-400 font-bengali">
            <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>আসসালামু আলাইকুম! আমি আপনাকে কীভাবে সাহায্য করতে পারি?</p>
            <p className="text-xs mt-2">কুরআন, হাদিস, নামাজ বা অ্যাপ সম্পর্কে যেকোনো প্রশ্ন করুন।</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? "justify-end" : "justify-start")}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex-shrink-0 flex items-center justify-center text-emerald-600 dark:text-emerald-100 mt-1">
                <Bot className="w-5 h-5" />
              </div>
            )}
            
            <div className={cn(
              "max-w-[80%] p-3 rounded-2xl font-bengali text-sm leading-relaxed",
              msg.role === 'user' 
                ? "bg-emerald-600 text-white rounded-tr-none" 
                : "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-tl-none"
            )}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 bg-stone-200 dark:bg-stone-700 rounded-full flex-shrink-0 flex items-center justify-center text-stone-600 dark:text-stone-300 mt-1">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex-shrink-0 flex items-center justify-center text-emerald-600 dark:text-emerald-100 mt-1">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-stone-100 dark:bg-stone-800 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-stone-400" />
              <span className="text-xs text-stone-400 font-bengali">চিন্তা করছি...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-900">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="আপনার প্রশ্ন লিখুন..."
            className="flex-1 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bengali"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
