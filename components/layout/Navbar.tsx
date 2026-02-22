
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, Settings, LogOut, Volume2, Search, Globe, ChevronDown, Check, Sparkles, Fingerprint } from 'lucide-react';
import { useLanguage, LANGUAGES, Language } from '../../context/LanguageContext';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  user: any;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { lang, setLang, t, isTranslating } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: t('services'), path: '/services' },
    { name: t('schemes'), path: '/schemes' },
    { name: 'Talk', path: '/talk', icon: <Volume2 size={14} className="text-sky-500" /> },
    { name: 'Synth ID', path: '/journalist-id', icon: <Fingerprint size={14} className="text-emerald-500" /> },
    { name: t('emergency'), path: '/emergency', urgent: true },
  ];

  const handleLangChange = (code: Language) => {
    setLang(code);
    setIsLangOpen(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="bg-gradient-to-r from-orange-500 via-white to-green-600 h-1"></div>
      
      {/* AI Translation Confirmation Tooltip Alert */}
      {showNotification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-fade-up">
          <div className="bg-slate-900 dark:bg-blue-600 text-white px-8 py-4 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 border border-white/10 backdrop-blur-2xl">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
               <Globe size={16} className="text-white animate-spin-slow" />
            </div>
            <div>
               <p className="font-black text-xs uppercase tracking-widest">{t('lang_confirm')}</p>
               <p className="text-[10px] opacity-70 font-bold uppercase">AI Translation Engine Sync Complete</p>
            </div>
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center ml-2">
              <Check size={12} strokeWidth={4} />
            </div>
          </div>
        </div>
      )}

      {/* Global Translation Overlay */}
      {isTranslating && (
        <div className="fixed inset-0 z-[200] bg-white/40 dark:bg-black/40 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] shadow-2xl flex flex-col items-center gap-6 border border-slate-100 dark:border-slate-800">
             <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-100 dark:border-blue-900/50 rounded-full"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 animate-pulse" size={32} />
             </div>
             <div className="text-center">
                <p className="font-black uppercase tracking-[0.3em] text-sm text-blue-600 animate-pulse">{t('translating')}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-2">Adjusting linguistic weights for 1.4B context</p>
             </div>
          </div>
        </div>
      )}

      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md backdrop-blur-md bg-opacity-95 dark:bg-opacity-95 border-b border-gray-100 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-blue-500/20">
                <span className="text-white font-black text-xl">OX</span>
              </div>
              <span className="text-2xl font-black text-blue-900 dark:text-blue-400 tracking-tighter">OXCITIZEN</span>
            </Link>

            <ul className="hidden xl:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-xs font-black uppercase tracking-widest transition-all relative py-2 flex items-center gap-2 ${
                      link.urgent 
                        ? 'text-red-600 animate-pulse' 
                        : isActive(link.path)
                          ? 'text-blue-600'
                          : 'text-gray-500 dark:text-gray-300 hover:text-blue-600'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                    {isActive(link.path) && (
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              {/* Regional Language Dropdown - Interactive & Visual */}
              <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={`flex items-center gap-3 bg-slate-50 dark:bg-slate-900 px-5 py-3 rounded-2xl border transition-all font-black text-[10px] uppercase tracking-wider group ${isLangOpen ? 'border-blue-600 shadow-lg ring-4 ring-blue-600/5' : 'border-slate-100 dark:border-slate-800'}`}
                >
                  <Globe size={14} className={`${isLangOpen ? 'text-blue-600 animate-spin-slow' : 'text-slate-400'}`} />
                  <span className="max-w-[80px] truncate">{LANGUAGES.find(l => l.code === lang)?.native}</span>
                  <ChevronDown size={12} className={`transition-transform duration-500 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLangOpen && (
                  <div className="absolute top-full right-0 mt-4 w-64 bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-slate-800 overflow-hidden py-3 animate-fade-up z-[60] backdrop-blur-xl">
                    <div className="px-6 py-3 border-b border-slate-50 dark:border-slate-800 mb-2">
                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Select Language</p>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                      {LANGUAGES.map((l) => (
                        <button 
                          key={l.code}
                          onClick={() => handleLangChange(l.code)} 
                          className={`w-full text-left px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between transition-colors group/item ${lang === l.code ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-900/10' : 'text-slate-600 dark:text-slate-300'}`}
                        >
                          <div className="flex flex-col">
                             <span className="text-[9px] font-black opacity-50 uppercase tracking-tighter group-hover/item:opacity-100 transition-opacity">{l.label}</span>
                             <span className="font-bold text-sm tracking-tight">{l.native}</span>
                          </div>
                          {lang === l.code && <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center"><Check size={10} strokeWidth={4} /></div>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => navigate('/search')}
                className="p-3 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl transition-colors"
              >
                <Search size={18} />
              </button>

              <button onClick={() => setDarkMode(!darkMode)} className="hidden sm:flex p-3 text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-xl transition-colors">
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {user ? (
                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-2xl border border-gray-100 dark:border-gray-700 group cursor-pointer relative">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-xs uppercase shadow-sm">
                    {user.name[0]}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-[10px] font-black uppercase tracking-tight leading-none">{user.name}</p>
                    <p className="text-[8px] text-gray-400 font-bold uppercase">{user.role}</p>
                  </div>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 hidden group-hover:block p-2 animate-fade-up">
                    {(user.role === 'admin' || user.role === 'superadmin') && (
                      <Link to="/admin" className="flex items-center gap-3 p-3 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl">
                        <Settings size={14} /> Admin Dashboard
                      </Link>
                    )}
                    <button onClick={onLogout} className="w-full flex items-center gap-3 p-3 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl">
                      <LogOut size={14} /> {t('logout')}
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
                  {t('login')}
                </Link>
              )}

              <button className="xl:hidden p-3 text-gray-600 dark:text-gray-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
