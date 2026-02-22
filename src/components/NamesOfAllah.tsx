import React, { useState } from 'react';
import { NAMES_OF_ALLAH } from '../data/namesOfAllah';
import { motion } from 'framer-motion';
import { Search, Play, Pause, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

export default function NamesOfAllah() {
  const [searchTerm, setSearchTerm] = useState('');
  const [playingId, setPlayingId] = useState<number | null>(null);

  const filteredNames = NAMES_OF_ALLAH.filter(name => 
    name.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    name.bengali.includes(searchTerm) ||
    name.meaning.includes(searchTerm)
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-emerald-600 text-white p-8 md:p-12 text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold font-arabic mb-2">وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ</h1>
          <h2 className="text-2xl md:text-3xl font-bold font-bengali mb-4">আসমাউল হুসনা</h2>
          <p className="text-emerald-100 font-bengali max-w-xl mx-auto text-lg">
            আল্লাহর ৯৯টি গুণবাচক নাম, অর্থ ও ফজিলত
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
        <input
          type="text"
          placeholder="নাম বা অর্থ দিয়ে খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-bengali"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNames.map((name, index) => (
          <motion.div
            key={name.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 font-mono text-sm">
                {name.id}
              </span>
              <button className="text-stone-400 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center space-y-2 mb-6">
              <h3 className="text-4xl font-arabic text-stone-800 dark:text-stone-100 mb-2 group-hover:text-emerald-600 transition-colors">
                {name.arabic}
              </h3>
              <h4 className="text-xl font-bold font-bengali text-emerald-600 dark:text-emerald-400">
                {name.bengali}
              </h4>
              <p className="text-stone-500 dark:text-stone-400 font-bengali">
                {name.meaning}
              </p>
            </div>

            <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl">
              <p className="text-xs text-stone-500 dark:text-stone-400 font-bold mb-1 uppercase tracking-wider">
                ফজিলত
              </p>
              <p className="text-sm text-stone-600 dark:text-stone-300 font-bengali leading-relaxed">
                {name.benefit}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
