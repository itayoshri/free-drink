import { ReqQuestionData } from "../api/requests";
import { ResExpendedContent } from "../api/res";

export interface DBContent {
  contentId: number;
  type: string; // TODO: type
  content: ResExpendedContent["body"]["content"];
}

export interface DBAnswer {
  contentId?: number;
}
