import { BoolString } from "@/interfaces/api/requests";
import { CORKS_FOR_DRINK, HandleUser, NEW_USER_CORKS } from "@/utils/account";
import GetUserPoints from "@/utils/account/points";
import GetQuestionnaire from "@/utils/content/expandedContent";
import GetHomePage from "@/utils/content/homePage";
import RecordLog from "@/utils/content/recordLog";
import GetDB from "@/utils/db";
import {
  GetAnswers,
  GetAnswersFromDB,
  GetAnswersFromDBByField,
  GetContentsFromDB,
} from "@/utils/db/answer";
import { GetContentById } from "@/utils/db/content";
import AnswerQuestion from "@/utils/questionnaire/answer";
import { Document } from "mongodb";
import { AnswerQuestions, GetAnswersByField, GroupAnswers } from "./answer";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
};

export const fields = {
  KnowledgeQuestionnaire: "questionnaireId",
  Hotspots: "hotSpotQuestionnaireId",
};

// TODO: get number from user
//const targetNumberOfCorks = CORKS_FOR_DRINK;

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;
  const { db, client } = GetDB();
  const accessToken = await HandleUser(mobilePhone, verificationCode, true);
  const contents = (await GetHomePage()).body.contents;
  let contentIds = contents.map((c) => c.id);

  const answers = await GetAnswersFromDB(contentIds, db);

  // filter out answers that were found and get the rest
  const mapped = new Set(answers.map((a) => a.contentId));
  contentIds = contentIds.filter((contentId) => !mapped.has(contentId));
  const expandedContents = await GetContentsFromDB(contentIds, db);
  answers.push(...(await GetAnswersByField(expandedContents, db)));

  client.close();

  const questions = GroupAnswers(answers);
  await AnswerQuestions(questions, expandedContents, accessToken);

  return new Response(JSON.stringify(await GetUserPoints(accessToken)), {
    headers: { "Content-Type": "application/json" },
  });
}
