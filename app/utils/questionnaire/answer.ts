import { BoolString, ReqQuestionData } from "@/interfaces/api/requests";
import { fetchDataSource } from "../datasource";
import crypto from "crypto";

const SECRET = process.env.SECRET;

export default function AnswerQuestion(
  data: object,
  isLastQuestion: BoolString,
  token: string
) {
  return fetchDataSource({
    method: "POST",
    namespace: "questionnaire",
    action: "answer",
    token,
    data: {
      ...data,
      isLastQuestion,
    } as ReqQuestionData,
  });
}

function GenerateSignedHash(questionId: number, questionnaireId: number) {
  const toHash = `${questionId}|${questionnaireId}|${SECRET}`;
  return crypto.createHash("md5").update(toHash).digest("hex");
}
