
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'EN' | 'HI' | 'BN' | 'TM' | 'MR' | 'TE' | 'GU' | 'KN' | 'ML' | 'PA';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  isTranslating: boolean;
}

export const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'EN', label: 'English', native: 'English' },
  { code: 'HI', label: 'Hindi', native: 'हिन्दी' },
  { code: 'BN', label: 'Bengali', native: 'বাংলা' },
  { code: 'TM', label: 'Tamil', native: 'தமிழ்' },
  { code: 'MR', label: 'Marathi', native: 'मराठी' },
  { code: 'TE', label: 'Telugu', native: 'తెలుగు' },
  { code: 'GU', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'KN', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ML', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'PA', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

const translations: Record<Language, Record<string, string>> = {
  EN: {
    hero_title: "CITIZEN EMPOWERED.",
    hero_subtitle: "The AI-native OS for 1.4 Billion citizens. Intelligent routing, deep-thinking support, and one-tap welfare.",
    start_search: "START SEARCH",
    live_voice: "LIVE VOICE",
    ai_lab: "Intelligence Lab",
    enter_studio: "Enter Studio",
    national_bulletin: "National Bulletin",
    smart_matcher: "Smart Matcher",
    analyze_profile: "Analyze Profile",
    quick_matrix: "Quick Matrix",
    ask_anything: "Ask about schemes, jobs, or hospitals...",
    thinking: "Thinking...",
    services: "Services",
    schemes: "Schemes",
    media_studio: "Media Studio",
    live: "Live",
    emergency: "Emergency",
    login: "Login",
    logout: "Logout",
    lang_confirm: "Language updated to English",
    translating: "AI Translating..."
  },
  HI: {
    hero_title: "नागरिक सशक्त।",
    hero_subtitle: "1.4 अरब नागरिकों के लिए एआई-नेटिव ओएस। बुद्धिमान रूटिंग और एक-टैप कल्याण।",
    start_search: "खोज शुरू करें",
    live_voice: "लाइव आवाज़",
    ai_lab: "इंटेलिजेंस लैब",
    enter_studio: "स्टूडियो",
    national_bulletin: "राष्ट्रीय बुलेटिन",
    smart_matcher: "स्मार्ट मैचर",
    analyze_profile: "विश्लेषण करें",
    quick_matrix: "त्वरित मैट्रिक्स",
    ask_anything: "योजनाओं या नौकरियों के बारे में पूछें...",
    thinking: "सोच रहा हूँ...",
    services: "सेवाएं",
    schemes: "योजनाएं",
    media_studio: "मीडिया स्टूडियो",
    live: "लाइव",
    emergency: "आपातकाल",
    login: "लॉगिन",
    logout: "लॉगआउट",
    lang_confirm: "भाषा बदलकर हिन्दी कर दी गई है",
    translating: "AI अनुवाद कर रहा है..."
  },
  BN: {
    hero_title: "নাগরিক ক্ষমতায়ন।",
    hero_subtitle: "১৪০ কোটি নাগরিকের জন্য এআই-নেটিভ ওএস। বুদ্ধিমান রাউটিং এবং তাত্ক্ষণিক সহায়তা।",
    start_search: "অনুসন্ধান শুরু করুন",
    live_voice: "লাইভ ভয়েস",
    ai_lab: "ইন্টেলিজেন্স ল্যাব",
    enter_studio: "স্টুডিও",
    national_bulletin: "জাতীয় বুলেটিন",
    smart_matcher: "স্মার্ট ম্যাচার",
    analyze_profile: "বিশ্লেষণ করুন",
    quick_matrix: "কুইক ম্যাট্রিক্স",
    ask_anything: "স্কিম বা চাকরি সম্পর্কে জিজ্ঞাসা করুন...",
    thinking: "ভাবছি...",
    services: "পরিষেবা",
    schemes: "স্কিম",
    media_studio: "মিডিয়া স্টুডিও",
    live: "লাইভ",
    emergency: "জরুরী",
    login: "লগইন",
    logout: "লগআউট",
    lang_confirm: "ভাষা বাংলা করা হয়েছে",
    translating: "AI অনুবাদ করছে..."
  },
  TM: {
    hero_title: "குடிமக்கள் அதிகாரம்.",
    hero_subtitle: "1.4 பில்லியன் குடிமக்களுக்கான AI-நேட்டிவ் OS. அறிவார்ந்த ரூட்டிங் மற்றும் உடனடி உதவி.",
    start_search: "தேடலைத் தொடங்கு",
    live_voice: "லைவ் வாய்ஸ்",
    ai_lab: "நுண்ணறிவு ஆய்வகம்",
    enter_studio: "ஸ்டுடியோ",
    national_bulletin: "தேசிய செய்தி",
    smart_matcher: "ஸ்மார்ட் மேட்சர்",
    analyze_profile: "பகுப்பாய்வு செய்",
    quick_matrix: "விரைவான மேட்ரிக்ஸ்",
    ask_anything: "திட்டங்கள் பற்றி கேளுங்கள்...",
    thinking: "யோசிக்கிறேன்...",
    services: "சேவைகள்",
    schemes: "திட்டங்கள்",
    media_studio: "மீடியா ஸ்டுடியோ",
    live: "லைவ்",
    emergency: "அவசரம்",
    login: "உள்நுழை",
    logout: "வெளியேறு",
    lang_confirm: "மொழி தமிழுக்கு மாற்றப்பட்டது",
    translating: "AI மொழிபெயர்க்கிறது..."
  },
  MR: {
    hero_title: "नागरिक सक्षमीकरण.",
    hero_subtitle: "१.४ अब्ज नागरिकांसाठी एआय-नेटिव्ह ओएस. बुद्धिमान राउटिंग आणि त्वरित कल्याण.",
    start_search: "शोध सुरू करा",
    live_voice: "थेट आवाज",
    ai_lab: "इंटेलिजन्स लॅब",
    enter_studio: "स्टुडिओ",
    national_bulletin: "राष्ट्रीय बातमी",
    smart_matcher: "स्मार्ट मॅचर",
    analyze_profile: "प्रोफाइल विश्लेषण",
    quick_matrix: "क्विक मॅट्रिक्स",
    ask_anything: "योजना किंवा नोकऱ्यांबद्दल विचारा...",
    thinking: "विचार करत आहे...",
    services: "सेवा",
    schemes: "योजना",
    media_studio: "मीडिया स्टुडिओ",
    live: "थेट",
    emergency: "आणीबाणी",
    login: "लॉगिन",
    logout: "लॉगआउट",
    lang_confirm: "भाषा मराठी करण्यात आली आहे",
    translating: "AI भाषांतर करत आहे..."
  },
  TE: {
    hero_title: "పౌర సాధికారత.",
    hero_subtitle: "1.4 బిలియన్ పౌరుల కోసం AI-నేటివ్ OS. తెలివైన రౌటింగ్ మరియు తక్షణ సహాయం.",
    start_search: "సెర్ಚ್ ప్రారంభించండి",
    live_voice: "లైవ్ వాయిస్",
    ai_lab: "ఇంటెలిజెన్స్ ల్యాబ్",
    enter_studio: "స్టూడియో",
    national_bulletin: "జాతీయ బులెటిన్",
    smart_matcher: "స్మార్ట్ మ్యాచర్",
    analyze_profile: "ప్రొఫైల్ విశ్లేషణ",
    quick_matrix: "క్విక్ మ్యాట్రిక్స్",
    ask_anything: "పథకాల గురించి అడగండి...",
    thinking: "ఆలోచిస్తున్నాను...",
    services: "సేవలు",
    schemes: "పథకాలు",
    media_studio: "మీడియా స్టూడియో",
    live: "లైవ్",
    emergency: "అత్యవసర",
    login: "లాగిన్",
    logout: "లాగ్అవుట్",
    lang_confirm: "భాష తెలుగులోకి మార్చబడింది",
    translating: "AI అనువదిస్తోంది..."
  },
  GU: {
    hero_title: "નાગરિક સશક્તિકરણ.",
    hero_subtitle: "1.4 અબજ નાગરિકો માટે AI-નેટિવ OS. બુદ્ધિશાળી રૂટિંગ અને ત્વરિત કલ્યાણ.",
    start_search: "શોધ શરૂ કરો",
    live_voice: "લાઈવ અવાજ",
    ai_lab: "ઇન્ટેલિજન્સ લેબ",
    enter_studio: "સ્ટુડિયો",
    national_bulletin: "રાષ્ટ્રીય બુલેટિન",
    smart_matcher: "સ્માર્ટ મેચર",
    analyze_profile: "પ્રોફાઇલ વિશ્લેષણ",
    quick_matrix: "ઝડપી મેટ્રિક્સ",
    ask_anything: "યોજનાઓ વિશે પૂછો...",
    thinking: "વિચારી રહ્યો છું...",
    services: "સેવાઓ",
    schemes: "યોજનાઓ",
    media_studio: "મીડિયા સ્ટુડિયો",
    live: "લાઈવ",
    emergency: "કટોકટી",
    login: "લોગિન",
    logout: "લોગઆઉટ",
    lang_confirm: "ભાષા ગુજરાતીમાં બદલાઈ ગઈ છે",
    translating: "AI અનુવાદ કરી રહ્યું છે..."
  },
  KN: {
    hero_title: "ನಾಗರಿಕ ಸಬಲೀಕರಣ.",
    hero_subtitle: "1.4 ಬಿಲಿಯನ್ ನಾಗರಿಕರಿಗೆ AI-ಸ್ಥಳೀಯ OS. ಬುದ್ಧಿವಂತ ರೂಟಿಂಗ್ ಮತ್ತು ತಕ್ಷಣದ ಸಹಾಯ.",
    start_search: "ಹುಡುಕಾಟ ಪ್ರಾರಂಭಿಸಿ",
    live_voice: "ಲೈವ್ ಧ್ವನಿ",
    ai_lab: "ಇಂಟೆಲಿಜೆನ್ಸ್ ಲ್ಯಾಬ್",
    enter_studio: "ಸ್ಟುಡಿಯೋ",
    national_bulletin: "ರಾಷ್ಟ್ರೀಯ ಬುಲೆಟಿನ್",
    smart_matcher: "ಸ್ಮಾರ್ಟ್ ಮ್ಯಾಚರ್",
    analyze_profile: "ವಿಶ್ಲೇಷಣೆ",
    quick_matrix: "ಕ್ವಿಕ್ ಮ್ಯಾಟ್ರಿಕ್ಸ್",
    ask_anything: "ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ...",
    thinking: "ಯೋಚಿಸುತ್ತಿದೆ...",
    services: "ಸೇವೆಗಳು",
    schemes: "ಯೋಜನೆಗಳು",
    media_studio: "ಮೀಡಿಯಾ ಸ್ಟುಡಿಯೋ",
    live: "ಲೈವ್",
    emergency: "ತುರ್ತು",
    login: "ಲಾಗಿನ್",
    logout: "ಲಾಗ್‌ಔಟ್",
    lang_confirm: "ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ",
    translating: "AI ಭಾಷಾಂತರಿಸುತ್ತಿದೆ..."
  },
  ML: {
    hero_title: "പൗര ശാക്തീകരണം.",
    hero_subtitle: "1.4 ബില്യൺ പൗരന്മാർക്കായി AI-അധിഷ്ഠിത OS. ബുദ്ധിപരമായ റൂട്ടിംഗും തൽക്ഷണ സഹായവും.",
    start_search: "തിരച്ചിൽ തുടങ്ങുക",
    live_voice: "തത്സമയ ശബ്ദം",
    ai_lab: "ഇന്റലിജൻസ് ലാബ്",
    enter_studio: "സ്റ്റുഡിയോ",
    national_bulletin: "ദേശീയ വാർത്തകൾ",
    smart_matcher: "സ്മാർട്ട് മാച്ചർ",
    analyze_profile: "വിശകലനം ചെയ്യുക",
    quick_matrix: "ക്വിക്ക് മാട്രിക്സ്",
    ask_anything: "പദ്ധതികളെക്കുറിച്ച് ചോദിക്കുക...",
    thinking: "ചിന്തിക്കുന്നു...",
    services: "സേവനങ്ങൾ",
    schemes: "പദ്ധതികൾ",
    media_studio: "മീഡിയ സ്റ്റുഡിയോ",
    live: "തത്സമയം",
    emergency: "അടിയന്തരാവസ്ഥ",
    login: "ലോഗിൻ",
    logout: "ലോഗ്ഔട്ട്",
    lang_confirm: "ഭാഷ മലയാളത്തിലേക്ക് മാറ്റി",
    translating: "AI വിവർത്തനം ചെയ്യുന്നു..."
  },
  PA: {
    hero_title: "ਨਾਗਰਿਕ ਸਸ਼ਕਤੀਕਰਨ।",
    hero_subtitle: "1.4 ਬਿਲੀਅਨ ਨਾਗਰਿਕਾਂ ਲਈ AI-ਨੇਟਿਵ OS। ਬੁੱਧੀਮਾਨ ਰੂਟਿੰਗ ਅਤੇ ਤੁਰੰਤ ਸਹਾਇਤਾ।",
    start_search: "ਖੋਜ ਸ਼ੁਰੂ ਕਰੋ",
    live_voice: "ਲਾਈਵ ਆਵਾਜ਼",
    ai_lab: "ਇੰਟੈਲੀਜੈਂਸ ਲੈਬ",
    enter_studio: "ਸਟੂਡੀਓ",
    national_bulletin: "ਰਾਸ਼ਟਰੀ ਬੁਲੇਟਿਨ",
    smart_matcher: "ਸਮਾਰਟ ਮੈਚਰ",
    analyze_profile: "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    quick_matrix: "ਤੁਰੰਤ ਮੈਟ੍ਰਿਕਸ",
    ask_anything: "ਸਕੀਮਾਂ ਬਾਰੇ ਪੁੱਛੋ...",
    thinking: "ਸੋਚ ਰਿਹਾ ਹੈ...",
    services: "ਸੇਵਾਵਾਂ",
    schemes: "ਸਕੀਮਾਂ",
    media_studio: "ਮੀਡੀਆ ਸਟੂਡੀਓ",
    live: "ਲਾਈਵ",
    emergency: "ਐਮਰਜੈਂਸੀ",
    login: "ਲੌਗਇਨ",
    logout: "ਲੌਗਆਊਟ",
    lang_confirm: "ਭਾਸ਼ਾ ਪੰਜਾਬੀ ਵਿੱਚ ਬਦਲ ਦਿੱਤੀ ਗਈ ਹੈ",
    translating: "AI ਅਨੁਵਾਦ ਕਰ ਰਿਹਾ ਹੈ..."
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
