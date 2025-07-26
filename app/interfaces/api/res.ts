export interface ResVerifyUser {
  custom: string;
  errorCode: string;
  body: {
    userInfo: {
      accessToken: string;
      id: number;
      name: string;
      age: number;
      birthday: string;
      dateCreated: string;
      emailAddress: string;
      gender: string;
      segment: string;
      corks: number;
      angels: number;
      subscriberKey: string;
      image: null;
      mobilePhone: string;
      role: string;
      classificationId: number;
      avatarId: number;
    };
    verifiedMobilePhone: string;
    verificationToken: string;
  };
}
