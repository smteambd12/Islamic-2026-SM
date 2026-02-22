import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface MenuItem {
  path: string;
  label: string;
  icon: any;
}

interface MoreMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
}

export default function MoreMenu({ isOpen, onClose, items }: MoreMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Menu Content */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute bottom-0 left-0 right-0 bg-white dark:bg-stone-900 rounded-t-3xl p-6 pb-safe shadow-xl border-t border-stone-200 dark:border-stone-800 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold font-bengali text-stone-800 dark:text-stone-100">
            আরও সেবাসমূহ
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-stone-100 dark:bg-stone-800 rounded-full text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 active:scale-95 transition-all border border-stone-100 dark:border-stone-700 hover:border-emerald-200 dark:hover:border-emerald-800"
              >
                <div className="w-10 h-10 rounded-full bg-white dark:bg-stone-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium font-bengali text-center text-stone-700 dark:text-stone-300">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
