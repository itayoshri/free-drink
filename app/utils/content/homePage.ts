import { ResHomePage } from "@/interfaces/api/res";
import { fetchDataSource } from "../datasource";

export default function GetHomePage() {
  return fetchDataSource<ResHomePage>({
    method: "GET",
    namespace: "homePage",
  });
}
