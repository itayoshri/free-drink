import { ResGetProducts } from "@/interfaces/api/res";
import { fetchDataSource } from "../datasource";

export default function getProducts(accessToken: string) {
  return fetchDataSource<ResGetProducts>({
    method: "GET",
    namespace: "myPrezi",
    action: "nayaxMetadata",
    token: accessToken,
  });
}
