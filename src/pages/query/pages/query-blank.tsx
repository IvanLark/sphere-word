import React, {useState} from "react";
import {ArrowForward, SearchOutlined} from "@mui/icons-material";
import {checkWordExisted, getWordAutoComplete} from "../../../api/methods/word-search.methods.ts";
import {toast} from "../../../common/utils/toast.util.tsx";

export default function QueryBlank ({handleSearch}: {handleSearch: (newWord: string) => void}) {

  const [searchInput, setSearchInput] = useState<string>('');
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);

  function handleSearchChange (text: string) {
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

  function handleConfirm (word: string) {
    checkWordExisted(word).then(() => {
      handleSearch(word);
    }).catch((error: Error) => {
      console.log(error);
      toast.error('不好意思，词库里没有这个词');
    });
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-white">
      <div className="flex items-center w-8/12 max-w-xs mx-auto">
        {/* 输入框 */}
        <div className="w-full pr-2 flex items-center rounded-md border-2 border-black">
          {/* label */}
          <div className="w-20 py-2 h-full text-center text-lg border-r-2 border-black">
            <SearchOutlined style={{fontSize: "2.5rem"}}/>
          </div>
          {/* input */}
          <input type="text" placeholder="搜索单词..."
                 className={`w-8/12 bg-transparent outline-none flex-1 pl-2 text-lg rounded-md`}
                 value={searchInput}
                 onChange={(e) => handleSearchChange(e.target.value)}
                 onKeyDown={(event) => {
                   if (event.key === 'Enter') { handleConfirm(searchInput); }
                 }}
          />
        </div>
        {/* 搜索按钮 */}
        <button className="border-black border-2 text-lg rounded-md"
          onClick={() => { handleConfirm(searchInput); }}>
          搜索
        </button>
      </div>
      {/* auto complete */}
      {
        autoCompleteList.map((completedWord, index) =>
          <div className={`btn-white w-full p-2 border-t-2 border-black flex ${index === 0 ? 'border-x-' : ''}`}
               onClick={ () => { handleSearch(completedWord); } }
               key={index}>
            <span className='flex-1'>{completedWord}</span>
            <ArrowForward fontSize='large' />
          </div>
        )
      }
    </div>
  );
}