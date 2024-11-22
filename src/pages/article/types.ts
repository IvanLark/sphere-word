import {PositionItem} from "../../api/types/word-data.types.ts";

export interface ArticleLocationState {
  type: 'id' | 'text' | 'link' | 'adapt' | 'translate';
  article: string;
  level?: number;
  positions?: Array<PositionItem>;
}