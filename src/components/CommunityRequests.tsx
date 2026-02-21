import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, ThumbsUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
  likes: number;
}

export default function CommunityRequests() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const savedComments = localStorage.getItem('community-comments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
    const savedName = sessionStorage.getItem('quiz-username');
    if (savedName) setUserName(savedName);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: userName || 'Anonymous',
      text: newComment,
      date: new Date().toLocaleDateString('bn-BD'),
      likes: 0
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    localStorage.setItem('community-comments', JSON.stringify(updatedComments));
    setNewComment('');
  };

  const handleLike = (id: string) => {
    const updated = comments.map(c => 
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    );
    setComments(updated);
    localStorage.setItem('community-comments', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-bengali text-stone-800 dark:text-stone-100">কমিউনিটি ও অনুরোধ</h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 font-bengali">আপনার মতামত বা অনুরোধ জানান</p>
        </div>
      </div>

      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!userName && (
            <input
              type="text"
              placeholder="আপনার নাম"
              className="w-full px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bengali"
              onChange={(e) => setUserName(e.target.value)}
            />
          )}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="আপনার কি প্রয়োজন? এখানে লিখুন..."
            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bengali min-h-[100px]"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors font-bengali flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            পোস্ট করুন
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-stone-500" />
                </div>
                <div>
                  <p className="font-bold font-bengali text-stone-800 dark:text-stone-100">{comment.user}</p>
                  <p className="text-xs text-stone-400">{comment.date}</p>
                </div>
              </div>
            </div>
            <p className="text-stone-700 dark:text-stone-300 font-bengali mb-4 leading-relaxed">
              {comment.text}
            </p>
            <button 
              onClick={() => handleLike(comment.id)}
              className="flex items-center gap-1 text-stone-500 hover:text-blue-600 transition-colors text-sm"
            >
              <ThumbsUp className="w-4 h-4" />
              {comment.likes}
            </button>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-center py-10 text-stone-400 font-bengali">
            এখনো কোনো পোস্ট নেই। আপনিই প্রথম পোস্ট করুন!
          </div>
        )}
      </div>
    </div>
  );
}
