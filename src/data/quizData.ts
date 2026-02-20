export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

export const QUIZ_QUESTIONS: Question[] = [
  // Easy
  {
    id: 1,
    question: "পবিত্র কুরআনে মোট কতটি সূরা আছে?",
    options: ["১১০", "১১৪", "১২০", "১০০"],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: "পবিত্র কুরআনে মোট ১১৪টি সূরা রয়েছে।"
  },
  {
    id: 2,
    question: "ইসলামের প্রথম খলিফা কে ছিলেন?",
    options: ["হযরত আলী (রাঃ)", "হযরত উসমান (রাঃ)", "হযরত আবু বকর (রাঃ)", "হযরত উমর (রাঃ)"],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: "ইসলামের প্রথম খলিফা ছিলেন হযরত আবু বকর সিদ্দীক (রাঃ)।"
  },
  {
    id: 3,
    question: "কোন নবীকে 'খলিলুল্লাহ' (আল্লাহর বন্ধু) বলা হয়?",
    options: ["হযরত মুসা (আঃ)", "হযরত ইব্রাহিম (আঃ)", "হযরত ঈসা (আঃ)", "হযরত মুহাম্মদ (সাঃ)"],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: "হযরত ইব্রাহিম (আঃ) কে আল্লাহ খলিলুল্লাহ বা আল্লাহর বন্ধু উপাধি দিয়েছিলেন।"
  },
  
  // Medium
  {
    id: 4,
    question: "পবিত্র কুরআনের সবচেয়ে বড় সূরা কোনটি?",
    options: ["সূরা আল-ইমরান", "সূরা আল-বাকারা", "সূরা আন-নিসা", "সূরা আল-মায়িদাহ"],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: "সূরা আল-বাকারা পবিত্র কুরআনের সবচেয়ে দীর্ঘ সূরা।"
  },
  {
    id: 5,
    question: "বদরের যুদ্ধ কত হিজরিতে সংঘটিত হয়েছিল?",
    options: ["১ম হিজরি", "২য় হিজরি", "৩য় হিজরি", "৪র্থ হিজরি"],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: "বদরের যুদ্ধ ২য় হিজরির ১৭ই রমজান সংঘটিত হয়েছিল।"
  },
  {
    id: 6,
    question: "জান্নাতের দরজার সংখ্যা কয়টি?",
    options: ["৭টি", "৮টি", "৯টি", "১০টি"],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: "জান্নাতের মোট ৮টি দরজা রয়েছে।"
  },

  // Hard
  {
    id: 7,
    question: "কোন সাহাবীকে 'আসাদুল্লাহ' (আল্লাহর সিংহ) বলা হয়?",
    options: ["হযরত হামজা (রাঃ)", "হযরত আলী (রাঃ)", "হযরত খালিদ বিন ওয়ালিদ (রাঃ)", "হযরত উমর (রাঃ)"],
    correctAnswer: 0,
    difficulty: 'hard',
    explanation: "হযরত হামজা (রাঃ) কে আসাদুল্লাহ বা আল্লাহর সিংহ উপাধি দেওয়া হয়েছিল। হযরত আলী (রাঃ) কেও আসাদুল্লাহ বলা হয়, তবে হামজা (রাঃ) এই উপাধিতে বেশি পরিচিত ছিলেন।"
  },
  {
    id: 8,
    question: "পবিত্র কুরআনে 'বিসমিল্লাহ' ছাড়া কোন সূরা শুরু হয়েছে?",
    options: ["সূরা তাওবা", "সূরা ইউনুস", "সূরা হুদ", "সূরা আর-রাদ"],
    correctAnswer: 0,
    difficulty: 'hard',
    explanation: "সূরা তাওবা (বা সূরা বারাত) বিসমিল্লাহির রাহমানির রাহিম ছাড়া নাযিল হয়েছে।"
  },
  {
    id: 9,
    question: "সিহাহ সিত্তাহর (ছয়টি বিশুদ্ধ হাদিস গ্রন্থ) মধ্যে কোনটি সবচেয়ে বিশুদ্ধ বলে গণ্য করা হয়?",
    options: ["সহীহ মুসলিম", "সুনান আবু দাউদ", "সহীহ বুখারী", "সুনান নাসাঈ"],
    correctAnswer: 2,
    difficulty: 'hard',
    explanation: "সহীহ বুখারী শরীফকে কুরআনের পর সবচেয়ে বিশুদ্ধ গ্রন্থ হিসেবে গণ্য করা হয়।"
  }
];
