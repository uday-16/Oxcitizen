
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, ShieldCheck, Sparkles, X, Activity, Waves } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';
import { useLanguage } from '../context/LanguageContext';

const LiveAssistant: React.FC = () => {
  const { lang, t } = useLanguage();
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('Idle');
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const sourceNodesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);

  const langCodes: Record<string, string> = {
    EN: 'en-IN',
    HI: 'hi-IN',
    BN: 'bn-IN',
    TM: 'ta-IN'
  };

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const startConversation = async () => {
    setStatus(lang === 'EN' ? 'Initializing AI...' : 'AI प्रारंभ हो रहा है...');
    setIsActive(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const outCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const inCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = outCtx;
      inputContextRef.current = inCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: `You are OXCITIZEN Master Voice. You help citizens via real-time conversation. IMPORTANT: Communicate STRICTLY in ${lang}. Be concise and helpful.`,
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          }
        },
        callbacks: {
          onopen: () => {
            setStatus('Listening...');
            const source = inCtx.createMediaStreamSource(stream);
            const scriptProcessor = inCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (event) => {
              const inputData = event.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inCtx.destination);
          },
          onmessage: async (message) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourceNodesRef.current.add(source);
              source.onended = () => sourceNodesRef.current.delete(source);
              setStatus('Assistant Speaking...');
            }

            if (message.serverContent?.interrupted) {
              sourceNodesRef.current.forEach(s => s.stop());
              sourceNodesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            if (message.serverContent?.turnComplete) {
              setStatus('Listening...');
            }
          }
        }
      });
      
      sessionPromiseRef.current = sessionPromise;
    } catch (err) {
      console.error('Live API Error:', err);
      setStatus('Failed');
      setIsActive(false);
    }
  };

  const stopConversation = () => {
    sessionPromiseRef.current?.then(s => s.close());
    audioContextRef.current?.close();
    inputContextRef.current?.close();
    setIsActive(false);
    setStatus('Idle');
    nextStartTimeRef.current = 0;
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-up max-w-4xl min-h-[80vh] flex flex-col items-center justify-center">
      <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 md:p-20 shadow-2xl border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden w-full">
        <div className="relative z-10 space-y-8">
          <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner animate-float">
            <Volume2 size={48} />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">NATIVE VOICE <span className="text-blue-600">PRO</span></h1>
          <p className="text-slate-500 max-w-lg mx-auto font-medium">Real-time AI conversationalist optimized for {lang}.</p>

          <div className="flex flex-col items-center justify-center py-10">
            <div className={`w-80 h-80 rounded-full border-8 transition-all duration-1000 flex items-center justify-center relative ${isActive ? 'border-blue-600 scale-110 shadow-[0_0_80px_rgba(30,64,175,0.2)]' : 'border-slate-100'}`}>
              <button 
                onClick={isActive ? stopConversation : startConversation}
                className={`w-56 h-56 rounded-full flex flex-col items-center justify-center transition-all z-10 shadow-2xl active:scale-90 ${isActive ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-600 text-white hover:scale-105'}`}
              >
                {isActive ? <MicOff size={64} /> : <Mic size={64} />}
                <span className="mt-4 font-black uppercase text-xs tracking-widest">{isActive ? 'END' : 'START'}</span>
              </button>
            </div>

            <div className="mt-12">
              <div className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-3 transition-all ${isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                <Activity size={16} className={isActive ? 'animate-spin' : ''} /> {status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAssistant;
