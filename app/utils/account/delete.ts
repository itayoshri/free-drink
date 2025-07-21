import { fetchDataSource } from "../datasource";

export default function deleteUser(token: string) {
  fetchDataSource({
    method: "DELETE",
    namespace: "account",
    action: "deleteUser",
    token,
  });
}
