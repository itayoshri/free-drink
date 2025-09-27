import { FormattedQuestionnaire, ModelSchema } from "@/interfaces/data";
import GenerateSignedHash from "./signedHash";
import { DBAnswer } from "../../../app/interfaces/db";

export default function formatAnswerRequest(
  modelAnswer: string,
  data: FormattedQuestionnaire
) {
  const firstBrace = modelAnswer.indexOf("{");
  const lastBrace = modelAnswer.lastIndexOf("}");
  const jsonString = modelAnswer.slice(firstBrace, lastBrace + 1);
  const JsonModelAnswer = JSON.parse(jsonString).result as ModelSchema;
  const signedHash = GenerateSignedHash(JsonModelAnswer.questionId, data.id);
  return {
    questionId: JsonModelAnswer.questionId,
    contentId: data.contentId,
    signedHash: signedHash,
    questionnaireId: data.id,
    isLastQuestion: "false",
  } as DBAnswer;
}
