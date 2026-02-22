import React from 'react';
import { motion } from 'framer-motion';
import { Github, Globe, Mail, Code, User, Award, Star, ExternalLink, Heart, Coffee, Facebook, Linkedin, Twitter, Send, Sparkles, Zap, Shield, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';

export default function DeveloperPage() {
  const skills = [
    { name: 'React & Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'UI/UX Design', level: 88 },
    { name: 'Islamic Knowledge', level: 80 },
  ];

  const features = [
    {
      title: 'Advanced AI',
      description: 'Powered by Gemini for accurate Islamic Q&A.',
      icon: Sparkles,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Smart Prayer Times',
      description: 'Location-based accurate timings with auto-detection.',
      icon: Clock,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      title: 'Quran & Hadith',
      description: 'Digital Quran with translations and authentic Hadith collections.',
      icon: BookOpen,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Offline Capable',
      description: 'PWA support for seamless offline access.',
      icon: Smartphone,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    }
  ];

  const contactLinks = [
    {
      name: 'Email',
      icon: Mail,
      value: 'contact@example.com',
      href: 'mailto:contact@example.com',
      color: 'bg-red-500',
      textColor: 'text-red-500'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      value: 'MD SOYEB',
      href: 'https://facebook.com',
      color: 'bg-blue-600',
      textColor: 'text-blue-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      value: 'MD SOYEB',
      href: 'https://linkedin.com',
      color: 'bg-blue-700',
      textColor: 'text-blue-700'
    },
    {
      name: 'GitHub',
      icon: Github,
      value: '@soyeb',
      href: 'https://github.com',
      color: 'bg-stone-800',
      textColor: 'text-stone-800 dark:text-white'
    }
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-stone-900 shadow-xl border border-stone-100 dark:border-stone-800 p-8 md:p-12">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Profile Image with Glow */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-stone-800 shadow-2xl bg-white dark:bg-stone-800">
              <img 
                src="/developer.svg" 
                alt="MD SOYEB" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300';
                }}
              />
            </div>
            <div className="absolute bottom-2 right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-3 rounded-full shadow-lg border-4 border-white dark:border-stone-800">
              <Code className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Info */}
          <div className="text-center md:text-left space-y-6 flex-1">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4"
              >
                <Star className="w-3 h-3 fill-current" />
                Lead Developer & Creator
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-stone-800 dark:text-stone-100 font-bengali mb-2">
                MD SOYEB
              </h1>
              <p className="text-xl text-stone-500 dark:text-stone-400 font-medium bg-clip-text text-transparent bg-gradient-to-r from-stone-600 to-stone-400 dark:from-stone-300 dark:to-stone-500">
                Full Stack Developer & UI/UX Designer
              </p>
            </div>

            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-lg font-bengali">
              আসসালামু আলাইকুম! আমি একজন প্যাশনেট ডেভেলপার। প্রযুক্তির মাধ্যমে মানুষের জীবন সহজ করা এবং দ্বীনি খিদমত করাই আমার লক্ষ্য। 
              এই অ্যাপটি আধুনিক টেকনোলজি এবং ইসলামিক মূল্যবোধের এক অনন্য সংমিশ্রণ।
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-stone-900 text-white hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl active:scale-95">
                <Globe className="w-5 h-5" />
                Portfolio
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-xl active:scale-95">
                <Send className="w-5 h-5" />
                Hire Me
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 bg-white dark:bg-stone-900 p-8 rounded-[2rem] shadow-sm border border-stone-100 dark:border-stone-800"
        >
          <h3 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100 mb-8 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600">
              <Mail className="w-6 h-6" />
            </div>
            যোগাযোগ করুন
          </h3>
          <div className="space-y-4">
            {contactLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:bg-white dark:hover:bg-stone-800 border border-transparent hover:border-stone-200 dark:hover:border-stone-700 hover:shadow-md transition-all group"
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110", link.color)}>
                  <link.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">{link.name}</p>
                  <p className={cn("font-bold font-mono", link.textColor, "dark:text-stone-200")}>{link.value}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-stone-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Features & Skills */}
        <div className="lg:col-span-2 space-y-8">
          {/* App Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-stone-900 p-8 rounded-[2rem] shadow-sm border border-stone-100 dark:border-stone-800"
          >
            <h3 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100 mb-8 flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600">
                <Zap className="w-6 h-6" />
              </div>
              প্রজেক্ট হাইলাইট
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", feature.bg, feature.color)}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 dark:text-stone-200 mb-1">{feature.title}</h4>
                    <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-stone-900 dark:bg-black text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
            
            <h3 className="text-xl font-bold font-bengali mb-6 flex items-center gap-2 relative z-10">
              <Award className="w-5 h-5 text-emerald-400" />
              টেকনিক্যাল দক্ষতা
            </h3>
            <div className="space-y-5 relative z-10">
              {skills.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-stone-300">{skill.name}</span>
                    <span className="text-emerald-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Credit */}
      <div className="text-center pt-8 border-t border-stone-200 dark:border-stone-800">
        <p className="text-stone-500 dark:text-stone-400 font-bengali text-sm flex items-center justify-center gap-2">
          Developed with <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> by <span className="font-bold text-stone-800 dark:text-stone-200">MD SOYEB</span>
        </p>
        <p className="text-stone-400 dark:text-stone-500 text-xs mt-2">
          © {new Date().getFullYear()} Islamic Companion. All rights reserved.
        </p>
      </div>
    </div>
  );
}

import { BookOpen, Clock } from 'lucide-react';
