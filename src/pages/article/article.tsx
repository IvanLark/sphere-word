import {useEffect, useState} from "react";
import { getArticle } from "../../api/methods/article.methods";
import {WordData} from "../../api/types/word-data.types";
import SingleWordCard from "../../common/components/card/single-word-card";
import Header from "../../common/components/header";
import { useLocation, useNavigate } from "react-router-dom";
import { Close, Refresh } from "@mui/icons-material";
import {getDifficultyTag, isPunct, isWord} from "./utils/text-process.util.ts";
import { useRequest } from "alova/client";
import { Tooltip } from 'react-tooltip'
import { WordCard } from "../../common/components/card/word-card";
import { getWordData } from "../../api/methods/word-data.methods";
import {ArticleLocationState} from "./types.ts";
import {checkWordExisted} from "../../api/methods/word-search.methods.ts";
import {toast} from "../../common/utils/toast.util.tsx";
import SkipButton from "../review/components/skip-button.tsx";

export default function Article() {

  const navigate = useNavigate();

  type SelectMode = '词' | '句';
  const [selectMode, setSelectMode] = useState<SelectMode>('词');
  const [selectWinOpen, setSelectWinOpen] = useState(false);
  const [wordCardWinOpen, setWordCardWinOpen] = useState(false);
  type Position = [number, number, number];
  const [selectedPosition, setSelectedPosition] = useState<Position|null>(null);
  const [wordData, setWordData] = useState<WordData|null>(null);

  const { articleId, positions }: ArticleLocationState = useLocation().state;

  const { data, error, loading } = useRequest(getArticle(articleId));

  useEffect(() => {
    if (positions && data) {
      console.log('执行');
      positions.forEach(position => {
        const span = document.getElementById(`word-${position.paragraphIndex}-${position.sentence}-${position.wordIndex}`);
        if (span) {
          // TODO 不知道为什么修改无效
          span.style.background = 'yellow';
          span.style.color = 'white';
        }
      });
    }
  });

  if (error) {
    throw new Error('获取数据出错');
  }
  if (loading || data === undefined) {
    return (
      <div className="w-full min-h-[calc(100vh-4rem)] relative">
        {/* //!这两个类名必须分开不然transform冲突 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Refresh className="anim-rotate" style={{fontSize: "10rem"}}/>
        </div>
      </div>
    );
  }

  function handleWordClick (word: string, position: Position) {
    checkWordExisted(word).then(() => {
      setSelectedPosition(position);
      getWordData(word).then((data) => {
        setWordData(data);
        setWordCardWinOpen(true);
      });
    }).catch(() => {
      toast.error('不好意思，词库里没有这个词');
    });
  }

  function handleSentenceClick (position: Position) {
    setSelectedPosition(position);
  }

  function checkSelected (position: Position) {
    if (selectedPosition === null) {
      return false;
    }
    if (selectMode === '词') {
      return position[0] === selectedPosition[0] && position[1] === selectedPosition[1] && position[2] === selectedPosition[2];
    } else if (selectMode === '句') {
      return position[0] === selectedPosition[0] && position[1] === selectedPosition[1];
    }
  }

  function getSentenceString (words: Array<string>) {
    return words.reduce((curText, curWord, index) => {
      if (index === 0) {
        return curWord;
      }
      if (isPunct(curWord)) {
        return curText + curWord;
      } else {
        return curText + ' ' + curWord;
      }
    }, '');
  }

  function getSelectedItem () {
    if (selectedPosition === null) {
      return null;
    }
    if (selectMode === '词') {
      return {
        item: data.text[selectedPosition[0]][selectedPosition[1]][selectedPosition[2]],
        context: getSentenceString(data.text[selectedPosition[0]][selectedPosition[1]])
      };
    } else if (selectMode === '句') {
      return {
        item: getSentenceString(data.text[selectedPosition[0]][selectedPosition[1]]),
        context: data.text[selectedPosition[0]].slice(selectedPosition[1]-1, selectedPosition[1]+2).reduce(
          (curText, curWords) => {
            return curText + getSentenceString(curWords) + ' ';
          }
        , '')
      };
    }
  }

  function getChatLocationState () {
    if (selectMode === '词') {
      const { item, context } = getSelectedItem() as { item: string, context: string };
      return {
        objectsType: '单词',
        objects: [item],
        context: context
      }
    } else if (selectMode === '句') {
      const { item, context } = getSelectedItem() as { item: string, context: string };
      return {
        objectsType: '句子',
        objects: [item],
        context: context
      }
    }
  }

  function ArticleText() {
    return (<>{
      data?.text.map((paragraph, pIndex) => paragraph.map((sentence, sIndex) =>
        <span className={selectMode === '句' && checkSelected([pIndex, sIndex, -1]) ? "bg-lime-500 text-white rounded-md" : ""}
              onClick={() => { if (selectMode === '句') handleSentenceClick([pIndex, sIndex, -1]) }}>
          {
            sentence.map((word, wIndex) =>
              <span data-tooltip-id={checkSelected([pIndex, sIndex, wIndex]) ? 'highlight-word' : ''}
                    id={`word-${pIndex}-${sIndex}-${wIndex}`}
                    className={`w-fit ${selectMode === '词' && checkSelected([pIndex, sIndex, wIndex]) ? 'bg-lime-500 text-white rounded-md' : ''}`}
                    onClick={() => {
                      if (selectMode === '词' && isWord(word)) handleWordClick(word, [pIndex, sIndex, wIndex]);
                    }}>
                {isPunct(word) ? '' : ' '}{word}
              </span>
            )
          }
        </span>
      )).reduce((prev, curr) => [...prev, <div className="w-full h-3"></div>, ...curr])
    }</>);
  }

  function SelectModeSwitch() {
    return (
      <button title="SelectMode" className="btn-trans size-16 rounded-md border-l-2 border-black group"
              onClick={() => {
                setSelectWinOpen(!selectWinOpen);
              }}>
        <div className="btn-scale-xl text-2xl">
          {selectMode}
        </div>
      </button>
    );
  }

  function SelectModeWin () {
    return (
      <div
        className={`px-2 fixed right-0 top-16 overflow-hidden transition-all duration-300 ${selectWinOpen ? 'h-24' : 'h-0'}`}>
        {/* SelectWin */}
        <div className="bg-white rounded-md border-black border-2 overflow-hidden backdrop-blur-sm bg-opacity-50">
          <p className="w-full text-center">选择模式</p>
          <button
            className={`btn-scale w-full text-center transition-all duration-300 
                        ${selectMode === '词' ? 'bg-black text-white' : 'btn-trans bg-white text-black'}`}
            onClick={() => {
              setSelectMode('词');
              setSelectWinOpen(false);
            }}>
            选择单词
          </button>
          <button
            className={`btn-scale w-full text-center transition-all duration-300 
                        ${selectMode === '句' ? 'bg-black text-white' : 'btn-trans bg-white text-black'}`}
            onClick={() => {
              setSelectMode('句');
              setSelectWinOpen(false);
            }}>
            选择句子
          </button>
        </div>
      </div>
    );
  }

  function WordCardWin ({ data }: { data: WordData }) {
    return (
      <div
        className={`fixed bottom-0 overflow-hidden transition-all duration-300 ${wordCardWinOpen ? 'h-[250px]' : 'h-0'}`}>
        <button title="关闭"
                className="btn-scale btn-trans rounded-full absolute right-5 top-5 transition-all duration-300"
                onClick={() => setWordCardWinOpen(false)}><Close/></button>
        <WordCard word={getSelectedItem()!.item} data={data.core}
                  button={<SkipButton onClick={() => navigate('/query', { state: { word: getSelectedItem()!.item } })} />}/>
      </div>
    );
  }

  return <>
    <Header trailingBtn={<SelectModeSwitch/>}/>
    <div className={`w-full min-h-[calc(100vh-4rem)] p-8 my-4 bg-white rounded-lg shadow-md flex flex-col gap-2`}>
      <SelectModeWin/>

      <img src={data.banner} alt="" className="w-full h-[calc(35vw) object-cover" loading="lazy"/>

      <h2 className="text-2xl font-bold ">{data.title}</h2>
      <h2 className="text-2xl font-bold ">{data.subtitle}</h2>
      <div className="flex flex-wrap gap-2">
        <SingleWordCard word={data.topic}/>
        <SingleWordCard word={getDifficultyTag(data.difficultyScore)}/>
        <SingleWordCard word={`${data.wordCount}词`}/>
      </div>

      <div className="w-full -mx- mx-auto border-dashed border-black border-[1px]"></div>

      <div>
        <ArticleText/>
        <div className={`w-1 transition-all duration-300 ${wordCardWinOpen ? 'h-[280px]' : 'h-10'}`}></div>
      </div>

      <Tooltip id="highlight-word" clickable={true} openOnClick={true} className="p-0">
        <button className="w-full h-full"
                onClick={() => {
                  navigate('/chat', {state: getChatLocationState()})
                }}>
          问问AI
        </button>
      </Tooltip>

      {wordCardWinOpen && wordData && <WordCardWin data={wordData}/>}
    </div>
  </>
}