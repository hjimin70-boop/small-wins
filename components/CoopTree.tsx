import React, { useEffect, useState } from 'react';

interface CoopTreeProps {
  totalMinutes: number;
}

const CoopTree: React.FC<CoopTreeProps> = ({ totalMinutes }) => {
  const [stage, setStage] = useState(0);

  // Determine tree stage based on collective time (simulated)
  useEffect(() => {
    if (totalMinutes < 100) setStage(1);
    else if (totalMinutes < 500) setStage(2);
    else if (totalMinutes < 1000) setStage(3);
    else setStage(4);
  }, [totalMinutes]);

  return (
    <div className="relative flex flex-col items-center justify-center h-72 w-full bg-gradient-to-b from-slate-800 to-night-card rounded-3xl overflow-hidden border border-slate-700 shadow-2xl p-6 mb-6">
      {/* Background Ambience */}
      <div className="absolute top-4 right-6 animate-pulse-slow">
        <div className="w-16 h-16 rounded-full bg-amber-200 opacity-20 blur-xl"></div>
      </div>
      
      {/* Dynamic Text */}
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-sage-300 text-sm font-bold tracking-wide">우리들의 숲</h3>
        <p className="text-slate-400 text-xs mt-1">
          현재 <span className="text-amber-300 font-bold">{Math.floor(totalMinutes / 10) + 1}</span>개의 따뜻한 마음이 모였어요
        </p>
      </div>

      {/* Tree Visualization */}
      <div className="mt-8 relative z-10 animate-float">
        {stage === 1 && (
          // Seedling
          <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_rgba(38,166,154,0.5)]">
            <path d="M50 90 L50 70 Q50 50 30 40" stroke="#80CBC4" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="30" cy="40" r="5" fill="#A5D6A7" />
            <path d="M50 70 Q50 50 70 45" stroke="#80CBC4" strokeWidth="4" fill="none" strokeLinecap="round" />
            <ellipse cx="70" cy="45" rx="6" ry="4" fill="#A5D6A7" />
          </svg>
        )}
        {stage === 2 && (
          // Sapling
          <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-[0_0_20px_rgba(38,166,154,0.6)]">
            <path d="M50 90 L50 60" stroke="#5D4037" strokeWidth="6" strokeLinecap="round"/>
            <path d="M50 60 Q30 50 20 30" stroke="#80CBC4" strokeWidth="4" fill="none" />
            <circle cx="20" cy="30" r="10" fill="#66BB6A" />
            <path d="M50 70 Q70 60 80 40" stroke="#80CBC4" strokeWidth="4" fill="none" />
            <circle cx="80" cy="40" r="8" fill="#81C784" />
            <path d="M50 60 Q50 40 50 20" stroke="#80CBC4" strokeWidth="4" fill="none" />
            <circle cx="50" cy="20" r="12" fill="#4CAF50" />
          </svg>
        )}
        {stage >= 3 && (
          // Glowing Tree
          <svg width="160" height="160" viewBox="0 0 200 200" className="drop-shadow-[0_0_30px_rgba(255,213,79,0.4)]">
             <path d="M100 180 L100 120" stroke="#5D4037" strokeWidth="12" strokeLinecap="round"/>
             <circle cx="100" cy="90" r="60" fill="#2E7D32" opacity="0.8" />
             <circle cx="70" cy="80" r="25" fill="#66BB6A" opacity="0.9" />
             <circle cx="130" cy="80" r="25" fill="#66BB6A" opacity="0.9" />
             <circle cx="100" cy="50" r="30" fill="#81C784" opacity="0.9" />
             
             {/* Glows/Fireflies */}
             <circle cx="90" cy="70" r="3" fill="#FFF59D" className="animate-pulse" />
             <circle cx="120" cy="100" r="4" fill="#FFF59D" className="animate-pulse" style={{animationDelay: '1s'}} />
             <circle cx="80" cy="110" r="2" fill="#FFF59D" className="animate-pulse" style={{animationDelay: '0.5s'}} />
             
             {stage === 4 && (
                <>
                 <circle cx="60" cy="60" r="5" fill="#F48FB1" className="animate-bounce" style={{animationDuration: '3s'}} />
                 <circle cx="140" cy="70" r="5" fill="#F48FB1" className="animate-bounce" style={{animationDuration: '2.5s'}} />
                 <circle cx="100" cy="40" r="6" fill="#F48FB1" className="animate-bounce" style={{animationDuration: '4s'}} />
                </>
             )}
          </svg>
        )}
      </div>

      <div className="absolute bottom-4 w-full px-6">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>공동 목표: 새벽의 숲</span>
          <span>{Math.min(100, (totalMinutes % 1000) / 10)}%</span>
        </div>
        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sage-500 to-amber-300 transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(100, (totalMinutes % 1000) / 10)}%` }}
            ></div>
        </div>
      </div>
    </div>
  );
};

export default CoopTree;