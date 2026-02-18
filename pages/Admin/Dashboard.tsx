
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, FileText, Settings, Plus, 
  Edit, Trash2, Save, X, Search, TrendingUp, BarChart3, 
  Database, ShieldCheck, LogOut, Gift, Briefcase, Heart,
  GraduationCap, Newspaper, Bell, Clock, CheckCircle, XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (activeTab === 'overview') return;
    const saved = localStorage.getItem(`ox_admin_${activeTab}`);
    if (saved) {
      setData(JSON.parse(saved));
    } else {
      setData([]);
    }
  }, [activeTab]);

  const handleSave = () => {
    let updatedData;
    if (editItem) {
      updatedData = data.map(item => item.id === editItem.id ? { ...formData, id: item.id } : item);
    } else {
      updatedData = [...data, { ...formData, id: Date.now(), createdAt: new Date() }];
    }
    setData(updatedData);
    localStorage.setItem(`ox_admin_${activeTab}`, JSON.stringify(updatedData));
    setIsModalOpen(false);
    setEditItem(null);
    setFormData({});
  };

  const handleDelete = (id: number) => {
    const updated = data.filter(item => item.id !== id);
    setData(updated);
    localStorage.setItem(`ox_admin_${activeTab}`, JSON.stringify(updated));
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Enhanced Sidebar */}
      <aside className="w-80 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 p-8 hidden xl:block sticky top-0 h-screen overflow-y-auto no-scrollbar">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-blue-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30 rotate-3">
            <ShieldCheck className="text-white" size={28} />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tighter uppercase leading-none">OX COMMAND</h2>
            <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mt-1">Platform Admin</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          <SectionHeader label="System Overview" />
          <SidebarLink icon={<LayoutDashboard size={18}/>} label="Executive Summary" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          
          <SectionHeader label="Content Management" />
          <SidebarLink icon={<Gift size={18}/>} label="Government Schemes" active={activeTab === 'schemes'} onClick={() => setActiveTab('schemes')} />
          <SidebarLink icon={<Briefcase size={18}/>} label="Job Opportunities" active={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')} />
          <SidebarLink icon={<Heart size={18}/>} label="Hospitals & Healthcare" active={activeTab === 'hospitals'} onClick={() => setActiveTab('hospitals')} />
          <SidebarLink icon={<GraduationCap size={18}/>} label="Schools & Education" active={activeTab === 'schools'} onClick={() => setActiveTab('schools')} />
          <SidebarLink icon={<Newspaper size={18}/>} label="Current Affairs" active={activeTab === 'news'} onClick={() => setActiveTab('news')} />
          
          <SectionHeader label="Citizen Ops" />
          <SidebarLink icon={<Users size={18}/>} label="User Directory" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
          <SidebarLink icon={<Clock size={18}/>} label="Pending Apps" active={activeTab === 'applications'} onClick={() => setActiveTab('applications')} badge="24" />
          
          <SectionHeader label="Intelligence" />
          <SidebarLink icon={<BarChart3 size={18}/>} label="Data Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <SidebarLink icon={<Bell size={18}/>} label="Notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
          
          <SectionHeader label="System Settings" />
          <SidebarLink icon={<Settings size={18}/>} label="Platform Config" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="mt-12 pt-8 border-t border-slate-50 dark:border-slate-800">
           <button 
             onClick={() => navigate('/login')}
             className="w-full flex items-center justify-center gap-3 py-5 bg-red-50 dark:bg-red-900/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-red-600 hover:bg-red-100 transition-all"
           >
             <LogOut size={16} /> Terminate Session
           </button>
        </div>
      </aside>

      {/* Main Command Panel */}
      <main className="flex-grow p-10 xl:p-20 overflow-y-auto">
        {activeTab === 'overview' ? (
          <div className="space-y-12 animate-fade-up">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute -right-20 -top-20 opacity-10 rotate-12">
                  <ShieldCheck size={400} />
               </div>
               <div className="relative z-10">
                  <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Command Dashboard</h1>
                  <p className="text-blue-200 text-lg font-medium opacity-80">Overseeing 12,540 verified citizens across 24 states.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard title="Total Citizens" value="12,547" change="+234 today" icon={<Users className="text-blue-500"/>} />
              <StatCard title="Active Schemes" value="245" change="+12 month" icon={<Gift className="text-green-500"/>} />
              <StatCard title="Pending Apps" value="234" change="High Priority" icon={<Clock className="text-orange-500"/>} />
              <StatCard title="Citizen Reach" value="2.4M" change="+18% growth" icon={<TrendingUp className="text-purple-500"/>} />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black uppercase">Recent Activity</h3>
                  <button className="text-xs font-black uppercase text-blue-600">Full Audit Log</button>
                </div>
                <div className="space-y-8">
                   <ActivityRow user="Rajesh K." action="Applied for PM-Kisan" time="2m ago" status="pending" />
                   <ActivityRow user="Priya S." action="Verified Aadhaar via OCR" time="15m ago" status="success" />
                   <ActivityRow user="Admin Alpha" action="Updated Health Schemes" time="1h ago" status="system" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-slate-800 shadow-sm">
                 <h3 className="text-2xl font-black uppercase mb-10">System Status</h3>
                 <div className="space-y-6">
                    <StatusLine label="Oracle Engine" status="Operational" />
                    <StatusLine label="Media Synthesis" status="Active" />
                    <StatusLine label="Database Cluster" status="Healthy" />
                    <StatusLine label="API Gateway" status="Fast" />
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12 animate-fade-up">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
              <div>
                <h1 className="text-5xl font-black uppercase tracking-tighter">Manage {activeTab}</h1>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mt-3 ml-1">Persistence Module Active</p>
              </div>
              <button 
                onClick={() => { setEditItem(null); setFormData({}); setIsModalOpen(true); }}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black flex items-center gap-3 shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Plus size={20} /> ADD {activeTab.toUpperCase()}
              </button>
            </header>

            <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
               {data.length > 0 ? (
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-950/50">
                    <tr>
                      <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Entry Details</th>
                      <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Class</th>
                      <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {data.map(item => (
                      <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                        <td className="px-10 py-8">
                           <div className="space-y-1">
                              <p className="font-black text-lg">{item.name || item.title}</p>
                              <p className="text-xs text-slate-400 font-bold uppercase truncate max-w-xs">{item.description}</p>
                           </div>
                        </td>
                        <td className="px-10 py-8">
                          <span className="px-6 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase">
                            {item.category || item.type || 'General'}
                          </span>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex gap-3">
                            <button onClick={() => { setEditItem(item); setFormData(item); setIsModalOpen(true); }} className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-blue-600 transition-all">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-red-600 transition-all">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               ) : (
                <div className="p-32 text-center space-y-6">
                   <div className="w-24 h-24 bg-slate-50 dark:bg-slate-950 rounded-full flex items-center justify-center mx-auto text-slate-200">
                      <Database size={48} />
                   </div>
                   <p className="text-slate-400 font-black uppercase tracking-widest">Database Table is Empty</p>
                </div>
               )}
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-[200] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[4rem] p-12 shadow-2xl animate-fade-up">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter">{editItem ? 'Edit Protocol' : 'New Entry Protocol'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400"><X size={24} /></button>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-4">Primary Identifier</label>
                  <input 
                    type="text" 
                    value={formData.name || formData.title || ''}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 outline-none focus:ring-4 focus:ring-blue-600/10 font-bold"
                    placeholder="e.g. Ayushman Bharat 2.0"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-4">Classification</label>
                  <input 
                    type="text" 
                    value={formData.category || formData.type || ''}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 outline-none focus:ring-4 focus:ring-blue-600/10 font-bold"
                    placeholder="e.g. Healthcare"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-3 ml-4">Content Body</label>
                  <textarea 
                    rows={4}
                    value={formData.description || ''}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 outline-none focus:ring-4 focus:ring-blue-600/10 font-bold"
                    placeholder="Enter full details..."
                  />
                </div>
                <button 
                  onClick={handleSave}
                  className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl shadow-2xl shadow-blue-500/20 hover:scale-[1.02] transition-all"
                >
                  COMMIT TO REPOSITORY
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const SectionHeader = ({ label }: { label: string }) => (
  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] pt-8 pb-4 pl-6">{label}</p>
);

const SidebarLink = ({ icon, label, active, onClick, badge }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
      active 
        ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 translate-x-2' 
        : 'text-slate-400 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800'
    }`}
  >
    <div className="flex items-center gap-4">
      {icon} <span>{label}</span>
    </div>
    {badge && <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[8px]">{badge}</span>}
  </button>
);

const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm group hover-lift">
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
        {icon}
      </div>
      <span className="text-xs font-black text-green-500">{change}</span>
    </div>
    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{title}</h4>
    <p className="text-3xl font-black tracking-tighter">{value}</p>
  </div>
);

const ActivityRow = ({ user, action, time, status }: any) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-4">
       <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-black text-xs">
          {user[0]}
       </div>
       <div>
          <p className="font-bold text-sm">{user} <span className="text-slate-400 font-medium">{action}</span></p>
          <p className="text-[10px] font-black uppercase text-slate-400">{time}</p>
       </div>
    </div>
    <div className={`w-2 h-2 rounded-full ${status === 'pending' ? 'bg-orange-500' : status === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
  </div>
);

const StatusLine = ({ label, status }: { label: string, status: string }) => (
  <div className="flex justify-between items-center">
     <span className="text-xs font-bold text-slate-500 uppercase">{label}</span>
     <span className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> {status}
     </span>
  </div>
);

export default AdminDashboard;
