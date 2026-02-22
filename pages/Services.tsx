
import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';

// Added React.FC to allow 'key' prop and moved definition before use
const ServiceCard: React.FC<{ cat: any }> = ({ cat }) => (
  <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover-lift group">
    <div className="h-48 relative overflow-hidden">
      <img 
        src={cat.image || "https://picsum.photos/800/600"} 
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        alt={cat.name}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
      <div className="absolute bottom-6 left-6 flex items-center gap-3">
        <div className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center text-2xl shadow-xl`}>
          {cat.icon}
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight">{cat.name}</h3>
      </div>
    </div>
    <div className="p-8">
      <ul className="space-y-4 mb-8">
        <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400 group/item cursor-pointer hover:text-blue-600 transition-colors">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          <span className="font-semibold">Top Ranked Institutions</span>
        </li>
        <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400 group/item cursor-pointer hover:text-blue-600 transition-colors">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          <span className="font-semibold">Scholarships & Loans</span>
        </li>
        <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400 group/item cursor-pointer hover:text-blue-600 transition-colors">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          <span className="font-semibold">Application Assistance</span>
        </li>
      </ul>
      <Link 
        to={cat.name === 'Emergency' ? '/emergency' : '/'} 
        className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-600 hover:text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
      >
        View Details <ArrowRight size={18} />
      </Link>
    </div>
  </div>
);

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="container mx-auto px-4 py-12 page-enter">
      <div className="relative h-[40vh] rounded-[3rem] overflow-hidden mb-16 shadow-2xl group">
        <img 
          src="https://picsum.photos/seed/services/1600/900" 
          alt="Services Hero"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center">
          <div className="px-12 max-w-2xl text-white">
            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">Citizen Services</h1>
            <p className="text-xl opacity-90 leading-relaxed font-medium">Explore our wide range of citizen-centric services designed to make your life easier.</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center">
        <div className="w-full lg:max-w-md relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for services..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-800 border-none shadow-sm focus:ring-4 focus:ring-blue-500/20 transition-all"
          />
        </div>
        
        <div className="flex-grow flex items-center gap-2 overflow-x-auto no-scrollbar w-full py-2">
          {['All', ...SERVICE_CATEGORIES.map(c => c.name)].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-xl font-bold shadow-sm hover:shadow-md transition-all">
          <SlidersHorizontal size={20} />
          <span>Filters</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICE_CATEGORIES.map((cat, i) => (
          <ServiceCard key={i} cat={cat} />
        ))}
      </div>
    </div>
  );
};

export default Services;
