import { OptionalId } from "mongodb";
import GetDB from ".";

export async function AddAnswer(answer: unknown) {
  const { db, client } = GetDB();
  await db.collection("questions").insertOne(answer as OptionalId<Document>);
  client.close();
}

export async function GetAnswers(field: string, id: number) {
  const { db, client } = GetDB();
  const questions = db.collection("questions");
  const answers = await questions.find({ [field]: id }).toArray();

  await client.close();
  return answers;
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
