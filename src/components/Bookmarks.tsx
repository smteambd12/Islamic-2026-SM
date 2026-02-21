import React, { useEffect, useState } from 'react';
import { Heart, Trash2, Play, Pause, Volume2, FileText } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { cn } from '../lib/utils';

interface BookmarkItem {
  number: number;
  text: string;
  translation: string;
  numberInSurah: number;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
}

interface HadithBookmark {
  id: string;
  source: string;
  text: string;
}

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [hadithBookmarks, setHadithBookmarks] = useState<HadithBookmark[]>([]);
  const { playTrack, currentTrack, isPlaying } = useAudio();
  const [activeTab, setActiveTab] = useState<'quran' | 'hadith'>('quran');

  useEffect(() => {
    const saved = localStorage.getItem('bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
    const savedHadith = localStorage.getItem('hadith-bookmarks');
    if (savedHadith) {
      setHadithBookmarks(JSON.parse(savedHadith));
    }
  }, []);

  const removeBookmark = (number: number) => {
    const updated = bookmarks.filter(b => b.number !== number);
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  const removeHadithBookmark = (id: string) => {
    const updated = hadithBookmarks.filter(h => h.id !== id);
    setHadithBookmarks(updated);
    localStorage.setItem('hadith-bookmarks', JSON.stringify(updated));
  };

  const handlePlay = (verse: BookmarkItem) => {
    playTrack({
      id: verse.number,
      title: `সূরা ${verse.surah.englishName} - আয়াত ${verse.numberInSurah}`,
      subtitle: verse.surah.name,
      src: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verse.number}.mp3`
    });
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-500">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h2 className="text-2xl font-bold font-bengali">আমার বুকমার্ক</h2>
        </div>
        
        <div className="flex bg-stone-100 dark:bg-stone-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('quran')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all font-bengali",
              activeTab === 'quran' ? "bg-white dark:bg-stone-700 shadow-sm text-emerald-600 dark:text-emerald-400" : "text-stone-500"
            )}
          >
            কুরআন
          </button>
          <button
            onClick={() => setActiveTab('hadith')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all font-bengali",
              activeTab === 'hadith' ? "bg-white dark:bg-stone-700 shadow-sm text-emerald-600 dark:text-emerald-400" : "text-stone-500"
            )}
          >
            হাদিস
          </button>
        </div>
      </div>

      {activeTab === 'quran' && (
        bookmarks.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800">
            <Heart className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 font-bengali text-lg">এখনো কোনো আয়াত সেভ করা হয়নি</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookmarks.map((verse) => {
              const isCurrent = currentTrack?.id === verse.number;
              
              return (
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
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handlePlay(verse)}
                        className={cn(
                          "p-2 rounded-full transition-colors",
                          isCurrent && isPlaying
                            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-stone-100 text-stone-600 hover:bg-emerald-50 dark:bg-stone-800 dark:text-stone-300"
                        )}
                      >
                        {isCurrent && isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                      <button 
                        onClick={() => removeBookmark(verse.number)}
                        className="p-2 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Arabic Text */}
                    <p className="text-2xl font-serif text-right leading-loose text-stone-800 dark:text-stone-100" style={{ fontFamily: "'Amiri', serif" }}>
                      {verse.text}
                    </p>

                    {verse.translation && (
                      <p className="text-lg font-bengali text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-4">
                        {verse.translation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {activeTab === 'hadith' && (
        hadithBookmarks.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800">
            <FileText className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 font-bengali text-lg">এখনো কোনো হাদিস সেভ করা হয়নি</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {hadithBookmarks.map((hadith) => (
              <div key={hadith.id} className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800 group">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-bold font-bengali">
                    {hadith.source}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => speakHadith(hadith.text)}
                      className="p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-emerald-50 dark:bg-stone-800 dark:text-stone-300 hover:text-emerald-600 transition-colors"
                      title="শুনুন"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => removeHadithBookmark(hadith.id)}
                      className="p-2 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-lg font-bengali text-stone-700 dark:text-stone-200 leading-relaxed">
                  "{hadith.text}"
                </p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
