import GetDB from "../app/utils/db";
import { GetContentsFromDB } from "../app/utils/db/answer";
import RunDataOnModel from "./utils/data";
import dotenv from "dotenv";
dotenv.config();

export default async function Test() {
  const { db, client } = GetDB();

  const content = (await GetContentsFromDB([6846], db))[0];
  const answers = await RunDataOnModel(content, 99999);
  const collection = db.collection("answers");
  await collection.insertMany(answers);

  client.close();
}

Test();
