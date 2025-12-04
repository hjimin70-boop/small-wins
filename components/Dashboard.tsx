import React, { useState, useEffect } from 'react';
import { Mission, Mood } from '../types';
import { MOODS, INITIAL_MISSIONS, LEVEL_2_MISSIONS, ACTIVITY_LOGS, DAILY_KEYWORDS } from '../constants';
import { getEncouragementMessage } from '../services/geminiService';
import InviteModal from './InviteModal';

const Dashboard: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [aiMessage, setAiMessage] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [showLevel2, setShowLevel2] = useState(false);
  const [collectedSunlight, setCollectedSunlight] = useState(false);
  
  // Random Daily Keyword
  const [dailyKeyword] = useState(() => DAILY_KEYWORDS[Math.floor(Math.random() * DAILY_KEYWORDS.length)]);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedMissions = localStorage.getItem('smallwins_missions');
      if (savedMissions) {
        setMissions(JSON.parse(savedMissions));
      }
      
      const savedSunlight = localStorage.getItem('smallwins_sunlight');
      if (savedSunlight) {
        setCollectedSunlight(JSON.parse(savedSunlight));
      }

      // Check if we need to show Level 2 based on loaded missions
      if (savedMissions) {
          const parsedMissions: Mission[] = JSON.parse(savedMissions);
          const hasLevel2 = parsedMissions.some(m => m.level === 2);
          if (hasLevel2) setShowLevel2(true);
      }
    } catch (e) {
      console.error("Failed to load local storage", e);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('smallwins_missions', JSON.stringify(missions));
  }, [missions]);

  useEffect(() => {
    localStorage.setItem('smallwins_sunlight', JSON.stringify(collectedSunlight));
  }, [collectedSunlight]);

  const toggleMission = (id: number) => {
    setMissions(missions.map(m => 
      m.id === id ? { ...m, completed: !m.completed } : m
    ));
  };

  const unlockLevel2 = () => {
    const newMissions = [...missions, ...LEVEL_2_MISSIONS];
    setMissions(newMissions);
    setShowLevel2(true);
  };

  const handleMoodSelect = async (mood: Mood) => {
    setSelectedMood(mood);
    setIsAiLoading(true);
    const msg = await getEncouragementMessage(mood.label);
    setAiMessage(msg);
    setIsAiLoading(false);
  };

  const completedCount = missions.filter(m => m.completed).length;
  const level1Completed = missions.filter(m => m.level === 1 && m.completed).length;
  // Unlock logic: 3 or more level 1 missions completed AND level 2 not yet shown
  const isLevel2Unlocked = level1Completed >= 3 && !showLevel2;

  // XP Calculation
  const totalXP = missions.reduce((acc, mission) => mission.completed ? acc + mission.xp_reward : acc, 0) + (collectedSunlight ? 50 : 0);

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto relative">
      <InviteModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />

      {/* Header */}
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-sage-100">나의 하루</h1>
          <p className="text-sm text-slate-400">오늘도 작은 발걸음을 응원해요.</p>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={() => setIsInviteOpen(true)}
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600 text-amber-300 hover:bg-slate-700 transition-colors"
                aria-label="친구 초대"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-sage-500">
               <span className="text-xl">🦊</span>
            </div>
        </div>
      </header>

      {/* Feature 1: Forest Echo (Community Ticker) */}
      <div className="mb-6 bg-slate-800/40 rounded-full px-4 py-2 flex items-center overflow-hidden border border-slate-700/50">
        <span className="text-xs font-bold text-sage-400 mr-2 flex-shrink-0">🌲 숲의 메아리 |</span>
        <div className="flex-1 overflow-hidden relative h-5">
           <div className="absolute animate-float text-xs text-slate-300 whitespace-nowrap">
             {ACTIVITY_LOGS[0].message} <span className="text-slate-500 mx-2">•</span> {ACTIVITY_LOGS[0].timeAgo}
           </div>
        </div>
      </div>

      {/* Feature 2: Daily Keyword Card */}
      <section className="mb-6">
        <div className="bg-gradient-to-br from-sage-900 to-slate-800 rounded-2xl p-5 border border-sage-700/30 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">📖</div>
             <p className="text-xs text-sage-300 font-bold mb-1">오늘의 단어</p>
             <h3 className="text-2xl text-white font-bold mb-1">"{dailyKeyword.word}"</h3>
             <p className="text-sm text-slate-400">{dailyKeyword.meaning}</p>
        </div>
      </section>

      {/* Feature 3: Sunshine Collector (New) */}
      <section className="mb-8">
        <div className={`rounded-2xl p-4 flex items-center justify-between border transition-all duration-500 ${
            collectedSunlight 
            ? 'bg-amber-900/20 border-amber-500/50' 
            : 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600'
        }`}>
            <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${collectedSunlight ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/50' : 'bg-slate-600 grayscale'}`}>
                    ☀️
                </div>
                <div>
                    <h3 className={`font-bold text-sm ${collectedSunlight ? 'text-amber-300' : 'text-slate-200'}`}>햇살 수집하기</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                        {collectedSunlight ? "오늘의 따뜻함을 수집했어요!" : "잠시 문 밖으로 나가볼까요?"}
                    </p>
                </div>
            </div>
            <button 
                onClick={() => setCollectedSunlight(true)}
                disabled={collectedSunlight}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                    collectedSunlight 
                    ? 'bg-transparent text-amber-500' 
                    : 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg'
                }`}
            >
                {collectedSunlight ? "+50 XP" : "수집하기"}
            </button>
        </div>
      </section>

      {/* Mood Check-in */}
      <section className="mb-8">
        <h2 className="text-lg text-slate-200 font-bold mb-4">오늘 마음의 날씨는?</h2>
        <div className="flex justify-between gap-2 mb-4">
          {MOODS.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood)}
              className={`flex-1 flex flex-col items-center justify-center py-4 rounded-2xl transition-all duration-300 border ${
                selectedMood?.id === mood.id 
                  ? 'bg-slate-700 border-sage-500 transform scale-105' 
                  : 'bg-night-card border-slate-800 hover:bg-slate-700'
              }`}
            >
              <span className="text-2xl mb-2">{mood.emoji}</span>
              <span className={`text-xs font-medium ${mood.color}`}>{mood.label}</span>
            </button>
          ))}
        </div>
        
        {/* AI Message Area */}
        {(selectedMood || isAiLoading) && (
           <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 animate-fade-in relative">
             <div className="absolute top-0 left-8 -mt-2">
               <div className="w-4 h-4 bg-slate-800 border-t border-l border-slate-700 transform rotate-45"></div>
             </div>
             {isAiLoading ? (
               <div className="flex items-center gap-2 text-slate-400 text-sm">
                 <span className="animate-pulse">🌲</span> 숲의 정령이 이야기를 듣고 있어요...
               </div>
             ) : (
               <p className="text-sage-100 text-sm leading-relaxed whitespace-pre-line font-medium">
                 "{aiMessage}"
               </p>
             )}
           </div>
        )}
      </section>

      {/* Daily Micro Missions */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-lg text-slate-200 font-bold">작은 성취들</h2>
            <p className="text-xs text-slate-400 mt-1">
                획득한 용기: <span className="text-amber-400 font-bold text-sm ml-1">{totalXP} XP</span>
            </p>
          </div>
          <span className="text-xs text-sage-400 bg-sage-900/30 px-2 py-1 rounded-lg border border-sage-700">
            {completedCount} / {missions.length} 완료
          </span>
        </div>
        
        <div className="space-y-3">
          {missions.map((mission) => (
            <div 
              key={mission.id}
              onClick={() => toggleMission(mission.id)}
              className={`relative flex items-center p-4 rounded-2xl transition-all cursor-pointer border ${
                mission.completed 
                  ? 'bg-slate-800/50 border-transparent' 
                  : mission.level === 2 
                    ? 'bg-slate-800 border-amber-500/30 hover:bg-slate-700' 
                    : 'bg-night-card border-slate-700 hover:border-sage-500/50 hover:bg-slate-800'
              }`}
            >
              {mission.level === 2 && !mission.completed && (
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-night-bg text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                      Big Step
                  </div>
              )}

              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${
                mission.completed 
                  ? 'bg-sage-500 border-sage-500' 
                  : mission.level === 2 ? 'border-amber-500' : 'border-slate-500'
              }`}>
                {mission.completed && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        mission.category === 'self_care' ? 'border-pink-900 text-pink-300 bg-pink-900/20' :
                        mission.category === 'cleaning' ? 'border-blue-900 text-blue-300 bg-blue-900/20' :
                        'border-emerald-900 text-emerald-300 bg-emerald-900/20'
                    }`}>
                        {mission.category === 'self_care' ? '나 돌보기' : 
                         mission.category === 'cleaning' ? '정리정돈' : '연결하기'}
                    </span>
                    {mission.level === 2 && <span className="text-[10px] text-amber-400 font-bold">Lv.2</span>}
                </div>
                <h3 className={`font-medium transition-all ${
                  mission.completed ? 'text-slate-500 line-through' : 'text-slate-200'
                }`}>
                  {mission.title}
                </h3>
              </div>
              <div className="text-xs text-slate-500 font-medium ml-2">
                +{mission.xp_reward}XP
              </div>
            </div>
          ))}

          {/* Unlock More Button */}
          {isLevel2Unlocked && (
            <button 
                onClick={unlockLevel2}
                className="w-full py-4 mt-4 bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 border-dashed rounded-xl text-slate-300 hover:text-white hover:border-sage-400 transition-all flex flex-col items-center justify-center group"
            >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">✨</div>
                <span className="font-bold">더 넓은 숲으로 나아가기</span>
                <span className="text-xs text-slate-500 mt-1">새로운 미션 4개가 기다리고 있어요</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;