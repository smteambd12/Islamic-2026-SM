import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      
      // Check if app is already installed
      const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches;
      if (!isAppInstalled) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.error("No deferred prompt found");
      return;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error("Error showing install prompt:", error);
    }
  };

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-8 md:w-96"
      >
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 shadow-xl border border-stone-200 dark:border-stone-800 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center shrink-0">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/4358/4358665.png" 
              alt="App Icon" 
              className="w-8 h-8"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold font-bengali text-stone-800 dark:text-stone-100">অ্যাপটি ইন্সটল করুন</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-bengali">
              দ্রুত এক্সেস এবং অফলাইন ব্যবহারের জন্য
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPrompt(false)}
              className="p-2 text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={handleInstallClick}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold font-bengali hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              ইন্সটল
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
