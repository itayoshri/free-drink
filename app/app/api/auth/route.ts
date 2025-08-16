import { HandleUser } from "@/utils/account";
type reqData = {
  token: string;
};

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { token } = data;

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
