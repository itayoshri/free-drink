import { HandleUser } from "@/utils/account";
import GetQuestionnaire from "@/utils/content/expandedContent";
import GetAnswerId from "@/utils/content/questionnaire";
import answerQuestion from "@/utils/content/questionnaire";
import RecordLog from "@/utils/content/recordLog";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
};

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;

  const accessToken = await HandleUser(mobilePhone, verificationCode);

  /*
  const questionnaire = await GetQuestionnaire(5384, accessToken);
  console.log(questionnaire);
  const questions = questionnaire.body.content.questions;
  for (const question of questions) {
    answerQuestion(await GetAnswerId(question.id));
  }
  await RecordLog(questionnaire.body.contentId, accessToken);
  */
  return new Response(JSON.stringify(null), {
    headers: { "Content-Type": "application/json" },
  });
}
