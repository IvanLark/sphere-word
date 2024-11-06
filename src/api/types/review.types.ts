export interface ReviewWordData {
  word: string;
  due: number;
  last: number;
  reps: number;
  review: ReviewChoices;
}

export interface ReviewChoices {
  [key: string]: ReviewChoiceData;
  '轻松': ReviewChoiceData;
  '还行': ReviewChoiceData;
  '困难': ReviewChoiceData;
  '忘记': ReviewChoiceData;
}

export interface ReviewChoiceData {
  rating: number;
  due: number;
}


