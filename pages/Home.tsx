
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Fixed: Added Heart to the lucide-react imports
import { ArrowRight, Star, Users, CheckCircle, Search, ShieldCheck, Globe, Zap, Sparkles, TrendingUp, MessageSquare, Heart } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../constants';
import Stories from '../components/widgets/Stories';

const Home: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          el.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="page-enter">
      {/* High-End Stories Section */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto">
          <Stories />
        </div>
      </section>

      {/* Master Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2000" 
            alt="India Gate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-indigo-900/70 to-purple-900/80"></div>
          
          {/* Animated Particles */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-white rounded-full animate-float"
                style={{
                  width: Math.random() * 8 + 'px',
                  height: Math.random() * 8 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDuration: Math.random() * 5 + 5 + 's',
                  animationDelay: Math.random() * 5 + 's'
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/20">
              <Sparkles size={14} className="text-yellow-400" /> Powered by Digital India 🇮🇳
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-none tracking-tight">
              EVERY SERVICE. <br/> <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">EVERY CITIZEN.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100 opacity-90 leading-relaxed font-medium">
              Your AI-Powered Super Portal for Governance, Health, and Employment.
            </p>

            {/* Smart Search */}
            <div className="max-w-3xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative flex flex-col sm:flex-row gap-3 bg-white dark:bg-gray-800 p-3 rounded-[2rem] shadow-2xl">
                <div className="relative flex-grow">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Try 'Apply for Ayushman Bharat'..."
                    className="w-full pl-14 pr-6 py-5 rounded-2xl text-gray-800 dark:text-white dark:bg-gray-900 outline-none text-lg font-semibold"
                  />
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
                  Launch <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* AI Action Chips */}
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              <Link to="/smart-matcher" className="bg-white/10 hover:bg-white/20 backdrop-blur px-5 py-2.5 rounded-xl text-sm font-bold border border-white/10 transition-all flex items-center gap-2">
                🎯 Scheme Matcher
              </Link>
              <Link to="/scanner" className="bg-white/10 hover:bg-white/20 backdrop-blur px-5 py-2.5 rounded-xl text-sm font-bold border border-white/10 transition-all flex items-center gap-2">
                📄 Document OCR
              </Link>
              <Link to="/consultation" className="bg-white/10 hover:bg-white/20 backdrop-blur px-5 py-2.5 rounded-xl text-sm font-bold border border-white/10 transition-all flex items-center gap-2">
                📹 Video Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Citizen Feed */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left: Interactive Categories */}
            <div className="lg:col-span-2 space-y-12">
              <div className="flex items-center justify-between reveal">
                <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white uppercase">Services for you</h2>
                <Link to="/services" className="text-blue-600 font-bold hover:underline">See All</Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {SERVICE_CATEGORIES.slice(0, 6).map((cat, i) => (
                  <Link 
                    to={cat.name === 'Health' ? '/health' : cat.name === 'Emergency' ? '/emergency' : '/services'} 
                    key={cat.name}
                    className={`group relative p-8 rounded-[2rem] ${cat.color} ${cat.textColor} shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 reveal overflow-hidden`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                      {cat.icon}
                    </div>
                    <div className="text-4xl mb-6 relative z-10">{cat.icon}</div>
                    <h3 className="text-lg font-black relative z-10 leading-none">{cat.name}</h3>
                  </Link>
                ))}
              </div>

              {/* Citizen Success Feed (Instagram Style) */}
              <div className="space-y-8 mt-16">
                <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white uppercase flex items-center gap-3">
                  <TrendingUp className="text-blue-600" /> Community Updates
                </h2>
                {[
                  { user: 'Rohan Deshmukh', type: 'Scheme Success', msg: 'Just received my PM-Kisan installment! The process was so smooth via OXCITIZEN.', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09', likes: '1.2k' },
                  { user: 'Aisha Khan', type: 'Job Alert', msg: 'Tech Mahindra is hiring 500+ freshers in Pune. Applied directly through the Jobs Hub!', img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174', likes: '840' }
                ].map((post, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all reveal">
                    <div className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {post.user[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{post.user}</h4>
                          <span className="text-xs text-blue-600 font-bold uppercase">{post.type}</span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600"><Zap size={20}/></button>
                    </div>
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-medium">
                        {post.msg}
                      </p>
                      <div className="aspect-video rounded-[1.5rem] overflow-hidden">
                        <img src={post.img} alt="Post" className="w-full h-full object-cover" />
                      </div>
                      <div className="mt-6 flex items-center gap-6">
                        <button className="flex items-center gap-2 text-sm font-bold text-red-500"><Heart size={18} fill="currentColor"/> {post.likes}</button>
                        <button className="flex items-center gap-2 text-sm font-bold text-gray-500"><MessageSquare size={18}/> Comment</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Trending / Quick Tools */}
            <div className="space-y-12">
              <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-gray-700 reveal">
                <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Quick Check</h3>
                <div className="space-y-4">
                  <QuickToolLink title="Document OCR Scanner" icon="📄" to="/scanner" color="bg-blue-50 text-blue-600" />
                  <QuickToolLink title="Scheme Compatibility" icon="🎯" to="/smart-matcher" color="bg-purple-50 text-purple-600" />
                  <QuickToolLink title="Health Consultation" icon="📹" to="/consultation" color="bg-green-50 text-green-600" />
                  <QuickToolLink title="EMI Calculator" icon="💰" to="/tools" color="bg-orange-50 text-orange-600" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-blue-800 rounded-[2.5rem] p-8 text-white reveal shadow-2xl">
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Need Support?</h3>
                <p className="text-indigo-100 text-sm mb-8 leading-relaxed">Our AI Assistant is available 24/7 to guide you through any government process.</p>
                <button className="w-full bg-white text-blue-900 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                  Chat Now
                </button>
              </div>

              {/* Real-time stats */}
              <div className="grid grid-cols-1 gap-6">
                <StatCard label="Applications Processed" value="2.4M+" icon="✓" color="text-green-500" />
                <StatCard label="Live Jobs" value="15,400+" icon="💼" color="text-blue-500" />
                <StatCard label="Hospitals Active" value="28,000+" icon="🏥" color="text-red-500" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-24 container mx-auto px-4 reveal">
        <div className="bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-[3rem] p-1 shadow-lg">
           <div className="bg-white dark:bg-gray-900 rounded-[2.9rem] p-12 md:p-20 text-center relative overflow-hidden">
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black mb-8 text-gray-900 dark:text-white">BECOME A DIGITAL CITIZEN TODAY.</h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register" className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-blue-500/30">
                    JOIN THE PLATFORM
                  </Link>
                  <Link to="/emergency" className="bg-red-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-red-500/30">
                    EMERGENCY SOS
                  </Link>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

const QuickToolLink = ({ title, icon, to, color }: { title: string, icon: string, to: string, color: string }) => (
  <Link to={to} className={`flex items-center justify-between p-4 rounded-2xl ${color} hover:scale-105 transition-all font-bold`}>
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <span className="text-sm">{title}</span>
    </div>
    <ArrowRight size={16} />
  </Link>
);

const StatCard = ({ label, value, icon, color }: any) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-6">
    <div className={`text-3xl font-bold ${color}`}>{icon}</div>
    <div>
      <div className="text-2xl font-black text-gray-900 dark:text-white">{value}</div>
      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</div>
    </div>
  </div>
);

export default Home;
