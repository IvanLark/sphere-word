import { useState } from "react";
import Tabs from "../../../components/Tabs.tsx";
import { useGetWordAi } from "../../api.ts";
import SubTab from "../../../components/SubTab.tsx";
import TabCard from "../../../components/TabCard.tsx";

/**
 * AI解析页面
 * @param word
 * @constructor
 */
export default function QueryDataAi({ word }: { word: string }) {
  // ** Tabs
  const [aiTabIndex, setAiTabIndex] = useState(0);
  const [Tab1Index, setTab1Index] = useState(0);

  const data = undefined, isPending = true
  // const { isPending, isError, isSuccess, data, error } = useGetWordAi(word);

  let content: JSX.Element | null = null;
  if (aiTabIndex === 0)
    switch (Tab1Index) {
      case 0: content = <div dangerouslySetInnerHTML={{ __html: data?.Eudic['词根'] }}></div>; break;
      case 1: content = <div dangerouslySetInnerHTML={{ __html: data?.Eudic['词根'] }}></div>; break;
      case 2: content = <div dangerouslySetInnerHTML={{ __html: data?.Eudic['词根'] }}></div>; break;
      case 3: content = <div dangerouslySetInnerHTML={{ __html: data?.Eudic['词根'] }}></div>; break;
      case 4: content = <div dangerouslySetInnerHTML={{ __html: data?.Eudic['词根'] }}></div>; break;
      case 5: content = <div dangerouslySetInnerHTML={{ __html: data?.Eudic['词根'] }}></div>; break;
      case 6: content = <div dangerouslySetInnerHTML={{ __html: data?.Eudic['词根'] }}></div>; break;
      case 7: content = <div dangerouslySetInnerHTML={{ __html: data?.Eudic['词根'] }}></div>; break;
      case 8: content = <div dangerouslySetInnerHTML={{ __html: data?.Eudic['词根'] }}></div>; break;
      case 9: content = <div dangerouslySetInnerHTML={{ __html: data?.Eudic['词根'] }}></div>; break;
    }
  else if (aiTabIndex === 1) content = <div className="whitespace-pre-line"> {data?.DictionaryByGPT4}</div>;

  return (
    <div className="w-full rounded-b-xl bg-white p-4">
      <Tabs tabs={['AI解析1', 'AI解析2']} tabIndex={aiTabIndex} setTabIndex={setAiTabIndex} loading={isPending} />
      <div className="w-full h-2"></div>
      {/* {<SubTab titles={['例句', '助记', '单词新解', '同义词', '形近词', '搭配', '替换', '派生词', '词根', '词源']} tabIndex={Tab1Index} setTabIndex={setTab1Index} />} */}
      <TabCard tabs={aiTabIndex === 0 ? ['例句', '助记', '单词新解', '同义词', '形近词', '搭配', '替换', '派生词', '词根', '词源'] : []} tabIndex={Tab1Index} setTabIndex={setTab1Index} loading={isPending} showMoreButton={false} >
        {content}
      </TabCard>

    </div>
  );
}