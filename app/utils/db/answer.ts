import { Db, OptionalId } from "mongodb";
import GetDB from ".";

export async function AddAnswer(answer: unknown) {
  const { db, client } = GetDB();
  await db.collection("questions").insertOne(answer as OptionalId<Document>);
  client.close();
}

export async function GetAnswers(
  field: string,
  id: number,
  db: Db,
  contentId?: number
) {
  const questions = db.collection("questions");
  const filter = { [field]: id };

  const answers = await questions.find(filter).toArray();

  // throw error if no answers with the contentId
  if (field == "contentId" && answers.length == 0) {
    throw new Error("No answers with this contentId have been found");
  } else if (field != "contentId" && answers.length != 0) {
    // add contentId to objects that doesn't have
    await questions.updateMany(filter, { $set: { contentId: contentId } });
  }

  return answers;
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

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
