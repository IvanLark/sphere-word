import * as React from 'react';
import { useLocation } from 'react-router-dom';
interface CoreTabProps { title: string; path: string; }
const CoreTabs: CoreTabProps[] = [
	// td to confirm the path
	{ title: '单词详情', path: '/core' },
	{ title: '单词关系', path: '/relation' },
	{ title: '阅读材料', path: '/' },
]
// const useTabNavigate = (index: number) => {
// 	const tabIndex = React.useState(index)
// }
export default function CoreTab({ tabIndex, setTabIndex }: { tabIndex: number, setTabIndex: (index: number) => void }) {
	// const location = useLocation()
	// const tabIndex = React.useState(0)
	return (
		<ul className="w-full h-24 flex">
			{CoreTabs.map((tab, index) => <li className={`btn-common-hover h-fit text-xl px-4 py-2 rounded-t-xl ${index === tabIndex ? 'bg-teal-400' : 'bg-gray-200'} `} onClick={() => { setTabIndex(index) }}>{tab.title}</li>)}
			{/* //!这个居然要手动指定h-fit…… */}
		</ul>

	)
}