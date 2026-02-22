
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'EN' | 'HI' | 'TE';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  isTranslating: boolean;
}

export const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'EN', label: 'English', native: 'English' },
  { code: 'HI', label: 'Hindi', native: 'हिन्दी' },
  { code: 'TE', label: 'Telugu', native: 'తెలుగు' },
];

const translations: Record<Language, Record<string, string>> = {
  EN: {
    hero_title: "CITIZEN EMPOWERED.",
    hero_subtitle: "The AI-native OS for 1.4 Billion citizens. Intelligent routing, deep-thinking support, and one-tap welfare.",
    start_search: "START SEARCH",
    talk_ai: "TALK TO AI",
    ai_lab: "Intelligence Lab",
    national_bulletin: "National Bulletin",
    quick_matrix: "Quick Matrix",
    services: "Services",
    schemes: "Schemes",
    emergency: "Emergency",
    login: "Login",
    logout: "Logout",
    lang_confirm: "Language updated to English",
    translating: "AI Translating..."
  },
  HI: {
    hero_title: "नागरिक सशक्त।",
    hero_subtitle: "1.4 अरब नागरिकों के लिए एआई-नेटिव ओएस। बुद्धिमान रूटिंग और एक-टैప कल्याण।",
    start_search: "खोज शुरू करें",
    talk_ai: "एआई से बात करें",
    ai_lab: "इंटेलिजेंस लैब",
    national_bulletin: "राष्ट्रीय बुलेटिन",
    quick_matrix: "त्वरित मैट्रिक्स",
    services: "सेवाएं",
    schemes: "योजनाएं",
    emergency: "आपातकाल",
    login: "लॉगिन",
    logout: "लॉगआउट",
    lang_confirm: "भाषा बदलकर हिन्दी कर दी गई है",
    translating: "AI अनुवाद कर रहा है..."
  },
  TE: {
    hero_title: "పౌర సాధికారత.",
    hero_subtitle: "1.4 బిలియన్ పౌరుల కోసం AI-నేటివ్ OS. తెలివైన రౌటింగ్ మరియు తక్షణ సహాయం.",
    start_search: "సెర్చ్ ప్రారంభించండి",
    talk_ai: "AI తో మాట్లాడండి",
    ai_lab: "ఇంటెలిజెన్స్ ల్యాబ్",
    national_bulletin: "జాతీయ బులెటిన్",
    quick_matrix: "క్విక్ మ్యాట్రిక్స్",
    services: "సేవలు",
    schemes: "పథకాలు",
    emergency: "అత్యవసర",
    login: "లాగిన్",
    logout: "లాగ్అవుట్",
    lang_confirm: "భాష తెలుగులోకి మార్చబడింది",
    translating: "AI అనువదిస్తోంది..."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('ox_lang');
    return (saved as Language) || 'EN';
  });
  const [isTranslating, setIsTranslating] = useState(false);

  const setLang = (newLang: Language) => {
    if (newLang === lang) return;
    setIsTranslating(true);
    // Simulate real AI translation engine processing
    setTimeout(() => {
      setLangState(newLang);
      localStorage.setItem('ox_lang', newLang);
      setIsTranslating(false);
    }, 1200);
  };

  const t = (key: string) => {
    return translations[lang]?.[key] || translations['EN'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
