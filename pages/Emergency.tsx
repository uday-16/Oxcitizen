
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
      <div className="bg-red-600 rounded-[2.5rem] p-12 text-white mb-16 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Emergency Hub</h1>
          <p className="text-xl mb-10 opacity-90">One-tap access to critical life-saving services. Stay calm, help is a call away.</p>
          <button className="bg-white text-red-600 px-12 py-6 rounded-3xl font-bold text-2xl shadow-xl hover:scale-105 active:scale-95 transition-all animate-pulse-red">
            🚨 TRIGGER SOS
          </button>
          <p className="mt-6 text-sm opacity-80">This will share your location and alert nearby emergency services.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {contacts.map((contact, i) => (
          <div key={i} className={`${contact.color} p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 group`}>
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              {contact.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{contact.name}</h3>
            <div className="text-3xl font-black text-gray-900 mb-6 tracking-tighter">{contact.number}</div>
            <a 
              href={`tel:${contact.number}`}
              className="block w-full text-center bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors"
            >
              Call Now
            </a>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-gray-50 dark:bg-gray-900 p-10 rounded-3xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-8">What to do in an Emergency?</h2>
          <div className="space-y-6">
            <StepItem number="1" text="Stay Calm & Find a Safe Spot" />
            <StepItem number="2" text="Call the relevant Emergency Number" />
            <StepItem number="3" text="State your location & exact nature of emergency" />
            <StepItem number="4" text="Follow instructions given by the operator" />
            <StepItem number="5" text="Keep your phone line free for incoming calls" />
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-10 rounded-3xl border border-blue-100 dark:border-blue-800">
          <h2 className="text-2xl font-bold mb-6 text-blue-900 dark:text-blue-100">Nearby Emergency Centres</h2>
          <p className="mb-6 text-blue-700 dark:text-blue-300">Allow location access to find hospitals, police stations, and fire departments near you.</p>
          <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-300 dark:border-blue-700">
             <div className="text-center">
                <MapPin className="mx-auto mb-4 text-blue-600" size={48} />
                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Enable Location</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepItem = ({ number, text }: { number: string, text: string }) => (
  <div className="flex gap-4 items-center">
    <div className="w-10 h-10 bg-white dark:bg-gray-800 border-2 border-red-500 rounded-full flex items-center justify-center shrink-0 font-bold text-red-500">
      {number}
    </div>
    <p className="text-gray-700 dark:text-gray-300 font-semibold">{text}</p>
  </div>
);

export default Emergency;
