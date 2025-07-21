import axios from "axios";

const BASE_URL = "cocacola-app.co.il/api";

type apiNamespace = "account" | "locations";
type apiAction = "getUserInfo" | "register" | "getBranchesByLocation";

export interface IFetchDataParams {
  namespace: apiNamespace;
  action: apiAction;
  query: string;
  data: unknown;
}

export function buildFetchUrl(
  namespace: apiNamespace,
  action: apiAction,
  query: string
) {
  return `https://${BASE_URL}/${namespace}/${action}${query ? query : ""}`;
}

export async function fetchDataSource<T>({
  namespace,
  action,
  query,
  data,
}: IFetchDataParams) {
  const url = buildFetchUrl(namespace, action, query);
  const res = await axios.post<T>(url, data);
  return res.data;
}
