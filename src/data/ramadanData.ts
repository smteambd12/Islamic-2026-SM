import { BookOpen, Moon, Sun, Star, Heart, Coffee, Utensils } from 'lucide-react';

export interface Dua {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference?: string;
  audioUrl?: string; // URL for the audio file
  category: 'sehri' | 'iftar' | 'ashra' | 'general';
}

export const RAMADAN_DUAS: Dua[] = [
  {
    id: 'sehri-dua',
    title: 'রোজার নিয়ত (সেহরির দোয়া)',
    arabic: 'نَوَيْتُ اَنْ اُصُوْمَ غَدًا مِّنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ فَرْضًا لَكَ يَا اللهُ فَتَقَبَّل مني إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيم',
    transliteration: 'Nawaitu an usuma ghadam min shahri ramadanal mubarak, fardallaka ya Allahu fatakabbal minni innaka antas samiul alim.',
    translation: 'হে আল্লাহ! আমি আগামীকাল পবিত্র রমজানের তোমার পক্ষ থেকে নির্ধারিত ফরজ রোজা রাখার ইচ্ছা পোষণ (নিয়্যত) করলাম। অতএব তুমি আমার পক্ষ থেকে (আমার রোজা তথা পানাহার থেকে বিরত থাকাকে) কবুল কর, নিশ্চয়ই তুমি সর্বশ্রোতা ও সর্বজ্ঞানী।',
    category: 'sehri',
    // audioUrl removed as per user request for correctness
  },
  {
    id: 'iftar-dua',
    title: 'ইফতারের দোয়া',
    arabic: 'اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ',
    transliteration: 'Allahumma laka sumtu wa ala rizqika aftartu.',
    translation: 'হে আল্লাহ! আমি তোমারই সন্তুষ্টির জন্য রোজা রেখেছি এবং তোমারই দেয়া রিজিকের মাধ্যমে ইফতার করছি।',
    category: 'iftar',
    // audioUrl removed
  },
  {
    id: 'ashra-1',
    title: 'প্রথম ১০ দিনের দোয়া (রহমত)',
    arabic: 'رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ',
    transliteration: 'Rabbi-ghfir war-ham wa anta khairur-rahimeen.',
    translation: 'হে আমার প্রতিপালক! আমাকে ক্ষমা করুন এবং আমার প্রতি রহমত বর্ষণ করুন। আপনিই তো সর্বশ্রেষ্ঠ দয়ালু।',
    category: 'ashra',
    // audioUrl removed
  },
  {
    id: 'ashra-2',
    title: 'দ্বিতীয় ১০ দিনের দোয়া (মাগফিরাত)',
    arabic: 'أَسْتَغْفِرُ اللهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaha rabbi min kulli zambin wa atubu ilaih.',
    translation: 'আমি আল্লাহর কাছে ক্ষমা প্রার্থনা করছি আমার সকল পাপ থেকে এবং আমি তাঁর দিকেই ফিরে যাচ্ছি।',
    category: 'ashra',
    // audioUrl removed
  },
  {
    id: 'ashra-3',
    title: 'তৃতীয় ১০ দিনের দোয়া (নাজাত)',
    arabic: 'اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ',
    transliteration: 'Allahumma ajirni minan nar.',
    translation: 'হে আল্লাহ! আমাকে জাহান্নামের আগুন থেকে মুক্তি দিন।',
    category: 'ashra',
    // audioUrl removed
  }
];

export const RAMADAN_AMALS = [
  {
    id: 'tahajjud',
    title: 'তাহাজ্জুদ নামাজ',
    description: 'সেহরির সময় উঠে তাহাজ্জুদ নামাজ আদায় করা অত্যন্ত ফজিলতপূর্ণ।',
    icon: Moon
  },
  {
    id: 'quran',
    title: 'কুরআন তিলাওয়াত',
    description: 'রমজান মাসে বেশি বেশি কুরআন তিলাওয়াত করা। প্রতিদিন অন্তত ১ পারা শেষ করার চেষ্টা করা।',
    icon: BookOpen
  },
  {
    id: 'zakat',
    title: 'দান-সদকা ও যাকাত',
    description: 'এই মাসে দানের সওয়াব ৭০ গুণ বেশি। যাকাত আদায় করার উপযুক্ত সময়।',
    icon: Heart
  },
  {
    id: 'iftar-sadaqah',
    title: 'রোজাদারকে ইফতার করানো',
    description: 'যে ব্যক্তি কোনো রোজাদারকে ইফতার করাবে, সে ওই রোজাদারের সমান সওয়াব পাবে।',
    icon: Utensils
  }
];
