import { BoolString } from "@/interfaces/api/requests";
import { CORKS_FOR_DRINK, HandleUser, NEW_USER_CORKS } from "@/utils/account";
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

  // TODO: get number from user
  const targetNumberOfCorks = CORKS_FOR_DRINK;
  let answeredCounter = 0;

  // TODO: add contentId + type to answers collection

  // run trough every content in home page
  // TODO: support for multiple format types
  for (const content of contents.filter(
    (c) => c.formatType == "KnowledgeQuestionnaire"
  )) {
    // try to answer questions till get to the corks target
    if (
      targetNumberOfCorks - (NEW_USER_CORKS - answeredCounter * 10) >=
      targetNumberOfCorks
    )
      break;

    const { formatType: type, id } = content;

    // TODO: add answer type
    let answers: object[] = [];

    // if answer with contentId found in DB
    try {
      answers = await GetAnswers("contentId", id, db);
    } catch {
      // try to get answer by questionnaireId
      const questionnaire = await GetContentById(id, db);

      // skip if content hasn't been found in DB
      if (!questionnaire) {
        console.log("skipped");
        continue;
      }

      //TODO: fix messy types
      answers = await GetAnswers(
        fields[type as keyof typeof fields],
        questionnaire.id,
        db,
        id
      );
    } finally {
      const numberOfQuestions = answers.length;

      // if answers were found
      if (numberOfQuestions > 0) {
        await RecordLog(id, "Started", accessToken);

        // run trough every answer to question and answer it on server
        for (const index in answers) {
          const answer = answers[index];
          const isLastQuestion = numberOfQuestions == Number(index) + 1;

          await AnswerQuestion(
            answer,
            String(isLastQuestion) as BoolString,
            accessToken
          );

          await RecordLog(id, "Finished", accessToken);
          answeredCounter++;
        }
      }
    }
  }

  await client.close();

  return new Response(JSON.stringify(await GetUserPoints(accessToken)), {
    headers: { "Content-Type": "application/json" },
  });
}
