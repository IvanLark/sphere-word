import { Edge, Node } from "../types.ts";
import QueryDataCore from "./core";
import QueryDataRelation from "./relation";
import QueryDataAi from "./ai";
import { WordCard } from "./components/card/WordCard.tsx";
import { useGetWordCore } from "../api.ts";
import { toast } from "../../utils/toast.ts";
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
  const { isPending, isError, isSuccess, data, error } = useGetWordCore(word);

  /* 请求失败时 */
  if (isError) {
    toast('无法获取单词数据', 'error')
    // TODO Error时返回的页面
    return (<></>);
  }

  /* 子页面：单词详情，单词关系，AI解析，阅读材料 */
  type TabName = '单词详情' | '单词关系' | 'AI解析';
  const pageTabs: Record<TabName, React.ReactNode> = {
    '单词详情': <QueryDataCore data={data} isLoading={isPending}></QueryDataCore>,
    '单词关系': <QueryDataRelation word={word} handleSkipWord={handleSkipWord}></QueryDataRelation>,
    'AI解析': <QueryDataAi word={word}></QueryDataAi>
  };

  /* 请求中和请求成功用同一个JSX */
  return (
    <div className="w-screen h-[calc(100vh-100px)] snap-y snap-mandatory overflow-y-auto">
      {/* // !md在h-[100vh-100px]这里掉坑好多次了…… */}
      {/* <div className="w-screen h-[calc(100vh-280px)] bg-transparent snap-end pointer-events-none"></div> */}
      {/* // **snap占位div */}
      <div className="w-screen h-[calc(100vh-400px)] flex- bg-transparent
        snap-start pointer-events-none"></div>
      {/* <div className="w-screen min-h-[calc(100vh-100px)] px- relative bg-gray-100 snap-start"> */}
      {/* <div className="relative"> */}
      {/* //!fc为什么不生效className="bg-gray-100 " md漏了relative呗背景覆盖了……*/}
      <div className="h-[300px relative bg-gray-100 snap-start">
        {/* // !好像兜回到一开始的设计了…… */}

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
        {/* // td 暂时搞不了sticky…… */}
        {/* <div className="sticky"> */}
        <ContinuousTabs<React.ReactNode> tabs={pageTabs} isLoading={isPending}>
          {
            (value) => <div className="min-h-[calc(100vh-100px)]">{value}</div>
          }
        </ContinuousTabs>
      </div>
    </div>
  )
    ;
}