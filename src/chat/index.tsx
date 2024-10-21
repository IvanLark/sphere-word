import { ArrowBack, HomeOutlined, Menu, Send, StopCircle } from "@mui/icons-material";
import {useEffect, useState} from "react";
import ChatArea from "./chat_area/ChatArea";
import {useLocation, useNavigate} from "react-router-dom";
import { ChatMessage } from "./types.ts";
import { BASE_URL } from "../constants.ts";
import { SSE } from 'sse.js';

/**
 * AI对话页面
 * @constructor
 */
export default function Chat() {
  const navigate = useNavigate();

  // chat
  type ChatState = 'empty' | 'inputting' | 'generating' | 'error';
  interface ChatData {
    chatState: ChatState;
    inputText: string;
    messages: Array<ChatMessage>;
  }

  const storedChatData = sessionStorage.getItem('ChatChatData');
  const initChatData = storedChatData ? JSON.parse(storedChatData) : {
    chatState: "empty",
    inputText: "",
    messages: [
      { role: 'system', content: '你好呀我是你的AI助手!' }
    ]
  };
  const [chatData, setChatData] = useState<ChatData>(initChatData);

  useEffect(() => {
    sessionStorage.setItem('ChatChatData', JSON.stringify(chatData));
  }, [chatData]);

  // prompt
  interface ChatLocationState {
    objectsType: '单词'|'多个单词'|'句子'|undefined; // 针对对象类型
    objects: string[]|undefined; // 针对对象
    promptName: string|undefined; // 需要自动触发的prompt，如果没有则不触发
  }

  const location = useLocation();
  const { objectsType = undefined, objects = [], promptName } = location.state as ChatLocationState || {};

  useEffect(() => {
    if (objectsType && promptName && Object.prototype.hasOwnProperty.call(getPromptMap(), promptName)) {
      generate(getPromptMap()[promptName]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectsType, promptName]);

  const [promptTabOpen, setPromptTabOpen] = useState(true);
  const promptTabElements: string[] = objects;

  // 提示词Map
  function getPromptMap (): Record<string, string> {
    switch (objectsType) {
      case '单词': {
        const word = objects[0];
        return {
          '释义': `单词${word}有哪些意思呢？什么意思比较常用呢？`,
          '生活场景': `单词${word}在生活中有哪些应用场景呢？`,
          '短语': `单词${word}的短语`,
          '例句': `单词${word}的例句`,
          '搭配': `单词${word}的固定搭配`,
          '话题': `单词${word}和哪些话题有关？同话题下还有哪些单词呢？`,
          '词根词缀': `单词${word}的词根词缀是什么？有哪些词具有相同的词根词缀呢？`,
          '起源历史': `单词${word}的起源历史是什么？`,
          '近义词辨析': `单词${word}有哪些近义词？如何辨析单词${word}和这些近义词？`,
          '同义': `单词${word}有哪些同义词？`,
          '近义': `单词${word}有哪些近义词？`,
          '反义': `单词${word}有哪些反义词？`,
          '相关': `单词${word}和哪些词相关？`,
          '上位': `单词${word}有哪些上位词？`,
          '下位': `单词${word}有哪些下位词？`
        };
      }
      default: {
        return {
          '如何学英语': '英语该如何学习呢？',
          '如何背单词': '背单词好无聊，怎么背单词比较好'
        };
      }
    }
  }

  // 滚动到最底部
  function scrollToBottom() {
    const chatAreaDiv = document.getElementById('chat-area');
    if (chatAreaDiv) {
      chatAreaDiv.scrollTo({
        top: chatAreaDiv.scrollHeight,
        behavior: 'smooth' // 平滑滚动
      });
    }
  }
  scrollToBottom(); // 一开始就滚动到最底部

  // AI生成
  function generate(prompt: string) {
    const newChatData = {
      chatState: 'generating',
      inputText: '',
      messages: [
        ...chatData.messages,
        { role: 'user', content: prompt }
      ]
    } as ChatData;
    setChatData(newChatData);

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
      const part = JSON.parse(event.data).content;
      if (part === '[DONE]') {
        setChatData({
          chatState: 'empty',
          inputText: '',
          messages: [
            ...newChatData.messages,
            { role: 'assistant', content: responseContent }
          ]
        });
      } else {
        responseContent += part;
        setChatData({
          chatState: 'generating',
          inputText: '',
          messages: [
            ...newChatData.messages,
            { role: 'assistant', content: responseContent }
          ]
        });
      }
      // 自动滚动到最底部
      scrollToBottom();
    });
  }

  // 输入改变事件
  function handleInputTextChange(text: string) {
    setChatData({
      ...chatData, inputText: text, chatState: text.trim() === '' ? 'empty' : 'inputting'
    });
  }

  // 输入按钮点击事件
  function handleInputButtonClick() {
    if (chatData.chatState === "empty") {
      setPromptTabOpen(!promptTabOpen);
    }
    else if (chatData.chatState === "inputting") {
      generate(chatData.inputText);
    }
  }

  // 针对对象卡片
  function promptTabElementCard(word: string, key: number) {
    return <span key={key}
                 className='px-2 border-2 border-black rounded-md shrink-0 active:bg-black active:text-white'
                 onClick={() => {
                   if (chatData.chatState !== 'generating') {
                     setChatData(prev => {
                       return { ...prev, inputText: prev.inputText + ` ${word} `, chatState: 'inputting' };
                     });
                   }
                 }}>
      {word}
      {/*<button title="delete" className="btn-scale btn-trans size-6 ml-2 rounded-full"
              onClick={() => setPromptTabElements(promptTabElements.filter(w => w !== word))}>
        <Close />
      </button>*/}
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
        <div className={`pb-2 flex gap-2 overflow-x-auto overflow-y-hidden hide-scrollbar transition-all duration-300 
          ${promptTabOpen ? 'w-full h-9' : 'size-0'}`}
          onWheel={(event) => { (event.currentTarget as HTMLDivElement).scrollLeft += event.deltaY * 0.5 }}>
          {Object.entries(getPromptMap()).map(([key, value], index) =>
            <span key={index} onClick={() => { handleInputTextChange(value); }}
              className={`btn-scale btn-trans h-fit px-2 border-2 border-black rounded-md 
                overflow-hidden text-nowrap shrink-0 active:bg-black active:text-white`}
            >
              {key}
            </span>
          )}
        </div>
        {/* 针对对象 */}
        {
          objectsType && objects.length !== 0 &&
          <div className="flex gap-2">
            <div
              className={`w-full px-3 border-black rounded-md flex items-center gap-2 overflow-x-auto overflow-y-hidden hide-scrollbar duration-300 
                ${promptTabOpen ? 'h-12 border-2 border-b-0 rounded-b-none' : 'h-0'}`}
              style={{transitionProperty: 'height'}} onWheel={(event) => {
              (event.currentTarget as HTMLDivElement).scrollLeft += event.deltaY * 0.5
            }}>
              <span className="">{objectsType}: </span>
              {promptTabElements.map((word, index) => promptTabElementCard(word, index))}
            </div>
            <div className={`w-12 shrink-0 border-2 border-transparent duration-300 ${promptTabOpen ? 'h-12' : 'h-0'}`}
                 style={{transitionProperty: 'height'}}></div>
          </div>
        }
        {/* 输入框 */}
        <div className={`w-full h-12 flex gap-2 items-center`}>
          <textarea className={`flex-1 h-12 p-3 rounded-md border-2 border-black hide-scrollbar
                      transition-all duration-300 ${promptTabOpen ? 'rounded-t-none' : ''}`}
                    placeholder="有英语问题尽管问我~"
                    disabled={ chatData.chatState === "generating" }
                    value={ chatData.inputText }
                    onChange={(event) => {
                      handleInputTextChange(event.target.value)
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') handleInputButtonClick()
                    }}/>
          <button className="btn-scale-xl btn-common-hover size-12 rounded-md border-2 border-black"
                  onClick={handleInputButtonClick}>
            {
              chatData.chatState === "empty" ? <Menu style={{ fontSize: "2.5rem" }} /> :
                chatData.chatState === "inputting" ? <Send style={{ fontSize: "2.5rem" }} /> :
                  chatData.chatState === "generating" ? <StopCircle style={{ fontSize: "2.5rem" }} /> : "出错了"
            }
          </button>
        </div>
      </div>
    </div>
  );
}