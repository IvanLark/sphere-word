import { ArrowBack, Close, HomeOutlined, Menu, Send, StopCircle } from "@mui/icons-material";
import { useState } from "react";
import ChatArea from "./chat_area/ChatArea";
import WordCard from "../components.old/WordCard";
import { useNavigate } from "react-router-dom";
import { ChatMessage } from "./types.ts";
import axios from "axios";
import { BASE_URL } from "../constants.ts";
import { Result } from "../types.ts";

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
  const prompts = { '生活场景': '$word在生活场景中有什么应用？', '起源历史': '$word的起源历史是什么？', '词根词缀': '$word的词根词缀是什么？', '新闻事件': '最近关于$word有什么新闻事件？' }

  function handleInputTextChange(text: string) {
    setChatData({
      ...chatData, inputText: text, chatState: text.trim() === '' ? 'empty' : 'inputing'
    });
  }

  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })
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
    }
    //else if (chatState === "gernerating")
    //  setChatState("inputing");
  }

  function promptTabElementCard(word: string) {
    return <span className='px-2 border-2 border-black rounded-md shrink-0 '>
      {word}
      <button title="delete" className="btn-scale btn-trans size-6 ml-2 rounded-full" onClick={() => setPromptTabElements(promptTabElements.filter(w => w !== word))}><Close /></button>
    </span>
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full h-16 fixed rounded-md border-2 border-black bg-white flex items-center overflow-hidden">
        {/* 返回按钮 */}
        <button className="btn-trans size-16 rounded-md border-r-2 border-black group"
          onClick={() => { navigate(-1) }}>
          <div className="btn-scale-xl"><ArrowBack style={{ fontSize: "40px" }} /></div>
        </button>
        {/* 中间 */}
        <div className="flex-1 text-center text-3xl font-bold">
          {/* // td to fill */}
          Lingo AI
        </div>
        {/* 菜单按钮 */}
        <button className="btn-trans size-16 rounded-md border-l-2 border-black group">
          <div className="btn-scale-xl" onClick={() => navigate('/')}>
            <HomeOutlined style={{ fontSize: "40px" }} />
          </div>
        </button>
      </div>
      <div className="w-screen h-16 shrink-0">nothing here</div>
      <ChatArea messages={chatData.messages} />

      {/* 输入部分 */}
      {/* // ! 哇趣这里向上展开有点难实现……用了取巧的方式 */}
      {/* // ! md想起来fixed以后又花了大力气才回到现在这个效果 */}
      <div className={`w-full fixed bottom-0 px-4 py-2 bg-white z-10 `}>
        {/* 预设提示词部分 */}
        <div className={`py-1 flex gap-2 overflow-hidden transition-all duration-300 ${promptTabOpen ? 'w-full h-8' : 'size-0'}`}>
          {Object.entries(prompts).map(([key, value]) => <WordCard key={key} word={key} className={`btn-scale btn-trans ${!promptTabOpen && 'border-0'}`} onClick={() => {
            if (promptTabElements.length === 0) return
            handleInputTextChange(value.replace("$word", promptTabElements.join(", ")));
            setChatData({
              ...chatData,
              inputText: value.replace("$word", promptTabElements.join(", "))
            })
          }} />)}
        </div>
        {/* 针对对象 */}
        <div className="flex gap-2">
          <div className={`w-full px-3 border-black rounded-md flex items-center gap-2 overflow-hidden duration-300 ${promptTabOpen ? 'h-12 border-2 border-b-0 rounded-b-none' : 'h-0'}`} style={{ transitionProperty: 'height' }}>
            <span className="">单词/句子: </span>
            {promptTabElements.map(word => promptTabElementCard(word))}
          </div>
          <div className={`w-12 shrink-0 border-2 border-transparent duration-300 ${promptTabOpen ? 'h-12' : 'h-0'}`} style={{ transitionProperty: 'height' }}></div>
          {/* // !tailwind的duration动画曲线和默认easeinout不同……最好统一 */}
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
              chatData.chatState === "empty" ? <Menu style={{ fontSize: "40px" }} /> :
                chatData.chatState === "inputing" ? <Send style={{ fontSize: "40px" }} /> :
                  chatData.chatState === "gernerating" ? <StopCircle style={{ fontSize: "40px" }} /> : "出错了"
            }
          </button>
        </div>
      </div>
    </div>
  );
}