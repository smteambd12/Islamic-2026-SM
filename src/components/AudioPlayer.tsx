import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface AudioPlayerProps {
  verseNumber?: number;
  url?: string;
  className?: string;
}

export default function AudioPlayer({ verseNumber, url, className }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioSource = url || (verseNumber ? `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verseNumber}.mp3` : '');

  useEffect(() => {
    // Reset state when source changes
    setIsPlaying(false);
    setIsLoading(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [audioSource]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click handlers (like row selection)
    
    if (!audioSource) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(audioSource);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current.addEventListener('waiting', () => setIsLoading(true));
      audioRef.current.addEventListener('playing', () => setIsLoading(false));
      audioRef.current.addEventListener('canplay', () => setIsLoading(false));
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Audio play error:", err);
          setIsLoading(false);
        });
    }
  };

  return (
    <button
      onClick={togglePlay}
      disabled={isLoading}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
        isPlaying 
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
          : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700",
        className
      )}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : isPlaying ? (
        <Pause className="w-4 h-4 fill-current" />
      ) : (
        <Play className="w-4 h-4 fill-current" />
      )}
      <span className="font-bengali">{isPlaying ? 'থামুন' : 'শুনুন'}</span>
    </button>
  );
}
