import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, User, Star, Quote, Copy, Check, Sparkles, RefreshCw, Search, Loader2 } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { cn } from '../lib/utils';

// Initial static data for speed and reliability
const INITIAL_SCHOLARS = [
  {
    name: "হযরত আব্দুল কাদির জিলানী (রহ.)",
    title: "বড় পীর",
    era: "১০৭৭ - ১১৬৬ খ্রি.",
    desc: "কাদেরিয়া তরিকার প্রতিষ্ঠাতা এবং ইসলামের অন্যতম শ্রেষ্ঠ সুফি সাধক। তিনি বাগদাদে জন্মগ্রহণ করেন এবং সারা জীবন ইসলাম প্রচারে ব্যয় করেন। তাঁর রচিত 'গুনিয়াতুত তালিবীন' ও 'ফাতহুল গায়ব' বিশ্ববিখ্যাত গ্রন্থ।",
    quotes: ["অহংকার এমন এক ব্যাধি যা মানুষের সমস্ত নেক আমল ধ্বংস করে দেয়।", "সত্যবাদী হও, কারণ সত্য মুক্তি দেয় আর মিথ্যা ধ্বংস করে।"]
  },
  {
    name: "ইমাম গাজ্জালী (রহ.)",
    title: "হুজ্জাতুল ইসলাম",
    era: "১০৫৮ - ১১১১ খ্রি.",
    desc: "বিখ্যাত দার্শনিক, ধর্মতত্ত্ববিদ ও সুফি। 'ইয়াহইয়া উলুমুদ্দিন' তাঁর অমর সৃষ্টি যা মুসলিম বিশ্বে বহুল পঠিত। তিনি দর্শন ও সুফিবাদের মধ্যে এক অপূর্ব সমন্বয় সাধন করেন।",
    quotes: ["যে ব্যক্তি নিজের নফসকে চিনতে পেরেছে, সে তার রবকে চিনতে পেরেছে।", "জ্ঞান ছাড়া আমল পাগল হওয়ার শামিল, আর আমল ছাড়া জ্ঞান অভিশাপ।"]
  },
  {
    name: "হযরত শাহজালাল (রহ.)",
    title: "সুলতানুল বাংলা",
    era: "১২৭১ - ১৩৪৬ খ্রি.",
    desc: "সিলেটের বিখ্যাত সুফি সাধক যিনি বাংলায় ইসলাম প্রচারে গুরুত্বপূর্ণ ভূমিকা রাখেন। ৩৬০ আউলিয়া নিয়ে তিনি সিলেটে আগমন করেন।",
    quotes: ["আল্লাহর সন্তুষ্টিই মুমিনের জীবনের একমাত্র লক্ষ্য হওয়া উচিত।", "মানুষের সেবা করাই হলো শ্রেষ্ঠ ইবাদত।"]
  },
  {
    name: "খান জাহান আলী (রহ.)",
    title: "উলুঘ খান",
    era: "১৩৬৯ - ১৪৫৯ খ্রি.",
    desc: "বাগেরহাটের ষাট গম্বুজ মসজিদের প্রতিষ্ঠাতা এবং বিখ্যাত সুফি সাধক। তিনি দক্ষিণ-পশ্চিমাঞ্চলে ইসলাম প্রচার ও জনকল্যাণমূলক কাজে জীবন উৎসর্গ করেন।",
    quotes: ["জনসেবা ইবাদতেরই একটি অংশ।", "ন্যায়বিচার প্রতিষ্ঠা করা শাসকের প্রধান দায়িত্ব।"]
  },
  {
    name: "মাওলানা জালালুদ্দিন রুমি (রহ.)",
    title: "মাওলানা",
    era: "১২০৭ - ১২৭৩ খ্রি.",
    desc: "বিশ্ববিখ্যাত সুফি কবি ও দার্শনিক। তাঁর 'মসনবী' গ্রন্থটি ফারসি ভাষার কুরআন হিসেবে খ্যাত। তিনি প্রেমের মাধ্যমে আল্লাহর সান্নিধ্য লাভের কথা বলেছেন।",
    quotes: ["তুমি সাগরে এক বিন্দু পানি নও, তুমি এক বিন্দু পানিতে গোটা সাগর।", "যেখানে ব্যথা, সেখানেই নিরাময়।"]
  },
  {
    name: "খাজা মঈনুদ্দিন চিশতী (রহ.)",
    title: "গরীবে নেওয়াজ",
    era: "১১৪১ - ১২৩৬ খ্রি.",
    desc: "চিশতিয়া তরিকার প্রবর্তক এবং ভারত উপমহাদেশের অন্যতম শ্রেষ্ঠ সুফি সাধক। আজমিরে তাঁর মাজার শরীফ অবস্থিত।",
    quotes: ["যে ব্যক্তি আল্লাহর ওপর ভরসা করে, আল্লাহই তার জন্য যথেষ্ট।", "দুঃখী মানুষের মুখে হাসি ফোটানোই হলো শ্রেষ্ঠ ইবাদত।"]
  },
  {
    name: "রাবেয়া বসরী (রহ.)",
    title: "মহীয়সী নারী",
    era: "৭১৭ - ৮০১ খ্রি.",
    desc: "বাসরার বিখ্যাত নারী সুফি সাধক। তিনি আল্লাহর প্রেমে নিজেকে সম্পূর্ণ বিলিয়ে দিয়েছিলেন। তাঁর ত্যাগ ও ইবাদত আজও অনুপ্রেরণার উৎস।",
    quotes: ["আমি জান্নাতের লোভে বা জাহান্নামের ভয়ে ইবাদত করি না, আমি ইবাদত করি কেবল আমার রবের সন্তুষ্টির জন্য।"]
  },
  {
    name: "বায়জিদ বোস্তামী (রহ.)",
    title: "সুলতানুল আরেফিন",
    era: "৮০৪ - ৮৭৪ খ্রি.",
    desc: "বিখ্যাত পারস্য সুফি সাধক। মায়ের প্রতি তাঁর ভক্তি ও শ্রদ্ধার কাহিনী সর্বজনবিদিত।",
    quotes: ["আমি আল্লাহকে খুঁজছিলাম, অবশেষে আমি নিজেকেই খুঁজে পেলাম।"]
  }
];

