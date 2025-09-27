import { Type } from "@google/genai";
import { DBContent, DBAnswer } from "../../../app/interfaces/db";
import GetFormattedQuestionnaire from "./format";
import BuildPrompt from "./prompt";
import AskAIModel from "../model";
import formatAnswerRequest from "../api/answer";
import GetDB from "../../../app/utils/db";

export const schema = {
  //contentId: Type.NUMBER,
  //questionnaireId: Type.NUMBER,
  type: "object",
  properties: {
    result: {
      type: "object",
      properties: {
        questionId: { type: "number" },
        answerId: { type: "number" },
      },
      required: ["questionId", "answerId"],
    },
    explanation: { type: "string" },
  },
  required: ["result", "explanation"],
  // isLastQuestion
  // answers: Type.Array(?)
};

const BASE_PROMPT = `
קרא את השאלה ואת התשובות האפשרויות וחשוב מהי התשובה הנכונה או זו שיוצרת את המשפט הנכון ביותר. החזר אך ורק JSON בפורמט הבא:
{
  "result": {
    "questionId": number,
    "answerId": number|null
  },
  "explanation": string
}
אם אינך בטוח – כתוב answerId=null
החזר אך ורק JSON. אל תוסיף טקסט, כותרות או סימוני json.  
INPUT:

`;

export default async function RunDataOnModel(
  content: DBContent,
  limit: number
) {
  const answers = [] as DBAnswer[];
  const data = GetFormattedQuestionnaire(content);
  const questions = data.questions;
  let counter = 0;

  // TODO: validation
  for (const question of questions) {
    if (counter >= limit) break;
    const prompt = BuildPrompt(BASE_PROMPT, question);
    const modelAnswer = await AskAIModel(prompt, schema);
    const answer = formatAnswerRequest(modelAnswer.text as string, data);
    answers.push(answer);
    counter++;
  }

  return answers;
}
