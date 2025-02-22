import { useState } from "react";
import { Skeleton } from "@mui/material";

/**
 * "连体"样式的Tabs
 * @param tabs
 * @param children
 * @constructor
 */

export interface ContinuousTabsProps<T> {
	id?: string;
	tabs: Record<string, T>; // Tab名称加对应数据组成的 key-value 类型
	children: (value: T) => JSX.Element | JSX.Element[]; // 渲染value的函数，返回JSX
	isLoading?: boolean;
}

export default function ContinuousTabs<T>({ id, tabs, children, isLoading = false }: ContinuousTabsProps<T>) {
	const savedIndex = id ? sessionStorage.getItem(`continuous-tabs-index:${id}`) : null;
	const initIndex = savedIndex ? Number(savedIndex) : 0;
	const [pickedIndex, setPickedIndex] = useState(initIndex);

	return (
		isLoading ?
			<Skeleton variant="rectangular" height="40px" /> :
			<>
				{/* Tabs选项 */}
				<ul className="w-full flex select-none text-nowrap relative rounded-lg border-2 border-black">
					<div
						className="rounded-md bg-black absolute pointer-events-none transition-all duration-300"
						style={{
							width: `${100 / Object.keys(tabs).length}%`,
							height: '2.5rem',
							left: `${pickedIndex * 100 / Object.keys(tabs).length}%`
						}}>
					</div>
					{Object.keys(tabs).map((tabName, index) =>
						<li
							key={index}
							className={`
							btn-common-hover text-[18px] h-10 py-2 relative flex-1 text-center rounded-md list-none
							transition-all duration-300 ${index === pickedIndex ? 'text-white bg-blac' : ''}
						`}
							onClick={() => {
								if (id) {
									sessionStorage.setItem(`continuous-tabs-index:${id}`, String(index));
								}
								setPickedIndex(index);
							}}>
							{tabName}
						</li>
					)}
				</ul>
				{/* 渲染当前Tab */}
				{children(Object.values(tabs)[pickedIndex])}
			</>
	);
}