export interface Article {
  articleId: string;
  topic: string;
  title: string;
  subtitle: string;
  banner: string;
  difficultyScore: number;
  text: Array<Array<string>>;
}