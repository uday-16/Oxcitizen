
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Heart, Search, Zap, Sparkles, TrendingUp, 
  Volume2, Plus, Brain, Newspaper, ShieldCheck,
  Layers, Globe, Fingerprint, Camera, Play, MapPin,
  AlertCircle, Phone, Shield, User, Bookmark,
  Bell, HelpCircle, Languages, Type, Mic
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICE_CATEGORIES, HERO_IMAGES, PROBLEM_CARDS } from '../constants';
import Stories from '../components/widgets/Stories';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  const [showAccessibility, setShowAccessibility] = useState(false);

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
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-32">
      {/* 🚨 EMERGENCY ACCESS STRIP - ALWAYS VISIBLE */}
      <div className="bg-red-600 text-white py-3 px-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            <EmergencyButton icon={<Phone size={14} />} label="Ambulance" color="bg-white/20" />
            <EmergencyButton icon={<Shield size={14} />} label="Police" color="bg-white/20" />
            <EmergencyButton icon={<AlertCircle size={14} />} label="Disaster" color="bg-white/20" />
          </div>
          <button className="bg-white text-red-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
            SOS Emergency
          </button>
        </div>
      </div>

      {/* STORIES */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto">
          <Stories />
        </div>
      </section>

      {/* 🚀 IMMERSIVE HERO ACTION HUB */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 px-4 py-20">
        {/* Cinematic Background Grid */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 transform -rotate-12 scale-150">
            {HERO_IMAGES.slice(0, 8).map((url, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="aspect-video rounded-[2rem] overflow-hidden"
              >
                <img src={url} className="w-full h-full object-cover" alt="Civic" />
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-8 py-4 rounded-full border border-white/10 text-[10px] font-black text-sky-400 uppercase tracking-[0.4em] shadow-2xl"
            >
              <Sparkles size={16} fill="currentColor" className="text-amber-400" /> Citizen Intelligence OS
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 50 }}
              className="text-6xl md:text-[9rem] font-black uppercase tracking-tighter leading-[0.8] text-white"
            >
              Citizen <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400">Empowered.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto font-medium leading-tight"
            >
              Access essential services, verified identity, and real-time support in one unified platform.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative max-w-3xl mx-auto group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center">
                <Search className="absolute left-8 text-slate-400" size={28} />
                <input 
                  type="text" 
                  placeholder="What do you need help with today?"
                  className="w-full pl-20 pr-40 py-10 rounded-[3rem] bg-slate-900/80 backdrop-blur-3xl text-white border border-white/10 outline-none focus:ring-4 focus:ring-sky-500/20 font-bold text-2xl placeholder:text-slate-600"
                />
                <button className="absolute right-4 bg-sky-600 text-white px-10 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-sky-600/40">
                  Search
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <QuickAction icon={<Mic size={20} />} label="Voice Assistant" onClick={() => navigate('/talk')} />
              <QuickAction icon={<Camera size={20} />} label="Scan Documents" />
              <QuickAction icon={<MapPin size={20} />} label="Service Centers" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🧩 VISUAL STORYTELLING: IDENTITY SECTION */}
      <section className="py-32 px-4 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-3 bg-blue-600/10 text-blue-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={16} /> Secure Identity
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Your Digital <br/> <span className="text-blue-600">Synth ID.</span></h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                Mint your immutable digital identity on the OX-Chain. Verified by Gemini Vision, recognized globally for professional and independent journalists.
              </p>
              <div className="flex gap-6">
                <Link to="/journalist-id" className="bg-slate-950 text-white px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                  Get Verified
                </Link>
                <Link to="/news" className="bg-slate-100 text-slate-600 px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">
                  View Bulletin
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
              <img 
                src="https://picsum.photos/seed/identity/1200/1000" 
                className="rounded-[4rem] shadow-2xl relative z-10 border border-slate-100 dark:border-slate-800"
                alt="Identity"
              />
              <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-2xl z-20 border border-slate-100 dark:border-slate-800 hidden md:block">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Status</p>
                    <p className="text-xl font-black uppercase tracking-tighter">Verified</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🧩 VISUAL STORYTELLING: HEALTH SECTION */}
      <section className="py-32 px-4 bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="absolute -inset-10 bg-emerald-600/20 rounded-full blur-3xl animate-pulse"></div>
              <img 
                src="https://picsum.photos/seed/healthcare-civic/1200/1000" 
                className="rounded-[4rem] shadow-2xl relative z-10 border border-slate-100 dark:border-slate-800"
                alt="Healthcare"
              />
              <div className="absolute -top-10 -right-10 bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-2xl z-20 border border-slate-100 dark:border-slate-800 hidden md:block">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                    <Heart size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Health Hub</p>
                    <p className="text-xl font-black uppercase tracking-tighter">24/7 Support</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10 order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-3 bg-emerald-600/10 text-emerald-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                <Heart size={16} /> Universal Health
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Wellness for <br/> <span className="text-emerald-600">Everyone.</span></h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                Access top-rated hospitals, check eligibility for health schemes, and get immediate medical assistance. Your health is our priority.
              </p>
              <div className="flex gap-6">
                <Link to="/health" className="bg-emerald-600 text-white px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                  Find Hospital
                </Link>
                <Link to="/services" className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100 dark:border-slate-800">
                  Health Schemes
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🧩 VISUAL STORYTELLING: JOBS SECTION */}
      <section className="py-32 px-4 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-3 bg-indigo-600/10 text-indigo-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                <Zap size={16} /> Career Growth
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Future of <br/> <span className="text-indigo-600">Work.</span></h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                Smart indexing for verified employment opportunities. Let CitizenAI match your skills with the right career path.
              </p>
              <div className="flex gap-6">
                <Link to="/jobs" className="bg-indigo-600 text-white px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                  Explore Jobs
                </Link>
                <Link to="/talk" className="bg-slate-100 text-slate-600 px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">
                  Career Advice
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
              <img 
                src="https://picsum.photos/seed/jobs-future/1200/1000" 
                className="rounded-[4rem] shadow-2xl relative z-10 border border-slate-100 dark:border-slate-800"
                alt="Jobs"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/20 z-20">
                <Play className="text-white fill-current" size={48} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 📊 PERSONALIZED SNAPSHOT & BULLETIN */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Snapshot */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <User className="text-sky-600" /> My Dashboard
                  </h3>
                  <button className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <Bell size={18} className="text-slate-400" />
                  </button>
                </div>
                <div className="space-y-4">
                  <DashboardItem icon={<Bookmark />} title="Saved Schemes" count="3" color="text-orange-600" />
                  <DashboardItem icon={<Zap />} title="Active Applications" count="1" color="text-emerald-600" />
                  <DashboardItem icon={<TrendingUp />} title="Job Matches" count="12" color="text-blue-600" />
                </div>
                <button className="w-full mt-8 py-5 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">
                  Open Full Dashboard
                </button>
              </div>
            </div>

            {/* Bulletin */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-xl border border-slate-100 dark:border-slate-800 h-full">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <Newspaper className="text-emerald-600" /> National Bulletin
                  </h3>
                  <Link to="/news" className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Live Feed</Link>
                </div>
                <div className="space-y-8">
                  <BulletinItem 
                    tag="SCHEME" 
                    title="Ayushman Bharat expansion announced for senior citizens." 
                    time="10m ago" 
                  />
                  <BulletinItem 
                    tag="ALERT" 
                    title="New digital identity protocol starting next month." 
                    time="2h ago" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💡 GUIDED PROBLEM CARDS */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-10">Common Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {PROBLEM_CARDS.map((card) => (
              <div key={card.id} className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all group cursor-pointer">
                <div className="w-16 h-16 bg-sky-50 dark:bg-sky-900/30 text-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h4 className="text-xl font-black uppercase tracking-tighter mb-2">{card.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-6">{card.desc}</p>
                <div className="flex items-center gap-2 text-sky-600 font-black text-[10px] uppercase tracking-widest">
                  Start Guide <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎙 VOICE ASSISTANT DOCK - FLOATING */}
      <div className="fixed bottom-10 right-10 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/talk')}
          className="w-20 h-20 bg-sky-600 text-white rounded-full shadow-2xl flex items-center justify-center relative group"
        >
          <div className="absolute inset-0 bg-sky-600 rounded-full animate-ping opacity-20"></div>
          <Volume2 size={32} />
          <div className="absolute bottom-full right-0 mb-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-6 py-3 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <p className="font-black uppercase tracking-widest text-[10px]">How can I help you?</p>
          </div>
        </motion.button>
      </div>

      {/* ♿ ACCESSIBILITY PANEL - FLOATING */}
      <div className="fixed bottom-10 left-10 z-50">
        <button 
          onClick={() => setShowAccessibility(!showAccessibility)}
          className="w-14 h-14 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-full shadow-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800"
        >
          <HelpCircle size={24} />
        </button>
        
        <AnimatePresence>
          {showAccessibility && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-20 left-0 w-64 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-6"
            >
              <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-400">Accessibility</h4>
              <div className="space-y-3">
                <AccessibilityItem icon={<Languages size={18} />} label="Change Language" onClick={() => navigate('/settings')} />
                <AccessibilityItem icon={<Type size={18} />} label="Large Text Mode" />
                <AccessibilityItem icon={<Volume2 size={18} />} label="Voice Readout" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* TRUST INDICATORS */}
      <section className="py-12 border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12 opacity-40">
            <TrustBadge icon={<ShieldCheck size={16} />} label="Verified Information" />
            <TrustBadge icon={<Globe size={16} />} label="Official Portals Sync" />
            <TrustBadge icon={<Fingerprint size={16} />} label="Secure OX-Chain ID" />
          </div>
        </div>
      </section>
    </div>
  );
};

