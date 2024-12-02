import alova from "../index.ts";
import {ArticleInfo, ArticleFace, Book, BookInfo} from "../types/article.types.ts";

export const getArticle =
  (articleId: string) =>
    alova.Get<ArticleInfo>('/article', {
      params: { id: articleId },
      meta: { cache: true, gzip: true }
    })

export const getPublishArticles =
  () => alova.Get<Array<ArticleFace>>('/article/publish', {
      meta: { gzip: true }
    })

export const searchArticles =
  (level: string, topic: string) => alova.Get<Array<ArticleFace>>('/article/search', {
    params: { level: level, topic: topic },
    meta: { gzip: true }
  })

export const getAnalyzeArticle =
  (text: string) => alova.Post<ArticleInfo>('/article/analyze',
    { text: text }, { meta: { gzip: true, cache: true }, cacheFor: { mode:  'restore', expire: Infinity } })

export const getLinkArticle =
  (link: string) => alova.Post<ArticleInfo>('/article/link',
    { 'link': link }, { meta: { gzip: true, cache: true }, cacheFor: { mode:  'restore', expire: Infinity } })

export const getAdaptArticle =
  (text: string, level: number) => alova.Post<ArticleInfo>('/article/adapt',
    { text: text, level: level }, { meta: { gzip: true, cache: true }, cacheFor: { mode:  'restore', expire: Infinity } })

export const getTranslateArticle =
  (text: string, level: number) => alova.Post<ArticleInfo>('/article/translate',
    { text: text, level: level }, { meta: { gzip: true, cache: true }, cacheFor: { mode:  'restore', expire: Infinity } })

export const keepArticle =
  (article: ArticleInfo) => alova.Post<null>('/article/keep', article)

export const getKeepArticle =
  (articleId: string) => alova.Get<ArticleInfo>('/article/keep', {
    params: { articleId: articleId },
    meta: { gzip: true, cache: false }
  })

export const checkArticleKeep =
  (articleId: string) => alova.Get<null>('/article/check_keep', { params: { articleId: articleId } })

export const cancelArticleKeep =
  (articleId: string) => alova.Post<null>('/article/cancel_keep', { articleId: articleId })

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
  (bookId: string, chapterId: string, page: number) => alova.Get<ArticleInfo>('/article/chapter', {
    params: { bookId: bookId, chapterId: chapterId, page: page },
    meta: { gzip: true, cache: true },
    cacheFor: { mode:  'restore', expire: Infinity }
  })

