import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Facebook, Phone, User, Globe, Code, Palette, Smartphone, Mail, MapPin, Award, Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import IslamicAI from './IslamicAI';
import { useNavigate } from 'react-router-dom';

export default function DeveloperPage() {
  const [showAI, setShowAI] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 lg:p-8 pb-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => showAI ? setShowAI(false) : navigate(-1)}
            className="p-3 bg-white dark:bg-stone-900 rounded-full shadow-sm hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-stone-600 dark:text-stone-300" />
          </button>
          <h1 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100">
            {showAI ? 'ইসলামিক অ্যাসিস্ট্যান্ট' : 'ডেভেলপার পরিচিতি'}
          </h1>
        </div>

        {showAI ? (
          <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 overflow-hidden h-[600px]">
            <IslamicAI />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Developer Profile Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-stone-900 rounded-3xl shadow-xl border border-stone-100 dark:border-stone-800 overflow-hidden relative"
            >
              {/* Cover Banner */}
              <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pattern-grid-lg" />
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                  <div className="w-32 h-32 bg-white dark:bg-stone-900 rounded-full p-2 shadow-xl">
                    <div className="w-full h-full bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center overflow-hidden">
                      <User className="w-16 h-16 text-stone-400" />
                      {/* Placeholder for developer image if available */}
                      {/* <img src="/developer.jpg" alt="MD SOYEB" className="w-full h-full object-cover" /> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-20 pb-8 px-6 text-center">
                <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 font-bengali mb-1">
                  MD SOYEB
                </h2>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-4">
                  Full Stack Developer & UI/UX Designer
                </p>
                
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-full text-xs font-medium flex items-center gap-1">
                    <Code className="w-3 h-3" /> Web Development
                  </span>
                  <span className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-full text-xs font-medium flex items-center gap-1">
                    <Palette className="w-3 h-3" /> UI Design
                  </span>
                  <span className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-full text-xs font-medium flex items-center gap-1">
                    <Smartphone className="w-3 h-3" /> App Development
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 p-3 rounded-xl bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors font-medium"
                  >
                    <Facebook className="w-5 h-5" />
                    Facebook
                  </a>
                  <a 
                    href="https://wa.me/8801924711844" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 p-3 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>

                <div className="text-stone-600 dark:text-stone-400 font-bengali leading-relaxed max-w-xl mx-auto">
                  আসসালামু আলাইকুম, আমি মোঃ শোয়েব। আমি একজন প্যাশনেট ওয়েব এবং অ্যাপ ডেভেলপার। 
                  আধুনিক প্রযুক্তি ব্যবহার করে মানুষের উপকারে আসে এমন কিছু তৈরি করাই আমার লক্ষ্য। 
                  এই অ্যাপটি তৈরি করার উদ্দেশ্য হলো প্রযুক্তির মাধ্যমে দ্বীনি জ্ঞান অর্জন সহজ করা।
                </div>
              </div>
            </motion.div>

            {/* App Info Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-stone-900 rounded-3xl shadow-xl border border-stone-100 dark:border-stone-800 p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold font-bengali text-stone-800 dark:text-stone-100 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-500" />
                প্রজেক্ট সম্পর্কে
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                      <Star className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800 dark:text-stone-100 font-bengali">উদ্দেশ্য</h4>
                      <p className="text-sm text-stone-500 dark:text-stone-400 font-bengali mt-1">
                        সহজ ও সুন্দরভাবে ইসলামিক রিসোর্স মানুষের কাছে পৌঁছে দেওয়া।
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                      <Code className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800 dark:text-stone-100 font-bengali">প্রযুক্তি</h4>
                      <p className="text-sm text-stone-500 dark:text-stone-400 font-bengali mt-1">
                        React, TypeScript, Tailwind CSS, PWA, Google Gemini AI.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl p-4 border border-stone-100 dark:border-stone-800">
                  <h4 className="font-bold text-stone-800 dark:text-stone-100 font-bengali mb-3 text-center">
                    ক্রেডিট
                  </h4>
                  <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400 font-bengali">
                    <li className="flex justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                      <span>কনসেপ্ট ও ডিজাইন</span>
                      <span className="font-bold text-stone-800 dark:text-stone-200">MD SOYEB</span>
                    </li>
                    <li className="flex justify-between pt-1">
                      <span>ডেভেলপমেন্ট</span>
                      <span className="font-bold text-stone-800 dark:text-stone-200">MD SOYEB</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* AI Assistant CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setShowAI(true)}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-3 group"
            >
              <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
              <div className="text-left">
                <div className="text-xs font-normal opacity-90">কোনো প্রশ্ন বা মতামত?</div>
                <div className="text-lg">ইসলামিক এআই-এর সাথে কথা বলুন</div>
              </div>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
