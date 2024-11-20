import { useState } from "react";
import { Skeleton } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";

/**
 * "分开"样式的Tabs
 * @param tabs
 * @param children
 * @constructor
 */

export interface DiscreteTabsProps<T> {
  title?: string;
  showMore?: (tabName: string, value: T) => void;
  tabs: Record<string, T>; // Tab名称加对应数据组成的 key-value 类型
  children: (tabName: string, value: T) => JSX.Element | JSX.Element[]; // 渲染value的函数，返回JSX
  isLoading?: boolean;
}

export default function DiscreteTabs<T>({ title, showMore, tabs, children, isLoading = false }: DiscreteTabsProps<T>) {
  const [pickedIndex, setPickedIndex] = useState(0);

  // Tabs选项
  function TabOptions() {
    return (
      <ul className="m-2 flex flex-wrap gap-2 select-none">
        {
          Object.keys(tabs).map((tabName, index) =>
            <li key={index}
              className={`
                tab-option-button text-[15px]
								px-2 py-1 text-nowrap rounded-md list-none border-2 border-black transition-all
								duration-300 ${pickedIndex === index ? 'text-white bg-black' : ''}
							`}
              onClick={() => setPickedIndex(index)}>
              {tabName}
            </li>
          )
        }
      </ul>
    );
  }

  return (
    isLoading ?
      <Skeleton variant="rectangular" height="40px" /> :
      <>
        {/* 顶部 */}
        <div className="w-full h-full py-0.5 flex">
          {/* 标题 */}
          <div className="flex-1">
            {title &&
              <h2 className="text-[18px] font-bold">{title}</h2>
            }
            { !title &&
              <TabOptions></TabOptions>
            }
          </div>
          {/* 更多 */}
          {
            showMore &&
            <button className="h-full px-2 border-2 border-black rounded-md"
              onClick={() => showMore(Object.keys(tabs)[pickedIndex], Object.values(tabs)[pickedIndex])}>
              AI生成
              <KeyboardArrowRight style={{ width: '28px', height: '28px' }} />
            </button>
          }
        </div>

        { title &&
          <TabOptions></TabOptions>
        }

        {/* 渲染当前Tab */}
        {children(Object.keys(tabs)[pickedIndex], Object.values(tabs)[pickedIndex])}
      </>
  );
}