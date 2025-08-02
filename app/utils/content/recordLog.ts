import { ReqRecordLog } from "@/interfaces/api/requests";
import { fetchDataSource } from "../datasource";

export default function RecordLog(
  contentId: number,
  state: string,
  token: string
) {
  return fetchDataSource({
    method: "POST",
    namespace: "content",
    action: "recordLog",
    token,
    data: {
      contentId,
      type: state,
    } as ReqRecordLog,
  });
}
