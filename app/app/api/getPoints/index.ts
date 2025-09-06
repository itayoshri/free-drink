import { DBContent } from "@/interfaces/db";
import GetHomePage from "@/utils/content/homePage";
import GetDB from "@/utils/db";
import { GetAnswersFromDB } from "@/utils/db/answer";
import { GetAnswersByField, GroupAnswers, AnswerQuestions } from "./answer";
import GetContents from "./contents";

export default async function HandleAnswers(
  corksForTarget: number,
  accessToken: string
) {
  const { db, client } = GetDB();

  const contents = (await GetHomePage()).body.contents;
  const contentIds = contents.map((c) => c.id);

  const answers = await GetAnswersFromDB(contentIds, db);

  let expandedContents = [] as DBContent[];
  if (answers.length * 10 < corksForTarget) {
    expandedContents = await GetContents(answers, contentIds, db);
    answers.push(...(await GetAnswersByField(expandedContents, db)));
  }

  client.close();

  const questions = GroupAnswers(answers);
  await AnswerQuestions(questions, expandedContents, accessToken);
}
