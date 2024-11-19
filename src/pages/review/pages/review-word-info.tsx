import { WordCard } from "../../../common/components/card/word-card.tsx";
import { useWatcher } from "alova/client";
import { getWordData } from "../../../api/methods/word-data.methods.ts";
import DataCard from "../../../common/components/card/data-card.tsx";
import DiscreteTabs from "../../../common/components/tabs/discrete-tabs.tsx";
import ListItem from "../../../common/components/item/list-item.tsx";
import { useNavigate } from "react-router-dom";
import SkipButton from "../components/skip-button.tsx";
import ScreenLoading from "../../../common/components/loader/screen-loading.tsx";

interface ReviewWordInfoProps {
  word: string;
  onNext: () => void;
}

export default function ReviewWordInfo({ word, onNext }: ReviewWordInfoProps) {
  const navigate = useNavigate();

  const { data, loading, error } = useWatcher(getWordData(word), [word], {
    immediate: true
  });

  if (loading || data === undefined) {
    return <ScreenLoading/>;
  }
  if (error) {
    throw new Error('获取数据出错');
  }

  const definitionTabs: Record<string, Array<string>> = {}
  if (data.core?.definition.cn) Object.assign(definitionTabs, { '中英': data.core.definition.cn });
  if (data.core?.definition.en) Object.assign(definitionTabs, { '英英': data.core.definition.en });

  // 表达关系Tabs
  const expressionTabs: Record<string, JSX.Element | JSX.Element[]> = {};
  if (data.relation?.Phrase) {
    Object.assign(expressionTabs, {
      '短语':
        data.relation.Phrase.slice(0, 10).map((item, index) =>
          <ListItem key={index} index={index} content={`${item.phrase} | ${item.meaning}`} />
        )
    })
  }
  if (data.relation?.Example) {
    Object.assign(expressionTabs, {
      '例句':
        data.relation.Example.slice(0, 10).map((item, index) =>
          <ListItem key={index} index={index} content={
            <>
              <p>{item.example}</p>
              <p>{item.translation}</p>
            </>
          } />
        )
    })
  }
  if (data.relation?.Collocation) {
    const collocationTabs: Record<string, Array<string>> = {};
    data.relation.Collocation.forEach(collocationItem => {
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

  return (
    <div className="w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] pb-14 fle flex-col items-center justify-center overflow-y-auto">
      {/* 顶部卡片 */}
      <WordCard word={word} data={data.core} button={
        <SkipButton onClick={() => navigate('/query', { state: { word: word } })} />
      } isLoading={false}>
      </WordCard>
      <div className="w-full h-fit rounded-b-xl bg-white p-2">
        <div className="flex flex-col gap-5">
          {/* 释义 */}
          {
            Object.keys(definitionTabs).length > 0 &&
            <DataCard isLoading={false}>
              <DiscreteTabs<Array<string>> tabs={definitionTabs} isLoading={false}
                showMore={() => {
                  navigate('/chat', {
                    state: {
                      objectsType: '单词',
                      objects: [word],
                      promptName: '释义'
                    }
                  })
                }}>
                {(_, value) => value.map((meaning, index) =>
                  <ListItem key={index} index={index} content={meaning}></ListItem>
                )}
              </DiscreteTabs>
            </DataCard>
          }
          {/* 表达关系 */}
          {
            expressionTabs && Object.keys(expressionTabs).length > 0 &&
            <DataCard>
              <DiscreteTabs<JSX.Element | JSX.Element[]> tabs={expressionTabs}
                title='表达关系' showMore={(tabName) => {
                  navigate('/chat', { state: { objectsType: '单词', objects: [word], promptName: tabName } })
                }}>
                {(_, value) => value}
              </DiscreteTabs>
            </DataCard>
          }
        </div>
      </div>
      <div className={`w-full fixed bottom-0 py-2 z-10 bg-transparent`}>
        <div className="w-full h-full absolute left-0 top-0 bg-gradient-to-t from-black to-transparent opacity-20"></div>
        <button className="btn-scale btn-black w-3/4 h-10 relative left-1/2 -translate-x-1/2 text-3xl rounded-md" onClick={onNext}>
          下一个单词
        </button>
      </div>
    </div>
  );
}