import React, { useState } from 'react';
import { LIFE_CYCLE_DATA } from '../data/lifeCycleData';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, BookOpen, ArrowRight } from 'lucide-react';

export default function LifeCycle() {
  const [selectedStage, setSelectedStage] = useState(LIFE_CYCLE_DATA[0]);

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-emerald-600 text-white p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl" />
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold font-bengali mb-4">জীবন চক্র</h1>
          <p className="text-emerald-100 font-bengali max-w-xl text-lg">
            জন্ম থেকে মৃত্যু পর্যন্ত একজন মুমিনের জীবনের প্রতিটি ধাপের জন্য প্রয়োজনীয় দিকনির্দেশনা।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-lg font-bold font-bengali text-stone-800 dark:text-stone-100 px-2">
            জীবনের ধাপসমূহ
          </h3>
          <div className="space-y-2">
            {LIFE_CYCLE_DATA.map((stage) => {
              const Icon = stage.icon;
              const isSelected = selectedStage.id === stage.id;
              
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left group relative overflow-hidden",
                    isSelected 
                      ? "bg-white dark:bg-stone-800 shadow-md ring-2 ring-emerald-500/20" 
                      : "bg-stone-50 dark:bg-stone-900/50 hover:bg-white dark:hover:bg-stone-800 hover:shadow-sm"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    isSelected 
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" 
                      : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 z-10">
                    <h4 className={cn(
                      "font-bold font-bengali text-lg transition-colors",
                      isSelected ? "text-stone-800 dark:text-stone-100" : "text-stone-600 dark:text-stone-400"
                    )}>
                      {stage.title}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-500 line-clamp-1 font-bengali">
                      {stage.description}
                    </p>
                  </div>

                  {isSelected && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute right-4 text-emerald-500"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-stone-900 p-6 md:p-8 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-100 dark:border-stone-800">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400">
                    <selectedStage.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-bengali text-stone-800 dark:text-stone-100">
                      {selectedStage.title}
                    </h2>
                    <p className="text-stone-500 dark:text-stone-400 font-bengali mt-1">
                      {selectedStage.description}
                    </p>
                  </div>
                </div>

                <div className="grid gap-6">
                  {selectedStage.topics.map((topic, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-stone-50 dark:bg-stone-800/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 p-6 rounded-2xl transition-colors border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/30"
                    >
                      <h3 className="text-xl font-bold font-bengali text-stone-800 dark:text-stone-200 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        {topic.title}
                      </h3>
                      <p className="text-stone-600 dark:text-stone-400 font-bengali leading-relaxed">
                        {topic.content}
                      </p>
                      {topic.reference && (
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-stone-400 uppercase tracking-wider">
                          <BookOpen className="w-3 h-3" />
                          {topic.reference}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Navigation Footer */}
              <div className="flex justify-end">
                <button 
                  onClick={() => {
                    const currentIndex = LIFE_CYCLE_DATA.findIndex(s => s.id === selectedStage.id);
                    const nextIndex = (currentIndex + 1) % LIFE_CYCLE_DATA.length;
                    setSelectedStage(LIFE_CYCLE_DATA[nextIndex]);
                  }}
                  className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold font-bengali hover:gap-3 transition-all"
                >
                  পরবর্তী ধাপ
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
