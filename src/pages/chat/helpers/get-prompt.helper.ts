import {ChatLocationState} from "../types.ts";

export default function getPromptMap(data: ChatLocationState): Record<string, string> {
  switch (data.objectsType) {
    case '单词': {
      const word = data.objects[0];
      let meaningPrompt = `单词${word}有哪些意思呢？什么意思比较常用呢？`;
      if (data.context) {
        meaningPrompt = `在句子 “${data.context}”中，单词${word}是什么意思呢？`;
      }
      return {
        '释义': meaningPrompt,
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
    case '句子': {
      const sentence = data.objects[0];
      return {
        '意思': `在上下文 “${data.context}” 中，句子 “${sentence}” 是什么意思？`,
        '语法解析': `你是优秀的英语老师，帮我解析句子 “${sentence}” 的语法`
      };
    }
    case '段落': {
      const paragraph = data.objects[0];
      return {
        '意思': `在上下文 “${data.context}” 中，段落 “${paragraph}” 是什么意思？`,
        '语法解析': `你是优秀的英语老师，帮我解析段落 “${paragraph}” 的语法`
      };
    }
    case '文章': {
      const text = data.objects[0];
      return {
        '总结': `请使用中文总结以下英语文章的内容：\n${text}`,
        '结构分析': `请使用中文分析以下英语文章的结构：\n${text}`
      }
    }
    default: {
      return {
        '翻译': '请帮我翻译以下英文：',
        '表达': '如何用英语表达：',
        '语法': '你是优秀的英语老师，请帮我解析以下句子的语法：',
        '润色': '你是优秀的英语老师，请帮我润色我写的英文，看看有没有更好的表达：',
        '纠错': '你是优秀的英语老师，请帮我看看我写的英文有没有错：',
        '辨析': '请辨析以下几个单词之间的异同：'
      };
    }
  }
}