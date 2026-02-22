
import React from 'react';
import { HOSPITALS } from '../constants';
import { Star, MapPin, Phone, Hospital as HospitalIcon, Heart } from 'lucide-react';
import { motion } from 'motion/react';

const Health: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 page-enter">
      {/* 🧩 VISUAL STORYTELLING: HEALTH HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-emerald-950 px-4 py-20 rounded-[4rem] mb-20 mx-4 mt-4">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://picsum.photos/seed/health-hero-rich/1920/1080" 
            className="w-full h-full object-cover"
            alt="Health Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/40 to-transparent"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-2 rounded-full border border-white/10 text-[10px] font-black text-emerald-400 uppercase tracking-widest"
            >
              <Heart size={14} fill="currentColor" /> Universal Healthcare
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">Health <br/> <span className="text-emerald-400">Hub.</span></h1>
            <p className="text-xl md:text-2xl text-emerald-100/60 font-medium leading-relaxed">
              Access top-rated hospitals, check eligibility for health schemes, and get immediate medical assistance.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-white text-emerald-900 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 transition-all">Find Hospitals</button>
              <button className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 transition-all">Health Schemes</button>
            </div>
          </div>
        </div>
      </section>

      {/* 🧩 VISUAL STORYTELLING: MEDICAL SERVICES */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Apex Care <br/> <span className="text-emerald-600">Network.</span></h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Our network includes over 25,000 empanelled hospitals across India, providing secondary and tertiary care hospitalization to over 500 million citizens.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <p className="text-3xl font-black text-emerald-600">25k+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hospitals</p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <p className="text-3xl font-black text-blue-600">50Cr+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Citizens</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img src="https://picsum.photos/seed/hosp1/600/800" className="rounded-[3rem] shadow-xl" alt="Hospital 1" />
              <img src="https://picsum.photos/seed/hosp2/600/800" className="rounded-[3rem] shadow-xl mt-12" alt="Hospital 2" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Hospitals */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Top Rated Hospitals</h2>
            <p className="text-gray-500">Based on user ratings and government certification.</p>
          </div>
          <button className="text-blue-600 font-bold hover:underline">View All Hospitals →</button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOSPITALS.map((hospital, idx) => (
            <div key={hospital.id} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover-lift group">
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={hospital.image || `https://picsum.photos/seed/hospital-${idx}/800/600`} 
                  alt={hospital.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  {hospital.rating}
                </div>
                <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                  {hospital.type}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">{hospital.name}</h3>
                <div className="flex items-start gap-2 text-gray-500 mb-6 text-sm">
                  <MapPin size={16} className="mt-1 shrink-0 text-blue-500" />
                  <span>{hospital.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {hospital.specialties.map(spec => (
                    <span key={spec} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-semibold rounded-lg text-gray-600 dark:text-gray-300">
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a 
                    href={`tel:${hospital.contact}`}
                    className="flex-grow bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone size={18} /> Call Hospital
                  </a>
                  <button className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <HospitalIcon size={20} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Health;
