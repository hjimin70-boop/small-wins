import React from 'react';
import { GalleryItem } from '../types';

const MOCK_GALLERY: GalleryItem[] = [
  { id: 1, url: 'https://picsum.photos/400/300?random=1', author: '밤하늘', caption: '오늘 창밖의 구름이 예뻐요.', likes: 12 },
  { id: 2, url: 'https://picsum.photos/400/400?random=2', author: '작은돌', caption: '길가다 만난 고양이', likes: 24 },
  { id: 3, url: 'https://picsum.photos/300/400?random=3', author: '느린거북이', caption: '책상 정리 끝내고 한 컷', likes: 8 },
  { id: 4, url: 'https://picsum.photos/400/300?random=4', author: '달빛', caption: '새벽 2시의 차분함', likes: 15 },
  { id: 5, url: 'https://picsum.photos/400/300?random=5', author: '숲속', caption: '직접 키운 바질이에요', likes: 30 },
  { id: 6, url: 'https://picsum.photos/400/400?random=6', author: '모닥불', caption: '오늘 하루도 수고했어요', likes: 42 },
];

const HealingGallery: React.FC = () => {
  return (
    <div className="p-4 pb-24">
      <h2 className="text-xl text-sage-100 font-bold mb-6 flex items-center">
        <span className="mr-2">🖼️</span> 힐링 갤러리
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {MOCK_GALLERY.map((item) => (
          <div key={item.id} className="bg-night-card rounded-2xl overflow-hidden shadow-lg border border-slate-700/50">
            <img src={item.url} alt={item.caption} className="w-full h-32 object-cover hover:scale-105 transition-transform duration-500" />
            <div className="p-3">
              <p className="text-slate-300 text-sm font-medium truncate">{item.caption}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-slate-500">{item.author}</span>
                <div className="flex items-center text-xs text-amber-300">
                  <span className="mr-1">♥</span> {item.likes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="fixed bottom-24 right-6 bg-sage-500 hover:bg-sage-400 text-white rounded-full p-4 shadow-2xl transition-all active:scale-95 z-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default HealingGallery;
