import { fetchDataSource } from "../datasource";

export default function GetUserPoints(token: string) {
  return fetchDataSource({
    method: "GET",
    namespace: "account",
    action: "getUserPoints",
    token,
  });
}
