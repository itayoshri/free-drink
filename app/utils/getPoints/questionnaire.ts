import { Answer, ContentType } from "@/interfaces/api/res";
import { Question } from "./question";

export type QuestionObj = {
  questionnaireId: number;
  questionId: number;
  contentId: number;
  answers: Answer[];
};

export class Questionnaire {
  contentId: number;
  questionnaireId: number;
  questions: Question[];
  type: ContentType;

  constructor(
    contentId: number,
    questionnaireId: number,
    questions: QuestionObj[],
    type: ContentType
  ) {
    this.contentId = contentId;
    this.questionnaireId = questionnaireId;
    this.type = type;
    this.questions = questions.map(
      (question) =>
        new Question(
          question.questionId,
          question.questionnaireId,
          this.type,
          question.answers
        )
    );
  }

  getAnsweredQuestionsArr(accessToken: string) {
    return Promise.all(
      this.questions.map((question) =>
        question.getObjWithAnswerId(accessToken).then((obj) => ({
          ...obj,
          contentId: this.contentId,
        }))
      )
    );
  }
}
