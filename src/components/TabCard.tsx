import * as React from 'react';
import SubTab from './SubTab';
import { ExpandMore, KeyboardArrowRight } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Skeleton } from '@mui/material';
export type listItemsType = string | JSX.Element | { title: string, content: (string | JSX.Element)[] };
interface TabCardProps {
	title?: string,
	tabs?: string[];
	type?: 'list' | 'accordion' | 'none',
	listItems?: listItemsType[],
	showMoreButton?: boolean,
	tabIndex?: number,
	setTabIndex?: (index: number) => void,
	loading: boolean,
	children?: React.ReactNode;
}
export default function TabCard({ tabs, title, type = 'none', listItems, showMoreButton = true, tabIndex, setTabIndex, loading, children }: TabCardProps) {
	return (loading ? <Skeleton variant='rectangular' animation='wave' height={200} /> :
		<div className="bg-white rounded-md p-2 pb-4 border-2 border-black">
			<div className="w-full h-full py-2 flex items-start">
				<div className="flex-1">
					{title && <h2 className="text-xl font-bold">{title}</h2>}
					{tabs && <SubTab titles={tabs} tabIndex={tabIndex!} setTabIndex={setTabIndex!} />}
				</div>
				{/* // td to implement */}
				{showMoreButton && <button className="h-full px-4 ">更多<KeyboardArrowRight style={{ width: '28px', height: '28px' }} /></button>}
			</div>
			<div className="">{type === 'list' ? listItems?.map((item, index) => <p key={index} className={`px-2 py-1 border-black text-lg ${index === 0 ? 'border-y-2' : 'border-b-2'}`}>{item as string | JSX.Element}</p>) :
				type === 'accordion' ?
					// @ts-expect-error wrong type
					listItems?.map((item: { title: string, content: (string | JSX.Element)[] }, index) =>
						<Accordion key={index} >
							<AccordionSummary expandIcon={<ExpandMore />} style={{ borderBottom: '1px solid #e5e5e5' }}>
								{item.title}
							</AccordionSummary>
							<AccordionDetails>{item.content}</AccordionDetails>
						</Accordion>
					) :
					children}</div>
		</div>
	)
}