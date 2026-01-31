import { Answer, ContentType, ResAnswer } from "@/interfaces/api/res";
import { fetchDataSource } from "../datasource";
import { generateSignedHash } from "../questionnaire/answer";

export class Question {
  questionId: number;
  questionnaireId: number;
  type: ContentType;
  answers: Answer[];
  answerId: number;
  timeInSeconds: number | null;

  constructor(
    questionId: number,
    questionnaireId: number,
    type: ContentType,
    answers: Answer[],
    timeInSeconds: number | null,
    answerId?: number,
  ) {
    this.questionId = questionId;
    this.questionnaireId = questionnaireId;
    this.type = type;
    this.answers = answers;
    this.timeInSeconds = timeInSeconds;
    this.answerId = answerId || -1;
  }

  generateAnswerObject(answerId?: number) {
    const signedHash = generateSignedHash(
      this.questionId,
      this.questionnaireId,
    );

    let answer = {};
    switch (this.type) {
      case "KnowledgeQuestionnaire":
        answer = {
          questionnaireId: this.questionnaireId,
          questionId: this.questionId,
          answers: [{ id: answerId || this.answerId }],
        };
        break;

      case "Hotspots":
        answer = {
          hptSpotId: this.questionId,
          hotSpotQuestionnaireId: this.questionnaireId,
          correctAnswers: this.answerId,
        };
        break;

      default:
        break;
    }

    return { ...answer, signedHash };
  }

  async submitAnswer(
    isLastQuestion: boolean,
    accessToken: string,
    answerId?: number,
  ) {
    return Question.submitAnswer(
      this.generateAnswerObject(answerId),
      isLastQuestion,
      accessToken,
    );
  }

  static async submitAnswer(
    answerObj: object,
    isLastQuestion: boolean,
    accessToken: string,
  ) {
    const res = await fetchDataSource<ResAnswer>({
      method: "POST",
      namespace: "questionnaire",
      action: "answer",
      token: accessToken,
      data: { ...answerObj, isLastQuestion },
    });

    return { answerObj, res };
  }

  async getObjWithAnswerId(accessToken: string) {
    const randomIndex = Math.floor(Math.random() * this.answers.length);

    const { res, answerObj } = await this.submitAnswer(
      false,
      accessToken,
      this.answers[randomIndex].id,
    );

    try {
      const fullAnswerObj = this.generateAnswerObject(
        res.body.rightAnswerIds[0],
      );
      return { ...fullAnswerObj, timeLimited: this.timeInSeconds != null };
    } catch (e) {
      console.log(e, this.questionnaireId, answerObj);
    }
  }
}
