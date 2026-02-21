import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, BookOpen, CheckCircle2, Circle, ChevronDown, ChevronUp, Lightbulb, Bell, BellOff, Calendar, ListTodo, Clock, Play, Pause, Volume2 } from 'lucide-react';
import { RAMADAN_GUIDE } from '../data/islamicData';
import { RAMADAN_DUAS, RAMADAN_AMALS, Dua } from '../data/ramadanData';
import { PrayerTimes } from '../services/api';
import RamadanCountdown from './RamadanCountdown';
import RamadanCalendar from './RamadanCalendar';
import AmolTracker from './AmolTracker';
import { cn, formatTime12Hour, toBengaliNumber } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface RamadanProps {
  timings: PrayerTimes | null;
}

const AudioPlayer = ({ src }: { src?: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!src) return null;

  return (
    <div className="flex items-center gap-2 mt-2">
      <audio 
        ref={audioRef} 
        src={src} 
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <button 
        onClick={togglePlay}
        className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
      >
        {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        {isPlaying ? 'বন্ধ করুন' : 'শুনুন'}
      </button>
    </div>
  );
};

export default function Ramadan({ timings }: RamadanProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calendar' | 'amol' | 'guide' | 'duas'>('dashboard');
  const [expandedGuide, setExpandedGuide] = useState<number | null>(null);
  const [alarmEnabled, setAlarmEnabled] = useState(false);

  useEffect(() => {
    const savedAlarm = localStorage.getItem('ramadan-alarm');
    if (savedAlarm) setAlarmEnabled(JSON.parse(savedAlarm));
  }, []);

  const toggleGuide = (index: number) => {
    setExpandedGuide(expandedGuide === index ? null : index);
  };
  
  const toggleAlarm = () => {
    const newState = !alarmEnabled;
    setAlarmEnabled(newState);
    localStorage.setItem('ramadan-alarm', JSON.stringify(newState));
    if (newState) {
      alert('এলার্ম চালু করা হয়েছে। অ্যাপ খোলা থাকলে সেহরি ও ইফতারের ১৫ মিনিট আগে এলার্ম বাজবে।');
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: Moon },
    { id: 'duas', label: 'দোয়া ও আমল', icon: BookOpen },
    { id: 'calendar', label: 'ক্যালেন্ডার', icon: Calendar },
    { id: 'amol', label: 'আমল ট্র্যাকার', icon: ListTodo },
    { id: 'guide', label: 'গাইড', icon: Lightbulb },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Tabs */}
      <div className="sticky top-0 bg-stone-50 dark:bg-stone-950 pt-2 pb-4 z-30">
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100">রমজান কর্নার</h2>
          <button 
            onClick={toggleAlarm}
            className={cn("p-2 rounded-full transition-colors", alarmEnabled ? "bg-emerald-100 text-emerald-600" : "bg-stone-100 text-stone-400")}
          >
            {alarmEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all font-bengali border",
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                    : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Countdown Hero */}
            <RamadanCountdown timings={timings} />

            {/* Today's Schedule Card */}
            {timings && (
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                
                <h3 className="text-lg font-bold font-bengali mb-6 relative z-10 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  আজকের সময়সূচী
                </h3>
                
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-center group hover:bg-white/20 transition-colors">
                    <p className="text-sm text-emerald-200 font-bengali mb-2">সেহরির শেষ সময়</p>
                    <p className="text-2xl font-mono font-bold text-white group-hover:scale-110 transition-transform">
                      {formatTime12Hour(timings.Fajr)}
                    </p>
                  </div>
                  <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-center group hover:bg-white/20 transition-colors">
                    <p className="text-sm text-amber-200 font-bengali mb-2">ইফতারের সময়</p>
                    <p className="text-2xl font-mono font-bold text-white group-hover:scale-110 transition-transform">
                      {formatTime12Hour(timings.Maghrib)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setActiveTab('duas')}
                className="p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all text-left group"
              >
                <BookOpen className="w-8 h-8 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold font-bengali text-stone-800 dark:text-stone-100">দোয়া ও আমল</h4>
                <p className="text-xs text-stone-500 mt-1">রোজার নিয়ত ও ইফতারের দোয়া</p>
              </button>
              <button 
                onClick={() => setActiveTab('calendar')}
                className="p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all text-left group"
              >
                <Calendar className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold font-bengali text-stone-800 dark:text-stone-100">সম্পূর্ণ ক্যালেন্ডার</h4>
                <p className="text-xs text-stone-500 mt-1">পুরো মাসের সময়সূচী</p>
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'duas' && (
          <motion.div
            key="duas"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-bengali text-stone-800 dark:text-stone-100 border-l-4 border-emerald-500 pl-3">
                গুরুত্বপূর্ণ দোয়া
              </h3>
              
              {RAMADAN_DUAS.map((dua) => (
                <div key={dua.id} className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-bold font-bengali text-emerald-700 dark:text-emerald-400">
                      {dua.title}
                    </h4>
                    <span className="text-xs px-2 py-1 bg-stone-100 dark:bg-stone-800 rounded text-stone-500 uppercase">
                      {dua.category}
                    </span>
                  </div>
                  
                  <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl mb-4 text-center">
                    <p className="text-xl font-arabic leading-loose text-stone-800 dark:text-stone-100 mb-2">
                      {dua.arabic}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-stone-600 dark:text-stone-400 italic">
                      <span className="font-bold not-italic text-stone-400 text-xs uppercase mr-2">উচ্চারণ:</span>
                      {dua.transliteration}
                    </p>
                    <p className="text-sm text-stone-700 dark:text-stone-300 font-bengali">
                      <span className="font-bold text-stone-400 text-xs uppercase mr-2">অর্থ:</span>
                      {dua.translation}
                    </p>
                  </div>

                  <AudioPlayer src={dua.audioUrl} />
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold font-bengali text-stone-800 dark:text-stone-100 border-l-4 border-blue-500 pl-3">
                রমজানের বিশেষ আমল
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RAMADAN_AMALS.map((amal) => {
                  const Icon = amal.icon;
                  return (
                    <div key={amal.id} className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-100 dark:border-stone-800 flex gap-4">
                      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold font-bengali text-stone-800 dark:text-stone-100 mb-1">
                          {amal.title}
                        </h4>
                        <p className="text-sm text-stone-500 dark:text-stone-400 font-bengali leading-relaxed">
                          {amal.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <RamadanCalendar currentDate={new Date()} />
          </motion.div>
        )}

        {activeTab === 'amol' && (
          <motion.div
            key="amol"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AmolTracker />
          </motion.div>
        )}

        {activeTab === 'guide' && (
          <motion.div
            key="guide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
              <h3 className="text-lg font-bold font-bengali mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                রমজান গাইড ও পরামর্শ
              </h3>
              
              <div className="space-y-3">
                {RAMADAN_GUIDE.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="border border-stone-100 dark:border-stone-800 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleGuide(idx)}
                      className="w-full flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          item.category === 'health' ? "bg-rose-400" : "bg-emerald-400"
                        )} />
                        <span className="font-bengali font-medium text-stone-800 dark:text-stone-200">
                          {item.title}
                        </span>
                      </div>
                      {expandedGuide === idx ? (
                        <ChevronUp className="w-4 h-4 text-stone-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {expandedGuide === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800">
                            <p className="text-stone-600 dark:text-stone-300 font-bengali leading-relaxed text-sm">
                              {item.content}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
