import React, { useState, useEffect } from 'react';
import CoopTree from './CoopTree';
import FocusTimer from './FocusTimer';
import { MOCK_FRIENDS, FOG_CHALLENGE } from '../constants';
import { Friend } from '../types';

const StudyGroup: React.FC = () => {
  const [globalMinutes, setGlobalMinutes] = useState(850);
  const [isFocusing, setIsFocusing] = useState(false);
  const [friends, setFriends] = useState<Friend[]>(MOCK_FRIENDS);
  const [fogCleared, setFogCleared] = useState(FOG_CHALLENGE.current);

  // Simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setGlobalMinutes(prev => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSendWarmth = (id: number) => {
      setFriends(friends.map(f => f.id === id ? { ...f, warmth: f.warmth + 1 } : f));
      alert("따뜻한 온기를 보냈어요 🔥");
  };

  // Sort friends by study time (Simple leaderboard)
  const sortedFriends = [...friends].sort((a, b) => b.studyTimeToday - a.studyTimeToday);

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto relative">
      {isFocusing && <FocusTimer onLeave={() => setIsFocusing(false)} />}
      
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-sage-100 flex items-center gap-2">
           📚 숲속 도서관
        </h1>
        <p className="text-sm text-slate-400">우리가 함께 만드는 몰입의 시간</p>
      </header>

      {/* Feature: Fog Clearing Challenge (Raid) */}
      <section className="mb-6">
          <div className="bg-gradient-to-r from-slate-800 to-indigo-900/40 rounded-2xl p-4 border border-indigo-500/20 relative overflow-hidden">
             <div className="flex justify-between items-center mb-2 z-10 relative">
                 <h3 className="text-indigo-200 font-bold text-sm">🌫️ 무기력의 안개 걷어내기</h3>
                 <span className="text-[10px] text-indigo-300 bg-indigo-900/50 px-2 py-0.5 rounded-full border border-indigo-500/30">
                     함께 도전 중
                 </span>
             </div>
             <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden mb-1">
                 <div 
                    className="absolute top-0 left-0 h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-1000"
                    style={{ width: `${(fogCleared / FOG_CHALLENGE.total) * 100}%` }}
                 ></div>
             </div>
             <div className="flex justify-between text-[10px] text-slate-400">
                 <span>현재 {fogCleared} 안개 제거</span>
                 <span>목표 {FOG_CHALLENGE.total}</span>
             </div>
          </div>
      </section>

      {/* Group Goal Section */}
      <CoopTree totalMinutes={globalMinutes} />

      {/* Main Action: Start Studying */}
      <button 
        onClick={() => setIsFocusing(true)}
        className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-2xl p-5 mb-8 shadow-lg shadow-amber-900/30 transform transition-all active:scale-98 flex items-center justify-center gap-3"
      >
        <span className="text-2xl">🔥</span>
        <div className="text-left">
            <div className="font-bold text-lg">나만의 불꽃 피우기</div>
            <div className="text-amber-100 text-xs font-medium">집중 모드 시작</div>
        </div>
      </button>

      {/* Healthy Competition: Fire Keepers */}
      <section>
        <div className="flex justify-between items-center mb-4">
             <h2 className="text-lg text-slate-200 font-bold">오늘의 불꽃 지킴이</h2>
             <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">실시간</span>
        </div>

        <div className="bg-night-card rounded-2xl border border-slate-700/50 overflow-hidden">
            {/* My Stats (Sticky top) */}
            <div className="bg-slate-800/50 p-4 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sage-900 border border-sage-500 flex items-center justify-center text-xl">
                        🦊
                    </div>
                    <div>
                        <div className="text-sage-300 font-bold text-sm">나 (밤의 산책자)</div>
                        <div className="text-xs text-slate-400">아직 장작을 모으는 중</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-white font-mono font-bold">0m</div>
                </div>
            </div>

            {/* Leaderboard List */}
            <div className="divide-y divide-slate-700/50">
                {sortedFriends.map((friend, index) => (
                    <div key={friend.id} className="p-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl">
                                    {friend.avatar}
                                </div>
                                {/* Rank Badge for Top 3 */}
                                {index < 3 && (
                                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-night-card ${
                                        index === 0 ? 'bg-amber-400 text-amber-900' :
                                        index === 1 ? 'bg-slate-300 text-slate-900' :
                                        'bg-amber-700 text-amber-100'
                                    }`}>
                                        {index + 1}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="text-slate-200 text-sm font-medium">{friend.name}</div>
                                <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                                    {friend.isOnline ? (
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    ) : (
                                        <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                                    )}
                                    {friend.statusMessage || (friend.isOnline ? '집중하는 중' : '휴식 중')}
                                </div>
                                {/* Warmth Interaction Button */}
                                <button 
                                    onClick={() => handleSendWarmth(friend.id)}
                                    className="text-[10px] bg-slate-800 hover:bg-amber-900/30 text-slate-400 hover:text-amber-500 border border-slate-600 rounded px-1.5 py-0.5 transition-colors flex items-center gap-1"
                                >
                                    <span>🔥</span> {friend.warmth} 온기 보내기
                                </button>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sage-100 font-mono font-bold text-sm">{Math.floor(friend.studyTimeToday / 60)}h {friend.studyTimeToday % 60}m</div>
                            {index === 0 && <div className="text-[10px] text-amber-400">🔥 가장 밝은 빛</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default StudyGroup;