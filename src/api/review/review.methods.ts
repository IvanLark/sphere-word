import alova from "../api.index.ts";
import {ReviewCardData} from "./review.types.ts";

export const checkCollected =
  (word: string) =>
    alova.Get<null>(`/review/check?word=${word}`)

export const collectWord =
  (word: string) =>
    alova.Post<null>('/review/collect', { word: word })

export const getReviewWords =
  () =>
    alova.Get<Array<string>>('/review/words')

export const reviewWord =
  (word: string, rating: number) =>
    alova.Post<ReviewCardData>('/review/review', { word: word, rating: rating })