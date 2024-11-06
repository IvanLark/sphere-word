export interface ChatMessage {
  role: string;
  content: string;
}

export interface ChatHistory {
  messages: ChatMessage[];
  state: 0 | 1;
}

export type ChatLocationState = ChatLocationStateWord | ChatLocationStateDefault;

export interface ChatLocationStateWord {
  objectsType: '单词',
  objects: [string],
  promptName: string | undefined;
}

export interface ChatLocationStateDefault {
  objectsType: undefined,
  objects: undefined,
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
