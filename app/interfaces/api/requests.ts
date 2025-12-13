export type BoolString = "true" | "false";

interface Answer {
  id: number;
}

export interface ReqQuestionData {
  questionId: number;
  signedHash?: string;
  answers: Answer[];
  questionnaireId: number;
  isLastQuestion: BoolString; // "false" or "true" as string
}

export interface ReqVerifyUser {
  appleIdentityToken: string | null;
  verificationCode: string;
  mobilePhone: string;
  fbAccessToken: string | null;
}

export interface ReqRegisterUser {
  appleIdentityToken: string | null;
  lastName: string;
  firstName: string;
  birthDate: string; // ISO string format: "YYYY-MM-DDTHH:mm:ss.sss"
  agreeTerms: BoolString; // "true" or "false" as string
  verifyToken: string;
  agreeCbcNewsletter: BoolString; // "true" or "false"
  friendSourceId: string | null;
  mobilePhone: string;
  fbAccessToken: string | null;
  clientConfirmation: BoolString; // "true" or "false"
  agreeNewsletter: BoolString; // "true" or "false"
  email: string;
  segment: string;
}

export interface ReqRecordLog {
  contentId: number;
  type: string;
}

export interface ReqPurchaseNayaxCardGift {
  credits: number; //1
  uniqueId: string;
  paymentType: "Corks";
}
