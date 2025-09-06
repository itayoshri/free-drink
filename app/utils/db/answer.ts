import { Db, OptionalId } from "mongodb";
import GetDB from ".";

export async function AddAnswer(answer: unknown) {
  const { db, client } = GetDB();
  await db.collection("questions").insertOne(answer as OptionalId<Document>);
  client.close();
}

export async function GetContentsFromDB(contentIds: number[], db: Db) {
  const contents = db.collection("contents");
  return await contents.find({ contentId: { $in: contentIds } }).toArray();
}

export async function GetAnswersFromDB(contentIds: number[], db: Db) {
  const questions = db.collection("questions");
  return await questions.find({ contentId: { $in: contentIds } }).toArray();
}

export async function GetAnswersFromDBByField(
  fieldsMap: {
    [x: string]: number;
  }[],
  db: Db
) {
  const questions = db.collection("questions");
  return await questions.find({ $or: fieldsMap }).toArray();
}
