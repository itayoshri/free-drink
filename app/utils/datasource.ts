import axios, { Method } from "axios";

const BASE_URL = "cocacola-app.co.il/api";

type apiNamespace = "account" | "locations";
type apiAction = "getUserInfo" | "register" | "getBranchesByLocation";

export interface IFetchDataParams {
  method: Method;
  namespace: apiNamespace;
  action: apiAction;
  query?: string;
  data?: unknown;
  token?: string;
}

export function buildFetchUrl(
  namespace: apiNamespace,
  action: apiAction,
  query: string
) {
  return `/${namespace}/${action}${query ? query : ""}`;
}

export async function fetchDataSource<T>({
  method,
  namespace,
  action,
  query = "",
  data,
  token,
}: IFetchDataParams) {
  const res = await axios<T>({
    method: method,
    baseURL: BASE_URL,
    url: `${namespace}/${action}${query ? query : ""}`,
    data,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

//url, data, { auth: }
