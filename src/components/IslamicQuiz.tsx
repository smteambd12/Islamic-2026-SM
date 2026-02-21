import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Trophy, RefreshCw, ChevronRight, Brain, Star, User, Medal, Globe, Users, BookOpen, History, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, toBengaliNumber } from '../lib/utils';
import { QUIZ_QUESTIONS, Question } from '../data/quizData';
import { QUIZ_CATEGORIES, getQuestionsByCategory, QuizCategory } from '../services/quizService';

interface LeaderboardEntry {
  name: string;
  score: number;
  total: number;
  date: string;
  category: string;
}

interface UserStats {
  totalScore: number;
  quizzesPlayed: number;
  correctAnswers: number;
  history: LeaderboardEntry[];
}

export default function IslamicQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // User Data & Stats
  const [userName, setUserName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({
    totalScore: 0,
    quizzesPlayed: 0,
    correctAnswers: 0,
    history: []
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Load local data
    const savedStats = localStorage.getItem('quiz-user-stats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }

    const savedName = sessionStorage.getItem('quiz-username');
    if (savedName) {
      setUserName(savedName);
      setIsNameEntered(true);
    }

    // Load global (local multi-user) leaderboard
    const savedLeaderboard = localStorage.getItem('quiz-leaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    let questions = [...getQuestionsByCategory(selectedCategory)];

    if (difficulty !== 'all') {
      questions = questions.filter(q => q.difficulty === difficulty);
    }
    
    // Fallback if no questions for difficulty
    if (questions.length === 0 && difficulty !== 'all') {
       questions = [...getQuestionsByCategory(selectedCategory)];
    }

    // Shuffle and limit to 10 questions for a "Session"
    questions = questions.sort(() => Math.random() - 0.5).slice(0, 10);
    
    setFilteredQuestions(questions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setIsAnswered(false);
    setSelectedOption(null);
  }, [difficulty, selectedCategory]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsNameEntered(true);
      sessionStorage.setItem('quiz-username', userName);
    }
  };

  const updateUserStats = (finalScore: number) => {
    const newEntry: LeaderboardEntry = {
      name: userName,
      score: finalScore,
      total: filteredQuestions.length,
      date: new Date().toLocaleDateString('bn-BD'),
      category: QUIZ_CATEGORIES.find(c => c.id === selectedCategory)?.title || 'General'
    };

    const newStats = {
      totalScore: userStats.totalScore + finalScore,
      quizzesPlayed: userStats.quizzesPlayed + 1,
      correctAnswers: userStats.correctAnswers + finalScore,
      history: [newEntry, ...userStats.history].slice(0, 50) // Keep last 50 games
    };

    setUserStats(newStats);
    localStorage.setItem('quiz-user-stats', JSON.stringify(newStats));

    // Update Global Leaderboard (Local Storage based)
    const savedLeaderboard = localStorage.getItem('quiz-leaderboard');
    let currentLeaderboard: LeaderboardEntry[] = savedLeaderboard ? JSON.parse(savedLeaderboard) : [];
    
    // Add new entry
    currentLeaderboard.push(newEntry);
    
    // Sort by score
    currentLeaderboard.sort((a, b) => b.score - a.score);
    
    // Keep top 100
    currentLeaderboard = currentLeaderboard.slice(0, 100);
    
    setLeaderboard(currentLeaderboard);
    localStorage.setItem('quiz-leaderboard', JSON.stringify(currentLeaderboard));
  };

  const handleAnswerClick = (optionIndex: number) => {
    if (isAnswered) return;

    setSelectedOption(optionIndex);
    setIsAnswered(true);

    if (optionIndex === filteredQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < filteredQuestions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      setShowScore(true);
      updateUserStats(score);
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setFilteredQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setIsAnswered(false);
    setSelectedOption(null);
  };

  if (!isNameEntered) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-900 p-8 rounded-2xl shadow-xl max-w-md w-full border border-stone-100 dark:border-stone-800 text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold font-bengali mb-2 text-stone-800 dark:text-stone-100">স্বাগতম!</h2>
          <p className="text-stone-500 dark:text-stone-400 mb-6 font-bengali">কুইজ শুরু করার আগে আপনার নাম লিখুন</p>
          
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="আপনার নাম"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bengali"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors font-bengali"
            >
              শুরু করুন
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // History View
  if (showHistory) {
    return (
      <div className="space-y-6 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => setShowHistory(false)}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <h2 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100 flex items-center gap-2">
            <History className="w-6 h-6 text-blue-500" />
            আমার ইতিহাস
          </h2>
        </div>

        <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-center">
              <p className="text-sm text-stone-500 dark:text-stone-400 font-bengali">মোট স্কোর</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">{toBengaliNumber(userStats.totalScore)}</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
              <p className="text-sm text-stone-500 dark:text-stone-400 font-bengali">কুইজ খেলেছেন</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">{toBengaliNumber(userStats.quizzesPlayed)}</p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-stone-400 uppercase mb-4">সাম্প্রতিক ফলাফল</h3>
          
          <div className="space-y-3">
            {userStats.history.length > 0 ? (
              userStats.history.map((entry, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl">
                  <div>
                    <p className="font-bold font-bengali text-stone-800 dark:text-stone-100">{entry.category}</p>
                    <p className="text-xs text-stone-400">{entry.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {toBengaliNumber(entry.score)} / {toBengaliNumber(entry.total)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-stone-500 py-8 font-bengali">এখনও কোন ইতিহাস নেই</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Leaderboard View
  if (showLeaderboard) {
    return (
      <div className="space-y-6 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => setShowLeaderboard(false)}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <h2 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            গ্লোবাল লিডারবোর্ড
          </h2>
        </div>

        <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
          <div className="flex gap-4 mb-6 border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="flex-1 text-center">
              <p className="text-xs text-stone-400 font-bengali uppercase mb-1">আপনার মোট স্কোর</p>
              <p className="text-3xl font-bold text-emerald-600 font-mono">{toBengaliNumber(userStats.totalScore)}</p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-stone-400 uppercase mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            শীর্ষ স্কোরার (গ্লোবাল)
          </h3>
          
          <div className="space-y-3">
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, idx) => (
              <div key={idx} className={cn(
                "flex items-center justify-between p-4 rounded-xl",
                entry.name === userName ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800" : "bg-stone-50 dark:bg-stone-800/50"
              )}>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono",
                    idx === 0 ? "bg-yellow-100 text-yellow-700" :
                    idx === 1 ? "bg-stone-200 text-stone-700" :
                    idx === 2 ? "bg-orange-100 text-orange-700" :
                    "bg-stone-100 dark:bg-stone-800 text-stone-500"
                  )}>
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold font-bengali text-stone-800 dark:text-stone-100 flex items-center gap-2">
                      {entry.name}
                      {entry.name === userName && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">আপনি</span>}
                    </p>
                    <p className="text-xs text-stone-400 flex items-center gap-1">
                      {entry.category} • {entry.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-lg">
                    {toBengaliNumber(entry.score)}/{toBengaliNumber(entry.total)}
                  </span>
                </div>
              </div>
            ))
            ) : (
              <div className="text-center py-8 text-stone-500 font-bengali">
                এখনও কেউ কুইজ খেলেনি। আপনিই প্রথম হোন!
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Category Selection View
  if (!selectedCategory && !showLeaderboard) {
    return (
      <div className="space-y-6 pb-20">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100 flex items-center gap-2">
            <Brain className="w-6 h-6 text-emerald-600" />
            ইসলামিক কুইজ জোন
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHistory(true)}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              title="ইতিহাস"
            >
              <History className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowLeaderboard(true)}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
              title="লিডারবোর্ড"
            >
              <Trophy className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User Stats Summary Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bengali text-emerald-100 text-sm">স্বাগতম,</p>
                <h3 className="font-bold text-xl font-bengali">{userName}</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-emerald-100 text-xs font-bengali mb-1">মোট স্কোর</p>
              <p className="text-3xl font-bold font-mono">{toBengaliNumber(userStats.totalScore)}</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm font-bengali text-emerald-100">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> {toBengaliNumber(userStats.correctAnswers)} সঠিক উত্তর
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> {toBengaliNumber(userStats.quizzesPlayed)} টি কুইজ
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold font-bengali text-stone-600 dark:text-stone-400 mb-4">ক্যাটাগরি নির্বাচন করুন</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUIZ_CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(category.id)}
              className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 text-left hover:border-emerald-500/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-bengali text-stone-800 dark:text-stone-100 mb-1">
                  {category.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 font-bengali">
                  {category.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Quiz Interface (Question View)
  if (filteredQuestions.length === 0) {
    return <div className="p-8 text-center">Loading questions...</div>;
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="p-1 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h2 className="text-xl font-bold font-bengali text-stone-800 dark:text-stone-100">
            {QUIZ_CATEGORIES.find(c => c.id === selectedCategory)?.title}
          </h2>
        </div>
        
        <div className="flex gap-2">
          <select 
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-3 py-1 text-sm font-bengali focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">সব</option>
            <option value="easy">সহজ</option>
            <option value="medium">মধ্যম</option>
            <option value="hard">কঠিন</option>
          </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showScore ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-stone-900 rounded-2xl p-8 shadow-lg text-center border border-stone-100 dark:border-stone-800"
          >
            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
              <Medal className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold font-bengali mb-2 text-stone-800 dark:text-stone-100">কুইজ সম্পন্ন হয়েছে!</h3>
            <p className="text-stone-500 dark:text-stone-400 font-bengali mb-6">
              অভিনন্দন, {userName}!
              <br />
              আপনার স্কোর: {toBengaliNumber(score)} / {toBengaliNumber(filteredQuestions.length)}
            </p>
            
            <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-4 mb-8 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${(score / filteredQuestions.length) * 100}%` }}
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={resetQuiz}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors w-full"
              >
                <RefreshCw className="w-5 h-5" />
                অন্য ক্যাটাগরি খেলুন
              </button>
              <button
                onClick={() => setShowLeaderboard(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors w-full"
              >
                <Trophy className="w-5 h-5" />
                লিডারবোর্ড দেখুন
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-mono text-stone-400 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full">
                {toBengaliNumber(currentQuestionIndex + 1)} / {toBengaliNumber(filteredQuestions.length)}
              </span>
              <span className={cn(
                "text-xs font-bold px-2 py-1 rounded uppercase tracking-wider",
                filteredQuestions[currentQuestionIndex].difficulty === 'easy' && "bg-green-100 text-green-700",
                filteredQuestions[currentQuestionIndex].difficulty === 'medium' && "bg-yellow-100 text-yellow-700",
                filteredQuestions[currentQuestionIndex].difficulty === 'hard' && "bg-red-100 text-red-700",
              )}>
                {filteredQuestions[currentQuestionIndex].difficulty}
              </span>
            </div>

            <h3 className="text-xl font-bold font-bengali mb-8 text-stone-800 dark:text-stone-100 min-h-[60px]">
              {filteredQuestions[currentQuestionIndex].question}
            </h3>

            <div className="space-y-3">
              {filteredQuestions[currentQuestionIndex].options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = index === filteredQuestions[currentQuestionIndex].correctAnswer;
                
                let buttonClass = "bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border-stone-200 dark:border-stone-700";
                
                if (isAnswered) {
                  if (isCorrect) {
                    buttonClass = "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-400";
                  } else if (isSelected) {
                    buttonClass = "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-400";
                  } else {
                    buttonClass = "opacity-50";
                  }
                } else if (isSelected) {
                  buttonClass = "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={isAnswered}
                    className={cn(
                      "w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group",
                      buttonClass
                    )}
                  >
                    <span className="font-bengali font-medium">{option}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 pt-6 border-t border-stone-100 dark:border-stone-800"
              >
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-4">
                  <p className="text-sm text-blue-800 dark:text-blue-300 font-bengali">
                    <span className="font-bold">ব্যাখ্যা:</span> {filteredQuestions[currentQuestionIndex].explanation}
                  </p>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  পরবর্তী প্রশ্ন
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
