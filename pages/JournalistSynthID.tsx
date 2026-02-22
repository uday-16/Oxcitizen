
import React, { useState } from 'react';
import { 
  ShieldCheck, Fingerprint, Globe, Sparkles, 
  ArrowRight, Download, Share2, CheckCircle2, 
  UserCheck, FileText, Award, Lock
} from 'lucide-react';
import { motion } from 'motion/react';

const JournalistSynthID: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [idGenerated, setIdGenerated] = useState(false);
  const [userName, setUserName] = useState('');

  const handleGenerate = () => {
    if (!userName) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIdGenerated(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* 🧩 VISUAL STORYTELLING: JOURNALIST HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950 px-4 py-20 rounded-[4rem] mb-20 mx-4 mt-4">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://picsum.photos/seed/journalist-hero-rich/1920/1080" 
            className="w-full h-full object-cover"
            alt="Journalist Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-slate-950/60 to-slate-950"></div>
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-blue-600/10 backdrop-blur-xl px-8 py-3 rounded-full border border-blue-600/20 text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] shadow-2xl"
            >
              <Sparkles size={16} className="text-blue-400" /> Next-Gen Verification
            </motion.div>
            <h1 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.8] text-white">Journalist <br/> <span className="text-blue-500">Synth ID.</span></h1>
            <p className="text-xl md:text-3xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
              The world's first AI-backed digital identity for independent and professional journalists. Verified, immutable, and globally recognized.
            </p>
          </div>
        </div>
      </section>

      {/* 🧩 VISUAL STORYTELLING: VERIFICATION PROCESS */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Truth <br/> <span className="text-blue-600">Verified.</span></h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Our protocol uses Gemini Vision to analyze and verify journalistic credentials in real-time. Link your physical identity with your digital press credentials securely on the OX-Chain.
              </p>
              <div className="space-y-6">
                <SecurityItem title="Biometric Sync" desc="Securely link your physical identity with digital credentials." />
                <SecurityItem title="Immutable Records" desc="Reporting history stored on a tamper-proof ledger." />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
              <img 
                src="https://picsum.photos/seed/verification-process/1200/1000" 
                className="rounded-[4rem] shadow-2xl relative z-10 border border-slate-100 dark:border-slate-800"
                alt="Verification"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-24">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: Generation Form */}
          <div className="lg:col-span-7 space-y-12">
            <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 shadow-2xl border border-slate-100 dark:border-slate-800">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4">
                <Fingerprint className="text-blue-600" size={32} /> Generate Your Identity
              </h2>
              
              {!idGenerated ? (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6">Full Legal Name</label>
                    <input 
                      type="text" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Aryan Sharma"
                      className="w-full p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 outline-none focus:ring-8 focus:ring-blue-600/5 font-bold text-xl"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6">Press Organization</label>
                      <input 
                        type="text" 
                        placeholder="Independent / Organization"
                        className="w-full p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 outline-none focus:ring-4 focus:ring-blue-600/5 font-bold"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6">Specialization</label>
                      <select className="w-full p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 outline-none focus:ring-4 focus:ring-blue-600/5 font-bold appearance-none">
                        <option>Investigative</option>
                        <option>Political</option>
                        <option>Environmental</option>
                        <option>Tech & AI</option>
                        <option>Conflict Zone</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !userName}
                    className={`w-full py-8 rounded-[2.5rem] font-black text-xl uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-2xl transition-all active:scale-95 ${isGenerating || !userName ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white shadow-blue-500/40 hover:scale-[1.02]'}`}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="animate-spin" /> SYNTHESIZING IDENTITY...
                      </>
                    ) : (
                      <>
                        <ShieldCheck /> INITIALIZE SYNTH ID
                      </>
                    )}
                  </button>
                  
                  <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                    By initializing, you agree to the OXCITIZEN Journalistic Integrity Protocol.
                  </p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-10 py-10"
                >
                  <div className="w-32 h-32 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 size={64} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black uppercase tracking-tighter">Synth ID Activated</h3>
                    <p className="text-slate-500 font-medium text-lg">Your digital identity has been minted on the OX-Chain and verified by Gemini Vision.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                      <Download size={18} /> Download Credentials
                    </button>
                    <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                      <Share2 size={18} /> Share Verification
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <FeatureCard 
                icon={<UserCheck className="text-blue-600" />}
                title="Biometric Sync"
                desc="Securely link your physical identity with your digital press credentials."
              />
              <FeatureCard 
                icon={<Globe className="text-emerald-600" />}
                title="Global Recognition"
                desc="Accepted by 500+ international news agencies and government bodies."
              />
              <FeatureCard 
                icon={<FileText className="text-amber-600" />}
                title="Immutable Records"
                desc="Your reporting history and credentials stored on a tamper-proof ledger."
              />
              <FeatureCard 
                icon={<Award className="text-purple-600" />}
                title="AI Verification"
                desc="Gemini-powered content verification to combat deepfakes and misinformation."
              />
            </div>
          </div>

          {/* Right: Preview & Info */}
          <div className="lg:col-span-5 space-y-12">
            {/* ID Card Preview */}
            <div className="sticky top-24 space-y-12">
              <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden aspect-[1.6/1] border border-white/10 group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/20">
                        <span className="font-black text-lg">OX</span>
                      </div>
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-60">Citizen Super-App</p>
                        <p className="text-xs font-black uppercase tracking-widest">Synth ID Protocol</p>
                      </div>
                    </div>
                    <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-emerald-500/30">
                      Active
                    </div>
                  </div>

                  <div className="flex gap-8 items-end">
                    <div className="w-24 h-24 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden relative">
                      {userName ? (
                        <img src={`https://i.pravatar.cc/200?u=${userName}`} className="w-full h-full object-cover" alt="Profile" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-20">
                          <Fingerprint size={48} />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow space-y-2">
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-50">Verified Journalist</p>
                      <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">{userName || 'YOUR NAME'}</h3>
                      <div className="flex gap-4 pt-2">
                        <div>
                          <p className="text-[6px] font-black uppercase opacity-40">ID Number</p>
                          <p className="text-[10px] font-mono font-bold">OX-JRN-2026-X99</p>
                        </div>
                        <div>
                          <p className="text-[6px] font-black uppercase opacity-40">Expires</p>
                          <p className="text-[10px] font-mono font-bold">FEB 2028</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl space-y-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <Lock className="text-blue-600" size={24} /> Security Protocol
                </h3>
                <div className="space-y-6">
                  <SecurityItem title="End-to-End Encryption" desc="Your personal data is encrypted before it ever leaves your device." />
                  <SecurityItem title="Zero-Knowledge Proofs" desc="Verify your identity without revealing unnecessary personal details." />
                  <SecurityItem title="Biometric Binding" desc="Your Synth ID is uniquely tied to your biometric signature." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all group">
    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
      {icon}
    </div>
    <h3 className="text-xl font-black uppercase tracking-tighter mb-3">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">{desc}</p>
  </div>
);

const SecurityItem = ({ title, desc }: any) => (
  <div className="flex gap-4 group">
    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
    <div>
      <h4 className="font-black text-xs uppercase tracking-widest mb-1">{title}</h4>
      <p className="text-slate-500 dark:text-slate-400 text-[10px] font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
);

export default JournalistSynthID;
