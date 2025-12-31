import axios, { Method } from "axios";

const BASE_URL = "https://cocacola-app.co.il/api";
const NAYAX_BASE_URL = "https://payapi.nayax.com/v1";

type Api = "coca" | "nayax";
const api_map: Record<Api, string> = {
  coca: BASE_URL,
  nayax: NAYAX_BASE_URL,
};
export type apiNamespace =
  | "account"
  | "locations"
  | "content"
  | "questionnaire"
  | "hotspot"
  | "homePage"
  | "myPrezi"
  | "machines"
  | "orders";
export type apiAction =
  | "getUserInfo"
  | "register"
  | "getBranchesByLocation"
  | "deleteUser"
  | "generateVerificationCode"
  | "verifyUser"
  | "expandedContent"
  | "answer"
  | "recordLog"
  | "Answer"
  | "getUserPoints"
  | "nayaxMetadata"
  | "purchaseNayaxCardGift"
  | "orders"
  | "challenge"
  | "verify";

export interface IFetchDataParams {
  method: Method;
  namespace: apiNamespace;
  action?: apiAction;
  query?: string;
  data?: unknown;
  token?: string;
  type?: Api;
  slug?: string;
}

export async function fetchDataSource<T>({
  method,
  namespace,
  action,
  query = "",
  data,
  token = "",
  type = "coca",
  slug,
}: IFetchDataParams) {
  const res = await axios<T>({
    method: method,
    baseURL: api_map[type],
    url: `${namespace}${slug ? `/${slug}` : ""}${action ? `/${action}` : ""}${
      query ? `?${query}` : ""
    }`,
    data: data,
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
  return res.data as T;
}

//url, data, { auth: }
