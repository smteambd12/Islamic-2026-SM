import React, { useState } from 'react';
import { PRAYER_STEPS, PRAYER_TYPES, WUDU_STEPS, POST_PRAYER_AMALS } from '../data/prayerGuideData';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Droplets, Activity, BookOpen, Hand, Footprints, Users, Star, Heart } from 'lucide-react';

export default function PrayerLearning() {
  const [activeTab, setActiveTab] = useState<'rakat' | 'steps' | 'wudu' | 'special' | 'amals'>('rakat');
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleStep = (id: string) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  const tabs = [
    { id: 'rakat', label: 'রাকাত ও ওয়াক্ত', icon: Activity },
    { id: 'steps', label: 'নামাজের নিয়ম', icon: Footprints },
    { id: 'wudu', label: 'ওযু', icon: Droplets },
    { id: 'special', label: 'বিশেষ নামাজ', icon: Star },
    { id: 'amals', label: 'মোনাজাত ও আমল', icon: Heart },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
        <h2 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100 mb-2">
          নামাজ শিক্ষা ও গাইড
        </h2>
        <p className="text-stone-500 dark:text-stone-400 font-bengali text-sm">
          সহীহভাবে নামাজ আদায়ের পূর্ণাঙ্গ নির্দেশিকা
        </p>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mt-6 scrollbar-hide">
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
                    : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700"
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
        {/* Rakat & Waqt Tab */}
        {activeTab === 'rakat' && (
          <motion.div
            key="rakat"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {PRAYER_TYPES.filter(p => ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'jummah'].includes(p.id)).map((info) => (
              <div key={info.id} className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-bengali text-stone-800 dark:text-stone-100">{info.name}</h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-bengali">{info.time}</p>
                    </div>
                  </div>
                  <span className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-3 py-1 rounded-full text-xs font-mono font-bold">
                    মোট {info.totalRakats}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {info.rakats.map((rakat, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm border-b border-stone-50 dark:border-stone-800/50 last:border-0 pb-2 last:pb-0">
                      <span className="font-bengali text-stone-600 dark:text-stone-300">{rakat.type}</span>
                      <span className="font-mono font-bold text-stone-900 dark:text-stone-100 bg-stone-50 dark:bg-stone-800 w-6 h-6 flex items-center justify-center rounded-full">
                        {rakat.count}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <p className="text-xs text-stone-500 font-bengali">{info.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Prayer Steps Tab */}
        {activeTab === 'steps' && (
          <motion.div
            key="steps"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {PRAYER_STEPS.map((step) => (
              <div key={step.id} className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 overflow-hidden">
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                      {step.title.split('.')[0]}
                    </div>
                    <h3 className="font-bold font-bengali text-stone-800 dark:text-stone-100 text-lg">
                      {step.title.split('. ')[1]}
                    </h3>
                  </div>
                  {expandedStep === step.id ? (
                    <ChevronUp className="w-5 h-5 text-stone-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-400" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedStep === step.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="p-5 pt-0 border-t border-stone-100 dark:border-stone-800">
                        <p className="text-stone-600 dark:text-stone-300 font-bengali mb-4">
                          {step.description}
                        </p>
                        
                        {step.arabic && (
                          <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl text-center space-y-3">
                            <p className="font-arabic text-2xl leading-loose text-stone-800 dark:text-stone-100">
                              {step.arabic}
                            </p>
                            <div className="space-y-1">
                              <p className="text-sm italic text-stone-500 dark:text-stone-400">
                                {step.transliteration}
                              </p>
                              <p className="text-sm font-bengali text-emerald-600 dark:text-emerald-400 font-medium">
                                {step.translation}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}

        {/* Wudu Tab */}
        {activeTab === 'wudu' && (
          <motion.div
            key="wudu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800"
          >
            <h3 className="text-xl font-bold font-bengali text-stone-800 dark:text-stone-100 mb-6 flex items-center gap-2">
              <Droplets className="w-6 h-6 text-blue-500" />
              ওযুর সঠিক নিয়ম
            </h3>
            
            <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200 dark:before:bg-stone-800">
              {WUDU_STEPS.map((step, idx) => (
                <div key={idx} className="relative flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 font-bold z-10 ring-4 ring-white dark:ring-stone-900">
                    {step.step}
                  </div>
                  <div className="pt-2">
                    <p className="font-bengali text-stone-700 dark:text-stone-300 text-lg">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/30">
              <h4 className="font-bold font-bengali text-amber-800 dark:text-amber-200 mb-2">ওযুর ফরজ ৪টি:</h4>
              <ul className="list-disc list-inside text-amber-700 dark:text-amber-300 font-bengali space-y-1">
                <li>সমস্ত মুখমন্ডল ধোয়া</li>
                <li>দুই হাতের কনুইসহ ধোয়া</li>
                <li>মাথার চার ভাগের এক ভাগ মাসেহ করা</li>
                <li>দুই পায়ের টাকনুসহ ধোয়া</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Special Prayers Tab */}
        {activeTab === 'special' && (
          <motion.div
            key="special"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {PRAYER_TYPES.filter(p => !['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'jummah'].includes(p.id)).map((info) => (
              <div key={info.id} className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-bengali text-stone-800 dark:text-stone-100">{info.name}</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-bengali mt-1">{info.time}</p>
                  </div>
                </div>
                
                <p className="text-stone-600 dark:text-stone-300 font-bengali mb-4 text-sm leading-relaxed">
                  {info.description}
                </p>

                <div className="bg-stone-50 dark:bg-stone-800 p-3 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bengali text-stone-600 dark:text-stone-400">রাকাত সংখ্যা:</span>
                    <span className="font-bold text-stone-800 dark:text-stone-200">{info.totalRakats > 0 ? info.totalRakats : 'নির্দিষ্ট নয়'}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Amals Tab */}
        {activeTab === 'amals' && (
          <motion.div
            key="amals"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {POST_PRAYER_AMALS.map((amal) => (
              <div key={amal.id} className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-bengali text-stone-800 dark:text-stone-100">{amal.title}</h3>
                </div>

                <p className="text-stone-600 dark:text-stone-300 font-bengali mb-4">
                  {amal.description}
                </p>

                {amal.steps && (
                  <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl mb-4">
                    <ul className="list-disc list-inside space-y-2">
                      {amal.steps.map((step, idx) => (
                        <li key={idx} className="text-stone-700 dark:text-stone-300 font-bengali">{step}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {amal.arabic && (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl text-center space-y-3">
                    <p className="font-arabic text-2xl leading-loose text-stone-800 dark:text-stone-100">
                      {amal.arabic}
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm italic text-stone-500 dark:text-stone-400">
                        {amal.transliteration}
                      </p>
                      <p className="text-sm font-bengali text-emerald-600 dark:text-emerald-400 font-medium">
                        {amal.translation}
                      </p>
                    </div>
                  </div>
                )}

                {amal.note && (
                  <p className="text-xs text-stone-500 dark:text-stone-400 italic mt-4 border-t border-stone-100 dark:border-stone-800 pt-2">
                    * {amal.note}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
