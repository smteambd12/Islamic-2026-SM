import React from 'react';
import { Play, Pause, SkipBack, SkipForward, X, Volume2 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { cn, toBengaliNumber } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalAudioPlayer() {
  const { currentTrack, isPlaying, togglePlay, progress, duration, seek, playNext, playPrev, closePlayer } = useAudio();

  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${toBengaliNumber(mins)}:${toBengaliNumber(secs.toString().padStart(2, '0'))}`;
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-[70px] lg:bottom-0 left-0 right-0 z-50 px-4 pb-4 lg:pb-0"
      >
        <div className="max-w-7xl mx-auto bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl lg:rounded-t-2xl lg:rounded-b-none shadow-2xl p-4">
          <div className="flex flex-col gap-2">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-stone-200 dark:bg-stone-800 rounded-full cursor-pointer group relative"
                 onClick={(e) => {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const percent = (e.clientX - rect.left) / rect.width;
                   seek(percent * duration);
                 }}>
              <div 
                className="h-full bg-emerald-500 rounded-full relative"
                style={{ width: `${(progress / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm" />
              </div>
            </div>
            
            <div className="flex justify-between text-[10px] font-mono text-stone-500 dark:text-stone-400 px-1">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between">
              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold font-bengali text-stone-800 dark:text-stone-100 truncate">
                  {currentTrack.title}
                </h4>
                {currentTrack.subtitle && (
                  <p className="text-xs text-stone-500 dark:text-stone-400 truncate font-bengali">
                    {currentTrack.subtitle}
                  </p>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 flex-1 justify-center">
                <button onClick={playPrev} className="text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors">
                  <SkipBack className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>

                <button onClick={playNext} className="text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Close Button */}
              <div className="flex-1 flex justify-end items-center gap-2">
                 <button 
                   onClick={closePlayer}
                   className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-red-500 transition-colors"
                 >
                   <X className="w-5 h-5" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
