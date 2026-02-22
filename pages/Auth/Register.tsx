
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface RegisterProps {
  onLogin: (user: any) => void;
}

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser = { name, email, role: 'citizen' };
    localStorage.setItem('ox_user', JSON.stringify(mockUser));
    onLogin(mockUser);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img 
          src="https://picsum.photos/seed/auth/1920/1080?blur=10" 
          className="w-full h-full object-cover opacity-10"
          alt="Background"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-12 shadow-2xl border border-slate-100 dark:border-slate-800 relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Join OXCITIZEN</h1>
          <p className="text-slate-500 font-medium">Create your unified citizen account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
            <div className="relative">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-16 pr-8 py-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 outline-none focus:ring-4 focus:ring-blue-600/5 font-bold"
                placeholder="Aryan Sharma"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-16 pr-8 py-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 outline-none focus:ring-4 focus:ring-blue-600/5 font-bold"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-16 pr-8 py-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 outline-none focus:ring-4 focus:ring-blue-600/5 font-bold"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            CREATE ACCOUNT <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 font-medium">Already have an account?</p>
          <Link to="/login" className="text-blue-600 font-black uppercase text-xs tracking-widest hover:underline mt-2 inline-block">
            Login to OXCITIZEN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
