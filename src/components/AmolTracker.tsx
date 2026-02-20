import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Trophy, Flame, CalendarDays, ListTodo, Moon } from 'lucide-react';
import { cn, toBengaliNumber } from '../lib/utils';
import { motion } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  category: 'worship' | 'quran' | 'charity' | 'sunnah';
  points: number;
}

const RAMADAN_TASKS: Task[] = [
  { id: 'r1', title: 'তাহাজ্জুদ নামাজ', category: 'worship', points: 20 },
  { id: 'r2', title: 'সেহরি খাওয়া', category: 'sunnah', points: 10 },
  { id: 'r3', title: 'ফজর জামাতে আদায়', category: 'worship', points: 20 },
  { id: 'r4', title: 'কুরআন তিলাওয়াত (১ পারা)', category: 'quran', points: 30 },
  { id: 'r5', title: 'যোহর জামাতে আদায়', category: 'worship', points: 20 },
  { id: 'r6', title: 'আসরের পর জিকির', category: 'worship', points: 15 },
  { id: 'r7', title: 'ইফতারের আগে দোয়া', category: 'sunnah', points: 15 },
  { id: 'r8', title: 'তারাবীহ নামাজ', category: 'worship', points: 30 },
  { id: 'r9', title: 'দান সদকা', category: 'charity', points: 25 },
];

const GENERAL_TASKS: Task[] = [
  { id: 'g1', title: '৫ ওয়াক্ত নামাজ', category: 'worship', points: 50 },
  { id: 'g2', title: 'সকাল-সন্ধ্যার জিকির', category: 'worship', points: 20 },
  { id: 'g3', title: 'সূরা মূলক পাঠ (রাতে)', category: 'quran', points: 15 },
  { id: 'g4', title: 'ইস্তিগফার (১০০ বার)', category: 'worship', points: 10 },
  { id: 'g5', title: 'দরুদ শরীফ (১০০ বার)', category: 'worship', points: 10 },
];

export default function AmolTracker() {
  const [activeTab, setActiveTab] = useState<'ramadan' | 'general'>('ramadan');
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [streak, setStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('amol-tracker');
    if (saved) {
      const data = JSON.parse(saved);
      // Reset if new day
      if (data.date !== new Date().toDateString()) {
        setCompleted({});
        // Logic to update streak could go here
      } else {
        setCompleted(data.completed);
        setTotalPoints(data.points || 0);
      }
    }
  }, []);

  const toggleTask = (task: Task) => {
    const isCompleted = !completed[task.id];
    const newCompleted = { ...completed, [task.id]: isCompleted };
    
    let newPoints = totalPoints;
    if (isCompleted) newPoints += task.points;
    else newPoints -= task.points;

    setCompleted(newCompleted);
    setTotalPoints(newPoints);

    localStorage.setItem('amol-tracker', JSON.stringify({
      date: new Date().toDateString(),
      completed: newCompleted,
      points: newPoints
    }));
  };

  const currentTasks = activeTab === 'ramadan' ? RAMADAN_TASKS : GENERAL_TASKS;
  const progress = Math.round((Object.keys(completed).filter(k => currentTasks.find(t => t.id === k)).length / currentTasks.length) * 100) || 0;

  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-emerald-100 font-bengali mb-1">আজকের অগ্রগতি</p>
            <h3 className="text-3xl font-bold font-mono">{toBengaliNumber(progress)}%</h3>
          </div>
          <div className="text-right">
            <p className="text-emerald-100 font-bengali mb-1">মোট পয়েন্ট</p>
            <div className="flex items-center justify-end gap-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-2xl font-bold font-mono">{toBengaliNumber(totalPoints)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 relative z-10">
          <div className="h-2 bg-black/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-white/90 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
        <button
          onClick={() => setActiveTab('ramadan')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all font-bengali",
            activeTab === 'ramadan' ? "bg-white dark:bg-stone-700 shadow-sm text-emerald-600 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"
          )}
        >
          <Moon className="w-4 h-4" />
          রমজান আমল
        </button>
        <button
          onClick={() => setActiveTab('general')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all font-bengali",
            activeTab === 'general' ? "bg-white dark:bg-stone-700 shadow-sm text-emerald-600 dark:text-emerald-400" : "text-stone-500 dark:text-stone-400"
          )}
        >
          <ListTodo className="w-4 h-4" />
          দৈনিক আমল
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {currentTasks.map((task) => (
          <motion.button
            key={task.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleTask(task)}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left group",
              completed[task.id]
                ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                : "bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-emerald-800"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0",
                completed[task.id] ? "text-emerald-600" : "text-stone-300 group-hover:text-emerald-400"
              )}>
                {completed[task.id] ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
              </div>
              <div>
                <p className={cn(
                  "font-bengali font-medium transition-colors",
                  completed[task.id] ? "text-emerald-800 dark:text-emerald-200 line-through opacity-70" : "text-stone-800 dark:text-stone-200"
                )}>
                  {task.title}
                </p>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider",
                  task.category === 'worship' && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                  task.category === 'quran' && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
                  task.category === 'sunnah' && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
                  task.category === 'charity' && "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
                )}>
                  {task.category}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <span className={cn(
                "font-mono font-bold text-sm",
                completed[task.id] ? "text-emerald-600" : "text-stone-400"
              )}>
                +{toBengaliNumber(task.points)}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
