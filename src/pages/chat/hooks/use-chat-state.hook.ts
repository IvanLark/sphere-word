import {useState} from "react";
import {ChatMessage, ChatStatus} from "../types.ts";

export default function useChatState () {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatStatus, setChatStatus] = useState<ChatStatus>('empty');
  const [chatInput, setChatInput] = useState<string>('');
  const [promptTabOpen, setPromptTabOpen] = useState<boolean>(true);

  function setEmpty (messages: ChatMessage[]) {
    setChatStatus('empty');
    setChatInput('');
    setChatMessages(messages);
  }

  function setGenerating (messages: ChatMessage[]) {
    setChatStatus('generating');
    setChatInput('');
    setChatMessages(messages);
  }

  function updateInput (text: string) {
    text = text.trim();
    if (text === '') {
      setChatStatus('empty');
    } else {
      setChatStatus('inputting');
    }
    setChatInput(text);
  }

  function addInput (text: string) {
    setChatStatus('inputting');
    setChatInput(prev => prev + ` ${text} `);
  }

  function reversePromptTabOpen () {
    setPromptTabOpen(prev => !prev);
  }

  return {
    chatMessages, chatStatus, chatInput, promptTabOpen,
    setEmpty, setGenerating, updateInput, addInput,
    reversePromptTabOpen
  };

}