import { Sun, Moon, Utensils, DoorOpen, Home, Droplets, Heart } from 'lucide-react';

export interface DailyDua {
  id: string;
  category: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  icon: any;
}

export const DAILY_DUAS: DailyDua[] = [
  {
    id: 'sleep-1',
    category: 'sleep',
    title: 'ঘুমানোর আগে দোয়া',
    arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
    transliteration: 'Allahumma bismika amutu wa ahya',
    translation: 'হে আল্লাহ! আপনার নামেই আমি মারা যাই (ঘুমাই) এবং আপনার নামেই জীবিত হই (জেগে উঠি)।',
    icon: Moon
  },
  {
    id: 'wake-1',
    category: 'sleep',
    title: 'ঘুম থেকে উঠার পর দোয়া',
    arabic: 'الْحَمْدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdulillahil ladhi ahyana ba\'da ma amatana wa ilaihin nushur',
    translation: 'সকল প্রশংসা আল্লাহর জন্য যিনি আমাদের মৃত্যু (ঘুম)র পর আমাদের জীবন দান করলেন এবং তাঁর দিকেই আমাদের পুনরুত্থান।',
    icon: Sun
  },
  {
    id: 'eat-start',
    category: 'food',
    title: 'খাওয়ার শুরুর দোয়া',
    arabic: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ',
    transliteration: 'Bismillahi wa \'ala barakatillah',
    translation: 'আল্লাহর নামে এবং আল্লাহর বরকতের ওপর (খাওয়া শুরু করলাম)।',
    icon: Utensils
  },
  {
    id: 'eat-end',
    category: 'food',
    title: 'খাওয়ার শেষের দোয়া',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    transliteration: 'Alhamdulillahil ladhi at\'amana wa saqana wa ja\'alana muslimin',
    translation: 'সকল প্রশংসা আল্লাহর জন্য যিনি আমাদের খাওয়ালেন, পান করালেন এবং আমাদের মুসলিম বানালেন।',
    icon: Utensils
  },
  {
    id: 'toilet-enter',
    category: 'hygiene',
    title: 'টয়লেটে প্রবেশের দোয়া',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    transliteration: 'Allahumma inni a\'udhu bika minal khubuthi wal khaba\'ith',
    translation: 'হে আল্লাহ! আমি আপনার কাছে অপবিত্র জিন (নারী ও পুরুষ) থেকে আশ্রয় চাইছি।',
    icon: DoorOpen
  },
  {
    id: 'toilet-exit',
    category: 'hygiene',
    title: 'টয়লেট থেকে বের হওয়ার দোয়া',
    arabic: 'غُفْرَانَكَ الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنِّي الْأَذَى وَعَافَانِي',
    transliteration: 'Ghufranak, Alhamdulillahi ladhi adhhaba \'annil adha wa \'afani',
    translation: 'হে আল্লাহ! আমি আপনার ক্ষমা চাই। সকল প্রশংসা আল্লাহর জন্য যিনি আমার থেকে কষ্টদায়ক বস্তু দূর করেছেন এবং আমাকে সুস্থতা দান করেছেন।',
    icon: DoorOpen
  },
  {
    id: 'home-enter',
    category: 'home',
    title: 'ঘরে প্রবেশের দোয়া',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا',
    transliteration: 'Bismillahi walajna, wa bismillahi kharajna, wa \'ala rabbina tawakkalna',
    translation: 'আল্লাহর নামে আমরা প্রবেশ করলাম, আল্লাহর নামে আমরা বের হলাম এবং আমাদের রবের ওপর আমরা ভরসা করলাম।',
    icon: Home
  },
  {
    id: 'wudu-start',
    category: 'hygiene',
    title: 'ওযুর শুরুর দোয়া',
    arabic: 'بِسْمِ ٱللَّٰهِ',
    transliteration: 'Bismillah',
    translation: 'আল্লাহর নামে শুরু করছি।',
    icon: Droplets
  },
  {
    id: 'wudu-end',
    category: 'hygiene',
    title: 'ওযুর শেষের দোয়া',
    arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: 'Ash-hadu an la ilaha illallahu wahdahu la sharika lahu wa ash-hadu anna Muhammadan \'abduhu wa rasuluh',
    translation: 'আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোনো মাবুদ নেই, তিনি এক, তাঁর কোনো শরীক নেই। আমি আরও সাক্ষ্য দিচ্ছি যে, মুহাম্মদ (সা.) তাঁর বান্দা ও রাসূল।',
    icon: Droplets
  }
];
