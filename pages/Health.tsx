
import React from 'react';
import { HOSPITALS } from '../constants';
import { Star, MapPin, Phone, Hospital as HospitalIcon } from 'lucide-react';

const Health: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 page-enter">
      {/* Header Banner */}
      <div className="relative h-[400px] rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=2000" 
          alt="Healthcare"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent flex items-center">
          <div className="px-12 max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">Health Hub</h1>
            <p className="text-xl opacity-90 leading-relaxed mb-8">Access the best healthcare facilities, insurance schemes, and medical support across India.</p>
            <div className="flex gap-4">
              <button className="bg-white text-green-700 px-8 py-4 rounded-2xl font-bold shadow-lg">Find Hospitals</button>
              <button className="bg-green-600/30 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-2xl font-bold">Health Schemes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
          <div className="text-4xl font-bold text-green-600 mb-2">25k+</div>
          <div className="text-sm font-bold text-gray-500 uppercase">Empanelled Hospitals</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
          <div className="text-4xl font-bold text-blue-600 mb-2">50Cr+</div>
          <div className="text-sm font-bold text-gray-500 uppercase">Citizens Covered</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
          <div className="text-4xl font-bold text-purple-600 mb-2">10k+</div>
          <div className="text-sm font-bold text-gray-500 uppercase">Specialized Clinics</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm text-center border border-gray-100 dark:border-gray-700">
          <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
          <div className="text-sm font-bold text-gray-500 uppercase">Medical Assistance</div>
        </div>
      </div>

      {/* Featured Hospitals */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Top Rated Hospitals</h2>
            <p className="text-gray-500">Based on user ratings and government certification.</p>
          </div>
          <button className="text-blue-600 font-bold hover:underline">View All Hospitals →</button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOSPITALS.map((hospital) => (
            <div key={hospital.id} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover-lift group">
              <div className="h-56 relative overflow-hidden">
                <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  {hospital.rating}
                </div>
                <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                  {hospital.type}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">{hospital.name}</h3>
                <div className="flex items-start gap-2 text-gray-500 mb-6 text-sm">
                  <MapPin size={16} className="mt-1 shrink-0 text-blue-500" />
                  <span>{hospital.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {hospital.specialties.map(spec => (
                    <span key={spec} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-semibold rounded-lg text-gray-600 dark:text-gray-300">
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a 
                    href={`tel:${hospital.contact}`}
                    className="flex-grow bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone size={18} /> Call Hospital
                  </a>
                  <button className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <HospitalIcon size={20} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Health;
