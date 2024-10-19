import * as React from 'react';
import { useGetWordCore } from "../../api.ts";
import { useState } from "react";
import { testWordCoreData } from "../../../constants.ts";
import Markdown from "react-markdown";
import Accordion from "../../../components.old/Accordion.tsx";

type WordChangeTypes = '复数' | '现在分词' | '第三人称单数' | '过去分词' | '过去式'
// !这个是单纯为了解决报错设的不放到另一个文件了
type AiEudicTypes = "例句" | "助记" | "单词新解" | "同义词" | "形近词" | "搭配" | "替换" | "派生词" | "词根" | "词源"

/**
 * 单词详情页面
 * @param word
 * @constructor
 */
export default function QueryDataCore({ word }: { word: string }) {
  // td to deletee
  word = 'make';
  const wordCoreData = testWordCoreData;
  //const { isPending, isError, isSuccess, data, error } = useGetWordCore(word);

  const [detailedMeaningTabIndex, setDetailedMeaningTabIndex] = useState(0);

  return (
    <div className="w-full rounded-b-xl bg-white p-4">
      <div className="flex flex-col gap-5">
        {/* // ** 单词 */}
        <div className="flex">
          <div className="flex-1 flex flex-col">
            <div className="">
              <span className="text-5xl text-green-700 font-bold">{word}</span>
              <span className="ml-3 text-sm text-gray-400">【{wordCoreData.data?.tags.basic.slice(0, 3).join(', ')}】</span>
            </div>
            <div className="flex items-center gap-8 mt-5 ml-2">
              <span className="text-gray-400 text-sm">英 {'[' + wordCoreData.data?.pron.ukPron + ']'}</span>
              <span className="text-gray-400 text-sm">美 {'[' + wordCoreData.data?.pron.usPron + ']'}</span>
            </div>
            <div className="w-full h-5"></div>
            <div className="w-full  mt-5">
              <span className="font-bold text-lime-400">最简释义: </span>
              <span className="font-bold">{wordCoreData.data?.simpleMeaning}</span>
            </div>
          </div>
          {/* //td @IvanLark 这里按html的是270px但是和设计图比感觉太大了不知道具体数值 */}
          <div className="size-[200px] rounded-full bg-white shadow-xl flex items-center justify-center">
            {/* // td @IvanLark 这个其实不太知道是什么东西 */}
            <span className="text-xl font-bold">义项比例</span>
          </div>
        </div>
        {/* // ** 详细释义 */}
        {/* // td @IvanLark 这里默认的阴影效果是朝下的……看看是否一定要朝上 */}
        <div className="w-full p-4 relative bg-gray-100 rounded-lg shadow-lg shadow-blue-300">
          <div className="px-2 py-1 absolute -top-8 left-0 rounded-t-xl bg-yellow-200 text-lime-500 font-bold">
            详细释义
          </div>
          <div className="flex gap-2">
            {['中英', '英英'].map((item, index) =>
              <button className={`px-4 py-1 rounded-full text-xs transition-all ${detailedMeaningTabIndex === index ? 'bg-lime-400 text-white' : 'bg-white text-lime-400'}`} onClick={() => setDetailedMeaningTabIndex(index)} key={index}>{item}</button>
            )}
          </div>
          <ul className="">
            {(detailedMeaningTabIndex === 0 ? wordCoreData.data.definition.cn : wordCoreData.data.definition.en).map((item, index) =>
              <li key={index} className="">{item}</li>
            )}
          </ul>
        </div>
        {/* // ** 单词变形 & 词频分析 */}
        <div className="w-full flex gap-4">
          {/* // td @IvanLark 相比设计图这里圆角缩小了，除了tailwind最大就这么大以外，原本的圆角也感觉有点大到影响文字排版了 */}
          <div className="p-5 bg-teal-400 rounded-3xl shadow-xl flex-1 text-white">
            {/* // ~~ @IvanLark 这里考虑居中吗？ */}
            <div className="text-lime-400 font-bold">单词变形</div>
            {['复数', '现在分词', '第三人称单数', '过去分词', '过去式'].map((exchangeType, index) =>
              <div key={index}>
                {/* // @ts-expect-error wrong type */}
                <span className="">{exchangeType}: </span><span className="">{wordCoreData.data?.exchange[exchangeType as WordChangeTypes]}</span>
              </div>
            )}
          </div>
          <div className="p-5 bg-teal-400 rounded-3xl shadow-xl flex-1 text-white">
            <div className="text-lime-400 font-bold">词频分析</div>
            <div>
              <span>BNC词频: </span><span>{wordCoreData.data?.freq.bncFrequency}</span>
            </div>
            <div>
              <span>COCA词频: </span><span>{wordCoreData.data?.freq.cocaFrequency}</span>
            </div>
            <div>
              <span>柯林星级: </span><span>{wordCoreData.data?.freq.collinsStar}</span>
            </div>
            <div>
              <span>考试出现次数: </span><span>{wordCoreData.data?.freq.examFrequency}</span>
            </div>
          </div>
        </div>
        {/* // ** AI解析 */}
        <Accordion title="AI解析" child={<Markdown>{wordCoreData.data.ai.DictionaryByGPT4}</Markdown>} titleColor="rgb(253,224,71)" bgColor='rgb(96,160,250)' />
        {/* <div className="p-5 bg-blue-400 rounded-3xl shadow-xl text-white">
          <h2 className="text-xl text-yellow-300 fonts-bold">AI解析</h2>
          <div className="w-full mt-4">
            <h3 className="text-lg text-yellow-300 fonts-bold">分析词义</h3>
            <Markdown>{wordCoreData.data.ai.DictionaryByGPT4}</Markdown>
            <p className="">{wordCoreData.data.ai.DictionaryByGPT4}</p>
          </div>
        </div> */}
        {/* <div className="p-5 bg-blue-400 rounded-3xl shadow-xl text-white"> */}
        {["例句", "助记", "单词新解", "同义词", "形近词", "搭配", "替换", "派生词", "词根", "词源"].map((title, index) =>
          <Accordion key={index} title={title} titleColor="rgb(253,224,71)" bgColor='rgb(96,160,250)' child={<p className="" dangerouslySetInnerHTML={{ __html: wordCoreData.data.ai.Eudic[title as AiEudicTypes] }}></p>} />
          // <div key={index} className="w-full mt-4">
          //   <h3 className="text-lg text-yellow-300 fonts-bold">{title}</h3>
          //   {/* // td @IvanLark 这个属性警告你危险了/汗 */}

          // </div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
}