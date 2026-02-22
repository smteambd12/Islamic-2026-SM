import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Code, Star, Heart, Shield, Zap, Smartphone, Globe, Award, Sparkles, Fingerprint } from 'lucide-react';
import { cn } from '../lib/utils';

export default function DeveloperPage() {
  const whatsappNumber = "01924711844";
  const whatsappLink = `https://wa.me/88${whatsappNumber}`;

  const features = [
    {
      title: 'নির্ভুল ওয়াক্ত',
      desc: 'আপনার লোকেশন অনুযায়ী নামাজের সঠিক সময়সূচী',
      icon: ClockIcon,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      title: 'কুরআন ও হাদিস',
      desc: 'ডিজিটাল কুরআন, তাফসীর এবং বিশুদ্ধ হাদিস ভাণ্ডার',
      icon: BookIcon,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'জীবন ঘনিষ্ঠ',
      desc: 'দৈনন্দিন জীবনের মাসআলা, দোয়া এবং আমল',
      icon: Heart,
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-900/20'
    },
    {
      title: 'আধুনিক প্রযুক্তি',
      desc: 'AI এবং স্মার্ট অ্যালগরিদম দ্বারা চালিত',
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    }
  ];

  return (
    <div className="space-y-12 pb-24">
      {/* Advanced Hero Section */}
      <div className="relative overflow-hidden rounded-[3rem] bg-stone-900 text-white shadow-2xl">
        {/* Abstract Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        </div>

        <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          {/* Developer Image with Advanced Frame */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1.5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 blur-sm opacity-60" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl bg-stone-800">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiDL-3YjPj-SqLMaayWnpARNosyKz9Td8AtYX8iUfoLHRevex0JQqdowkUsb7f0qnGavT9OUcrS7IQ8EFF7yOP8BSr2OfyA7WQL5FEyLIdqVIbb_V1CckmjlIu9F1n_Akr3_5wOrEsDEZRRFyvcu80wWEaVbJoYtGEQZTK3yEFXyzJsM9StnjukId1JV4EA/s3454/10321.png" 
                alt="MD SOYEB" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-white text-stone-900 p-4 rounded-2xl shadow-xl flex items-center gap-3"
            >
              <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Creator</p>
                <p className="font-bold font-bengali text-lg">MD SOYEB</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-emerald-300 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span>Lead Developer & Founder</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-bengali bg-clip-text text-transparent bg-gradient-to-r from-white via-stone-200 to-stone-400">
              MD SOYEB
            </h1>
            
            <p className="text-xl text-stone-300 font-bengali leading-relaxed max-w-2xl">
              "প্রযুক্তির উৎকর্ষতাকে কাজে লাগিয়ে দ্বীনি খিদমত এবং মুসলিম উম্মাহর দৈনন্দিন জীবনকে সহজ ও সুন্দর করার লক্ষ্যেই এই প্ল্যাটফর্মটির যাত্রা।"
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1 group"
              >
                <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
                <span>WhatsApp: {whatsappNumber}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Project Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-stone-900 p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-stone-100 dark:border-stone-800"
          >
            <h2 className="text-3xl font-bold font-bengali text-stone-800 dark:text-stone-100 mb-6 flex items-center gap-3">
              <Fingerprint className="w-8 h-8 text-emerald-500" />
              প্রজেক্ট সম্পর্কে বিস্তারিত
            </h2>
            <div className="prose dark:prose-invert max-w-none text-stone-600 dark:text-stone-300 font-bengali text-lg leading-loose space-y-4">
              <p>
                <strong className="text-emerald-600 dark:text-emerald-400">ইসলামিক কম্প্যানিয়ন</strong> হলো একটি পূর্ণাঙ্গ ডিজিটাল ইসলামিক লাইফস্টাইল প্ল্যাটফর্ম। আধুনিক ব্যস্ত জীবনে একজন মুমিনের জন্য প্রয়োজনীয় সকল দ্বীনি উপকরণ এক জায়গায় নিয়ে আসার লক্ষ্যেই এটি তৈরি করেছেন <strong className="text-stone-900 dark:text-white">MD SOYEB</strong>।
              </p>
              <p>
                এই ওয়েব অ্যাপলিকেশনটি তৈরি করার মূল উদ্দেশ্য হলো প্রযুক্তির সর্বোচ্চ ব্যবহার নিশ্চিত করে ইসলামের শাশ্বত বাণী সবার কাছে পৌঁছে দেওয়া। এখানে আপনি পাচ্ছেন নামাজের সঠিক সময়, কুরআনের ডিজিটাল সংস্করণ, দৈনন্দিন জীবনের দোয়া, যাকাত ক্যালকুলেটর এবং আরও অনেক কিছু।
              </p>
              <p>
                এটি সম্পূর্ণ বিজ্ঞাপনমুক্ত এবং ব্যবহারকারীদের গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ। সদকায়ে জারিয়া হিসেবে এই প্রজেক্টটি তৈরি করা হয়েছে, যাতে মানুষ উপকৃত হতে পারে এবং এর সওয়াব মহান আল্লাহর দরবারে কবুল হয়।
              </p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-stone-900 p-6 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 flex items-start gap-4 hover:shadow-md transition-all"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", item.bg, item.color)}>
                  <item.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-bengali text-stone-800 dark:text-stone-100 mb-1">{item.title}</h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 font-bengali">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-stone-900 to-stone-800 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
            
            <h3 className="text-xl font-bold font-bengali mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-400" />
              ডেভলপার পরিচিতি
            </h3>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider">Name</p>
                  <p className="font-bold text-lg">MD SOYEB</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-blue-400">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider">Role</p>
                  <p className="font-bold text-lg">Full Stack Developer</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-green-400">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider">Contact</p>
                  <p className="font-bold text-lg font-mono">{whatsappNumber}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-sm text-stone-400 font-bengali text-center leading-relaxed">
                "যেকোনো পরামর্শ, মতামত বা কারিগরি সহায়তার জন্য সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন।"
              </p>
            </div>
          </motion.div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-800/30 text-center">
            <p className="text-emerald-800 dark:text-emerald-200 font-bengali font-medium">
              © {new Date().getFullYear()} All Rights Reserved by <br/>
              <span className="font-bold text-lg">MD SOYEB</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
  );
}
