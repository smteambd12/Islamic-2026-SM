import React, { useEffect, useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { QuranVerse } from '../services/api';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<QuranVerse[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const removeBookmark = (number: number) => {
    const updated = bookmarks.filter(b => b.number !== number);
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-500">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <h2 className="text-2xl font-bold font-bengali">আমার বুকমার্ক</h2>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800">
          <Heart className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <p className="text-stone-500 font-bengali text-lg">এখনো কোনো আয়াত সেভ করা হয়নি</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookmarks.map((verse) => (
            <div key={verse.number} className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800 group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">
                    সূরা {verse.surah.englishName} ({verse.surah.name})
                  </span>
                  <span className="text-xs text-stone-400">
                    আয়াত {verse.numberInSurah}
                  </span>
                </div>
                <button 
                  onClick={() => removeBookmark(verse.number)}
                  className="p-2 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* If text contains Arabic, show it right-aligned. The API response structure varies slightly for search vs daily. 
                    Search usually returns text in the requested language (Bengali). 
                    Daily returns Arabic + Translation separately. 
                    We need to handle both. */}
                
                {/* Heuristic: If text looks Arabic (Daily Verse structure usually has 'text' as Arabic) */}
                {/[\u0600-\u06FF]/.test(verse.text) ? (
                   <p className="text-2xl font-serif text-right leading-loose text-stone-800 dark:text-stone-100" style={{ fontFamily: "'Amiri', serif" }}>
                     {verse.text}
                   </p>
                ) : (
                   <p className="text-lg font-bengali text-stone-800 dark:text-stone-200 leading-relaxed">
                     {verse.text}
                   </p>
                )}

                {verse.translation && (
                  <p className="text-lg font-bengali text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-4">
                    {verse.translation}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
