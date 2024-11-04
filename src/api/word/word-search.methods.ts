import alova from "../api.index.ts";

export const checkWordExisted =
  (text: string) =>
    alova.Get<null>('/word/search/check', { params: { text: text } });

export const getWordAutoComplete =
  (text: string) =>
    alova.Get<Array<string>>('/word/search/auto_complete', { params: { text: text } });
