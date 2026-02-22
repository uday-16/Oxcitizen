
import React from 'react';
import { Newspaper, ArrowRight, TrendingUp, Clock, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

const News: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      category: 'Government',
      title: 'National Green Hydrogen Mission hits new milestone in clean energy transition.',
      time: 'Just Now',
      image: 'https://picsum.photos/seed/news1/800/600'
    },
    {
      id: 2,
      category: 'Health',
      title: 'Expanded Digital Health Mission achieves 500M user registrations.',
      time: '1h ago',
      image: 'https://picsum.photos/seed/news2/800/600'
    },
    {
      id: 3,
      category: 'Economy',
      title: 'India GDP growth projected at 7.2% for FY2025 by World Bank.',
      time: '3h ago',
      image: 'https://picsum.photos/seed/news3/800/600'
    },
    {
      id: 4,
      category: 'Technology',
      title: 'New AI Regulatory Framework announced to ensure ethical deployment.',
      time: '5h ago',
      image: 'https://picsum.photos/seed/news4/800/600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* 🧩 VISUAL STORYTELLING: NEWS HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-emerald-950 px-4 py-20 rounded-[4rem] mb-20 mx-4 mt-4">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://picsum.photos/seed/news-hero-rich/1920/1080" 
            className="w-full h-full object-cover"
            alt="News Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-950/40 to-emerald-950"></div>
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-emerald-600/10 backdrop-blur-xl px-8 py-3 rounded-full border border-emerald-600/20 text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] shadow-2xl"
            >
              <TrendingUp size={16} className="text-emerald-400" /> Live Bulletin Feed
            </motion.div>
            <h1 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.8] text-white">National <br/> <span className="text-emerald-500">Bulletin.</span></h1>
            <p className="text-xl md:text-3xl text-emerald-100/60 font-medium leading-relaxed max-w-3xl mx-auto">
              Verified news and official announcements for 1.4B citizens. Stay informed with real-time updates from official government sources.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-24">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Featured News */}
          <div className="lg:col-span-8 space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
              {newsItems.map((item) => (
                <motion.div 
                  key={item.id}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 group"
                >
                  <div className="h-64 relative overflow-hidden">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      alt={item.title}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-600 shadow-lg">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-10 space-y-6">
                    <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <Clock size={14} /> {item.time}
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-tight group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                      <button className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-emerald-600">
                        Read More <ArrowRight size={16} />
                      </button>
                      <button className="text-slate-300 hover:text-emerald-600 transition-colors">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                <Newspaper className="text-emerald-600" size={24} /> Official Sources
              </h3>
              <div className="space-y-6">
                <SourceItem name="Press Information Bureau" url="pib.gov.in" />
                <SourceItem name="Ministry of Information" url="mib.gov.in" />
                <SourceItem name="All India Radio" url="newsonair.gov.in" />
                <SourceItem name="DD News" url="ddnews.gov.in" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <TrendingUp size={200} />
              </div>
              <h4 className="font-black text-2xl mb-4 uppercase tracking-tighter">Journalist Synth ID</h4>
              <p className="text-sm text-emerald-100 mb-8 leading-relaxed font-medium">Are you a journalist? Get verified and access exclusive press tools.</p>
              <button className="w-full bg-white text-emerald-900 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
                Get Verified
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SourceItem = ({ name, url }: { name: string, url: string }) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div>
      <p className="font-black text-xs uppercase tracking-widest group-hover:text-emerald-600 transition-colors">{name}</p>
      <p className="text-[10px] text-slate-400 font-bold">{url}</p>
    </div>
    <ArrowRight size={16} className="text-slate-200 group-hover:text-emerald-600 group-hover:translate-x-2 transition-all" />
  </div>
);

export default News;
