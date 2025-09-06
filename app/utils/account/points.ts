import { ResGetUserPoints } from "@/interfaces/api/res";
import { fetchDataSource } from "../datasource";

export default function GetUserPoints(token: string) {
  return fetchDataSource<ResGetUserPoints>({
    method: "GET",
    namespace: "account",
    action: "getUserPoints",
    token,
  });
}
