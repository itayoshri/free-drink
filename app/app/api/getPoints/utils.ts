import { DBAnswer } from "@/interfaces/db";

export function groupAnswers(answers: DBAnswer[]) {
  const questionsMap = new Map<number, DBAnswer[]>();

  for (const answer of answers) {
    if (!questionsMap.has(answer.contentId)) {
      questionsMap.set(answer.contentId, []);
    }
    questionsMap.get(answer.contentId)!.push(answer);
  }

  return Array.from(questionsMap.values());
}
