import DiscreteTabs from "../../../../../common/components/tabs/discrete-tabs.component.tsx";
import ContinuousTabs from "../../../../../common/components/tabs/continuous-tabs.component.tsx";
import DataCard from "../../../../../common/components/card/data-card.component.tsx";
import {WordAi} from "../../../../../api/word/word-data.types.ts";

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
    Object.assign(pageTabs, {
      'AI解析2':
        <DiscreteTabs<string> tabs={data.Eudic}>
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