import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import HealingGallery from './components/HealingGallery';
import StudyGroup from './components/StudyGroup';

enum Tab {
  DASHBOARD = 'dashboard',
  STUDY = 'study',
  GALLERY = 'gallery',
  PROFILE = 'profile'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);

  // Restore active tab
  useEffect(() => {
    const savedTab = localStorage.getItem('smallwins_active_tab');
    if (savedTab && Object.values(Tab).includes(savedTab as Tab)) {
        setActiveTab(savedTab as Tab);
    }
  }, []);

  // Save active tab
  useEffect(() => {
    localStorage.setItem('smallwins_active_tab', activeTab);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.DASHBOARD:
        return <Dashboard />;
      case Tab.STUDY:
        return <StudyGroup />;
      case Tab.GALLERY:
        return <HealingGallery />;
      case Tab.PROFILE:
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-24 h-24 bg-slate-700 rounded-full mb-4 flex items-center justify-center text-4xl">🦊</div>
                <h2 className="text-2xl font-bold text-white mb-2">밤의 산책자</h2>
                <p className="text-slate-400 mb-6">15일째 우리와 함께하는 중</p>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-night-card p-4 rounded-xl border border-slate-700">
                        <div className="text-2xl mb-2">🔥</div>
                        <div className="text-xs text-slate-500">획득 뱃지</div>
                        <div className="text-sage-300 font-bold">따뜻한 장작</div>
                    </div>
                    <div className="bg-night-card p-4 rounded-xl border border-slate-700">
                         <div className="text-2xl mb-2">🦉</div>
                        <div className="text-xs text-slate-500">획득 뱃지</div>
                        <div className="text-indigo-300 font-bold">새벽의 올빼미</div>
                    </div>
                </div>
            </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-night-bg text-slate-200 font-sans selection:bg-sage-500 selection:text-white pb-20">
      <main className="max-w-md mx-auto min-h-screen bg-night-bg shadow-2xl relative">
        {renderContent()}

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-night-card/95 backdrop-blur-md border-t border-slate-800 px-6 py-4 flex justify-between items-center z-50 rounded-t-3xl">
          <button 
            onClick={() => setActiveTab(Tab.DASHBOARD)}
            className={`flex flex-col items-center space-y-1 w-16 ${activeTab === Tab.DASHBOARD ? 'text-sage-400' : 'text-slate-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] font-medium">홈</span>
          </button>

          <button 
            onClick={() => setActiveTab(Tab.STUDY)}
            className={`flex flex-col items-center space-y-1 w-16 ${activeTab === Tab.STUDY ? 'text-amber-400' : 'text-slate-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-[10px] font-medium">스터디</span>
          </button>
          
          <button 
            onClick={() => setActiveTab(Tab.GALLERY)}
            className={`flex flex-col items-center space-y-1 w-16 ${activeTab === Tab.GALLERY ? 'text-sage-400' : 'text-slate-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[10px] font-medium">갤러리</span>
          </button>
          
          <button 
            onClick={() => setActiveTab(Tab.PROFILE)}
            className={`flex flex-col items-center space-y-1 w-16 ${activeTab === Tab.PROFILE ? 'text-sage-400' : 'text-slate-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[10px] font-medium">기록</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default App;