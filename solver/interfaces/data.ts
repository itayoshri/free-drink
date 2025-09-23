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
