import React from 'react';
import { Calendar as CalendarIcon, Star, CheckCircle2, Clock } from 'lucide-react';
import { toBengaliNumber, cn } from '../lib/utils';

export default function IslamicEvents() {
  // Approximate dates for 2026 (Hijri 1447-1448)
  const events = [
    { date: '২৭ রজব', englishDate: '2026-01-16', name: 'পবিত্র শবে মেরাজ', type: 'worship' },
    { date: '১৫ শাবান', englishDate: '2026-02-03', name: 'পবিত্র শবে বরাত', type: 'worship' },
    { date: '১ রমজান', englishDate: '2026-02-18', name: 'রমজান শুরু', type: 'worship' },
    { date: '২৭ রমজান', englishDate: '2026-03-16', name: 'পবিত্র শবে কদর (সম্ভাব্য)', type: 'worship' },
    { date: '১ শাওয়াল', englishDate: '2026-03-20', name: 'ঈদুল ফিতর', type: 'celebration' },
    { date: '৯ জিলহজ', englishDate: '2026-05-26', name: 'পবিত্র হজ', type: 'worship' },
    { date: '১০ জিলহজ', englishDate: '2026-05-27', name: 'ঈদুল আজহা', type: 'celebration' },
    { date: '১০ মহরম', englishDate: '2026-06-26', name: 'পবিত্র আশুরা', type: 'holiday' },
    { date: '১২ রবিউল আউয়াল', englishDate: '2026-08-26', name: 'ঈদে মিলাদুন্নবী (সা.)', type: 'celebration' },
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getStatus = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    eventDate.setHours(0, 0, 0, 0);
    
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { status: 'passed', days: Math.abs(diffDays) };
    if (diffDays === 0) return { status: 'today', days: 0 };
    return { status: 'upcoming', days: diffDays };
  };

  const sortedEvents = [...events].sort((a, b) => new Date(a.englishDate).getTime() - new Date(b.englishDate).getTime());

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100">ইসলামিক ইভেন্ট ক্যালেন্ডার ২০২৬</h2>
      
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
        <div className="space-y-4">
          {sortedEvents.map((event, idx) => {
            const { status, days } = getStatus(event.englishDate);
            const isPassed = status === 'passed';
            const isToday = status === 'today';

            return (
              <div 
                key={idx} 
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all border",
                  isPassed 
                    ? "bg-stone-50 dark:bg-stone-800/30 border-stone-100 dark:border-stone-800 opacity-70" 
                    : isToday
                      ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 ring-1 ring-emerald-500/20"
                      : "bg-white dark:bg-stone-800/50 border-stone-100 dark:border-stone-700 hover:border-emerald-200 dark:hover:border-emerald-700 shadow-sm"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                  isPassed 
                    ? "bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400" 
                    : isToday
                      ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
                      : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                )}>
                  {isPassed ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    event.type === 'celebration' ? <Star className="w-6 h-6 fill-current" /> : <CalendarIcon className="w-6 h-6" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className={cn("font-bold font-bengali text-lg truncate", isPassed ? "text-stone-500 dark:text-stone-500 line-through" : "text-stone-800 dark:text-stone-100")}>
                        {event.name}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:gap-2 text-sm text-stone-500 dark:text-stone-400 font-bengali">
                        <span>{event.date}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="font-sans">{new Date(event.englishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {isPassed ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-xs font-medium text-stone-500 font-bengali">
                          সম্পন্ন
                        </span>
                      ) : isToday ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-xs font-bold text-emerald-700 dark:text-emerald-400 font-bengali animate-pulse">
                          আজ
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-xs font-bold text-blue-600 dark:text-blue-400 font-bengali">
                          <Clock className="w-3 h-3" />
                          {toBengaliNumber(days)} দিন বাকি
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
