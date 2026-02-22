
import React from 'react';
import { Phone, MapPin, AlertCircle, Heart, Shield, Flame, Zap, Ambulance } from 'lucide-react';

const Emergency: React.FC = () => {
  const contacts = [
    { name: 'Police', number: '100', icon: <Shield className="text-blue-600" />, color: 'bg-blue-50' },
    { name: 'Ambulance', number: '102', icon: <Ambulance className="text-green-600" />, color: 'bg-green-50' },
    { name: 'Fire', number: '101', icon: <Flame className="text-orange-600" />, color: 'bg-orange-50' },
    { name: 'Women Helpline', number: '1091', icon: <Heart className="text-pink-600" />, color: 'bg-pink-50' },
    { name: 'Child Helpline', number: '1098', icon: <AlertCircle className="text-yellow-600" />, color: 'bg-yellow-50' },
    { name: 'Cyber Crime', number: '1930', icon: <Shield className="text-indigo-600" />, color: 'bg-indigo-50' },
    { name: 'Natural Disaster', number: '108', icon: <Zap className="text-teal-600" />, color: 'bg-teal-50' },
    { name: 'Blood Bank', number: '104', icon: <Heart className="text-red-600" />, color: 'bg-red-50' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 page-enter">
      <div className="bg-red-700 rounded-[3rem] p-12 md:p-24 text-white mb-16 text-center shadow-2xl relative overflow-hidden group">
        <img 
          src="https://picsum.photos/seed/emergency/1600/900" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 transition-transform duration-1000 group-hover:scale-105" 
          alt="Emergency Services" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/40 to-red-800/80"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-block p-4 bg-white/20 backdrop-blur-xl rounded-3xl mb-8 animate-ring-pulse">
             <AlertCircle size={48} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">Emergency Hub</h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto font-medium leading-tight">One-tap access to critical life-saving services. Help is a click away.</p>
          <button className="bg-white text-red-700 px-16 py-8 rounded-[2.5rem] font-black text-2xl shadow-[0_0_80px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all animate-pulse-red uppercase tracking-widest">
            🚨 TRIGGER SOS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {contacts.map((contact, i) => (
          <div key={i} className={`${contact.color} p-10 rounded-[2.5rem] border border-transparent hover:border-red-200 hover:shadow-2xl transition-all hover:-translate-y-3 group relative overflow-hidden`}>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:rotate-12 transition-transform">
                {contact.icon}
              </div>
              <h3 className="text-xl font-black mb-2 uppercase text-slate-800">{contact.name}</h3>
              <div className="text-4xl font-black text-slate-900 mb-8 tracking-tighter">{contact.number}</div>
              <a 
                href={`tel:${contact.number}`}
                className="block w-full text-center bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-600 transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl">
          <h2 className="text-3xl font-black mb-10 uppercase tracking-tighter">Emergency Protocol</h2>
          <div className="space-y-8">
            <StepItem number="1" text="Stay Calm & Secure Your Immediate Surroundings" />
            <StepItem number="2" text="Dial the Relevant Service Number Provided Above" />
            <StepItem number="3" text="Provide GPS Location & Specific Incident Details" />
            <StepItem number="4" text="Follow Instructions Closely - Do Not Disconnect" />
            <StepItem number="5" text="Wait for Official Personnel to Arrive on Scene" />
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/30 p-12 rounded-[3rem] border border-blue-100 dark:border-blue-800 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-6 text-blue-900 dark:text-blue-100 uppercase tracking-tighter">Nearby Assistance</h2>
            <p className="mb-10 text-blue-700 dark:text-blue-300 text-lg font-medium">Activate location data to synchronize with local hospitals, police, and rescue teams.</p>
            <div className="aspect-video bg-white dark:bg-slate-950 rounded-[2.5rem] flex items-center justify-center border-4 border-dashed border-blue-200 dark:border-blue-900 shadow-inner group">
               <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <MapPin className="text-blue-600" size={32} />
                  </div>
                  <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-105 transition-all">Enable Intelligence</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepItem = ({ number, text }: { number: string, text: string }) => (
  <div className="flex gap-6 items-center group">
    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 border-2 border-red-500 rounded-full flex items-center justify-center shrink-0 font-black text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
      {number}
    </div>
    <p className="text-slate-700 dark:text-slate-300 font-bold text-lg leading-tight">{text}</p>
  </div>
);

export default Emergency;
