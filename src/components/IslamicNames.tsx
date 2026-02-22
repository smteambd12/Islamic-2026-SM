import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Baby, Star, Copy, Check, RefreshCw, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

const NAMES_DATA = [
  { nameEn: "Ayan", nameBn: "আয়ান", meaningEn: "Gift of God", meaningBn: "আল্লাহর দান", gender: "boy", origin: "Arabic" },
  { nameEn: "Arham", nameBn: "আরহাম", meaningEn: "Merciful", meaningBn: "দয়ালু", gender: "boy", origin: "Arabic" },
  { nameEn: "Aaira", nameBn: "আইরা", meaningEn: "Noble woman", meaningBn: "সম্ভ্রান্ত নারী", gender: "girl", origin: "Arabic" },
  { nameEn: "Anaya", nameBn: "আনায়া", meaningEn: "Care, Protection", meaningBn: "যত্ন, সুরক্ষা", gender: "girl", origin: "Arabic" },
  { nameEn: "Rayyan", nameBn: "রায়ান", meaningEn: "Gate of Paradise", meaningBn: "জান্নাতের দরজা", gender: "boy", origin: "Arabic" },
  { nameEn: "Safwan", nameBn: "সাফওয়ান", meaningEn: "Pure, Clear", meaningBn: "বিশুদ্ধ, স্বচ্ছ", gender: "boy", origin: "Arabic" },
  { nameEn: "Zoya", nameBn: "জোয়া", meaningEn: "Alive, Loving", meaningBn: "জীবন্ত, প্রেমময়", gender: "girl", origin: "Persian" },
  { nameEn: "Inaya", nameBn: "ইনায়া", meaningEn: "Help, Care", meaningBn: "সাহায্য, যত্ন", gender: "girl", origin: "Arabic" },
  { nameEn: "Zayyan", nameBn: "জায়ান", meaningEn: "Beautiful", meaningBn: "সুন্দর", gender: "boy", origin: "Arabic" },
  { nameEn: "Ishraq", nameBn: "ইশরাক", meaningEn: "Sunrise", meaningBn: "সূর্যোদয়", gender: "boy", origin: "Arabic" },
  { nameEn: "Rumaisa", nameBn: "রুমাইসা", meaningEn: "Bouquet of flowers", meaningBn: "ফুলের তোড়া", gender: "girl", origin: "Arabic" },
  { nameEn: "Sarah", nameBn: "সারাহ", meaningEn: "Pure, Happy", meaningBn: "বিশুদ্ধ, সুখী", gender: "girl", origin: "Hebrew/Arabic" },
  { nameEn: "Omar", nameBn: "ওমর", meaningEn: "Long-lived", meaningBn: "দীর্ঘজীবী", gender: "boy", origin: "Arabic" },
  { nameEn: "Ali", nameBn: "আলী", meaningEn: "High, Exalted", meaningBn: "উচ্চ, মহিমান্বিত", gender: "boy", origin: "Arabic" },
  { nameEn: "Fatima", nameBn: "ফাতিমা", meaningEn: "Captivating", meaningBn: "মনমুগ্ধকর", gender: "girl", origin: "Arabic" },
  { nameEn: "Ayesha", nameBn: "আয়েশা", meaningEn: "Alive, Well-living", meaningBn: "জীবন্ত, সচ্ছল", gender: "girl", origin: "Arabic" },
  { nameEn: "Yusuf", nameBn: "ইউসুফ", meaningEn: "God increases", meaningBn: "আল্লাহ বৃদ্ধি করেন", gender: "boy", origin: "Arabic" },
  { nameEn: "Ibrahim", nameBn: "ইব্রাহিম", meaningEn: "Father of many", meaningBn: "বহু সন্তানের পিতা", gender: "boy", origin: "Arabic" },
  { nameEn: "Mariam", nameBn: "মরিয়ম", meaningEn: "Beloved", meaningBn: "প্রিয়", gender: "girl", origin: "Arabic" },
  { nameEn: "Hana", nameBn: "হানা", meaningEn: "Happiness", meaningBn: "সুখ", gender: "girl", origin: "Arabic" },
  { nameEn: "Tahsin", nameBn: "তাহসিন", meaningEn: "Beautification", meaningBn: "সৌন্দর্যমন্ডিত করা", gender: "boy", origin: "Arabic" },
  { nameEn: "Nafisa", nameBn: "নাফিসা", meaningEn: "Precious", meaningBn: "মূল্যবান", gender: "girl", origin: "Arabic" },
  { nameEn: "Farhan", nameBn: "ফারহান", meaningEn: "Happy", meaningBn: "সুখী", gender: "boy", origin: "Arabic" },
  { nameEn: "Sadia", nameBn: "সাদিয়া", meaningEn: "Lucky", meaningBn: "ভাগ্যবতী", gender: "girl", origin: "Arabic" }
];

