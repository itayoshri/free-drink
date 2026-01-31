import { ContentType } from "@/interfaces/api/res";
import { HandleUser } from "@/utils/account";
import GetHomePage from "@/utils/content/homePage";
import GetDB from "@/utils/db";
import { NextResponse } from "next/server";
import { addAnswersToDB, GetContentsFromDB } from "@/utils/db/answer";
import { Questionnaire, QuestionObj } from "@/utils/getPoints/questionnaire";
import { getContentIds } from "../../../../utils/getPoints/utils";
import UpdateContent from "@/utils/db/content";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
  answer: unknown;
};

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;
  const { accessToken } = await HandleUser(mobilePhone, verificationCode, true);
  const { db, client } = GetDB();

  const currentContents = (await GetHomePage()).body.contents;
  await UpdateContent(currentContents, accessToken, db);

  const answeredIds = (
    await db
      .collection("answers")
      .find({}, { projection: { contentId: 1, _id: 0 } })
      .toArray()
  ).map((doc) => doc.contentId);
  const contentIds = getContentIds(currentContents).filter(
    (c) => !answeredIds.includes(c),
  );
  const contents = await GetContentsFromDB(contentIds, db);
  client.close();

  const answeredQuestionsToPush = [];

  for (const content of contents) {
    const rawQuestions = content.content?.questions;

    if (
      !rawQuestions ||
      rawQuestions.length == 0 ||
      !Questionnaire.isGeneric(rawQuestions) ||
      content.type !== "KnowledgeQuestionnaire"
    )
      continue;

    const questions = rawQuestions.map((question) => ({
      questionnaireId: question.questionnaireId,
      questionId: question.id,
      answers: question.answers,
      timeInSeconds: content.content.timeInSeconds,
    })) as QuestionObj[];

    const q = new Questionnaire(
      content.contentId,
      content.content.id,
      questions,
      content.type as ContentType,
    );

    answeredQuestionsToPush.push(
      ...(await q.getAnsweredQuestionsArr(accessToken)),
    );
  }

  if (answeredQuestionsToPush.length > 0)
    await addAnswersToDB(answeredQuestionsToPush);

  return NextResponse.json(
    {
      data: { solved: answeredQuestionsToPush, accessToken },
      message: "",
    },
    { status: 200 },
  );
}
