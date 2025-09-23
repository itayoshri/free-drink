import { schema } from ".";
import { DBAnswer } from "../../../app/interfaces/db";

export default function isCorrectAnswer(
  answer: typeof schema,
  DBAnswer: DBAnswer
) {
  if (DBAnswer.answers)
    return Number(answer.answerId) == DBAnswer.answers[0].id;
  return false;
}
