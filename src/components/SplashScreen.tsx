import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Star } from 'lucide-react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#1a1a2e] flex items-center justify-center z-50 overflow-hidden">
      {/* Background Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          initial={{ 
            opacity: 0, 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          style={{ width: Math.random() * 4 + 1, height: Math.random() * 4 + 1 }}
        />
      ))}

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="w-32 h-32 mx-auto mb-6 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)]"
        >
          <div className="relative">
            <Moon className="w-16 h-16 text-white fill-current" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <Star className="w-8 h-8 text-yellow-300 fill-current" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl font-bold text-white font-bengali mb-2"
        >
          ইসলামিক কম্প্যানিয়ন
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-emerald-200/80 font-bengali text-lg"
        >
          আপনার প্রতিদিনের ইবাদতের সঙ্গী
        </motion.p>
      </div>
    </div>
  );
}
