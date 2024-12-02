import getParagraphString from "./get-paragraph-string.ts";

export default function getParagraphAudioUrls (sentences: Array<Array<string>>): Array<{url: string, from: number, to: number}> {
  const audioUrls = [];
  let i = 0;
  let j = 0;
  while (true) {
    if (getParagraphString(sentences.slice(i, j)).length < 200) {
      j++;
      if (j >= sentences.length) {
        audioUrls.push({
          url: `http://dict.youdao.com/dictvoice?type=1&audio=${getParagraphString(sentences.slice(i, j))}`,
          from: i,
          to: j-1
        });
        return audioUrls;
      }
    } else {
      audioUrls.push({
        url: `http://dict.youdao.com/dictvoice?type=1&audio=${getParagraphString(sentences.slice(i, j))}`,
        from: i,
        to: j-1
      });
      i = j;
    }
  }
}