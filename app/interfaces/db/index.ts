import { BoolString } from "../api/requests";
import { ResExpendedContent } from "../api/res";

export interface DBContent {
  contentId: number;
  type: string; // TODO: type
  content: ResExpendedContent["body"]["content"];
}

export interface DBAnswer {
  contentId: number;
  isLastQuestion: BoolString;
  questionnaireId?: number;
  hotSpotQuestionnaireId?: number;
  answers?: Answer[];
}

type Answer = {
  id: number;
};
