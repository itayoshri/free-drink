import { Type } from "@google/genai";
import { DBContent } from "../../../app/interfaces/db";
import GetFormattedQuestionnaire from "./format";
import BuildPrompt from "./prompt";
import GetDB from "../../../app/utils/db/index";
import { GetAnswersFromDB } from "../../../app/utils/db/answer";
import AskAIModel from "../model";

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

export default async function RunDataOnModel(content: DBContent) {
  const data = GetFormattedQuestionnaire(content);
  const questions = data.questions;

  //const { db, client } = GetDB();
  //const dbAnswers = await GetAnswersFromDB([data.contentId], db);

  for (const question of questions) {
    const prompt = BuildPrompt(BASE_PROMPT, question);
    //console.log(prompt);
    const answer = await AskAIModel(prompt, schema);
    console.log(answer.text);
  }
}
