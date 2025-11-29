import GetHomePage from "@/utils/content/homePage";
import GetDB from "@/utils/db";
import { GetAnswersFromDB } from "@/utils/db/answer";
import { Questionnaire } from "@/utils/getPoints/questionnaire";
import { groupAnswers } from "./utils";

export default async function getPoints(
  corksForTarget: number,
  accessToken: string
) {
  const { db, client } = GetDB();

  const contents = (await GetHomePage()).body.contents;
  const contentIds = contents.map((c) => c.id);

  const answers = await GetAnswersFromDB(contentIds, db);
  const groupedAnswers = groupAnswers(answers);
  for (const group of groupedAnswers) {
    await Questionnaire.submitAnsweredQuestions(group, accessToken);
  }

  client.close();
}
