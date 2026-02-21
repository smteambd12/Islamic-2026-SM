import React, { useState, useEffect } from 'react';
import { BookOpen, Search, FileText, Book, Heart, Copy, Volume2, RefreshCw, Play, Pause } from 'lucide-react';
import { cn, toBengaliNumber } from '../lib/utils';
import QuranSearch from './QuranSearch';
import SurahDetail from './SurahDetail';
import axios from 'axios';
import { HADITH_COLLECTION, Hadith } from '../data/hadithData';
import { useAudio } from '../context/AudioContext';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface RandomVerse {
  number: number;
  text: string;
  translation: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
  numberInSurah: number;
  audio: string;
}

export default function QuranSection() {
  const [activeTab, setActiveTab] = useState<'surah' | 'search' | 'hadith'>('surah');
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [hadithBookmarks, setHadithBookmarks] = useState<string[]>([]);
  const [visibleHadiths, setVisibleHadiths] = useState<Hadith[]>([]);
  const [randomVerses, setRandomVerses] = useState<RandomVerse[]>([]);
  const [loadingVerses, setLoadingVerses] = useState(false);
  const { playTrack, currentTrack, isPlaying } = useAudio();

  useEffect(() => {
    fetchSurahs();
    loadHadithBookmarks();
    // Shuffle and load initial hadiths
    setVisibleHadiths([...HADITH_COLLECTION].sort(() => Math.random() - 0.5).slice(0, 10));
    fetchRandomVerses();
  }, []);

  const fetchRandomVerses = async () => {
    try {
      setLoadingVerses(true);
      // Fetch a random page (approx 1-604)
      const randomPage = Math.floor(Math.random() * 604) + 1;
      const response = await axios.get(`https://api.alquran.cloud/v1/page/${randomPage}/editions/quran-uthmani,bn.bengali`);
      
      const arabicData = response.data.data[0].ayahs;
      const bengaliData = response.data.data[1].ayahs;

      const merged = arabicData.map((ayah: any, idx: number) => ({
        number: ayah.number,
        text: ayah.text,
        translation: bengaliData[idx].text,
        surah: ayah.surah,
        numberInSurah: ayah.numberInSurah,
        audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3`
      }));

      setRandomVerses(merged);
    } catch (error) {
      console.error("Error fetching random verses:", error);
    } finally {
      setLoadingVerses(false);
    }
  };

  const loadMoreHadiths = () => {
    const currentLength = visibleHadiths.length;
    const more = [...HADITH_COLLECTION].sort(() => Math.random() - 0.5).slice(0, 5);
    setVisibleHadiths(prev => [...prev, ...more]);
  };

  const loadHadithBookmarks = () => {
    const saved = localStorage.getItem('hadith-bookmarks');
    if (saved) {
      const parsed = JSON.parse(saved);
      setHadithBookmarks(parsed.map((h: Hadith) => h.id));
    }
  };

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

  const toggleHadithBookmark = (hadith: Hadith) => {
    const saved = localStorage.getItem('hadith-bookmarks');
    let bookmarks: Hadith[] = saved ? JSON.parse(saved) : [];
    
    const exists = bookmarks.some(b => b.id === hadith.id);
    
    if (exists) {
      bookmarks = bookmarks.filter(b => b.id !== hadith.id);
      setHadithBookmarks(hadithBookmarks.filter(id => id !== hadith.id));
    } else {
      bookmarks.push(hadith);
      setHadithBookmarks([...hadithBookmarks, hadith.id]);
    }
    
    localStorage.setItem('hadith-bookmarks', JSON.stringify(bookmarks));
  };

  const speakHadith = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'bn-BD';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('দুঃখিত, আপনার ব্রাউজারে টেক্সট-টু-স্পিচ সমর্থিত নয়।');
    }
  };

  const handlePlayVerse = (verse: RandomVerse) => {
    playTrack({
      id: verse.number,
      title: `সূরা ${verse.surah.englishName} - আয়াত ${toBengaliNumber(verse.numberInSurah)}`,
      subtitle: verse.surah.name,
      src: verse.audio
    });
  };

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
          আয়াত
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
        {activeTab === 'search' && (
          <div className="space-y-6">
            <QuranSearch />
            
            <div className="border-t border-stone-100 dark:border-stone-800 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold font-bengali text-stone-800 dark:text-stone-100">নির্বাচিত আয়াত (অনলাইন)</h3>
                <button 
                  onClick={fetchRandomVerses}
                  className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-colors"
                  title="নতুন আয়াত লোড করুন"
                >
                  <RefreshCw className={cn("w-5 h-5", loadingVerses && "animate-spin")} />
                </button>
              </div>

              {loadingVerses ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {randomVerses.map((verse) => {
                    const isCurrent = currentTrack?.id === verse.number;
                    return (
                      <div key={verse.number} className="bg-white dark:bg-stone-900 p-6 rounded-xl shadow-sm border border-stone-100 dark:border-stone-800">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            সূরা {verse.surah.name} - আয়াত {toBengaliNumber(verse.numberInSurah)}
                          </span>
                          <button 
                            onClick={() => handlePlayVerse(verse)}
                            className={cn(
                              "p-2 rounded-full transition-colors",
                              isCurrent && isPlaying
                                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : "bg-stone-100 text-stone-600 hover:bg-emerald-50 dark:bg-stone-800 dark:text-stone-300"
                            )}
                          >
                            {isCurrent && isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                          </button>
                        </div>
                        <p className="text-2xl font-serif text-right leading-loose text-stone-800 dark:text-stone-100 mb-4" style={{ fontFamily: "'Amiri', serif" }}>
                          {verse.text}
                        </p>
                        <p className="text-stone-600 dark:text-stone-300 font-bengali">
                          {verse.translation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
        
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
            {visibleHadiths.map((hadith, idx) => {
              const isBookmarked = hadithBookmarks.includes(hadith.id);
              return (
                <div key={`${hadith.id}-${idx}`} className="bg-white dark:bg-stone-900 p-6 rounded-xl shadow-sm border border-stone-100 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors group">
                  <div className="mb-3 flex justify-between items-start">
                    <div className="flex gap-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-bold font-bengali">
                        {hadith.source}
                      </span>
                      {hadith.topic && (
                        <span className="inline-block px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-xs font-bold font-bengali">
                          {hadith.topic}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => speakHadith(hadith.text)}
                        className="p-2 text-stone-400 hover:text-emerald-600 transition-colors"
                        title="শুনুন"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => toggleHadithBookmark(hadith)}
                        className={cn(
                          "p-2 transition-colors",
                          isBookmarked ? "text-red-500" : "text-stone-400 hover:text-red-500"
                        )}
                        title="বুকমার্ক"
                      >
                        <Heart className={cn("w-4 h-4", isBookmarked && "fill-current")} />
                      </button>
                      <button className="p-2 text-stone-400 hover:text-emerald-600 transition-colors">
                        <Copy className="w-4 h-4" onClick={() => navigator.clipboard.writeText(hadith.text)} />
                      </button>
                    </div>
                  </div>
                  <p className="text-lg font-bengali text-stone-700 dark:text-stone-200 leading-relaxed">
                    "{hadith.text}"
                  </p>
                </div>
              );
            })}
            
            <div className="flex justify-center pt-4">
              <button 
                onClick={loadMoreHadiths}
                className="px-6 py-2 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-full font-bengali hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                আরও হাদিস দেখুন
              </button>
            </div>
            
            <div className="text-center py-4 text-stone-400 font-bengali text-sm">
              * হাদিসগুলো অটোমেটিক আপডেট হচ্ছে।
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
