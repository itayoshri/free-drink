import { Type } from "@google/genai";
import { DBContent, DBAnswer } from "../../../app/interfaces/db";
import GetFormattedQuestionnaire from "./format";
import BuildPrompt from "./prompt";
import AskAIModel from "../model";
import { ModelSchema } from "@/interfaces/data";
import GenerateSignedHash from "../api/signedHash";
import GetAPIFormattedAnswerRequest from "../api/answer";
import GetDB from "../../../app/utils/db";
import { GetAnswersFromDB } from "../../../app/utils/db/answer";
import isCorrectAnswer from "./validation";

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
  const answers = [] as DBAnswer[];
  const data = GetFormattedQuestionnaire(content);
  const questions = data.questions;

  // TODO: validation
  /*const { db, client } = GetDB();
  const dbAnswers = await GetAnswersFromDB([data.contentId], db);
*/
  for (const question of questions) {
    const prompt = BuildPrompt(BASE_PROMPT, question);
    const modelAnswer = await AskAIModel(prompt, schema);
    const answer = GetAPIFormattedAnswerRequest(
      modelAnswer.text as string,
      data
    );
    answers.push(answer);
  }
}
