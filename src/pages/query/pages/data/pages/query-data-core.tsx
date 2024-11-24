import { WordCore } from "../../../../../api/types/word-data.types.ts";
import DataCard from "../../../../../common/components/card/data-card.tsx";
import DiscreteTabs from "../../../../../common/components/tabs/discrete-tabs.tsx";
import ListItem from "../../../../../common/components/item/list-item.tsx";
import ReactEcharts, { EChartsOption } from 'echarts-for-react';
import 'echarts/lib/chart/pie'; // 饼图
import 'echarts/lib/component/tooltip';
import { useNavigate } from "react-router-dom";

/**
 * 单词详情页面
 * @param word
 * @constructor
 */

interface QueryDataCoreProps {
  word: string;
  data: WordCore;
  isLoading: boolean;
  beforeSkip?: () => void;
}

export default function QueryDataCore({ word, data, isLoading, beforeSkip = () => {} }: QueryDataCoreProps) {
  const navigate = useNavigate();

  const definitionTabs: Record<string, Array<string>> = {}
  if (data.definition) {
    if (data?.definition.cn) Object.assign(definitionTabs, { '中英': data.definition.cn });
    if (data?.definition.en) Object.assign(definitionTabs, { '英英': data.definition.en });
  }

  interface EchartsDataItem {
    name: string;
    value: number;
  }
  let meaningProportionData: EchartsDataItem[] | undefined = undefined
  if (data?.proportion && data.proportion?.meaning) {
    if (Object.values(data.proportion.meaning)[0].length > 1) {
      meaningProportionData = Object.values(data.proportion.meaning)[0]
        .map(item => ({ name: item.meaning, value: item.proportion }))
        .filter(item => item.value !== 100);
    } else if (Object.values(data.proportion.meaning).length > 1) {
      meaningProportionData = Object.values(data.proportion.meaning)[1]
        .map(item => ({ name: item.meaning, value: item.proportion }))
        .filter(item => item.value !== 100);
    }
  }
  const echartOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: '义项比例',
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: meaningProportionData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          show: true,
          position: 'outside', // 标签显示在扇形的外侧
          textStyle: {
            fontSize: 18
          }
        }
      }
    ]
  };

  return (
    <div className="w-full rounded-b-xl bg-white p-2">
      <div className="flex flex-col gap-5">
        {/* 标签 */}
        {
          data.tags.basic.length > 0 &&
          <DataCard title='标签' showMoreButton={false} isLoading={isLoading}>
            <div className="mt-2 flex gap-2 text-black text-[15px]">
              {
                data?.tags.basic.slice(0, 5).map((tag, index) =>
                    <span key={index} className="px-2 font-bold rounded-md border-2 border-black">
                  {tag}
                </span>
                )
              }
            </div>
          </DataCard>
        }
        {/* 释义 */}
        {
          Object.keys(definitionTabs).length > 0 &&
          <DataCard isLoading={isLoading}>
            <DiscreteTabs<Array<string>> tabs={definitionTabs} isLoading={isLoading}
              showMore={() => { beforeSkip(); navigate('/chat', { state: { objectsType: '单词', objects: [word], promptName: '释义' } }); }}>
              {(_, value) => value.map((meaning, index) =>
                <ListItem key={index} index={index} content={meaning}></ListItem>
              )}
            </DiscreteTabs>
          </DataCard>
        }
        {/* 词频 */}
        <DataCard title="词频" showMoreButton={false} isLoading={isLoading}>
          <div className="flex flex-wrap gap-1 text-[14px]">
            {data?.freq.examFrequency && <FrequencyBuilder title="真题" content={data?.freq.examFrequency.toString()} />}
            {data?.freq.bncFrequency && <FrequencyBuilder title="BNC" content={data?.freq.bncFrequency.toString()} />}
            {data?.freq.cocaFrequency && <FrequencyBuilder title="COCA" content={data?.freq.cocaFrequency.toString()} />}
            {data?.freq.collinsStar && <FrequencyBuilder title="柯林" content={data?.freq.collinsStar + '星'} />}
          </div>
        </DataCard>
        {/* 义项比例 */}
        {
          meaningProportionData &&
          <DataCard title="义项比例" showMoreButton={false} isLoading={isLoading}>
            <ReactEcharts option={echartOption} />
          </DataCard>
        }
        {/* 词源 */}
        {
          data?.etymology &&
          <DataCard title="词源" showMoreButton={false} isLoading={isLoading}>
            {data.etymology.map((etymologyItem, index) =>
              <div key={index}>
                <h3 className="px-2 py-1 my-2 border-2 border-black rounded-2xl font-bold w-fit">
                  {etymologyItem.meaning}
                </h3>
                <p className="text-justify leading-loose">
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
    <span className="px-1 py-0.5 m-0.5 border-2 border-black rounded-md font-bold">
      {title} {content}
    </span>
  );
}
