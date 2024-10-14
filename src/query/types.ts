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

interface MeaningProportionItem {
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

interface WordCoreAi {
  DictionaryByGPT4?: string;
  Eudic?: Record<string, string>;
}

interface WordCoreDefinition {
  cn: Array<string>;
  en: Array<string>;
}

export interface WordCore {
  pron: WordCorePron;
  freq: WordCoreFreq;
  exchange: Record<string, string>;
  tags: WordCoreTags;
  simpleMeaning?: string;
  definition: WordCoreDefinition;
  proportion: WordCoreProportion;
  ai: WordCoreAi;
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

interface SetRelationItem {
  key: string;
  from: string;
  score: number;
}

export interface WordRelation {
  Synonym: Array<SemanticRelationItem>; // 同义词
  Similar: Array<SemanticRelationItem>; // 近义词
  Antonym: Array<SemanticRelationItem>; // 反义词
  ClassOf: Array<SemanticRelationItem>; // 上位词
  InstanceOf: Array<SemanticRelationItem>; // 下位词
  RelatedTo: Array<SemanticRelationItem>; // 相关词
  Collocation: Array<CollocationItem>; // 固定搭配
  Phrase: Array<PhraseItem>; // 短语
  Example: Array<ExampleItem>; // 例句
  Etymology: Array<EtymologyItem>; // 词源
  Topic: Array<SetRelationItem>; // 话题
  Synset: Array<SetRelationItem>; // 近义词辨析
  Mother: Array<SetRelationItem>; // 母词/词根
  Prefix: Array<SetRelationItem>; // 前缀
  Postfix: Array<SetRelationItem>; // 后缀
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

export interface Node {
  id: string;
  key: string;
  type: string;
  label: string;
}

export interface Edge {
  id: string;
  type: string;
  label: string;
  source: string;
  target: string;
}

