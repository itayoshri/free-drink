import { ResExpendedContent } from "@/interfaces/api/res";
import { fetchDataSource } from "../datasource";
import { GetContentById } from "../db/content";
import { Db } from "mongodb";

export function GetQuestionnaireFromServer(
  id: number,
  type: string,
  token: string
) {
  return fetchDataSource<ResExpendedContent>({
    method: "GET",
    namespace: "content",
    action: "expandedContent",
    query: `id=${id}&type=${type}`,
    token,
  });
}

export default async function GetQuestionnaire(
  id: number,
  type: string,
  token: string,
  db: Db
) {
  const res = await GetContentById(id, db);
  if (res) {
    console.log("updated in DB", id);

    return res;
  } else {
    console.log("heavy request", id, type);
    return (await GetQuestionnaireFromServer(id, type, token)).body?.content;
  }
}
