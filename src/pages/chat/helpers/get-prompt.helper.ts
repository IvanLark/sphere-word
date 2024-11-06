import {ChatLocationState} from "../types.ts";

export default function getPromptMap(data: ChatLocationState): Record<string, string> {
  switch (data.objectsType) {
    case '单词': {
      const word = data.objects;
      return {
        '释义': `单词${word}有哪些意思呢？什么意思比较常用呢？`,
        '生活场景': `单词${word}在生活中有哪些应用场景呢？`,
        '短语': `单词${word}的短语`,
        '例句': `单词${word}的例句`,
        '搭配': `单词${word}的固定搭配`,
        '话题': `单词${word}和哪些话题有关？同话题下还有哪些单词呢？`,
        '词根词缀': `单词${word}的词根词缀是什么？有哪些词具有相同的词根词缀呢？`,
        '起源历史': `单词${word}的起源历史是什么？`,
        '近义词辨析': `单词${word}有哪些近义词？如何辨析单词${word}和这些近义词？`,
        '同义': `单词${word}有哪些同义词？`,
        '近义': `单词${word}有哪些近义词？`,
        '反义': `单词${word}有哪些反义词？`,
        '相关': `单词${word}和哪些词相关？`,
        '上位': `单词${word}有哪些上位词？`,
        '下位': `单词${word}有哪些下位词？`
      };
    }
    default: {
      return {
        '如何表达': '如何用英语表达: ',
        '如何学英语': '英语该如何学习呢？',
        '如何背单词': '背单词好无聊，怎么背单词比较好'
      };
    }
  }
}