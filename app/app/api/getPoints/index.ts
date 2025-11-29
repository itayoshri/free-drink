import GetHomePage from "@/utils/content/homePage";
import GetDB from "@/utils/db";
import { GetAnswersFromDB } from "@/utils/db/answer";
import { Questionnaire } from "@/utils/getPoints/questionnaire";
import { getContentIds, groupByContentId } from "./utils";

export default async function getPoints(
  corksForTarget: number,
  accessToken: string
) {
  const { db, client } = GetDB();

  const contents = (await GetHomePage()).body.contents;
  const contentIds = getContentIds(contents);

  const answers = await GetAnswersFromDB(contentIds, db);
  const groupedAnswers = groupByContentId(answers);
  for (const group of groupedAnswers) {
    await Questionnaire.submitAnsweredQuestions(group, accessToken);
  }

  client.close();
}
