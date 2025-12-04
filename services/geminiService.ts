import { GoogleGenAI } from "@google/genai";

// Ensure TypeScript recognizes process.env for web builds
declare const process: {
  env: {
    API_KEY: string;
  }
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getEncouragementMessage = async (moodLabel: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      사용자가 현재 '${moodLabel}' 기분을 느끼고 있어.
      이 사용자는 은둔형 외톨이 성향이 있거나 휴식 중인 청년이야.
      아주 짧고(30자 이내), 따뜻하며, 부담스럽지 않은 위로나 공감의 한 마디를 건네줘.
      강요하거나 가르치려 하지 말고, 옆에 있어주는 친구처럼 말해줘.
      존댓말(해요체)을 사용해줘.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "당신의 오늘을 응원해요. 천천히 가도 괜찮아요.";
  }
};