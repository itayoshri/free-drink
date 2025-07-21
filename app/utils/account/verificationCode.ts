import { ReqVerifyUser } from "@/interfaces/api/requests";
import { fetchDataSource } from "../datasource";

export default function sendVerificationCode(mobilePhone: string) {
  fetchDataSource({
    method: "GET",
    namespace: "account",
    action: "generateVerificationCode",
    query: `mobilePhone=${mobilePhone}`,
  });
}

export function verifyUser(verificationCode: string, mobilePhone: string) {
  fetchDataSource({
    method: "POST",
    namespace: "account",
    action: "verifyUser",
    data: { verificationCode, mobilePhone } as ReqVerifyUser,
  });
}
