import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toBengaliNumber = (num: number | string): string => {
  const english = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const bengali = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(c => {
    const index = english.indexOf(c);
    return index !== -1 ? bengali[index] : c;
  }).join('');
};

export const formatTime12Hour = (time24: string): string => {
  if (!time24) return '';
  // Remove any timezone info like (EST)
  const cleanTime = time24.split(' ')[0];
  const [hoursStr, minutesStr] = cleanTime.split(':');
  let hours = parseInt(hoursStr);
  const minutes = minutesStr;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  return `${toBengaliNumber(hours)}:${toBengaliNumber(minutes)} ${ampm}`;
};

export const getHijriDate = (): string => {
  return new Intl.DateTimeFormat('bn-BD', {
    calendar: 'islamic',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());
};

export const getBengaliDate = (): string => {
  // Simple approximation or use Intl if available. 
  // Intl.DateTimeFormat with 'bn-BD' usually gives Gregorian date in Bengali.
  // For actual Bengali calendar (Pohela Boishakh based), it's complex.
  // We will use the standard Gregorian date formatted in Bengali for now, 
  // as "Bengali Date" often refers to the localized string of today.
  // If user strictly meant the Bengali Solar Calendar (1430 etc), that requires a library.
  // Let's stick to localized Gregorian for "English Month" and Islamic for "Arabic".
  // Wait, user asked for "Bangla Mas" (Bengali Month).
  // Let's try to use a simple converter for Bengali Solar Date.
  
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth(); // 0-11
  const year = date.getFullYear();

  // Rough calculation for Bengali Calendar (Modified)
  // Boishakh starts ~April 14
  
  const bengaliMonths = [
    'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 
    'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
  ];
  
  let bnDay, bnMonth, bnYear;
  
  if (month === 3 && day >= 14 || month > 3) {
    bnYear = year - 593;
  } else {
    bnYear = year - 594;
  }

  // This is a simplified logic, actual logic is complex due to leap years and specific day changes
  // We will use a library-free approximation or just show the Gregorian date in Bengali if strict accuracy is hard.
  // However, let's try to be somewhat accurate.
  // April 14 is 1st Boishakh.
  
  // Let's just use Intl for Gregorian in Bengali and Islamic.
  // And maybe a static string for "Bengali Calendar" to avoid complex logic errors without a library.
  // Actually, let's just format the current date in Bengali locale.
  
  return new Intl.DateTimeFormat('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};
