
import React from 'react';
import { SCHEMES } from '../constants';
import { ArrowRight, Info, CheckCircle, FileText } from 'lucide-react';

const Schemes: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 page-enter">
       <div className="bg-orange-600 rounded-[3rem] p-12 md:p-20 text-white mb-16 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6">Welfare Schemes</h1>
          <p className="text-2xl text-orange-100 opacity-90 max-w-2xl leading-relaxed">
            Discover government benefits tailored for you. From healthcare to agriculture, find what you're eligible for.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {SCHEMES.map((scheme) => (
          <div key={scheme.id} className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover-lift group flex flex-col sm:flex-row">
            <div className="sm:w-1/3 relative h-64 sm:h-auto overflow-hidden">
               <img src={scheme.image} alt={scheme.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  {scheme.category}
               </div>
            </div>
            <div className="p-8 sm:w-2/3">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">{scheme.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">{scheme.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-500 mt-1" />
                    <span className="text-xs font-bold text-gray-500 uppercase">Easy Apply</span>
                 </div>
                 <div className="flex items-start gap-2">
                    <FileText size={16} className="text-blue-500 mt-1" />
                    <span className="text-xs font-bold text-gray-500 uppercase">3 Docs Needed</span>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button className="flex-grow bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all hover:scale-105">
                    Check Eligibility
                 </button>
                 <button className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-gray-500 hover:bg-orange-100 hover:text-orange-600 transition-all">
                    <Info size={24} />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schemes;
