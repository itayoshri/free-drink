import { ResExpendedContent } from "@/interfaces/api/res";
import { fetchDataSource } from "../datasource";

export default function GetQuestionnaire(
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
