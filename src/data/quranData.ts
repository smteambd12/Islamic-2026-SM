export interface QuranVerse {
  number: number;
  text: string;
  translation: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
  numberInSurah: number;
  audio: string;
}

export const FALLBACK_VERSES: QuranVerse[] = [
  {
    number: 1,
    text: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    translation: "শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।",
    surah: {
      number: 1,
      name: "سُورَةُ ٱلْفَاتِحَةِ",
      englishName: "Al-Fatiha"
    },
    numberInSurah: 1,
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3"
  },
  {
    number: 255,
    text: "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱlْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
    translation: "আল্লাহ ছাড়া অন্য কোন উপাস্য নেই, তিনি জীবিত, সবকিছুর ধারক। তাঁকে তন্দ্রাও স্পর্শ করতে পারে না এবং নিদ্রাও নয়। আসমান ও যমীনে যা কিছু রয়েছে, সবই তাঁর। কে আছ এমন, যে সুপারিশ করবে তাঁর কাছে তাঁর অনুমতি ছাড়া? দৃষ্টির সামনে কিংবা পিছনে যা কিছু রয়েছে সে সবই তিনি জানেন। তাঁর জ্ঞানসীমা থেকে তারা কোন কিছুকেই পরিবেষ্টিত করতে পারে না, কিন্তু যতটুকু তিনি ইচ্ছা করেন। তাঁর সিংহাসন সমস্ত আসমান ও যমীনকে পরিবেষ্টিত করে আছে। আর সেগুলোকে ধারণ করা তাঁর পক্ষে কঠিন নয়। তিনিই সর্বোচ্চ এবং সর্বাপেক্ষা মহান।",
    surah: {
      number: 2,
      name: "سُورَةُ البَقَرَةِ",
      englishName: "Al-Baqarah"
    },
    numberInSurah: 255,
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3"
  },
  {
    number: 6236,
    text: "مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
    translation: "জিন ও মানুষের মধ্য থেকে।",
    surah: {
      number: 114,
      name: "سُورَةُ النَّاسِ",
      englishName: "An-Nas"
    },
    numberInSurah: 6,
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6236.mp3"
  }
];
