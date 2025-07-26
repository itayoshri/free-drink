type userInfo = {
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
export interface ResVerifyUser {
  custom: string;
  errorCode: string;
  body: {
    userInfo: userInfo;
    verifiedMobilePhone: string;
    verificationToken: string;
  };
}

export interface ResRegiser {
  body: {
    userInfo: userInfo;
  };
}
