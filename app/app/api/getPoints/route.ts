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

const fields = {
  KnowledgeQuestionnaire: "questionnaireId",
  Hotspots: "hotSpotQuestionnaireId",
};

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;

  const accessToken = await HandleUser(mobilePhone, verificationCode);

  const contents = (await GetHomePage(accessToken)).body.contents;

  for (const content of contents.filter(
    (c) => c.formatType == "KnowledgeQuestionnaire"
  )) {
    const { formatType: type, id } = content;
    await RecordLog(id, "Started", accessToken);

    const questionnaire = await GetQuestionnaire(id, type, accessToken);

    try {
      //TODO: fix messy types
      const answers = await GetAnswers(
        fields[type as keyof typeof fields],
        questionnaire.body.content.id
      );

      const numberOfQuestions = questionnaire.body.content.questions.length;
      console.log(answers);
      if (answers.length == numberOfQuestions) {
        for (const index in answers) {
          const answer = answers[index];
          const isLastQuestion = numberOfQuestions == Number(index) + 1;
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

  return new Response(JSON.stringify(0), {
    headers: { "Content-Type": "application/json" },
  });
}
