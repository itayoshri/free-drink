import { Db, OptionalId, WithId } from "mongodb";
import GetDB from ".";
import { DBAnswer, DBContent } from "@/interfaces/db";

export async function AddAnswer(answer: unknown) {
  const { db, client } = GetDB();
  await db.collection("questions").insertOne(answer as OptionalId<Document>);
  client.close();
}

export async function GetContentsFromDB(contentIds: number[], db: Db) {
  const contents = db.collection<DBContent>("contents");
  return await contents.find({ contentId: { $in: contentIds } }).toArray();
}

/**
 * @param contentIds - an array of contentIds
 * @param db - MongoDB
 * @returns Array of answers from DB
 */
export async function GetAnswersFromDB(contentIds: number[], db: Db) {
  const questions = db.collection<DBAnswer>("answers");
  return await questions.find({ contentId: { $in: contentIds } }).toArray();
}

/**
 * @param fieldsMap - array of a field and value
 * @param db - MongoDB
 * @returns Array of answers from DB
 */
export async function GetAnswersFromDBByField(
  fieldsMap: {
    [x: string]: number;
  }[],
  db: Db
) {
  const questions = db.collection<DBAnswer>("questions");
  return await questions.find({ $or: fieldsMap }).toArray();
}

export async function UpdateAnswersWithContentId(
  answers: WithId<DBAnswer>[],
  db: Db
) {
  const questions = db.collection<DBAnswer>("questions");
  const operations = answers.map((answer) => ({
    updateOne: {
      filter: { _id: answer._id }, // which doc in DB to update
      update: { $set: answer }, // what to update
      upsert: false, // don't insert new if not found
    },
  }));

  await questions.bulkWrite(operations);
}
