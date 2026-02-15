
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mic, X, Send, StopCircle, RefreshCw, MessageSquare } from 'lucide-react';

const CreateStory: React.FC = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [mediaBlob, setMediaBlob] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isListening, setIsListening] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Web Speech API initialization
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    startCamera();
    setupSpeech();
    return () => stopCamera();
  }, []);

  const setupSpeech = () => {
    if (!recognition) return;
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      console.log('Voice Command:', transcript);

      if (transcript.includes('start recording') || transcript.includes('video')) {
        handleStartRecording();
      } else if (transcript.includes('stop recording') || transcript.includes('finish')) {
        handleStopRecording();
      } else if (transcript.includes('snap') || transcript.includes('photo')) {
        capturePhoto();
      } else if (transcript.includes('post') || transcript.includes('send')) {
        handlePost();
      } else if (transcript.includes('cancel') || transcript.includes('back')) {
        navigate(-1);
      }
    };

    recognition.start();
    setIsListening(true);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera Error:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      setMediaBlob(canvas.toDataURL('image/jpeg'));
    }
  };

  const handleStartRecording = () => {
    if (!videoRef.current?.srcObject) return;
    setIsRecording(true);
    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(videoRef.current.srcObject as MediaStream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setMediaBlob(URL.createObjectURL(blob));
    };

    mediaRecorder.start();
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handlePost = () => {
    // Simulate upload
    alert('Story posted successfully! 🚀');
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col page-enter">
      {/* Header */}
      <div className="p-6 flex items-center justify-between text-white z-10">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full">
          <X />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-full text-xs font-black uppercase tracking-widest animate-pulse">
          <Mic size={14} /> Voice Active
        </div>
      </div>

      {/* Main Preview */}
      <div className="flex-grow relative flex items-center justify-center overflow-hidden">
        {!mediaBlob ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="h-full w-full object-cover rounded-3xl" 
          />
        ) : (
          <div className="h-full w-full relative">
            {mediaBlob.startsWith('data:image') ? (
              <img src={mediaBlob} className="h-full w-full object-cover rounded-3xl" alt="Preview" />
            ) : (
              <video src={mediaBlob} autoPlay loop className="h-full w-full object-cover rounded-3xl" />
            )}
            <div className="absolute inset-x-0 bottom-32 p-8 text-center text-white font-black text-3xl italic bg-gradient-to-t from-black/60 to-transparent">
              {caption}
            </div>
          </div>
        )}

        {/* Voice Command Overlay */}
        <div className="absolute bottom-40 left-0 right-0 flex justify-center pointer-events-none">
           <div className="bg-black/50 backdrop-blur-md px-6 py-2 rounded-full text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10">
             Try saying "snap" or "start recording"
           </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-10 flex items-center justify-around z-10 bg-gradient-to-t from-black to-transparent">
        {!mediaBlob ? (
          <>
            <button onClick={capturePhoto} className="p-4 bg-white/20 rounded-full text-white">
              <Camera size={28} />
            </button>
            <div className="relative">
              {!isRecording ? (
                <button 
                  onClick={handleStartRecording}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-blue-600/30"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-full" />
                </button>
              ) : (
                <button 
                  onClick={handleStopRecording}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center"
                >
                  <StopCircle size={40} className="text-red-600" />
                </button>
              )}
            </div>
            <button className="p-4 bg-white/20 rounded-full text-white">
              <RefreshCw size={28} />
            </button>
          </>
        ) : (
          <div className="w-full space-y-6">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-2xl p-4">
              <MessageSquare className="text-white/50" />
              <input 
                type="text" 
                placeholder="Add a caption..." 
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full font-bold"
              />
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setMediaBlob(null)}
                className="flex-grow py-5 bg-white/10 text-white rounded-2xl font-black uppercase"
              >
                Discard
              </button>
              <button 
                onClick={handlePost}
                className="flex-grow py-5 bg-blue-600 text-white rounded-2xl font-black uppercase flex items-center justify-center gap-2"
              >
                <Send size={20} /> Post Story
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateStory;
