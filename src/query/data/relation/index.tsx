import { toast } from "../../../utils/toast.ts";
import { useGetWordRelation } from "../../api.ts";
import DataCard from "../components/card/DataCard.tsx";
import DiscreteTabs from "../components/tabs/DiscreteTabs.tsx";
import {ButtonItem} from "../components/item/ButtonItem.tsx";
import ListItem from "../components/item/ListItem.tsx";
import AccordionItem from "../components/item/AccordionItem.tsx";
import {Edge, Node} from "../../types.ts";

/**
 * 单词关系页面
 * @param word
 * @constructor
 */

interface QueryDataRelationProps {
  word: string;
  handleSkipWord: (newWord: string, relationType: string, relationLabel?: string) => void;
}

export default function QueryDataRelation({ word, handleSkipWord }: QueryDataRelationProps) {
  const { isPending, isError, isSuccess, data, error } = useGetWordRelation(word)

  if (isError) {
    toast('无法获取单词数据', 'error');
    // TODO 错误响应页面
    return (<></>);
  }

  // 语义关系Tabs
  const semanticTabs: Record<string, Array<string>> = {};
  if (data?.Synonym) Object.assign(semanticTabs, {'同义': data.Synonym.slice(0,10).map(item => item.word)});
  if (data?.Similar) Object.assign(semanticTabs, {'近义': data.Similar.slice(0,10).map(item => item.word)});
  if (data?.Antonym) Object.assign(semanticTabs, {'反义': data.Antonym.slice(0,10).map(item => item.word)});
  if (data?.RelatedTo) Object.assign(semanticTabs, {'相关': data.RelatedTo.slice(0,10).map(item => item.word)});
  if (data?.ClassOf) Object.assign(semanticTabs, {'上位': data.ClassOf.slice(0,10).map(item => item.word)});
  if (data?.InstanceOf) Object.assign(semanticTabs, {'下位': data.InstanceOf.slice(0,10).map(item => item.word)});

  // 表达关系Tabs
  const expressionTabs: Record<string, JSX.Element|JSX.Element[]> = {};
  if (data?.Phrase) {
    Object.assign(expressionTabs, {
      '短语':
        data.Phrase.slice(0,10).map((item, index) =>
          <ListItem key={index} index={index} content={`${item.phrase} | ${item.meaning}`}/>
        )
    })
  }
  if (data?.Example) {
    Object.assign(expressionTabs, {
      '例句':
        data.Example.slice(0,10).map((item, index) =>
          <ListItem key={index} index={index} content={
            <>
              <p>{item.example}</p>
              <p>{item.translation}</p>
            </>
          }/>
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
        <DiscreteTabs<Array<string>> tabs={collocationTabs} isLoading={isPending}>
          {(_, value) => value.map((phrase, index) => <ListItem index={index} content={phrase}/>)}
        </DiscreteTabs>
      </>
    });
  }

  const setTabs: Record<string, Array<JSX.Element>> = {};
  if (data?.Topic) {
    Object.assign(setTabs, {
      '话题':
        data.Topic.slice(0,5).map((topicItem, index1) =>
          <AccordionItem key={index1} title={topicItem.name} content={
            <div className="flex flex-wrap gap-2">
              {topicItem.words.map((relatedWord, index2) =>
                <ButtonItem key={index1*10 + index2} content={relatedWord}
                            onClick={() => { handleSkipWord(relatedWord, 'Topic', topicItem.name) }}
                />
              )}
            </div>
          }/>
        )
    })
  }
  if (data?.Synset) {
    Object.assign(setTabs, {
      '近义词辨析':
        data.Synset.slice(0,5).map((synsetItem, index1) =>
          <AccordionItem key={index1} title={synsetItem.name} content={
            synsetItem.discriminations.map((diccriminationItem, index2) =>
              <div key={index1*10 + index2} className="flex flex-wra gap-2 max-w-full overflow-hidden text-ellipsis">
                <ButtonItem content={diccriminationItem.word} className="max-w-32 text-ellipsis overflow-hidden"
                            onClick={() => { handleSkipWord(diccriminationItem.word, 'Synset', synsetItem.name) }}
                />
                {diccriminationItem.meaning}
              </div>
            )
          }/>
        )
    })
  }

  return (
    <div className="w-full rounded-b-xl bg-white p-4">
      <div className="flex flex-col gap-5">
        {/* 语义关系 */}
        <DataCard title='语义关系' showMoreButton={true} isLoading={isPending}>
          <DiscreteTabs<Array<string>> tabs={semanticTabs} isLoading={isPending}>
            {
              (tabName, value) =>
                <div className="flex flex-wrap gap-2">
                  {value.map((relatedWord, index) =>
                    <ButtonItem key={index} content={relatedWord}
                      onClick={() => { handleSkipWord(relatedWord, tabName) }}
                    />
                  )}
                </div>
            }
          </DiscreteTabs>
        </DataCard>

        {/* 表达关系 */}
        <DataCard title='表达关系' showMoreButton={true} isLoading={isPending}>
          <DiscreteTabs<JSX.Element|JSX.Element[]> tabs={expressionTabs} isLoading={isPending}>
            { (_, value) => value }
          </DiscreteTabs>
        </DataCard>

        {/* 集合关系 */}
        <DataCard isLoading={isPending} title='集合关系' showMoreButton={true}>
          <DiscreteTabs<JSX.Element[]> tabs={setTabs} isLoading={isPending}>
            { (_, value) => value }
          </DiscreteTabs>
        </DataCard>
      </div>
    </div>
  );
}