import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { differenceInSeconds } from 'date-fns';
import { PrayerTimes } from '../services/api';

interface RamadanCountdownProps {
  timings: PrayerTimes | null;
}

export default function RamadanCountdown({ timings }: RamadanCountdownProps) {
  const [status, setStatus] = useState<{ type: 'sehri' | 'iftar'; timeLeft: string } | null>(null);

  useEffect(() => {
    if (!timings) return;

    const interval = setInterval(() => {
      calculateRamadanTime(timings);
    }, 1000);

    calculateRamadanTime(timings);

    return () => clearInterval(interval);
  }, [timings]);

  const calculateRamadanTime = (times: PrayerTimes) => {
    const now = new Date();
    
    // Parse times
    const parseTime = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    const fajrTime = parseTime(times.Fajr.split(' ')[0]);
    const maghribTime = parseTime(times.Maghrib.split(' ')[0]);

    let targetTime: Date;
    let type: 'sehri' | 'iftar';

    // Logic:
    // If before Fajr -> Sehri Countdown (Target: Fajr)
    // If after Fajr but before Maghrib -> Iftar Countdown (Target: Maghrib)
    // If after Maghrib -> Sehri Countdown (Target: Fajr tomorrow)

    if (now < fajrTime) {
      targetTime = fajrTime;
      type = 'sehri';
    } else if (now < maghribTime) {
      targetTime = maghribTime;
      type = 'iftar';
    } else {
      targetTime = fajrTime;
      targetTime.setDate(targetTime.getDate() + 1);
      type = 'sehri';
    }

    const diff = differenceInSeconds(targetTime, now);
    
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    setStatus({
      type,
      timeLeft: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    });
  };

  if (!timings || !status) return null;

  return (
    <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
        <Moon className="w-48 h-48" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2 opacity-90">
          {status.type === 'sehri' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          <span className="font-bengali font-medium">
            {status.type === 'sehri' ? 'সেহরির শেষ সময়' : 'ইফতারের সময় বাকি'}
          </span>
        </div>
        
        <div className="text-4xl lg:text-5xl font-mono font-bold tracking-tight mb-2">
          {status.timeLeft}
        </div>
        
        <p className="text-sm opacity-80 font-bengali">
          {status.type === 'sehri' 
            ? 'ফজরের আজানের সাথে সেহরির সময় শেষ হবে' 
            : 'মাগরিবের আজানের সাথে ইফতারের সময় শুরু হবে'}
        </p>
      </div>
    </div>
  );
}
