
import React, { useState, useEffect } from 'react';
import { 
  Camera, Play, Sparkles, Download, 
  Trash2, Image as ImageIcon,
  Square, RectangleHorizontal, RectangleVertical, 
  RefreshCw, Lock, AlertCircle
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const MediaStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: 'image' | 'video', url: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const [hasKey, setHasKey] = useState(false);

  // Configuration States
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [resolution, setResolution] = useState('720p');

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    // @ts-ignore
    const selected = await window.aistudio.hasSelectedApiKey();
    setHasKey(selected);
  };

  const handleOpenKeyDialog = async () => {
    // @ts-ignore
    await window.aistudio.openSelectKey();
    setHasKey(true);
  };

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);
    setProgress(10);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
            imageSize: imageSize as any
          }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setResult({ type: 'image', url: `data:image/png;base64,${part.inlineData.data}` });
          break;
        }
      }
    } catch (err: any) {
      console.error('Image Gen Error:', err);
      if (err.message?.includes('found')) {
        setHasKey(false);
      }
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const generateVideo = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);
    setProgress(5);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: resolution as any,
          aspectRatio: aspectRatio as any
        }
      });

      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        setProgress(p => Math.min(p + 15, 98));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      setResult({ type: 'video', url: URL.createObjectURL(blob) });
    } catch (err: any) {
      console.error('Video Gen Error:', err);
      if (err.message?.includes('found')) {
        setHasKey(false);
      }
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  if (!hasKey) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-slate-50 dark:bg-slate-950">
        <div className="bg-white dark:bg-slate-900 p-16 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-2xl max-w-2xl space-y-10">
          <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto animate-float">
            <Lock size={48} />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">Authorization Required</h1>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            Media Studio requires a paid project API key for high-fidelity generation. 
            Please select a key from a project with billing enabled.
          </p>
          <div className="space-y-4">
            <button 
              onClick={handleOpenKeyDialog}
              className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl shadow-2xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              SELECT API KEY
            </button>
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noreferrer"
              className="block text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
            >
              Billing Documentation ↗
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-up max-w-7xl">
      <header className="mb-20 text-center space-y-6">
        <div className="inline-flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 px-8 py-3 rounded-full text-xs font-black text-blue-600 uppercase tracking-widest">
           <Sparkles size={16} /> Production-Grade AI Engine
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Media <span className="text-blue-600">Studio</span></h1>
        <p className="text-slate-500 font-medium text-xl max-w-3xl mx-auto">Create high-resolution civic visuals and cinematic videos for 1.4B citizens.</p>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Controls Column */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 space-y-12">
            {/* Tab Switcher */}
            <div className="flex bg-slate-100 dark:bg-slate-950 p-2 rounded-[2rem]">
              <button 
                onClick={() => setActiveTab('image')}
                className={`flex-1 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${activeTab === 'image' ? 'bg-white dark:bg-slate-800 shadow-xl text-blue-600' : 'text-slate-400'}`}
              >
                <ImageIcon size={20} /> IMAGES
              </button>
              <button 
                onClick={() => setActiveTab('video')}
                className={`flex-1 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${activeTab === 'video' ? 'bg-white dark:bg-slate-800 shadow-xl text-blue-600' : 'text-slate-400'}`}
              >
                <Play size={20} /> VIDEOS
              </button>
            </div>

            {/* Prompt Input */}
            <div className="space-y-6">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-6">Creative Instruction</label>
               <textarea 
                 value={prompt}
                 onChange={(e) => setPrompt(e.target.value)}
                 placeholder={activeTab === 'image' ? "Portrait of a modern Indian digital entrepreneur in Bangalore office, sunset light..." : "Cinematic drone fly-through of a green sustainable smart city in India..."}
                 className="w-full p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 outline-none focus:ring-8 focus:ring-blue-600/5 min-h-[180px] font-bold text-lg leading-tight"
               />
            </div>

            {/* Config Sections */}
            <div className="space-y-10">
              <ConfigGroup title="Target Aspect Ratio">
                 <div className="grid grid-cols-3 gap-3">
                    <AspectBtn active={aspectRatio === '1:1'} label="1:1" icon={<Square size={16}/>} onClick={() => setAspectRatio('1:1')} />
                    <AspectBtn active={aspectRatio === '16:9'} label="16:9" icon={<RectangleHorizontal size={16}/>} onClick={() => setAspectRatio('16:9')} />
                    <AspectBtn active={aspectRatio === '9:16'} label="9:16" icon={<RectangleVertical size={16}/>} onClick={() => setAspectRatio('9:16')} />
                 </div>
              </ConfigGroup>

              {activeTab === 'image' ? (
                <ConfigGroup title="Output Quality">
                   <div className="grid grid-cols-3 gap-3">
                      {['1K', '2K', '4K'].map(s => (
                        <button key={s} onClick={() => setImageSize(s)} className={`py-4 rounded-2xl text-xs font-black border transition-all ${imageSize === s ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/30' : 'border-slate-100 dark:border-slate-800 text-slate-400'}`}>{s}</button>
                      ))}
                   </div>
                </ConfigGroup>
              ) : (
                <ConfigGroup title="Video Resolution">
                   <div className="grid grid-cols-2 gap-3">
                      {['720p', '1080p'].map(r => (
                        <button key={r} onClick={() => setResolution(r)} className={`py-4 rounded-2xl text-xs font-black border transition-all ${resolution === r ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/30' : 'border-slate-100 dark:border-slate-800 text-slate-400'}`}>{r}</button>
                      ))}
                   </div>
                </ConfigGroup>
              )}
            </div>

            <button 
              onClick={activeTab === 'image' ? generateImage : generateVideo}
              disabled={loading}
              className={`w-full py-8 rounded-[2.5rem] font-black text-xl uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-2xl transition-all active:scale-95 ${loading ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white shadow-blue-500/40 hover:scale-[1.02]'}`}
            >
              {loading ? <RefreshCw className="animate-spin" /> : <Sparkles />}
              {loading ? 'SYNTHESIZING...' : 'GENERATE ASSET'}
            </button>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-[2.5rem] flex items-center gap-5 border border-amber-100 dark:border-amber-800">
             <AlertCircle className="text-amber-600 shrink-0" size={28} />
             <p className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase leading-relaxed tracking-wider">High-fidelity models utilize advanced compute resources. Credits will be consumed from your selected API project.</p>
          </div>
        </aside>

        {/* Results Column */}
        <main className="lg:col-span-8 space-y-10">
           <div className="bg-white dark:bg-slate-900 rounded-[4rem] min-h-[700px] border border-slate-100 dark:border-slate-800 shadow-2xl relative flex items-center justify-center overflow-hidden">
              {!loading && !result && (
                <div className="text-center p-20 space-y-8">
                   <div className="w-32 h-32 bg-slate-50 dark:bg-slate-950 rounded-[3rem] flex items-center justify-center mx-auto text-slate-200 border border-slate-100 dark:border-slate-800 shadow-inner">
                      <ImageIcon size={64} />
                   </div>
                   <div className="space-y-4">
                     <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-300">Workspace Empty</h3>
                     <p className="text-slate-400 font-bold text-lg max-w-xs mx-auto">Provide a prompt on the left to start the creation process.</p>
                   </div>
                </div>
              )}

              {loading && (
                <div className="text-center space-y-12 w-full max-w-lg px-12">
                   <div className="relative">
                      <div className="w-40 h-40 border-[16px] border-slate-100 dark:border-slate-800 rounded-full mx-auto"></div>
                      <div 
                        className="absolute inset-0 w-40 h-40 border-[16px] border-blue-600 rounded-full mx-auto transition-all duration-700 ease-in-out"
                        style={{ clipPath: `inset(0 0 ${100 - progress}% 0)`, transform: 'rotate(-90deg)' }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center font-black text-4xl text-blue-600">
                         {Math.round(progress)}%
                      </div>
                   </div>
                   <div className="space-y-6">
                      <h3 className="text-4xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse">Forging...</h3>
                      <p className="text-slate-500 text-lg font-bold">Neural networks are translating your text into high-fidelity pixels. Please maintain connection.</p>
                   </div>
                </div>
              )}

              {result && (
                <div className="w-full h-full animate-fade-in group bg-slate-50 dark:bg-black">
                  {result.type === 'image' ? (
                    <img src={result.url} className="w-full h-full object-contain" alt="Generated Asset" />
                  ) : (
                    <video src={result.url} controls autoPlay loop className="w-full h-full object-contain shadow-2xl" />
                  )}
                  
                  {/* Floating Action Bar */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-6 transition-all duration-500 transform translate-y-32 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                     <a href={result.url} download={`oxcitizen_${Date.now()}`} className="bg-white text-slate-900 p-6 rounded-3xl hover:bg-slate-100 shadow-2xl flex items-center gap-3 font-black text-xs uppercase tracking-widest">
                        <Download size={24} /> Download 4K
                     </a>
                     <button onClick={() => setResult(null)} className="bg-red-600 text-white p-6 rounded-3xl hover:bg-red-700 shadow-2xl">
                        <Trash2 size={24} />
                     </button>
                  </div>
                </div>
              )}
           </div>

           {/* Gallery/Recent Placeholder */}
           <div className="grid grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] opacity-30 border-4 border-dashed border-slate-300 dark:border-slate-800 flex items-center justify-center">
                   <Sparkles className="text-slate-300" size={32} />
                </div>
              ))}
           </div>
        </main>
      </div>
    </div>
  );
};

const ConfigGroup = ({ title, children }: any) => (
  <div className="space-y-6">
    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-6">{title}</h4>
    {children}
  </div>
);

const AspectBtn = ({ active, label, icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all ${active ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-500/20' : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:bg-slate-50'}`}
  >
    {icon}
    <span className="text-[10px] font-black uppercase mt-3 tracking-widest">{label}</span>
  </button>
);

export default MediaStudio;
