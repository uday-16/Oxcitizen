
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // For demo: Show a welcome toast
  useEffect(() => {
    const timer = setTimeout(() => {
      addToast("Welcome back! You have 2 new job alerts.", 'info');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addToast = (message: string, type: Toast['type']) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="fixed top-24 right-4 z-[110] space-y-4 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-4 p-4 rounded-2xl shadow-2xl animate-toastSlideIn border ${
            toast.type === 'success' ? 'bg-green-50 text-green-800 border-green-100' :
            toast.type === 'error' ? 'bg-red-50 text-red-800 border-red-100' :
            toast.type === 'warning' ? 'bg-yellow-50 text-yellow-800 border-yellow-100' :
            'bg-blue-50 text-blue-800 border-blue-100'
          }`}
        >
          <div className="shrink-0">
            {toast.type === 'success' && <CheckCircle size={20} />}
            {toast.type === 'error' && <AlertTriangle size={20} />}
            {toast.type === 'warning' && <AlertTriangle size={20} />}
            {toast.type === 'info' && <Info size={20} />}
          </div>
          <p className="flex-grow font-bold text-sm leading-snug">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="shrink-0 hover:bg-black/5 p-1 rounded-lg">
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
