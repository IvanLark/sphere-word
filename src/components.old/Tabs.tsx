import { Skeleton } from '@mui/material';

interface TabsProps {
	tabs: string[];
	tabIndex: number;
	setTabIndex: (index: number) => void;
	isLoading: boolean;
}

export default function Tabs({ tabs, tabIndex, setTabIndex, isLoading }: TabsProps) {
	return (
		isLoading ?
		<Skeleton variant="rectangular" height="40px" /> :

		<ul className="w-full flex select-none">
			<div
				className="rounded-md bg-black absolute pointer-events-none transition-all duration-300"
				style={{
					width: `${100 / tabs.length}%`,
					height: '40px',
					left: `${tabIndex * 100 / tabs.length}%`
				}}>
			</div>
			{tabs.map((tab, index) =>
				<li
					className={`
						btn-common-hover text-xl h-10 py-2 relative flex-1 text-center rounded-md list-none transition-all duration-300 
						${index === tabIndex ? 'text-white bg-blac' : ''} 
					`}
					onClick={() => { setTabIndex(index) }}>
					{tab}
				</li>
			)}
			{/* //~~这个居然要手动指定h-fit……咳咳是上面ul搞了h-24…… */}
		</ul>
	);
}