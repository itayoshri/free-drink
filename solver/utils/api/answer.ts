import { FormattedQuestionnaire, ModelSchema } from "@/interfaces/data";
import GenerateSignedHash from "./signedHash";
import { DBAnswer } from "../../../app/interfaces/db";

export default function formatAnswerRequest(
  modelAnswer: string,
  data: FormattedQuestionnaire
) {
  const JsonModelAnswer = JSON.parse(modelAnswer) as ModelSchema;
  const signedHash = GenerateSignedHash(JsonModelAnswer.questionId, data.id);
  return {
    questionId: JsonModelAnswer.questionId,
    contentId: data.contentId,
    signedHash: signedHash,
    questionnaireId: data.id,
    isLastQuestion: "false",
  } as DBAnswer;
}
