import { GetContentsFromDB } from "@/utils/db/answer";
import { Db, Document } from "mongodb";

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
