import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Trophy, RefreshCw, ChevronRight, Brain, Star, User, Medal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, toBengaliNumber } from '../lib/utils';
import { QUIZ_QUESTIONS, Question } from '../data/quizData';

interface LeaderboardEntry {
  name: string;
  score: number;
  total: number;
  date: string;
}

export default function IslamicQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  
  // New states for user name and leaderboard
  const [userName, setUserName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    // Load leaderboard
    const savedLeaderboard = localStorage.getItem('quiz-leaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }

    // Check if user name is already saved in session
    const savedName = sessionStorage.getItem('quiz-username');
    if (savedName) {
      setUserName(savedName);
      setIsNameEntered(true);
    }

    let questions = [...QUIZ_QUESTIONS];
    if (difficulty !== 'all') {
      questions = questions.filter(q => q.difficulty === difficulty);
    }
    // Shuffle questions
    questions = questions.sort(() => Math.random() - 0.5);
    setFilteredQuestions(questions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setIsAnswered(false);
    setSelectedOption(null);
  }, [difficulty]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsNameEntered(true);
      sessionStorage.setItem('quiz-username', userName);
    }
  };

  const saveScore = (finalScore: number) => {
    const newEntry: LeaderboardEntry = {
      name: userName,
      score: finalScore,
      total: filteredQuestions.length,
      date: new Date().toLocaleDateString('bn-BD')
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => (b.score / b.total) - (a.score / a.total)) // Sort by percentage
      .slice(0, 10); // Keep top 10

    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('quiz-leaderboard', JSON.stringify(updatedLeaderboard));
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
      saveScore(score);
    }
  };

  const resetQuiz = () => {
    const questions = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setFilteredQuestions(questions);
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

  if (filteredQuestions.length === 0) {
    return <div className="p-8 text-center">Loading questions...</div>;
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100 flex items-center gap-2">
          <Brain className="w-6 h-6 text-emerald-600" />
          ইসলামিক কুইজ
        </h2>
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              showLeaderboard ? "bg-emerald-100 text-emerald-600" : "bg-stone-100 dark:bg-stone-800 text-stone-500"
            )}
          >
            <Trophy className="w-5 h-5" />
          </button>
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
        {showLeaderboard ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800"
          >
            <h3 className="text-xl font-bold font-bengali mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              লিডারবোর্ড
            </h3>
            
            <div className="space-y-3">
              {leaderboard.length > 0 ? (
                leaderboard.map((entry, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl">
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
                        <p className="font-bold font-bengali text-stone-800 dark:text-stone-100">{entry.name}</p>
                        <p className="text-xs text-stone-400">{entry.date}</p>
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
                <p className="text-center text-stone-500 py-8 font-bengali">এখনও কোন স্কোর নেই</p>
              )}
            </div>
            
            <button
              onClick={() => setShowLeaderboard(false)}
              className="w-full mt-6 py-3 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-xl font-bold font-bengali hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              কুইজে ফিরে যান
            </button>
          </motion.div>
        ) : showScore ? (
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
                আবার খেলুন
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
