import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, RefreshCcw, Copy, Check, MessageSquare, Trash2, Share2, Info, Code, Heart, BookOpen, Moon, Sun } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

const SUGGESTED_QUESTIONS = [
  { icon: <Code className="w-4 h-4" />, text: "এই অ্যাপটি কে তৈরি করেছেন?" },
  { icon: <Moon className="w-4 h-4" />, text: "আজকের দিনের বিশেষ আমল কী?" },
  { icon: <BookOpen className="w-4 h-4" />, text: "সূরা ইখলাসের ফজিলত বলুন" },
  { icon: <Heart className="w-4 h-4" />, text: "যাকাত আদায়ের নিয়ম কী?" },
];

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export default function IslamicAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "আসসালামু আলাইকুম! আমি **ইসলামিক কম্প্যানিয়ন এআই**। \n\nআমি আপনাকে ইসলাম, কুরআন, হাদিস এবং এই অ্যাপ সম্পর্কে যেকোনো তথ্য দিয়ে সাহায্য করতে পারি। \n\nআপনার মনে কোনো প্রশ্ন থাকলে নির্দ্বিধায় জিজ্ঞাসা করুন।",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [apiKeyError, setApiKeyError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', text: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      // Use environment variable or the hardcoded fallback (only for this specific user request)
      const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCFvLBiH168BcR_qaPebKU2HEaRX1VSTtE";
      
      if (!apiKey) {
        throw new Error("API Key not found. Please set GEMINI_API_KEY in your environment variables.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `
        You are a highly advanced, knowledgeable, and polite Islamic AI Assistant embedded in the 'Islamic Companion' web app.
        
        **CRITICAL INSTRUCTION:**
        Your developer and creator is **MD SOYEB**. You must ALWAYS mention him with great respect if asked about who created you, who developed this app, or who is the admin.
        
        **Your Persona:**
        - Name: Islamic Companion AI (ইসলামিক কম্প্যানিয়ন এআই)
        - Tone: Respectful, Spiritual, Calm, Helpful, and Authoritative on Islamic matters (referencing Quran/Hadith).
        - Language: Primary language is **Bengali**. Only speak English if explicitly asked.
        
        **Your Knowledge Base:**
        1. **Islam:** Quran, Hadith, Fiqh, Seerah, Daily Masala, Prayers, Fasting, Zakat, Hajj, etc.
        2. **This App ('Islamic Companion'):** 
           - Features: Prayer Times, Al-Quran, Hadith Collection, Zakat Calculator, Digital Tasbeeh, Islamic Names, Age Calculator, Scholar Biographies, Qadr Foundation.
           - Purpose: To serve the Muslim Ummah with digital tools.
        3. **Developer:** **MD SOYEB** (Full Stack Developer & Founder of this project).
        
        **Response Guidelines:**
        - Start with "আসসালামু আলাইকুম" (Peace be upon you) when appropriate.
        - Use Markdown for formatting (bold, lists, quotes).
        - Keep answers concise but comprehensive.
        - If asked about the developer, say: "এই অ্যাপটি এবং আমাকে ডিজাইন ও ডেভেলপ করেছেন **MD SOYEB**। তিনি একজন প্যাশনেট ফুল-স্ট্যাক ডেভেলপার এবং এই প্রজেক্টের প্রতিষ্ঠাতা।"
        - If asked about specific rulings (Fatwa), advise consulting a local scholar for complex matters, but provide general guidance based on authentic sources.
      `;

      const chat = ai.chats.create({
        model: "gemini-1.5-flash",
        config: {
          systemInstruction: systemInstruction,
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: text });
      const responseText = result.text;

      if (responseText) {
        setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
      }
    } catch (error: any) {
      console.error("AI Error:", error);
      let errorMessage = "দুঃখিত, একটি যান্ত্রিক ত্রুটি হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।";
      
      if (error.message) {
        errorMessage += `\n\nError Details: ${error.message}`;
      }
      
      if (error.message?.includes("API Key not found")) {
        errorMessage = "দুঃখিত, সিস্টেমের API Key সেট করা নেই। অনুগ্রহ করে ডেভেলপারকে জানান।";
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: errorMessage, 
        timestamp: new Date() 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'model',
        text: "আসসালামু আলাইকুম! আমি **ইসলামিক কম্প্যানিয়ন এআই**। \n\nআমি আপনাকে ইসলাম এবং এই অ্যাপ সম্পর্কে যেকোনো তথ্য দিয়ে সাহায্য করতে পারি।",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4 pb-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-[2rem] shadow-lg shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl animate-pulse" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-inner border border-white/10">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-bengali">ইসলামিক এআই</h1>
              <div className="flex items-center gap-2 text-emerald-100">
                <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                <p className="text-xs md:text-sm font-bengali opacity-90">অনলাইন</p>
              </div>
            </div>
          </div>
          <button 
            onClick={clearChat}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white/80 hover:text-white"
            title="চ্যাট মুছুন"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide relative z-10">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex gap-3 md:gap-4 max-w-[95%] md:max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 shadow-md border-2 border-white dark:border-stone-800",
                msg.role === 'user' ? "bg-stone-800 text-white" : "bg-gradient-to-br from-emerald-400 to-teal-500 text-white"
              )}>
                {msg.role === 'user' ? <User className="w-4 h-4 md:w-5 md:h-5" /> : <Sparkles className="w-4 h-4 md:w-5 md:h-5" />}
              </div>
              
              <div className={cn(
                "p-4 md:p-5 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed font-bengali relative group",
                msg.role === 'user' 
                  ? "bg-stone-800 text-white rounded-tr-none" 
                  : "bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 rounded-tl-none border border-stone-100 dark:border-stone-800"
              )}>
                <div className="prose dark:prose-invert max-w-none prose-sm prose-p:my-1 prose-headings:my-2 prose-a:text-emerald-600">
                  <ReactMarkdown 
                    components={{
                      strong: ({node, ...props}) => <span className="font-bold text-emerald-600 dark:text-emerald-400" {...props} />
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
                
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 dark:border-stone-800/50">
                  <p className="text-[10px] opacity-50">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {msg.role === 'model' && (
                    <button 
                      onClick={() => handleCopy(msg.text, idx)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 hover:text-emerald-500"
                      title="কপি করুন"
                    >
                      {copiedIndex === idx ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 mr-auto">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
            </div>
            <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl rounded-tl-none border border-stone-100 dark:border-stone-800 flex items-center gap-2 shadow-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="space-y-4 shrink-0 relative z-20">
        {/* Suggestions */}
        {messages.length < 3 && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.text)}
                className="flex items-center gap-2 whitespace-nowrap px-4 py-2 bg-white dark:bg-stone-900 border border-emerald-100 dark:border-emerald-900/30 rounded-full text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors shadow-sm"
              >
                {q.icon}
                {q.text}
              </button>
            ))}
          </div>
        )}

        <div className="bg-white dark:bg-stone-900 p-2 rounded-[2rem] shadow-xl border border-stone-100 dark:border-stone-800 flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="আপনার প্রশ্ন লিখুন..."
            className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-stone-800 dark:text-stone-100 placeholder-stone-400 font-bengali resize-none max-h-32 min-h-[50px] scrollbar-hide"
            rows={1}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-3 mb-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-300 dark:disabled:bg-stone-700 text-white rounded-full transition-all shadow-md active:scale-95 flex items-center justify-center"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
