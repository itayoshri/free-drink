import { content } from "@/interfaces/api/res";
import { DBAnswer } from "@/interfaces/db";
import { QuestionObj } from "@/utils/getPoints/questionnaire";

export function groupByContentId<T extends DBAnswer | QuestionObj>(
  answers: T[]
) {
  const questionsMap = new Map<number, T[]>();

  for (const answer of answers) {
    if (!questionsMap.has(answer.contentId)) {
      questionsMap.set(answer.contentId, []);
    }
    questionsMap.get(answer.contentId)!.push(answer);
  }

  return Array.from(questionsMap.values());
}

export function getContentIds(contents: content[]) {
  return contents.map((c) => c.id);
}
