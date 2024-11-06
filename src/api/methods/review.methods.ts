import alova from "../index.ts";
import {ReviewWordData} from "../types/review.types.ts";

export const checkCollected =
  (word: string) =>
    alova.Get<null>(`/review/check?word=${word}`)

export const collectWord =
  (word: string) =>
    alova.Post<null>('/review/collect', { word: word })

export const getReviewWords =
  () =>
    alova.Get<Array<ReviewWordData>>('/review/words')

export const reviewWord =
  (word: string, rating: number) =>
    alova.Post<null>('/review/review', { word: word, rating: rating })