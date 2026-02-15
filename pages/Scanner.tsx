
import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, FileText, CheckCircle, ShieldCheck } from 'lucide-react';

const Scanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [ocrData, setOcrData] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(err);
      setIsScanning(false);
    }
  };

  const captureFrame = () => {
    const canvas = document.createElement('canvas');
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      setScannedImage(canvas.toDataURL('image/png'));
      stopCamera();
      // Simulate OCR delay
      setTimeout(() => {
        setOcrData({
          name: 'RAJESH KUMAR',
          dob: '12-05-1988',
          id: 'XXXX-XXXX-1234',
          type: 'Aadhaar Card'
        });
      }, 1500);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(t => t.stop());
    }
    setIsScanning(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 page-enter max-w-2xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4">DOCUMENT SCANNER</h1>
        <p className="text-gray-500">Scan your ID cards to pre-fill application forms instantly using AI OCR.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-8 shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        
        {!isScanning && !scannedImage && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-8">
              <Camera size={40} />
            </div>
            <button 
              onClick={startCamera}
              className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-blue-500/30"
            >
              START CAMERA
            </button>
            <p className="mt-6 text-sm text-gray-400 font-bold uppercase tracking-widest">Supports Aadhaar, PAN & Voter ID</p>
          </div>
        )}

        {isScanning && (
          <div className="relative rounded-[2rem] overflow-hidden bg-black aspect-[3/4]">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-8 border-2 border-dashed border-white/50 rounded-2xl"></div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
              <button 
                onClick={captureFrame}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform"
              >
                <div className="w-16 h-16 border-4 border-blue-600 rounded-full"></div>
              </button>
            </div>
          </div>
        )}

        {scannedImage && (
          <div className="space-y-8">
            <div className="relative rounded-[2rem] overflow-hidden shadow-lg aspect-[3/4] bg-gray-100">
              <img src={scannedImage} className="w-full h-full object-cover" alt="Scan" />
              {!ocrData && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                  <RefreshCw className="animate-spin mb-4" size={40} />
                  <p className="font-black uppercase tracking-widest">Analyzing Documents...</p>
                </div>
              )}
            </div>

            {ocrData && (
              <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-3xl border border-green-100 dark:border-green-800 animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                  <CheckCircle className="text-green-600" size={32} />
                  <h3 className="text-2xl font-black text-green-800 dark:text-green-300">OCR SUCCESS</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-green-200 dark:border-green-800 pb-2">
                    <span className="text-xs font-bold text-green-600 uppercase">Document Type</span>
                    <span className="font-black">{ocrData.type}</span>
                  </div>
                  <div className="flex justify-between border-b border-green-200 dark:border-green-800 pb-2">
                    <span className="text-xs font-bold text-green-600 uppercase">Full Name</span>
                    <span className="font-black">{ocrData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-green-200 dark:border-green-800 pb-2">
                    <span className="text-xs font-bold text-green-600 uppercase">Date of Birth</span>
                    <span className="font-black">{ocrData.dob}</span>
                  </div>
                </div>
                <button className="w-full bg-green-600 text-white mt-8 py-5 rounded-2xl font-black text-lg shadow-xl">
                  PRE-FILL APPLICATIONS
                </button>
                <button 
                  onClick={() => { setScannedImage(null); setOcrData(null); }}
                  className="w-full mt-4 text-green-700 font-bold text-sm uppercase"
                >
                  Scan Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] flex gap-6 items-center border border-blue-100 dark:border-blue-800">
        <ShieldCheck className="text-blue-600 shrink-0" size={40} />
        <div>
          <h4 className="font-black text-blue-900 dark:text-blue-100 uppercase">Secure Processing</h4>
          <p className="text-sm text-blue-700 dark:text-blue-300">Your documents are processed locally on your device and are never stored on our servers without consent.</p>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
