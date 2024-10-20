import { useGetWordAi } from "../../api.ts";
import DiscreteTabs from "../components/tabs/DiscreteTabs.tsx";
import ContinuousTabs from "../components/tabs/ContinuousTabs.tsx";
import DataCard from "../components/card/DataCard.tsx";
import {toast} from "react-toastify";

/**
 * AI解析页面
 * @param word
 * @constructor
 */
export default function QueryDataAi({ word }: { word: string }) {
  const { isPending, isError, data } = useGetWordAi(word);

  if (isError) {
    toast.error('数据加载失败');
    return (<></>);
  }

  /* 子页面：AI解析1，AI解析2，AI解析3 */
  const pageTabs: Record<string, JSX.Element> = {};
  if (data?.Eudic) {
    Object.assign(pageTabs, {
      'AI解析2':
        <DiscreteTabs<string> tabs={data.Eudic} isLoading={false}>
          {(_, value) => <div dangerouslySetInnerHTML={{ __html: value }}></div>}
        </DiscreteTabs>
    });
  }
  if (data?.DictionaryByGPT4) {
    Object.assign(pageTabs, {
      'AI解析3': <div className="whitespace-pre-line"> {data.DictionaryByGPT4.replace('\n\n', '')}</div>
    });
  }

  return (
    <div className="w-full rounded-b-xl bg-white p-2">
      <ContinuousTabs<JSX.Element> tabs={pageTabs} isLoading={isPending}>
        {
          (value) =>
            <>
              <div className="w-full h-2">{/* 留空 */}</div>
              <DataCard isLoading={false}>
                {value}
              </DataCard>
            </>
        }
      </ContinuousTabs>
    </div>
  );
}