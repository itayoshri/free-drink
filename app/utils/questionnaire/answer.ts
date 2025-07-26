import { BoolString, ReqQuestionData } from "@/interfaces/api/requests";
import { fetchDataSource } from "../datasource";

export default function AnswerQuestion(
  questionnaireId: number,
  questionId: number,
  answerId: number,
  isLastQuestion: BoolString,
  token: string
) {
  return fetchDataSource({
    method: "POST",
    namespace: "questionnaire",
    action: "answer",
    token,
    data: {
      questionId,
      answers: [{ id: answerId }],
      questionnaireId,
      isLastQuestion,
    } as ReqQuestionData,
  });
}
