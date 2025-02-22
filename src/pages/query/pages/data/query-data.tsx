import QueryDataCore from "./pages/query-data-core.tsx";
import QueryDataRelation from "./pages/query-data-relation.tsx";
import QueryDataAi from "./pages/query-data-ai.tsx";
import { WordCard } from "../../../../common/components/card/word-card.tsx";
import { toast } from "../../../../common/utils/toast.util.tsx";
import * as React from "react";
import ContinuousTabs from "../../../../common/components/tabs/continuous-tabs.tsx";
import { useWatcher } from "alova/client";
import { getWordData } from "../../../../api/methods/word-data.methods.ts";
import { checkCollected, collectWord } from "../../../../api/methods/review.methods.ts";
import { useState } from "react";
import CollectButton from "./components/collect-button.tsx";
import QueryDataArticle from "./pages/query-data-article.tsx";
import ScreenLoading from "../../../../common/components/loader/screen-loading.tsx";

/**
 * 单词数据页面
 * @param word
 * @param handleSkipWord
 * @constructor
 */

interface QueryDataProps {
  word: string;
  handleSkipWord: (newWord: string, relationType: string, relationLabel?: string) => void;
}

export default function QueryData({ word, handleSkipWord }: QueryDataProps) {
  // 单词core数据
  const { data, loading, error } = useWatcher(
    getWordData(word), [word], {
    immediate: true
  });

  // 收藏
  const [isCollected, setCollected] = useState<boolean>(false);
  useWatcher(checkCollected(word), [word], {
    immediate: true
  }).onSuccess(() => { setCollected(true); })
    .onError(() => { setCollected(false); });

  function handleCollect() {
    collectWord(word).then(() => {
      toast.info('收藏成功');
      setCollected(true);
    }).catch((error: Error) => {
      toast.error(`收藏失败，${error.message}`);
    });
  }

  /* 请求失败时 */
  if (error) {
    throw new Error('获取数据出错');
  }

  /* 加载数据时 TODO 完善 */
  if (loading || data === undefined) {
    return <ScreenLoading />;
  }

  /* 子页面：单词详情，单词关系，AI解析，阅读材料 */
  const pageTabs: Record<string, React.ReactNode> = {
    '单词详情': <QueryDataCore word={word} data={data.core} isLoading={loading}></QueryDataCore>,
    '单词关系': <QueryDataRelation word={word} data={data.relation} handleSkipWord={handleSkipWord}></QueryDataRelation>
  };
  if (data.ai && (data.ai.Eudic || data.ai.DictionaryByGPT4)) {
    pageTabs['AI解析'] = <QueryDataAi data={data.ai} ></QueryDataAi>;
  }
  if (data.article && data.article.length > 0) {
    pageTabs['阅读材料'] = <QueryDataArticle data={data.article}></QueryDataArticle>;
  }

  /* 请求中和请求成功用同一个JSX */
  return (
    <div className="w-full h-[calc(100vh)] px-2 relativ z-10 snap-y snap-mandatory overflow-y-auto hide-scrollbar pointer-events-auto">
      <div id="scroll-container-start"
        className="w-full h-[calc(100vh-300px)] h-ful flex- bg-transparent snap-star pointer-events-none">
      </div>
      <div
        className="w-[calc(100%-8px) w-full h-[300px relative z-10 bg-white snap-start rounded-lg border-2 border-black box-borde pointer-events-auto">

        {/* 分割 */}
        <div className="h-[300px snap-end">
          {/* 装饰 */}
          <div className="w-full h-8 relative">
            <div className="w-56 h-4 rounded-full bg-gray-200 absolute left-1/2
              top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            </div>
          </div>
          {/* 顶部单词卡片 */}
          <WordCard word={word} data={data.core} isLoading={loading}
            button={
              <CollectButton isCollected={isCollected} onClick={handleCollect} />
            }
          />
        </div>

        {/* Tabs */}
        <div className="mx-2">
          <ContinuousTabs<React.ReactNode> tabs={pageTabs} isLoading={loading} id="query-data">
            {
              (value) => <div className="min-h-[calc(100vh)]">{value}</div>
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