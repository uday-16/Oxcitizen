
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BottomNav from './components/layout/BottomNav';
import Chatbot from './components/widgets/Chatbot';
import ToastContainer from './components/common/ToastContainer';

// Lazy load new pages
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
const CreateStoryPage = lazy(() => import('./pages/Stories/Create'));
const ViewStoryPage = lazy(() => import('./pages/Stories/View'));

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          language={language} 
          setLanguage={setLanguage} 
        />

        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/schemes" element={<SchemesPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/health" element={<HealthPage />} />
              <Route path="/emergency" element={<EmergencyPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/smart-matcher" element={<SmartMatcherPage />} />
              <Route path="/scanner" element={<ScannerPage />} />
              <Route path="/consultation" element={<ConsultationPage />} />
              <Route path="/stories/create" element={<CreateStoryPage />} />
              <Route path="/stories/:id" element={<ViewStoryPage />} />
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
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default App;
