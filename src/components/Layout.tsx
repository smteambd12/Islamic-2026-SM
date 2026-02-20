import React, { useState, useEffect } from 'react';
import { Moon, Sun, BookOpen, Clock, Home, Menu, X, Heart, Activity, Calendar, AlignCenter, Star, Brain } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
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

  const navItems = [
    { path: '/', label: 'হোম', icon: Home },
    { path: '/ramadan', label: 'রমজান', icon: Moon },
    { path: '/quran', label: 'কুরআন', icon: BookOpen },
    { path: '/prayer-info', label: 'নামাজ', icon: Activity },
    { path: '/tasbeeh', label: 'তাসবীহ', icon: AlignCenter },
    { path: '/events', label: 'ইভেন্ট', icon: Star },
    { path: '/quiz', label: 'কুইজ', icon: Brain },
    { path: '/bookmarks', label: 'বুকমার্ক', icon: Heart },
  ];

  // Background gradients based on time
  const bgGradients = {
    morning: "bg-gradient-to-br from-orange-50 to-sky-100 dark:from-slate-900 dark:to-slate-800",
    day: "bg-stone-50 dark:bg-stone-950",
    afternoon: "bg-gradient-to-br from-amber-50 to-orange-100 dark:from-stone-900 dark:to-stone-800",
    night: "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" // Removed text-white to avoid conflicts
  };

  return (
    <div className={cn("min-h-screen font-sans transition-colors duration-500", bgGradients[timeOfDay])}>
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200 dark:border-stone-800">
        <h1 className="text-xl font-bold font-bengali text-emerald-600 dark:text-emerald-500">ইসলামিক কম্প্যানিয়ন</h1>
        <div className="flex items-center gap-2">
          <DeveloperMenu />
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300">
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div className="flex pb-24 lg:pb-0">
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:flex fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex-col">
          <div className="p-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold font-bengali text-emerald-600 dark:text-emerald-500">ইসলামিক লাইফ</h1>
            <DeveloperMenu />
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-bengali",
                    isActive 
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-semibold" 
                      : "hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-stone-200 dark:border-stone-800">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 transition-colors font-bengali"
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
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 z-50 px-2 pb-safe shadow-lg">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1",
                  isActive ? "text-emerald-600 dark:text-emerald-400" : "text-stone-400 dark:text-stone-500"
                )}
              >
                <Icon className={cn("w-6 h-6 transition-transform", isActive && "scale-110")} />
                <span className="text-[10px] font-bengali font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
