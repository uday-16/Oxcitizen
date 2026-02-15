
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, Sparkles, Volume2, Target, Heart } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string, actions?: any[] }[]>([
    { role: 'bot', text: 'Namaste! I am your OXCITIZEN Assistant. I can help you apply for schemes, find jobs, or get medical help. What do you need today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: textToSend,
        config: {
          systemInstruction: 'You are OXAssistant, an Indian citizen services expert. You help with welfare schemes, jobs, and healthcare. Keep responses helpful and professional. If the user asks about schemes, suggest using the Smart Matcher tool.',
        },
      });

      const botText = response.text || "I'm here to help, but I'm having a technical glitch. Try again?";
      
      // Smart injection of actions based on response content
      let actions = [];
      if (botText.toLowerCase().includes('scheme')) {
        actions.push({ label: 'Smart Matcher', icon: <Target size={14}/>, link: '/smart-matcher' });
      }
      if (botText.toLowerCase().includes('health') || botText.toLowerCase().includes('doctor')) {
        actions.push({ label: 'Consult Doctor', icon: <Heart size={14}/>, link: '/consultation' });
      }

      setMessages(prev => [...prev, { role: 'bot', text: botText, actions }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: "Forgive me, my services are currently offline. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed bottom-24 right-4 lg:bottom-10 lg:right-10 z-[100]">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 w-[90vw] sm:w-[450px] h-[70vh] rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700 animate-page-enter">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-800 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Sparkles size={24} className="text-blue-100" />
              </div>
              <div>
                <h4 className="font-black uppercase tracking-tight">OX Assistant</h4>
                <p className="text-[10px] text-blue-200 flex items-center gap-1 font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  Multi-Modal AI
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-gray-900 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-none'
                }`}>
                  {m.text}
                  {m.role === 'bot' && (
                    <button onClick={() => speak(m.text)} className="mt-2 block text-gray-400 hover:text-blue-500">
                      <Volume2 size={16} />
                    </button>
                  )}
                </div>
                {m.actions && m.actions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.actions.map((act, j) => (
                      <button 
                        key={j}
                        className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-xl text-xs font-bold border border-blue-100 dark:border-blue-800 hover:scale-105 transition-all"
                      >
                        {act.icon} {act.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="p-3 flex gap-2 overflow-x-auto no-scrollbar border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
            {['Schemes for me?', 'Jobs near Mumbai', 'Emergency blood bank', 'Apply for PAN'].map(q => (
              <button 
                key={q}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Interface */}
          <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            <div className="relative flex items-center gap-3">
              <button className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl hover:bg-red-100 transition-colors">
                <Mic size={20} />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-grow pl-5 pr-12 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all text-sm font-semibold"
              />
              <button onClick={() => handleSend()} className="absolute right-2 p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-700 text-white rounded-full shadow-[0_10px_40px_rgba(37,99,235,0.4)] flex items-center justify-center hover:scale-110 active:scale-90 transition-all animate-float group"
        >
          <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center text-[10px] font-black">2</div>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
