import getSentenceString from "./get-sentence-string.ts";

export default function getParagraphString (sentences: Array<Array<string>>) {
  return sentences.map(sentence => getSentenceString(sentence)).join(' ');
}