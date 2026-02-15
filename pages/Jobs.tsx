
import React from 'react';
import { JOBS } from '../constants';
import { Briefcase, MapPin, DollarSign, Clock, Filter, ArrowRight } from 'lucide-react';

const Jobs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 page-enter">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-bold mb-4">Job Portal</h1>
          <p className="text-xl text-gray-500">Connecting India's talent with top employers.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 px-8 py-4 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2">
             <Filter size={20} /> Advanced Filter
          </button>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all">
             Post a Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {JOBS.map((job) => (
          <div key={job.id} className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover-lift relative group">
            <div className="flex items-start justify-between mb-8">
              <div className="flex gap-6 items-center">
                 <div className="w-20 h-20 rounded-[1.5rem] bg-gray-50 dark:bg-gray-900 overflow-hidden p-2 flex items-center justify-center border border-gray-100 dark:border-gray-700">
                    <img src={job.image} className="w-full h-full object-cover rounded-xl" alt={job.company} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{job.title}</h3>
                    <p className="text-blue-600 font-bold">{job.company}</p>
                 </div>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                job.type === 'Remote' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {job.type}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
               <JobTag icon={<MapPin size={16} />} text={job.location} />
               <JobTag icon={<DollarSign size={16} />} text={job.salary} />
               <JobTag icon={<Briefcase size={16} />} text={job.experience} />
               <JobTag icon={<Clock size={16} />} text={job.deadline} />
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-2 leading-relaxed">
              {job.description}
            </p>

            <div className="flex items-center justify-between pt-8 border-t border-gray-50 dark:border-gray-700">
              <span className="text-xs font-bold text-gray-400">Posted 2 days ago</span>
              <button className="bg-gray-900 text-white hover:bg-blue-600 px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
                Apply Now <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const JobTag = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center gap-2 text-gray-500">
    <div className="text-blue-500">{icon}</div>
    <span className="text-xs font-bold truncate">{text}</span>
  </div>
);

export default Jobs;
