import { Edge, Node } from "../types.ts";
import { useState } from "react";
import QueryDataCore from "./core";
import QueryDataRelation from "./relation";
import QueryDataAi from "./ai";
import { Word } from "./Word.tsx";
import { testWordCoreData } from "../../constants.ts";
import { useGetWordCore } from "../api.ts";
import Tabs from "../../components/Tabs.tsx";
import { toast } from "../../utils/toast.ts";

interface QueryDataProps {
  word: string;
  handleSkipWord: (word: string, nodes: Array<Node>, edges: Array<Edge>) => void;
}

/**
 * 单词数据页面
 * @param word
 * @param handleSkipWord
 * @constructor
 */
export default function QueryData({ word, handleSkipWord }: QueryDataProps) {
  word = 'make';
  // const data: typeof testWordCoreData | undefined = undefined;
  // const { isPending, isError, isSuccess, data, error } = testWordCoreData;
  const { isPending: not, isError, isSuccess, data, error } = useGetWordCore(word);
  const [pickedPageIndex, setPickedPageIndex] = useState(0);
  const isPending = false;
  // td to delete

  // td to delete
  if (true || isError) toast('无法获取单词数据', 'error')

  function TabPage() {
    switch (pickedPageIndex) {
      case 0: // 单词详情页面
        return <QueryDataCore word={word} data={data} isPending={isPending}></QueryDataCore>;
      case 1: // 单词关系页面
        return <QueryDataRelation word={word}></QueryDataRelation>;
      case 2:
        return <QueryDataAi word={word}></QueryDataAi>
      default:
        return <></>;
    }
  }


  return (
    <div className="w-screen h-screen snap-y snap-mandatory overflow-y-auto">
      {/* // !md在h-[100vh-100px]这里掉坑好多次了…… */}
      {/* <div className="w-screen h-[calc(100vh-280px)] bg-transparent snap-end pointer-events-none"></div> */}
      {/* // **snap占位div */}
      <div className="w-screen h-[calc(100vh-300px)] flex- bg-transparent snap-start pointer-events-none"></div>
      {/* <div className="w-screen min-h-screen px- relative bg-gray-100 snap-start"> */}
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
          <Word word={word} pron={data?.pron} meanings={data?.simpleMeaning} tags={data?.tags} exchange={data?.exchange} favourite={false} loading={isPending} />
        </div>


        {/* Tabs选项 */}
        {/* // td 暂时搞不了sticky…… */}
        {/* <div className="sticky"> */}
        <Tabs tabs={['单词详情', '单词关系', 'AI解析', '阅读材料']} tabIndex={pickedPageIndex} setTabIndex={setPickedPageIndex} loading={isPending} />
        {/* </div> */}
        {/* Tab页面 */}
        <div className="min-h-screen">
          <TabPage />
        </div>
        {/* </div> */}
      </div>
    </div >
    // </div >
  );
}