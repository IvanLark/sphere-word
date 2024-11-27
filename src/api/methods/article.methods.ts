import alova from "../index.ts";
import {Article, ArticleFace, Book, BookInfo} from "../types/article.types.ts";

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

export const keepArticle =
  (article: Article) => alova.Post<null>('/article/keep', article)

export const getKeepArticle =
  (articleId: string) => alova.Get<Article>('/article/keep', {
    params: { articleId: articleId },
    meta: { gzip: true, cache: false }
  })

export const getKeepArticleList =
  () => alova.Get<Array<ArticleFace>>('/article/keep_list', { meta: { gzip: true } })

export const getBooks =
  (level: string) => alova.Get<Array<Book>>('/article/books', {
    params: { level: level },
    meta: { gzip: true, cache: true },
    cacheFor: { mode:  'restore', expire: Infinity }
  })

export const getBook =
  (bookId: string) => alova.Get<BookInfo>('/article/book', {
    params: { bookId: bookId },
    meta: { gzip: true, cache: true },
    cacheFor: { mode:  'restore', expire: Infinity }
  })

export const getChapter =
  (bookId: string, chapterId: string) => alova.Get<Article>('/article/chapter', {
    params: { bookId: bookId, chapterId: chapterId },
    meta: { gzip: true, cache: true },
    cacheFor: { mode:  'restore', expire: Infinity }
  })

