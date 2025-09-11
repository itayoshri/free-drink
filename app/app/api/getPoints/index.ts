import GetHomePage from "@/utils/content/homePage";
import GetDB from "@/utils/db";
import { GetAnswersFromDB } from "@/utils/db/answer";
import { GetAnswersByField, GroupAnswers, AnswerQuestions } from "./answer";
import { DBAnswer } from "@/interfaces/db";

/**
 * solve games on coca-cola's app in order to get corks using coca-cola's api and DB of answers
 *
 * @param corksForTarget - corks that need to be achieved
 * @param accessToken - string that is used to verify and authorize against coca-cola's api
 */
export default async function HandleAnswers(
  corksForTarget: number,
  accessToken: string
) {
  const { db, client } = GetDB();

  const contents = (await GetHomePage()).body.contents;
  const contentIds = contents.map((c) => c.id);
  const answers = (await GetAnswersFromDB(contentIds, db)) as DBAnswer[];

  if (answers.length * 10 < corksForTarget) {
    answers.push(...(await GetAnswersByField(answers, contentIds, db)));
  }

  client.close();

  const questions = GroupAnswers(answers);
  await AnswerQuestions(questions, accessToken);
}
