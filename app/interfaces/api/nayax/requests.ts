export interface ReqVerifyUser {
  phoneNumber: string;
  countryCode: "972";
  verificationCode: string;
  challenge: string;
  retryTimeOutSeconds: number;
  country: "IL";
}

export interface ReqChallenge {
  challenge: string;
  countryCode: "972";
  retry: 0;
  phoneNumber: string;
}

export interface ReqMachineOrder {
  products: [];
  prepaidCardId: string;
}
