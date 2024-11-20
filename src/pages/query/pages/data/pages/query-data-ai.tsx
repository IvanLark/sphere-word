import DiscreteTabs from "../../../../../common/components/tabs/discrete-tabs.tsx";
import ContinuousTabs from "../../../../../common/components/tabs/continuous-tabs.tsx";
import DataCard from "../../../../../common/components/card/data-card.tsx";
import {WordAi} from "../../../../../api/types/word-data.types.ts";
import Markdown from "react-markdown";

/**
 * AI解析页面
 * @param word
 * @constructor
 */

interface QueryDataAiProps {
  data: WordAi;
}

export default function QueryDataAi({ data }: QueryDataAiProps) {
  /* 子页面：AI解析1，AI解析2，AI解析3 */
  const pageTabs: Record<string, JSX.Element> = {};
  if (data?.Eudic) {
    if (Object.keys(data.Eudic).includes('例句')) {
      const temp = data.Eudic['例句'];
      delete data.Eudic['例句'];
      data.Eudic = {
        '释义': temp,
        ...data.Eudic
      };
    }
    Object.assign(pageTabs, {
      'AI解析2':
        <DiscreteTabs<string> tabs={data.Eudic}>
          {(_, value) => <div dangerouslySetInnerHTML={{ __html: value }}></div>}
        </DiscreteTabs>
    });
  }
  if (data?.DictionaryByGPT4) {
    //console.log(data.DictionaryByGPT4.replace(/\n +\n/g, ''))
    Object.assign(pageTabs, {
      'AI解析3': <div className="whitespace-pre-line text-justify">
        <Markdown>{data.DictionaryByGPT4.replace(/\n +\n/g, '')}</Markdown>
      </div>
    });
  }

  return (
    <div className="w-full rounded-b-xl bg-white p-2">
      <ContinuousTabs<JSX.Element> tabs={pageTabs}>
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