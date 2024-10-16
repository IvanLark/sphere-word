import { useGetWordCore } from "../../api.ts";
import { useState } from "react";
import { testWordCoreData } from "../../../constants.ts";
import Markdown from "react-markdown";
import Accordion from "../../../components/Accordion.tsx";
import { Word } from "../Word.tsx";
import TabCard from "../../../components/TabCard.tsx";
import { WordCore } from "../../types.ts";

type WordChangeTypes = '复数' | '现在分词' | '第三人称单数' | '过去分词' | '过去式'
// !这个是单纯为了解决报错设的不放到另一个文件了
type AiEudicTypes = "例句" | "助记" | "单词新解" | "同义词" | "形近词" | "搭配" | "替换" | "派生词" | "词根" | "词源"

/**
 * 单词详情页面
 * @param word
 * @constructor
 */
// td @IvanLark 给data赋个类型……
export default function QueryDataCore({ word, data }: { word: string, data: WordCore }) {
  const [definitionTabIndex, setDefinitionTabIndex] = useState(0);
  const [detailedMeaningTabIndex, setDetailedMeaningTabIndex] = useState(0);

  // td to delete
  // data.Etymology = {}
  return (
    <div className="w-full rounded-b-xl bg-white p-4">
      <div className="flex flex-col gap-5">
        <TabCard title="标签" >
          <div className="mt-2 flex gap-2 text-black">
            {data.tags.basic.slice(0, 3).map((tag, index) => <span key={index} className="px-2 text-lg font-bold rounded-md border-2 border-black">{tag}</span>)}
          </div>
        </TabCard>
        <TabCard tabs={['中英', '英英']} tabIndex={definitionTabIndex} setTabIndex={setDefinitionTabIndex} type="list" listItems={definitionTabIndex === 0 ? data.definition.cn : data.definition.en} />
        {/* // ** 单词变形 & 词频分析 */}
        <TabCard title="词频">
          <WordFrequencyBuilder title="真题" content={data.freq.examFrequency.toString()} />
          <WordFrequencyBuilder title="BNC" content={data.freq.bncFrequency.toString()} />
          <WordFrequencyBuilder title="COCA" content={data.freq.cocaFrequency.toString()} />
          <WordFrequencyBuilder title="柯林" content={data.freq.collinsStar + '星'} />
        </TabCard>
        <TabCard title="义项比例">
          <div className="w-full h-40 rounded-md bg-gradient-to-tr from-gray-600 to-gray-300 text-center">To Implement</div>
        </TabCard>
        {/* //td @IvanLark 搞出来以后自己写一下词源这里吧，就吧 */}
        <TabCard title="词源" type="list" showMoreButton={false} listItems={['', ''].map((ehy, index) =>
          <div >
            <h3 className="px-2 py-1 border-2 border-black rounded-full font-bold w-fit">{'做，制造'}</h3>
            <p className="">{'来自古英语macian,制造，形成，安排，来自PIE*mag,捏，揉，形成，词源同match,massage.最早可能是来自人类始祖捏泥土以建房，后引申多种词义。'}</p>
          </div>
        )} />

        {/* // ** AI解析 */}
        {/* {["例句", "助记", "单词新解", "同义词", "形近词", "搭配", "替换", "派生词", "词根", "词源"].map((title, index) =>
          <Accordion key={index} title={title} titleColor="rgb(253,224,71)" bgColor='rgb(96,160,250)' child={<p className="" dangerouslySetInnerHTML={{ __html: data.ai.Eudic[title as AiEudicTypes] }}></p>} />
          <div key={index} className="w-full mt-4">
            <h3 className="text-lg text-yellow-300 font-bold">{title}</h3>
          </div>
        )} */}
        {/* </div> */}
      </div>
    </div >
  );
}
function WordFrequencyBuilder({ title, content }: { title: string, content: string }) {
  return (<span className="px-2 py-1 m-1 border-2 border-black rounded-md font-bold">{title} {content}</span>)
}
// function Word