import * as React from 'react';
interface TabsProps {
	tabs: string[];
	tabIndex: number;
	setTabIndex: (index: number) => void;
}
export default function Tabs({ tabs, tabIndex, setTabIndex }: TabsProps) {
	return (
		<ul className="w-full flex">
			<div className="rounded-md bg-black absolute pointer-events-none transition-all duration-300" style={{ width: `${100 / tabs.length}%`, height: '40px', left: `${tabIndex * 100 / tabs.length}%` }}></div>
			{tabs.map((tab, index) =>
				<li
					className={`btn-common-hover text-xl h-10 py-2 relative flex-1 text-center rounded-md list-none transition-all duration-300 ${index === tabIndex ? 'text-white bg-blac' : ''} `}
					onClick={() => { setTabIndex(index) }}>
					{tab}
				</li>
			)}
			{/* //~~这个居然要手动指定h-fit……咳咳是上面ul搞了h-24…… */}
		</ul>

	)
}