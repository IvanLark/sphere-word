import { ArrowBack, HomeOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import ChatArea from "./components/chat-area.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { ChatLocationState } from "./types.ts";
import { toast } from "../../common/utils/toast.util.tsx";
import Header from "../../common/components/header.tsx";
import getPromptMap from "./helpers/get-prompt.helper.ts";
import scrollToBottom from "./helpers/scroll-to-bottom.helper.ts";
import { useRequest } from "alova/client";
import { getChatHistory } from "../../api/methods/chat.methods.ts";
import useChatState from "./hooks/use-chat-state.hook.ts";
import { ChatClient } from "./helpers/chat-client.helper.ts";
import SendButton from "./components/send-button.tsx";
import PromptButton from "./components/prompt-button.tsx";
import PromptObjectButton from "./components/prompt-object-button.tsx";
import ScreenLoading from "../../common/components/loader/screen-loading.tsx";

/**
 * AI对话页面
 * @constructor
 */
export default function Chat() {
  const navigate = useNavigate();

  const {
    chatMessages, chatStatus, chatInput, promptTabOpen,
    setEmpty, setGenerating, updateInput, addInput,
    reversePromptTabOpen
  } = useChatState();

  // 获取prompt数据
  const location = useLocation();
  let locationState = {
    objectsType: undefined,
    objects: undefined,
    context: undefined,
    promptName: undefined
  } as ChatLocationState;
  if (location.state !== null) locationState = location.state;

  const promptMap = getPromptMap(locationState);

  // 一开始就滚动到最底部
  useEffect(() => { // useEffect等chat-area渲染出来
    scrollToBottom();
  });

  const chatClient = new ChatClient(setEmpty, setGenerating);

  const { loading, error } = useRequest(getChatHistory(), { force: true })
    .onSuccess(({ data }) => {
      const historyMessage = [
        { role: 'assistant', content: '我是你的英语AI助手，有英语问题尽管问我呀！' },
        ...data.messages
      ];
      if (data.state === 1) {
        if (locationState.promptName) {
          toast.error('必须等待上一问答生成完成');
        }
        // 继续生成
        chatClient.generate('', 'continue', historyMessage);
      } else {
        if (locationState.promptName && locationState.objectsType &&
          Object.prototype.hasOwnProperty.call(promptMap, locationState.promptName)) {
          chatClient.generate(promptMap[locationState.promptName], 'generate', historyMessage);
        } else {
          setEmpty(historyMessage);
        }
      }
    });

  if (error) {
    throw new Error('获取数据出错');
  }
  if (loading) {
    return <ScreenLoading/>;
  }

  // 输入按钮点击事件
  function handleSendButtonClick() {
    switch (chatStatus) {
      case "empty":
        reversePromptTabOpen();
        break;
      case "inputting":
        chatClient.generate(chatInput, 'generate', chatMessages);
        break;
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* <div className="w-full h-16 fixed rounded-md border-2 border-black bg-white flex items-center overflow-hidden">
        <button title="Back" className="btn-trans size-16 rounded-md border-r-2 border-black group"
          onClick={() => { if (chatData.chatState !== 'generating') { navigate(-1); } else { toastUtil.error('生成完成前不能跳转'); } }}>
          <div className="btn-scale-xl"><ArrowBack style={{ fontSize: "2.5rem" }} /></div>
        </button>
        <div className="flex-1 text-center text-3xl font-bold">
          Lingo AI
        </div>
        <button title="Menu" className="btn-trans size-16 rounded-md border-l-2 border-black group">
          <div className="btn-scale-xl" onClick={() => { if (chatData.chatState !== 'generating') { navigate('/'); } else { toastUtil.error('生成完成前不能跳转'); } }}>
            <HomeOutlined style={{ fontSize: "2.5rem" }} />
          </div>
        </button>
      </div> */}
      <Header
        // 返回按钮
        leadingBtn={
          <button title="Back" className="btn-trans size-16 rounded-md border-r-2 border-black group"
            onClick={() => { if (chatStatus !== 'generating') { navigate(-1); } else { toast.error('生成完成前不能跳转'); } }}>
            <div className="btn-scale-xl">
              <ArrowBack style={{ fontSize: "2.5rem" }} />
            </div>
          </button>
        }
        // 中间
        middleElement='GeekGen AI'
        // 菜单按钮
        trailingBtn={
          <button title="Menu" className="btn-trans size-16 rounded-md border-l-2 border-black group">
            <div className="btn-scale-xl"
              onClick={() => { if (chatStatus !== 'generating') { navigate('/'); } else { toast.error('生成完成前不能跳转'); } }}>
              <HomeOutlined style={{ fontSize: "2.5rem" }} />
            </div>
          </button>
        }
      />
      {/* 聊天区域 */}
      <ChatArea messages={chatMessages} />
      {/* 输入部分 */}
      <div className={`w-full fixed bottom-0 px-4 py-2 bg-white z-10 `}>
        {/* 预设提示词部分 */}
        <div className={`pb-4 flex gap-2 overflow-x-auto overflow-y-hidden hide-scrollbar transition-all duration-300
          ${promptTabOpen ? 'w-full h-[46px]' : 'size-0'}`}
          onWheel={(event) => { (event.currentTarget as HTMLDivElement).scrollLeft += event.deltaY * 0.5 }}>
          {
            Object.entries(promptMap).map(([key, value], index) =>
              <PromptButton key={index} text={key}
                onClick={() => { if (chatStatus !== 'generating') updateInput(value); }} />
            )
          }
        </div>
        {/* 针对对象 */}
        {
          locationState.objectsType &&
          <div className="flex gap-2">
            <div
              className={`w-full px-1.5 border-black rounded-md flex items-center gap-1 overflow-x-auto overflow-y-hidden hide-scrollbar duration-300
                ${promptTabOpen ? 'h-10 border-2 border-b-0 rounded-b-none' : 'h-0'}`}
              style={{ transitionProperty: 'height' }} onWheel={(event) => {
                (event.currentTarget as HTMLDivElement).scrollLeft += event.deltaY * 0.5
              }}>
              {/* 单词/句子 */}
              <span className="min-w-[35px] text-[16px]">{locationState.objectsType}: </span>
              {/* 针对对象 */}
              {
                locationState.objects.map((word, index) =>
                  <PromptObjectButton key={index} word={word}
                    onClick={() => { if (chatStatus !== 'generating') addInput(word); }}
                  />
                )
              }
            </div>
            {/* 间隔 */}
            <div className={`w-12 shrink-0 border-2 border-transparent duration-300 ${promptTabOpen ? 'h-[36px]' : 'h-0'}`}
              style={{ transitionProperty: 'height' }}>
            </div>
          </div>
        }
        {/* 输入框 */}
        <div className={`w-full ${chatInput.length >= 18 ? 'h-[68px]' : 'h-[44px]'} flex gap-2 items-center`}>
          <textarea className={`flex-1 px-1.5 py-1 rounded-md border-2 border-black hide-scrollbar text-[16px]
                    ${chatInput.length >= 18 ? 'h-[68px]' : 'h-[44px]'}
                    transition-all duration-500 ${promptTabOpen ? 'rounded-t-none' : ''}`}
            placeholder="有英语问题尽管问我~"
            disabled={chatStatus === "generating"}
            value={chatInput}
            onChange={(event) => {
              updateInput(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleSendButtonClick();
            }} />
          <SendButton chatStatus={chatStatus} onClick={handleSendButtonClick}></SendButton>
        </div>
      </div>
    </div>
  );
}