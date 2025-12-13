export interface ReqChallenge {
  phone: string;
  challenge: string;
  retryTimeoutSeconds: number;
}

export interface ResVerifyUser {
  token: {
    token: string;
  };
}

export interface ResPrepaidCards {
  prepaidCards: PrepaidCard[];
}

type PrepaidCard = {
  currency: {
    code: string;
    decimalDigits: number;
  };
  cardId: number;
  cardNumber: string;
  revalue: boolean;
  balance: boolean;
};
