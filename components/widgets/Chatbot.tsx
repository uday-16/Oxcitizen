
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, ExternalLink, MapPin, Brain } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useLanguage } from '../../context/LanguageContext';

const Chatbot: React.FC = () => {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { role: 'bot', text: lang === 'EN' ? 'Namaste! I am the OXCITIZEN Assistant. How can I help?' : 
                         lang === 'HI' ? 'नमस्ते! मैं ऑक्सिटिजन सहायक हूँ। मैं आपकी कैसे मदद कर सकता हूँ?' :
                         lang === 'BN' ? 'নমস্কার! আমি অক্সিটিজেন সহকারী। আমি আপনাকে কীভাবে সাহায্য করতে পারি?' :
                         'வணக்கம்! நான் OXCITIZEN உதவியாளர். நான் உங்களுக்கு எப்படி உதவ முடியும்?' }
    ]);
  }, [lang]);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim()) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let location = null;
      try {
        const pos: any = await new Promise((res, rej) => 
          navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 })
        );
        location = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
      } catch (e) {
        console.debug('Location access denied');
      }

      const languageNames = { EN: 'English', HI: 'Hindi', BN: 'Bengali', TM: 'Tamil' };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: textToSend,
        config: {
          thinkingConfig: { thinkingBudget: 0 },
          systemInstruction: `You are the Master Citizen Assistant. IMPORTANT: Respond strictly and only in ${languageNames[lang]}. Use Google Search for news and Google Maps for places. Be concise and helpful.`,
          tools: [{ googleSearch: {} }, { googleMaps: {} }],
          toolConfig: location ? { retrievalConfig: { latLng: location } } : undefined
        },
      });

      const botText = response.text || "...";
      const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = grounding.map((g: any) => g.web || g.maps).filter(Boolean);

      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: botText, 
        sources
      }]);
    } catch (error: any) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: "Error. Please retry." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 lg:bottom-10 lg:right-10 z-[100]">
      {isOpen ? (
        <div className="bg-white dark:bg-slate-900 w-[90vw] sm:w-[500px] h-[80vh] rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden border border-slate-100 dark:border-slate-800 animate-fade-up">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-900 p-10 text-white flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-3xl rounded-[1.5rem] flex items-center justify-center border border-white/20 shadow-2xl">
                <Brain size={32} className="text-blue-300 animate-float" />
              </div>
              <div>
                <h4 className="font-black uppercase tracking-tighter text-xl leading-none">OXCITIZEN AI</h4>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-blue-200 font-black uppercase tracking-widest">{lang} MODE ACTIVE</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-4 rounded-2xl transition-all"><X size={28} /></button>
          </div>

          <div className="flex-grow overflow-y-auto p-10 space-y-10 bg-slate-50 dark:bg-slate-950 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[92%] px-8 py-6 rounded-[2.5rem] text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-800 rounded-bl-none'
                }`}>
                  <div className="whitespace-pre-wrap font-bold text-lg leading-snug">{m.text}</div>
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                      <div className="flex flex-wrap gap-3">
                        {m.sources.slice(0, 3).map((s: any, j: number) => (
                          <a key={j} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[10px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-2xl border border-blue-100/30 hover:scale-105 transition-all">
                             {s.uri.includes('google.com/maps') ? <MapPin size={14} /> : <ExternalLink size={14} />} 
                             <span className="font-black uppercase truncate max-w-[100px]">{s.title || 'Source'}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex flex-col gap-4">
                <div className="bg-white dark:bg-slate-800 px-6 py-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 w-fit flex gap-2">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="text-[10px] font-black uppercase text-blue-600 animate-pulse tracking-widest ml-4">{t('thinking')}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-10 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="relative flex items-center gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('ask_anything')}
                className="flex-grow pl-8 pr-20 py-6 rounded-[2rem] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-8 focus:ring-blue-500/5 text-lg font-bold"
              />
              <button onClick={() => handleSend()} className="absolute right-3 p-5 text-blue-600 hover:bg-blue-50 rounded-[1.5rem]">
                <Send size={28} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-24 h-24 bg-slate-900 dark:bg-blue-800 text-white rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group animate-float border-[6px] border-white dark:border-slate-800"
        >
          <Brain size={40} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
