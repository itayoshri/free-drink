import { BoolString } from "@/interfaces/api/requests";
import { HandleUser } from "@/utils/account";
import GetUserPoints from "@/utils/account/points";
import GetQuestionnaire from "@/utils/content/expandedContent";
import GetHomePage from "@/utils/content/homePage";
import RecordLog from "@/utils/content/recordLog";
import GetDB from "@/utils/db";
import { GetAnswers } from "@/utils/db/answer";
import { GetContentById } from "@/utils/db/content";
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
  const { db, client } = GetDB();
  const accessToken = await HandleUser(mobilePhone, verificationCode);
  const contents = (await GetHomePage()).body.contents;

  // TODO: add contentId + type to answers collection
  // run trough every content in home page
  for (const content of contents.filter(
    (c) => c.formatType == "KnowledgeQuestionnaire"
  )) {
    const { formatType: type, id } = content;
    await RecordLog(id, "Started", accessToken);

    const questionnaire = await GetContentById(id, db); /*GetQuestionnaire(
      id,
      type,
      accessToken,
      db
    );*/

    // if question found in db
    if (questionnaire) {
      console.log(id);
      //TODO: fix messy types
      const answers = await GetAnswers(
        fields[type as keyof typeof fields],
        questionnaire.id,
        db
      );

      const numberOfQuestions = questionnaire.questions.length;
      if (answers.length == numberOfQuestions) {
        for (const index in answers) {
          const answer = answers[index];
          const isLastQuestion = numberOfQuestions == Number(index) + 1;

          await AnswerQuestion(
            answer,
            String(isLastQuestion) as BoolString,
            accessToken
          );

          console.log(id, answer);
        }

        await RecordLog(id, "Finished", accessToken);
      }
    }
  }

  await client.close();

  return new Response(JSON.stringify(await GetUserPoints(accessToken)), {
    headers: { "Content-Type": "application/json" },
  });
}
