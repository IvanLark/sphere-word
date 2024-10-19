import { WordCore } from "../../types.ts";
import DataCard from "../components/card/DataCard.tsx";
import DiscreteTabs from "../components/tabs/DiscreteTabs.tsx";
import ListItem from "../components/item/ListItem.tsx";

/**
 * 单词详情页面
 * @param word
 * @constructor
 */

interface QueryDataCoreProps {
  data: WordCore | undefined;
  isLoading: boolean;
}

export default function QueryDataCore({ data, isLoading }: QueryDataCoreProps) {
  const definitionTabs: Record<string, Array<string>> = {}
  if (data?.definition.cn) Object.assign(definitionTabs, {'中英': data.definition.cn});
  if (data?.definition.en) Object.assign(definitionTabs, {'英英': data.definition.en});

  return (
    <div className="w-full rounded-b-xl bg-white p-4">
      <div className="flex flex-col gap-5">
        {/* 标签 */}
        <DataCard title='标签' showMoreButton={true} isLoading={isLoading}>
          <div className="mt-2 flex gap-2 text-black">
            {
              data?.tags.basic.slice(0, 3).map((tag, index) =>
                <span key={index} className="px-2 text-lg font-bold rounded-md border-2 border-black">
                  {tag}
                </span>
              )
            }
          </div>
        </DataCard>
        {/* 释义 */}
        <DataCard isLoading={isLoading}>
          <DiscreteTabs<Array<string>> tabs={definitionTabs} isLoading={isLoading}>
            {(_, value) => value.map((meaning, index) =>
              <ListItem key={index} index={index} content={meaning}></ListItem>
            )}
          </DiscreteTabs>
        </DataCard>
        {/* 词频 */}
        <DataCard title="词频" showMoreButton={false} isLoading={isLoading}>
          <>
            { data?.freq.examFrequency && <FrequencyBuilder title="真题" content={data?.freq.examFrequency.toString()} /> }
            { data?.freq.bncFrequency && <FrequencyBuilder title="BNC" content={data?.freq.bncFrequency.toString()} /> }
            { data?.freq.cocaFrequency && <FrequencyBuilder title="COCA" content={data?.freq.cocaFrequency.toString()} /> }
            { data?.freq.collinsStar && <FrequencyBuilder title="柯林" content={data?.freq.collinsStar + '星'} /> }
          </>
        </DataCard>
        {/* 义项比例 */}
        <DataCard title="义项比例" showMoreButton={false} isLoading={isLoading}>
          {/* TODO 饼状图或者条形图 */}
          <div className="w-full h-40 rounded-md bg-gradient-to-tr from-gray-600 to-gray-300 text-center">To Implement</div>
        </DataCard>
        {/* 词源 */}
        {
          data?.etymology &&
          <DataCard title="词源" showMoreButton={false} isLoading={isLoading}>
            {data.etymology.map((etymologyItem, index) =>
              <div key={index}>
                <h3 className="px-2 py-1 border-2 border-black rounded-full font-bold w-fit">
                  {etymologyItem.meaning}
                </h3>
                <p className="">
                  {etymologyItem.etymology}
                </p>
              </div>
            )}
          </DataCard>
        }
      </div>
    </div >
  );
}

function FrequencyBuilder({ title, content }: { title: string, content?: string }) {
  return (
    <span className="px-2 py-1 m-1 border-2 border-black rounded-md font-bold">
      {title} {content}
    </span>
  );
}
