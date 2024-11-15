import alova from "../index.ts";
import {Article} from "../types/article.types.ts";

export const getArticle =
  (articleId: string) =>
    alova.Get<Article>('/article', { params: { id: articleId } })