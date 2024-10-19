import {useState} from "react";
import {Skeleton} from "@mui/material";

/**
 * "分开"样式的Tabs
 * @param tabs
 * @param children
 * @constructor
 */

export interface DiscreteTabsProps<T> {
  tabs: Record<string, T>; // Tab名称加对应数据组成的 key-value 类型
  children: (tabName: string, value: T) => JSX.Element|JSX.Element[]; // 渲染value的函数，返回JSX
  isLoading: boolean;
}

export default function DiscreteTabs<T>({ tabs, children, isLoading }: DiscreteTabsProps<T>) {
  const [pickedIndex, setPickedIndex] = useState(0);

  return (
    isLoading ?
    <Skeleton variant="rectangular" height="40px" /> :
    <>
      {/* Tabs选项 */}
      <ul className="flex flex-wrap gap-2 select-none">
        {
          Object.keys(tabs).map((tabName, index) =>
            <li key={index}
                className={`
								px-2 py-1 text-nowrap rounded-md list-none border-2 border-black transition-all 
								duration-300 ${pickedIndex === index ? 'text-white bg-black' : ''}
							`}
                onClick={() => setPickedIndex(index)}>
              {tabName}
            </li>
          )
        }
      </ul>
      {/* 渲染当前Tab */}
      { children(Object.keys(tabs)[pickedIndex], Object.values(tabs)[pickedIndex]) }
    </>
  );
}