
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

const Login: React.FC<{ onLogin: (user: any) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const role = email.includes('admin') ? 'admin' : 'citizen';
      const user = { email, role, name: email.split('@')[0], avatar: `https://i.pravatar.cc/150?u=${email}` };
      localStorage.setItem('ox_user', JSON.stringify(user));
      onLogin(user);
      setLoading(false);
      navigate(role === 'admin' ? '/admin' : '/');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-24 page-enter max-w-lg min-h-[80vh] flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 md:p-16 shadow-2xl border border-slate-100 dark:border-slate-800 text-center w-full relative overflow-hidden">
        {/* Background Sparkles */}
        <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
          <ShieldCheck size={200} />
        </div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner animate-float">
            <ShieldCheck size={48} />
          </div>
          <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">Citizen Access</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mb-12">Unlock your verified civic vault</p>

          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-6">Verified Email</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-600/10 font-bold transition-all" 
                  placeholder="name@oxcitizen.gov.in"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-6">Access Pin</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-600/10 font-bold transition-all" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex justify-between items-center px-4 py-2">
               <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-5 h-5 rounded-md border-2 border-slate-200 group-hover:border-blue-500 transition-colors"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remember Me</span>
               </label>
               <a href="#" className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Forgot Access?</a>
            </div>

            <button 
              disabled={loading}
              className={`w-full bg-slate-950 dark:bg-blue-600 text-white py-6 rounded-3xl font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 shadow-blue-500/20'}`}
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                <>
                  AUTHORIZE ACCESS <ArrowRight size={24} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-50 dark:border-slate-800">
             <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                New to OXCITIZEN? <Link to="/register" className="text-blue-600 hover:underline">Create Account</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
