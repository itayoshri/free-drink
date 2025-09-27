import { Type } from "@google/genai";
import { DBContent, DBAnswer } from "../../../app/interfaces/db";
import GetFormattedQuestionnaire from "./format";
import BuildPrompt from "./prompt";
import AskAIModel from "../model";
import formatAnswerRequest from "../api/answer";

export const schema = {
  //contentId: Type.NUMBER,
  //questionnaireId: Type.NUMBER,
  questionId: Type.NUMBER,
  answerId: Type.NUMBER,
  // isLastQuestion
  // answers: Type.Array(?)
};

const BASE_PROMPT = `
קרא את השאלה ואת התשובות האפשרויות והסבר מהי התשובה הנכונה או זו שיוצרת את המשפט הנכון ביותר במילים שלך. אחר כך החזר JSON שמכיל רק:
{ "questionId", "answerId" } כאשר answerId מתאים לתשובה שבחרת.
אם אינך בטוח – כתוב answerId=null
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
  /*const { db, client } = GetDB();
  const dbAnswers = await GetAnswersFromDB([data.contentId], db);
*/
  for (const question of questions) {
    if (counter > limit) break;
    const prompt = BuildPrompt(BASE_PROMPT, question);
    const modelAnswer = await AskAIModel(prompt, schema);
    const answer = formatAnswerRequest(modelAnswer.text as string, data);
    answers.push(answer);
    counter++;
  }
}
