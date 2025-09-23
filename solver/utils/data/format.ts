import { question, answer } from "../../../app/interfaces/api/res";
import {
  FormattedAnswer,
  FormattedQuestion,
  FormattedQuestionnaire,
} from "../../interfaces/data";
import { DBContent } from "../../../app/interfaces/db/";

export function GetFormattedAnswers(answers: answer[]): FormattedAnswer[] {
  return answers.map((answer) => ({
    id: answer.id,
    answer: answer.answer,
  }));
}

export function GetFormattedQuestion(question: question): FormattedQuestion {
  return {
    id: question.id,
    question: question.question,
    answers: GetFormattedAnswers(question.answers),
  };
}

export default function GetFormattedQuestionnaire(
  content: DBContent
): FormattedQuestionnaire {
  return {
    id: content.content.id,
    type: content.type,
    contentId: content.contentId,
    questions: content.content.questions.map((question) =>
      GetFormattedQuestion(question)
    ),
  };
}
