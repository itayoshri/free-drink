import { CORKS_FOR_DRINK, HandleUser } from "@/utils/account";
import GetUserPoints from "@/utils/account/points";
import GetHomePage from "@/utils/content/homePage";
import GetDB from "@/utils/db";
import { GetAnswersFromDB } from "@/utils/db/answer";
import { Document, WithId } from "mongodb";
import { AnswerQuestions, GetAnswersByField, GroupAnswers } from "./answer";
import GetContents from "./contents";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
};

// TODO: get number from user

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;
  const targetNumberOfCorks = CORKS_FOR_DRINK;

  const { db, client } = GetDB();
  const { accessToken, userCorks } = await HandleUser(
    mobilePhone,
    verificationCode
  );

  if (userCorks == targetNumberOfCorks)
    return new Response(JSON.stringify("user already has enough corks"), {
      headers: { "Content-Type": "application/json" },
    });

  const corksForTarget = targetNumberOfCorks - userCorks;

  const contents = (await GetHomePage()).body.contents;
  const contentIds = contents.map((c) => c.id);

  const answers = await GetAnswersFromDB(contentIds, db);

  let expandedContents = [] as WithId<Document>[];
  if (answers.length * 10 < corksForTarget) {
    expandedContents = await GetContents(answers, contentIds, db);
    answers.push(...(await GetAnswersByField(expandedContents, db)));
  }

  client.close();

  const questions = GroupAnswers(answers);
  await AnswerQuestions(questions, expandedContents, accessToken);

  return new Response(JSON.stringify(await GetUserPoints(accessToken)), {
    headers: { "Content-Type": "application/json" },
  });
}
