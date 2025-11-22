export type ContentType =
  | "KnowledgeQuestionnaire"
  | "PersonalityQuestionnaire"
  | "Hotspots"
  | "Campaigns";

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

export interface ResExpendedContent {
  errorCode: number;
  body: {
    contentId: number;
    type: string;
    content: {
      id: number;
      contentId: number;
      name: string;
      title: string;
      questions: question[];
      numberOfAnswersToSuccess: number;
    };
    answerContent: null;
  };
}

export interface ResHomePage {
  errorCode: number;
  body: {
    contents: content[];
  };
}

export interface ResGetUserPoints {
  body: {
    userId: number;
    corks: number;
    angels: number;
    message: string | null;
  };
}

export interface ResAnswer {
  body: {
    succeed: boolean;
    rightAnswerIds: number[];
  };
}

export type content = {
  id: number;
  targetType: string;
  formatType: ContentType;
  rewardingCaps: number;
};

export type Answer = {
  id: number;
  questionId: number;
  answer: string;
  image: {
    imageUrl: string;
  };
  order: number;
};

type question = {
  id: number;
  questionnaireId: number;
  questionLayoutId: number;
  order: number;
  question: string;
  image: {
    imageUrl: string;
  };
  youtubeUrl: string;
  isVerticalVideo: boolean;
  correctAnswerFeedback: string;
  incorrectAnswerFeedback: string;
  mustAnswerOn: number;
  amountOfAnswersGroups: number;
  answers: Answer[];
};
