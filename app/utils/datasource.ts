import axios, { Method } from "axios";

const BASE_URL = "https://cocacola-app.co.il/api";

type apiNamespace = "account" | "locations" | "content" | "questionnaire";
type apiAction =
  | "getUserInfo"
  | "register"
  | "getBranchesByLocation"
  | "deleteUser"
  | "generateVerificationCode"
  | "verifyUser"
  | "expandedContent"
  | "answer"
  | "recordLog";

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
  token = "",
}: IFetchDataParams) {
  const res = await axios<T>({
    method: method,
    baseURL: BASE_URL,
    url: `${namespace}/${action}${query ? `?${query}` : ""}`,
    data: data,
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
  return res.data as T;
}

//url, data, { auth: }
