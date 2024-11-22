import {PositionItem} from "./word-data.types.ts";

export interface Article {
  articleId?: string;
  topic?: string;
  title?: string;
  subtitle?: string;
  banner?: string;
  difficultyScore?: number;
  wordCount?: number;
  translations?: Array<string>;
  highLightWords?: Array<string>;
  text: Array<Array<Array<string>>>; // 层次分别为：段落 --> 句子 --> 单词
}

export interface ArticleFace {
  articleId: string;
  topic: string;
  title: string;
  subtitle: string;
  banner: string;
  difficultyScore: number;
  wordCount: number;
  positions?: Array<PositionItem>;
}