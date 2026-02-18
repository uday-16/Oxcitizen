
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BottomNav from './components/layout/BottomNav';
import Chatbot from './components/widgets/Chatbot';
import ToastContainer from './components/common/ToastContainer';
import { LanguageProvider } from './context/LanguageContext';

// Lazy load feature-rich pages
const HomePage = lazy(() => import('./pages/Home'));
const ServicesPage = lazy(() => import('./pages/Services'));
const SchemesPage = lazy(() => import('./pages/Schemes'));
const JobsPage = lazy(() => import('./pages/Jobs'));
const HealthPage = lazy(() => import('./pages/Health'));
const EmergencyPage = lazy(() => import('./pages/Emergency'));
const ToolsPage = lazy(() => import('./pages/Tools'));
const LoginPage = lazy(() => import('./pages/Auth/Login'));
const RegisterPage = lazy(() => import('./pages/Auth/Register'));
const SmartMatcherPage = lazy(() => import('./pages/SmartMatcher'));
const ScannerPage = lazy(() => import('./pages/Scanner'));
const ConsultationPage = lazy(() => import('./pages/Consultation'));
const MediaStudioPage = lazy(() => import('./pages/MediaStudio'));
const NewsPage = lazy(() => import('./pages/News'));
const GlobalSearchPage = lazy(() => import('./pages/Search'));
const LiveAssistant = lazy(() => import('./pages/LiveAssistant'));

// Admin Modules
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));

const AppContent: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('ox_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('ox_user');
    setUser(null);
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          user={user}
          onLogout={handleLogout}
        />

        <main className="flex-grow pb-24 lg:pb-0">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/schemes" element={<SchemesPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/health" element={<HealthPage />} />
              <Route path="/emergency" element={<EmergencyPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/login" element={<LoginPage onLogin={setUser} />} />
              <Route path="/register" element={<RegisterPage onLogin={setUser} />} />
              <Route path="/smart-matcher" element={<SmartMatcherPage />} />
              <Route path="/scanner" element={<ScannerPage />} />
              <Route path="/consultation" element={<ConsultationPage />} />
              <Route path="/media-studio" element={<MediaStudioPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/search" element={<GlobalSearchPage />} />
              <Route path="/live-assistant" element={<LiveAssistant />} />
              
              <Route 
                path="/admin/*" 
                element={user?.role === 'admin' || user?.role === 'superadmin' ? <AdminDashboard /> : <Navigate to="/login" />} 
              />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <BottomNav />
        <Chatbot />
        <ToastContainer />
      </div>
    </Router>
  );
};

const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    <div className="text-center">
      <p className="text-sm font-black animate-pulse text-blue-600 uppercase tracking-widest">Architecting OXCITIZEN Core...</p>
      <p className="text-[10px] text-slate-400 font-bold uppercase mt-2">Zero Placeholder Engine Active</p>
    </div>
  </div>
);

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
