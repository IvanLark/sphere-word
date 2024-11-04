/**
 * 假装为引入的纯JS库作类型支持，避免TS报错
 */

declare module 'cytoscape-cola';

declare module '*.svg' {
  const content: string;
  export default content;
}