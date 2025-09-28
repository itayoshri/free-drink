import { FormattedQuestionnaire, ModelSchema } from "@/interfaces/data";
import GenerateSignedHash from "./signedHash";
import { DBAnswer } from "../../../app/interfaces/db";

export default function formatAnswerRequest(
  modelAnswer: string,
  data: FormattedQuestionnaire
) {
  // TODO: turn into seperate function
  const firstBrace = modelAnswer.indexOf("{");
  const lastBrace = modelAnswer.lastIndexOf("}");
  let jsonString = modelAnswer.slice(firstBrace, lastBrace + 1);
  jsonString = jsonString.replace(/[“”„]/g, '"'); // double quotes
  jsonString = jsonString.replace(/[‘’‚‛]/g, "'"); // single quotes
  jsonString = jsonString.replace(/[\u0000-\u001F\u007F]/g, "");

  const JsonModelAnswer = JSON.parse(jsonString).result as ModelSchema;
  console.log(JsonModelAnswer);
  const signedHash = GenerateSignedHash(JsonModelAnswer.questionId, data.id);
  return {
    questionId: JsonModelAnswer.questionId,
    contentId: data.contentId,
    signedHash: signedHash,
    questionnaireId: data.id,
    isLastQuestion: "false",
    answers: [{ id: JsonModelAnswer.answerId }],
  } as DBAnswer;
}
