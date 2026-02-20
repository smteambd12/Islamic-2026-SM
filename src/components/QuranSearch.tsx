import React, { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import { searchQuran, QuranVerse } from '../services/api';
import { cn } from '../lib/utils';
import AudioPlayer from './AudioPlayer';

export default function QuranSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await searchQuran(query, 'bn');
      setResults(data.matches || []);
      setHasSearched(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSave = (verse: any) => {
    const saved = localStorage.getItem('bookmarks');
    let bookmarks: any[] = saved ? JSON.parse(saved) : [];
    
    const exists = bookmarks.some(b => b.number === verse.number);
    
    if (exists) {
      bookmarks = bookmarks.filter(b => b.number !== verse.number);
    } else {
      bookmarks.push(verse);
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // Force re-render or update local state if needed (simple implementation here)
    // In a real app, use a context or store
    setResults([...results]); 
  };

  const isSaved = (verseNumber: number) => {
    const saved = localStorage.getItem('bookmarks');
    if (!saved) return false;
    const bookmarks = JSON.parse(saved);
    return bookmarks.some((b: any) => b.number === verseNumber);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
        <h2 className="text-2xl font-bold font-bengali mb-6">কুরআন সার্চ</h2>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="সূরা বা আয়াত খুঁজুন (যেমন: আল্লাহ, রহমত)..."
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-stone-50 dark:bg-stone-800 border-none focus:ring-2 focus:ring-emerald-500 font-bengali text-lg"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bengali disabled:opacity-50 transition-colors"
          >
            {loading ? 'খোঁজা হচ্ছে...' : 'খুঁজুন'}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {hasSearched && results.length === 0 && !loading && (
          <div className="text-center py-12 text-stone-500 font-bengali">
            কোন ফলাফল পাওয়া যায়নি
          </div>
        )}

        {results.map((verse) => (
          <div key={verse.number} className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400">
                  সূরা {verse.surah.englishName} : আয়াত {verse.numberInSurah}
                </span>
                <AudioPlayer verseNumber={verse.number} />
              </div>
              <button 
                onClick={() => toggleSave(verse)}
                className={cn("p-2 rounded-full transition-colors", isSaved(verse.number) ? "text-red-500 bg-red-50 dark:bg-red-900/20" : "text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800")}
              >
                <Heart className={cn("w-5 h-5", isSaved(verse.number) && "fill-current")} />
              </button>
            </div>
            <p className="text-lg font-bengali text-stone-800 dark:text-stone-200 leading-relaxed">
              {verse.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
