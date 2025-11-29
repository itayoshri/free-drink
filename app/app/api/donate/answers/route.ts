import { ContentType, question } from "@/interfaces/api/res";
import { HandleUser } from "@/utils/account";
import GetHomePage from "@/utils/content/homePage";
import GetDB from "@/utils/db";
import { addAnswersToDB, GetContentsFromDB } from "@/utils/db/answer";
import { Questionnaire, QuestionObj } from "@/utils/getPoints/questionnaire";
import { getContentIds, groupByContentId } from "../../getPoints/utils";

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
  const contentIds = getContentIds(currentContents);
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
    })) as QuestionObj[];

    const q = new Questionnaire(
      content.contentId,
      content.content.id,
      questions,
      content.type as ContentType
    );

    answeredQuestionsToPush.push(
      ...(await q.getAnsweredQuestionsArr(accessToken))
    );
  }

  await addAnswersToDB(answeredQuestionsToPush);

  return new Response(JSON.stringify(""), {
    headers: { "Content-Type": "application/json" },
  });
}
