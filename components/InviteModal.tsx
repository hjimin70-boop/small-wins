import React, { useState } from 'react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const inviteCode = "FOREST-8291";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://small-wins.app/invite/${inviteCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-[#FFFDF5] rounded-3xl overflow-hidden shadow-2xl transform transition-all">
        {/* Ticket Perforation */}
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-slate-900/10 to-transparent"></div>
        
        {/* Header Image / Pattern */}
        <div className="h-32 bg-sage-500 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
            <div className="text-6xl animate-float">✉️</div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">숲으로의 초대장</h2>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                당신의 소중한 친구를 이 숲으로 초대하세요.<br/>
                함께라면 밤이 덜 어두울 거예요.
            </p>

            {/* Ticket Code Box */}
            <div className="bg-slate-100 rounded-xl p-4 border-2 border-dashed border-slate-300 mb-6">
                <p className="text-xs text-slate-400 mb-1 uppercase tracking-widest">Invitation Code</p>
                <p className="text-2xl font-mono font-bold text-sage-700">{inviteCode}</p>
            </div>

            {/* Actions */}
            <button 
                onClick={handleCopy}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all mb-3 flex items-center justify-center gap-2 ${
                    copied ? 'bg-amber-300 text-amber-900' : 'bg-sage-700 text-white hover:bg-sage-800'
                }`}
            >
                {copied ? (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        초대 링크 복사 완료!
                    </>
                ) : (
                    <>
                        <span>🔗</span> 초대 링크 복사하기
                    </>
                )}
            </button>
            
            <button 
                onClick={onClose}
                className="text-slate-400 text-sm hover:text-slate-600 underline"
            >
                다음에 초대하기
            </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;