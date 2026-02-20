import React from 'react';
import { MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DeveloperMenu() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/developer')}
      className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
    >
      <MoreVertical className="w-6 h-6" />
    </button>
  );
}
