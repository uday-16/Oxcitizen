
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Heart, MessageCircle, Send, MoreHorizontal, User } from 'lucide-react';

const ViewStory: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          navigate('/');
          return 100;
        }
        return prev + 1;
      });
    }, 50); // 5 seconds total

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col page-enter">
      {/* Progress Bar */}
      <div className="absolute top-6 inset-x-6 z-20 flex gap-1">
        <div className="h-1 flex-grow bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-75" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      {/* Header */}
      <div className="p-10 flex items-center justify-between text-white z-10 mt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white/20">
            {id === '1' ? 'PM' : 'C'}
          </div>
          <div>
            <h4 className="font-black uppercase tracking-tight text-sm">
              {id === '1' ? 'Government Updates' : 'Citizen Success'}
            </h4>
            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">2 hours ago</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <MoreHorizontal size={20} />
          <button onClick={() => navigate('/')} className="p-2 bg-white/10 rounded-full">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Story Content */}
      <div className="flex-grow relative flex items-center justify-center overflow-hidden">
        <img 
          src={id === '1' 
            ? "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09" 
            : "https://images.unsplash.com/photo-1497215728101-856f4ea42174"
          } 
          className="h-full w-full object-cover rounded-3xl" 
          alt="Story" 
        />
        
        {/* Caption Overlay */}
        <div className="absolute inset-x-0 bottom-24 p-10 text-center">
           <div className="bg-black/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/10">
             <p className="text-white font-bold text-lg leading-relaxed">
               {id === '1' 
                ? "New PM-Kisan installments have been processed. Check your status now!" 
                : "Just used the new document scanner to apply for my Passport. Saved hours of manual entry!"
               }
             </p>
           </div>
        </div>
      </div>

      {/* Footer / Reply */}
      <div className="p-8 flex items-center gap-4 z-10">
        <div className="flex-grow relative flex items-center">
          <input 
            type="text" 
            placeholder="Send a message..." 
            className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white font-bold text-sm outline-none backdrop-blur-md"
          />
          <button className="absolute right-4 text-white">
            <Send size={18} />
          </button>
        </div>
        <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white">
          <Heart size={24} />
        </button>
      </div>
    </div>
  );
};

export default ViewStory;
