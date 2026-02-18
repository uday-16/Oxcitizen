
import React, { useState, useMemo } from 'react';
import { JOBS } from '../constants';
import { 
  Briefcase, MapPin, DollarSign, Clock, Filter, ArrowRight, 
  Search, SlidersHorizontal, CheckCircle, Bookmark, Star, Zap
} from 'lucide-react';

const Jobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'All',
    experience: 'All',
    category: 'All'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Performance optimized filtering
  const filteredJobs = useMemo(() => {
    return JOBS.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filters.type === 'All' || job.type === filters.type;
      const matchesExp = filters.experience === 'All' || job.experience.includes(filters.experience);
      
      return matchesSearch && matchesType && matchesExp;
    });
  }, [searchTerm, filters]);

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-up">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 rounded-full text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">
            <Zap size={14} fill="currentColor" /> Live Recruitment Feed
          </div>
          <h1 className="text-6xl font-black mb-4 tracking-tighter uppercase leading-[0.9]">Job Matrix <span className="text-blue-600">PRO</span></h1>
          <p className="text-xl text-slate-500 font-medium">Smart indexing for verified employment opportunities.</p>
        </div>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
           <div className="relative flex-grow min-w-[300px]">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
              <input 
                type="text" 
                placeholder="Job title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 outline-none font-bold text-lg"
              />
           </div>
           <button 
             onClick={() => setShowFilters(!showFilters)}
             className={`px-10 py-6 rounded-[2rem] font-black flex items-center justify-center gap-3 transition-all active:scale-95 ${showFilters ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm'}`}
           >
             <SlidersHorizontal size={24} /> {showFilters ? 'APPLY FILTERS' : 'ADVANCED FILTERS'}
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'lg:col-span-3' : 'hidden'} space-y-12 animate-fade-up`}>
          <FilterSection 
            title="Work Model" 
            options={['All', 'Full-time', 'Part-time', 'Remote', 'Contract']} 
            value={filters.type}
            onChange={(v) => setFilters({...filters, type: v})}
          />
          <FilterSection 
            title="Experience Tier" 
            options={['All', 'Entry Level', '2-4 Years', '5+ Years']} 
            value={filters.experience}
            onChange={(v) => setFilters({...filters, experience: v})}
          />
          
          <div className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-700">
               <Briefcase size={200} />
            </div>
            <h4 className="font-black text-xl mb-4 uppercase tracking-tighter">AI Resume Matching</h4>
            <p className="text-sm text-blue-100 mb-8 leading-relaxed font-medium">Let Gemini analyze your profile and match you to top positions automatically.</p>
            <button className="w-full bg-white text-blue-900 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
              Upload CV
            </button>
          </div>
        </aside>

        {/* Jobs Result Grid */}
        <div className={`${showFilters ? 'lg:col-span-9' : 'lg:col-span-12'} space-y-10`}>
          <div className="flex items-center justify-between px-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Showing {filteredJobs.length} Results</span>
            <div className="flex gap-2">
               <button className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-900 rounded-lg text-slate-400 shadow-sm"><Zap size={14}/></button>
            </div>
          </div>

          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 md:p-14 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-blue-500/5 transition-all relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                
                <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-10">
                  <div className="flex gap-10 items-center">
                    <div className="w-28 h-28 rounded-[2.5rem] bg-slate-50 dark:bg-slate-950 overflow-hidden p-3 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-inner group-hover:rotate-6 transition-transform">
                      <img src={job.image} className="w-full h-full object-cover rounded-[2rem]" alt={job.company} />
                    </div>
                    <div>
                      <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2 leading-[0.9] uppercase tracking-tighter">{job.title}</h3>
                      <div className="flex items-center gap-3">
                         <span className="text-blue-600 font-black text-sm uppercase tracking-widest">{job.company}</span>
                         <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white scale-75">
                           <CheckCircle size={14} fill="currentColor" className="text-white" />
                         </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="px-6 py-2.5 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest border border-green-100">
                      Vetted
                    </span>
                    <span className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">
                      {job.type}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
                   <JobInfo icon={<MapPin size={20} />} label="Base Hub" text={job.location} />
                   <JobInfo icon={<DollarSign size={20} />} label="CTC Range" text={job.salary} />
                   <JobInfo icon={<Briefcase size={20} />} label="Expertise" text={job.experience} />
                   <JobInfo icon={<Clock size={20} />} label="Hiring Closes" text={job.deadline} />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between pt-12 border-t border-slate-50 dark:border-slate-800 gap-8">
                  <div className="flex items-center gap-6">
                    <div className="flex -space-x-4">
                      {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 shadow-sm" alt="applicant" />)}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">+42 professionals applied</span>
                  </div>
                  <div className="flex gap-4 w-full sm:w-auto">
                    <button className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-blue-600 transition-all active:scale-90">
                      <Bookmark size={28} />
                    </button>
                    <button className="flex-grow sm:flex-grow-0 bg-slate-900 dark:bg-blue-600 text-white hover:scale-105 active:scale-95 px-16 py-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl">
                      APPLY VIA OX-PASS
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-32 text-center animate-fade-up">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-slate-300">
                <Search size={48} />
              </div>
              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">Zero Correlation Detected</h3>
              <p className="text-slate-500 font-medium max-w-sm mx-auto">Our smart filters couldn't find a match. Try relaxing your experience or location tier.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({ title, options, value, onChange }: any) => (
  <div className="space-y-6">
    <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 ml-4">{title}</h4>
    <div className="flex flex-col gap-3">
      {options.map((opt: string) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`flex items-center justify-between px-8 py-5 rounded-2xl text-sm font-bold transition-all hover:translate-x-2 ${value === opt ? 'bg-white dark:bg-slate-800 shadow-xl text-blue-600 border border-slate-100 dark:border-slate-800' : 'text-slate-500 hover:bg-white dark:hover:bg-slate-900'}`}
        >
          {opt}
          {value === opt && <CheckCircle size={18} />}
        </button>
      ))}
    </div>
  </div>
);

const JobInfo = ({ icon, label, text }: any) => (
  <div className="space-y-2">
    <div className="flex items-center gap-3 text-blue-600 opacity-80">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <p className="font-black text-slate-900 dark:text-white uppercase truncate text-xs tracking-tight">{text}</p>
  </div>
);

export default Jobs;
