export interface ResVerifyUser {
  custom: string;
  errorCode: string;
  body: {
    userInfo: null;
    verifiedMobilePhone: string;
    verificationToken: string;
  };
}
