import { ReqVerifyUser } from "@/interfaces/api/requests";
import { fetchDataSource } from "../datasource";
import { ResVerifyUser } from "@/interfaces/api/res";

export default function sendVerificationCode(mobilePhone: string) {
  return fetchDataSource({
    method: "GET",
    namespace: "account",
    action: "generateVerificationCode",
    query: `mobilePhone=${mobilePhone}`,
  });
}

export function verifyUser(verificationCode: string, mobilePhone: string) {
  return fetchDataSource<ResVerifyUser>({
    method: "POST",
    namespace: "account",
    action: "verifyUser",
    data: {
      appleIdentityToken: null,
      verificationCode,
      mobilePhone,
      fbAccessToken: null,
    } as ReqVerifyUser,
  });
}
