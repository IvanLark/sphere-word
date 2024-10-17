import { useState } from "react";
import { testWordRelation } from "../../../constants.ts";
import { useGetWordRelation } from "../../api.ts";
import Accordion from "../../../components/Accordion.tsx";
import TabCard, { listItemsType } from "../../../components/TabCard.tsx";
import SubTab from "../../../components/SubTab.tsx";
import WordCard from "../../../components/WordCard.tsx";
import { Divider } from "@mui/material";
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
        {words.map((word, index) => <WordCard key={index} word={word} />)}
      </div>
    )
  }
  return (
    <div className="w-full rounded-b-xl bg-white p-4">
      <div className="flex flex-col gap-5">
        <TabCard tabs={['同义', '近义', '反义', '相关', '上位', '下位']} tabIndex={relationTabIndex} setTabIndex={setRelationTabIndex} >
          {/* // td @IvanLark 数据结构可能有误 */}
          {relationTabIndex === 0 ? wordRelationListBuilder(wordRelation.Antonym.slice(0, 10).map(ant => ant.word)) :
            relationTabIndex === 1 ? wordRelationListBuilder(wordRelation.Synset.slice(0, 10).map(sim => sim.key)) :
              relationTabIndex === 2 ? wordRelationListBuilder(wordRelation.Antonym.slice(0, 10).map(opp => opp.word)) :
                relationTabIndex === 3 ? wordRelationListBuilder(wordRelation.RelatedTo.slice(0, 10).map(rel => rel.word)) :
                  relationTabIndex === 4 ? wordRelationListBuilder(wordRelation.InstanceOf.slice(0, 10).map(ins => ins.word)) :
                    relationTabIndex === 10 ? wordRelationListBuilder(wordRelation.InstanceOf.slice(0, 10).map(sub => sub.word)) : <></>
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
          listItems={wordRelatedTabIndex === 0 ? wordRelation.Topic.slice(0, 5).map(topic => {
            return {
              title: topic.key,
              content: [
                <div className="flex flex-wrap gap-2">
                  {Array(5).fill(0).map((_v, index) =>
                    // !注意不能用数组的index不然key都相同会出现切换tab元素不断增加的bug
                    <WordCard key={index} word={topic.key.slice(0, 2)} />)}
                </div>
              ]
            } as listItemsType
          }) :
            wordRelation.Synset.slice(0, 5).map(synset => {
              return {
                title: synset.key,
                // dtd 这里元素数量有点问题额这能bug……
                // td @IvanLark 这里数据不准确，换行可能存在问题
                content: Array(5).fill(0).map((_v, index) => <div key={index} className="flex flex-wra gap-2 max-w-full overflow-hidden text-ellipsis"><WordCard word={synset.key.slice(0, 5)} className="max-w-32 text-ellipsis overflow-hidden" />{synset.key}</div>)
              }
            })} />
      </div>
    </div>
  );
}