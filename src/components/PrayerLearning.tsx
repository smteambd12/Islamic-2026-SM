import React from 'react';
import { PRAYER_INFO } from '../data/islamicData';
import { cn } from '../lib/utils';

export default function PrayerLearning() {
  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100">নামাজ শিক্ষা ও রাকাত</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(PRAYER_INFO).map(([key, info]) => (
          <div key={key} className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold font-bengali text-emerald-600 dark:text-emerald-400">{info.name}</h3>
              <span className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-3 py-1 rounded-full text-xs font-mono font-bold">
                মোট {info.total} রাকাত
              </span>
            </div>
            
            <div className="space-y-3">
              {info.rakats.map((rakat, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm border-b border-stone-50 dark:border-stone-800/50 last:border-0 pb-2 last:pb-0">
                  <span className="font-bengali text-stone-600 dark:text-stone-300">{rakat.text}</span>
                  <span className="font-mono font-bold text-stone-900 dark:text-stone-100 bg-stone-50 dark:bg-stone-800 w-6 h-6 flex items-center justify-center rounded-full">
                    {rakat.count}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <p className="text-xs text-stone-500 font-bengali">{info.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