export default function IslamicNames() {
  const [filter, setFilter] = useState<'all' | 'boy' | 'girl'>('all');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [generatedName, setGeneratedName] = useState<typeof NAMES_DATA[0] | null>(null);

  const filteredNames = NAMES_DATA.filter(item => {
    const matchesFilter = filter === 'all' || item.gender === filter;
    const matchesSearch = item.nameEn.toLowerCase().includes(search.toLowerCase()) || 
                         item.nameBn.includes(search) ||
                         item.meaningEn.toLowerCase().includes(search.toLowerCase()) ||
                         item.meaningBn.includes(search);
    return matchesFilter && matchesSearch;
  });

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  const generateName = () => {
    const availableNames = filter === 'all' ? NAMES_DATA : NAMES_DATA.filter(n => n.gender === filter);
    const randomName = availableNames[Math.floor(Math.random() * availableNames.length)];
    setGeneratedName(randomName);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="bg-violet-600 text-white p-8 rounded-[2.5rem] relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-bengali mb-2 flex items-center gap-3">
            <Baby className="w-8 h-8" />
            ইসলামিক নাম
          </h1>
          <p className="text-violet-100 font-bengali">
            আপনার সোনামণির জন্য সুন্দর ও অর্থবহ ইসলামিক নাম খুঁজুন
          </p>
        </div>
      </div>

      {/* Generator Section */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative z-10 text-center space-y-6">
          <h2 className="text-2xl font-bold font-bengali flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            নাম জেনারেটর
          </h2>
          
          {generatedName ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
            >
              <div className="flex justify-center items-center gap-2 mb-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                  generatedName.gender === 'boy' ? "bg-blue-500/20 text-blue-100" : "bg-pink-500/20 text-pink-100"
                )}>
                  {generatedName.gender === 'boy' ? 'Boy' : 'Girl'}
                </span>
              </div>
              <h3 className="text-4xl font-bold mb-2">{generatedName.nameBn}</h3>
              <p className="text-xl font-medium opacity-90 mb-2">{generatedName.nameEn}</p>
              <p className="text-violet-200 font-bengali">{generatedName.meaningBn} • {generatedName.meaningEn}</p>
            </motion.div>
          ) : (
            <p className="text-violet-100 font-bengali">একটি সুন্দর নাম পেতে নিচের বাটনে ক্লিক করুন</p>
          )}

          <button
            onClick={generateName}
            className="px-8 py-3 bg-white text-violet-600 rounded-xl font-bold hover:bg-violet-50 transition-colors shadow-lg active:scale-95 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            নতুন নাম জেনারেট করুন
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
          <input
            type="text"
            placeholder="নাম বা অর্থ দিয়ে খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-violet-500/20 font-bengali"
          />
        </div>
        <div className="flex bg-white dark:bg-stone-900 p-1.5 rounded-2xl border border-stone-200 dark:border-stone-800">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold font-bengali transition-all",
              filter === 'all' ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" : "text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800"
            )}
          >
            সব
          </button>
          <button
            onClick={() => setFilter('boy')}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold font-bengali transition-all",
              filter === 'boy' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : "text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800"
            )}
          >
            ছেলে
          </button>
          <button
            onClick={() => setFilter('girl')}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold font-bengali transition-all",
              filter === 'girl' ? "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300" : "text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800"
            )}
          >
            মেয়ে
          </button>
        </div>
      </div>

      {/* Names Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNames.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-md transition-all group relative"
          >
            <div className="flex justify-between items-start mb-3">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                item.gender === 'boy' 
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                  : "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400"
              )}>
                {item.gender === 'boy' ? 'Boy' : 'Girl'}
              </span>
              <button 
                onClick={() => handleCopy(`${item.nameBn} (${item.nameEn})`)}
                className="text-stone-400 hover:text-violet-500 transition-colors"
              >
                {copied === `${item.nameBn} (${item.nameEn})` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="space-y-1 mb-4">
              <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100 font-bengali">{item.nameBn}</h3>
              <p className="text-lg font-medium text-stone-500 dark:text-stone-400">{item.nameEn}</p>
            </div>
            
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2">
              <p className="text-stone-600 dark:text-stone-300 font-bengali text-sm">
                <span className="font-bold text-stone-400">অর্থ:</span> {item.meaningBn}
              </p>
              <p className="text-stone-500 dark:text-stone-400 text-sm">
                <span className="font-bold text-stone-400">Meaning:</span> {item.meaningEn}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
