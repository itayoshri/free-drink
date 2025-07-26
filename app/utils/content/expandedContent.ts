import { ResExpendedContent } from "@/interfaces/api/res";
import { fetchDataSource } from "../datasource";

export default function GetQuestionnaire(id: number, token: string) {
  return fetchDataSource<ResExpendedContent>({
    method: "GET",
    namespace: "content",
    action: "expandedContent",
    query: `id=${id}&type=KnowledgeQuestionnaire`,
    token,
  });
}
