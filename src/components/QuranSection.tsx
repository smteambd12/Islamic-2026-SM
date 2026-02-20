import React, { useState, useEffect } from 'react';
import { BookOpen, Search, FileText, Book, Heart, Copy } from 'lucide-react';
import { cn, toBengaliNumber } from '../lib/utils';
import QuranSearch from './QuranSearch';
import SurahDetail from './SurahDetail';
import axios from 'axios';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export default function QuranSection() {
  const [activeTab, setActiveTab] = useState<'surah' | 'search' | 'hadith'>('surah');
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);

  useEffect(() => {
    fetchSurahs();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      const filtered = surahs.filter(s => 
        s.englishName.toLowerCase().includes(lower) || 
        s.name.includes(searchQuery) ||
        s.number.toString().includes(searchQuery)
      );
      setFilteredSurahs(filtered);
    } else {
      setFilteredSurahs(surahs);
    }
  }, [searchQuery, surahs]);

  const fetchSurahs = async () => {
    try {
      const response = await axios.get('https://api.alquran.cloud/v1/surah');
      setSurahs(response.data.data);
      setFilteredSurahs(response.data.data);
    } catch (error) {
      console.error("Error fetching surahs:", error);
    } finally {
      setLoading(false);
    }
  };

  const hadiths = [
    { source: 'সহীহ বুখারী', text: 'তোমার মধ্যে সর্বোত্তম সেই ব্যক্তি যে কুরআন শেখে এবং অন্যকে শেখায়।' },
    { source: 'সহীহ মুসলিম', text: 'যে ব্যক্তি আল্লাহর সন্তুষ্টির জন্য জ্ঞান অর্জন করার পথে চলে, আল্লাহ তার জন্য জান্নাতের পথ সহজ করে দেন।' },
    { source: 'তিরমিযী', text: 'মুমিনদের মধ্যে ঈমানে পরিপূর্ণ সেই ব্যক্তি যার চরিত্র সবচেয়ে সুন্দর।' },
    { source: 'আবু দাউদ', text: 'যে ব্যক্তি মানুষের প্রতি দয়া করে না, আল্লাহ তার প্রতি দয়া করেন না।' },
    { source: 'ইবনে মাজাহ', text: 'জ্ঞান অর্জন করা প্রত্যেক মুসলিমের জন্য ফরজ।' },
  ];

  if (selectedSurah) {
    return <SurahDetail surahNumber={selectedSurah} onBack={() => setSelectedSurah(null)} />;
  }

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100">কুরআন ও হাদিস</h2>

      {/* Tabs */}
      <div className="flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
        <button
          onClick={() => setActiveTab('surah')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all font-bengali",
            activeTab === 'surah' ? "bg-white dark:bg-stone-700 shadow-sm text-emerald-600 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"
          )}
        >
          <Book className="w-4 h-4" />
          সূরা
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all font-bengali",
            activeTab === 'search' ? "bg-white dark:bg-stone-700 shadow-sm text-emerald-600 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"
          )}
        >
          <Search className="w-4 h-4" />
          আয়াত সার্চ
        </button>
        <button
          onClick={() => setActiveTab('hadith')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all font-bengali",
            activeTab === 'hadith' ? "bg-white dark:bg-stone-700 shadow-sm text-emerald-600 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"
          )}
        >
          <FileText className="w-4 h-4" />
          হাদিস
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'search' && <QuranSearch />}
        
        {activeTab === 'surah' && (
          <div className="space-y-4">
            {/* Surah Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="সূরা খুঁজুন (নাম বা নম্বর)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-bengali"
              />
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredSurahs.map((surah) => (
                  <div 
                    key={surah.number} 
                    onClick={() => setSelectedSurah(surah.number)}
                    className="bg-white dark:bg-stone-900 p-4 rounded-xl shadow-sm border border-stone-100 dark:border-stone-800 flex items-center justify-between hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {toBengaliNumber(surah.number)}
                      </div>
                      <div>
                        <h3 className="font-bold font-bengali text-stone-800 dark:text-stone-100">{surah.name}</h3>
                        <p className="text-xs text-stone-500 dark:text-stone-400">{surah.englishName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded text-stone-600 dark:text-stone-400">
                        {toBengaliNumber(surah.numberOfAyahs)} আয়াত
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'hadith' && (
          <div className="space-y-4">
            {hadiths.map((hadith, idx) => (
              <div key={idx} className="bg-white dark:bg-stone-900 p-6 rounded-xl shadow-sm border border-stone-100 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
                <div className="mb-3 flex justify-between items-start">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-bold font-bengali">
                    {hadith.source}
                  </span>
                  <button className="text-stone-400 hover:text-emerald-600 transition-colors">
                    <Copy className="w-4 h-4" onClick={() => navigator.clipboard.writeText(hadith.text)} />
                  </button>
                </div>
                <p className="text-lg font-bengali text-stone-700 dark:text-stone-200 leading-relaxed">
                  "{hadith.text}"
                </p>
              </div>
            ))}
            <div className="text-center py-4 text-stone-400 font-bengali text-sm">
              * আরও হাদিস শীঘ্রই যুক্ত করা হবে।
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
