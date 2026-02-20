import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Smartphone, ChevronLeft, Edit2, History, Hand } from 'lucide-react';
import { cn, toBengaliNumber } from '../lib/utils';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Tasbeeh() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(99);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [beadTheme, setBeadTheme] = useState('linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)'); // Purple default
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [tempTarget, setTempTarget] = useState('99');
  
  const controls = useAnimation();
  const beadContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Load saved state
  useEffect(() => {
    setMounted(true);
    const savedCount = localStorage.getItem('tasbeeh-count');
    const savedTarget = localStorage.getItem('tasbeeh-target');
    if (savedCount) setCount(parseInt(savedCount));
    if (savedTarget) setTarget(parseInt(savedTarget));
  }, []);

  // Save state
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('tasbeeh-count', count.toString());
      localStorage.setItem('tasbeeh-target', target.toString());
    }
  }, [count, target, mounted]);

  const handleCount = async () => {
    const newCount = count + 1;
    setCount(newCount);
    
    // Vibration
    if (vibrationEnabled && navigator.vibrate) {
      if (newCount % target === 0) {
        navigator.vibrate([100, 50, 100]); 
      } else {
        navigator.vibrate(30); 
      }
    }

    // Animate beads
    await controls.start({
      x: -60,
      transition: { duration: 0.15, ease: "easeOut" }
    });
    controls.set({ x: 0 });
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -30) { // Swipe left
      handleCount();
    }
  };

  const resetCount = () => {
    if (confirm('আপনি কি গণনা রিসেট করতে চান?')) {
      setCount(0);
      if (vibrationEnabled && navigator.vibrate) navigator.vibrate(50);
    }
  };

  const beadThemes = [
    { id: 'purple', bg: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', name: 'Purple' },
    { id: 'emerald', bg: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', name: 'Emerald' },
    { id: 'blue', bg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', name: 'Blue' },
    { id: 'amber', bg: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)', name: 'Amber' },
    { id: 'rose', bg: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)', name: 'Rose' },
    { id: 'stone', bg: 'linear-gradient(135deg, #57534e 0%, #292524 100%)', name: 'Stone' },
    { id: 'wood', bg: 'linear-gradient(135deg, #a16207 0%, #713f12 100%)', name: 'Wood' },
    { id: 'pearl', bg: 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)', name: 'Pearl' },
  ];

  // Generate visible beads
  const beads = Array.from({ length: 8 }).map((_, i) => i);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-stone-50 dark:bg-stone-950 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm">
      {/* Header */}
      <div className="bg-emerald-500 text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-20 shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-emerald-600 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold font-bengali">তাসবীহ গণনা</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Count Display */}
        <div className="p-8 flex justify-between items-start">
          <div className="flex items-end gap-2">
            <span className="text-6xl font-bold font-mono text-stone-800 dark:text-stone-100">
              {toBengaliNumber(count)}
            </span>
            <span className="text-3xl text-stone-400 font-mono mb-2">
              / {isEditingTarget ? (
                <input 
                  type="number" 
                  value={tempTarget}
                  onChange={(e) => setTempTarget(e.target.value)}
                  onBlur={() => {
                    setTarget(parseInt(tempTarget) || 99);
                    setIsEditingTarget(false);
                  }}
                  autoFocus
                  className="w-16 bg-transparent border-b border-stone-300 focus:outline-none"
                />
              ) : (
                <span onClick={() => setIsEditingTarget(true)} className="cursor-pointer flex items-center gap-1">
                  {toBengaliNumber(target)}
                  <Edit2 className="w-4 h-4 opacity-50" />
                </span>
              )}
            </span>
          </div>
          
          <div className="flex gap-2">
             <div className="bg-white dark:bg-stone-800 px-3 py-1 rounded shadow-sm text-xs font-bengali text-stone-600 dark:text-stone-300">
               বাম
             </div>
             <div className="bg-white dark:bg-stone-800 px-3 py-1 rounded shadow-sm text-xs font-bengali text-stone-600 dark:text-stone-300">
               নিচে
             </div>
          </div>
        </div>

        {/* Bead String Visualization */}
        <div className="absolute top-1/3 left-0 right-0 h-40 flex items-center justify-center pointer-events-none">
           {/* String Line */}
           <svg className="absolute w-full h-full" preserveAspectRatio="none">
             <path d="M0,100 Q150,20 400,100 T800,100" fill="none" stroke="#14b8a6" strokeWidth="2" className="opacity-50" />
           </svg>
        </div>

        {/* Swipe Area & Beads */}
        <div 
          className="flex-1 flex flex-col items-center justify-center relative z-10"
          ref={beadContainerRef}
        >
          <motion.div 
            className="flex items-center gap-4 absolute top-1/3 left-1/2 -translate-y-1/2"
            style={{ x: -100 }} // Initial offset to center
            animate={controls}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }} // Lock drag to detect swipe only
            onDragEnd={handleDragEnd}
          >
            {/* Render a long chain of beads */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i}
                className="w-16 h-16 rounded-full shadow-xl shrink-0 transform transition-transform"
                style={{ 
                  background: beadTheme,
                  boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.3), 5px 5px 15px rgba(0,0,0,0.2)'
                }}
              />
            ))}
          </motion.div>

          {/* Swipe Instruction */}
          <div className="mt-40 flex flex-col items-center text-stone-400 animate-pulse pointer-events-none select-none">
            <Hand className="w-10 h-10 mb-2 rotate-12" />
            <span className="font-bengali text-sm">বামে সোয়াইপ করুন</span>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="bg-white dark:bg-stone-900 p-6 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-20">
          {/* Themes */}
          <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
            {beadThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setBeadTheme(theme.bg)}
                className={cn(
                  "w-10 h-10 rounded-full shrink-0 border-2 transition-all",
                  beadTheme === theme.bg ? "border-emerald-500 scale-110" : "border-transparent opacity-70 hover:opacity-100"
                )}
                style={{ background: theme.bg }}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setVibrationEnabled(!vibrationEnabled)}
              className={cn(
                "flex items-center justify-center gap-2 py-3 rounded-xl font-bengali text-sm font-medium transition-colors",
                vibrationEnabled 
                  ? "bg-stone-800 text-white dark:bg-stone-700" 
                  : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
              )}
            >
              <Smartphone className="w-4 h-4" />
              {vibrationEnabled ? 'কম্পন চালু' : 'কম্পন বন্ধ'}
            </button>

            <button 
              onClick={resetCount}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors font-bengali text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              পুনরায়
            </button>
          </div>
          
          <div className="mt-4">
             <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-bengali text-sm font-medium">
               <History className="w-4 h-4" />
               মেমো / ইতিহাস
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
