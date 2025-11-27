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

  static generateAnswerObject({
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
        break;

      case "Hotspots":
        answer = {
          hptSpotId: questionId,
          hotSpotQuestionnaireId: questionnaireId,
          correctAnswers: answerId,
        };
        break;

      default:
        break;
    }

    return { ...answer, signedHash, isLastQuestion };
  }

  async submitAnswer(
    isLastQuestion: boolean,
    accessToken: string,
    answerId?: number
  ) {
    const answerObj = Question.generateAnswerObject({
      type: this.type,
      questionnaireId: this.questionnaireId,
      questionId: this.questionId,
      answerId: answerId || this.answerId,
      isLastQuestion,
    });

    const res = await fetchDataSource<ResAnswer>({
      method: "POST",
      namespace: "questionnaire",
      action: "answer",
      token: accessToken,
      data: answerObj,
    });

    return { answerObj, res };
  }

  async getObjWithAnswer(accessToken: string) {
    const randomIndex = Math.floor(Math.random() * this.answers.length);
    const { res } = await this.submitAnswer(
      false,
      accessToken,
      this.answers[randomIndex].id
    );

    const fullAnswerObj = Question.generateAnswerObject({
      type: this.type,
      questionnaireId: this.questionnaireId,
      questionId: this.questionId,
      answerId: res.body.rightAnswerIds[0],
      isLastQuestion: false,
    });

    return fullAnswerObj;
  }
}
