import { Edge, Node } from "../types.ts";
import { useState } from "react";
import QueryDataCore from "./core";
import QueryDataRelation from "./relation";
import QueryDataAi from "./ai";
import { Word } from "./core/Word.tsx";
import { testWordCoreData } from "../../constants.ts";

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
  const { isPending, isError, isSuccess, data, error } = testWordCoreData;
  // const { isPending, isError, isSuccess, data, error } = useGetWordCore(word);
  const [pickedPageIndex, setPickedPageIndex] = useState(0);

  function TabPage() {
    switch (pickedPageIndex) {
      case 0: // 单词详情页面
        return <QueryDataCore word={word} data={data}></QueryDataCore>;
      case 1: // 单词关系页面
        return <QueryDataRelation word={word}></QueryDataRelation>;
      case 2:
        return <QueryDataAi word={word}></QueryDataAi>
      default:
        return <></>;
    }
  }

  const TabOptions: string[] = ['单词详情', '单词关系', 'AI解析', '阅读材料']

  return (
    <div className="w-screen h-[calc(100vh-100px)] snap-y snap-mandatory overflow-y-auto">
      {/* // !md在h-[100vh-100px]这里掉坑好多次了…… */}
      {/* <div className="w-screen h-[calc(100vh-280px)] bg-transparent snap-end pointer-events-none"></div> */}
      {/* // **snap占位div */}
      <div className="w-screen h-[calc(100vh-400px)] flex- bg-transparent snap-start pointer-events-none"></div>
      {/* <div className="w-screen min-h-[calc(100vh-100px)] px- relative bg-gray-100 snap-start"> */}
      <div className="relative bg-gray-100">
        {/* //!fc为什么不生效className="bg-gray-100 " md漏了relative呗背景覆盖了……*/}
        <div className="h-[300px] relative snap-start">
          {/* 分割 */}
          <div className="w-full h-8 relative">
            <div className="w-56 h-4 rounded-full bg-gray-200 absolute left-1/2
          top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <Word word={word} pron={data?.pron} meanings={data?.simpleMeaning} tags={data?.tags} exchange={data?.exchange} favourite={false} />
        </div>


        {/* Tabs选项 */}
        <ul className="w-full flex">
          {
            TabOptions.map((tab, index) =>
              <li
                className={`btn-common-hover text-xl py-3 flex-1 text-center rounded-md list-none transition-all duration-300 ${index === pickedPageIndex ? 'text-white bg-black' : ''} `}
                onClick={() => { setPickedPageIndex(index) }}>
                {tab}
              </li>
            )
          }
          {/* //~~这个居然要手动指定h-fit……咳咳是上面ul搞了h-24…… */}
        </ul>
        {/* Tab页面 */}
        <TabPage />
        {/* </div> */}
      </div>
    </div >
  );
}