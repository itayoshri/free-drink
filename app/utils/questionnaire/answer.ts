import { BoolString, ReqQuestionData } from "@/interfaces/api/requests";
import { apiAction, apiNamespace, fetchDataSource } from "../datasource";
import crypto from "crypto";

const SECRET = process.env.SECRET;

export default function AnswerQuestion(
  reqRoute: [apiNamespace, apiAction],
  data: object,
  isLastQuestion: BoolString,
  token: string
) {
  return fetchDataSource({
    method: "POST",
    namespace: reqRoute[0],
    action: reqRoute[1],
    token,
    data: {
      ...data,
      isLastQuestion,
    } as ReqQuestionData,
  });
}

export function generateSignedHash(
  questionId: number,
  questionnaireId: number
) {
  // TODO: support Hotspot
  const SECRET = process.env.SECRET;
  const input = `${questionId}|${questionnaireId}|${SECRET}`;
  return crypto.createHash("md5").update(input).digest("hex");
}
