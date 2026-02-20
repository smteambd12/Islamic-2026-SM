import React, { useState, useEffect } from 'react';
import { Moon, Sun, BookOpen, CheckCircle2, Circle, ChevronDown, ChevronUp, Lightbulb, Bell, BellOff, Calendar } from 'lucide-react';
import { RAMADAN_AMAL, RAMADAN_GUIDE } from '../data/islamicData';
import { PrayerTimes } from '../services/api';
import RamadanCountdown from './RamadanCountdown';
import { cn, formatTime12Hour, toBengaliNumber } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface RamadanProps {
  timings: PrayerTimes | null;
}

export default function Ramadan({ timings }: RamadanProps) {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [expandedGuide, setExpandedGuide] = useState<number | null>(null);
  const [alarmEnabled, setAlarmEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ramadan-tasks');
    if (saved) {
      const { date, tasks } = JSON.parse(saved);
      if (date === new Date().toDateString()) {
        setCompletedTasks(tasks);
      } else {
        setCompletedTasks({});
      }
    }
    
    const savedAlarm = localStorage.getItem('ramadan-alarm');
    if (savedAlarm) setAlarmEnabled(JSON.parse(savedAlarm));
  }, []);

  const toggleTask = (index: number) => {
    const newTasks = { ...completedTasks, [index]: !completedTasks[index] };
    setCompletedTasks(newTasks);
    localStorage.setItem('ramadan-tasks', JSON.stringify({
      date: new Date().toDateString(),
      tasks: newTasks
    }));
  };

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

  // Mock Calendar Data
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100">রমজান কর্নার</h2>
        <button 
          onClick={toggleAlarm}
          className={cn("p-2 rounded-full transition-colors", alarmEnabled ? "bg-emerald-100 text-emerald-600" : "bg-stone-100 text-stone-400")}
        >
          {alarmEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Countdown Hero */}
      <RamadanCountdown timings={timings} />

      {/* Sehri & Iftar Times Table (If timings available) */}
      {timings && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
          <h3 className="text-lg font-bold font-bengali mb-4">আজকের সময়সূচী</h3>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-xl text-center">
                <p className="text-sm text-stone-500 font-bengali mb-1">সেহরির শেষ সময়</p>
                <p className="text-xl lg:text-2xl font-mono font-bold text-stone-800 dark:text-stone-100">
                  {formatTime12Hour(timings.Fajr)}
                </p>
             </div>
             <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-xl text-center">
                <p className="text-sm text-stone-500 font-bengali mb-1">ইফতারের সময়</p>
                <p className="text-xl lg:text-2xl font-mono font-bold text-stone-800 dark:text-stone-100">
                  {formatTime12Hour(timings.Maghrib)}
                </p>
             </div>
          </div>
        </div>
      )}

      {/* Ramadan Calendar Grid */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
        <h3 className="text-lg font-bold font-bengali mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          রমজান ক্যালেন্ডার
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day) => (
            <div key={day} className="aspect-square flex items-center justify-center rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-mono text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 cursor-pointer transition-colors">
              {toBengaliNumber(day)}
            </div>
          ))}
        </div>
      </div>

      {/* Daily Amal Checklist */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
        <h3 className="text-lg font-bold font-bengali mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          আজকের আমল
        </h3>
        
        <div className="space-y-3">
          {RAMADAN_AMAL.map((item, idx) => (
            <button
              key={idx}
              onClick={() => toggleTask(idx)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left",
                completedTasks[idx] 
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800" 
                  : "bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800"
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                completedTasks[idx] ? "text-emerald-600" : "text-stone-300"
              )}>
                {completedTasks[idx] ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
              </div>
              <div>
                <p className={cn(
                  "font-bengali font-medium transition-colors",
                  completedTasks[idx] ? "text-emerald-800 dark:text-emerald-200 line-through opacity-70" : "text-stone-700 dark:text-stone-200"
                )}>
                  {item.task}
                </p>
                <p className="text-xs text-stone-400 font-mono mt-1 uppercase">{item.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Ramadan Guide Section */}
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
    </div>
  );
}
