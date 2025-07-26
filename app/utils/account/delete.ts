import { fetchDataSource } from "../datasource";

export default function deleteUser(token: string) {
  return fetchDataSource({
    method: "DELETE",
    namespace: "account",
    action: "deleteUser",
    token,
  });
}
