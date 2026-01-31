import { Answer, ContentType, question } from "@/interfaces/api/res";
import { Question } from "./question";
import { DBAnswer } from "@/interfaces/db";
import RecordLog from "../content/recordLog";
import { GetQuestionnaireFromServer } from "../content/expandedContent";

export type QuestionObj = {
  questionnaireId: number;
  questionId: number;
  contentId: number;
  answers: Answer[];
  timeInSeconds: number;
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
    type: ContentType,
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
            question.answers,
            question.timeInSeconds,
          ),
      );
  }

  static async submitAnsweredQuestions(
    questions: DBAnswer[],
    accessToken: string,
  ): Promise<void> {
    for (let index = 0; index < questions.length; index++) {
      const isLastQuestion = index + 1 === questions.length;
      const { timeLimited, ...question } = questions[index];
      if (timeLimited && index == 0) {
        await RecordLog(question.contentId, "Started", accessToken);
        await GetQuestionnaireFromServer(
          question.contentId,
          "KnowledgeQuestionnaire",
          accessToken,
        );
      }
      await Question.submitAnswer(question, isLastQuestion, accessToken);
      if (timeLimited && isLastQuestion)
        await RecordLog(question.contentId, "Finished", accessToken);
    }
  }

  static isGeneric(questions: question[]) {
    const q = questions[0];
    return !(
      q.wordsCompletionGame ||
      q.couplesGame ||
      q.freeScreen ||
      q.isSliderTemplate
    );
  }

  getAnsweredQuestionsArr(accessToken: string) {
    return Promise.all(
      this.questions.map(
        async (question) =>
          await question.getObjWithAnswerId(accessToken).then((obj) => ({
            ...obj,
            contentId: this.contentId,
          })),
      ),
    );
  }
}
