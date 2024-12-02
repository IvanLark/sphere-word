export interface ChatMessage {
  role: string;
  content: string;
}

export interface ChatHistory {
  messages: ChatMessage[];
  state: 0 | 1;
}

export type ChatLocationState = ChatLocationStateWord | ChatLocationStateSentence | ChatLocationStateParagraph | ChatLocationStateArticle | ChatLocationStateDefault;

export interface ChatLocationStateWord {
  objectsType: '单词';
  objects: [string];
  context?: string;
  promptName: string | undefined;
}

export interface ChatLocationStateSentence {
  objectsType: '句子';
  objects: [string];
  context: string;
  promptName: string | undefined;
}

export interface ChatLocationStateParagraph {
  objectsType: '段落';
  objects: [string];
  context: string;
  promptName: string | undefined;
}

export interface ChatLocationStateArticle {
  objectsType: '文章';
  objects: [string];
  context: string;
  promptName: string | undefined;
}

export interface ChatLocationStateDefault {
  objectsType: undefined;
  objects: undefined;
  context: undefined;
  promptName: undefined;
}

export type ChatStatus = 'empty' | 'inputting' | 'generating';

export interface ChatSSEMessage {
  'event': 'cmpl' | 'done',
  'content': string;
}

export type GeneratePayload = {
  prompt: string;
  target: 'generate'
} | {
  prompt: '';
  target: 'continue'
}
