import QueryDataCore from "./core";
import QueryDataRelation from "./relation";
import QueryDataAi from "./ai";
import { WordCard } from "./components/card/WordCard.tsx";
import { useGetWordCore } from "../api.ts";
import { toast } from "../../utils/toast.tsx";
import * as React from "react";
import ContinuousTabs from "./components/tabs/ContinuousTabs.tsx";

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
  const { isPending, isError, data } = useGetWordCore(word);

  /* 请求失败时 */
  if (isError) {
    toast.error('无法获取单词数据')
    // TODO Error时返回的页面
    return (<></>);
  }

  /* 子页面：单词详情，单词关系，AI解析，阅读材料 */
  type TabName = '单词详情' | '单词关系' | 'AI解析';
  const pageTabs: Record<TabName, React.ReactNode> = {
    '单词详情': <QueryDataCore word={word} data={data} isLoading={isPending}></QueryDataCore>,
    '单词关系': <QueryDataRelation word={word} handleSkipWord={handleSkipWord}></QueryDataRelation>,
    'AI解析': <QueryDataAi word={word}></QueryDataAi>
  };

  /* 请求中和请求成功用同一个JSX */
  return (
    <div className="w-full h-[calc(100vh-4rem)] px-2 relativ z-10 snap-y snap-mandatory overflow-y-auto hide-scrollbar">
      {/* id="scroll-container-word"  */}
      {/* // **snap占位div */}
      <div id="scroll-container-start" className="w-full h-[calc(100vh-400px)] flex- bg-transparent
        snap-start pointer-events-none"></div>
      <div className="w-[calc(100%-8px) w-full h-[300px relative z-10 bg-white snap-start rounded-lg border-2 border-black box-borde">

        {/* 分割 */}
        <div className="h-[300px] snap-end">
          <div className="w-full h-8 relative">
            <div className="w-56 h-4 rounded-full bg-gray-200 absolute left-1/2
              top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          {/* 顶部单词卡片 */}
          <WordCard word={word} data={data} isCollected={false} isLoading={isPending} />
        </div>

        {/* Tabs */}
        {/* // TODO 暂时搞不了sticky…… */}
        <div className="mx-2">
          <ContinuousTabs<React.ReactNode> tabs={pageTabs} isLoading={isPending}>
            {
              (value) => <div className="min-h-[calc(100vh-4rem)]">{value}</div>
            }
          </ContinuousTabs>
        </div>
      </div>
    </div>
  )
    ;
}