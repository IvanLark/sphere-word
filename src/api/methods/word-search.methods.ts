import alova from "../index.ts";

export const checkWordExisted =
  (text: string) =>
    alova.Get<null>('/word/search/check', { params: { text: text }, meta: { cache: true } });

export const checkWordInContext =
  (index: number, context: Array<string>) =>
    alova.Post<string>('/word/search/context_check', { index: index, context: context });

export const getWordAutoComplete =
  (text: string) =>
    alova.Get<Array<string>>('/word/search/auto_complete', { params: { text: text }, meta: { cache: true } });

export const getCnAutoComplete =
  (text: string) =>
    alova.Get<Array<string>>('/word/search/cn_auto_complete', { params: { text: text }, meta: { cache: true } });