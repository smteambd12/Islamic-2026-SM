import React, { useEffect, useState } from 'react';
import { Clock, Moon, Sun } from 'lucide-react';
import { format, differenceInSeconds } from 'date-fns';
import { PrayerTimes } from '../services/api';
import { cn, formatTime12Hour } from '../lib/utils';

interface PrayerTimesCardProps {
  timings: PrayerTimes | null;
  loading: boolean;
}

export default function PrayerTimesCard({ timings, loading }: PrayerTimesCardProps) {
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; timeLeft: string } | null>(null);

  useEffect(() => {
    if (!timings) return;

    const interval = setInterval(() => {
      calculateNextPrayer(timings);
    }, 1000);

    calculateNextPrayer(timings);

    return () => clearInterval(interval);
  }, [timings]);

  const calculateNextPrayer = (times: PrayerTimes) => {
    const now = new Date();
    const prayerOrder = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    let next = null;
    let minDiff = Infinity;

    // Helper to parse time string "HH:mm" to Date object for today
    const parseTime = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    for (const prayer of prayerOrder) {
      // Clean time string (remove (EST) etc if present)
      const timeStr = times[prayer].split(' ')[0];
      let prayerDate = parseTime(timeStr);

      // If prayer time has passed today, consider it for tomorrow (only relevant for logic, 
      // but for "Next Prayer" we usually look ahead. 
      // Actually, if all passed, next is Fajr tomorrow.
      
      let diff = differenceInSeconds(prayerDate, now);
      
      if (diff < 0) {
        // Prayer passed
        continue;
      }

      if (diff < minDiff) {
        minDiff = diff;
        next = { name: prayer, time: timeStr, diff };
      }
    }

    if (!next) {
      // All prayers passed today, next is Fajr tomorrow
      const fajrTime = times['Fajr'].split(' ')[0];
      const fajrDate = parseTime(fajrTime);
      fajrDate.setDate(fajrDate.getDate() + 1);
      const diff = differenceInSeconds(fajrDate, now);
      next = { name: 'Fajr', time: fajrTime, diff };
    }

    // Format countdown
    const hours = Math.floor(next.diff / 3600);
    const minutes = Math.floor((next.diff % 3600) / 60);
    const seconds = next.diff % 60;

    setNextPrayer({
      name: next.name,
      time: next.time,
      timeLeft: `${hours}h ${minutes}m ${seconds}s`
    });
  };

  const prayerNames: Record<string, string> = {
    Fajr: 'ফজর',
    Sunrise: 'সূর্যোদয়',
    Dhuhr: 'জোহর',
    Asr: 'আছর',
    Maghrib: 'মাগরিব',
    Isha: 'এশা',
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm animate-pulse h-64">
        <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-10 bg-stone-100 dark:bg-stone-800 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!timings) return null;

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-bengali flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-600" />
          নামাজের সময়সূচী
        </h2>
        {nextPrayer && (
          <div className="text-right">
            <p className="text-xs text-stone-500 font-bengali">পরবর্তী ওয়াক্ত</p>
            <p className="text-sm font-bold text-emerald-600 font-bengali">
              {prayerNames[nextPrayer.name] || nextPrayer.name} - {nextPrayer.timeLeft}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {Object.entries(prayerNames).map(([key, label]) => {
            const time = timings[key as keyof PrayerTimes];
            const formattedTime = formatTime12Hour(time);
            const isNext = nextPrayer?.name === key;
            
            return (
              <div 
                key={key}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl transition-colors",
                  isNext 
                    ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800" 
                    : "hover:bg-stone-50 dark:hover:bg-stone-800/50"
                )}
              >
                <span className={cn("font-bengali font-medium", isNext ? "text-emerald-700 dark:text-emerald-400" : "text-stone-600 dark:text-stone-400")}>
                  {label}
                </span>
                <span className={cn("font-mono font-medium", isNext ? "text-emerald-700 dark:text-emerald-400" : "text-stone-900 dark:text-stone-200")}>
                  {formattedTime}
                </span>
              </div>
            );
        })}
      </div>
    </div>
  );
}
