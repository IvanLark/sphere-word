import {
  checkArticleKeep,
  getAdaptArticle,
  getAnalyzeArticle,
  getArticle, getChapter, getKeepArticle,
  getLinkArticle,
  getTranslateArticle, keepArticle
} from "../../api/methods/article.methods";
import SingleWordCard from "../../common/components/card/single-word-card";
import { useLocation, useNavigate } from "react-router-dom";
import { getDifficultyTag } from "./utils/text-process.util.ts";
import {useWatcher} from "alova/client";
import { ArticleLocationState } from "./types.ts";
import WordCardWin from "./components/word-card-win.tsx";
import Tooltip from "./components/tooltip.tsx";
import ModeSwitchButton from "./components/mode-switch-button.tsx";
import useArticleState, { Position } from "./hooks/use-article-state.ts";
import SelectModeWin from "./components/select-mode-win.tsx";
import ArticleText from "./components/article-text.tsx";
import React, {useEffect, useRef, useState} from "react";
import ScreenLoading from "../../common/components/loader/screen-loading.tsx";
import {ArrowBack} from "@mui/icons-material";
import axios from "axios";
import {toast} from "../../common/utils/toast.util.tsx";
import getSentenceString from "./utils/get-sentence-string.ts";
import getWordCount from "./utils/get-word-count.ts";
import CollectTrue from "../../common/components/icons/collect-true.tsx";
import CollectFalse from "../../common/components/icons/collect-false.tsx";
import getParagraphString from "./utils/get-paragraph-string.ts";
import {ArticleInfo} from "../../api/types/article.types.ts";

