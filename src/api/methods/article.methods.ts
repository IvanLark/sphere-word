import alova from "../index.ts";
import {Article, ArticleFace} from "../types/article.types.ts";

export const getArticle =
  (articleId: string) =>
    alova.Get<Article>('/article', {
      params: { id: articleId },
      meta: { cache: true, gzip: true }
    })

export const getPublishArticles =
  () => alova.Get<Array<ArticleFace>>('/article/publish', {
      meta: { gzip: true }
    })

export const getAnalyzeArticle =
  (text: string) => alova.Post<Article>('/article/analyze',
    { text: text }, { meta: { gzip: true, cache: true }, cacheFor: { mode:  'restore', expire: Infinity } })

export const getLinkArticle =
  (link: string) => alova.Post<Article>('/article/link',
    { 'link': link }, { meta: { gzip: true, cache: true }, cacheFor: { mode:  'restore', expire: Infinity } })

export const getAdaptArticle =
  (text: string, level: number) => alova.Post<Article>('/article/adapt',
    { text: text, level: level }, { meta: { gzip: true, cache: true }, cacheFor: { mode:  'restore', expire: Infinity } })

export const getTranslateArticle =
  (text: string, level: number) => alova.Post<Article>('/article/translate',
    { text: text, level: level }, { meta: { gzip: true, cache: true }, cacheFor: { mode:  'restore', expire: Infinity } })