export default function Scholars() {
  const [scholars, setScholars] = useState(INITIAL_SCHOLARS);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const fetchNewScholar = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCFvLBiH168BcR_qaPebKU2HEaRX1VSTtE";
      if (!apiKey) {
        throw new Error("API Key not found");
      }

      const existingNames = scholars.map(s => s.name).join(", ");
      
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `Provide details (in Bengali) for a famous Islamic scholar, Sufi saint, or companion of the Prophet (SAW) who is NOT in this list: [${existingNames}]. 
      Include their name (with (রহ.) or (রা.)), title (in Bengali), era (e.g., birth-death year), a short description (2-3 sentences in Bengali), and 1-2 famous quotes (in Bengali).`;

      // Helper to try multiple models
      const generateWithFallback = async () => {
        const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro"];
        let lastError;

        for (const model of models) {
          try {
            const result = await ai.models.generateContent({
              model: model,
              contents: prompt,
              config: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    title: { type: Type.STRING },
                    era: { type: Type.STRING },
                    desc: { type: Type.STRING },
                    quotes: { 
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  }
                }
              }
            });
            return result;
          } catch (error) {
            console.warn(`Model ${model} failed:`, error);
            lastError = error;
          }
        }
        throw lastError;
      };

      const result = await generateWithFallback();
      const text = result.text;
      
      if (text) {
        const newScholar = JSON.parse(text);
        setScholars(prev => [newScholar, ...prev]);
      }
    } catch (error) {
      console.error("Error fetching scholar:", error);
      // Optional: Show a toast or alert to the user
    } finally {
      setLoading(false);
    }
  };

  const filteredScholars = scholars.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-24">
      {/* Hero Section */}
      <div className="bg-amber-600 text-white p-8 rounded-[2.5rem] relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-bengali mb-2 flex items-center gap-3">
            <User className="w-8 h-8" />
            পীর-মাশায়েখ ও মনিষী
          </h1>
          <p className="text-amber-100 font-bengali">
            ইসলামের মহান মনিষীদের জীবনী ও বাণী - চিরন্তন অনুপ্রেরণা
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
          <input
            type="text"
            placeholder="নাম বা জীবনী খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-bengali"
          />
        </div>
        <button
          onClick={fetchNewScholar}
          disabled={loading}
          className="px-6 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold font-bengali shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          নতুন মনিষী জানুন (AI)
        </button>
      </div>

      {/* Scholars Grid */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredScholars.map((scholar, idx) => (
            <motion.div
              key={scholar.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-stone-900 p-8 rounded-[2rem] shadow-sm border border-stone-100 dark:border-stone-800 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Book className="w-32 h-32 text-amber-500" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                      <Star className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100">
                        {scholar.name}
                      </h3>
                      <p className="text-amber-600 dark:text-amber-400 font-medium font-bengali mt-1">
                        {scholar.title} • {scholar.era}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleCopy(`${scholar.name}\n${scholar.desc}\n\nউক্তি:\n${scholar.quotes.join('\n')}`)}
                      className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-amber-600 transition-colors"
                      title="সম্পূর্ণ কপি করুন"
                    >
                      {copied === `${scholar.name}\n${scholar.desc}\n\nউক্তি:\n${scholar.quotes.join('\n')}` ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <p className="text-stone-600 dark:text-stone-300 font-bengali text-lg leading-relaxed mb-8">
                  {scholar.desc}
                </p>

                <div className="grid gap-4">
                  {scholar.quotes.map((quote, qIdx) => (
                    <div key={qIdx} className="bg-stone-50 dark:bg-stone-800/50 p-6 rounded-2xl border-l-4 border-amber-500 relative group/quote">
                      <Quote className="w-6 h-6 text-amber-400 mb-2 opacity-50" />
                      <p className="text-stone-700 dark:text-stone-300 font-bengali italic text-lg pr-8">
                        "{quote}"
                      </p>
                      <button 
                        onClick={() => handleCopy(quote)}
                        className="absolute top-4 right-4 opacity-0 group-hover/quote:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 hover:text-amber-600"
                      >
                        {copied === quote ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
