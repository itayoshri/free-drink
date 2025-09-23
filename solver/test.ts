import GetDB from "../app/utils/db";
import { GetContentsFromDB } from "../app/utils/db/answer";
import RunDataOnModel from "./utils/data";
import dotenv from "dotenv";
dotenv.config();

export default async function Test() {
  const { db, client } = GetDB();
  const content = (await GetContentsFromDB([6820], db))[0];
  client.close();

  RunDataOnModel(content);
}

Test();
