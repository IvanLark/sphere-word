import {Position} from "../../api/types/word-data.types.ts";

export interface ArticleLocationState {
  articleId: string;
  positions?: Array<Position>;
}