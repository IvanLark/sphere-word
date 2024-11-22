import {isPunct} from "./text-process.util.ts";

export default function getSentenceString(words: Array<string>) {
  return words.reduce((curText, curWord, index) => {
    if (index === 0) {
      return curWord;
    }
    if (isPunct(curWord) || curWord.includes("'")) {
      return curText + curWord;
    } else {
      return curText + ' ' + curWord;
    }
  }, '');
}