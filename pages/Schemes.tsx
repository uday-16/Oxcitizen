
import React from 'react';
import { SCHEMES } from '../constants';
import { ArrowRight, Info, CheckCircle, FileText, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const Schemes: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 page-enter">
      {/* 🧩 VISUAL STORYTELLING: SCHEMES HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-orange-950 px-4 py-20 rounded-[4rem] mb-20 mx-4 mt-4">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://picsum.photos/seed/schemes-hero-rich/1920/1080" 
            className="w-full h-full object-cover"
            alt="Schemes Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-950 via-orange-900/40 to-transparent"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-2 rounded-full border border-white/10 text-[10px] font-black text-orange-400 uppercase tracking-widest"
            >
              <Sparkles size={14} fill="currentColor" /> National Welfare
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">Welfare <br/> <span className="text-orange-400">Schemes.</span></h1>
            <p className="text-xl md:text-2xl text-orange-100/60 font-medium leading-relaxed">
              Discover government benefits tailored for you. From healthcare to agriculture, find what you're eligible for and apply instantly.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-white text-orange-900 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 transition-all">Check Eligibility</button>
              <button className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 transition-all">Apply Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* 🧩 VISUAL STORYTELLING: EMPOWERMENT */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Citizen <br/> <span className="text-orange-600">Empowerment.</span></h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Our welfare programs are designed to provide direct support to those who need it most. Whether it's income support for farmers or health coverage for low-income families, we ensure transparency and efficiency.
              </p>
              <div className="flex gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                    <CheckCircle size={24} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">Verified</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <FileText size={24} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">Direct Benefit</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img src="https://picsum.photos/seed/scheme1/600/800" className="rounded-[3rem] shadow-xl" alt="Scheme 1" />
              <img src="https://picsum.photos/seed/scheme2/600/800" className="rounded-[3rem] shadow-xl mt-12" alt="Scheme 2" />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {SCHEMES.map((scheme, idx) => (
          <div key={scheme.id} className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover-lift group flex flex-col sm:flex-row">
            <div className="sm:w-1/3 relative h-64 sm:h-auto overflow-hidden">
               <img 
                 src={scheme.image || `https://picsum.photos/seed/scheme-${idx}/800/600`} 
                 alt={scheme.name} 
                 className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                 referrerPolicy="no-referrer"
               />
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
