
import React, { useState } from 'react';
import { Target, ArrowRight, ArrowLeft, Sparkles, CheckCircle, Info } from 'lucide-react';
import { SCHEMES } from '../constants';

const STEPS = [
  { id: 'occupation', question: 'What is your primary occupation?', options: ['Farmer', 'Student', 'Daily Wage Worker', 'Salaried Employee', 'Business Owner', 'Retired'] },
  { id: 'income', question: 'What is your annual family income?', options: ['Below ₹1 Lakh', '₹1 - ₹3 Lakhs', '₹3 - ₹5 Lakhs', 'Above ₹5 Lakhs'] },
  { id: 'age', question: 'What is your age group?', options: ['Under 18', '18 - 40', '40 - 60', 'Above 60'] },
  { id: 'state', question: 'Which state do you reside in?', options: ['Maharashtra', 'Delhi', 'Uttar Pradesh', 'Karnataka', 'Other'] },
];

const SmartMatcher: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [result, setResult] = useState<any[] | null>(null);

  const handleNext = (option: string) => {
    const newAnswers = { ...answers, [STEPS[currentStep].id]: option };
    setAnswers(newAnswers);
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateMatch(newAnswers);
    }
  };

  const calculateMatch = (finalAnswers: any) => {
    // Simulated AI matching logic
    const matched = SCHEMES.map(s => ({
      ...s,
      matchPercentage: Math.floor(Math.random() * 40) + 60
    })).sort((a, b) => b.matchPercentage - a.matchPercentage);
    setResult(matched);
  };

  return (
    <div className="container mx-auto px-4 py-12 page-enter max-w-3xl">
      {!result ? (
        <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-12 shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center">
                <Target />
              </div>
              <div>
                <h1 className="text-2xl font-black uppercase">Scheme Matcher</h1>
                <p className="text-xs text-gray-500 font-bold">Step {currentStep + 1} of {STEPS.length}</p>
              </div>
            </div>

            <div className="mb-12">
              <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">{STEPS[currentStep].question}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STEPS[currentStep].options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleNext(opt)}
                  className="p-6 text-left bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900 border-2 border-transparent hover:border-blue-600 rounded-2xl font-bold transition-all hover:scale-[1.02]"
                >
                  {opt}
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="mt-12 flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600"
              >
                <ArrowLeft size={18} /> Previous Question
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles size={40} />
            </div>
            <h1 className="text-4xl font-black mb-4">Matches Found!</h1>
            <p className="text-gray-500">Based on your profile, we recommend the following schemes.</p>
          </div>

          {result.map((scheme, i) => (
            <div key={scheme.id} className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all reveal relative overflow-hidden">
              <div className="absolute top-0 right-0 px-6 py-2 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-bl-3xl">
                {scheme.matchPercentage}% Compatible
              </div>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/3 aspect-square rounded-[2rem] overflow-hidden">
                  <img src={scheme.image} alt={scheme.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-black mb-4">{scheme.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{scheme.description}</p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="px-4 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                      <CheckCircle size={14}/> Eligible
                    </span>
                    <span className="px-4 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full flex items-center gap-1">
                      <Info size={14}/> 3 Documents Needed
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-grow bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-colors">
                      Apply Instantly
                    </button>
                    <button className="px-6 bg-gray-100 dark:bg-gray-700 rounded-2xl font-bold">Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button 
            onClick={() => { setResult(null); setCurrentStep(0); setAnswers({}); }}
            className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Retake AI Analysis
          </button>
        </div>
      )}
    </div>
  );
};

export default SmartMatcher;
