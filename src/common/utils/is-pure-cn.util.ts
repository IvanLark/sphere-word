export default function isPureCn (text: string) {
  return /^[\u4e00-\u9fa5]+$/.test(text);
}