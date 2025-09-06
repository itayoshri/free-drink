import { GetContentsFromDB } from "@/utils/db/answer";
import { Db, Document } from "mongodb";

/**
 * filter out already mapped answers and return the expandedContent of the rest from DB
 *
 * @param answers - array of already mapped answers
 * @param contentIds - array of contentIds
 * @param db - MongoDB
 * @returns expanded contents
 */
export default async function GetContents(
  answers: Document[],
  contentIds: number[],
  db: Db
) {
  const mapped = new Set(answers.map((a) => a.contentId));
  const filteredContentIds = contentIds.filter(
    (contentId) => !mapped.has(contentId)
  );
  return await GetContentsFromDB(filteredContentIds, db);
}
