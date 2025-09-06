import { BoolString } from "@/interfaces/api/requests";
import RecordLog from "@/utils/content/recordLog";
import db from "@/utils/db";
import { GetAnswersFromDBByField, GetContentsFromDB } from "@/utils/db/answer";
import AnswerQuestion from "@/utils/questionnaire/answer";
import { Db, Document, WithId } from "mongodb";
import { fields } from "./route";

export async function AnswerQuestions(
  questions: Document[][],
  expandedContents: WithId<Document>[],
  accessToken: string
) {
  for (const answers of questions) {
    const numberOfQuestions = answers.length;

    // run trough every answer of a question and answer it on server
    if (numberOfQuestions > 0) {
      for (const index in answers) {
        await AnswerSingleQuestion(
          answers[index],
          numberOfQuestions,
          Number(index),
          expandedContents,
          accessToken
        );
      }
    }
  }
}

export async function AnswerSingleQuestion(
  answer: Document,
  numberOfQuestions: number,
  index: number,
  expandedContents: WithId<Document>[],
  accessToken: string
) {
  let id;

  // TODO: REFACTOR
  id = answer.contentId;
  if (!id) {
    id = expandedContents.find((c) => c.content.id)?.id;
    if (!id) return;
  }
  const isLastQuestion = numberOfQuestions == index + 1;

  await RecordLog(id, "Started", accessToken);
  await AnswerQuestion(
    answer,
    String(isLastQuestion) as BoolString,
    accessToken
  );
  await RecordLog(id, "Finished", accessToken);
}

export function GroupAnswers(answers: Document[]) {
  const questionsMap = new Map<number, Document[]>();

  for (const answer of answers) {
    if (!questionsMap.has(answer.contentId)) {
      questionsMap.set(answer.contentId, []);
    }
    questionsMap.get(answer.contentId)!.push(answer);
  }

  return Array.from(questionsMap.values());
}

export async function GetAnswersByField(
  expandedContents: WithId<Document>[],
  db: Db
) {
  const fieldsMap = expandedContents
    ?.map((c) => {
      const key = fields[c.type as keyof typeof fields];
      const value = c.content?.id;
      if (!key || value === undefined) return null; // skip invalid entries
      return { [key]: value };
    })
    .filter((item) => item !== null);

  return await GetAnswersFromDBByField(fieldsMap ? fieldsMap : [], db);
}
