import { useState } from "react";
import { testWordRelation } from "../../../constants.ts";
import { useGetWordRelation } from "../../api.ts";
import Accordion from "../../../components/Accordion.tsx";
interface SemanticRelationItem {
  word: string;
  score: number;
  from: Array<string>;
  detail: object;
}

/**
 * 单词关系页面
 * @param word
 * @constructor
 */
export default function QueryDataRelation({ word }: { word: string }) {
  // td to delete
  word = 'make';
  // const wordRelation = testWordRelation;
  const wordRelation = useGetWordRelation(word)

  const [wordRelationTabIndex, setWordRelationTabIndex] = useState(0);
  function wordListBuilder(title: string, wordDataList: SemanticRelationItem[] | undefined) {
    return (<>
      <h2 className="text-lg">{title}</h2>
      {wordDataList ? wordDataList.map((word, index) => <li key={index}>{word.word}</li>) : <p>暂无数据</p>}
    </>

    )
  }
  return (
    <div className="w-full rounded-b-xl bg-white p-4">
      <div className="flex flex-col gap-5">
        {/* // ** 单词 */}
        {/* <div className="flex"> */}
        {/* <div className="flex-1 flex flex-col">
            <div className="">
              <span className="text-5xl text-green-700 font-bold">{word}</span>
              <span className="ml-3 text-sm text-gray-400">【{wordRelation.data?.tags.basic.slice(0, 3).join(', ')}】</span>
            </div>
            <div className="flex items-center gap-8 mt-5 ml-2">
              <span className="text-gray-400 text-sm">英 {'[' + wordRelation.data?.pron.ukPron + ']'}</span>
              <span className="text-gray-400 text5-sm">美 {'[' + wordRelation.data?.pron.usPron + ']'}</span>
            </div>
            <div className="w-full h-5"></div>
            <div className="w-full  mt-5">
              <span className="font-bold text-lime-400">最简释义: </span>
              <span className="font-bold">{wordRelation.data?.simpleMeaning}</span>
            </div>
          </div> */}
        {/* //td @IvanLark 这里按html的是270px但是和设计图比感觉太大了不知道具体数值 */}
        {/* <div className="size-[200px] rounded-full bg-white shadow-xl flex items-center justify-center"> */}
        {/* // td @IvanLark 这个其实不太知道是什么东西 */}
        {/* <span className="text-xl font-bold">义项比例</span> */}
        {/* </div> */}
        {/* </div> */}
        <div className="w-full p-4 relative bg-yellow-200 rounded-3xl shadow-lg shadow-blue-300">
          <div className="flex gap-2">
            {['近反义词', '上下位词', '相关词'].map((item, index) =>
              <button className={`px-4 py-1 rounded-full text-xs transition-all ${wordRelationTabIndex === index ? 'bg-yellow-400 text-white' : 'bg-white text-yellow-400'}`} onClick={() => setWordRelationTabIndex(index)} key={index}>{item}</button>
            )}
          </div>
          <ul className="mt-4">
            {wordRelationTabIndex === 0 ? <>
              {/* // td @IvanLark 这里单词一长右边就很空，考虑用多栏吗？ */}
              {wordListBuilder('【同/近义词】', wordRelation.data?.Antonym)}
              {wordListBuilder('【反义词】', wordRelation.data?.Antonym)}
            </> :
              wordRelationTabIndex === 1 ?
                wordListBuilder('【上下位词】', wordRelation.data?.InstanceOf) :
                wordListBuilder('【相关词】', wordRelation.data?.RelatedTo)}
            {/* {(wordRelationTabIndex === 0 ? wordCoreData.data.definition.cn : wordCoreData.data.definition.en).map((item, index) =>
              <li key={index} className="">{item}</li>
            )} */}
          </ul>
          {/* // td 颜色还要调调…… */}
        </div>
        <Accordion title="话题" child={wordRelation.data?.Topic.slice(0, 10).map((topic, index) => <li key={index}>{topic.key}</li>)} titleColor="rgb(132,205,22)" bgColor="rgb(240,240,240)" />
        <Accordion title="近义词辨析" child={wordRelation.data?.Synset.slice(0, 10).map((word, index) => <li key={index}>{word.key}</li>)} titleColor="rgb(132,205,22)" bgColor="rgb(240,240,240)" />
        <Accordion title="短语" child={wordRelation.data?.Phrase.slice(0, 10).map((phrase, index) => <li key={index}>{phrase.phrase} {phrase.meaning}</li>)} titleColor="rgb(132,205,22)" bgColor="rgb(240,240,240)" />
        <Accordion title="固定搭配" child={wordRelation.data?.Collocation.map((colect, index) =>
          <div key={index} className="flex">
            {/* <div className="p-3 font-bold"><span className="m-auto">{colect.collocation}</span></div> */}
            <div className="p-3 font-bold">{colect.collocation}</div>
            <ul className="border-l-2 border-gray-500 flex-1 my-3">
              {colect.phrases.slice(0, 10).map((phrase, index) => <li key={index} className="ml-2">{phrase.phrase} {phrase.translation}</li>)}
            </ul>
          </div>
        )} titleColor="rgb(132,205,22)" bgColor="rgb(240,240,240)" />
        <Accordion title="例句" child={wordRelation.data?.Example.slice(0, 10).map((sentence, index) => <li key={index}>{sentence.example} {sentence.translation}</li>)} titleColor="rgb(132,205,22)" bgColor="rgb(240,240,240)" />
        <Accordion title="词源" child={wordRelation.data?.Etymology.slice(0, 10).map((etymology, index) => <li key={index}>{etymology.etymology}</li>)} titleColor="rgb(132,205,22)" bgColor="rgb(240,240,240)" />

      </div>
    </div>
  );
}