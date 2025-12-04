import React, { useState, useEffect } from 'react';
import { MOCK_FRIENDS } from '../constants';

interface FocusTimerProps {
  onLeave: () => void;
}

const FocusTimer: React.FC<FocusTimerProps> = ({ onLeave }) => {
  const [seconds, setSeconds] = useState(0);
  const [goal, setGoal] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let timer: number;
    if (hasStarted) {
      timer = window.setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [hasStarted]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-[60] bg-slate-900 flex flex-col items-center justify-center p-6 animate-fade-in text-white">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-sage-100 mb-2 text-center">어떤 성취를 이룰까요?</h2>
          <p className="text-slate-400 text-sm mb-8 text-center">오늘 숲에 남길 당신의 발자국을 적어주세요.</p>
          
          <input 
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="예: 책 10페이지 읽기, 수학 5문제 풀기"
            className="w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-500 mb-8 focus:outline-none focus:border-sage-500 transition-colors"
          />

          <button 
            onClick={() => setHasStarted(true)}
            disabled={!goal.trim()}
            className="w-full bg-sage-600 hover:bg-sage-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-sage-900/50 transition-all active:scale-95"
          >
            숲으로 입장하기
          </button>
          
          <button 
            onClick={onLeave}
            className="w-full mt-4 text-slate-500 text-sm hover:text-slate-300"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900 flex flex-col items-center justify-center p-6 animate-fade-in text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-sage-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-pulse-slow"></div>
      </div>

      <div className="z-10 w-full max-w-md flex flex-col items-center">
        {/* Header */}
        <div className="mb-8 text-center">
             <span className="inline-block px-3 py-1 bg-sage-900/50 border border-sage-700 rounded-full text-sage-300 text-xs mb-3">
                🌲 함께 집중하는 중
             </span>
             <h2 className="text-6xl font-bold font-mono text-sage-100 tracking-wider drop-shadow-lg">
                {formatTime(seconds)}
             </h2>
             <p className="text-sage-200 mt-4 text-lg font-medium">"{goal}"</p>
        </div>

        {/* Campfire Visualization */}
        <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
            {/* Friends around the fire */}
            <div className="absolute top-0 transform -translate-y-1/2 z-20">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-sage-500 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(38,166,154,0.3)]">
                        🦊
                    </div>
                    <span className="text-xs text-sage-300 mt-1 font-bold">나</span>
                </div>
            </div>

            {/* Simulated Friends Positions */}
            {MOCK_FRIENDS.filter(f => f.isOnline).map((friend, idx) => (
                <div 
                    key={friend.id} 
                    className="absolute"
                    style={{
                        transform: `rotate(${120 * (idx + 1)}deg) translate(0, -90px) rotate(-${120 * (idx + 1)}deg)`
                    }}
                >
                    <div className="flex flex-col items-center">
                         <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xl opacity-80">
                            {friend.avatar}
                        </div>
                        <span className="text-xs text-slate-500 mt-1">{friend.name}</span>
                    </div>
                </div>
            ))}

            {/* Fire Animation */}
            <div className="relative">
                <div className="absolute -inset-4 bg-amber-500 blur-xl opacity-20 animate-pulse"></div>
                <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-[0_0_20px_rgba(255,160,0,0.6)]">
                    <path d="M20 90 L80 90 L70 80 L30 80 Z" fill="#5D4037" /> {/* Logs */}
                    <path d="M35 80 Q50 10 65 80" fill="#FF5722" className="animate-pulse" style={{animationDuration: '0.8s'}} opacity="0.8"/>
                    <path d="M40 80 Q50 30 60 80" fill="#FFC107" className="animate-pulse" style={{animationDuration: '1.2s'}} opacity="0.9"/>
                    <path d="M45 80 Q50 50 55 80" fill="#FFF" className="animate-pulse" style={{animationDuration: '0.5s'}} opacity="0.6"/>
                </svg>
            </div>
        </div>

        {/* Message Carousel */}
        <div className="bg-slate-800/50 px-6 py-3 rounded-2xl border border-slate-700/50 mb-8 max-w-xs text-center">
             <p className="text-sm text-sage-200">
                "{MOCK_FRIENDS[0].name}"님이 장작을 더 넣었어요.
             </p>
        </div>

        {/* Action */}
        <button 
            onClick={onLeave}
            className="px-8 py-3 rounded-full bg-slate-800 text-slate-300 border border-slate-600 hover:bg-slate-700 hover:text-white transition-colors text-sm font-bold"
        >
            숲에서 잠시 나가기
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;