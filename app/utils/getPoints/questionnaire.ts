import { Answer, ContentType, question } from "@/interfaces/api/res";
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
    this.questions = questions
      .filter((question) => question.answers.length > 0)
      .map(
        (question) =>
          new Question(
            question.questionId,
            question.questionnaireId,
            this.type,
            question.answers
          )
      );
  }

  static submitAnsweredQuestions(questions: object[], accessToken: string) {
    return Promise.all(
      questions.map(async (question, index) => {
        const isLastQuestion = index + 1 == questions.length;
        await Question.submitAnswer(question, isLastQuestion, accessToken);
      })
    );
  }

  static isGeneric(questions: question[]) {
    const q = questions[0];
    return !(q.wordsCompletionGame || q.couplesGame || q.freeScreen);
  }

  getAnsweredQuestionsArr(accessToken: string) {
    return Promise.all(
      this.questions.map(
        async (question) =>
          await question.getObjWithAnswerId(accessToken).then((obj) => ({
            ...obj,
            contentId: this.contentId,
          }))
      )
    );
  }
}
