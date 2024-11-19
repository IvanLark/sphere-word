import { getArticle } from "../../api/methods/article.methods";
import SingleWordCard from "../../common/components/card/single-word-card";
import Header from "../../common/components/header";
import { useLocation, useNavigate } from "react-router-dom";
import {Refresh} from "@mui/icons-material";
import { getDifficultyTag } from "./utils/text-process.util.ts";
import { useRequest } from "alova/client";
import { ArticleLocationState } from "./types.ts";
import WordCardWin from "./components/word-card-win.tsx";
import AiTooltip from "./components/ai-tooltip.tsx";
import ModeSwitchButton from "./components/mode-switch-button.tsx";
import useArticleState, {Position} from "./hooks/use-article-state.ts";
import SelectModeWin from "./components/select-mode-win.tsx";
import ArticleText from "./components/article-text.tsx";
import {useEffect, useRef} from "react";
import ScreenLoading from "../../common/components/loader/screen-loading.tsx";

export default function Article() {

  const navigate = useNavigate();

  const {
    showSwitchModeWin, selectMode, showSelected, selectedItem, unselected,
    openSwitchModeWin, changeSelectMode, handleWordClick, handleSentenceClick,
    checkSelected, getChatLocationState, getSelectedItemId
  } = useArticleState();

  const showWordCardWin = selectMode === '词' && showSelected;

  const { articleId, positions }: ArticleLocationState = useLocation().state;

  const { data, error, loading } = useRequest(getArticle(articleId));

  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO setTimeout是无奈之举，因为useEffect执行时 articleRef 为 null
    setTimeout(() => {
      // 恢复
      const savedScrollY = sessionStorage.getItem(`article-${articleId}-scroll-y`);
      if (savedScrollY !== null && articleRef.current) {
        articleRef.current.scrollTo(0, parseInt(savedScrollY, 10));
      }
    }, 150);
  }, []);

  function beforeSelected (target: HTMLElement) {
    const targetY = target.getBoundingClientRect().y;
    if (targetY > 250 && articleRef.current) {
      articleRef.current.scrollBy({
        top: (targetY - 250)
        //behavior: "smooth"
      });
    }
  }

  function saveScroll () {
    if (articleRef.current) {
      sessionStorage.setItem(`article-${articleId}-scroll-y`, articleRef.current.scrollTop.toString());
    }
  }

  if (error) {
    throw new Error('获取数据出错');
  }
  if (loading || data === undefined) {
    return <ScreenLoading/>;
  }

  function getHighlightClass (position: Position) {
    if (positions === undefined) return '';
    for (let i = 0; i < positions.length; i++) {
      if (
        positions[i].paragraphIndex === position[0] &&
        positions[i].sentenceIndex === position[1] &&
        positions[i].wordIndex === position[2]
      ) {
        return 'bg-yellow-600 text-white rounded-md';
      }
    }
    return '';
  }

  return <div id="article" className="overflow-y-auto relative" ref={articleRef}>
    <Header trailingBtn={<ModeSwitchButton text={selectMode} onClick={() => openSwitchModeWin()}/>}/>
    <div className={`w-full min-h-[calc(100vh-4rem)] p-8 my-6 bg-white rounded-lg shadow- flex flex-col gap-2`}>
      <SelectModeWin show={showSwitchModeWin} selectMode={selectMode} changeSelectMode={changeSelectMode} />

      <img src={data.banner} alt="" className="w-full h-[calc(35vw)] my-4 object-cover border-4 border-black rounded-md" loading="lazy" />

      <h2 className="text-2xl font-bold ">{data.title}</h2>
      <h2 className="text-2xl font-bold ">{data.subtitle}</h2>
      <div className="flex flex-wrap gap-2">
        <SingleWordCard word={data.topic} />
        <SingleWordCard word={getDifficultyTag(data.difficultyScore)} />
        <SingleWordCard word={`${data.wordCount}词`} />
      </div>

      {/* 分割虚线 */}
      <div className="w-full -mx- mx-auto my-4 border-dashed border-black border-[1px]"></div>

      <div className="h-full">
        <ArticleText data={data} selectMode={selectMode} checkSelected={checkSelected} getHighlightClass={getHighlightClass}
                     handleWordClick={handleWordClick} handleSentenceClick={handleSentenceClick} beforeSelected={beforeSelected} />
        <div className={`w-1 transition-all duration-300 ${showWordCardWin ? 'h-[280px]' : 'h-10'}`}></div>
      </div>

      {
        showWordCardWin && selectedItem &&
        <WordCardWin word={selectedItem}
                     onScroll={(event) => { if (event.currentTarget.scrollTop === 0) unselected(); }}
                     onClick={() => { saveScroll(); navigate('/query', {state: {word: selectedItem}}); }}
        />
      }
    </div>

    <AiTooltip show={showSelected} targetId={getSelectedItemId()} scrollY={articleRef.current!.scrollTop}
               onClick={() => { saveScroll(); navigate('/chat', { state: getChatLocationState(data) }); }}/>
  </div>
}