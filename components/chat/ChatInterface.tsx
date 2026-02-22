
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Volume2, X, Sparkles, Languages, MessageSquare, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Message } from '../../types';
import { chatWithCitizenAI, startLiveVoiceSession } from '../../src/services/geminiService';
import { encodePCM, decodePCM, decodeAudioData } from '../../src/services/audioService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState<Language>('EN');
  const [status, setStatus] = useState('Idle');

  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);

  const langMap: Record<Language, string> = {
    EN: 'en-IN',
    HI: 'hi-IN',
    TE: 'te-IN'
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendText = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Simple language detection heuristic
    if (/[\u0900-\u097F]/.test(inputText)) {
      setLang('HI');
    } else if (/[\u0c00-\u0c7f]/.test(inputText)) {
      setLang('TE');
    }

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const result = await chatWithCitizenAI(inputText, history);
      
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: result.text || "I'm sorry, I couldn't process that.",
        timestamp: Date.now(),
        grounding: result.grounding
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceMode = async () => {
    setIsLive(true);
    setStatus('Initializing...');
    
    try {
      const outCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const inCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = outCtx;
      inputContextRef.current = inCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const session = await startLiveVoiceSession({
        onopen: () => {
          setStatus('Listening...');
          const source = inCtx.createMediaStreamSource(stream);
          const processor = inCtx.createScriptProcessor(4096, 1, 1);
          
          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const pcmBase64 = encodePCM(inputData);
            session.sendRealtimeInput({
              media: { data: pcmBase64, mimeType: 'audio/pcm;rate=16000' }
            });
          };
          
          source.connect(processor);
          processor.connect(inCtx.destination);
        },
        onmessage: async (msg: any) => {
          const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (audioData) {
            setStatus('Speaking...');
            const buffer = await decodeAudioData(decodePCM(audioData), outCtx);
            const source = outCtx.createBufferSource();
            source.buffer = buffer;
            source.connect(outCtx.destination);
            
            const startTime = Math.max(nextStartTimeRef.current, outCtx.currentTime);
            source.start(startTime);
            nextStartTimeRef.current = startTime + buffer.duration;
          }

          if (msg.serverContent?.turnComplete) {
            setStatus('Listening...');
          }

          if (msg.serverContent?.interrupted) {
            // Handle interruption if needed
            nextStartTimeRef.current = outCtx.currentTime;
          }
        },
        onclose: () => {
          stopVoiceMode();
        },
        onerror: (err: any) => {
          console.error(err);
          stopVoiceMode();
        }
      }, langMap[lang]);

      sessionRef.current = session;
    } catch (err) {
      console.error(err);
      setIsLive(false);
    }
  };

  const stopVoiceMode = () => {
    sessionRef.current?.close();
    audioContextRef.current?.close();
    inputContextRef.current?.close();
    setIsLive(false);
    setStatus('Idle');
    nextStartTimeRef.current = 0;
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden relative">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 className="font-black uppercase tracking-tighter text-lg">CitizenAI</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital Companion</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-3 py-1.5 text-xs font-bold outline-none cursor-pointer"
          >
            <option value="EN">English</option>
            <option value="HI">Hindi</option>
            <option value="TE">Telugu</option>
          </select>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
            <MessageSquare size={48} className="text-slate-300" />
            <p className="font-medium text-slate-400">Ask me about government schemes,<br/>jobs, or local services.</p>
          </div>
        )}
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-[1.5rem] font-medium text-sm leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-sky-600 text-white rounded-tr-none' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
            }`}>
              {m.text}
              {m.grounding && m.grounding.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Sources:</p>
                  {m.grounding.map((chunk, i) => (
                    chunk.web && (
                      <a 
                        key={i} 
                        href={chunk.web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[10px] text-sky-600 hover:underline truncate"
                      >
                        <Globe size={12} /> {chunk.web.title || chunk.web.uri}
                      </a>
                    )
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-[1.5rem] rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="flex items-center gap-3">
          <button 
            onClick={startVoiceMode}
            className="w-14 h-14 bg-sky-100 dark:bg-sky-900/30 text-sky-600 rounded-2xl flex items-center justify-center hover:scale-105 transition-all shadow-sm"
          >
            <Mic size={24} />
          </button>
          <div className="flex-grow relative">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
              placeholder="Type your message..."
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sky-500/20 font-medium"
            />
          </div>
          <button 
            onClick={handleSendText}
            disabled={!inputText.trim() || isLoading}
            className="w-14 h-14 bg-sky-600 text-white rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:scale-100 hover:scale-105 transition-all shadow-lg shadow-sky-500/20"
          >
            <Send size={24} />
          </button>
        </div>
      </div>

      {/* Live Mode Overlay */}
      <AnimatePresence>
        {isLive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-sky-600 z-50 flex flex-col items-center justify-center text-white p-12"
          >
            <button 
              onClick={stopVoiceMode}
              className="absolute top-10 right-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={24} />
            </button>

            <div className="relative mb-20">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-48 h-48 bg-white/10 rounded-full absolute -inset-4"
              />
              <motion.div 
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                className="w-48 h-48 bg-white/5 rounded-full absolute -inset-8"
              />
              <div className="w-48 h-48 bg-white text-sky-600 rounded-full flex items-center justify-center shadow-2xl relative z-10">
                <Volume2 size={80} />
              </div>
            </div>

            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">CitizenAI Live</h3>
            <p className="text-sky-100 font-medium text-lg mb-12 opacity-80">{status}</p>
            
            <div className="flex items-center gap-4 bg-white/10 px-6 py-3 rounded-full backdrop-blur-xl border border-white/10">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-black uppercase tracking-widest">Voice Protocol Active</span>
            </div>

            <button 
              onClick={stopVoiceMode}
              className="mt-20 bg-white text-sky-600 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-105 transition-all"
            >
              End Conversation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatInterface;
