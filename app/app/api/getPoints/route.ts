import { BoolString } from "@/interfaces/api/requests";
import { HandleUser } from "@/utils/account";
import GetQuestionnaire from "@/utils/content/expandedContent";
import GetHomePage from "@/utils/content/homePage";
import RecordLog from "@/utils/content/recordLog";
import { GetAnswers } from "@/utils/db/answer";
import AnswerQuestion from "@/utils/questionnaire/answer";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
};

export const fields = {
  KnowledgeQuestionnaire: "",
  Hotspots: "hotSpotQuestionnaireId",
};

export async function POST(request: Request) {
  //const data = (await request.json()) as reqData;
  //const { mobilePhone, verificationCode } = data;

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjgzNTc3NCIsImh0dHA6Ly9taW50YXV0aC9jbGFpbXMvZ3VpZCI6IjIzZGZiNzVlLTYyMGItNGI0OS1hMmU4LWJkMzE2ODVhOTRmOCIsInJvbGUiOiIxIiwibmJmIjoxNzU2MTUyNDA0LCJleHAiOjE3NzE3MDQ0MDQsImlhdCI6MTc1NjE1MjQwNH0.2VCRY9RpRteD3YkIFhw8co1Mq3tU5NhyBd2mCVyTZ_Y"; //await HandleUser(mobilePhone, verificationCode);

  const contents = (await GetHomePage(accessToken)).body.contents;
  console.log(contents.length);
  let counter = 0;
  for (const content of contents) {
    counter++;
    const { formatType: type, id } = content;
    const questionnaire = await GetQuestionnaire(id, type, accessToken);
    try {
      //TODO: fix messy types
      const answers = await GetAnswers(
        fields[type as keyof typeof fields],
        questionnaire.body.content.id
      );

      const numberOfAnswers =
        questionnaire.body.content.numberOfAnswersToSuccess;

      //console.log(questionnaire);

      if (answers.length >= numberOfAnswers) {
        await RecordLog(id, "Started", accessToken);

        for (const index in answers) {
          const answer = answers[index];
          const isLastQuestion = numberOfAnswers == Number(index);
          console.log(
            await AnswerQuestion(
              answer,
              String(isLastQuestion) as BoolString,
              accessToken
            )
          );
        }

        await RecordLog(id, "Finished", accessToken);
      }
    } catch {}
  }

  return new Response(JSON.stringify(counter), {
    headers: { "Content-Type": "application/json" },
  });
}
