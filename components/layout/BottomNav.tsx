
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Briefcase, Search, AlertCircle, Volume2, Newspaper } from 'lucide-react';

const BottomNav: React.FC = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] backdrop-blur-xl bg-opacity-90">
      <div className="flex items-center justify-around h-20 px-2">
        <BottomNavItem to="/" icon={<Home size={22} />} label="Home" />
        <BottomNavItem to="/talk" icon={<Volume2 size={22} className="text-sky-600" />} label="Talk" />
        <BottomNavItem to="/emergency" icon={<AlertCircle size={26} className="text-red-600" />} label="SOS" urgent />
        <BottomNavItem to="/news" icon={<Newspaper size={22} />} label="News" />
        <BottomNavItem to="/jobs" icon={<Briefcase size={22} />} label="Jobs" />
      </div>
    </div>
  );
};

const BottomNavItem = ({ to, icon, label, urgent = false }: { to: string, icon: React.ReactNode, label: string, urgent?: boolean }) => (
  <NavLink
    to={to}
    className={({ isActive }) => 
      `flex flex-col items-center justify-center gap-1 transition-all flex-1 h-full ${
        isActive ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400'
      }`
    }
  >
    <div className={`${urgent ? 'p-3 bg-red-100 rounded-full -mt-10 shadow-xl border-4 border-white dark:border-gray-800 animate-pulse' : ''}`}>
      {icon}
    </div>
    <span className={`text-[9px] font-black uppercase tracking-tighter ${urgent ? 'mt-1' : ''}`}>{label}</span>
  </NavLink>
);

export default BottomNav;
