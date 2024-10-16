import { useState } from "react";
import { testWordRelation } from "../../../constants.ts";
import { useGetWordRelation } from "../../api.ts";
import Accordion from "../../../components/Accordion.tsx";
import TabCard, { listItemsType } from "../../../components/TabCard.tsx";
import SubTab from "../../../components/SubTab.tsx";
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
  // **tabs
  const [relationTabIndex, setRelationTabIndex] = useState(0);
  const [wordGroupTabIndex, setWordGroupTabIndex] = useState(0);
  const [wordCollectionTabIndex, setWordCollectionTabIndex] = useState(0);
  const [wordRelatedTabIndex, setWordRelatedTabIndex] = useState(0);

  // td to delete
  // word = 'make';
  const wordRelation = testWordRelation;
  // const wordRelation = useGetWordRelation(word)

  const [wordRelationTabIndex, setWordRelationTabIndex] = useState(0);
  function wordListBuilder(title: string, wordDataList: SemanticRelationItem[] | undefined) {
    return (<>
      <h2 className="text-lg">{title}</h2>
      {wordDataList ? wordDataList.map((word, index) => <li key={index}>{word.word}</li>) : <p>暂无数据</p>}
    </>

    )
  }
  function wordRelationListBuilder(words: string[]) {
    return (
      <div className="flex flex-wrap gap-2">
        {words.map((word, index) => <span key={index} className="px-2 border-2 border-black rounded-full">{word}</span>)}
      </div>
    )
  }
  console.log(wordRelatedTabIndex === 0 ? wordRelation.Topic.slice(0, 5).map(topic => { return { title: topic.key, content: [topic.key] } as listItemsType }) :
    wordRelation.Synset.slice(0, 5).map(synset => { return { title: synset.key, content: <div className=""><span className="w-10">{synset.key}</span><span>{synset.key}</span></div> } }))
  return (
    <div className="w-full rounded-b-xl bg-white p-4">
      <div className="flex flex-col gap-5">
        <TabCard tabs={['同义', '近义', '反义', '相关', '上位', '下位']} tabIndex={relationTabIndex} setTabIndex={setRelationTabIndex} >
          {/* // td @IvanLark 数据结构可能有误 */}
          {relationTabIndex === 0 ? wordRelationListBuilder(wordRelation.Antonym.map(ant => ant.word)) :
            relationTabIndex === 1 ? wordRelationListBuilder(wordRelation.Synset.map(sim => sim.key)) :
              relationTabIndex === 2 ? wordRelationListBuilder(wordRelation.Antonym.map(opp => opp.word)) :
                relationTabIndex === 3 ? wordRelationListBuilder(wordRelation.RelatedTo.map(rel => rel.word)) :
                  relationTabIndex === 4 ? wordRelationListBuilder(wordRelation.InstanceOf.map(ins => ins.word)) :
                    relationTabIndex === 5 ? wordRelationListBuilder(wordRelation.InstanceOf.map(sub => sub.word)) : <></>
          }
        </TabCard>
        <TabCard tabs={['短语', '例句', '搭配']} tabIndex={wordGroupTabIndex} setTabIndex={setWordGroupTabIndex} type={wordGroupTabIndex === 2 ? 'none' : 'list'} listItems={
          wordGroupTabIndex === 0 ? wordRelation.Phrase.slice(0, 5).map(phrase => `${phrase.phrase} | ${phrase.meaning}`) :
            wordGroupTabIndex === 1 ? wordRelation.Example.slice(0, 5).map(example =>
              <>
                <p>{example.example}</p>
                <p>{example.translation}</p>
              </>
            ) : undefined} >
          {wordGroupTabIndex === 2 && <>
            <div className="w-full h-[1px] bg-black mb-2"></div>
            <SubTab titles={wordRelation.Collocation.map(colect => colect.collocation)} tabIndex={wordCollectionTabIndex} setTabIndex={setWordCollectionTabIndex} />
            {wordRelation.Collocation[wordCollectionTabIndex].phrases.map((phrase, index) =>
              wordCollectionTabIndex === index && <p className="">{phrase.phrase} | {phrase.translation}</p>
            )}
          </>}
        </TabCard>
        <TabCard tabs={['话题', '近义词辨析']} tabIndex={wordRelatedTabIndex} setTabIndex={setWordRelatedTabIndex} type="accordion"
          // @ts-expect-error wrong type
          listItems={wordRelatedTabIndex === 0 ? wordRelation.Topic.slice(0, 5).map(topic => { return { title: topic.key, content: [topic.key] } as listItemsType }) :
            wordRelation.Synset.slice(0, 5).map(synset => { return { title: synset.key, content: <div className=""><span className="w-10">{synset.key}</span><span>{synset.key}</span></div> } })} />
        <Accordion title="话题" child={wordRelation.Topic.slice(0, 10).map((topic, index) => <li key={index}>{topic.key}</li>)} titleColor="rgb(132,205,22)" bgColor="rgb(240,240,240)" />
        <Accordion title="近义词辨析" child={wordRelation.Synset.slice(0, 10).map((word, index) => <li key={index}>{word.key}</li>)} titleColor="rgb(132,205,22)" bgColor="rgb(240,240,240)" />
        <Accordion title="短语" child={wordRelation.Phrase.slice(0, 10).map((phrase, index) => <li key={index}>{phrase.phrase} {phrase.meaning}</li>)} titleColor="rgb(132,205,22)" bgColor="rgb(240,240,240)" />
        <Accordion title="固定搭配" child={wordRelation.Collocation.map((colect, index) =>
          <div key={index} className="flex">
            {/* <div className="p-3 font-bold"><span className="m-auto">{colect.collocation}</span></div> */}
            <div className="p-3 font-bold">{colect.collocation}</div>
            <ul className="border-l-2 border-gray-500 flex-1 my-3">
              {colect.phrases.slice(0, 10).map((phrase, index) => <li key={index} className="ml-2">{phrase.phrase} {phrase.translation}</li>)}
            </ul>
          </div>
        )} titleColor="rgb(132,205,22)" bgColor="rgb(240,240,240)" />
        <Accordion title="例句" child={wordRelation.Example.slice(0, 10).map((sentence, index) => <li key={index}>{sentence.example} {sentence.translation}</li>)} titleColor="rgb(132,205,22)" bgColor="rgb(240,240,240)" />

      </div>
    </div>
  );
}