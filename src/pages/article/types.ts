import {PositionItem} from "../../api/types/word-data.types.ts";

export interface ArticleLocationState {
  type: 'id' | 'text' | 'link' | 'adapt' | 'translate' | 'book';
  article: string;
  level?: number;
  positions?: Array<PositionItem>;
  keep: boolean;
  bookName?: string;
}