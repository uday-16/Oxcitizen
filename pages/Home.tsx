
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Heart, Search, Zap, Sparkles, TrendingUp, 
  Volume2, Plus, Brain, Newspaper, ShieldCheck,
  Layers, Globe, Fingerprint, Camera, Play
} from 'lucide-react';
import { SERVICE_CATEGORIES, HERO_IMAGES } from '../constants';
import Stories from '../components/widgets/Stories';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) {
          el.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="animate-fade-up">
      <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-20 z-40">
        <div className="container mx-auto">
          <Stories />
        </div>
      </section>

      {/* 🚀 ULTIMATE REFINED HERO SECTION - 75VH FOCUS & 15-IMAGE DENSE GRID */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Enhanced Overlay Layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-slate-950/80 to-slate-950 z-10"></div>
          
          {/* Dense 15-Image Ultra Grid */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 opacity-30 transform -rotate-3 scale-110 pointer-events-none">
            {HERO_IMAGES.map((url, i) => (
              <div 
                key={i} 
                className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 group relative"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <img 
                  src={`${url}&auto=format&fit=crop&q=90&w=1200`} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 brightness-75 group-hover:brightness-100" 
                  alt={`Civic Excellence ${i}`} 
                />
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-20 container mx-auto text-center">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-3xl px-8 py-4 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-blue-300 animate-float shadow-2xl">
              <Sparkles size={16} className="text-amber-400" /> {t('hero_title')}
            </div>
            
            <h1 className="text-5xl md:text-[8.5rem] font-black text-white leading-[0.8] tracking-tighter uppercase drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
               CITIZEN <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">EVOLVED.</span>
            </h1>
            
            <p className="text-lg md:text-3xl text-blue-100/60 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight drop-shadow-md">
              {t('hero_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
              <button 
                onClick={() => navigate('/search')}
                className="w-full sm:w-auto bg-blue-600 text-white px-16 py-8 rounded-[2.5rem] font-black text-xl shadow-[0_0_60px_rgba(37,99,235,0.4)] flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all group"
              >
                <Search className="group-hover:rotate-12 transition-transform" /> {t('start_search')}
              </button>
              <Link to="/live-assistant" className="w-full sm:w-auto bg-white/5 backdrop-blur-3xl border border-white/10 text-white px-16 py-8 rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 hover:bg-white/10 transition-all">
                <Volume2 className="animate-pulse" /> {t('live_voice')}
              </Link>
            </div>
            
            <div className="pt-12 flex flex-wrap justify-center gap-12 opacity-50">
               <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-[9px]">
                  <Fingerprint className="text-blue-500" size={16} /> 256-Bit Secure
               </div>
               <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-[9px]">
                  <Globe className="text-emerald-500" size={16} /> Native Grounding
               </div>
               <div className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-[9px]">
                  <Layers className="text-amber-500" size={16} /> Multi-Channel
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧩 BENTO GRID SERVICES */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-10">
              <div className="flex items-center justify-between reveal">
                <h2 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4">
                  <Brain className="text-blue-600" /> {t('ai_lab')}
                </h2>
                <Link to="/media-studio" className="text-xs font-black uppercase text-blue-600 border-b-2 border-blue-600 pb-1 tracking-widest">{t('enter_studio')}</Link>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <StudioCard 
                  title="Vision Forge" 
                  desc="High-fidelity civic visuals powered by Gemini 3 Pro."
                  icon={<Camera size={32} />}
                  color="from-blue-600 to-indigo-700"
                  link="/media-studio"
                  label={t('enter_studio')}
                />
                <StudioCard 
                  title="Motion Engine" 
                  desc="Cinematic civic films with Veo 3.1 fast generation."
                  icon={<Play size={32} />}
                  color="from-emerald-600 to-teal-700"
                  link="/media-studio"
                  label={t('enter_studio')}
                />
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 shadow-2xl border border-slate-100 dark:border-slate-800 reveal relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                    <Newspaper className="text-emerald-600" /> {t('national_bulletin')}
                  </h3>
                </div>
                <div className="space-y-12">
                   <NewsItem 
                     tag="GOVERNMENT" 
                     title="National Green Hydrogen Mission hits new milestone in clean energy transition." 
                     time="Just Now"
                   />
                   <NewsItem 
                     tag="HEALTH" 
                     title="Expanded Digital Health Mission achieves 500M user registrations." 
                     time="1h ago"
                   />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-10">
              <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-800 rounded-[4.5rem] p-12 text-white shadow-2xl reveal relative overflow-hidden group border border-white/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-20"></div>
                <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter leading-none">{t('smart_matcher')}</h3>
                <p className="text-blue-100/70 mb-10 leading-relaxed font-medium text-lg">AI-powered eligibility engine finds schemes hidden in plain sight.</p>
                <Link to="/smart-matcher" className="inline-flex items-center gap-4 bg-white text-indigo-950 px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                  {t('analyze_profile')} <ArrowRight size={20} />
                </Link>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 shadow-xl border border-slate-100 dark:border-slate-800 reveal">
                <h3 className="text-2xl font-black mb-10 uppercase tracking-tighter">{t('quick_matrix')}</h3>
                <div className="grid grid-cols-2 gap-6">
                  {SERVICE_CATEGORIES.slice(0, 4).map((cat, i) => (
                    <Link 
                      key={i} 
                      to={cat.name === 'Emergency' ? '/emergency' : '/services'} 
                      className={`p-10 rounded-[3.5rem] ${cat.color} ${cat.textColor} hover:scale-105 transition-all flex flex-col items-center justify-center text-center gap-4 shadow-sm group border border-transparent hover:border-current/20 overflow-hidden relative`}
                    >
                      <div className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-500 z-0">
                         <img src={cat.image} className="w-full h-full object-cover" alt={cat.name} />
                      </div>
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="text-5xl group-hover:scale-125 transition-transform duration-500 mb-3">{cat.icon}</div>
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">{cat.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StudioCard = ({ title, desc, icon, color, link, label }: any) => (
  <Link to={link} className={`block p-12 rounded-[4.5rem] bg-gradient-to-br ${color} text-white shadow-2xl hover:scale-[1.02] transition-all relative overflow-hidden group`}>
    <div className="absolute -right-4 -top-4 p-12 opacity-10 group-hover:scale-150 group-hover:rotate-12 transition-all duration-1000">
      {icon}
    </div>
    <div className="relative z-10 space-y-6">
      <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">{title}</h3>
      <p className="text-white/80 text-xl font-medium leading-tight">{desc}</p>
      <div className="pt-4 flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em]">
        {label} <ArrowRight size={16} />
      </div>
    </div>
  </Link>
);

const NewsItem = ({ tag, title, time }: { tag: string, title: string, time: string }) => (
  <div className="group cursor-pointer flex gap-10 items-center hover:bg-slate-50 dark:hover:bg-white/5 p-8 rounded-[3.5rem] transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
    <div className="w-2 h-16 bg-blue-600 rounded-full group-hover:h-20 transition-all"></div>
    <div className="space-y-3 flex-grow">
      <div className="flex items-center gap-5">
        <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">{tag}</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase">{time}</span>
      </div>
      <h4 className="text-3xl font-black group-hover:text-blue-600 transition-colors leading-tight tracking-tight uppercase">{title}</h4>
    </div>
    <ArrowRight className="text-slate-200 group-hover:text-blue-600 group-hover:translate-x-3 transition-all" size={40} />
  </div>
);

export default Home;
