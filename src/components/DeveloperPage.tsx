import React, { useState } from 'react';
import { MoreVertical, X, MessageCircle, Facebook, Phone, User, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import IslamicAI from './IslamicAI';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function DeveloperPage() {
  const [showAI, setShowAI] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 lg:p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center gap-4 bg-stone-50 dark:bg-stone-900">
          <button 
            onClick={() => showAI ? setShowAI(false) : navigate(-1)}
            className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h3 className="font-bold font-bengali text-lg text-stone-800 dark:text-stone-100">
            {showAI ? 'ইসলামিক অ্যাসিস্ট্যান্ট' : 'ডেভেলপার তথ্য'}
          </h3>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[60vh]">
          {showAI ? (
            <div className="flex flex-col h-[600px] gap-4">
              <div className="flex-1 min-h-0">
                <IslamicAI />
              </div>
            </div>
          ) : (
            <div className="space-y-8 text-center py-8">
              <div className="space-y-4">
                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400 ring-4 ring-emerald-50 dark:ring-emerald-900/10">
                  <User className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">
                    MD SOYEB ONLINE EXPERTS
                  </h2>
                  <p className="text-stone-500 dark:text-stone-400 font-bengali mt-1">
                    লিড ডেভেলপার ও প্রতিষ্ঠাতা
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                  <span className="font-medium">ফেসবুক</span>
                </a>
                <a 
                  href="https://wa.me/8801924711844" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                >
                  <Phone className="w-6 h-6" />
                  <span className="font-medium">হোয়াটসঅ্যাপ</span>
                </a>
              </div>

              <div className="pt-8 border-t border-stone-100 dark:border-stone-800 max-w-md mx-auto">
                <button
                  onClick={() => setShowAI(true)}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
                >
                  <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
                  <div className="text-left">
                    <div className="text-sm font-normal opacity-90">কোনো প্রশ্ন আছে?</div>
                    <div className="text-lg">ইসলামিক এআই (AI)</div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