const EmergencyButton = ({ icon, label, color }: any) => (
  <button className={`${color} px-4 py-2 rounded-full flex items-center gap-2 font-black text-[10px] uppercase tracking-widest whitespace-nowrap hover:bg-white/30 transition-all`}>
    {icon} {label}
  </button>
);

const QuickAction = ({ icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-3 font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
  >
    {icon} {label}
  </button>
);

const DashboardItem = ({ icon, title, count, color }: any) => (
  <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl group cursor-pointer hover:bg-slate-100 transition-all">
    <div className="flex items-center gap-4">
      <div className={`${color} opacity-60 group-hover:scale-110 transition-transform`}>{icon}</div>
      <span className="font-bold text-sm text-slate-600 dark:text-slate-400">{title}</span>
    </div>
    <span className="font-black text-lg">{count}</span>
  </div>
);

const BulletinItem = ({ tag, title, time }: any) => (
  <div className="flex gap-6 group cursor-pointer">
    <div className="w-1 h-12 bg-emerald-600 rounded-full group-hover:h-16 transition-all"></div>
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="text-[8px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 px-3 py-1 rounded-full">{tag}</span>
        <span className="text-[8px] font-bold text-slate-400 uppercase">{time}</span>
      </div>
      <h4 className="font-black uppercase tracking-tighter text-lg leading-tight group-hover:text-emerald-600 transition-colors">{title}</h4>
    </div>
  </div>
);

const AccessibilityItem = ({ icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left"
  >
    <div className="text-slate-400">{icon}</div>
    <span className="font-bold text-xs text-slate-600 dark:text-slate-400">{label}</span>
  </button>
);

const TrustBadge = ({ icon, label }: any) => (
  <div className="flex items-center gap-3 font-black text-[9px] uppercase tracking-[0.2em]">
    {icon} {label}
  </div>
);

export default Home;
