
import React, { useState } from 'react';
import { Video, PhoneOff, Mic, MicOff, VideoOff, MoreHorizontal, User, ShieldCheck } from 'lucide-react';

const Consultation: React.FC = () => {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 page-enter max-w-5xl">
      {!inCall ? (
        <div className="space-y-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black mb-6">LIVE CONSULTATION</h1>
            <p className="text-xl text-gray-500">Video call with verified health experts or legal advisors instantly.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ExpertCard 
              name="Dr. Sameer Verma" 
              role="General Physician" 
              img="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d" 
              onCall={() => setInCall(true)}
            />
            <ExpertCard 
              name="Adv. Meera Reddy" 
              role="Legal Advisor" 
              img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" 
              onCall={() => setInCall(true)}
            />
          </div>
        </div>
      ) : (
        <div className="bg-black rounded-[3rem] overflow-hidden aspect-video relative group">
          {/* Remote Video */}
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d" className="w-full h-full object-cover opacity-50" alt="Remote" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                   <User size={48} />
                </div>
                <h2 className="text-2xl font-black">Connecting to Dr. Sameer...</h2>
              </div>
            </div>
          </div>

          {/* Local Video Overlay */}
          <div className="absolute bottom-10 right-10 w-48 aspect-[3/4] bg-gray-800 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
             <div className="w-full h-full flex items-center justify-center text-gray-500">
               <VideoOff />
             </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 transition-transform duration-500 transform translate-y-20 group-hover:translate-y-0">
             <button className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/20">
               <Mic />
             </button>
             <button className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/20">
               <Video />
             </button>
             <button 
               onClick={() => setInCall(false)}
               className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 shadow-xl shadow-red-500/40"
             >
               <PhoneOff size={32} />
             </button>
             <button className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/20">
               <MoreHorizontal />
             </button>
          </div>

          {/* Verified Badge */}
          <div className="absolute top-10 left-10 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <ShieldCheck className="text-blue-400" />
            <span className="text-white text-xs font-black uppercase tracking-widest">End-to-End Encrypted</span>
          </div>
        </div>
      )}
    </div>
  );
};

const ExpertCard = ({ name, role, img, onCall }: any) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all flex flex-col items-center text-center">
    <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-blue-100 dark:border-blue-900 p-1">
      <img src={img} className="w-full h-full rounded-full object-cover" alt={name} />
    </div>
    <h3 className="text-2xl font-black mb-1">{name}</h3>
    <p className="text-blue-600 font-bold uppercase text-xs tracking-widest mb-8">{role}</p>
    <button 
      onClick={onCall}
      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-blue-500/20"
    >
      <Video size={24} /> START VIDEO CALL
    </button>
    <p className="mt-4 text-xs text-gray-400 font-bold uppercase">Avg. wait time: 2 mins</p>
  </div>
);

export default Consultation;
