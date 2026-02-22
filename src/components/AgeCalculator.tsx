import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, RefreshCcw, Baby, Hourglass } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    nextBirthday: string;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const today = new Date();
    const birth = new Date(birthDate);
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total days
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Next Birthday
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (today > nextBday) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNextBday = Math.ceil((nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setAge({
      years,
      months,
      days,
      totalDays,
      nextBirthday: `${daysToNextBday} দিন বাকি`
    });
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-rose-500 text-white p-8 rounded-[2.5rem] relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-bengali mb-2 flex items-center gap-3">
            <Hourglass className="w-8 h-8" />
            বয়স ক্যালকুলেটর
          </h1>
          <p className="text-rose-100 font-bengali">
            আপনার সঠিক বয়স এবং পরবর্তী জন্মদিনের সময় জানুন
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800">
          <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-2 font-bengali">
            আপনার জন্ম তারিখ নির্বাচন করুন
          </label>
          <div className="flex gap-4">
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="flex-1 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-rose-500/20 outline-none font-mono text-lg"
            />
            <button
              onClick={calculateAge}
              className="bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-2xl transition-colors shadow-lg shadow-rose-500/30"
            >
              <RefreshCcw className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Result Section */}
        {age && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-stone-900 p-6 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 space-y-6"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl">
                <p className="text-3xl font-bold text-rose-600 dark:text-rose-400 font-mono">{age.years}</p>
                <p className="text-xs text-stone-500 font-bengali mt-1">বছর</p>
              </div>
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl">
                <p className="text-3xl font-bold text-rose-600 dark:text-rose-400 font-mono">{age.months}</p>
                <p className="text-xs text-stone-500 font-bengali mt-1">মাস</p>
              </div>
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl">
                <p className="text-3xl font-bold text-rose-600 dark:text-rose-400 font-mono">{age.days}</p>
                <p className="text-xs text-stone-500 font-bengali mt-1">দিন</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl">
                <span className="text-stone-600 dark:text-stone-400 font-bengali flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  মোট দিন
                </span>
                <span className="font-mono font-bold text-stone-800 dark:text-stone-200">
                  {age.totalDays.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl">
                <span className="text-stone-600 dark:text-stone-400 font-bengali flex items-center gap-2">
                  <Baby className="w-4 h-4" />
                  পরবর্তী জন্মদিন
                </span>
                <span className="font-bengali font-bold text-rose-500">
                  {age.nextBirthday}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
