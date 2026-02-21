import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Copy, Check, Share2, Heart } from 'lucide-react';
import { cn, toBengaliNumber } from '../lib/utils';
import { useAudio } from '../context/AudioContext';
import axios from 'axios';

interface SurahDetailProps {
  surahNumber: number;
  onBack: () => void;
}

interface Verse {
  number: number;
  text: string;
  translation: string;
  numberInSurah: number;
  audio: string;
}

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

export default function SurahDetail({ surahNumber, onBack }: SurahDetailProps) {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [surahInfo, setSurahInfo] = useState<any>(null);
  const [copiedVerse, setCopiedVerse] = useState<number | null>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  
  const { playTrack, setPlaylist, currentTrack, isPlaying, togglePlay } = useAudio();

  useEffect(() => {
    fetchSurahData();
    loadBookmarks();
  }, [surahNumber]);

  const loadBookmarks = () => {
    const saved = localStorage.getItem('bookmarks');
    if (saved) {
      const parsed = JSON.parse(saved);
      setBookmarks(parsed.map((b: BookmarkItem) => b.number));
    }
  };

  const toggleBookmark = (verse: Verse) => {
    const saved = localStorage.getItem('bookmarks');
    let currentBookmarks: BookmarkItem[] = saved ? JSON.parse(saved) : [];
    
    const exists = currentBookmarks.some(b => b.number === verse.number);
    
    if (exists) {
      currentBookmarks = currentBookmarks.filter(b => b.number !== verse.number);
      setBookmarks(bookmarks.filter(id => id !== verse.number));
    } else {
      const newBookmark: BookmarkItem = {
        number: verse.number,
        text: verse.text,
        translation: verse.translation,
        numberInSurah: verse.numberInSurah,
        surah: {
          number: surahInfo.number,
          name: surahInfo.name,
          englishName: surahInfo.englishName
        }
      };
      currentBookmarks.push(newBookmark);
      setBookmarks([...bookmarks, verse.number]);
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(currentBookmarks));
  };

  const fetchSurahData = async () => {
    try {
      setLoading(true);
      // Fetch Arabic and Bengali translation
      const response = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,bn.bengali`);
      
      const arabicData = response.data.data[0];
      const bengaliData = response.data.data[1];
      
      setSurahInfo(arabicData);

      const mergedVerses = arabicData.ayahs.map((ayah: any, index: number) => ({
        number: ayah.number,
        text: ayah.text,
        translation: bengaliData.ayahs[index].text,
        numberInSurah: ayah.numberInSurah,
        audio: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3`
      }));

      setVerses(mergedVerses);
      
      // Set playlist for continuous play
      const tracks = mergedVerses.map((v: Verse) => ({
        id: v.number,
        title: `সূরা ${arabicData.englishName} - আয়াত ${toBengaliNumber(v.numberInSurah)}`,
        subtitle: arabicData.name,
        src: v.audio
      }));
      setPlaylist(tracks);

    } catch (error) {
      console.error("Error fetching surah:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, translation: string, id: number) => {
    const fullText = `${text}\n\n${translation}`;
    navigator.clipboard.writeText(fullText);
    setCopiedVerse(id);
    setTimeout(() => setCopiedVerse(null), 2000);
  };

  const handlePlay = (verse: Verse) => {
    playTrack({
      id: verse.number,
      title: `সূরা ${surahInfo.englishName} - আয়াত ${toBengaliNumber(verse.numberInSurah)}`,
      subtitle: surahInfo.name,
      src: verse.audio
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-stone-600 dark:text-stone-300" />
        </button>
        <div>
          <h2 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100">
            {surahInfo?.name} ({surahInfo?.englishName})
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 font-bengali">
            {toBengaliNumber(surahInfo?.numberOfAyahs)} আয়াত • {surahInfo?.revelationType === 'Meccan' ? 'মাক্কী' : 'মাদানী'}
          </p>
        </div>
      </div>

      {/* Bismillah */}
      <div className="text-center py-8 font-serif text-3xl text-stone-800 dark:text-stone-100" style={{ fontFamily: "'Amiri', serif" }}>
        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </div>

      {/* Verses List */}
      <div className="space-y-4">
        {verses.map((verse) => {
          const isCurrent = currentTrack?.id === verse.number;
          
          return (
            <div 
              key={verse.number}
              className={cn(
                "bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border transition-all",
                isCurrent 
                  ? "border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10" 
                  : "border-stone-100 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-emerald-800"
              )}
            >
              {/* Actions Row */}
              <div className="flex justify-between items-center mb-4 border-b border-stone-100 dark:border-stone-800 pb-3">
                <span className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center font-mono text-sm text-stone-500 dark:text-stone-400">
                  {toBengaliNumber(verse.numberInSurah)}
                </span>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleBookmark(verse)}
                    className={cn(
                      "p-2 transition-colors",
                      bookmarks.includes(verse.number) ? "text-red-500" : "text-stone-400 hover:text-red-500"
                    )}
                    title="বুকমার্ক"
                  >
                    <Heart className={cn("w-4 h-4", bookmarks.includes(verse.number) && "fill-current")} />
                  </button>
                  <button 
                    onClick={() => handleCopy(verse.text, verse.translation, verse.number)}
                    className="p-2 text-stone-400 hover:text-emerald-600 transition-colors"
                    title="Copy"
                  >
                    {copiedVerse === verse.number ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
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
                </div>
              </div>

              {/* Arabic Text */}
              <div className="text-right mb-4">
                <p className="text-2xl lg:text-3xl font-serif leading-loose text-stone-800 dark:text-stone-100" style={{ fontFamily: "'Amiri', serif" }}>
                  {verse.text}
                </p>
              </div>

              {/* Translation */}
              <div>
                <p className="text-lg font-bengali text-stone-600 dark:text-stone-300 leading-relaxed">
                  {verse.translation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
