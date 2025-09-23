import { GoogleGenAI, Type } from "@google/genai";

export default async function AskAIModel(
  prompt: string,
  responseSchema: Record<string, Type>
) {
  const ai = new GoogleGenAI({});
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseJsonSchema: responseSchema,
    },
  });

  return response;
}

const schema = {
  contentId: Type.NUMBER,
  questionnaireId: Type.NUMBER,
  questionId: Type.NUMBER,
  answerId: Type.NUMBER,
  // isLastQuestion
  // answers: Type.Array(?)
};
