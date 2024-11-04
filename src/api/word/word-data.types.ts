interface WordCorePron {
  pron: string;
  ukPron: string;
  usPron: string;
}

interface WordCoreFreq {
  bncFrequency: string;
  cocaFrequency: string;
  collinsStar: string;
  examFrequency: number;
}

export interface MeaningProportionItem {
  meaning: string;
  proportion: number;
}

interface PosProportionItem {
  pos: string;
  proportion: number;
}

interface WordCoreProportion {
  meaning?: Record<string, Array<MeaningProportionItem>>;
  pos?: Array<PosProportionItem>;
}

interface WordCoreTags {
  basic: Array<string>;
  detail?: Record<string, Array<string>>;
  other?: Array<string>;
}

/**
 * 单词AI解析
 */
export interface WordAi {
  DictionaryByGPT4?: string;
  Eudic?: Record<string, string>;
}

interface WordCoreDefinition {
  cn: Array<string>;
  en: Array<string>;
}

/**
 * 单词详情
 */
export interface WordCore {
  /**
   * 发音
   */
  pron: WordCorePron;
  /**
   * 词频
   */
  freq: WordCoreFreq;
  /**
   * 变形
   */
  exchange: Record<string, string>;
  /**
   * 标签
   */
  tags: WordCoreTags;
  /**
   * 简单意思
   */
  simpleMeaning?: string;
  /**
   * 释义
   */
  definition: WordCoreDefinition;
  /**
   * 义项比例
   */
  proportion: WordCoreProportion;
  /**
   * 词源
   */
  etymology: Array<EtymologyItem>;
}

interface SemanticRelationItem {
  word: string;
  score: number;
  from: Array<string>;
  detail: object;
}

interface CollocationPhraseItem {
  phrase: string;
  translation: string;
}

interface CollocationItem {
  collocation: string;
  pos: string;
  from: string;
  phrases: Array<CollocationPhraseItem>;
}

interface PhraseItem {
  phrase: string;
  meaning: string;
  score: number;
  from: string;
  detail: object;
}

interface ExampleItem {
  example: string;
  translation: string | null;
  score: number;
  from: string;
  detail: object;
}

interface EtymologyItem {
  etymology: string;
  from: string;
  word: string;
  meaning: string;
  author: string;
}

interface TopicItem {
  key: string;
  from: string;
  score: number;
  name: string;
  words: Array<string>;
}

interface DiscriminationItem {
  word: string;
  meaning: string;
}

interface SynsetItem {
  key: string;
  from: string;
  score: number;
  name: string;
  discriminations: Array<DiscriminationItem>;
}

interface SetRelationItem {
  key: string;
  from: string;
  score: number;
}

/**
 * 单词关系
 */
export interface WordRelation {
  /**
   * 同义词
   */
  Synonym: Array<SemanticRelationItem>;
  /**
   * 近义词
   */
  Similar: Array<SemanticRelationItem>;
  /**
   * 反义词
   */
  Antonym: Array<SemanticRelationItem>;
  /**
   * 上位词
   */
  ClassOf: Array<SemanticRelationItem>;
  /**
   * 下位词
   */
  InstanceOf: Array<SemanticRelationItem>;
  /**
   * 相关词
   */
  RelatedTo: Array<SemanticRelationItem>;
  /**
   * 固定搭配
   */
  Collocation: Array<CollocationItem>;
  /**
   * 短语
   */
  Phrase: Array<PhraseItem>;
  /**
   * 例句
   */
  Example: Array<ExampleItem>;
  /**
   * 话题
   */
  Topic: Array<TopicItem>;
  /**
   * 近义词辨析
   */
  Synset: Array<SynsetItem>;
  /**
   * 母词/词根
   */
  Mother: Array<SetRelationItem>;
  /**
   * 前缀
   */
  Prefix: Array<SetRelationItem>;
  /**
   * 后缀
   */
  Postfix: Array<SetRelationItem>;
}

interface TopicRelation {
  Word?: Array<string>;
  Parent?: string;
  Children?: Array<string>;
}

export interface Topic {
  name: string;
  level: number;
  relation: TopicRelation;
}

interface DiscriminationsItem {
  meaning: string;
  word: string;
}

interface SynsetRelation {
  Word: Array<string>;
}

export interface Synset {
  discriminations: Array<DiscriminationsItem>;
  meaning: string;
  relation: SynsetRelation;
}

export interface WordData {
  core: WordCore;
  relation: WordRelation;
  ai: WordAi;
}

export interface Node {
  id: string;
  key: string;
  type: string; // 节点类型：1. 单词, 2.话题, 3. 近义词结合, 4. 词根词缀
  label: string;
}

export interface Edge {
  id: string;
  type: string;
  label: string;
  source: string; // source节点的id
  target: string; // target节点的id
}