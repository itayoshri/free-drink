import { Db, OptionalId } from "mongodb";
import GetDB from ".";

export async function AddAnswer(answer: unknown) {
  const { db, client } = GetDB();
  await db.collection("questions").insertOne(answer as OptionalId<Document>);
  client.close();
}

export async function GetAnswers(field: string, id: number, db: Db) {
  const questions = db.collection("questions");
  const answers = await questions.find({ [field]: id }).toArray();

  if (field == "contentId" && answers.length == 0) {
    throw new Error("No answers with this contentId have been found");
  }

  return answers;
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
