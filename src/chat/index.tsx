import { ArrowBack, Close, Home, HomeOutlined, Menu, Send, Stop, StopCircle } from "@mui/icons-material";
import { useState } from "react";
import ChatArea from "./chat_area/ChatArea";
import WordCard from "../components/WordCard";

/**
 * AI对话页面
 * @constructor
 */
type ChatState = 'empty' | 'inputing' | 'gernerating' | 'error';
export default function Chat() {
  const [chatState, setChatState] = useState<ChatState>("empty");
  const [inputText, setInputText] = useState("");

  const [promptTabOpen, setPromptTabOpen] = useState(false);
  const [promptTabElements, setPromptTabElements] = useState<string[]>(['make', 'case']);
  const prompts = { '生活场景': '$word在生活场景中有什么应用？', '起源历史': '$word的起源历史是什么？', '词根词缀': '$word的词根词缀是什么？', '新闻事件': '最近关于$word有什么新闻事件？' }

  function handleInputTextChange(text: string) {
    setInputText(text);
    if (text.trim() === "") setChatState("empty");
    else setChatState("inputing");
  }
  function handleInputButtonClick() {
    if (chatState === "empty") {
      setPromptTabOpen(!promptTabOpen);
    }
    else if (chatState === "inputing")
      setChatState("gernerating");
    else if (chatState === "gernerating")
      setChatState("inputing");
  }

  function promptTabElementCard(word: string) {
    return <span className='px-2 border-2 border-black rounded-md shrink-0 '>
      {word}
      <button title="delete" className="btn-scale btn-trans size-6 ml-2 rounded-full" onClick={() => setPromptTabElements(promptTabElements.filter(w => w !== word))}><Close /></button>
    </span>
  }

  return (
    <div className="w-screen h-[calc(100vh-100px)] flex flex-col">
      <div className="w-full h-16 fixed rounded-md border-2 border-black bg-white flex overflow-hidden">
        <button className="btn-trans size-16 rounded-md border-r-2 border-black group"><div className="btn-scale-xl"><ArrowBack style={{ fontSize: "40px" }} /></div></button>
        <div className="flex-1">
          {/* // td to fill */}
        </div>
        <button className="btn-trans size-16 rounded-md border-l-2 border-black group"><div className="btn-scale-xl"><HomeOutlined style={{ fontSize: "40px" }} /></div></button>
      </div>
      <div className="w-screen h-16 shrink-0">nothing here</div>
      <ChatArea />
      {/* // ! 哇趣这里向上展开有点难实现……用了取巧的方式 */}
      {/* // ! md想起来fixed以后又花了大力气才回到现在这个效果 */}
      <div className="w-screen h-44 shrink-0">nothing here</div>
      <div className={`w-full fixed bottom-[100px] px-4 py-2 bg-white z-10 `}>
        <div className={`py-1 flex gap-2 overflow-hidden transition-all duration-300 ${promptTabOpen ? 'w-full h-8' : 'size-0'}`}>
          {Object.entries(prompts).map(([key, value]) => <WordCard key={key} word={key} className={`btn-scale btn-trans ${!promptTabOpen && 'border-0'}`} onClick={() => {
            if (promptTabElements.length === 0) return
            handleInputTextChange(value.replace("$word", promptTabElements.join(", ")));
            setInputText(value.replace("$word", promptTabElements.join(", ")))
          }} />)}
        </div>
        <div className="flex gap-2">
          <div className={`w-full px-3 border-black rounded-md flex items-center gap-2 overflow-hidden duration-300 ${promptTabOpen ? 'h-12 border-2 border-b-0 rounded-b-none' : 'h-0'}`} style={{ transitionProperty: 'height' }}>
            <span className="">单词/句子: </span>
            {promptTabElements.map(word => promptTabElementCard(word))}
          </div>
          <div className={`w-12 shrink-0 border-2 border-transparent duration-300 ${promptTabOpen ? 'h-12' : 'h-0'}`} style={{ transitionProperty: 'height' }}></div>
          {/* // !tailwind的duration动画曲线和默认easeinout不同……最好统一 */}
        </div>
        <div className={`w-full h-12 flex gap-2 items-center`}>
          <textarea type="text" className={`flex-1 h-12 p-3 rounded-md border-2 border-black hide-scrollbar transition-all duration-300 ${promptTabOpen ? 'rounded-t-none' : ''}`} placeholder="有英语问题尽管问我~" disabled={chatState === "gernerating"} value={inputText} onChange={(event) => { handleInputTextChange(event.target.value) }} />
          <button className="btn-scale-xl btn-common-hover size-12 rounded-md border-2 border-black" onClick={handleInputButtonClick}>
            {chatState === "empty" ? <Menu style={{ fontSize: "40px" }} /> : chatState === "inputing" ? <Send style={{ fontSize: "40px" }} /> : chatState === "gernerating" ? <StopCircle style={{ fontSize: "40px" }} /> : "出错了"}

          </button>
        </div>
      </div>

    </div>
  );
}