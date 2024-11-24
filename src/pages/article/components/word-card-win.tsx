import {WordCard} from "../../../common/components/card/word-card.tsx";
import React, {useEffect, useRef, useState} from "react";
import {useWatcher} from "alova/client";
import {getWordData} from "../../../api/methods/word-data.methods.ts";
import ScreenLoading from "../../../common/components/loader/screen-loading.tsx";
import {checkCollected, collectWord} from "../../../api/methods/review.methods.ts";
import {toast} from "../../../common/utils/toast.util.tsx";
import QueryDataCore from "../../query/pages/data/pages/query-data-core.tsx";
import QueryDataRelation from "../../query/pages/data/pages/query-data-relation.tsx";
import QueryDataAi from "../../query/pages/data/pages/query-data-ai.tsx";
import ContinuousTabs from "../../../common/components/tabs/continuous-tabs.tsx";
import CollectButton from "../../query/pages/data/components/collect-button.tsx";

interface WordCardWinProps {
  word: string;
  onScroll: (event: React.UIEvent) => void;
  onClick: () => void;
  beforeSkip: () => void;
}

export default function WordCardWin({ word, onScroll, onClick, beforeSkip }: WordCardWinProps) {

  const wordCardWinRef = useRef(null);

  const {data, loading, error} = useWatcher(getWordData(word), [word], {immediate: true});

  // 收藏
  const [isCollected, setCollected] = useState<boolean>(false);
  useWatcher(checkCollected(word), [word], {
    immediate: true
  }).onSuccess(() => { setCollected(true); })
    .onError(() => { setCollected(false); });

  function handleCollect() {
    onClick();
    collectWord(word).then(() => {
      toast.info('收藏成功');
      setCollected(true);
    }).catch((error: Error) => {
      toast.error(`收藏失败，${error.message}`);
    });
  }

  useEffect(() => {
    if (wordCardWinRef.current) (wordCardWinRef.current as HTMLDivElement).scrollTop = 300;
  })

  if (error) {
    throw new Error('获取数据出错');
  }
  if (loading || data === undefined) {
    return <ScreenLoading/>;
  }

  /* 子页面：单词详情，单词关系，AI解析，阅读材料 */
  const pageTabs: Record<string, React.ReactNode> = {
    '单词详情': <QueryDataCore word={word} data={data.core} isLoading={loading} beforeSkip={beforeSkip} />,
    '单词关系': <QueryDataRelation word={word} data={data.relation} handleSkipWord={() => {}} beforeSkip={beforeSkip} />
  };
  if (data.ai && (data.ai.Eudic || data.ai.DictionaryByGPT4)) {
    pageTabs['AI解析'] = <QueryDataAi data={data.ai} />;
  }

  return (
    <div ref={wordCardWinRef} className="w-full h-screen z-20 px-2 fixed left-0 top-0 snap-y snap-mandatory overflow-y-auto hide-scrollbar pointer-events-none"
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
                    button={
                      <CollectButton isCollected={isCollected} onClick={handleCollect}/>
                    }/>
        </div>

        {/* Tabs */}
        <div className="mx-2">
          <ContinuousTabs<React.ReactNode> tabs={pageTabs} isLoading={loading}>
            {
              (value) => <div className="min-h-[calc(100vh-4rem)]">{value}</div>
            }
          </ContinuousTabs>
          {/* 占位div */}
          <div className="w-full h-10 snap-end"></div>
          <div className="w-full h-10 snap-end"></div>
          <div className="w-full h-5 snap-end"></div>
        </div>
      </div>
    </div>
  );
}