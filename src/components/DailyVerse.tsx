import React, { useEffect, useState } from 'react';
import { BookOpen, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { QuranVerse, getDailyVerse } from '../services/api';
import { cn } from '../lib/utils';
import AudioPlayer from './AudioPlayer';
import { motion, AnimatePresence } from 'framer-motion';

export default function DailyVerse() {
  const [verse, setVerse] = useState<QuranVerse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [direction, setDirection] = useState(0);

  const fetchNewVerse = async () => {
    try {
      setLoading(true);
      const data = await getDailyVerse();
      setVerse(data);
      checkIfSaved(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewVerse();
    
    // Auto change every 60 seconds
    const interval = setInterval(() => {
      setDirection(1);
      fetchNewVerse();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const checkIfSaved = (verseData: QuranVerse) => {
    const saved = localStorage.getItem('bookmarks');
    if (saved) {
      const bookmarks = JSON.parse(saved);
      const exists = bookmarks.some((b: QuranVerse) => b.number === verseData.number);
      setIsSaved(exists);
    } else {
      setIsSaved(false);
    }
  };

  const toggleSave = () => {
    if (!verse) return;
    
    const saved = localStorage.getItem('bookmarks');
    let bookmarks: QuranVerse[] = saved ? JSON.parse(saved) : [];
    
    if (isSaved) {
      bookmarks = bookmarks.filter(b => b.number !== verse.number);
    } else {
      bookmarks.push(verse);
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    setIsSaved(!isSaved);
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -100) {
      // Swipe Left - Next
      setDirection(1);
      fetchNewVerse();
    } else if (info.offset.x > 100) {
      // Swipe Right - Previous (Just fetch new for now as we don't store history)
      setDirection(-1);
      fetchNewVerse();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800 overflow-hidden relative min-h-[300px]">
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h2 className="text-xl font-bold font-bengali flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          আজকের আয়াত
        </h2>
        <div className="flex gap-2">
          {verse && <AudioPlayer verseNumber={verse.number} />}
          <button 
            onClick={toggleSave}
            className={cn("p-2 rounded-full transition-colors", isSaved ? "text-red-500 bg-red-50 dark:bg-red-900/20" : "text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800")}
          >
            <Heart className={cn("w-5 h-5", isSaved && "fill-current")} />
          </button>
        </div>
      </div>

      <div className="relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {loading ? (
             <motion.div 
               key="loading"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 flex items-center justify-center"
             >
               <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
             </motion.div>
          ) : verse ? (
            <motion.div
              key={verse.number}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="cursor-grab active:cursor-grabbing touch-pan-y"
            >
              <div className="space-y-6">
                <div className="text-right">
                  <p className="text-2xl lg:text-3xl font-serif leading-loose text-stone-800 dark:text-stone-100" style={{ fontFamily: "'Amiri', serif" }}>
                    {verse.text}
                  </p>
                </div>
                
                <div>
                  <p className="text-lg font-bengali text-stone-600 dark:text-stone-300 leading-relaxed select-none">
                    {verse.translation}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center text-sm text-stone-500 select-none">
                  <span className="font-medium">
                    সূরা {verse.surah.englishName} ({verse.surah.name}) - আয়াত {verse.numberInSurah}
                  </span>
                  <span className="text-xs opacity-50">
                    সোয়াইপ করুন
                  </span>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
