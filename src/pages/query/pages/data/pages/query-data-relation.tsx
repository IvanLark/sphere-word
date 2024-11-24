import DataCard from "../../../../../common/components/card/data-card.tsx";
import DiscreteTabs from "../../../../../common/components/tabs/discrete-tabs.tsx";
import { ButtonItem } from "../../../../../common/components/item/button-item.tsx";
import ListItem from "../../../../../common/components/item/list-item.tsx";
import AccordionItem from "../../../../../common/components/item/accordion-item.tsx";
import {useNavigate} from "react-router-dom";
import {WordRelation} from "../../../../../api/types/word-data.types.ts";

/**
 * 单词关系页面
 * @param word
 * @constructor
 */

interface QueryDataRelationProps {
  word: string;
  data: WordRelation;
  handleSkipWord: (newWord: string, relationType: string, relationLabel?: string) => void;
  beforeSkip?: () => void;
}

export default function QueryDataRelation({ word, data, handleSkipWord, beforeSkip = () => {} }: QueryDataRelationProps) {
  const navigate = useNavigate();

  // 语义关系Tabs
  const semanticTabs: Record<string, Array<string>> = {};
  if (data?.Synonym) Object.assign(semanticTabs, { '近义': data.Synonym.slice(0, 10).map(item => item.word) });
  if (data?.Similar) Object.assign(semanticTabs, { '相似': data.Similar.slice(0, 10).map(item => item.word) });
  if (data?.Antonym) Object.assign(semanticTabs, { '反义': data.Antonym.slice(0, 10).map(item => item.word) });
  if (data?.RelatedTo) Object.assign(semanticTabs, { '相关': data.RelatedTo.slice(0, 10).map(item => item.word) });
  if (data?.ClassOf) Object.assign(semanticTabs, { '上位': data.ClassOf.slice(0, 10).map(item => item.word) });
  if (data?.InstanceOf) Object.assign(semanticTabs, { '下位': data.InstanceOf.slice(0, 10).map(item => item.word) });

  // 表达关系Tabs
  const expressionTabs: Record<string, JSX.Element | JSX.Element[]> = {};
  if (data?.Phrase) {
    Object.assign(expressionTabs, {
      '短语':
        data.Phrase.slice(0, 10).map((item, index) =>
          <ListItem key={index} index={index} content={`${item.phrase} | ${item.meaning}`} />
        )
    })
  }
  if (data?.Example) {
    Object.assign(expressionTabs, {
      '例句':
        data.Example.slice(0, 10).map((item, index) =>
          <ListItem key={index} index={index} content={
            <>
              <p>{item.example}</p>
              <p>{item.translation}</p>
            </>
          } />
        )
    })
  }
  if (data?.Collocation) {
    const collocationTabs: Record<string, Array<string>> = {};
    data.Collocation.forEach(collocationItem => {
      Object.assign(collocationTabs, {
        // 用 [] 包裹键名，ES6
        [collocationItem.collocation]:
          collocationItem.phrases.map(phraseItem => `${phraseItem.phrase} | ${phraseItem.translation}`)
      });
    });
    Object.assign(expressionTabs, {
      '搭配': <>
        <div className="w-full h-[1px] bg-black mb-2">{/* 留空 */}</div>
        <DiscreteTabs<Array<string>> tabs={collocationTabs}>
          {(_, value) => value.map((phrase, index) => <ListItem index={index} content={phrase} />)}
        </DiscreteTabs>
      </>
    });
  }

  const setTabs: Record<string, Array<JSX.Element>> = {};
  if (data?.Topic) {
    Object.assign(setTabs, {
      '话题':
        data.Topic.slice(0, 5).map((topicItem, index1) =>
          topicItem.words.length > 0 ?
            <AccordionItem key={index1} title={topicItem.name} content={
              <div className="flex flex-wrap gap-2">
                {topicItem.words.map((relatedWord, index2) =>
                  <ButtonItem key={index1 * 10 + index2} content={relatedWord}
                              onClick={() => { handleSkipWord(relatedWord, 'Topic', topicItem.name) }}
                  />
                )}
              </div>
            } /> : <></>
        )
    })
  }
  if (data?.Synset) {
    Object.assign(setTabs, {
      '近义词辨析':
        data.Synset.slice(0, 5).map((synsetItem, index1) =>
          <AccordionItem key={index1} title={synsetItem.name} content={
            synsetItem.discriminations.map((diccriminationItem, index2) =>
              <>
                <div key={index1 * 10 + index2} className="flex flex-wra gap-2 max-w-full overflow-hidden text-ellipsis">
                  <ButtonItem content={diccriminationItem.word} className="max-w-32 text-ellipsis overflow-hidden"
                              onClick={() => { handleSkipWord(diccriminationItem.word, 'Synset', synsetItem.name) }}
                  />
                  {diccriminationItem.meaning}
                </div>
                {index2 < synsetItem.discriminations.length - 1 && <div className="w-full h-[1px] border-[1px] border-gray-300 border-dashed my-2"></div>}
              </>
            )
          } />
        )
    })
  }

  return (
    <div className="w-full rounded-b-xl bg-white p-2">
      <div className="flex flex-col gap-5">
        {/* 语义关系 */}
        {
          semanticTabs && Object.keys(semanticTabs).length > 0 &&
          <DataCard>
            <DiscreteTabs<Array<string>> tabs={semanticTabs}
                                         title='语义关系' showMore={(tabName) => { beforeSkip(); navigate('/chat', { state: { objectsType: '单词', objects: [word], promptName: tabName } }) } }>
              {
                (tabName, value) =>
                  <div className="flex flex-wrap gap-2">
                    {value.map((relatedWord, index) =>
                      <ButtonItem key={index} content={relatedWord}
                                  onClick={() => { handleSkipWord(relatedWord, tabName); }}
                      />
                    )}
                  </div>
              }
            </DiscreteTabs>
          </DataCard>
        }

        {/* 表达关系 */}
        {
          expressionTabs && Object.keys(expressionTabs).length > 0 &&
          <DataCard>
            <DiscreteTabs<JSX.Element | JSX.Element[]> tabs={expressionTabs}
                                                       title='表达关系' showMore={(tabName) => { beforeSkip(); navigate('/chat', { state: { objectsType: '单词', objects: [word], promptName: tabName } }) } }>
              {(_, value) => value}
            </DiscreteTabs>
          </DataCard>
        }

        {/* 集合关系 */}
        {
          setTabs && Object.keys(setTabs).length > 0 &&
          <DataCard>
            <DiscreteTabs<JSX.Element[]> tabs={setTabs}
                                         title='集合关系' showMore={(tabName) => { beforeSkip(); navigate('/chat', { state: { objectsType: '单词', objects: [word], promptName: tabName } }) } }>
              {(_, value) => value}
            </DiscreteTabs>
          </DataCard>
        }
      </div>
    </div>
  );
}