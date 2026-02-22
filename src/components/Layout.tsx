import React, { useState, useEffect } from 'react';
import { Moon, Sun, BookOpen, Clock, Home, Menu, X, Heart, Activity, Calendar, AlignCenter, Star, Brain, MessageSquare, Baby, Grid, Calculator, Sparkles, Info, Crown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import MoreMenu from './MoreMenu';
import DeveloperMenu from './DeveloperMenu';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();

  // Dynamic Background Logic
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'day' | 'afternoon' | 'night'>('day');

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 7) setTimeOfDay('morning'); // Fajr/Sunrise
      else if (hour >= 7 && hour < 16) setTimeOfDay('day'); // Day
      else if (hour >= 16 && hour < 19) setTimeOfDay('afternoon'); // Asr/Maghrib
      else setTimeOfDay('night'); // Night
    };
    
    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const allNavItems = [
    { path: '/', label: 'হোম', icon: Home },
    { path: '/prayer-info', label: 'নামাজ', icon: Activity },
    { path: '/quran', label: 'কুরআন', icon: BookOpen },
    { path: '/ramadan', label: 'রমজান', icon: Moon },
    { path: '/daily', label: 'নিত্যদিন', icon: Heart },
    { path: '/life-cycle', label: 'জীবন চক্র', icon: Baby },
    { path: '/names-of-allah', label: '৯৯ নাম', icon: Sparkles },
    { path: '/zakat', label: 'যাকাত', icon: Calculator },
    { path: '/tasbeeh', label: 'তাসবীহ', icon: AlignCenter },
    { path: '/events', label: 'ইভেন্ট', icon: Star },
    { path: '/quiz', label: 'কুইজ', icon: Brain },
    { path: '/bookmarks', label: 'বুকমার্ক', icon: Heart },
    { path: '/community', label: 'কমিউনিটি', icon: MessageSquare },
    { path: '/developer', label: 'ডেভলপার', icon: Info },
  ];

  // Items to show on the bottom bar (max 4 + More button)
  const bottomNavItems = allNavItems.slice(0, 4);
  const moreNavItems = allNavItems.slice(4);

  // Background gradients based on time
  const bgGradients = {
    morning: "bg-gradient-to-br from-orange-50 to-sky-100 dark:from-slate-900 dark:to-slate-800",
    day: "bg-stone-50 dark:bg-stone-950",
    afternoon: "bg-gradient-to-br from-amber-50 to-orange-100 dark:from-stone-900 dark:to-stone-800",
    night: "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" 
  };

  return (
    <div className={cn("min-h-screen font-sans transition-colors duration-500", bgGradients[timeOfDay])}>
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm bg-white">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = '/icon-192.png'} />
          </div>
          <div>
            <h1 className="text-lg font-bold font-bengali text-stone-800 dark:text-stone-100 leading-none">ইসলামিক</h1>
            <h1 className="text-sm font-bold font-bengali text-emerald-600 dark:text-emerald-500 leading-none">কম্প্যানিয়ন</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link 
            to="/developer" 
            className="relative group p-2 rounded-full overflow-hidden transition-all duration-300 hover:scale-110"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-blue-500 opacity-10 group-hover:opacity-20 transition-opacity" />
            <Crown className="w-6 h-6 text-emerald-600 dark:text-emerald-400 drop-shadow-sm" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </Link>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors">
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div className="flex pb-24 lg:pb-0">
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:flex fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex-col shadow-xl">
          <div className="p-6 flex items-center gap-3 border-b border-stone-100 dark:border-stone-800">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500 bg-white">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = '/icon-192.png'} />
            </div>
            <div>
              <h1 className="text-lg font-bold font-bengali text-stone-800 dark:text-stone-100 leading-none">ইসলামিক</h1>
              <h1 className="text-sm font-bold font-bengali text-emerald-600 dark:text-emerald-500 leading-none">কম্প্যানিয়ন</h1>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bengali group",
                    isActive 
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm" 
                      : "hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 hover:translate-x-1"
                  )}
                >
                  <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-emerald-600 dark:text-emerald-400" : "text-stone-400 group-hover:text-emerald-500")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-white dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 transition-all font-bengali shadow-sm border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>{isDarkMode ? 'লাইট মোড' : 'ডার্ক মোড'}</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 w-full max-w-7xl mx-auto lg:ml-64 min-h-[80vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-stone-900/90 backdrop-blur-lg border-t border-stone-200 dark:border-stone-800 z-50 px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-20">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all duration-300 tap-highlight-transparent",
                  isActive ? "text-emerald-600 dark:text-emerald-400 -translate-y-1" : "text-stone-400 dark:text-stone-500"
                )}
              >
                <div className={cn(
                  "p-2 rounded-2xl transition-all duration-300",
                  isActive && "bg-emerald-50 dark:bg-emerald-900/20 shadow-sm ring-1 ring-emerald-100 dark:ring-emerald-900/30"
                )}>
                  <Icon className={cn("w-6 h-6 transition-transform", isActive && "scale-110")} />
                </div>
                <span className={cn(
                  "text-[10px] font-bengali font-medium transition-all",
                  isActive ? "font-bold" : "font-normal"
                )}>{item.label}</span>
              </Link>
            );
          })}
          
          {/* More Button */}
          <button
            onClick={() => setIsMoreMenuOpen(true)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all duration-300 tap-highlight-transparent",
              isMoreMenuOpen ? "text-emerald-600 dark:text-emerald-400 -translate-y-1" : "text-stone-400 dark:text-stone-500"
            )}
          >
            <div className={cn(
              "p-2 rounded-2xl transition-all duration-300",
              isMoreMenuOpen && "bg-emerald-50 dark:bg-emerald-900/20 shadow-sm ring-1 ring-emerald-100 dark:ring-emerald-900/30"
            )}>
              <Grid className={cn("w-6 h-6 transition-transform", isMoreMenuOpen && "scale-110")} />
            </div>
            <span className={cn(
              "text-[10px] font-bengali font-medium transition-all",
              isMoreMenuOpen ? "font-bold" : "font-normal"
            )}>আরও</span>
          </button>
        </div>
      </nav>

      {/* More Menu Modal */}
      <AnimatePresence>
        {isMoreMenuOpen && (
          <MoreMenu 
            isOpen={isMoreMenuOpen} 
            onClose={() => setIsMoreMenuOpen(false)} 
            items={moreNavItems} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
