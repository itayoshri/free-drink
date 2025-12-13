import { ResGetProducts } from "@/interfaces/api/res";
import { fetchDataSource } from "../datasource";

export default function getProducts() {
  return fetchDataSource<ResGetProducts>({
    method: "GET",
    namespace: "myPrezi",
    action: "nayaxMetadata",
  });
}
