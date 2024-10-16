import * as React from 'react';
import SubTab from './SubTab';
import { KeyboardArrowRight } from '@mui/icons-material';
interface TabCardProps {
	title?: string,
	tabs?: string[];
	type?: 'list' | 'none',
	listItems?: (string | JSX.Element)[],
	showMoreButton?: boolean,
	tabIndex?: number,
	setTabIndex?: (index: number) => void,
	children?: React.ReactNode;
}
export default function TabCard({ tabs, title, type = 'none', listItems, showMoreButton = true, tabIndex, setTabIndex, children }: TabCardProps) {
	return (
		<div className="bg-white rounded-md p-2 pb-4 border-2 border-black">
			<div className="w-full h-full py-2 flex">
				<div className="flex-1">

					{title && <h2 className="text-xl font-bold">{title}</h2>}
					{tabs && <SubTab titles={tabs} tabIndex={tabIndex!} setTabIndex={setTabIndex!} />}
				</div>
				{/* // td to implement */}
				{showMoreButton && <button className="h-full px-4 ">更多<KeyboardArrowRight style={{ width: '28px', height: '28px' }} /></button>}
			</div>
			<div className="">{type === 'list' ? listItems!.map((item, index) => <p key={index} className={`px-2 py-1 border-black text-lg ${index === 0 ? 'border-y-2' : 'border-b-2'}`}>{item}</p>)
				: children}</div>
		</div>
	)
}