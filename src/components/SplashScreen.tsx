import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Show splash for 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 overflow-hidden">
      {/* Background Stars Animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            initial={{
              opacity: 0.1,
              scale: Math.random() * 0.5 + 0.5,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
            }}
          />
        ))}
      </div>

      {/* Logo Animation */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-4 mb-6 shadow-2xl ring-4 ring-emerald-500/20 flex items-center justify-center">
           <img 
             src="/logo.png" 
             alt="Islamic Companion Logo" 
             className="w-full h-full object-contain drop-shadow-lg"
             onError={(e) => e.currentTarget.src = '/icon-192.png'}
           />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white font-bengali text-center"
        >
          ইসলামিক <span className="text-emerald-400">কম্প্যানিয়ন</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-slate-400 mt-2 font-bengali text-sm md:text-base"
        >
          আপনার দৈনন্দিন ইবাদতের সাথী
        </motion.p>
      </motion.div>

      {/* Loading Indicator */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        transition={{ delay: 0.5, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-20 h-1 bg-emerald-500 rounded-full"
      />
    </div>
  );
}
