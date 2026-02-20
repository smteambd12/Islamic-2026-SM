import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Circle, Clock, Moon, Sun, Star, BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn, toBengaliNumber, formatTime12Hour } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface RamadanCalendarProps {
  currentDate: Date;
}

// Helper to generate Ramadan Calendar for 2026 (Approximate)
// Ramadan 2026 starts approx Feb 18
const generateRamadanCalendar = () => {
  const startDate = new Date('2026-02-18');
  const days = [];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    // Approximate times - in a real app, these would come from an API or calculation library
    // Adjusting times slightly for realism
    const sehriTime = new Date(date);
    sehriTime.setHours(5, 15 - i, 0); // Decreasing sehri time
    
    const iftarTime = new Date(date);
    iftarTime.setHours(18, 5 + i, 0); // Increasing iftar time

    days.push({
      ramadanDay: i + 1,
      date: date,
      sehri: sehriTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      iftar: iftarTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      dayName: date.toLocaleDateString('bn-BD', { weekday: 'long' }),
      dateString: date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long' })
    });
  }
  return days;
};

export default function RamadanCalendar({ currentDate }: RamadanCalendarProps) {
  const [calendarData] = useState(generateRamadanCalendar());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Find current Ramadan day if applicable
  useEffect(() => {
    // For demo purposes, let's pretend today is within Ramadan if strictly needed, 
    // but better to just show the calendar.
    // If today matches a date in the calendar, highlight it.
    const todayStr = currentDate.toDateString();
    const todayIndex = calendarData.findIndex(d => d.date.toDateString() === todayStr);
    if (todayIndex !== -1) {
      setSelectedDay(todayIndex + 1);
    }
  }, [currentDate, calendarData]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold font-bengali text-stone-800 dark:text-stone-100 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-600" />
            রমজান ক্যালেন্ডার ২০২৬
          </h3>
          <span className="text-xs font-mono bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full">
            ১৪৪৭ হিজরি
          </span>
        </div>

        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {calendarData.map((day) => {
            const isToday = day.date.toDateString() === currentDate.toDateString();
            const isPast = day.date < currentDate;
            
            return (
              <div 
                key={day.ramadanDay}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all",
                  isToday 
                    ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 ring-1 ring-emerald-500/30" 
                    : isPast
                      ? "bg-stone-50 dark:bg-stone-900 border-stone-100 dark:border-stone-800 opacity-70"
                      : "bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-emerald-800"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0",
                    isToday 
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" 
                      : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                  )}>
                    {toBengaliNumber(day.ramadanDay)}
                  </div>
                  <div>
                    <p className="font-bengali font-bold text-stone-800 dark:text-stone-100">
                      {day.dateString}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-bengali">
                      {day.dayName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right">
                  <div>
                    <p className="text-xs text-stone-400 font-bengali mb-0.5">সেহরি</p>
                    <p className="font-mono font-bold text-stone-700 dark:text-stone-300 text-sm">
                      {toBengaliNumber(day.sehri)}
                    </p>
                  </div>
                  <div className="w-px h-8 bg-stone-200 dark:bg-stone-700" />
                  <div>
                    <p className="text-xs text-stone-400 font-bengali mb-0.5">ইফতার</p>
                    <p className="font-mono font-bold text-stone-700 dark:text-stone-300 text-sm">
                      {toBengaliNumber(day.iftar)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
