import {ChatMessage, ChatSSEMessage} from "../types.ts";
import {SSE} from "sse.js";
import {BASE_URL} from "../../../api/constants.ts";
import scrollToBottom from "./scroll-to-bottom.helper.ts";
import {toast} from "../../../common/utils/toast.util.tsx";

export class ChatClient {
  setEmpty: (messages: ChatMessage[]) => void;
  setGenerating: (messages: ChatMessage[]) => void;

  constructor(
    setEmpty: (messages: ChatMessage[]) => void,
    setGenerating: (messages: ChatMessage[]) => void,
    ) {
    this.setEmpty = setEmpty;
    this.setGenerating = setGenerating;
  }

  generate(prompt: string, target: 'generate'|'continue', preMessages: ChatMessage[]) {
    const beginningMessages = preMessages;
    if (target === 'generate') {
      beginningMessages.push({'role': 'user', 'content': prompt})
    }
    // 更新
    this.setGenerating(beginningMessages);
    // SSE请求
    const source = new SSE(
      `${BASE_URL}/chat/stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        payload: JSON.stringify({ 'prompt': prompt, 'target': target })
      }
    );
    // 流式获取响应
    let responseContent = '';
    source.addEventListener("message", (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data) as ChatSSEMessage;
      const newMessages = [
        ...beginningMessages,
        { role: 'assistant', content: responseContent }
      ];
      if (message.event === 'done') {
        this.setEmpty(newMessages);
      } else {
        responseContent += message.content;
        this.setGenerating(newMessages);
      }
      // 自动滚动到最底部
      scrollToBottom();
    });
    // 处理错误情况
    source.addEventListener("error", () => {
      toast.error('网络出问题啦');
      this.setEmpty(preMessages);
    });
  }
}