export const PRAYER_INFO = {
  Fajr: {
    name: 'ফজর',
    rakats: [
      { type: 'Sunnah', count: 2, text: 'সুন্নতে মুয়াক্কাদা' },
      { type: 'Fard', count: 2, text: 'ফরজ' }
    ],
    total: 4,
    note: 'সূর্যোদয়ের আগে পড়তে হয়।'
  },
  Dhuhr: {
    name: 'জোহর',
    rakats: [
      { type: 'Sunnah', count: 4, text: 'সুন্নতে মুয়াক্কাদা' },
      { type: 'Fard', count: 4, text: 'ফরজ' },
      { type: 'Sunnah', count: 2, text: 'সুন্নতে মুয়াক্কাদা' },
      { type: 'Nafl', count: 2, text: 'নফল (ঐচ্ছিক)' }
    ],
    total: 12,
    note: 'দ্বিপ্রহরের পর থেকে আসরের ওয়াক্তের আগ পর্যন্ত।'
  },
  Asr: {
    name: 'আছর',
    rakats: [
      { type: 'Sunnah', count: 4, text: 'সুন্নতে গায়রে মুয়াক্কাদা' },
      { type: 'Fard', count: 4, text: 'ফরজ' }
    ],
    total: 8,
    note: 'সূর্যাস্তের আগে পড়তে হয়।'
  },
  Maghrib: {
    name: 'মাগরিব',
    rakats: [
      { type: 'Fard', count: 3, text: 'ফরজ' },
      { type: 'Sunnah', count: 2, text: 'সুন্নতে মুয়াক্কাদা' },
      { type: 'Nafl', count: 2, text: 'নফল (ঐচ্ছিক)' }
    ],
    total: 7,
    note: 'সূর্যাস্তের পরপরই পড়তে হয়।'
  },
  Isha: {
    name: 'এশা',
    rakats: [
      { type: 'Sunnah', count: 4, text: 'সুন্নতে গায়রে মুয়াক্কাদা' },
      { type: 'Fard', count: 4, text: 'ফরজ' },
      { type: 'Sunnah', count: 2, text: 'সুন্নতে মুয়াক্কাদা' },
      { type: 'Nafl', count: 2, text: 'নফল (ঐচ্ছিক)' },
      { type: 'Witr', count: 3, text: 'বিতর (ওয়াজিব)' }
    ],
    total: 15,
    note: 'রাতের প্রথম প্রহর থেকে সুবহে সাদিকের আগ পর্যন্ত।'
  },
  Jummah: {
    name: 'জুম্মা',
    rakats: [
      { type: 'Sunnah', count: 4, text: 'কাবলাল জুম্মা (সুন্নতে মুয়াক্কাদা)' },
      { type: 'Fard', count: 2, text: 'ফরজ' },
      { type: 'Sunnah', count: 4, text: 'বাদাল জুম্মা (সুন্নতে মুয়াক্কাদা)' },
      { type: 'Sunnah', count: 2, text: 'সুন্নতে মুয়াক্কাদা' },
      { type: 'Nafl', count: 2, text: 'নফল' }
    ],
    total: 14,
    note: 'শুক্রবার জোহরের ওয়াক্তে পড়তে হয়।'
  }
};

export const RAMADAN_AMAL = [
  { time: 'Fajr', task: 'তাহাজ্জুদ নামাজ আদায় করা', done: false },
  { time: 'Fajr', task: 'সেহরি খাওয়া (সুন্নাহ)', done: false },
  { time: 'Fajr', task: 'ফজরের জামাত ও জিকির', done: false },
  { time: 'Dhuhr', task: 'কুরআন তিলাওয়াত', done: false },
  { time: 'Asr', task: 'ইস্তিগফার ও দোয়া', done: false },
  { time: 'Maghrib', task: 'ইফতার ও মাগরিবের নামাজ', done: false },
  { time: 'Isha', task: 'এশা ও তারাবিহ নামাজ', done: false },
];

export const RAMADAN_GUIDE = [
  {
    title: 'সেহরিতে পুষ্টি ও হাইড্রেশন',
    category: 'health',
    content: 'সেহরিতে আঁশযুক্ত খাবার (যেমন ওটস, লাল চাল) এবং প্রোটিন (ডিম, দই) খান যা দীর্ঘক্ষণ শক্তি যোগায়। ভাজাপোড়া ও অতিরিক্ত লবণাক্ত খাবার এড়িয়ে চলুন কারণ এগুলো তৃষ্ণা বাড়ায়। পর্যাপ্ত পানি পান করুন।'
  },
  {
    title: 'ইফতারে সুষম খাবার',
    category: 'health',
    content: 'ইফতার শুরু করুন খেজুর ও পানি দিয়ে। এরপর ফলমূল ও শরবত খান। ভাজাপোড়া খাবার পরিমিত খান। একেবারে বেশি না খেয়ে ধাপে ধাপে খাবার গ্রহণ করুন যাতে হজমে সুবিধা হয়।'
  },
  {
    title: 'কুরআন তিলাওয়াতের গুরুত্ব',
    category: 'spiritual',
    content: 'রমজান মাস কুরআন নাজিলের মাস। তাই এই মাসে অর্থসহ কুরআন তিলাওয়াত ও অনুধাবনের চেষ্টা করুন। প্রতিদিন অন্তত এক পারা বা নির্ধারিত অংশ তিলাওয়াতের রুটিন করুন।'
  },
  {
    title: 'দান-সদকা ও জাকাত',
    category: 'spiritual',
    content: 'রমজানে দান-সদকার সওয়াব ৭০ গুণ বেশি। সাধ্যমত এতিম, অসহায় ও গরিবদের সাহায্য করুন। নিসাব পরিমাণ সম্পদ থাকলে জাকাত আদায় করুন।'
  },
  {
    title: 'ধৈর্য ও আত্মসংযম',
    category: 'spiritual',
    content: 'রোজা শুধু না খেয়ে থাকা নয়, বরং চোখ, কান, জিহ্বা ও অন্তরের সংযম। গীবত, মিথ্যা কথা ও ঝগড়া-বিবাদ থেকে বিরত থাকুন। বেশি বেশি ইস্তিগফার করুন।'
  }
];
