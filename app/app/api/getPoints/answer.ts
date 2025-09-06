import { BoolString } from "@/interfaces/api/requests";
import { DBAnswer, DBContent } from "@/interfaces/db";
import RecordLog from "@/utils/content/recordLog";
import { GetAnswersFromDBByField } from "@/utils/db/answer";
import AnswerQuestion from "@/utils/questionnaire/answer";
import { Db, Document, WithId } from "mongodb";

export const fields = {
  KnowledgeQuestionnaire: "questionnaireId",
  Hotspots: "hotSpotQuestionnaireId",
};

/**
 * run trough all questions and answer every single one of them
 *
 * @param questions - two dimensional array of answers grouped by their contentId
 * @param expandedContents - expanded content used to get the id of answers without one
 * @param accessToken - string that is used to verify and authorize against coca-cola's api
 */
export async function AnswerQuestions(
  questions: Document[][],
  expandedContents: DBContent[],
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

/**
 * answer single question using coca-cola's api
 *
 * @param answer - data of answer formated for coca-cola's api
 * @param numberOfQuestions - the number of questions that the answer is part of
 * @param index - index of current question in the questions set
 * @param expandedContents - expanded content used to get the id of answers without one
 * @param accessToken - string that is used to verify and authorize against coca-cola's api
 */
export async function AnswerSingleQuestion(
  answer: Document,
  numberOfQuestions: number,
  index: number,
  expandedContents: DBContent[],
  accessToken: string
) {
  let id;

  // TODO: REFACTOR
  id = answer.contentId;
  if (!id) {
    id = expandedContents.find((c) => c.contentId);
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

/**
 * taking array of answers for various questions and group them by contentId
 *
 * @param answers - answers pool
 * @returns two dimensional array of answers grouped by their contentId
 */
export function GroupAnswers(answers: DBAnswer[]) {
  const questionsMap = new Map<number, DBAnswer[]>();

  for (const answer of answers) {
    if (!questionsMap.has(answer.contentId)) {
      questionsMap.set(answer.contentId, []);
    }
    questionsMap.get(answer.contentId)!.push(answer);
  }

  return Array.from(questionsMap.values());
}

/**
 * filter out useless data and return answers from DB using field map
 *
 * @param expandedContents - unfiltered array of content from DB
 * @param db - MongoDB
 * @returns answers from DB !!with no contentId!!
 */
export async function GetAnswersByField(expandedContents: DBContent[], db: Db) {
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