export default function Article() {

  const navigate = useNavigate();

  const {
    showSwitchModeWin, selectMode, showSelected, selectedItem, unselected, selectedPosition,
    reverseSwitchModeWinOpen, changeSelectMode, handleWordClick, handleSentenceClick,
    checkSelected, getChatLocationState, getSelectedItemId, showWordCardWin, handleParagraphClick
  } = useArticleState();

  const { type, article, level, positions, bookName }: ArticleLocationState = useLocation().state;

  let articleKey: string = '';
  if (type === 'id' || type === 'book' || type === 'keep') articleKey = article;
  else articleKey = article.slice(0, 50);

  // 翻译
  const savedTranslations = sessionStorage.getItem(`${articleKey}-translations`);
  const initTranslations = savedTranslations ? JSON.parse(savedTranslations) as Record<number, Array<string>> : {};
  const [translations, setTranslations] = useState<Record<string, Array<string>>>(initTranslations);

  const savedShowTranslate = sessionStorage.getItem(`${articleKey}-show-translate`);
  const initShowTranslate = savedShowTranslate ? JSON.parse(savedShowTranslate) as boolean : false;
  const [showTranslate, setShowTranslate] = useState<boolean>(initShowTranslate);

  // 高亮
  const savedHighlightPositions = sessionStorage.getItem(`${articleKey}-highlight-positions`);
  const initHighlightPositions = savedHighlightPositions ? JSON.parse(savedHighlightPositions) as Array<Position> : [];
  const [highlightPositions, setHighlightPositions] = useState<Array<Position>>(initHighlightPositions);

  // 第几页
  const savedPage = sessionStorage.getItem(`${articleKey}-page`);
  const initPage = savedPage ? Number(savedPage) : 0;
  const [page, setPage] = useState<number>(initPage);

  // 音频
  const savedShowAudio = sessionStorage.getItem(`${articleKey}-show-audio`);
  const initShowAudio = savedShowAudio ? JSON.parse(savedShowAudio) as boolean : false;
  const [showAudio, setShowAudio] = useState<boolean>(initShowAudio);

  // 收藏
  const savedCollected = sessionStorage.getItem(`${articleKey}-collected`);
  const initCollected = savedCollected ? JSON.parse(savedCollected) as boolean : false;
  const [collected, setCollected] = useState<boolean>(initCollected);

  const { data, error, loading, onSuccess } = useWatcher(() => {
    if (type === 'keep') {
      if (article.startsWith('book:')) {
        return getKeepArticle(`${article}:${page}`);
      } else {
        return getKeepArticle(article);
      }
    }
    else if (type === 'id') return getArticle(article);
    else if (type === 'text') return getAnalyzeArticle(article);
    else if (type === 'link') return getLinkArticle(article);
    else if (type === 'adapt') return getAdaptArticle(article, level as number);
    else if (type === 'translate') return getTranslateArticle(article, level as number);
    else {
      const part = article.split(':');
      return getChapter(part[0], part[1], page);
    }
  }, [page, article], {
    immediate: true
  });

  onSuccess(({data}) => {
    if (savedHighlightPositions === null && data.highlight !== undefined) {
      setHighlightPositions(data.highlight);
    }

    if ((type === 'id' || type === 'book') && page === 0) {
      checkArticleKeep(data.articleId as string).then(() => setCollected(true))
    }
  });

  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO setTimeout是无奈之举，因为useEffect执行时 articleRef 为 null
    setTimeout(() => {
      // 恢复
      const savedScrollY = sessionStorage.getItem(`article-${articleKey}-scroll-y`);
      if (savedScrollY !== null && articleRef.current) {
        articleRef.current.scrollTo({
          top: parseInt(savedScrollY, 10),
          //behavior: 'smooth'
        });
      }
    }, 100);
  }, []);

  function beforeSelected(target: HTMLElement) {
    const targetY = target.getBoundingClientRect().y;
    if (targetY > 250 && articleRef.current) {
      // gsap.to(articleRef.current, { duration: 0.5, scrollTo: { y: targetY - 250 } }).then(() => {

      // });
      articleRef.current.scrollBy({
        top: (targetY - 250),
        behavior: "smooth"
      });
    }
  }

  function saveScroll() {
    sessionStorage.setItem(`${articleKey}-page`, String(page));
    if (articleRef.current) {
      sessionStorage.setItem(`article-${articleKey}-scroll-y`, articleRef.current.scrollTop.toString());
    }
  }

  if (error) {
    throw new Error('获取数据出错');
  }
  if (loading || data === undefined) {
    return <ScreenLoading />;
  }

  function positionEqual (position1: Position, position2: Position) {
    return (
      position1[0] === position2[0] &&
      position1[1] === position2[1] &&
      position1[2] === position2[2] &&
      position1[3] === position2[3]
    );
  }

  function checkHighLight () {
    if (selectedPosition === null) return false;
    for (let i = 0; i < highlightPositions.length; i++) {
      const temp = highlightPositions[i];
      if (positionEqual(temp, selectedPosition)) {
        return true;
      }
    }
    return false;
  }

  function onHighLight () {
    if (selectedPosition !== null) {
      if (!checkHighLight()) {
        setHighlightPositions(prev => {
          const newValue = [...prev, selectedPosition];
          sessionStorage.setItem(`${articleKey}-highlight-positions`, JSON.stringify(newValue));
          return newValue;
        });
      } else {
        setHighlightPositions(prev => {
          const newValue = prev.filter(position => !positionEqual(position, selectedPosition));
          sessionStorage.setItem(`${articleKey}-highlight-positions`, JSON.stringify(newValue));
          return newValue;
        });
      }
    }
  }

  function getHighlightClass(position: Position) {
    // 用户自己高亮
    for (let i = 0; i < highlightPositions.length; i++) {
      if (positionEqual(highlightPositions[i], position)) {
        return 'bg-highlight-red text-white rounded-md';
      }
    }

    // 单词查询相应单词高亮
    if (positions !== undefined) {
      for (let i = 0; i < positions.length; i++) {
        if (
          positions[i].paragraphIndex === position[1] &&
          positions[i].sentenceIndex === position[2] &&
          positions[i].wordIndex === position[3]
        ) {
          return 'bg-yellow-600 text-white rounded-md';
        }
      }
    }

    return '';
  }

  function handleTranslate () {
    if (!Object.prototype.hasOwnProperty.call(translations, String(page))) {
      toast.info('正在获取翻译数据，请等待');
      const paragraphs = data.text.map(paragraph => ({
        text: paragraph.map(sentence => getSentenceString(sentence)).join(' ')
      }));
      axios.get<string>('https://edge.microsoft.com/translate/auth')
        .then(response => {
          const token = response.data;
          axios.post('https://api.cognitive.microsofttranslator.com/translate?from=en&to=zh-Hans&api-version=3.0&includeSentenceLength=true',
            paragraphs, {
              headers: {'Authorization': 'Bearer ' + token}
            }).then(response => {
              const translationsData = response.data.map((item: { translations: Array<{text: string}> }) => item.translations[0].text) as string[];
              setTranslations(prevState => {
                const nowValue = {...prevState};
                nowValue[String(page)] = translationsData;
                sessionStorage.setItem(`${articleKey}-translations`, JSON.stringify(nowValue));
                return nowValue;
              });
              sessionStorage.setItem(`${articleKey}-show-translate`, JSON.stringify(true));
              setShowTranslate(true);
          }).catch(() => toast.error('翻译失败，请重试'));
        }).catch(() => toast.error('翻译失败，请重试'));
    } else if (showTranslate) {
      sessionStorage.setItem(`${articleKey}-show-translate`, JSON.stringify(false));
      setShowTranslate(false);
    } else {
      sessionStorage.setItem(`${articleKey}-show-translate`, JSON.stringify(true));
      setShowTranslate(true);
    }
  }

  function handleKeep () {
    let keepType = 'input';
    if (type === 'id') keepType = 'essay';
    if (type === 'book') keepType = 'book';

    const keepData = {
      'type': keepType,
      'articleId': data.articleId,
      'title': data.title,
      'topic': data.topic,
      'wordCount': data.wordCount,
      'highlight': highlightPositions
    } as ArticleInfo;
    if (type !== 'id' && type !== 'book') keepData.text = data.text;
    keepArticle(keepData).then(() => {
      toast.info(type === 'keep' ? '保存成功' : '收藏成功');
      setCollected(true);
      sessionStorage.setItem(`${articleKey}-collected`, JSON.stringify(true));
    }).catch(() => {
      toast.error('收藏失败');
    });
  }

  if (type !== 'id') {
    if (!data.title) {
      data.title = `${getSentenceString(data.text[0][0].slice(0, 10))}......`;
    }
    const topicMap = {
      'text': '文本',
      'link': '链接',
      'adapt': '适配',
      'translate': '翻译',
      'book': `小说: ${bookName}`,
      'keep': '收藏'
    }

    if (!data.topic) {
      data.topic = topicMap[type];
    }
    if (!data.wordCount || (type === 'keep' && article.startsWith('book:'))) {
      data.wordCount = getWordCount(data.text);
    }
  }

  let timeTag = undefined;
  if (data.time) {
    const date = new Date(data.time * 1000);  // 将秒级时间戳转换为毫秒
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);  // 月份从 0 开始
    const day = String(date.getDate());
    timeTag = `${year}年${month}月${day}日`;
  }

  return <div id="article" className="overflow-y-auto relative" ref={articleRef}>
    {/* 顶部 */}
    <div className={`w-full  p-2 fixed z-10 bg-transparent flex gap-2 overflow-hidden pointer-events-none`}>
      {/* 返回按钮 */}
      <button title="Back" className="btn-scale btn-white size-12 rounded-md border-2
                                      border-black flex items-center justify-center group
                                      pointer-events-auto"
              onClick={() => {
                navigate(-1);
              }}>
        <div className="btn-scale-xl"><ArrowBack style={{fontSize: "2.5rem"}}/></div>
      </button>
      {/* 占位 */}
      <div className="flex-1 text-3xl flex items-start bg-transparent pointer-events-none"></div>
      {/* 切换按钮 */}
      <ModeSwitchButton text={selectMode} onClick={() => reverseSwitchModeWinOpen()}/>
    </div>

    {/* 翻译 */}
    <button className="fixed right-2 bottom-8 btn-scale btn-white size-12 rounded-md z-10
      border-2 border-black flex items-center justify-center group text-3xl pointer-events-auto"
      onClick={handleTranslate}>
      { showTranslate ? '隐' : '译' }
    </button>

    {/* 发音 */}
    <button className="fixed right-2 bottom-24 btn-scale btn-white size-12 rounded-md z-10
      border-2 border-black flex items-center justify-center group text-3xl pointer-events-auto"
            onClick={() => {
              if (showAudio) {
                setShowAudio(false);
                sessionStorage.setItem(`${articleKey}-show-audio`, JSON.stringify(false));
              }
              else {
                setShowAudio(true);
                sessionStorage.setItem(`${articleKey}-show-audio`, JSON.stringify(true));
              }
            }}>
      { showAudio ? '隐' : '音' }
    </button>

    {/* 收藏 */}
    <button className="fixed left-2 bottom-8 btn-scale btn-white size-12 rounded-md z-10
      border-2 border-black flex items-center justify-center group text-3xl pointer-events-auto"
            onClick={() => { handleKeep() }}>
      {
        type === 'keep' ? '存' : collected ?
        <CollectTrue className="size-10" /> : <CollectFalse className="size-10" />
      }
    </button>

    {/* AI */}
    <button className="fixed left-2 bottom-24 btn-scale btn-white size-12 rounded-md font-bold z-10
      border-2 border-black flex items-center justify-center group text-3xl pointer-events-auto"
            onClick={() => {
              saveScroll();
              navigate('/chat', {state: {
                objectsType: '文章',
                objects: [data.text.map(paragraph => getParagraphString(paragraph)).join(' ')]
              }});
            }}>
      AI
    </button>

    <div className={`w-full min-h-[calc(100vh-4rem)] p-8 my-10 bg-white rounded-lg shadow- flex flex-col gap-2`}>
      <SelectModeWin show={showSwitchModeWin} selectMode={selectMode} changeSelectMode={changeSelectMode}/>

      {
        !data.banner &&
        <div className={`w-full h-[10px]`}/>
      }

      {
        data.banner &&
        <img src={data.banner} alt=""
             className="w-full h-[calc(35vw)] my-4 object-cover border-4 border-black rounded-md"
             loading="lazy"/>
      }

      {/* 回到小说 */}
      {
        data.articleId && data.articleId.startsWith('book:') && type === 'keep' &&
        <button className="w-full mb-6 btn-scale btn-white size-12 border-2 border-black rounded-md"
                onClick={() => { saveScroll(); navigate('/read/book', { state: { bookId: data.articleId!.split(':')[1] } }); }}
        >
          回到{bookName ? `小说: ${bookName}` : data.topic}
        </button>
      }

      {data.title &&
        <h2 className="text-xl font-bold font-article">
          {
            (type === 'book' || article.startsWith('book:')) && page !== 0 ?
            `第${page+1}页` : data.title
          }
        </h2>
      }
      {data.subtitle && <h2 className="text-xl font-bold mb-2 ">{data.subtitle}</h2> }
      {
        (data.topic || data.wordCount || data.difficultyScore) &&
        <div className="flex flex-wrap gap-2">
          { data.topic && <SingleWordCard word={data.topic}/> }
          { data.difficultyScore && <SingleWordCard word={getDifficultyTag(data.difficultyScore)}/> }
          { data.wordCount && <SingleWordCard word={`${data.wordCount}词`}/> }
          { timeTag && <SingleWordCard word={timeTag}/> }
        </div>
      }

      {/* 分割虚线 */}
      {
        (data.banner || data.title || data.subtitle || data.topic || data.wordCount || data.difficultyScore) &&
        <div className="w-full -mx- mx-auto my-4 border-dashed border-black border-[1px]" />
      }

      <div className="h-full text-justify">
        <ArticleText text={data.text} selectMode={selectMode} checkSelected={checkSelected}
                     getHighlightClass={getHighlightClass}
                     handleWordClick={handleWordClick} handleSentenceClick={handleSentenceClick}
                     handleParagraphClick={handleParagraphClick}
                     beforeSelected={beforeSelected}
                     showAudio={showAudio}
                     showTranslate={showTranslate}
                     translations={translations}
                     page={page}
        />

        {/* 翻页按钮 */}
        {
          data.articleId && data.articleId.startsWith('book:') &&
          <div className="w-full h-12 mt-20 relative">
            {
              page !== 0 &&
              <button className="w-[40%] h-full rounded-md text-3xl border-black border-2 text-black
                  active:bg-black active:text-white absolute bottom-0 left-0"
                  onClick={() => {
                    if (articleRef.current) {
                      articleRef.current.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }
                    sessionStorage.setItem(`article-${articleKey}-scroll-y`, '0');
                    setShowTranslate(false);
                    sessionStorage.setItem(`${articleKey}-show-translate`, JSON.stringify(false));
                    setShowAudio(false);
                    sessionStorage.setItem(`${articleKey}-show-audio`, JSON.stringify(false));
                    setPage(prevState => prevState - 1);
                  }}
              >
                上一页
              </button>
            }
            {
              data.nextPage !== undefined && data.nextPage !== null &&
              <button className="w-[40%] h-full rounded-md text-3xl border-black border-2 text-black
                  active:bg-black active:text-white absolute bottom-0 right-0"
                  onClick={() => {
                    if (articleRef.current) {
                      articleRef.current.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }
                    sessionStorage.setItem(`article-${articleKey}-scroll-y`, '0');
                    setShowTranslate(false);
                    sessionStorage.setItem(`${articleKey}-show-translate`, JSON.stringify(false));
                    setShowAudio(false);
                    sessionStorage.setItem(`${articleKey}-show-audio`, JSON.stringify(false));
                    setPage(data.nextPage as number);
                  }}
              >
                下一页
              </button>
            }
          </div>
        }
        {/* 留空 */}
        <div className={`w-1 transition-all duration-300 h-[320px]`}></div>
      </div>

      {
        showWordCardWin && selectedItem &&
        <WordCardWin word={selectedItem}
                     onScroll={(event) => {
                       if (event.currentTarget.scrollTop === 0) unselected();
                     }}
                     onClick={onHighLight}
                     beforeSkip={saveScroll}
        />
      }
    </div>

    {
      articleRef.current &&
      <Tooltip showAi={showSelected} showHighlight={selectMode === '词' && showSelected}
               showQuery={showWordCardWin} showVoice={showSelected && selectMode !== '词'}
               targetId={getSelectedItemId()}
               checkHighLight={checkHighLight}
               onHighlightClick={onHighLight}
               onAiClick={() => {
                   saveScroll();
                   navigate('/chat', {state: getChatLocationState(data)});
                 }}
               onQueryClick={() => {
                 saveScroll();
                 navigate('/query', {state: {word: selectedItem}});
               }}
               onVoiceClick={() => {
                 new Audio(`http://dict.youdao.com/dictvoice?type=1&audio=${selectedItem}`).play();
               }}
      />
    }
  </div>
}