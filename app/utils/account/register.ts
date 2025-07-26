import { ReqRegisterUser } from "@/interfaces/api/requests";
import { fetchDataSource } from "../datasource";
import { ResRegiser } from "@/interfaces/api/res";

const DOMAIN = "gmail.com";
const DEFAULT_FIRST_NAME = "דוד";
const DEFAULT_LAST_NAME = "סמית'";
const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";
const BIRTH_DATE = "1999-06-21T00:00:00.000";

export default function register(
  verificationToken: string,
  mobilePhone: string
) {
  return fetchDataSource<ResRegiser>({
    method: "POST",
    namespace: "account",
    action: "register",
    data: {
      appleIdentityToken: null,
      lastName: DEFAULT_LAST_NAME,
      firstName: DEFAULT_FIRST_NAME,
      birthDate: BIRTH_DATE,
      agreeTerms: "true",
      verifyToken: verificationToken,
      agreeCbcNewsletter: "false",
      friendSourceId: null,
      mobilePhone: mobilePhone,
      fbAccessToken: null,
      clientConfirmation: "true",
      agreeNewsletter: "false",
      email: generateRandomEmail(),
      segment: "Soldier",
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
