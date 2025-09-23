type Image = {
  imageUrl: string;
};

export interface FormattedAnswer {
  id: number;
  answer: string;
  image?: Image;
}
export interface FormattedQuestion {
  id: number;
  question: string;
  answers: FormattedAnswer[];
}

export interface FormattedQuestionnaire {
  contentId: number;
  id: number;
  type: string;
  questions: FormattedQuestion[];
}

export interface ModelSchema {
  questionId: number;
  answerId: number;
}
