import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Coins, RefreshCcw, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ZakatCalculator() {
  const [assets, setAssets] = useState({
    cash: 0,
    gold: 0, // in grams
    silver: 0, // in grams
    business: 0,
    other: 0,
    liabilities: 0
  });

  const [prices, setPrices] = useState({
    gold: 9500, // Price per gram in BDT (Approx)
    silver: 120 // Price per gram in BDT (Approx)
  });

  const handleInputChange = (field: keyof typeof assets, value: string) => {
    const numValue = parseFloat(value) || 0;
    setAssets(prev => ({ ...prev, [field]: numValue }));
  };

  // Nisab Thresholds (Approximate)
  const GOLD_NISAB_GRAMS = 87.48;
  const SILVER_NISAB_GRAMS = 612.36;

  const totalAssets = 
    assets.cash + 
    (assets.gold * prices.gold) + 
    (assets.silver * prices.silver) + 
    assets.business + 
    assets.other;

  const netAssets = totalAssets - assets.liabilities;
  
  // Nisab value based on Silver (safer for poor)
  const nisabValue = SILVER_NISAB_GRAMS * prices.silver;
  
  const isEligible = netAssets >= nisabValue;
  const zakatAmount = isEligible ? (netAssets * 0.025) : 0;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-bengali mb-2">যাকাত ক্যালকুলেটর</h1>
          <p className="text-emerald-100 font-bengali">
            আপনার সম্পদের সঠিক যাকাত হিসাব করুন
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
            <h3 className="text-lg font-bold font-bengali text-stone-800 dark:text-stone-100 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-500" />
              সম্পদের বিবরণ (টাকায়)
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-1 font-bengali">
                  নগদ টাকা ও ব্যাংক ব্যালেন্স
                </label>
                <input
                  type="number"
                  value={assets.cash || ''}
                  onChange={(e) => handleInputChange('cash', e.target.value)}
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-emerald-500/20 outline-none font-mono"
                  placeholder="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-1 font-bengali">
                    স্বর্ণ (গ্রাম)
                  </label>
                  <input
                    type="number"
                    value={assets.gold || ''}
                    onChange={(e) => handleInputChange('gold', e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-emerald-500/20 outline-none font-mono"
                    placeholder="0"
                  />
                  <p className="text-[10px] text-stone-400 mt-1">১ ভরি = ১১.৬৬ গ্রাম</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-1 font-bengali">
                    রৌপ্য (গ্রাম)
                  </label>
                  <input
                    type="number"
                    value={assets.silver || ''}
                    onChange={(e) => handleInputChange('silver', e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-emerald-500/20 outline-none font-mono"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-1 font-bengali">
                  ব্যবসায়িক পণ্য ও শেয়ার
                </label>
                <input
                  type="number"
                  value={assets.business || ''}
                  onChange={(e) => handleInputChange('business', e.target.value)}
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-emerald-500/20 outline-none font-mono"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 dark:text-stone-400 mb-1 font-bengali">
                  ঋণ বা দেনা (বিয়োগ হবে)
                </label>
                <input
                  type="number"
                  value={assets.liabilities || ''}
                  onChange={(e) => handleInputChange('liabilities', e.target.value)}
                  className="w-full p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 focus:ring-2 focus:ring-red-500/20 outline-none font-mono"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/30 flex gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-200 font-bengali">
              বর্তমান বাজার দর অনুযায়ী স্বর্ণ ও রৌপ্যের মূল্য ধরা হয়েছে। আপনি চাইলে সেটিংসে গিয়ে এটি পরিবর্তন করতে পারেন।
            </p>
          </div>
        </div>

        {/* Result Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 h-full flex flex-col justify-center">
            <h3 className="text-lg font-bold font-bengali text-stone-800 dark:text-stone-100 mb-6 text-center">
              ফলাফল
            </h3>

            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-stone-50 dark:bg-stone-800 rounded-xl">
                <span className="text-stone-600 dark:text-stone-400 font-bengali">মোট সম্পদ</span>
                <span className="font-mono font-bold text-lg text-stone-800 dark:text-stone-100">
                  ৳ {totalAssets.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-stone-50 dark:bg-stone-800 rounded-xl">
                <span className="text-stone-600 dark:text-stone-400 font-bengali">নিসাব পরিমাণ (রৌপ্য)</span>
                <span className="font-mono font-bold text-lg text-stone-800 dark:text-stone-100">
                  ৳ {nisabValue.toLocaleString()}
                </span>
              </div>

              <div className={cn(
                "p-6 rounded-2xl text-center border-2 transition-all",
                isEligible 
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500" 
                  : "bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700"
              )}>
                <p className="text-sm font-bold font-bengali mb-2 uppercase tracking-wider text-stone-500">
                  প্রদেয় যাকাত
                </p>
                <h2 className={cn(
                  "text-4xl font-bold font-mono mb-2",
                  isEligible ? "text-emerald-600 dark:text-emerald-400" : "text-stone-400"
                )}>
                  ৳ {zakatAmount.toLocaleString()}
                </h2>
                <p className={cn(
                  "text-sm font-bengali",
                  isEligible ? "text-emerald-600" : "text-stone-400"
                )}>
                  {isEligible ? 'আপনার ওপর যাকাত ফরজ হয়েছে' : 'আপনার ওপর যাকাত ফরজ নয়'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
