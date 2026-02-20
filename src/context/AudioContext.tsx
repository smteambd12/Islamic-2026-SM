import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

interface Track {
  id: number | string;
  title: string;
  subtitle?: string;
  src: string;
}

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  playNext: () => void;
  playPrev: () => void;
  closePlayer: () => void;
  setPlaylist: (tracks: Track[]) => void;
  playlist: Track[];
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio object once
  useEffect(() => {
    audioRef.current = new Audio();
  }, []);

  const playTrack = useCallback((track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const closePlayer = useCallback(() => {
    setIsPlaying(false);
    setCurrentTrack(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  }, []);

  const playNext = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
    if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
      playTrack(playlist[currentIndex + 1]);
    } else {
      setIsPlaying(false); // Stop if end of playlist
    }
  }, [currentTrack, playlist, playTrack]);

  const playPrev = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
    if (currentIndex > 0) {
      playTrack(playlist[currentIndex - 1]);
    }
  }, [currentTrack, playlist, playTrack]);

  // Handle Audio Events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      // We need to call playNext, but we can't depend on it directly here 
      // if we want to avoid re-attaching listeners constantly which might glitch audio.
      // However, for 'ended', it only happens once per track, so re-attaching is fine.
      playNext(); 
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playNext]); // Re-bind listener when playNext changes (which changes when currentTrack changes)

  // Handle Source Change
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      if (audioRef.current.src !== currentTrack.src) {
        audioRef.current.src = currentTrack.src;
        audioRef.current.load();
        if (isPlaying) {
            audioRef.current.play().catch(e => console.error("Play error", e));
        }
      }
    }
  }, [currentTrack]);

  // Handle Play/Pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Play error", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      progress,
      duration,
      playTrack,
      togglePlay,
      seek,
      playNext,
      playPrev,
      closePlayer,
      setPlaylist,
      playlist
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
