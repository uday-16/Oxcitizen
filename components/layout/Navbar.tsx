
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Globe, Moon, Sun, Bell } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  language: 'EN' | 'HI';
  setLanguage: (val: 'EN' | 'HI') => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Schemes', path: '/schemes' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Health', path: '/health' },
    { name: 'Emergency', path: '/emergency', urgent: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="bg-gradient-to-r from-orange-500 via-white to-green-600 h-1"></div>
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <span className="text-white font-bold text-xl">OX</span>
              </div>
              <span className="text-2xl font-bold text-blue-900 dark:text-blue-400">OXCITIZEN</span>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-sm font-semibold transition-colors duration-300 relative py-2 ${
                      link.urgent 
                        ? 'text-red-600 animate-pulse' 
                        : isActive(link.path)
                          ? 'text-blue-600'
                          : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <Search size={20} />
              </button>
              
              <button 
                onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
                className="p-2 flex items-center gap-1 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <Globe size={18} />
                <span>{language}</span>
              </button>

              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>

              <button className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95">
                Login
              </button>

              <button 
                className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900 p-6 pt-20">
            <ul className="space-y-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-2xl font-bold flex items-center justify-between ${
                      isActive(link.path) ? 'text-blue-600' : 'text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    {link.name}
                    {link.urgent && <span className="w-2 h-2 bg-red-600 rounded-full"></span>}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl text-lg font-bold">
                Login / Sign Up
              </button>
            </div>
          </div>
        )}

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-[60] bg-black bg-opacity-50 flex items-start justify-center pt-20 px-4">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl scale-in-center">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Global Search</h3>
                <button onClick={() => setIsSearchOpen(false)}><X /></button>
              </div>
              <div className="relative">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search for schemes, services, jobs..." 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:border-blue-500 outline-none transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="mt-6">
                <p className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Recent Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Ayushman Bharat', 'Software Jobs', 'AIIMS Delhi', 'Tax Calculator'].map(tag => (
                    <button key={tag} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full text-sm transition-colors">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
