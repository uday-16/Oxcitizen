
import React, { useState } from 'react';
import { Search as SearchIcon, Sparkles, ExternalLink, RefreshCw, ArrowRight, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ text: string, links: any[] } | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResults(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: 'You are an elite citizen information officer. Use Google Search to find current government news, scheme updates, or job listings. Provide citations and direct URLs.'
        }
      });

      const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = grounding.map((g: any) => g.web).filter(Boolean);
      
      setResults({
        text: response.text || "Analyzed search results...",
        links
      });
    } catch (err) {
      console.error('Search Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-up max-w-4xl min-h-[80vh]">
      <div className="text-center mb-16 space-y-6">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Global <span className="text-blue-600">Oracle</span></h1>
        <p className="text-slate-500 font-medium">Real-time civic intelligence powered by Google Search Grounding.</p>
      </div>

      <div className="relative group mb-16">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <form onSubmit={handleSearch} className="relative flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl">
          <div className="pl-8 text-blue-600">
            <SearchIcon size={24} />
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for recent scheme launches, news, or job bulletins..."
            className="flex-grow py-8 px-4 bg-transparent outline-none font-bold text-xl placeholder:text-slate-300"
          />
          <button 
            type="submit"
            disabled={loading}
            className={`px-12 py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-widest transition-all ${loading ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95'}`}
          >
            {loading ? <RefreshCw className="animate-spin" /> : 'EXECUTE'}
          </button>
        </form>
      </div>

      <div className="space-y-12">
        {loading && (
          <div className="space-y-8 py-10">
             <SkeletonLine className="w-3/4 h-8" />
             <SkeletonLine className="w-full h-4" />
             <SkeletonLine className="w-5/6 h-4" />
             <SkeletonLine className="w-4/6 h-4" />
          </div>
        )}

        {results && (
          <div className="animate-fade-in space-y-12">
            <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5 text-blue-600 pointer-events-none">
                  <Sparkles size={200} />
               </div>
               <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed font-medium">
                  {results.text.split('\n').map((line, i) => (
                    <p key={i} className="mb-4">{line}</p>
                  ))}
               </div>
            </div>

            {results.links.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 ml-8">Information Sources</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {results.links.map((link, i) => (
                    <a key={i} href={link.uri} target="_blank" rel="noreferrer" className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-blue-600 transition-all group">
                       <div className="space-y-1 overflow-hidden">
                          <p className="font-black text-sm uppercase truncate">{link.title || 'Official Government Source'}</p>
                          <p className="text-[10px] text-slate-400 font-bold truncate">{link.uri}</p>
                       </div>
                       <ExternalLink size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!loading && !results && (
           <div className="grid md:grid-cols-3 gap-6 opacity-40">
              <SuggestCard icon={<Sparkles />} text="What are the new railway jobs in 2024?" onClick={setQuery} />
              <SuggestCard icon={<MessageSquare />} text="Summary of PM-Kisan 16th installment" onClick={setQuery} />
              <SuggestCard icon={<ArrowRight />} text="Recent updates to Ayushman Bharat in Delhi" onClick={setQuery} />
           </div>
        )}
      </div>
    </div>
  );
};

const SkeletonLine = ({ className }: { className: string }) => (
  <div className={`${className} bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse`}></div>
);

const SuggestCard = ({ icon, text, onClick }: any) => (
  <button onClick={() => onClick(text)} className="p-8 rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-4 hover:scale-105 transition-all">
    <div className="text-blue-600">{icon}</div>
    <p className="text-xs font-black uppercase tracking-widest leading-relaxed">{text}</p>
  </button>
);

export default GlobalSearch;
