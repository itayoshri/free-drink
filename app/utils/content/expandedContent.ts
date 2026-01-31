import { ContentType, ResExpendedContent } from "@/interfaces/api/res";
import { fetchDataSource } from "../datasource";

export function GetQuestionnaireFromServer(
  id: number,
  type: ContentType,
  token: string,
) {
  return fetchDataSource<ResExpendedContent>({
    method: "GET",
    namespace: "content",
    action: "expandedContent",
    query: `id=${id}&type=${type}`,
    token,
  });
}
