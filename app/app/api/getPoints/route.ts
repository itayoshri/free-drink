import { CORKS_FOR_DRINK, HandleUser } from "@/utils/account";
import GetUserPoints from "@/utils/account/points";
import GetHomePage from "@/utils/content/homePage";
import GetDB from "@/utils/db";
import { GetAnswersFromDB } from "@/utils/db/answer";
import { AnswerQuestions, GetAnswersByField, GroupAnswers } from "./answer";
import GetContents from "./contents";
import { DBContent } from "@/interfaces/db";
import { ApiRes } from "@/interfaces/api";
import { NextApiResponse } from "next";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
};

// TODO: get number from user

export async function POST(
  request: Request,
  response: NextApiResponse<ApiRes>
) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;
  const targetNumberOfCorks = CORKS_FOR_DRINK;

  const { db, client } = GetDB();
  const { accessToken, userCorks } = await HandleUser(
    mobilePhone,
    verificationCode
  );

  if (userCorks >= targetNumberOfCorks)
    response.status(200).json({
      success: true,
      data: { userCorks, accessToken },
      message: "user already has enough corks",
    });

  const corksForTarget = targetNumberOfCorks - userCorks;

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

  const corks = (await GetUserPoints(accessToken)).body.corks;
  response.status(200).json({
    success: Boolean(corks >= targetNumberOfCorks),
    data: { corks, accessToken },
    message: "",
  });
}
