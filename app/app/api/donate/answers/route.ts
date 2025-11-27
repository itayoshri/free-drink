import { ContentType } from "@/interfaces/api/res";
import { HandleUser } from "@/utils/account";
import GetDB from "@/utils/db";
import { GetContentsFromDB } from "@/utils/db/answer";
import { Questionnaire, QuestionObj } from "@/utils/getPoints/questionnaire";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
  answer: unknown;
};

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;

  const { accessToken } = await HandleUser(mobilePhone, verificationCode);
  const { db, client } = GetDB();
  const content = (await GetContentsFromDB([7057], db))[0];
  client.close();

  const questions = content.content.questions.map((question) => ({
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

  console.log(await q.questions[1].getObjWithAnswer(accessToken));

  return new Response(JSON.stringify(""), {
    headers: { "Content-Type": "application/json" },
  });
}
