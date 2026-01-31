import { BoolString } from "../api/requests";
import { ContentType, ResExpendedContent } from "../api/res";

export interface DBContent {
  contentId: number;
  type: ContentType;
  content: ResExpendedContent["body"]["content"];
}

export interface DBAnswer {
  contentId: number;
  isLastQuestion: BoolString;
  questionnaireId: number;
  questionsId: number;
  timeLimited: boolean;
  hotSpotQuestionnaireId?: number;
}
