import React, { useState } from "react";
import {ArrowForward, HomeOutlined, SearchOutlined} from "@mui/icons-material";
import { checkWordExisted, getWordAutoComplete } from "../../../api/methods/word-search.methods.ts";
import { toast } from "../../../common/utils/toast.util.tsx";
import {useNavigate} from "react-router-dom";

export default function QueryBlank({ handleSearch }: { handleSearch: (newWord: string) => void }) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState<string>('');
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);

  function handleSearchChange(text: string) {
    text = text.trim();
    setSearchInput(text);
    if (text.length !== 0) {
      getWordAutoComplete(text).then(response => {
        setAutoCompleteList(response);
      });
    } else {
      setAutoCompleteList([]);
    }
  }

  function handleConfirm(word: string) {
    checkWordExisted(word).then(() => {
      handleSearch(word);
    }).catch((error: Error) => {
      console.log(error);
      toast.error('不好意思，词库里没有这个词');
    });
  }

  return (<>
    <div
      className="w-[500px] h-16 w-scree mx-auto flex gap-2 bg-white fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="size-16 p-3 h-full text-center text-lg rounded-md border-2 border-black">
        <SearchOutlined style={{fontSize: "2.5rem"}}/>
      </div>
      {/* 输入部分 */}
      <div
        className={`h-fi flex-1 flex flex-col rounded-md border-2 border-black ${autoCompleteList.length === 0 ? 'h-16' : 'h-fit'}`}>
        {/* 输入框 */}
        <div className="w-full h-16 shrink-0 fle items-center">
          <input type="text" placeholder="搜索单词..."
                 className={`w-full h-full bg-transparent outline-none flex-1 px-2 text-lg rounded-md`}
                 value={searchInput}
                 onChange={(e) => handleSearchChange(e.target.value)}
                 onKeyDown={(event) => {
                   if (event.key === 'Enter') {
                     handleConfirm(searchInput);
                   }
                 }}
          />
        </div>
        {/* auto complete */}
        {
          autoCompleteList.map((completedWord, index) =>
            <div className={`btn-white w-full p-2 border-t-2 border-black flex ${index === 0 ? 'border-x-' : ''}`}
                 onClick={() => {
                   handleSearch(completedWord);
                 }}
                 key={index}>
              <span className='flex-1'>{completedWord}</span>
              <ArrowForward fontSize='large'/>
            </div>
          )
        }
      </div>
    </div>
    {/* home按钮  TODO 优化 */}
    <div className={`w-full p-2 fixed z-10 bg-transparent flex gap-2 overflow-hidden`}
         style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
      <button className="btn-scale btn-white size-16 rounded-md border-2 border-black
													 flex items-center justify-center group"
              onClick={() => { navigate('/'); }}>
        <HomeOutlined style={{fontSize: "3rem"}}/>
      </button>
    </div>
  </>);
}