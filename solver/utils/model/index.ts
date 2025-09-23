import { GoogleGenAI, Type } from "@google/genai";

export default async function AskAIModel(
  prompt: string,
  responseSchema: Record<string, Type>
) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      /*
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },*/
      tools: [{ googleSearch: {} }],
      //responseMimeType: "application/json",
      responseJsonSchema: responseSchema,
    },
  });

  return response;
}
