import GetHomePage from "@/utils/content/homePage";
import GetDB from "@/utils/db";
import { GetAnswersFromDB } from "@/utils/db/answer";
import { Questionnaire } from "@/utils/getPoints/questionnaire";
import {
  getContentIds,
  groupByContentId,
} from "../../../utils/getPoints/utils";

const CORKS_PER_QUIZ = 10;

export default async function getPoints(
  corksForTarget: number,
  accessToken: string
) {
  const { db, client } = GetDB();

  const contents = (await GetHomePage()).body.contents;
  const contentIds = getContentIds(contents);

  // get answers from db, group and sort them by the smallest number of questions
  // in order accelerate answering proccess
  const answers = await GetAnswersFromDB(contentIds, db);
  const groupedAnswers = groupByContentId(answers).sort(
    (a, b) => a.length - b.length
  );

  const neededNumOfQuizes = corksForTarget / CORKS_PER_QUIZ;
  for (const group of groupedAnswers.slice(0, neededNumOfQuizes)) {
    await Questionnaire.submitAnsweredQuestions(group, accessToken);
  }

  client.close();
}
