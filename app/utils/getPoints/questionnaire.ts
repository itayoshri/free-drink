import { DBAnswer, DBContent } from "@/interfaces/db";
import { Question } from "./question";

class Questionnaire {
  contentId: number;
  questionnaireId: number;
  questions: Question[];

  constructor(
    contentId: number,
    questionnaireId: number,
    questions: DBAnswer | DBContent
  ) {
    (this.contentId = contentId), (this.questionnaireId = questionnaireId);
  }
}
