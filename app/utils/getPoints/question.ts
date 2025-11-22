import { Answer, ContentType, ResAnswer } from "@/interfaces/api/res";
import { fetchDataSource } from "../datasource";
import { generateSignedHash } from "../questionnaire/answer";

export class Question {
  questionId: number;
  questionnaireId: number;
  type: ContentType;
  answers: Answer[];
  answerId: number;

  constructor(
    questionId: number,
    questionnaireId: number,
    type: ContentType,
    answers: Answer[],
    answerId?: number
  ) {
    this.questionId = questionId;
    this.questionnaireId = questionnaireId;
    this.type = type;
    this.answers = answers;
    this.answerId = answerId || -1;
  }

  private generateAnswerObject({
    type,
    answerId,
    questionnaireId,
    questionId,
    isLastQuestion,
    signedHash,
  }: {
    type: ContentType;
    answerId: number;
    questionnaireId: number;
    questionId: number;
    isLastQuestion: boolean;
    signedHash?: string;
  }) {
    if (!signedHash)
      signedHash = generateSignedHash(questionId, questionnaireId);

    let answer = {};
    switch (type) {
      case "KnowledgeQuestionnaire":
        answer = {
          questionnaireId,
          questionId,
          answers: [{ id: answerId }],
        };

      case "Hotspots":
        answer = {
          hptSpotId: questionId,
          hotSpotQuestionnaireId: questionnaireId,
          correctAnswers: answerId,
        };

      default:
        break;
    }

    return { ...answer, signedHash, isLastQuestion };
  }

  submitAnswer(isLastQuestion: boolean, answerId?: number) {
    return fetchDataSource<ResAnswer>({
      method: "POST",
      namespace: "questionnaire",
      action: "answer",
      data: this.generateAnswerObject({
        type: this.type,
        questionnaireId: this.questionnaireId,
        questionId: this.questionId,
        answerId: answerId || this.answerId,
        isLastQuestion,
      }),
    });
  }

  async getRightAnswerId() {
    const randomIndex = Math.floor(Math.random() * this.answers.length);
    const res = await this.submitAnswer(false, this.answers[randomIndex].id);
    return res.body.rightAnswerIds[0];
  }
}
