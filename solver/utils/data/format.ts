import { question, answer } from "../../../app/interfaces/api/res";
import { FormattedAnswer, FormattedQuestion } from "../../interfaces/data";

export function GetFormattedAnswers(answers: answer[]): FormattedAnswer[] {
  return answers.map((answer) => ({
    id: answer.id,
    answer: answer.answer,
  }));
}

export default function GetFormattedQuestion(
  question: question
): FormattedQuestion {
  return {
    id: question.id,
    question: question.question,
    answers: GetFormattedAnswers(question.answers),
  };
}
