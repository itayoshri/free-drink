import { AddAnswer } from "@/utils/db/answer";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
  answer: unknown;
};

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { answer } = data;
  console.log(answer);

  //const accessToken = await HandleUser(mobilePhone, verificationCode);
  //console.log(accessToken);

  //const contents = (await GetHomePage(accessToken)).body.contents;
  //UpdateContent(contents, accessToken);
  await AddAnswer(answer);

  /*

  const questionnaire = await GetQuestionnaire(6591, accessToken);
  console.log(questionnaire);
  const questions = questionnaire.body.content.questions;
  for (const question of questions) {
    AnswerQuestion(await GetAnswerId(question.id));
  }
  await RecordLog(questionnaire.body.contentId, "Finished", accessToken);
  */
  return new Response(JSON.stringify(""), {
    headers: { "Content-Type": "application/json" },
  });
}
