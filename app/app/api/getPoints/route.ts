import { HandleUser } from "@/utils/account";
import GetQuestionnaire from "@/utils/content/expandedContent";
import GetAnswerId from "@/utils/content/questionnaire";
import RecordLog from "@/utils/content/recordLog";
import AnswerQuestion from "@/utils/questionnaire/answer";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
};

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;

  const accessToken = await HandleUser(mobilePhone, verificationCode);
  /*
  await RecordLog(6591, "Started", accessToken);

  const questionnaire = await GetQuestionnaire(6591, accessToken);
  console.log(questionnaire);
  const questions = questionnaire.body.content.questions;
  for (const question of questions) {
    AnswerQuestion(await GetAnswerId(question.id));
  }
  await RecordLog(questionnaire.body.contentId, "Finished", accessToken);
  */
  return new Response(JSON.stringify(accessToken), {
    headers: { "Content-Type": "application/json" },
  });
}
