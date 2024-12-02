import {PositionItem} from "../../api/types/word-data.types.ts";

export interface ArticleLocationState {
  type: 'id' | 'text' | 'link' | 'adapt' | 'translate' | 'book' | 'keep';
  article: string;
  level?: number;
  positions?: Array<PositionItem>;
  bookName?: string;
}