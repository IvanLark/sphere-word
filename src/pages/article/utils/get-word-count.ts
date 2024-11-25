export default function getWordCount (text: Array<Array<Array<string>>>) {
  let count = 0;
  text.forEach(paragraph => {
    paragraph.forEach(sentence => {
      sentence.forEach(() => {
        count++;
      })
    })
  });
  return count;
}