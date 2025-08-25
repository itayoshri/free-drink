import { HandleUser } from "@/utils/account";
import GetHomePage from "@/utils/content/homePage";
import { AddAnswer } from "@/utils/db/answer";
import UpdateContent from "@/utils/db/content";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
  answer: unknown;
};

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode, answer } = data;

  //const accessToken = await HandleUser(mobilePhone, verificationCode);
  //console.log(accessToken);

  //const contents = (await GetHomePage(accessToken)).body.contents;
  //UpdateContent(contents, accessToken);
  AddAnswer(answer);

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
