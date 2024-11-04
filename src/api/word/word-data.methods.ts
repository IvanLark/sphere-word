import alova from "../api.index.ts";
import {WordData} from "./word-data.types.ts";

export const getWordData =
  (word: string) =>
  alova.Get<WordData>('/word/data', {
    params: { word: word },
    meta: { cache: true, gzip: true }
  });
