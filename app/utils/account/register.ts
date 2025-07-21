import { ReqRegisterUser } from "@/interfaces/api/requests";
import { fetchDataSource } from "../datasource";

const DOMAIN = "gmail.com";
const DEFAULT_FIRST_NAME = "itay";
const DEFAULT_LAST_NAME = "oshri";
const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";
const BIRTH_DATE = "1999-06-21T00:00:00.000";

export default function register(verifyToken: string, mobilePhone: string) {
  return fetchDataSource({
    method: "POST",
    namespace: "account",
    action: "register",
    data: {
      lastName: DEFAULT_FIRST_NAME,
      firstName: DEFAULT_LAST_NAME,
      birthDate: BIRTH_DATE,
      agreeTerms: "true",
      verifyToken: verifyToken,
      agreeCbcNewsletter: "false",
      friendSourceId: null,
      mobilePhone: mobilePhone,
      fbAccessToken: null,
      clientConfirmation: "true",
      agreeNewsletter: "false",
      email: generateRandomEmail(),
      segment: "string",
    } as ReqRegisterUser,
  });
}

const generateRandomEmail = (length: number = 8) => {
  let username = "";
  for (let i = 0; i < length; i++) {
    username += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return `${username}@${DOMAIN}`;
};
