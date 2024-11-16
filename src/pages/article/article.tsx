import { useEffect, useMemo, useState } from "react";
import { getArticle } from "../../api/methods/article.methods";
import { Article as ArticleType } from "../../api/types/article.types";
import { WordArticle } from "../../api/types/word-data.types";
import SingleWordCard from "../../common/components/card/single-word-card";
import Header from "../../common/components/header";
import { useLocation, useNavigate } from "react-router-dom";
import { Close, More, Refresh } from "@mui/icons-material";
import { getWordTag, isPunct } from "../../common/utils/text-process";
import { useRequest, useWatcher } from "alova/client";
import { Tooltip } from 'react-tooltip'
import { WordCard } from "../../common/components/card/word-card";
import { getWordData } from "../../api/methods/word-data.methods";

// !自己搞个类型吧()
type SelectWord = {
  word: string;
  position: [number, number, number];
}
export default function Article() {
  const [selectWord, setSelectWord] = useState(true);
  const [selectWinOpen, setSelectWinOpen] = useState(false);
  const [wordCardWinOpen, setWordCardWinOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<SelectWord[]>([]);

  const navigate = useNavigate();

  const { articleId, position }: { articleId: string; position: string } = useLocation().state;
  // const [article, setArticle] = useState<ArticleType>();
  // useEffect(() => {
  // getArticle(articleId).then((data) => { setArticle(data) }).catch((error) => { throw error; });
  // })
  const { data: article, error_article, loading_article } = useRequest(getArticle(articleId));
  const { data: wordData, error_worddata, loading_worddata } = useWatcher(
    getWordData('make'), ['make'], {
    immediate: true
  });
  // !用reduce可以类似join的效果
  const articleContent = useMemo(() => article?.text.map((paragraph, p_index) => paragraph.map((sentence, s_index) => sentence.map((word, w_index) =>

    // TODO 数据结构和选中逻辑等你实现了，自行替换true
    <span data-tooltip-id={true && !isPunct(word) ? 'hightlight-word' : ''} id={`word-${p_index}-${s_index}-${w_index}`} className={`w-fit ${true ? 'bg-lime-500 text-white' : ''}`} onClick={() => { if (true && !isPunct(word)) setWordCardWinOpen(true); }} >{isPunct(word) ? '' : ' '}{word}</span>)))
    .reduce((prev, curr) => [...prev, [<div className="w-full h-3"></div>], ...curr])
    , [article])
  // .join('');

  function SelectModeSwitch() {
    return (
      <button title="SelectMode" className="btn-trans size-16 rounded-md border-l-2 border-black group" onClick={() => {
        setSelectWinOpen(!selectWinOpen)
      }}>
        <div className="btn-scale-xl text-2xl" >
          {selectWord ? '词' : '句'}
        </div>
      </button>
    )
  }

  return <>
    <Header trailingBtn={<SelectModeSwitch />} />
    {article ?
      <div className={`w-full min-h-[calc(100vh-4rem)] p-8 my-4 bg-white rounded-lg shadow-md flex flex-col gap-2`}>
        <div className={`px-2 fixed right-0 top-16 overflow-hidden transition-all duration-300 ${selectWinOpen ? 'h-24' : 'h-0'}`}>
          {/*// ** selectWin */}
          <div className="bg-white rounded-md border-black border-2 overflow-hidden backdrop-blur-sm bg-opacity-50">
            <p className="w-full text-center">选择模式</p>
            <button className={`btn-scale w-full text-center transition-all duration-300 ${selectWord ? 'bg-black text-white' : 'btn-trans bg-white text-black'}`} onClick={() => { setSelectWord(true); setSelectWinOpen(false) }}>选择单词</button>
            <button className={`btn-scale w-full text-center transition-all duration-300 ${!selectWord ? 'bg-black text-white' : 'btn-trans bg-white text-black'}`} onClick={() => { setSelectWord(false); setSelectWinOpen(false) }}>选择句子</button>
          </div>
        </div>

        <h2 className="text-2xl font-bold ">{article.title}</h2>
        <h2 className="text-2xl font-bold ">{article.subtitle}</h2>
        <div className="flex flex-wrap gap-2">
          <SingleWordCard word={article.topic} />
          <SingleWordCard word={getWordTag(article.difficultyScore)} />
          <SingleWordCard word={`${article.wordCount}词`} />
        </div>
        <img src={article.banner} alt="" className="w-full h-[calc(40vw) object-cover" loading="lazy" />
        {/* <p className="">{article.text.map((</p> */}
        {/* //!此处padding放到外面无法生效 */}
        <div >
          {articleContent}
          <div className={`w-1 transition-all duration-300 ${wordCardWinOpen ? 'h-[250px]' : 'h-10'}`}></div>
        </div>
        <Tooltip id="hightlight-word" clickable={true} openOnClick={true} className="p-0"><button className="w-full h-full" onClick={() => { navigate('/chat',) }}>问问AI</button></Tooltip>
        <div className={`fixed bottom-0 overflow-hidden transition-all duration-300 ${wordCardWinOpen ? 'h-[250px]' : 'h-0'}`}>
          <button title="关闭" className="btn-scale btn-trans rounded-full absolute right-5 top-5 transition-all duration-300" onClick={() => setWordCardWinOpen(false)}><Close /></button>
          <WordCard word={'make'} data={wordData.core} />
        </div>
      </div> :
      <div className="w-full min-h-[calc(100vh-4rem)] relative">
        {/* //!这两个类名必须分开不然transform冲突 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><Refresh className="anim-rotate" style={{ fontSize: "10rem" }} /></div>
      </div>
    }
  </>
}