
import React, { useState } from 'react';
import { Calculator, Landmark, ShieldCheck, UserCheck } from 'lucide-react';

const Tools: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 page-enter">
      <div className="relative h-[40vh] rounded-[3rem] overflow-hidden mb-16 shadow-2xl group">
        <img 
          src="https://picsum.photos/seed/tools/1600/900" 
          alt="Tools Hero"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent flex items-center">
          <div className="px-12 max-w-2xl text-white">
            <h1 className="text-6xl md:text-8xl font-black mb-6 uppercase tracking-tighter">Citizen Tools</h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed font-medium">Handy calculators and verification utilities for daily needs.</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <ToolCard 
           title="EMI Calculator" 
           desc="Calculate your home, car, or personal loan EMIs instantly."
           icon={<Landmark className="text-blue-600" />}
        />
        <ToolCard 
           title="Tax Calculator" 
           desc="Estimate your income tax based on the latest budget slabs."
           icon={<Calculator className="text-green-600" />}
        />
        <ToolCard 
           title="Eligibility Checker" 
           desc="Check if you're eligible for top government schemes."
           icon={<ShieldCheck className="text-purple-600" />}
        />
        <ToolCard 
           title="Age Calculator" 
           desc="Quickly find your exact age for document applications."
           icon={<UserCheck className="text-orange-600" />}
        />
      </div>

      {/* EMI Calculator Component */}
      <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-12 shadow-2xl border border-gray-100 dark:border-gray-700 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Interactive EMI Calculator</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <CalculatorInput label="Loan Amount" value="₹5,00,000" />
            <CalculatorInput label="Interest Rate (%)" value="8.5" />
            <CalculatorInput label="Loan Tenure (Years)" value="5" />
          </div>
          <div className="bg-blue-600 rounded-[2rem] p-10 text-white flex flex-col items-center justify-center text-center">
            <span className="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">Estimated Monthly EMI</span>
            <div className="text-5xl font-black mb-6">₹10,258</div>
            <div className="w-full h-1 bg-white/20 rounded-full mb-6"></div>
            <div className="grid grid-cols-2 w-full gap-4">
              <div>
                <div className="text-xs font-bold opacity-70 mb-1">Total Principal</div>
                <div className="font-bold">₹5,00,000</div>
              </div>
              <div>
                <div className="text-xs font-bold opacity-70 mb-1">Total Interest</div>
                <div className="font-bold">₹1,15,480</div>
              </div>
            </div>
            <button className="mt-10 bg-white text-blue-600 w-full py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
              Download Summary PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToolCard = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 hover-lift group">
    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="text-gray-500 mb-6 leading-relaxed">{desc}</p>
    <button className="text-blue-600 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
      Open Tool <ArrowRight size={18} />
    </button>
  </div>
);

const CalculatorInput = ({ label, value }: { label: string, value: string }) => (
  <div>
    <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{label}</label>
    <input 
      type="text" 
      defaultValue={value}
      className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl px-4 py-4 font-bold text-xl focus:border-blue-500 outline-none transition-all"
    />
  </div>
);

const ArrowRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default Tools;
