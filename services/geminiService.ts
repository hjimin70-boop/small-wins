// API Dependency removed to ensure stable deployment
// Replacing dynamic AI generation with curated, warm messages

const ENCOURAGEMENT_MESSAGES = [
  "당신의 오늘을 진심으로 응원해요. 천천히 가도 괜찮아요.",
  "잠시 쉬어가도 괜찮아요. 숲은 언제나 당신을 위해 여기 있어요.",
  "작은 발걸음 하나가 훌륭한 여행의 시작이랍니다.",
  "오늘 하루, 당신이 느낀 감정 모두 소중하고 의미 있어요.",
  "혼자가 아니에요. 우리 모두 각자의 속도로 함께 걷고 있어요.",
  "지금 그대로도 충분히 잘하고 있어요.",
  "어두운 밤이 지나면 반드시 따뜻한 아침이 와요.",
  "당신의 속도는 틀리지 않았어요. 당신만의 리듬을 믿으세요.",
  "숨을 깊게 들이마셔보세요. 공기는 언제나 당신 편이에요.",
  "오늘 못한 일보다, 오늘 견뎌낸 마음에 집중해보세요."
];

export const getEncouragementMessage = async (moodLabel: string): Promise<string> => {
  // Simulate a short delay to feel like "thinking"
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return a random message
  const randomIndex = Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length);
  return ENCOURAGEMENT_MESSAGES[randomIndex];
};