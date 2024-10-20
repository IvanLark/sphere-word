import { ArrowBack, Close, HomeOutlined, Menu, Send, StopCircle } from "@mui/icons-material";
import { useState } from "react";
import ChatArea from "./chat_area/ChatArea";
import { useNavigate } from "react-router-dom";
import { ChatMessage } from "./types.ts";
import { BASE_URL } from "../constants.ts";
import { SSE } from 'sse.js';

/**
 * AI对话页面
 * @constructor
 */
export default function Chat() {
  const navigate = useNavigate();

  type ChatState = 'empty' | 'inputing' | 'gernerating' | 'error';
  interface ChatData {
    chatState: ChatState;
    inputText: string;
    messages: Array<ChatMessage>;
  }
  const [chatData, setChatData] = useState<ChatData>({
    chatState: "empty",
    inputText: "",
    messages: [
      { role: 'system', content: '你好呀我是你的AI助手!' }
    ]
  })

  const [promptTabOpen, setPromptTabOpen] = useState(false);
  const [promptTabElements, setPromptTabElements] = useState<string[]>(['make', 'case']);
  const prompts = {
    '生活场景': '$word在生活场景中有什么应用？',
    '起源历史': '$word的起源历史是什么？',
    '词根词缀': '$word的词根词缀是什么？',
    '新闻事件': '最近关于$word有什么新闻事件？',

    // td to delete
    '生活场景1': '$word在生活场景中有什么应用？',
    '起源历史1': '$word的起源历史是什么？',
    '词根词缀1': '$word的词根词缀是什么？',
    '新闻事件1': '最近关于$word有什么新闻事件？',
    '生活场景2': '$word在生活场景中有什么应用？',
    '起源历史2': '$word的起源历史是什么？',
    '词根词缀2': '$word的词根词缀是什么？',
    '新闻事件2': '最近关于$word有什么新闻事件？',
    '生活场景3': '$word在生活场景中有什么应用？',
    '起源历史3': '$word的起源历史是什么？',
    '词根词缀3': '$word的词根词缀是什么？',
    '新闻事件3': '最近关于$word有什么新闻事件？',
  }

  function handleInputTextChange(text: string) {
    setChatData({
      ...chatData, inputText: text, chatState: text.trim() === '' ? 'empty' : 'inputing'
    });
  }
  /*
  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  */
  function handleInputButtonClick() {
    if (chatData.chatState === "empty") {
      setPromptTabOpen(!promptTabOpen);
    }
    else if (chatData.chatState === "inputing") {
      const newChatData = {
        chatState: 'gernerating',
        inputText: '',
        messages: [
          ...chatData.messages,
          { role: 'user', content: chatData.inputText }
        ]
      } as ChatData;
      setChatData(newChatData);
      /*
      client.post<Result<string>>('/chat', {
        messages: newChatData.messages
      }).then(response => {
        setChatData({
          chatState: 'inputing',
          inputText: '',
          messages: [
            ...newChatData.messages,
            { role: 'assistant', content: response.data.data }
          ]
        })
      })
      */
      let responseContent = '';
      const source = new SSE(
        `${BASE_URL}/chat`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          payload: JSON.stringify({ 'messages': newChatData.messages })
        }
      );
      source.addEventListener("message", (event: MessageEvent) => {
        responseContent += JSON.parse(event.data).content;
        setChatData({
          chatState: 'inputing',
          inputText: '',
          messages: [
            ...newChatData.messages,
            { role: 'assistant', content: responseContent }
          ]
        })
      });
    }
    //else if (chatState === "gernerating")
    //  setChatState("inputing");
  }

  function promptTabElementCard(word: string, key: number) {
    return <span key={key} className='px-2 border-2 border-black rounded-md shrink-0 '>
      {word}
      <button title="delete" className="btn-scale btn-trans size-6 ml-2 rounded-full" onClick={() => setPromptTabElements(promptTabElements.filter(w => w !== word))}><Close /></button>
    </span>
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full h-16 fixed rounded-md border-2 border-black bg-white flex items-center overflow-hidden">
        {/* 返回按钮 */}
        <button title="Back" className="btn-trans size-16 rounded-md border-r-2 border-black group"
          onClick={() => { navigate(-1) }}>
          <div className="btn-scale-xl"><ArrowBack style={{ fontSize: "2.5rem" }} /></div>
        </button>
        {/* 中间 */}
        <div className="flex-1 text-center text-3xl font-bold">
          Lingo AI
        </div>
        {/* 菜单按钮 */}
        <button title="Menu" className="btn-trans size-16 rounded-md border-l-2 border-black group">
          <div className="btn-scale-xl" onClick={() => navigate('/')}>
            <HomeOutlined style={{ fontSize: "2.5rem" }} />
          </div>
        </button>
      </div>
      <div className="w-screen h-16 shrink-0">nothing here</div>
      <ChatArea messages={chatData.messages} />

      {/* 输入部分 */}
      <div className={`w-full fixed bottom-0 px-4 py-2 bg-white z-10 `}>
        {/* 预设提示词部分 */}
        <div className={`pb-2 flex gap-2 overflow-x-auto overflow-y-hidden hide-scrollbar transition-all duration-300 ${promptTabOpen ? 'w-full h-9' : 'size-0'}`} onWheel={(event) => { (event.currentTarget as HTMLDivElement).scrollLeft += event.deltaY * 0.5 }}>
          {Object.entries(prompts).map(([key, value]) =>
            <span
              className={`btn-scale btn-trans h-fit px-2 border-2 border-black rounded-md overflow-hidden text-nowrap shrink-0`}
              onClick={() => {
                if (promptTabElements.length === 0) return
                handleInputTextChange(value.replace("$word", promptTabElements.join(", ")));
              }} >
              {key}
            </span>
          )}
        </div>
        {/* 针对对象 */}
        <div className="flex gap-2">
          <div className={`w-full px-3 border-black rounded-md flex items-center gap-2 overflow-x-auto overflow-y-hidden hide-scrollbar duration-300 ${promptTabOpen ? 'h-12 border-2 border-b-0 rounded-b-none' : 'h-0'}`} style={{ transitionProperty: 'height' }} onWheel={(event) => { (event.currentTarget as HTMLDivElement).scrollLeft += event.deltaY * 0.5 }}>
            <span className="">单词/句子: </span>
            {promptTabElements.map((word, index) => promptTabElementCard(word, index))}
          </div>
          <div className={`w-12 shrink-0 border-2 border-transparent duration-300 ${promptTabOpen ? 'h-12' : 'h-0'}`} style={{ transitionProperty: 'height' }}></div>
        </div>
        {/* 输入框 */}
        <div className={`w-full h-12 flex gap-2 items-center`}>
          <textarea className={`flex-1 h-12 p-3 rounded-md border-2 border-black hide-scrollbar
                      transition-all duration-300 ${promptTabOpen ? 'rounded-t-none' : ''}`}
            placeholder="有英语问题尽管问我~"
            disabled={chatData.chatState === "gernerating"}
            value={chatData.inputText}
            onChange={(event) => { handleInputTextChange(event.target.value) }}
            onKeyDown={(event) => { if (event.key === 'Enter') handleInputButtonClick() }} />
          <button className="btn-scale-xl btn-common-hover size-12 rounded-md border-2 border-black"
            onClick={handleInputButtonClick}>
            {
              chatData.chatState === "empty" ? <Menu style={{ fontSize: "2.5rem" }} /> :
                chatData.chatState === "inputing" ? <Send style={{ fontSize: "2.5rem" }} /> :
                  chatData.chatState === "gernerating" ? <StopCircle style={{ fontSize: "2.5rem" }} /> : "出错了"
            }
          </button>
        </div>
      </div>
    </div>
  );
}