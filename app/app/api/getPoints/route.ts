import { BoolString } from "@/interfaces/api/requests";
import { CORKS_FOR_DRINK, HandleUser, NEW_USER_CORKS } from "@/utils/account";
import GetUserPoints from "@/utils/account/points";
import GetQuestionnaire from "@/utils/content/expandedContent";
import GetHomePage from "@/utils/content/homePage";
import RecordLog from "@/utils/content/recordLog";
import GetDB from "@/utils/db";
import {
  GetAnswers,
  GetAnswersFromDB,
  GetAnswersFromDBByField,
  GetContentsFromDB,
} from "@/utils/db/answer";
import { GetContentById } from "@/utils/db/content";
import AnswerQuestion from "@/utils/questionnaire/answer";
import { Document } from "mongodb";

type reqData = {
  verificationCode: string;
  mobilePhone: string;
};

export const fields = {
  KnowledgeQuestionnaire: "questionnaireId",
  Hotspots: "hotSpotQuestionnaireId",
};

export async function POST(request: Request) {
  const data = (await request.json()) as reqData;
  const { mobilePhone, verificationCode } = data;
  const { db, client } = GetDB();
  const accessToken = await HandleUser(mobilePhone, verificationCode, true);
  const contents = (await GetHomePage()).body.contents;
  let contentIds = contents.map((c) => c.id);

  // TODO: get number from user
  const targetNumberOfCorks = CORKS_FOR_DRINK;
  let answeredCounter = 0;

  // get answers
  const answers = [] as Document[];

  // get answers that has an updated contentId
  answers.push(...(await GetAnswersFromDB(contentIds, db)));

  // pervent duplicates
  const mapped = new Set(answers.map((a) => a.contentId));
  contentIds = contentIds.filter((contentId) => !mapped.has(contentId));

  // get answers which doesn't have a contentId and update it
  const expandedContents = await GetContentsFromDB(contentIds, db);
  const fieldsMap = expandedContents
    ?.map((c) => {
      const key = fields[c.type as keyof typeof fields];
      const value = c.content?.id;
      if (!key || value === undefined) return null; // skip invalid entries
      return { [key]: value };
    })
    .filter((item) => item !== null);

  answers.push(
    ...(await GetAnswersFromDBByField(fieldsMap ? fieldsMap : [], db))
  );

  await client.close();

  // TODO if fieldmap
  const questionsMap = new Map<number, Document[]>();

  for (const answer of answers) {
    if (!questionsMap.has(answer.contentId)) {
      questionsMap.set(answer.contentId, []);
    }
    questionsMap.get(answer.contentId)!.push(answer);
  }

  const questions = Array.from(questionsMap.values());

  for (const answers of questions) {
    const numberOfQuestions = answers.length;

    if (numberOfQuestions > 0) {
      // run trough every answer to question and answer it on server
      for (const index in answers) {
        const answer = answers[index];
        let id;

        // TODO: check
        id = answer.contentId;
        if (!id) {
          id = expandedContents.find((c) => c.content.id)?.id;
          if (!id) continue;
        }

        await RecordLog(id, "Started", accessToken);

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

  return new Response(JSON.stringify(await GetUserPoints(accessToken)), {
    headers: { "Content-Type": "application/json" },
  });
}
