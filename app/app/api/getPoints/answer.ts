import { BoolString } from "@/interfaces/api/requests";
import { DBAnswer, DBContent } from "@/interfaces/db";
import {
  UpdateAnswersWithContentId,
  GetAnswersFromDBByField,
} from "@/utils/db/answer";
import AnswerQuestion from "@/utils/questionnaire/answer";
import { Db, WithId } from "mongodb";
import GetContents from "./contents";

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
  questions: DBAnswer[][],
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
  answer: DBAnswer,
  numberOfQuestions: number,
  index: number,
  accessToken: string
) {
  const isLastQuestion = numberOfQuestions == index + 1;

  await AnswerQuestion(
    answer,
    String(isLastQuestion) as BoolString,
    accessToken
  );
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
 * @param answers - already mapped answers
 * @param contentIds - array of content ids
 * @param db - MongoDB
 * @returns answers from DB
 */
export async function GetAnswersByField(
  answers: DBAnswer[],
  contentIds: number[],
  db: Db
) {
  const expandedContents = await GetContents(answers, contentIds, db);
  const fieldsMap = GetFieldsMap(expandedContents);

  const unlabeledAnswers = await GetAnswersFromDBByField(
    fieldsMap ? fieldsMap : [],
    db
  );
  const labeledAnswers = [] as WithId<DBAnswer>[];
  unlabeledAnswers.map((answer) =>
    labeledAnswers.push({
      ...answer,
      contentId: GetAnswerContentId(answer, expandedContents),
    })
  );

  await UpdateAnswersWithContentId(labeledAnswers, db);

  return labeledAnswers;
}

function GetFieldsMap(expandedContents: WithId<DBContent>[]) {
  return expandedContents
    ?.map((c) => {
      const key = fields[c.type as keyof typeof fields];
      const value = c.content?.id;
      if (!key || value === undefined) return null; // skip invalid entries
      return { [key]: value };
    })
    .filter((item) => item !== null);
}

function GetAnswerContentId(
  answer: WithId<DBAnswer>,
  expandedContents: WithId<DBContent>[]
) {
  let id: number;
  if (answer.questionnaireId) id = answer.questionnaireId;
  else if (answer.hotSpotQuestionnaireId) id = answer.hotSpotQuestionnaireId;

  return expandedContents.find((c) => c.content?.id == id)?.contentId as number;
}
