import * as React from 'react';
interface SubTabProps {
	titles: string[] | undefined;
	tabIndex: number;
	setTabIndex: (index: number) => void;
}
export default function SubTab({ titles, tabIndex, setTabIndex }: SubTabProps) {
	return (
		<ul className="flex flex-wrap gap-2">
			{titles?.map((title, index) => <li key={index} className={`px-2 py-1 text-nowrap rounded-md list-none border-2 border-black transition-all duration-300 ${tabIndex === index ? 'text-white bg-black' : ''}`} onClick={() => setTabIndex(index)}>{title}</li>)}
		</ul>
	)
}