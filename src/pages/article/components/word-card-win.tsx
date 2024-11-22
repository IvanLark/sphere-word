import ListItem from "../../../common/components/item/list-item.tsx";
import DiscreteTabs from "../../../common/components/tabs/discrete-tabs.tsx";
import {WordCard} from "../../../common/components/card/word-card.tsx";
import SkipButton from "../../review/components/skip-button.tsx";
import DataCard from "../../../common/components/card/data-card.tsx";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef} from "react";
import {useWatcher} from "alova/client";
import {getWordData} from "../../../api/methods/word-data.methods.ts";
import ScreenLoading from "../../../common/components/loader/screen-loading.tsx";

interface WordCardWinProps {
  word: string;
  onScroll: (event: React.UIEvent) => void;
  onClick: () => void;
}

export default function WordCardWin({ word, onScroll, onClick }: WordCardWinProps) {
  const navigate = useNavigate();
  const wordCardWinRef = useRef(null);

  const {data, loading, error} = useWatcher(getWordData(word), [word], {immediate: true});

  useEffect(() => {
    if (wordCardWinRef.current) (wordCardWinRef.current as HTMLDivElement).scrollTop = 300;
  })

  if (error) {
    throw new Error('获取数据出错');
  }
  if (loading || data === undefined) {
    return <ScreenLoading/>;
  }

  // 中英释义Tabs
  const definitionTabs: Record<string, Array<string>> = {};
  if (data.core?.definition?.cn) Object.assign(definitionTabs, { '中英': data.core.definition.cn });
  if (data.core?.definition?.en) Object.assign(definitionTabs, { '英英': data.core.definition.en });

  // 表达关系Tabs
  const expressionTabs: Record<string, JSX.Element | JSX.Element[]> = {};
  if (data.relation?.Phrase) {
    Object.assign(expressionTabs, {
      '短语':
        data.relation.Phrase.slice(0, 10).map((item, index) =>
          <ListItem key={index} index={index} content={`${item.phrase} | ${item.meaning}`} />
        )
    })
  }
  if (data.relation?.Example) {
    Object.assign(expressionTabs, {
      '例句':
        data.relation.Example.slice(0, 10).map((item, index) =>
          <ListItem key={index} index={index} content={
            <>
              <p>{item.example}</p>
              <p>{item.translation}</p>
            </>
          } />
        )
    })
  }
  if (data.relation?.Collocation) {
    const collocationTabs: Record<string, Array<string>> = {};
    data.relation.Collocation.forEach(collocationItem => {
      Object.assign(collocationTabs, {
        // 用 [] 包裹键名，ES6
        [collocationItem.collocation]:
          collocationItem.phrases.map(phraseItem => `${phraseItem.phrase} | ${phraseItem.translation}`)
      });
    });
    Object.assign(expressionTabs, {
      '搭配': <>
        <div className="w-full h-[1px] bg-black mb-2">{/* 留空 */}</div>
        <DiscreteTabs<Array<string>> tabs={collocationTabs}>
          {(_, value) => value.map((phrase, index) => <ListItem index={index} content={phrase} />)}
        </DiscreteTabs>
      </>
    });
  }

  return (
    <div ref={wordCardWinRef} className="w-full h-[calc(100vh-4rem)] z-20 px-2 fixed left-0 top-16 snap-y snap-mandatory overflow-y-auto hide-scrollbar pointer-events-none"
         onScroll={onScroll} id="word-card-win">
      {/* 占位 */}
      <div id="scroll-container-start"
           className="w-full h-[calc(100vh-4rem)] flex- bg-transparent snap-start pointer-events-none">
      </div>
      <div className="w-[calc(100%-8px) w-full h-[300px relative bg-white snap-start rounded-lg border-2 border-black box-border pointer-events-auto">
        {/* 分割 */}
        <div className="h-[300px snap-end">
          {/* 装饰 */}
          <div className="w-full h-8 relative">
            <div className="w-56 h-4 rounded-full bg-gray-200 absolute left-1/2
              top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            </div>
          </div>
          {/* 顶部单词卡片 */}
          <WordCard word={word} data={data.core}
                    button={<SkipButton onClick={onClick}/>}/>
        </div>

        {/* Tabs */}
        <div className="mx-2">
          <div className="w-full h-fit min-h-[calc(100vh-4rem)] rounded-b-xl bg-white p-2">
            <div className="flex flex-col gap-5">
              {/* 释义 */}
              {
                Object.keys(definitionTabs).length > 0 &&
                <DataCard isLoading={false}>
                  <DiscreteTabs<Array<string>> tabs={definitionTabs} isLoading={false}
                                               showMore={() => {
                                                 navigate('/chat', {
                                                   state: {
                                                     objectsType: '单词',
                                                     objects: [word],
                                                     promptName: '释义'
                                                   }
                                                 })
                                               }}>
                    {(_, value) => value.map((meaning, index) =>
                      <ListItem key={index} index={index} content={meaning}></ListItem>
                    )}
                  </DiscreteTabs>
                </DataCard>
              }
              {/* 表达关系 */}
              {
                expressionTabs && Object.keys(expressionTabs).length > 0 &&
                <DataCard>
                  <DiscreteTabs<JSX.Element | JSX.Element[]> tabs={expressionTabs}
                                                             title='表达关系' showMore={(tabName) => {
                    navigate('/chat', {state: {objectsType: '单词', objects: [word], promptName: tabName}})
                  }}>
                    {(_, value) => value}
                  </DiscreteTabs>
                </DataCard>
              }
            </div>
          </div>
        </div>
        {/* 占位div */}
        <div className="w-full h-10"></div>
      </div>
    </div>
  );
}