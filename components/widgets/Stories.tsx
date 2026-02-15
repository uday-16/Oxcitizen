
import React from 'react';
import { Plus, Bell, TrendingUp, Heart, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STORIES = [
  { id: 1, title: 'PM-Kisan Update', color: 'from-orange-400 to-red-500', icon: '🎁', status: 'live' },
  { id: 2, title: 'New Jobs', color: 'from-blue-400 to-indigo-600', icon: '💼', status: 'new' },
  { id: 3, title: 'Health Alert', color: 'from-green-400 to-teal-600', icon: '🏥', status: '' },
  { id: 4, title: 'Citizen News', color: 'from-purple-400 to-pink-600', icon: '🗞️', status: '' },
  { id: 5, title: 'Success Story', color: 'from-yellow-400 to-orange-500', icon: '🌟', status: '' },
  { id: 6, title: 'Weather', color: 'from-cyan-400 to-blue-500', icon: '☀️', status: '' },
];

const Stories: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar py-6 px-4 mb-4">
      {/* User Story */}
      <div 
        onClick={() => navigate('/stories/create')}
        className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group"
      >
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center relative group-hover:border-blue-500 transition-colors">
          <Plus className="text-gray-400 group-hover:text-blue-500" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-[10px] font-bold">
            YOU
          </div>
        </div>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Your Story</span>
      </div>

      {/* Dynamic Stories */}
      {STORIES.map((story) => (
        <div 
          key={story.id} 
          onClick={() => navigate(`/stories/${story.id}`)}
          className="flex flex-col items-center gap-2 shrink-0 cursor-pointer"
        >
          <div className={`w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr ${story.color} animate-pulse-ring`}>
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-0.5">
              <div className={`w-full h-full rounded-full bg-gradient-to-br ${story.color} flex items-center justify-center text-2xl`}>
                {story.icon}
              </div>
            </div>
          </div>
          <div className="relative">
            <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 uppercase tracking-tighter truncate w-16 block text-center">
              {story.title}
            </span>
            {story.status && (
              <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[8px] font-black text-white uppercase tracking-widest ${story.status === 'live' ? 'bg-red-600' : 'bg-blue-600'}`}>
                {story.status}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stories;
