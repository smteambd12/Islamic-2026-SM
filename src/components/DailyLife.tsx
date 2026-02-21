import React, { useState } from 'react';
import { Sun, Moon, Utensils, DoorOpen, Home, Droplets, Heart, Search, Filter } from 'lucide-react';
import { DAILY_DUAS, DailyDua } from '../data/dailyDuas';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export default function DailyLife() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const categories = [
    { id: 'all', label: 'সব', icon: Heart },
    { id: 'sleep', label: 'ঘুম', icon: Moon },
    { id: 'food', label: 'খাবার', icon: Utensils },
    { id: 'hygiene', label: 'পরিচ্ছন্নতা', icon: Droplets },
    { id: 'home', label: 'ঘর', icon: Home },
  ];

  const filteredDuas = DAILY_DUAS.filter(dua => {
    const matchesCategory = filter === 'all' || dua.category === filter;
    const matchesSearch = dua.title.toLowerCase().includes(search.toLowerCase()) || 
                          dua.translation.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
        <h2 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100 mb-2">
          নিত্যপ্রয়োজনীয় দোয়া
        </h2>
        <p className="text-stone-500 dark:text-stone-400 font-bengali text-sm">
          দৈনন্দিন জীবনের প্রয়োজনীয় দোয়া ও আমল
        </p>

        {/* Search & Filter */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="দোয়া খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border-none focus:ring-2 focus:ring-emerald-500 font-bengali"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all font-bengali",
                    filter === cat.id
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDuas.map((dua) => (
          <motion.div
            key={dua.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-stone-900 p-5 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                <dua.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold font-bengali text-lg text-stone-800 dark:text-stone-100 mb-3">
                  {dua.title}
                </h3>
                <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl mb-3 text-center">
                  <p className="font-arabic text-xl leading-loose text-stone-800 dark:text-stone-100">
                    {dua.arabic}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-stone-600 dark:text-stone-400 italic">
                    {dua.transliteration}
                  </p>
                  <p className="text-sm text-stone-700 dark:text-stone-300 font-bengali">
                    <span className="font-bold text-stone-400 text-xs uppercase mr-2">অর্থ:</span>
                    {dua.translation}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
