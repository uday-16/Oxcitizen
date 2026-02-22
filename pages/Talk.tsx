
import React from 'react';
import ChatInterface from '../components/chat/ChatInterface';
import { Sparkles } from 'lucide-react';

const Talk: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-sky-100 dark:bg-sky-900/30 px-4 py-1.5 rounded-full text-[10px] font-black text-sky-600 uppercase tracking-widest">
            <Sparkles size={14} fill="currentColor" /> Voice-First AI
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Talk to <span className="text-sky-600">CitizenAI</span></h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl mx-auto">
            Your personal companion for government schemes, jobs, and citizen services. 
            Chat via text or start a real-time voice conversation.
          </p>
        </div>
        
        <ChatInterface />
        
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <FeatureCard 
            title="Multilingual"
            desc="Speak in English, Hindi, or Telugu naturally."
          />
          <FeatureCard 
            title="Real-Time"
            desc="Low-latency voice chat powered by Gemini Live."
          />
          <FeatureCard 
            title="Verified"
            desc="Information sourced from official government portals."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc }: { title: string, desc: string }) => (
  <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
    <h4 className="font-black uppercase tracking-tighter text-lg mb-2">{title}</h4>
    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default Talk;
